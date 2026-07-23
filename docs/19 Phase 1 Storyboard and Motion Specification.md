---
title: Phase 1 Engineering Core Assembly Storyboard and Motion Specification
status: implemented
version: 1.0
updated: 2026-07-21
owner: Nour Eldeen Mahmoud
language: en
phase: 1
related:
  - 011 TDD
  - 05 Decision Register
  - 16 Entry and Path Copy Draft
---

# Phase 1 Storyboard and Motion Specification

## Art Direction

The entry implements the approved **Cinematic Systems** allocation: 60% title-sequence pacing and editorial type, 30% visible system assembly, and 10% restrained path-world accents. The memorable object is a warm-metal engineering core that resolves scattered domain signals into four honest routes. No scene contains fake telemetry or unverified project architecture.

## Desktop Storyboard

Canvas: 1440 × 900 reference, dark technical field, 64 px grid, central core. Total natural duration: **5.06 seconds**.

| Frame                |        Time | Reviewable composition                                                                                                                                | Motion and narrative                                                                                                         |
| -------------------- | ----------: | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| D1 Signal detection  |    0–0.90 s | Six edge labels: Booking, Payments, Hardware, Healthcare, Cross-platform, Interactive. Identity remains semantic in the DOM. Skip is first focusable. | Signals resolve from low scale and low visibility. No random particles.                                                      |
| D2 Pattern discovery | 0.78–2.10 s | Six fine SVG traces converge on the central empty assembly. Understand, Design, Build, Validate occupy the core perimeter.                            | Strokes draw inward with `power2.inOut`; process labels settle with a short cascade.                                         |
| D3 Core assembly     | 1.88–3.30 s | Three hexagonal/radial SVG groups lock around a warm central node.                                                                                    | Rigid pieces use scale and slight rotation only; no bounce or elastic overshoot.                                             |
| D4 Identity          | 3.05–4.10 s | `Nour Eldeen Mahmoud`, `.NET-centered software engineer`, and the validated positioning sentence sit over the stable core.                            | Editorial identity rises 18 px and resolves; essential text stops moving before reading begins.                              |
| D5 Intent tracks     | 3.92–5.06 s | Hire, Watch, Learn form three equal editorial tracks. General settles directly below as visible `04 / DEFAULT`.                                       | Selector heading and tracks emerge from one core. Natural completion moves focus to the selector heading without navigation. |

### Desktop Frame Diagram

```text
┌ ENGINEERING CORE / 001 ─────────────────────────────── العربية ┐
│ [01 Booking]          [02 Payments]          [03 Hardware]     │
│          ╲                  │                  ╱                │
│             UNDERSTAND  ╱ CORE ╲  DESIGN                       │
│                        NOUR ELDEEN                              │
│                 .NET-CENTERED SOFTWARE ENGINEER                │
│          ╱                  │                  ╲                │
│ [04 Healthcare]   [05 Cross-platform]   [06 Interactive]       │
├─────────────────────────────────────────────────────────────────┤
│ One engineering core. Four ways to examine the work.           │
│                         CHOOSE YOUR PATH                        │
│  01 HIRE           │ 02 WATCH          │ 03 LEARN              │
│  role evidence     │ media-forward     │ decisions/process     │
├─────────────────────────────────────────────────────────────────┤
│ 04 / DEFAULT  Continue to the general portfolio             →  │
└─────────────────────────────────────────────────────────────────┘
```

## Mobile Storyboard

Canvas: 390 × 844 reference. Total natural duration: **3.24 seconds**. Three representative signals remain: Booking, Payments, Hardware. The connection map and core simplify through crop and scale rather than introducing a second visual system.

```text
┌ CORE / 001                         AR ┐
│ [Booking]   [Payments]   [Hardware]   │
│                ◇ CORE                │
│         NOUR ELDEEN MAHMOUD          │
│    .NET-centered software engineer   │
├───────────────────────────────────────┤
│ CHOOSE YOUR PATH                      │
│ 01  HIRE                              │
│ 02  WATCH                             │
│ 03  LEARN                             │
│ 04  GENERAL / DEFAULT                 │
└───────────────────────────────────────┘
```

The links become a vertical sequence, preserve every description, and use touch-safe full-width targets. No information depends on hover.

## Arabic RTL Storyboard

