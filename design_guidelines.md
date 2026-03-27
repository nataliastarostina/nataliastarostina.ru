# Design Guidelines: Mobile Subheading Standardization

To maintain visual consistency across all product and service pages, specific item subheadings in mobile views must strictly adhere to the following rules.

## 1. Typography Rules (Mobile View)
All subheadings for points, steps, or features within blocks must have these exact properties:

- **Font Family**: `'Lora', serif` (Serif font)
- **Font Size**: `1.2rem`
- **Font Style**: `normal` (Non-italic)
- **Font Weight**: `700` (Bold)
- **Margins**: `margin-top: 0`, `margin-bottom: 0.5rem`
- **Display**: `block` (Ensures proper spacing for `strong` or inline elements)

## 2. Implementation Pattern

### CSS (within `@media (max-width: 767px)`)
```css
/* Unified style for point subheadings */
section.bg-navy h3,
section.bg-navy h4,
section.bg-cream h3.font-serif,
section.bg-cream h4.font-serif,
#cta-block h3,
#cta-block h4,
.faq-btn span.font-serif,
ul.space-y-6 li strong {
    font-size: 1.2rem !important;
    font-style: normal !important;
    font-family: 'Lora', serif !important;
    font-weight: 700 !important;
    margin-top: 0 !important;
    margin-bottom: 0.5rem !important;
    display: block;
}
```

### HTML Cleanup
When applying these styles, remove conflicting utility classes from the HTML elements to avoid overlaps:
- **Remove**: `font-sans`, `italic`, `text-lg`, `text-xl`, `font-bold` (if it's a tailwind class like `font-bold` instead of native weight).
- **Target Tags**: Usually `h3`, `h4`, or `strong` tags inside list items.

## 3. Checklist for New Pages
- [ ] Identify all "point-style" subheadings.
- [ ] Add the element selector to the unified CSS rule in the `<style id="mobile-optimizations">` block.
- [ ] Strip font-related classes from the HTML tags of those subheadings.
- [ ] Verify that no subheadings remain in `italic` style.
