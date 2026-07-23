---
name: portfolio-cinematic-visuals
description: Guide animation, cinematics, 3D, shaders, and particle work for the Portfolio project during Phase 0. Use when the user asks about visual direction, motion, animation stack, cinematic intro, scroll choreography, Three.js scenes, WebGL, shader effects, particle systems, performance budgets, or reduced-motion behavior. Triggers on "cinematic", "animation", "motion", "GSAP", "Three.js", "WebGL", "shader", "particle", "scroll choreography", "intro sequence", "visual direction", "prototyping", "Multiverse", "Cinematic Product Stories", "reduced motion", "mobile reduction", "performance budget".
---

# Portfolio Cinematic Visuals Skill

This skill governs all animation, cinematic, 3D, shader, and particle work for the Portfolio project. It exists to prevent premature runtime commitments and keep Phase 0 focused on evidence and direction.

## Source-of-Truth Documents

Consult these in order. Never contradict an accepted decision.

1. `docs/05 Decision Register.md` — confirmed and open decisions (O-001, O-002)
2. `docs/04 Build Requirements and Roadmap.md` — Phase 0 exit criteria, non-functional requirements, performance baseline
3. `docs/07 Product Requirements Document.md` — Sections 10 (Visual Prototype Requirements), 12 (Quality Requirements), 13 (Required States)
4. `docs/Visual Directions/Visual Directions Index.md` — evaluation criteria and shortlist
5. `docs/Visual Directions/02 Cinematic Product Stories.md` — shortlisted direction A
6. `docs/Visual Directions/06 Project Multiverse.md` — shortlisted direction B
7. `docs/07 Portfolio Inspiration.md` — reference analysis, what to adopt and reject

## Phase 0 Constraints (O-001 and O-002)

**O-001 — Final visual direction is open.** The project must prototype both shortlisted directions and evaluate them before selecting one or an explicit hybrid. Do not assume a direction is chosen.

**O-002 — Frontend and animation stack is open.** Framework, animation library, hosting, and component architecture are decided AFTER visual prototypes and performance tests. Do not commit to Next.js, React, GSAP, Three.js, Framer Motion, Lenis, or any runtime library in production code.

### What this means in practice

- Write prototype-quality code only. No production abstractions.
- Do not install or configure animation, 3D, or framework packages in the app.
- Do not create design tokens, motion systems, or component APIs that assume a framework.
- Reference globally installed GSAP, Three.js, and motion skills for API knowledge, not as project dependencies.
- The two MCP servers in `.opencode/` (Chrome DevTools MCP, Playwright MCP) are browser/QA tools, not animation or 3D runtime libraries.

## Comparing the Two Directions

Compare **Cinematic Product Stories** vs **Project Multiverse** on their documented evaluation criteria. Do not merge them by default.

### Cinematic Product Stories

- Each project is a short visual film with project-specific art direction.
- Scroll choreography controls cuts, focus, scale, and layered depth.
- Oversized type, full-bleed video, bold negative space, editorial captions.
- Transition borrowed from title design, not generic fade-and-slide.
- Recruiter gets a shorter cut with role surfaced early.
- Risk: media-heavy, expensive, spectacle can bury ownership.

### Project Multiverse

- Five distinct worlds connected by one engineering core.
- Entering a project changes palette, type scale, movement, and spatial logic.
- Portal transitions authored per project domain.
- Each world has one signature interaction, not continuous spectacle.
- Risk: largest art-direction scope, new projects need new worlds, inconsistent quality is obvious.

### Evaluation questions (from Visual Directions Index)

Score each 1-5: communicates .NET depth, intentional range, avoids template/AI tropes, supports audience worlds, bilingual quality, memorable first 30 seconds, readable evidence, mobile reduction, performance budget, maintainability.

## Required Fallbacks and Performance

### Reduced motion

- Every animation must have a static or lightweight alternative for `prefers-reduced-motion: reduce`.
- The cinematic intro (FR-006) must show an immediate non-animated alternative.
- Pinned scenes must provide skip controls (FR-004, FR-005).

### Mobile

- Mobile uses compressed clips, still frames, or themed chapter covers.
- Heavy interactions reduce to lighter motion or static evidence (PRD Section 12).
- No Unity build loads automatically (PRD Section 8.8).
- Every fact, page, language, CV action, and contact action remains on mobile.

### Static fallback

- Text and navigation survive media failure (PRD Section 8.9).
- Visual effects are enhancements, not prerequisites (Build Requirements Section 8).
- WebGL/animation unsupported → static or lightweight fallback (FR-051).

### Performance measurement

- Core content targets "Good" Core Web Vitals (LCP, INP, CLS).
- Identity, navigation, and core text render before optional heavy scenes.
- Large video, 3D, game assets load progressively.
- Detailed asset budgets are defined after prototype measurement (O-005).

## Motion Principles (from inspiration analysis)

- Every animation must prove a skill or explain a system, never decorate.
- One signature interaction per case study, not continuous spectacle.
- No WebGL before core content loads.
- No long pinned scenes on mobile.
- No scroll hijacking.
- No custom cursor on touch.
- No skill percentages.
- No loading screens that block content.
- No AI assistant before content is complete.
- Claims without visible evidence reduce trust.

## Relevant Global Skills

Reference these for API knowledge when writing prototype code. They are not project dependencies.

- **gsap-core** — GSAP tweens, easing, duration, stagger, matchMedia for responsive/reduced-motion.
- **gsap-scrolltrigger** — scroll-linked animations, pinning, scrub, triggers.
- **gsap-timeline** — sequencing animations, position parameter, nesting.
- **gsap-react** — useGSAP hook, refs, gsap.context, cleanup.
- **threejs-fundamentals** — scene setup, cameras, renderer, Object3D hierarchy.
- **threejs-shaders** — GLSL, ShaderMaterial, uniforms, custom effects.
- **threejs-postprocessing** — EffectComposer, bloom, DOF, screen effects.
- **motion-design** — motion principles, timing, easing, choreography.
