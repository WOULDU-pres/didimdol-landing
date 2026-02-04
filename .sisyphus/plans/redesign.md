# Didimdol Landing Page Redesign Plan

## TL;DR

> **Quick Summary**: Complete redesign of the landing page to appeal to 40-50s women with a "Noble Empathy" tone. Refactors the single `page.tsx` into a modular 3-section layout (Hero, Story, Contact) using Next.js 16, Tailwind v4, and Framer Motion for scroll reveals.
> 
> **Deliverables**:
> - Updated `page.tsx` with 3 sections (Hero, Story, Contact)
> - New `StorySection` and `ContactSection` components
> - Integrated `framer-motion` for scroll animations
> - `react-hook-form` + `zod` implementation for the contact form
> - Updated typography (Noto Serif KR + Noto Sans KR)
> 
> **Estimated Effort**: Medium (1-2 days)
> **Parallel Execution**: YES - 2 waves
> **Critical Path**: Setup Deps → Component Implementation → Integration

---

## Context

### Original Request
Redesign the landing page to include:
1. Hero with Bubmusa photo.
2. Story section with scroll-triggered text reveal and photo.
3. Contact form.
Target audience: 40-50s women. Tone: "Noble Empathy" (Warm/Trustworthy).

### Interview Summary
**Key Discussions**:
- **Tone**: Concept A ("Noble Empathy") selected. Warm Beige (#F5F5F0) + Deep Navy (#1A237E).
- **Form**: Must include Name, Phone, Message, and Privacy Agreement.
- **Assets**: Use placeholders for now.

**Research Findings**:
- **API**: `/api/consultation` exists and expects `{ name, phone, message }`.
- **Styling**: Tailwind CSS v4 is used with inline config.
- **Animation**: Project currently uses `tw-animate-css`. We will introduce `framer-motion` for scroll effects.

### Metis Review
**Identified Gaps** (addressed):
- **API Conflict**: Added explicit instruction to NOT send `privacy` field to API (client-side validation only).
- **Animation Conflict**: Decided on Hybrid Strategy (Framer for scroll, Tailwind for UI).
- **Accessibility**: Added WCAG 2.1 AA requirements (contrast, reduced motion).

---

## Work Objectives

### Core Objective
Create a high-trust, emotionally resonant landing page for 40-50s women seeking legal help.

### Concrete Deliverables
- `src/app/page.tsx` (Refactored layout)
- `src/components/sections/Hero.tsx`
- `src/components/sections/Story.tsx`
- `src/components/sections/Contact.tsx`
- `src/app/globals.css` (Updated theme variables)

### Definition of Done
- [x] All 3 sections implemented and responsive.
- [x] Scroll animations trigger correctly on scroll.
- [x] Form submits to `/api/consultation` successfully.
- [x] Visual regression tests pass.
- [x] Accessibility scan passes (WCAG 2.1 AA).

### Must Have
- **Hybrid Animation Strategy**: Framer Motion for scroll, Tailwind for interactions.
- **Privacy Agreement**: Client-side check only.
- **Responsive Design**: Mobile-first, large touch targets.

### Must NOT Have (Guardrails)
- **Do NOT** modify `/api/consultation/route.ts` (Backend logic is out of scope).
- **Do NOT** send `privacy` field to the API.
- **Do NOT** use `type: "spring"` animations (too bouncy/playful for this tone).
- **Do NOT** remove `tw-animate-css` dependency (legacy support).

---

## Verification Strategy (MANDATORY)

> **UNIVERSAL RULE: ZERO HUMAN INTERVENTION**
> ALL tasks in this plan MUST be verifiable WITHOUT any human action.

### Test Decision
- **Infrastructure exists**: YES (Playwright suggested by Agent)
- **Automated tests**: YES (Tests after)
- **Framework**: Playwright (for E2E/Visual) + Bun Test (if needed for unit)

### Agent-Executed QA Scenarios (MANDATORY)

**Scenario 1: Form Submission (API Integration)**
```
Scenario: Successful form submission with privacy checked
  Tool: Playwright
  Preconditions: Server running, API mock or real endpoint
  Steps:
    1. Navigate to /
    2. Scroll to Contact section
    3. Fill Name: "테스트"
    4. Fill Phone: "010-1234-5678"
    5. Fill Message: "테스트 문의입니다"
    6. Check Privacy Agreement
    7. Click Submit
    8. Wait for success message "상담 신청이 완료되었습니다"
  Expected Result: Success UI shown, API received correct payload (no privacy field)
  Evidence: .sisyphus/evidence/form-success.png
```

**Scenario 2: Scroll Animation Trigger**
```
Scenario: Story section reveals on scroll
  Tool: Playwright
  Preconditions: Server running
  Steps:
    1. Navigate to /
    2. Assert Story text is NOT visible (opacity: 0)
    3. Scroll to Story section
    4. Wait for animation duration (1.5s)
    5. Assert Story text is visible (opacity: 1)
  Expected Result: Content fades in correctly
  Evidence: .sisyphus/evidence/scroll-animation.png
```

**Scenario 3: Mobile Responsiveness**
```
Scenario: Mobile layout check (375px)
  Tool: Playwright
  Preconditions: Viewport set to 375x667
  Steps:
    1. Navigate to /
    2. Check Hero image visibility
    3. Check Font size of Headline (>20px)
    4. Check Input field height (>48px)
  Expected Result: Layout adapts, no horizontal scroll
  Evidence: .sisyphus/evidence/mobile-layout.png
```

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Setup & Assets):
├── Task 1: Install Dependencies (Framer Motion, Hook Form, Zod)
└── Task 2: Update Fonts & Global Styles (Theme setup)

