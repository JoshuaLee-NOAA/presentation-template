# Getting Started with the Presentation Template

Welcome to the **NOAA Fisheries Presentation Template** repository. This project is engineered with Next.js, Tailwind CSS, and Framer Motion to deliver modern, mobile-first presentation decks that render flawlessly on mobile smartphones, tablets, and desktop displays.

---

## Quick Start (3 Steps)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the interactive presentation deck.

### 3. Build for Production
```bash
npm run build
```

---

## How to Fork & Create a New Presentation Deck

1. **Fork or Clone this Repository** to create your new presentation project.
2. **Add Background Context**:
   Open `deck-spec/CONTEXT.md` and paste your project notes, transcripts, or data points.
3. **Draft the Presentation PRD**:
   Update `deck-spec/PRESENTATION_PRD.md` with your presentation goals and slide-by-slide outline.
4. **Configure Your Slide Deck**:
   Open `src/content/slides.ts` and update the `presentationConfig` object with your slide content.

---

## Controls & Keyboard Shortcuts

- **Keyboard Navigation**:
  - `→` / `↓` / `Space` / `PageDown`: Next slide
  - `←` / `↑` / `PageUp`: Previous slide
  - `Home`: Jump to first cover slide
  - `End`: Jump to final slide
- **Mobile Touch Controls**:
  - Swipe **Left** for Next slide
  - Swipe **Right** for Previous slide
- **Top Navigation Dropdown**:
  - Click the slide title picker in the header to jump directly to any slide in the deck.
- **Fullscreen**:
  - Click the **Fullscreen** button in the bottom bar to launch fullscreen presentation mode.
