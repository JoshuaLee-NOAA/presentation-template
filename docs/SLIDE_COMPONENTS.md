# Reusable Slide Components Catalog

This template provides 6 mobile-first slide layout primitives in `src/components/slides/`.

---

## 1. Cover / Title Slide (`TitleSlide.tsx`)
- **Type**: `"title"`
- **Best For**: Presentation opening cover, deck metadata, presenter info.
- **Props**: `category`, `title`, `subtitle`, `author`, `authorRole`, `date`, `tags`, `logoPath` (defaults to `/logos/fisheries.png`).

---

## 2. Split Content Slide (`SplitSlide.tsx`)
- **Type**: `"split"`
- **Best For**: Comparing concepts, showing side-by-side text and system specifications or diagrams.
- **Props**: `category`, `title`, `subtitle`, `bullets`, `mediaCardTitle`, `mediaCardItems`, `mediaCaption`.

---

## 3. Metrics & KPI Slide (`MetricsSlide.tsx`)
- **Type**: `"metrics"`
- **Best For**: Displaying numbers, stats, performance indicators with animated counters.
- **Props**: `category`, `title`, `subtitle`, `metrics` (`value`, `label`, `description`, `trend`, `badgeColor`), `summaryNote`.

---

## 4. Feature Grid Slide (`FeatureGridSlide.tsx`)
- **Type**: `"featureGrid"`
- **Best For**: Showcasing 3 core pillars, services, or reusable components.
- **Props**: `category`, `title`, `subtitle`, `features` (`title`, `description`, `iconName`, `badge`).

---

## 5. High Impact Quote Slide (`QuoteSlide.tsx`)
- **Type**: `"quote"`
- **Best For**: Executive statements, mission vision quotes, testimonial highlights.
- **Props**: `category`, `quote`, `author`, `authorTitle`, `organization`.

---

## 6. Technical Code Slide (`CodeSlide.tsx`)
- **Type**: `"code"`
- **Best For**: Code snippets, architecture configurations, API examples.
- **Props**: `category`, `title`, `subtitle`, `snippet` (`code`, `filename`, `language`), `explanationBullets`.