Wave 2 (Component Build):
├── Task 3: Implement Hero Section
├── Task 4: Implement Story Section (with Animation)
└── Task 5: Implement Contact Section (with Form Logic)

Wave 3 (Integration & Cleanup):
└── Task 6: Assemble Page & Final QA
```

---

## TODOs

- [x] 1. Setup Dependencies & Design System

  **What to do**:
  - Install: `framer-motion`, `react-hook-form`, `zod`, `@hookform/resolvers`, `clsx`, `tailwind-merge` (if missing).
  - Update `src/app/layout.tsx`: Add `Noto Serif KR` (variable font).
  - Update `src/app/globals.css`: Define CSS variables for "Noble Empathy" palette (Beige `#F5F5F0`, Navy `#1A237E`).

  **Must NOT do**:
  - Remove existing `Noto Sans KR`.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-design`, `vercel-react-best-practices`]

  **Acceptance Criteria**:
  - [ ] `npm list framer-motion` returns version
  - [ ] `src/app/layout.tsx` contains `Noto_Serif_KR` import
  - [ ] `src/app/globals.css` contains `--color-primary: 240 70% 30%` (OKLCH approx for Navy)

  **Commit**: YES
  - Message: `chore(setup): install deps and setup design system`

- [x] 2. Implement Hero Section Component
- [x] 3. Implement Story Section with Scroll Animations
- [x] 4. Implement Contact Section (Form Logic)

  **What to do**:
  - Create `src/components/sections/Contact.tsx`.
  - Setup `useForm` with Zod schema (`name`, `phone`, `message`, `privacy`).
  - Validation: `privacy` must be true.
  - Submit Handler: POST to `/api/consultation` with ONLY `{ name, phone, message }`.
  - UI: Clean form with "Noble Empathy" styling (rounded-none or minimal radius).

  **Must NOT do**:
  - Send `privacy` field to API.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-design`, `vercel-react-best-practices`]

  **Acceptance Criteria**:
  - [ ] Form validates all 4 fields client-side
  - [ ] Submits valid payload to API
  - [ ] Screenshot evidence: `.sisyphus/evidence/contact-component.png`

  **Commit**: YES
  - Message: `feat(ui): implement contact section with validation`

- [x] 5. Assemble Page & Final QA

  **What to do**:
  - Update `src/app/page.tsx` to import and arrange the 3 sections.
  - Add smooth scrolling to `html`.
  - Run all QA scenarios (Mobile, Form, Animation).

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`playwright`, `web-design-guidelines`]

  **Acceptance Criteria**:
  - [ ] `page.tsx` is clean (composition only)
  - [ ] All 3 Playwright scenarios pass
  - [ ] Accessibility scan passes

  **Commit**: YES
  - Message: `feat(page): assemble landing page and finalize design`
