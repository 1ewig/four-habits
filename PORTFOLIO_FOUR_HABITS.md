# Four Habits — AI-Accelerated React Development Portfolio Project

> A premium momentum-based identity system and habit tracker built with modern React, featuring generative data visualization and AI-ready architecture.

---

## Project Overview

**Four Habits** is a high-end habit tracking application that embodies the "Core Four" philosophy — limiting users to just 4 customizable habits for maximum psychological impact and sustainable behavior change.

The application transforms daily consistency into an engaging, visually rewarding experience through generative art (Neural Web), momentum analytics, and a zen-like minimalist interface.

**Demo Available**: The app includes a demo mode that generates 30 days of realistic data, allowing potential clients to immediately see the visualization and analytics features in action.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | React 19 (latest with concurrent features) |
| **Build Tool** | Vite 6 with HMR |
| **Styling** | Tailwind CSS 4 (zero-runtime CSS variables) |
| **State** | Zustand with persist middleware |
| **Animations** | Motion (Framer Motion's modern package) |
| **Language** | TypeScript 5.8 (strict mode) |
| **Icons** | Lucide React |
| **AI** | Google Gemini SDK (configured) |

---

## Architecture

```
src/
├── main.tsx                 # React 19 entry with StrictMode
├── App.tsx                  # Root with page routing
├── index.css                # Tailwind 4 + CSS custom properties
├── lib/
│   └── store.ts             # Zustand store with persistence
├── pages/
│   ├── Home.tsx             # Main habit tracking
│   ├── Progress.tsx         # Analytics & visualization
│   └── You.tsx              # Settings & customization
└── components/
    ├── Header.tsx           # Date display with navigation
    ├── Navigation.tsx       # Bottom tab bar with animations
    ├── Home/
    │   ├── HabitGrid.tsx    # Animated 2x2 grid
    │   ├── HabitCard.tsx    # Individual habit button
    │   └── MoodPicker.tsx   # Mood logging component
    ├── Progress/
    │   ├── NeuralWeb.tsx       # Generative SVG visualization
    │   └── MomentumCharts.tsx  # Analytics charts
    └── You/
        ├── Modal.tsx           # Reusable modal component
        ├── ProfileButton.tsx   # Identity settings
        ├── HabitButton.tsx     # Habit customization
        ├── ThemeButton.tsx     # Theme selector
        ├── ResetButton.tsx     # Day reset configuration
        └── UndoToast.tsx        # Action feedback toast
```

---

## Key Features

### Core Four System
- 4 customizable habit pillars with identity-focused "why" statements
- Default habits: sweat., build., read., fast.
- Per-habit tracking with completion status

### Neural Web Visualization
Custom generative art system transforming habit data into visual beauty:

| Mode | Algorithm | Pattern |
|------|-----------|---------|
| **Sunflower** | Golden angle (137.5°) | Radial growth |
| **Tree** | Binary branching | Organic tree structure |
| **Lotus** | Radial symmetry | Flower-like patterns |

- SVG-based with animated path rendering
- Color-coded by completion status
- Dynamic growth based on habit history

### Momentum Analytics
- Weekly bar charts (7-day view)
- Monthly heatmap (28-day grid)
- Perfect day counter
- Consistency percentage calculation
- Smart reset time handling for late-night logging

### Zen Experience
- 3-emoji mood picker
- 9 premium themes: carbon, ghost, sand, birch, sakura, frost, arctic, bone, obsidian
- Bento-grid settings layout
- Haptic feedback on interactions
- 60fps animations via Motion library

---

## Technical Highlights

### AI-Accelerated Development

This project demonstrates AI-assisted development practices:

1. **AI Pair Programming**: Used Claude/Minimax to:
   - Generate component architecture
   - Debug complex state management
   - Optimize render performance
   - Design algorithmic solutions (golden angle, binary tree patterns)

2. **AI-Ready Infrastructure**:
   - Google Gemini SDK configured
   - Environment variable setup for API keys
   - Store architecture prepared for AI-powered insights

### Design Patterns

**State Management (Zustand)**:
```typescript
persist(
  (set, get) => ({
    habits: ['sweat.', 'build.', 'read.', 'fast.'],
    history: {},
    today_done: [false, false, false, false],
    checkReset: () => { /* logical day calculation */ },
    // ... actions
  }),
  { name: 'habit_v4' }
)
```

**Key Patterns Implemented**:
- Compound components (Modal, ProfileButton, ThemeButton)
- CSS variables theming with className injection
- Motion's `layoutId` for smooth tab transitions
- Memoized calculations for expensive visualizations
- Hook composition with custom listeners

### Complex Algorithms

**Neural Web Golden Angle**:
```typescript
const angle = i * 2.39996323; // Golden angle in radians
const radius = Math.sqrt(i) * 28 + restBoost;
```

**Smart Reset Logic**: Handles user-defined "logical days" for tracking past midnight with configurable reset times.

---

## Performance Optimizations

- Decoupled visualization logic from state updates
- Memoized SVG calculations via `useMemo`
- Motion's `AnimatePresence` for efficient unmount animations
- Lazy component patterns
- TypeScript strict mode for type safety

---

## Build & Deployment

```bash
# Development
npm run dev

# Production build
npm run build

# Linting
npm run lint
```

---

## Why This Project Showcases Skills

| Skill Demonstrated | Evidence |
|-------------------|----------|
| **React 19 Mastery** | Latest features, StrictMode, concurrent patterns |
| **State Architecture** | Zustand with persistence, complex derived state |
| **Data Visualization** | Custom generative SVG algorithms |
| **Design System** | 9-theme architecture with CSS variables |
| **Animation UX** | 60fps Motion animations, haptic feedback |
| **TypeScript** | Strict mode, full type coverage |
| **AI Integration** | Gemini SDK configured, AI-assisted development |
| **Performance** | Memoization, lazy patterns, optimized renders |

---

## Source Code

**GitHub**: `https://github.com/[username]/four-habits`

---

*Built with React 19, Zustand, Motion, and AI-assisted development.*