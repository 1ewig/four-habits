# Four Habits — AI-Accelerated React Development Portfolio Project

> A premium momentum-based identity system and habit tracker built with modern React, featuring generative data visualization and modular architecture with clear separation of concerns.

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

## Architecture — Clean Separation of Concerns

```
src/
├── components/
│   ├── ui/                     # 6 reusable UI primitives
│   │   ├── Modal.tsx           # Slide-up modal with smooth animation
│   │   ├── SegmentedControl.tsx # Tab selector (default/nav variants)
│   │   ├── FormField.tsx        # Labeled input with undo pattern
│   │   ├── Toggle.tsx           # Animated boolean switch
│   │   ├── TimePicker.tsx       # Hour/minute selector
│   │   └── SettingsCard.tsx    # Reusable settings button
│   ├── Home/                   # Home page components
│   │   ├── TodayHeader.tsx      # Date header with navigation
│   │   ├── HabitGrid.tsx        # 2x2 habit grid
│   │   ├── HabitCard.tsx        # Individual habit card
│   │   └── MoodPicker.tsx       # Emoji mood selector
│   ├── Progress/               # Progress page components
│   │   ├── NeuralWeb.tsx        # Generative art visualization
│   │   └── MomentumCharts.tsx  # Bar charts & stats
│   └── You/                    # You page components
│       ├── ProfileButton.tsx   # Profile settings
│       ├── HabitButton.tsx     # Habits & why settings
│       ├── ThemeButton.tsx     # Theme selection
│       ├── ResetButton.tsx     # Reset time settings
│       └── UndoToast.tsx       # Toast notification
├── hooks/                       # 7 custom hooks
│   ├── useHaptic.ts             # Vibration patterns
│   ├── useUndoable.ts           # Undo pattern for single values
│   ├── useNodePositions.ts      # Neural Web node calculations
│   ├── usePaths.ts              # SVG path generation
│   ├── useProgressData.ts       # Data aggregation for analytics
│   ├── useNodePositions.ts      # Neural Web positioning
│   └── usePaths.ts              # Neural Web paths
├── lib/                         # 5 utility modules
│   ├── constants.ts             # Magic numbers, config objects
│   ├── animations.ts            # Shared animation configs
│   ├── dateUtils.ts             # Date formatting/parsing
│   ├── themes.ts                # Theme metadata (emoji, name)
│   └── habitUtils.ts            # Habit calculations, status detection
├── pages/                       # 3 pages (thin orchestrators)
│   ├── Home.tsx                 # Home page
│   ├── Progress.tsx             # Progress page
│   └── You.tsx                  # You page
├── store.ts                     # Zustand store with selectors
└── App.tsx                      # Root component
```

---

## Architecture Pattern

```
Page (thin orchestrator)
    ↓ renders
Component (self-sufficient UI, calls store directly)
    ↓ uses
Hook (business logic)
    ↓ uses
Utility/Constants (pure functions)
    ↓ uses
Zustand Store (state management)
```

**Key Principle**: Pages are now pure UI orchestrators with zero business logic. Components call the store directly for their data.

---

## Key Features

### Core Four System
- 4 customizable habit pillars with identity-focused "why" statements
- Default habits: sweat., build., read., fast.
- Per-habit tracking with completion status
- Late-night logging support with configurable reset times

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
- 3-emoji mood picker (😞 😐 🤩)
- 9 premium themes: carbon, ghost, sand, birch, sakura, frost, arctic, bone, obsidian
- Bento-grid settings layout with consistent buttons
- Haptic feedback on interactions
- 60fps animations via Motion library
- "Yesterday" display instead of date when viewing previous day

---

## Technical Highlights

### AI-Accelerated Development

This project demonstrates AI-assisted development practices:

1. **AI Pair Programming**: Used Claude/Minimax to:
   - Generate component architecture
   - Debug complex state management
   - Optimize render performance
   - Design algorithmic solutions (golden angle, binary tree patterns)
   - Systematically refactor for modularity

