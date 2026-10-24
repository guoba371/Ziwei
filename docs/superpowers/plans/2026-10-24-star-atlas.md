# Star Atlas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Build the approved 12-question, 8-role local entertainment prototype with demo unlock and downloadable result art.

**Architecture:** React local state holds answers and the current screen. A pure scoring module maps answers to authored role content; a separate Canvas module exports a PNG entirely in the browser. No backend or persistence.

**Tech Stack:** React, TypeScript, Vite, Vitest, Testing Library, native Canvas.

**Spec:** `docs/prd/01-紫微人格图鉴.md`

## Global Constraints

- Exactly 12 questions, 4 per axis, 4 answers scored 0-3; each axis splits at 6.
- No birth data, server, payment, analytics, localStorage, or external runtime requests.
- Demo unlock is explicitly free and simulated, not access control.
- PNG 1080 x 1440 includes a non-clinical entertainment disclaimer.
- Old PRDs are historical; only product 01 is implemented.
- Workspace has no Git repository; do not initialize one or make commits implicitly.

## File Map

- `src/quiz.ts`: question content, role content, pure `scoreAnswers(answers)`.
- `src/App.tsx`: home/question/result flow and local state.
- `src/components/StarMark.tsx`: reusable geometric role emblem.
- `src/components/Result.tsx`: result, demo unlock and PNG preview lifecycle.
- `src/export-card.ts`: `createResultCard(role): Promise<Blob>`.
- `src/styles.css`: design tokens and responsive components.
- `src/quiz.test.ts`, `src/App.test.tsx`, `src/export-card.test.ts`: behavior contracts.

## Task 1: Deterministic Role Engine

- [x] Configure Vite/TypeScript/Vitest and install declared dependencies.
- [x] Write tests before implementation: incomplete/invalid input throws; all-zero answers produce observer; all-three answers produce spark; literal fixtures reach all eight roles; threshold 6 is stable.
- [x] Run `npm test -- src/quiz.test.ts`; confirm the missing engine fails.
- [x] Implement `scoreAnswers(answers: readonly number[]): { role: Role; scores: Record<Axis, number> }`, summing each question's axis, splitting at 6, mapping the three bits to authored content.
- [x] Re-run tests; update one answer and verify its axis total and the resulting role change.

## Task 2: Complete Browser Flow

- [x] Write UI tests for disabled-next before answering, preserving earlier answers, completing all 12 questions, free result, explicit demo unlock, editing and reset.
- [x] Run UI tests and confirm absent UI fails.
- [x] Implement three screens with `screen: 'home' | 'quiz' | 'result'`, `answers: (number | null)[]` and `questionIndex: number`.
- [x] Keep role previews separate from scored results; result edits re-enter question 1, preserving answers and clearing result-only UI by unmount.
- [x] Apply the agreed design tokens and self-hosted font; keyboard focus moves to each question heading; reduced motion respected.
- [x] Run `npm test` and `npm run build`.

## Task 3: Export and Verify

- [x] Write exporter tests: Canvas PNG dimensions and MIME, role content and disclaimer present, null Blob is rejected. Browser inspection verifies real rendering, not jsdom mocks alone.
- [x] Implement browser Canvas art, wait for fonts, export Blob and expose image preview plus download link. Revoke object URLs when replaced or unmounted.
- [x] Verify desktop and mobile in one browser pass: full flow, edited answers, result and long-press preview, no horizontal overflow, console errors.
- [x] Fix observed defects in one batch; confirm with a second bounded pass.
- [x] Run `npm test`, `npm run build`, and dependency audit; document actual results and runtime instructions in README.
- [x] Open the local prototype for the user and report limitations without claiming live commerce or platform approval.

