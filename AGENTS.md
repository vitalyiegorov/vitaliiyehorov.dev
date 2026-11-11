# vitaliiyehorov.dev

Personal landing page of Vitalii Yehorov. One Next.js 16 app at the repo root, deployed on Vercel. English only, single page.

## Stack

- Next.js 16.4 (App Router, Cache Components, React Compiler), React 19.3, TypeScript 7 strict, Tailwind CSS 4 (CSS-first `@theme inline` in `src/app/globals.css`).
- three.js for the fixed WebGL "agent fleet in orbit" scene, loaded lazily on the client after idle. Scroll drives the scene through keyframes in `src/orbit/constant/orbit-frames.constant.ts`.
- Foreground motion is CSS only: scroll-driven animations (`animation-timeline: view()/scroll()`) behind `@supports` and `prefers-reduced-motion: no-preference`.
- pnpm, Node 24. Read the version-matched Next.js docs in `node_modules/next/dist/docs/` before relying on memory for a Next API.

## Conventions

- Files live at `src/<module>/<type>/<kebab-name>.<type>.ts(x)` (types: `component`, `util`, `constant`, `type`, `shader`, `font`). One exported item per file, no barrels.
- No comments in source.
- Server components by default. `'use client'` only for the canvas (`orbit-stage`) and the stat counters.
- Explicit, flat JSX with copy inline in the section that renders it. No config arrays mapped into JSX for content.
- 4-space indent, single quotes, 140 columns (oxfmt). oxlint runs type-aware with `--deny-warnings`.
- Colours are OKLCH CSS variables; one accent (lime). Fonts: Bricolage Grotesque (display/body), Geist Mono (telemetry labels).
- Every user-visible change keeps: one h1, landmarks, visible `:focus-visible`, AA contrast, no horizontal scroll at 390px, full content under reduced motion, a CSS fallback without WebGL.

## Content rules

The repo is public. Never publish: phone numbers, private email addresses, "open to work", private repository links or contents, machine hostnames, account names, ToolSense customers, issue numbers or internal metrics. Numbers on the page carry an "as of" date.

## Commands

- `pnpm dev` / `pnpm build` / `pnpm start`
- `pnpm check` runs `fmt:check`, `ts` and `lint`
- `pnpm test:e2e` runs Playwright (desktop 1440x900 and mobile 390x844) against the production build; run `pnpm build` first
- Commits follow Conventional Commits (commitlint on commit-msg). pre-commit runs lint-staged and `pnpm ts`. Never use `--no-verify`.

## Skills

Project skills live in `.agents/skills` (mirrored to `.claude/skills`, pinned in `skills-lock.json`): frontend-design, web-design-guidelines, vercel-react-best-practices, vercel-composition-patterns, copywriting, ui-ux-pro-max, next-bundle-optimizer, seo-audit, schema, ai-seo.
