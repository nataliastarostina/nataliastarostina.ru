(function () {
    function getVkEmbed(vkId, options) {
        var settings = options || {};
        var parts = String(vkId || '').split('_');
        var query = new URLSearchParams({
            oid: parts[0] || '',
            id: parts[1] || '',
            hd: '2'
        });

        if (settings.autoplay) {
            query.set('autoplay', '1');
        }

        if (settings.loop) {
            query.set('loop', '1');
        }

        return 'https://vkvideo.ru/video_ext.php?' + query.toString();
    }

    function warmVkConnections() {
        if (document.documentElement.dataset.vkConnectionsWarmed === 'true') return;
        document.documentElement.dataset.vkConnectionsWarmed = 'true';

        [
            ['preconnect', 'https://vkvideo.ru'],
            ['preconnect', 'https://static.vkid.ru'],
            ['dns-prefetch', 'https://vkvideo.ru'],
            ['dns-prefetch', 'https://static.vkid.ru']
        ].forEach(function (entry) {
            var rel = entry[0];
            var href = entry[1];
            if (document.head.querySelector('link[rel="' + rel + '"][href="' + href + '"]')) return;
            var link = document.createElement('link');
            link.rel = rel;
            link.href = href;
            if (rel === 'preconnect') link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }

    function hydrateVkPreview(card) {
        if (!card || card.dataset.previewReady === 'true' || !card.dataset.vkId) return;

        var frame = document.createElement('div');
        frame.className = 'vk-preview-frame';

        var iframe = document.createElement('iframe');
        iframe.loading = 'lazy';
        iframe.tabIndex = -1;
        iframe.setAttribute('aria-hidden', 'true');
        iframe.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock';
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('referrerpolicy', 'origin');
        iframe.src = getVkEmbed(card.dataset.vkId, { autoplay: false });
        iframe.addEventListener('load', function () {
            card.classList.add('vk-preview-ready');
        }, { once: true });

        frame.appendChild(iframe);
        card.insertBefore(frame, card.firstChild);
        card.dataset.previewReady = 'true';
    }

    var previewObserver;

    function ensurePreviewObserver() {
        if (previewObserver || !('IntersectionObserver' in window)) return previewObserver;

        previewObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                hydrateVkPreview(entry.target);
                observer.unobserve(entry.target);
            });
        }, { rootMargin: '240px 0px' });

        return previewObserver;
    }

    function observeVkPreview(card) {
        if (!card) return;

        var warmup = function () {
            warmVkConnections();
        };

        card.addEventListener('pointerenter', warmup, { passive: true, once: true });
        card.addEventListener('focusin', warmup, { once: true });
        card.addEventListener('touchstart', warmup, { passive: true, once: true });

        var observer = ensurePreviewObserver();
        if (observer) {
            observer.observe(card);
            return;
        }

        hydrateVkPreview(card);
    }

    function buildReviewCard(config) {
        var card = document.createElement('div');
        card.className = config.className;
        card.dataset.vkId = config.vkId;
        card.dataset.videoSrc = getVkEmbed(config.vkId, {
            autoplay: true,
            loop: Boolean(config.loop)
        });
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', config.ariaLabel || config.label || 'Открыть видео');
        card.innerHTML =
            '<div class="vk-preview-gradient" aria-hidden="true"></div>' +
            '<div class="vk-preview-scrim" aria-hidden="true"></div>' +
            '<div class="vk-preview-shine" aria-hidden="true"></div>' +
            '<div class="vk-preview-caption" aria-hidden="true">' +
            '<div class="vk-preview-eyebrow">VK видео</div>' +
            '<div class="vk-preview-label">' + (config.label || '') + '</div>' +
            '</div>' +
            '<div class="vk-preview-play-wrap" aria-hidden="true">' +
            '<div class="vk-preview-play"><i class="ph-fill ph-play text-xl md:text-2xl ml-1"></i></div>' +
            '</div>';

        observeVkPreview(card);
        return card;
    }

    window.VKVideoPreview = {
        getVkEmbed: getVkEmbed,
        warmVkConnections: warmVkConnections,
        hydrateVkPreview: hydrateVkPreview,
        observeVkPreview: observeVkPreview,
        buildReviewCard: buildReviewCard
    };
})();