The Arabic state uses the same scale, information, and scene duration as English. The top bar, metadata edge, card reading order, General row, and directional micro-arrows follow RTL. The core mark and media-neutral SVG geometry are not mirrored because they carry no directional meaning. Mixed `.NET` text remains visually stable within Arabic copy.

```text
┌ English ─────────────────────────────── اللب الهندسي / 001 ┐
│ الأجهزة          المدفوعات          الحجوزات                │
│                         اللب الهندسي                        │
│                    نور الدين محمود                         │
│             مهندس برمجيات يرتكز عمله على .NET             │
├─────────────────────────────────────────────────────────────┤
│                         اختر مسارك                         │
│ تعلّم 03          │ مشاهدة 02          │ توظيف 01           │
│  ←  المتابعة إلى المعرض العام        الافتراضي / 04       │
└─────────────────────────────────────────────────────────────┘
```

## Reduced Motion and Failure Frame

Reduced motion has **no GSAP timeline**. Identity, static core, all labels, selector heading, and all four links render immediately. The same complete frame is the server-rendered no-JavaScript and animation-import-failure fallback. Replay remains hidden until client enhancement is available; Skip is unnecessary for the static state.

## Motion Contract

| Element group   | GSAP properties                  | Ease           | Desktop timing | Mobile timing |
| --------------- | -------------------------------- | -------------- | -------------: | ------------: |
| Domain signals  | `autoAlpha`, `scale`             | `power3.out`   |       0–0.83 s |      0–0.53 s |
| Connections     | `strokeDashoffset`               | `power2.inOut` |    0.78–2.16 s |   0.50–1.38 s |
| Process labels  | `autoAlpha`, `y`                 | `power3.out`   |    1.25–1.89 s |   0.80–1.21 s |
| Core pieces     | `autoAlpha`, `scale`, `rotation` | `power3.inOut` |    1.88–2.93 s |   1.20–1.88 s |
| Identity        | `autoAlpha`, `y`                 | `power3.out`   |    3.05–3.73 s |   1.95–2.39 s |
| Selector/tracks | `autoAlpha`, `y`                 | `power3.out`   |    3.92–4.90 s |   2.51–3.14 s |
| Resolve hold    | none                             | none           |    4.90–5.06 s |   3.14–3.24 s |

All spatial animation uses transforms; connections use SVG stroke offset. No animated `top`, `left`, width, or height is permitted. The GSAP module is dynamically imported only by the entry client component, scoped to the entry root, and killed on cleanup.

## Lifecycle Contract

1. Check reduced motion, replay request, and `portfolio.intro.seen.v2` on `/{lang}` only.
2. Returning and reduced-motion visitors receive the selector immediately without forced focus.
3. First eligible visits and Replay execute the appropriate desktop/mobile timeline.
4. Natural completion and Skip set the seen key, preserve the URL, avoid reload/navigation, and focus `#intent-selector-title`.
5. Replay never clears the stored seen key.
6. A hidden page pauses the timeline. Returning after 30 seconds resolves to the selector; a shorter interruption resumes.
7. A GSAP import failure restores the static selector and does not block any route.

## Review State Matrix

| State                      | Identity                                 | Core        | Four links                            | Skip                   | Replay               | Focus behavior                |
| -------------------------- | ---------------------------------------- | ----------- | ------------------------------------- | ---------------------- | -------------------- | ----------------------------- |
| First desktop/mobile visit | Semantic immediately; visually sequenced | Assembles   | Semantic fallback, visually sequenced | Immediate              | Hidden               | Heading after finish/Skip     |
| Returning visit            | Immediate                                | Static      | Immediate                             | Hidden                 | Visible              | No forced focus               |
| Replay                     | Sequenced                                | Reassembles | Resequenced                           | Immediate              | Hidden while playing | Heading after finish/Skip     |
| Reduced motion             | Immediate                                | Static      | Immediate                             | Hidden                 | Visible              | No forced focus               |
| No JavaScript              | Immediate                                | Static      | Immediate                             | Non-blocking markup    | Hidden               | Native document order         |
| GSAP/script failure        | Immediate                                | Static      | Immediate                             | Removed after fallback | Visible              | Native current focus retained |

## Phase Boundary

Phase 1 provides readable static destination links and minimal semantic destination route contracts. It does not implement selector preview states, route transitions, intent prefetch, analytics, complete destination pages, project worlds, or case studies. Those remain Phase 2 or later.
