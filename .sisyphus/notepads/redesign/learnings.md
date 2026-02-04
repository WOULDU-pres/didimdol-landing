## [2026-02-04 15:14] Task 1: Setup Dependencies & Design System

### Dependencies Installed
- `framer-motion@12.31.0` - For smooth animations and micro-interactions
- `react-hook-form@7.71.1` - Form handling library
- `zod@4.3.6` - Schema validation
- `@hookform/resolvers@5.2.2` - Resolver bridge for react-hook-form + zod
- Note: `clsx` and `tailwind-merge` already present in package.json

### Typography Setup
- Added `Noto_Serif_KR` alongside existing `Noto_Sans_KR`
- Variable font loading pattern: `--font-noto-serif-kr`
- Applied both font variables to body className
- Font weights: 300, 400, 500, 700 (matching existing pattern)
- Added serif fallback chain in globals.css: `--font-serif: var(--font-noto-serif-kr), Georgia, serif;`

### Noble Empathy Color Palette
- Navy (`#1A237E`): Primary brand color for trust/authority
- Beige (`#F5F5F0`): Warm neutral for approachability
- Variables exposed both in `:root` and `@theme inline` for Tailwind v4 compatibility
- Naming convention: `--noble-navy`, `--noble-beige` (semantic + branded)

### Build Verification
- Build succeeded with no TypeScript errors
- Next.js 16.1.6 (Turbopack) compiled successfully
- Static routes generated: `/`, `/_not-found`, `/api/consultation`

### Patterns Observed
- Project uses Tailwind CSS v4 with `@theme inline` syntax
- Font loading follows Next.js `next/font/google` best practices
- CSS variables use descriptive prefixes (`--color-`, `--font-`, `--radius-`)