2. **AI-Ready Infrastructure**:
   - Google Gemini SDK configured
   - Environment variable setup for API keys
   - Store architecture prepared for AI-powered insights

### Modular Architecture (6-Phase Refactoring)

The codebase underwent systematic modularization:

| Phase | Focus | Result |
|-------|-------|--------|
| **Phase 1** | Constants & Utilities | Pure functions in `lib/` |
| **Phase 2** | Custom Hooks | Stateful logic abstracted |
| **Phase 3** | UI Primitives | 6 reusable components |
| **Phase 4** | Component Refactoring | Pages become thin orchestrators |
| **Phase 5** | Self-Sufficient Components | Components call store directly |
| **Phase 6** | Animation Centralization | Shared transitions in lib/animations.ts |

### State Management (Zustand)

```typescript
// Components call store directly - no props drilling
export function TodayHeader() {
  const viewDate = useHabitStoreBase((s) => s.viewDate);
  const today_date = useHabitStoreBase((s) => s.today_date);
  const late_logging = useHabitStoreBase((s) => s.late_logging);
  const why = useHabitStoreBase((s) => s.why);
  const setViewDate = useHabitStoreBase((s) => s.setViewDate);
  // ... render
}
```

### Shared Animation System

All animations centralized in `lib/animations.ts`:

```typescript
export const TRANSITIONS = {
  modalSlide: { stiffness: 150, damping: 20, mass: 0.8 },
  barChart: { stiffness: 100, damping: 20 },
  page: { duration: 0.2, ease: 'easeInOut' },
  habitPage: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
} as const;
```

### Key Patterns Implemented

- **Pages as Orchestrators**: Zero business logic, just render components
- **Self-Sufficient Components**: Each component calls store for its own data
- **Selector Pattern**: Optimized subscriptions prevent unnecessary re-renders
- **CSS Variables Theming**: 9-theme architecture via className injection
- **Motion's `layoutId`**: Smooth tab transitions
- **Memoized Calculations**: `useMemo` for expensive SVG/analytics

---

## Performance Optimizations

- **Direct store access**: Components subscribe to specific slices, no prop drilling
- **Memoized SVG calculations**: `useMemo` for Neural Web nodes/paths
- **Decoupled visualization**: Pure calculation hooks separated from UI
- **Motion's `AnimatePresence`**: Efficient unmount animations
- **TypeScript strict mode**: Full type coverage with no implicit any

---

## Build & Deployment

```bash
# Development
npm run dev

# Production build
npm run build
```

---

## Why This Project Showcases Skills

| Skill Demonstrated | Evidence |
|-------------------|----------|
| **React 19 Mastery** | Latest features, StrictMode, concurrent patterns |
| **Modular Architecture** | 6-phase refactoring, clean separation of concerns |
| **State Management** | Zustand with persist, direct component access |
| **Data Visualization** | Custom generative SVG algorithms (golden angle, binary tree) |
| **Custom Hooks** | 7 hooks covering state, calculations, and utilities |
| **UI Primitives** | 6 reusable components in `ui/` folder |
| **Design System** | 9-theme architecture with CSS variables |
| **Animation UX** | Centralized animations with smooth transitions |
| **TypeScript** | Strict mode, full type coverage |
| **AI Integration** | Gemini SDK configured, AI-assisted development |
| **Performance** | Memoization, direct store access, optimized renders |

---

## Project Statistics

- **6 phases** of systematic modularization
- **7 custom hooks** for logic abstraction
- **6 UI primitives** for reusable components
- **5 utility modules** for pure functions
- **3 pages** as thin orchestrators
- **~150 lines** in Zustand store (well-organized, no over-engineering)

---

## Source Code

**GitHub**: `https://github.com/1ewig/Four-Habits`

---

*Built with React 19, Zustand, Motion, and AI-assisted development.*