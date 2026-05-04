# four habits.

**track less. stay consistent.**

A premium, momentum-based identity system and habit tracker designed for those who value minimalist excellence and psychological consistency. Built with React 19, Motion, and Tailwind CSS 4.

## Key Features

### 1. Fully Customizable Core
While the system promotes a "Core Four" philosophy for maximum impact, every habit is fully customizable. You can redefine your identity by tracking any four pillars that matter to you. Defaults include:
- **sweat.** — Physical vitality and movement.
- **build.** — Productivity, deep work, and creation.
- **read.** — Continuous learning and mental expansion.
- **fast.** — Health, discipline, and metabolic control.

### 2. Neural Web Visualization
Experience your consistency through a dynamic, generative art system. Switch between different modes to see your habit history bloom:
- **Sunflower Mode**: Radial growth representing daily completion.
- **Tree Mode**: Branching consistency over time.
- **Lotus Mode**: Symmetry and balance in your routine.

### 3. Momentum & Analytics
Move beyond simple streaks. Our momentum system tracks the *velocity* of your habits, giving you a deeper understanding of your lifestyle patterns through:
- **Weekly & Monthly Charts**: High-level overviews of your commitment.
- **Frequency Heatmaps**: Visualizing density of successful days.
- **Identity Statistics**: Data-driven insights into your emerging self.

### 4. Zen Experience
- **Mood Logging**: A simple, emoji-based reflection on how your day felt.
- **Bento Settings**: A beautiful, modular "You" page for total customization.
- **Dynamic Themes**: Premium color palettes (like Obsidian, Latte, and Nord) that adapt to your environment.
- **Custom Quotes**: Daily motivational anchors to keep you focused.

## Tech Stack

- **Framework**: **React 19** (leveraging the latest Hooks and performance optimizations)
- **Styling**: **Tailwind CSS 4** (high-performance zero-runtime CSS with modern CSS variables)
- **State Management**: **Zustand** (lightweight, decoupled state with robust local persistence)
- **Animations**: **Motion** (orchestrating complex layout transitions and 60fps micro-interactions)
- **Visualization**: Generative SVG logic for real-time history rendering
- **Build Tooling**: **Vite** with HMR and optimized production bundling

---

## 🛠️ Technical Deep Dive

### 1. Generative Art System (Neural Web)
One of the core engineering challenges was creating the **Neural Web**—a generative SVG visualization that translates historical habit data into organic patterns.
- **Dynamic Rendering**: Implemented custom algorithms to map date-based completion arrays to radial (Sunflower), branching (Tree), and symmetrical (Lotus) SVG paths.
- **Performance**: Optimized re-renders by decoupling the visualization logic from the main application state, ensuring smooth transitions even with years of data.

### 2. Performant State Architecture
- **Persistent Storage**: Utilized Zustand's middleware to handle deep-nested history objects, ensuring 100% offline-first functionality without the overhead of a heavy database.
- **Smart Reset Logic**: Engineered a custom time-based reset system that accounts for user-defined "logical days" (allowing habit tracking past midnight without breaking streaks).

### 3. Motion Design & UX
- **Identity-First UX**: Focused on reducing "friction to log" by implementing a bento-grid layout that prioritizes high-impact interactions.
- **Micro-interactions**: Used Motion's layout animations to provide tactile feedback during habit completion, reinforcing the psychological reward cycle.

---

## 🚀 Development & Deployment

### Prerequisites
- [Node.js](https://nodejs.org/) (Latest LTS)

### Installation & Local Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/1ewig/four-habits
   ```
2. Navigate to the project root:
   ```bash
   cd four-habits
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Spin up the development environment:
   ```bash
   npm run dev
   ```

---
*Crafted with precision by Antigravity*


