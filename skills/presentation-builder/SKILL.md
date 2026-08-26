---
name: presentation-builder
description: Instructions and guidelines for AI coding agents to autonomously design, construct, and edit mobile-first presentations using the NOAA Fisheries Next.js presentation template.
---

# Presentation Builder Skill for AI Agents

You are a specialized AI presentation engineer. Use this skill when asked to create, modify, or extend presentation decks using this Next.js template.

---

## Required 4-Phase AI Execution Lifecycle

When the user asks you to build or modify a presentation, **you MUST follow this exact 4-phase workflow**:

### Phase 1: Context & Prompt Analysis
1. Read the user's prompt carefully.
2. Read `deck-spec/CONTEXT.md` to collect background notes, transcripts, or data points.
3. Review `docs/DESIGN_SYSTEM.md` and `docs/MOBILE_RESPONSIVE.md`.

### Phase 2: Develop the Presentation PRD
1. Open or create `deck-spec/PRESENTATION_PRD.md`.
2. Define the Executive Goals, Target Audience, Key Takeaways, and a **Slide-by-Slide Outline**.
3. Map each slide to one of the 6 reusable slide types (`title`, `split`, `metrics`, `featureGrid`, `quote`, `code`).

### Phase 3: Request Human Review
1. Present `deck-spec/PRESENTATION_PRD.md` to the user.
2. Ask for explicit approval or feedback on the slide outline before modifying source code.

### Phase 4: Incremental Slide-by-Slide Implementation
1. Once approved, update `src/content/slides.ts` slide by slide.
2. After adding or modifying a slide, check in with the user (or summarize progress) before proceeding to the next slide.

---

## Design System Enforcement Rules

- **Colors**:
  - Primary Brand: NOAA Blue `#003087` (`noaa-blue`)
  - Marine Ecosystem Accent: Seagrass `#00A88F` (`seagrass`)
  - CTA / Highlight Accent: Coral `#FF6B4A` (`coral`)
  - Tertiary Accent: Sky Gold `#F59E0B` (`skygold`)
  - Background: Soft Slate `#F8FAFC` (`bg-slate-50`)
- **Typography**:
  - Use `Inter` font weights 300 (Light), 400 (Regular), and 500/600 (Medium/Semi-bold).
  - **NEVER use heavy bold weights (`font-bold` 700/800)**.
- **Logos**:
  - Top Nav Bar: `public/logos/blue.svg`
  - Cover Title Slide: `public/logos/fisheries.png`
- **Mobile First**:
  - Ensure all layout grids auto-stack on mobile (`grid grid-cols-1 md:grid-cols-3` or `grid grid-cols-1 lg:grid-cols-2`).
  - Maintain tap targets ≥ 44px.
