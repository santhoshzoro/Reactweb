---
description: Repository Information Overview
alwaysApply: true
---

# React App Information

## Summary
A responsive React application built with Vite featuring login system, dashboard, and interactive UI components with particle effects and chart visualizations.

## Structure
- **reactapp/**: Main React application
  - **src/**: Core source files
  - **public/**: Static assets
  - **background/**: Custom effects
  - **lightrayslogin/**: Login UI
  - **dashboardcards/**: Dashboard components

## Language & Runtime
**Language**: JavaScript (JSX)  
**Version**: ECMAScript 2020+  
**Build System**: Vite 7.0.4  
**Package Manager**: npm  

## Dependencies
**Main Dependencies**:
- React 19.1.0
- React Router DOM 7.7.1
- Chart.js 4.5.0
- GSAP 3.13.0
- OGL 1.0.11

**Development Dependencies**:
- Vite 7.0.4
- ESLint 9.30.1
- TypeScript types

## Build & Installation
```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build
```

## Application Structure
**Entry Point**: src/main.jsx

**Main Components**:
- App.jsx: Router
- login.jsx: Login page
- dashboard.jsx: Main dashboard
- dashboardinner.jsx: Detailed view

**Routes**:
- /: Login
- /LightRays: Effects page
- /dashboard: Main dashboard
- /dashboardinner: Detailed dashboard

## Configuration
**Vite**: Standard React setup with HMR  
**ESLint**: Custom config with React plugins  
**Responsive Design**: Works on mobile and desktop