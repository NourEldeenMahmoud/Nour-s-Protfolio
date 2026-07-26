# AGENTS.md

## Purpose

Rules for all agents. Keep work focused, minimal, reviewable, and aligned with approved decisions.

## Source of Truth

1. User request.
2. AGENTS.md.
3. active docs.
4. Existing implementation.
5. Existing tests.
6. Historical docs.
   Newer decisions override older ones. Report conflicts. Never invent requirements.

## Project Contract

- Build a visually stunning, premium portfolio.
- Prioritize beautiful visuals, polished animations, interactions, transitions, and effects without sacrificing usability, accessibility, performance, or maintainability.
- Keep .NET backend/full-stack as the professional focus.
- Use other domains to demonstrate breadth.
- Never invent ownership, metrics, testimonials, deployment status, or outcomes.
- Never launch Chrome DevTools, Playwright, or any browser automation tools by default. Use them only after receiving an explicit instruction from me, even for testing, validation, debugging, or visual inspection.

## Priorities

User Experience & Visual Quality > Accessibility > Performance > Maintainability > Development Speed

## Public Experience

Paths: Hire, Watch, Learn.

- Paths may change presentation but never facts.
- Direct links must work without the intro.

## Visual Direction

- 60% Cinematic Product Stories.
- 30% Living Systems Lab.
- 10% Project Multiverse.
- Reuse existing assets, icons, libraries, and components.
- Always reuse existing components, patterns, assets, and libraries before creating new ones.
- Think like both a senior engineer and a product designer.
- Never settle for "good enough". Every feature should feel polished, intentional, and premium.
- Sweat the details. Small improvements in spacing, motion, timing, easing, typography, hover states, loading states, and micro-interactions matter.
- Use effects intentionally. Every animation or interaction must improve hierarchy, feedback, storytelling, or perceived quality.

- Avoid fake dashboards, telemetry, particles, or decorative effects without purpose.
- Manager owns design direction.

## Research First

- When the user describes a specific effect or references an existing design, first search for an existing implementation that matches it as closely as possible before creating a custom one.
- Before building any UI, animation, interaction, effect, or visual component, search for high-quality existing solutions.
- Prefer production-ready libraries, assets, icons, shaders, effects, animations, and UI components from trusted sources over building them from scratch.
- Adapt and customize existing solutions to match the project's design instead of recreating common patterns.
- Build custom implementations only when no high-quality solution exists or when it provides clear value to the user experience.

## Quality

- English and Arabic parity with proper RTL.
- Mobile keeps all functionality.
- Respect prefers-reduced-motion.
- Keyboard and accessibility are required.
- Load text before heavy media.
- Lazy-load large assets.

## Content

Projects should clearly show: Context, Problem, Role, Constraints, Solution, Decisions, Validation, Outcome, Reflection, and Evidence.
Never exaggerate contribution or results.

## Architecture

- Shared facts stay separate from presentation.
- Reuse existing components, utilities, schemas, and tokens.
- Don't refactor unrelated areas.

## Manager

- Own scope, UX, design, planning, and acceptance criteria.
- Delegate focused discovery.
- Produce the implementation plan.
- Review implementation, validation, and diff.
- Request corrections when needed.
- Prefer the most visually impressive solution that still respects performance, accessibility, and architecture.

## Project Explorer

- Read AGENTS.md first.
- Inspect only relevant files.
- Report reusable patterns, constraints, conflicts, and validation commands.
- Never modify files.

## Code Writer

- Follow the manager's plan.
- Make the smallest complete change.
- Do not redesign independently.
- Run focused validation.
- Review the final diff.
- Report changed files, commands, results, limitations, and model used.

## Implementation

- No speculative abstractions or unnecessary dependencies.
- Handle loading, errors, mobile, RTL, keyboard, and reduced motion.
- Remove debug code.
- Keep changes scoped.

## Validation

- Run only relevant checks.
- Run broad validation only for shared or global changes.
- Never fabricate results.

## Diff Review

Check for accidental changes, scope creep, duplicate logic, unused code, broken accessibility, RTL, mobile, or unsupported claims.

## Definition of Done

A feature is complete only when it:

- Matches the approved design direction.
- Works on desktop and mobile.
- Supports English, Arabic, RTL, keyboard, and reduced motion.
- Includes polished loading, hover, focus, transition, and error states where relevant.
- Passes relevant validation and final visual review.
- Contains no placeholders, temporary assets, broken links, or unfinished states.

## Visual Review

Review every UI change at multiple viewport sizes. Check hierarchy, spacing, typography, alignment, motion timing, easing, responsiveness, consistency, interaction feedback, and visual polish. Functional but visually weak work is not complete.

## Safety

Never expose secrets, perform destructive operations, rewrite Git history, or claim work that wasn't performed.

## Report

Include:

- Task
- Model
- Changes
- Validation
- Sources Used
- Diff Review
- Limitations
