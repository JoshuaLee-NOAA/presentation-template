# NOAA Fisheries Design System & Branding Guidelines

This template strictly follows the NOAA Fisheries visual design language, ensuring high accessibility, clean Light Mode contrast, and polished minimalist typography.

---

## 1. Color Palette Tokens

| Name | Class / HEX | Usage Directive |
| :--- | :--- | :--- |
| **NOAA Blue** | `bg-noaa-blue` (`#003087`) | Primary brand color. Used for headers, active slide badges, primary buttons, and top logos. |
| **Seagrass Green** | `bg-seagrass` (`#00A88F`) | Secondary accent representing marine ecosystems. Used for success trends, key bullets, and system specs. |
| **Coral Orange** | `bg-coral` (`#FF6B4A`) | High-contrast callout accent. Used sparingly for accent lines, primary action buttons, and active indicators. |
| **Sky Gold** | `bg-skygold` (`#F59E0B`) | Tertiary accent. Used for highlighted stats, warning callouts, and secondary metrics. |
| **Soft Slate Background** | `bg-slate-50` (`#F8FAFC`) | Main slide canvas backdrop for clean Light Mode aesthetic. |
| **Deep Charcoal Text** | `text-slate-900` (`#0F172A`) | Primary heading text color. |

---

## 2. Typography Rules

- **Primary Font**: `Inter`
- **Technical Code Font**: `JetBrains Mono`
- **Weight Style Rules**:
  - Use `font-light` (300) for subtle tags and captions.
  - Use `font-normal` (400) for body text and bullet lists.
  - Use `font-medium` (500) and `font-semibold` (600) for slide titles and KPI figures.
  - **AVOID heavy bold weights (`font-bold` 700/800)** to maintain a clean, modern, minimalist feel.

---

## 3. Logo Placement Rules

1. **Top Navigation Bar (`TopNav.tsx`)**:
   Always displays `public/logos/blue.svg` (small NOAA Blue vector SVG logo).
2. **Title Cover Slide (`TitleSlide.tsx`)**:
   Prominently features `public/logos/fisheries.png` (official NOAA Fisheries brand logo).
