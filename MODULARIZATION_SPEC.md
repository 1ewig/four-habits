# Four Habits — Component Modularization Spec

## Overview

This document outlines the modularization plan for refactoring the Four Habits codebase to improve maintainability, reduce duplication, and establish a scalable component architecture.

---

## Current Issues

### Issue 1: Button + Modal Pattern Duplication

**Affected Files:**
- `src/components/You/ProfileButton.tsx`
- `src/components/You/HabitButton.tsx`
- `src/components/You/ResetButton.tsx`
- `src/components/You/ThemeButton.tsx`

**Problem:** Each component duplicates identical open/close state management and Modal rendering pattern.

**Current Pattern (repeated in all 4):**
```tsx
const [isOpen, setIsOpen] = useState(false);
// ...
<motion.button onClick={() => setIsOpen(true)} ... />
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} ... />
```

---

### Issue 2: Undo Pattern Duplication

**Affected Locations:**
- `ProfileButton.tsx:55-58` — undo on name change
- `ProfileButton.tsx:74-77` — undo on bio change
- `HabitButton.tsx:54-60` — undo on "why" change
- `HabitButton.tsx:86-93` — undo on habit change
- `ResetButton.tsx:46-51` — undo on hour change
- `ResetButton.tsx:59-64` — undo on minute change
- `You.tsx:23-27` — toast state management

**Problem:** Every edit requires: store previous value → set new value → show toast with undo callback. This 3-step pattern is repeated 7+ times.

---

### Issue 3: Form State Sync Duplication

**Affected Files:**
- `ProfileButton.tsx:25-26` — tempName/tempBio state
- `HabitButton.tsx:15-16` — tempHabits/tempWhy state

**Problem:** Nearly identical blur-to-commit pattern in both files.

**Current Pattern:**
```tsx
const [tempValue, setTempValue] = useState(initialValue);
useEffect(() => setTempValue(initialValue), [initialValue]);
// ...
<input value={tempValue} onChange={e => setTempValue(e.target.value)} />
// on blur:
onChange(tempValue);
showToast('Saved', () => onChange(previousValue));
```

---

### Issue 4: Segmented Control Duplication

**Affected Files:**
- `NeuralWeb.tsx:85-96` — pattern selector (sunflower/tree/lotus)
- `MomentumCharts.tsx:22-33` — view selector (weekly/monthly/stats)
- `Navigation.tsx:47-69` — nav tabs

**Problem:** All three implement the same pattern: map over options with conditional active styling.

---

### Issue 5: Magic Numbers Hardcoded

**Affected Locations:**
- `HabitCard.tsx:31` — `text-[26px]`
- `store.ts:59-62,73,116-118,134` — assumes 4 habits
- `NeuralWeb.tsx:33` — `Math.sqrt(i) * 28`
- `MomentumCharts.tsx:41` — `7` days for weekly view
- `Navigation.tsx:10-31` — theme emojis inline
- `store.ts:134` — `if (rand < 0.4)` 40% perfect day rate

**Problem:** No central definition of constants. Values scattered across files.

---

### Issue 6: Date Logic Duplication

**Affected Locations:**
- `store.ts:41,112,128-131` — date string manipulation
- `Home.tsx:52-56` — `getYesterdayStr()`
- `Header.tsx:18-22` — display date formatting

**Problem:** Date formatting and parsing logic repeated in multiple places.

---

### Issue 7: Demo Mode Logic Mixed with Store

**Affected File:** `store.ts:122-147`

**Problem:** `toggleDemoMode` mixes UI state toggle with data generation logic.

---

### Issue 8: THEME_EMOJIS Inline in Navigation

**Affected File:** `Navigation.tsx:10-31`

**Problem:** Theme emoji/name metadata hardcoded inline instead of centralized.

---

### Issue 9: Haptic Feedback Logic Mixed with State

**Affected File:** `Home.tsx:24-41`

**Problem:** `handleToggle` mixes haptic feedback logic with state updates.

---

### Issue 10: NeuralWeb Calculation Logic in Component

**Affected File:** `NeuralWeb.tsx:17-79`

**Problem:** SVG node and path calculations are embedded in the component rather than extracted to composable hooks.

---

## Refactoring Order

### Phase 1: Constants & Utilities

**Rationale:** Foundation layer. No dependencies on other new code. All subsequent phases depend on this.

**Deliverables:**

1. **`src/lib/constants.ts`** — Centralize magic numbers
   - `HABITS_COUNT`
   - `PERFECT_DAY_PERCENTAGE`
   - `WEEKLY_DAYS`
   - `MONTHLY_DAYS`
   - `MOOD_EMOJIS`
   - `DEMO_HISTORY_DAYS`

2. **`src/lib/dateUtils.ts`** — Date formatting utilities
   - `getTodayStr()`
   - `getYesterdayStr()`
   - `formatDisplayDate()`
   - `generateDateRange()`

3. **`src/lib/themes.ts`** — Theme metadata
   - Theme emoji/name mappings
   - Theme configuration objects

---

### Phase 2: Custom Hooks

**Rationale:** Abstract complex logic patterns. Phase 1 constants needed.

**Deliverables:**

1. **`src/hooks/useUndoable.ts`** — Undo pattern abstraction
   - Manages previous value storage
   - Provides commit function with automatic toast
   - Returns `{ tempValue, setTempValue, commit }`

2. **`src/hooks/useToast.ts`** — Toast state management
   - Shows toast with message and undo callback
   - Auto-dismiss handling
   - `showToast(message, onUndo?)`

