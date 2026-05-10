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
│   └── ui/                     # 8 reusable UI primitives
│       ├── Modal.tsx           # Slide-up modal with animation
│       ├── SegmentedControl.tsx # Tab selector (default/nav variants)
│       ├── FormField.tsx        # Labeled input with undo pattern
│       ├── Toggle.tsx           # Animated boolean switch
│       ├── TimePicker.tsx       # Hour/minute selector
│       ├── IconButton.tsx       # Animated icon button
│       ├── Toast.tsx            # Notification display
│       └── ModalButton.tsx       # Button + Modal wrapper
├── hooks/                       # 9 custom hooks
│   ├── useHaptic.ts             # Vibration patterns
│   ├── useUndoable.ts           # Undo pattern for single values
│   ├── useUndoableArray.ts      # Undo pattern for arrays
│   ├── useToast.ts              # Toast state management
│   ├── useNodePositions.ts      # Neural Web node calculations
│   ├── usePaths.ts              # SVG path generation
│   └── useProgressData.ts       # Data aggregation for analytics
├── lib/                         # 4 utility modules
│   ├── constants.ts             # Magic numbers, config objects
│   ├── dateUtils.ts             # Date formatting/parsing
│   ├── themes.ts                # Theme metadata (emoji, name)
│   └── habitUtils.ts            # Habit calculations, status detection
├── pages/                       # 3 pages (UI only)
├── store.ts                     # Zustand store with selectors
└── App.tsx                      # Root component
```

---

## Architecture Pattern

```
UI Component → Hook (stateful logic) → Utility/Constants (pure functions)
     ↓
  Zustand Store (state management + selectors)
```

**Flow Example:**
```
NeuralWeb component (UI)
    ↓ uses
useNodePositions hook (calculation) + usePaths hook (path generation)
    ↓ uses
constants.ts (NEURAL_WEB config)
    ↓ uses
useProgressData hook (data aggregation)
    ↓ reads
Zustand store (via selectors)
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

### Modular Architecture (6-Phase Refactoring)

The codebase underwent systematic modularization:

| Phase | Focus | Result |
|-------|-------|--------|
| **Phase 1** | Constants & Utilities | Pure functions in `lib/` |
| **Phase 2** | Custom Hooks | Stateful logic abstracted |
| **Phase 3** | UI Primitives | 8 reusable components |
| **Phase 4** | Utility Modules | Business logic extracted |
| **Phase 5** | Store Enhancement | Selector hooks for optimization |
| **Phase 6** | Component Refactoring | Pure UI components |

### State Management (Zustand)

```typescript
// Store with selectors for optimized re-renders
export function useIsPerfectDay() {
  return useHabitStoreBase((s) => s.today_done.every(Boolean));
}

export function useActiveHistory() {
  return useHabitStoreBase((s) => s.demo_mode ? s.demo_history : s.history);
}
```

### Key Patterns Implemented

- **Separation of Concerns**: UI → Hooks → Utilities → Constants
- **Selector Pattern**: Optimized subscriptions prevent unnecessary re-renders
- **Hook Composition**: Custom hooks abstract complex logic
- **CSS Variables Theming**: 9-theme architecture via className injection
- **Motion's `layoutId`**: Smooth tab transitions
- **Memoized Calculations**: `useMemo` for expensive SVG/analytics

### Complex Algorithms

**Neural Web Golden Angle**:
```typescript
const angle = i * 2.39996323; // Golden angle in radians
const radius = Math.sqrt(i) * 28 + restBoost;
```

**Smart Reset Logic**: Handles user-defined "logical days" for tracking past midnight with configurable reset times.

---

## Performance Optimizations

- **Selector hooks**: Components subscribe to specific slices, not entire store
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

# Linting
npm run lint
```

---

## Why This Project Showcases Skills

| Skill Demonstrated | Evidence |
|-------------------|----------|
| **React 19 Mastery** | Latest features, StrictMode, concurrent patterns |
| **Modular Architecture** | 6-phase refactoring, clean separation of concerns |
| **State Management** | Zustand with persist, selector hooks for optimization |
| **Data Visualization** | Custom generative SVG algorithms (golden angle, binary tree) |
| **Custom Hooks** | 9 hooks covering state, calculations, and utilities |
| **UI Primitives** | 8 reusable components in `ui/` folder |
| **Design System** | 9-theme architecture with CSS variables |
| **Animation UX** | 60fps Motion animations, haptic feedback |
| **TypeScript** | Strict mode, full type coverage |
| **AI Integration** | Gemini SDK configured, AI-assisted development |
| **Performance** | Memoization, selector pattern, optimized renders |

---

## Project Statistics

- **6 phases** of systematic modularization
- **9 custom hooks** for logic abstraction
- **8 UI primitives** for reusable components
- **4 utility modules** for pure functions
- **~150 lines** in Zustand store (well-organized, no over-engineering)

---

## Source Code

**GitHub**: `https://github.com/1ewig/Four-Habits`

---

*Built with React 19, Zustand, Motion, and AI-assisted development.*