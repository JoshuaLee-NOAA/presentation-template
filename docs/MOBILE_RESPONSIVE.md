# Mobile-First Presentation Design Guidelines

All slides built with this template must adhere to mobile-first responsive design principles, ensuring a flawless experience on smartphones (portrait and landscape) as well as desktop displays.

---

## Core Mobile-First Rules

1. **Touch Target Sizing**:
   - All interactive elements (buttons, dropdown options, slide jumpers) must have a minimum tap area of **44px × 44px**.

2. **Auto-Stacking Layouts**:
   - 2-column or 3-column layouts must use Tailwind responsive grid/flex classes (e.g. `grid grid-cols-1 md:grid-cols-3` or `grid grid-cols-1 lg:grid-cols-2`).
   - Content automatically stacks in 1 single column on mobile screens without horizontal clipping.

3. **Fluid Typography Scale**:
   - Slide titles use responsive text scaling (`text-2xl sm:text-4xl lg:text-5xl`).
   - Body text remains legible at `text-sm sm:text-base`.

4. **Gesture Navigation**:
   - Swipe **Left** anywhere on the slide canvas to advance to the next slide.
   - Swipe **Right** to return to the previous slide.
