# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**PROFILING** is a React-based portfolio archiving and showcasing website. It's a modern single-page application that allows developers and designers to archive and display their work with an interactive 3D hero section (powered by Spline), responsive design, and dynamic portfolio management.

## Common Commands

### Development
- **`npm run dev`** — Start local dev server (accessible at http://localhost:5173)
- **`npm run build`** — Compile TypeScript and build with Vite for production
- **`npm run preview`** — Preview the production build locally
- **`npm run lint`** — Run ESLint to check code quality across all `.ts` and `.tsx` files

## Architecture

### High-Level Structure

The application follows a standard React routing pattern with localStorage for persistence:

1. **Entry Point** (`src/main.tsx`): Mounts React app to `#root` in `index.html`
2. **Root Component** (`src/App.tsx`):
   - Manages portfolio state with localStorage persistence (key: `profiling_portfolios`)
   - Loads initial profile and portfolio data from JSON files
   - Sets up React Router with two main routes

### Routing

- **`/`** (Home) — Main page displaying all sections: Header, Hero, Profile, Portfolio grid, Contact links, Footer
- **`/portfolio/:id`** — Detail page for a specific portfolio item

### Data Flow

- **Profile Data** (`src/data/profile.json`): Static user information (name, role, bio, skills, email)
- **Portfolio Data** (`src/data/portfolios.json`): Initial portfolio items (loaded on first visit if localStorage is empty)
- **State Persistence**: Portfolio additions/edits persist via localStorage. Profile data is immutable.

### Component Organization

- **`components/`** — Reusable UI components:
  - `Header.tsx` — Navigation bar with links to sections
  - `PortfolioCard.tsx` — Individual portfolio item card
  - `PortfolioForm.tsx` — Form for adding new portfolio items
  - `ProfileSection.tsx` — User profile display with skills and contact

- **`pages/`** — Page-level route components:
  - `Home.tsx` — Renders full home page with all sections
  - `PortfolioDetail.tsx` — Renders detail view for a portfolio item by ID

- **`types/index.ts`** — TypeScript interfaces for type safety:
  - `Profile` — User profile structure
  - `Portfolio` — Portfolio item structure (id, title, thumbnail, description, skills)

### Styling

- CSS-in-files approach (no CSS-in-JS framework)
- Main styles in `src/index.css` and component-specific `.css` files
- No global CSS preprocessor (uses plain CSS)

### Build Configuration

- **Vite** with React plugin for fast dev and optimized production builds
- **TypeScript** configurations:
  - `tsconfig.json` — Root config with project references
  - `tsconfig.app.json` — App-specific TypeScript settings
  - `tsconfig.node.json` — Build tool TypeScript settings
- **ESLint** (flat config) includes:
  - JavaScript recommended rules
  - TypeScript ESLint rules
  - React Hooks plugin (warns on improper hook usage)
  - React Refresh plugin (HMR safety for React)

## Key Dependencies

- **react** (^19.2.0) — UI framework
- **react-dom** (^19.2.0) — DOM rendering
- **react-router-dom** (^7.13.0) — Client-side routing
- **uuid** (^13.0.0) — Unique ID generation for new portfolio items
- **TypeScript** (~5.9.3) — Type safety
- **Vite** (^7.3.1) — Build tool and dev server
- **ESLint** — Code quality

## Important Notes

- **No test framework** is set up yet (no tests directory or test scripts)
- **localStorage is the only persistence layer** — no backend or database
- **Profile data is static** — can only be modified by editing `src/data/profile.json`
- **Portfolio items are dynamic** — added via UI form and persisted to localStorage
- **3D Spline integration** mentioned in README but not visible in source files (likely loaded via CDN or external component)
