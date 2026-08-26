# NOAA Fisheries Mobile-First Presentation Template

A clean, modern, minimalist, and mobile-first presentation template application built with **Next.js (App Router)**, **Tailwind CSS**, and **Framer Motion**.

Designed for NOAA Fisheries presentations, this repository provides reusable, branded slide components, top/bottom responsive navigation, interactive slide jumpers, touch swipe gesture support, and a PRD-driven AI Agent workflow.

---

## 🎨 Branding & Design System

- **Main Brand Color**: NOAA Blue `#003087`
- **Seagrass / Ocean Green**: `#00A88F` (Marine ecosystems & coastlines)
- **Coral / Deep Orange**: `#FF6B4A` (High-contrast CTAs & highlighted data)
- **Sky Gold / Sun Yellow**: `#F59E0B` (Tertiary accents & badges)
- **Typography**: `Inter` (Light, Regular, Medium weights — no heavy bold)
- **Logos**:
  - `public/logos/blue.svg` used in the top navigation header bar.
  - `public/logos/fisheries.png` used on the title cover slide.

---

## 📱 Mobile-First Features

- **Touch Swipe Gestures**: Swipe left/right on smartphones to navigate slides.
- **Responsive Stacking**: 2-column and 3-column slides automatically stack into 1-column on mobile viewports.
- **Global Dropdown Selector**: Header dropdown to jump instantly to any slide in the deck.
- **Progress Bar**: Real-time reading progress indicator bar across the top header.
- **Keyboard Shortcuts**: Arrow keys (`←` / `→` / `Space`), `Home`, and `End`.

---

## 📁 Project Structure

```
presentation-template/
├── deck-spec/                  # PRD & Context workspace
│   ├── CONTEXT.md              # Background notes & transcripts
│   └── PRESENTATION_PRD.md     # Presentation specs & slide outline
├── docs/                       # Comprehensive documentation
│   ├── GETTING_STARTED.md      # Setup, fork, & deployment guide
│   ├── DESIGN_SYSTEM.md        # Tokens, colors, typography rules
│   ├── MOBILE_RESPONSIVE.md    # Mobile-first guidelines
│   ├── AI_WORKFLOW.md          # PRD-driven AI agent workflow guide
│   └── SLIDE_COMPONENTS.md     # Component catalog & props
├── logos/                      # User-provided logo source files
├── public/
│   └── logos/                  # Copied logo assets for web delivery
├── skills/
│   └── presentation-builder/
│       └── SKILL.md            # AI Agent skill for presentation creation
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with Inter font
│   │   ├── page.tsx            # Fullscreen presentation engine
│   │   └── globals.css         # Tailwind directives & design tokens
│   ├── components/
│   │   ├── layout/             # TopNav & BottomNav
│   │   └── slides/             # Title, Split, Metrics, FeatureGrid, Quote, Code
│   ├── content/
│   │   └── slides.ts           # Central presentation slide configuration
│   ├── hooks/                  # useSlideNavigation & useSwipe
│   └── types/                  # TypeScript interfaces
├── tailwind.config.ts
└── package.json
```

---

## 🤖 AI Agent Workflow

This repository includes `skills/presentation-builder/SKILL.md` allowing AI agents to build presentations autonomously:
1. **Context Analysis**: Agent reads user prompt + `deck-spec/CONTEXT.md`.
2. **PRD Drafting**: Agent updates `deck-spec/PRESENTATION_PRD.md`.
3. **Human Review**: Agent requests user review & approval of the PRD outline.
4. **Incremental Implementation**: Agent updates `src/content/slides.ts` slide by slide, checking in after each step.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```