3. **`src/hooks/useHaptic.ts`** — Haptic feedback wrapper
   - Vibration patterns abstraction
   - Wraps `navigator.vibrate()` calls

---

### Phase 3: UI Primitives ✅

**Deliverables:**

1. **`src/components/ui/SegmentedControl.tsx`** ✅ — Reusable tab selector
   - Props: `options`, `active`, `onChange`
   - Variants: `default`, `nav`, `compact`

2. **`src/components/ui/ModalButton.tsx`** ✅ — Button + Modal wrapper
   - Combines open/close state management
   - Props: `trigger`, `title`, `children`, `onClose`

3. **`src/components/ui/FormField.tsx`** ✅ — Reusable form input
   - Props: `label`, `value`, `onChange`, `maxLength`, `placeholder`, `rows`
   - Handles temp state sync and blur commit

4. **`src/components/ui/Toast.tsx`** ✅ — Generic toast notification
   - Props: `message`, `onUndo`, `onDismiss`

5. **`src/components/ui/IconButton.tsx`** ✅ — Reusable animated button
   - Built-in whileTap animation
   - Props: `icon`, `onClick`, `variant`, `size`

6. **`src/components/ui/TimePicker.tsx`** ✅ — Hour/minute selector
   - Props: `hours`, `minutes`, `onHoursChange`, `onMinutesChange`
   - Extract from ResetButton.tsx

7. **`src/components/ui/Toggle.tsx`** ✅ — Boolean toggle switch
   - Props: `checked`, `onChange`

8. **`src/components/ui/Modal.tsx`** ✅ — Centered modal with max-width
   - Props: `isOpen`, `onClose`, `title`, `children`
   - Slide-up animation from bottom

---

### Phase 4: Utility Modules

**Rationale:** Extract business logic from store.

**Deliverables:**

1. **`src/lib/demoUtils.ts`** — Demo data generation
   - `generateDemoHistory(days)`
   - Pure function, no store dependencies

2. **`src/lib/habitUtils.ts`** — Habit-related calculations
   - `getStatusFromBooleans()`
   - Perfect day detection
   - Streak calculation

---

### Phase 5: Store Refactoring (Optional)

**Rationale:** Split large store into focused slices.

**Deliverables:**

```
src/
└── store/
    ├── index.ts      # Combined store exports
    ├── habitSlice.ts # Habits state & actions
    ├── userSlice.ts  # Name, bio, theme
    ├── historySlice.ts # History, feelings
    └── uiSlice.ts    # Demo mode
```

---

### Phase 6: Component Refactoring

**Rationale:** Refactor existing components to use new primitives.

**Deliverables:**

1. **Refactor `ProfileButton.tsx`**
   - Replace state with `useUndoable`
   - Use `FormField` for inputs
   - Use `Toggle` for demo toggle

2. **Refactor `HabitButton.tsx`**
   - Replace state with `useUndoable`
   - Use `FormField` for textareas

3. **Refactor `ResetButton.tsx`**
   - Use `TimePicker` component

4. **Refactor `ThemeButton.tsx`**
   - Use `ModalButton` wrapper

5. **Refactor `NeuralWeb.tsx`**
   - Extract node calculation to `useNodePositions` hook
   - Extract path calculation to `usePaths` hook
   - Use `SegmentedControl`

6. **Refactor `MomentumCharts.tsx`**
   - Extract bar chart to `BarChart` component
   - Extract grid chart to `GridChart` component
   - Use `SegmentedControl`

7. **Refactor `Navigation.tsx`**
   - Use `SegmentedControl` or `IconButton`

8. **Refactor `Home.tsx`**
   - Use `useHaptic` hook
   - Use constants from `constants.ts`

9. **Refactor `Progress.tsx`**
   - Extract data aggregation to custom hook or selector

10. **Refactor `You.tsx`**
    - Remove toast state (use context or pass from parent)
    - Use `ModalButton` for each setting

---

## Target Structure

```
src/
├── components/
│   └── ui/
│       ├── Modal.tsx              # Existing, ensure generic
│       ├── SegmentedControl.tsx  # NEW
│       ├── ModalButton.tsx        # NEW
│       ├── FormField.tsx          # NEW
│       ├── Toast.tsx             # NEW
│       ├── IconButton.tsx         # NEW
│       ├── TimePicker.tsx         # NEW
│       └── Toggle.tsx             # NEW
├── hooks/
│   ├── useUndoable.ts             # NEW
│   ├── useToast.ts                # NEW
│   └── useHaptic.ts               # NEW
├── lib/
│   ├── constants.ts               # NEW
│   ├── dateUtils.ts                # NEW
│   ├── themes.ts                  # NEW
│   ├── demoUtils.ts               # NEW
│   └── habitUtils.ts              # NEW
├── pages/                         # Existing
├── store/                         # Existing (or split per Phase 5)
│   ├── index.ts
│   └── store.ts
└── App.tsx                        # Existing
```

---

## Dependency Graph

```
Phase 1 (constants, themes, date)
       ↓
Phase 2 (hooks: useUndoable, useToast, useHaptic)
       ↓
Phase 3 (ui primitives: SegmentedControl, ModalButton, FormField, etc.)
       ↓
Phase 4 (utility modules: demoUtils, habitUtils)
       ↓
Phase 5 (store refactor - optional)
       ↓
Phase 6 (component refactoring)
```

---

## Notes

- Each phase should result in passing tests/lint before moving to next phase
- Keep backward compatibility during transition
- Update imports progressively as new modules are created
- Consider adding Storybook stories for UI primitives