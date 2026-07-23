---
title: Portfolio Product Requirements Document
version: 1.0
status: approved
updated: 2026-07-21
language: en
tags:
  - portfolio
  - prd
  - requirements
---

# Portfolio Product Requirements Document

## 1. Document Authority

This PRD defines the MVP product and behavior contract for Nour Eldeen Mahmoud’s portfolio. It is authoritative for scope, users, journeys, content, routes, states, quality gates, analytics, and acceptance criteria.

It does not select a frontend framework, animation library, hosting provider, component architecture, or deployment implementation. Those decisions follow the approved visual prototypes.

Related sources:

- [[English/01 Product Strategy|Product Strategy]]
- [[English/02 Content and Case Studies|Content and Case Studies]]
- [[English/03 Experience Architecture|Experience Architecture]]
- [[English/04 Build Requirements and Roadmap|Build Requirements and Roadmap]]
- [[English/05 Decision Register|Decision Register]]
- [[English/Visual Directions/Visual Directions Index|Visual Directions]]

## 2. Product Summary

### Product statement

Create a bilingual, visually ambitious portfolio that proves Nour can understand problems, design systems, and deliver useful software solutions, with .NET backend/full-stack engineering as the professional center and cross-domain work as evidence of adaptability.

### Working positioning

> Software engineer focused on .NET backend and full-stack applications, building solutions across products, platforms, and technical domains.

### Product qualities to prove

- .NET backend and full-stack specialization.
- Broad technical range without an unfocused identity.
- Fast learning across unfamiliar domains.
- Product and software-engineering judgment beyond writing code.
- Honest ownership, teamwork, validation, and reflection.

## 3. Goals and Non-Goals

### MVP goals

1. Persuade recruiters that Nour is a strong candidate for junior .NET backend and full-stack roles.
2. Present five complete, evidence-backed case studies.
3. Offer a memorable shared exploration journey and a distinct Recruiter journey.
4. Support equivalent English and Arabic experiences.
5. Convert qualified interest into direct recruiter contact.
6. Demonstrate range through product, healthcare, game, and knowledge work without weakening the .NET focus.

### MVP non-goals

- Full Client experience.
- Full Developer experience.
- How I Work tutorials.
- Full embedded knowledge library or StudyHub rebuild.
- Gamification, progress tracking, collectibles, terminal unlocks, or rewards.
- Interactive AI CV.
- Playable five-game WebGL arcade.
- Automatic publishing from the private Obsidian vault.
- Paid services, assets, domains, hosting, analytics, fonts, CMS, or tooling.
- Final framework or technical architecture selection.

## 4. Users

### Primary user: Recruiter or hiring manager

**Need:** determine quickly whether Nour fits a junior .NET backend/full-stack role.

**Questions:**

- What role is Nour targeting?
- What .NET systems has he built?
- What did he personally contribute?
- Can he work in a team and explain engineering decisions?
- Where are his CV and contact details?

### Secondary user: General visitor

**Need:** understand Nour’s engineering identity and explore his strongest work without selecting a specialized audience.

### Future users, excluded from MVP paths

- Clients seeking custom software solutions.
- Developers seeking architecture details and tutorials.

Their selector choices remain hidden until their complete experiences ship.

## 5. MVP Scope

### Required experiences

- Language entry with cinematic introduction and audience selector.
- Shared Explore experience.
- Distinct Recruiter experience.
- Five shared full case-study pages.
- Five Recruiter-focused case-study presentations backed by the same facts.
- Knowledge preview page.
- About page with capabilities, education, CV, and contact.
- Responsive and accessible navigation, language controls, errors, and fallbacks.

### Required case studies

1. BuildSense.
2. Bookify.
3. Blood Bank Platform.
4. How to Train Your AI.
5. CinemaVerse.

All five must satisfy the content and media release gate. A concise placeholder does not satisfy MVP scope.

### Required Knowledge collections

1. EF Core.
2. REST APIs.
3. Secured APIs.
4. JavaScript.
5. MET Summaries.

Each collection must have verified preview copy and a public destination before launch.

## 6. Information Architecture

### Route contract

| Route                               | Requirement                                                                                                               |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `/`                                 | Detect supported browser language and redirect to `/en` or `/ar`; default to English when no supported preference exists. |
| `/en`, `/ar`                        | Cinematic introduction and audience selector.                                                                             |
| `/{lang}/explore`                   | Shared engineering-story journey.                                                                                         |
| `/{lang}/recruiter`                 | Distinct Recruiter journey.                                                                                               |
| `/{lang}/projects/{slug}`           | Full shared case study.                                                                                                   |
| `/{lang}/recruiter/projects/{slug}` | Shorter role-focused case-study presentation using shared facts.                                                          |
| `/{lang}/knowledge`                 | Five-collection Knowledge preview.                                                                                        |
| `/{lang}/about`                     | About, capabilities, education, CV, and contact.                                                                          |

`{lang}` is `en` or `ar`. Project slugs remain stable across languages.

### Main navigation

- Work.
- Knowledge.
- About.

The following are actions rather than main sections:

- Download CV.
- Contact.
- Change language.
- Return to audience selector.

## 7. Core User Journeys

### Journey J-01: First-time Recruiter

1. Visitor reaches `/` or a language entry.
2. The site resolves English or Arabic.
3. A short cinematic introduction begins.
4. Visitor watches or skips it.
5. Selector offers “I’m hiring” and “Explore everything.”
6. Visitor selects “I’m hiring.”
7. Recruiter world opens with target role, concise profile, strongest .NET proof, CV, and contact actions.
8. Visitor opens Bookify or another role-relevant project.
9. Recruiter presentation shows context, Nour’s contribution, relevant engineering evidence, outcome, and links.
10. Visitor downloads the CV or contacts Nour by email, LinkedIn, Telegram, or WhatsApp.

### Journey J-02: Shared exploration

1. Visitor chooses “Explore everything.”
2. The experience presents positioning and selected work.
3. It continues through problem-solving process, range, knowledge preview, About, and contact.
4. Visitor can open any full case study through a dedicated shareable page.

### Journey J-03: Returning visitor

1. Visitor reaches a language entry.
2. The site remembers an explicit language preference when available.
3. The cinematic sequence is bypassed by default.
4. Visitor sees the audience selector and may replay the intro.

### Journey J-04: Change journey

1. Visitor uses the return-to-selector action.
2. Selector opens without forcing the cinematic introduction.
3. Visitor chooses Recruiter or Explore.

### Journey J-05: Direct shared link

1. Visitor opens a project, Knowledge, About, Explore, or Recruiter URL directly.
2. The requested content opens without requiring the intro or selector.
3. Navigation exposes language switching and return to the selector.

## 8. Functional Requirements

### 8.1 Language entry and cinematic introduction

| ID     | Requirement                                                                                   |
| ------ | --------------------------------------------------------------------------------------------- |
| FR-001 | `/` must choose `en` or `ar` from a supported browser language and default to `en` otherwise. |
| FR-002 | An explicit language choice must override detection and persist for future visits.            |
| FR-003 | The introduction must last approximately 4-6 seconds when played normally.                    |
| FR-004 | Skip must be visible and operable from the start by pointer and keyboard.                     |
| FR-005 | The normal intro must play once by default, with Replay available from the selector.          |
| FR-006 | Reduced-motion visitors must receive an immediate non-animated alternative.                   |
| FR-007 | Intro or media failure must reveal the selector without blocking the visitor.                 |

### 8.2 Audience selector

| ID     | Requirement                                                                                           |
| ------ | ----------------------------------------------------------------------------------------------------- |
| FR-008 | The MVP selector must expose only “I’m hiring” and “Explore everything.”                              |
| FR-009 | Client and Developer choices must not appear disabled, marked coming soon, or routed to placeholders. |
| FR-010 | “I’m hiring” must open the localized Recruiter route.                                                 |
| FR-011 | “Explore everything” must open the localized Explore route.                                           |
| FR-012 | Direct routes must bypass the selector.                                                               |

### 8.3 Shared Explore experience

| ID     | Requirement                                                                                                                    |
| ------ | ------------------------------------------------------------------------------------------------------------------------------ |
| FR-013 | Explore must follow this hierarchy: positioning, selected work, engineering process, range, Knowledge preview, About, contact. |
| FR-014 | All five projects must appear with context, role, concise problem, and case-study action.                                      |
| FR-015 | .NET specialization must remain clear even when showing MEAN, Unity, Flutter, and knowledge work.                              |
| FR-016 | Every case-study action must open a dedicated localized shared project URL.                                                    |

### 8.4 Recruiter experience

| ID     | Requirement                                                                                                                                      |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| FR-017 | Recruiter must open with junior .NET backend/full-stack role fit and evidence.                                                                   |
| FR-018 | CV and primary email contact must be available in the first meaningful Recruiter screen.                                                         |
| FR-019 | Project priority must be Bookify, Blood Bank Platform, CinemaVerse, BuildSense, then How to Train Your AI unless user testing supports a change. |
| FR-020 | Recruiter must use a distinct visual world, not only reordered shared sections.                                                                  |
| FR-021 | Recruiter project links must open recruiter-prefixed project presentations.                                                                      |
| FR-022 | Recruiter presentations must prioritize context, personal contribution, relevant capabilities, validation, outcome, and action.                  |
| FR-023 | Recruiter and shared presentations must read project facts from one factual source.                                                              |

### 8.5 Case studies

| ID     | Requirement                                                                                                                                                                       |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-024 | Every full case study must show context, problem, role, constraints, solution, architecture, key workflow, tradeoff, validation, outcome or limitation, reflection, and evidence. |
| FR-025 | Every team or forked project must disclose its context before implying ownership.                                                                                                 |
| FR-026 | Every case study must include at least three strong visual assets, including one system diagram.                                                                                  |
| FR-027 | Missing optional media must not break layout, navigation, or factual content.                                                                                                     |
| FR-028 | Unverified metrics, deployment, ownership, or technical claims must not render publicly.                                                                                          |
| FR-029 | Every case study must link to its verified repository and verified demo when one exists.                                                                                          |
| FR-030 | Every case study must offer a clear next project and return path.                                                                                                                 |

### 8.6 Knowledge

| ID     | Requirement                                                                                |
| ------ | ------------------------------------------------------------------------------------------ |
| FR-031 | Knowledge must preview exactly the five approved MVP collections.                          |
| FR-032 | Each preview must explain topic, intended value, language, public status, and destination. |
| FR-033 | Private vault paths or unreviewed notes must never be exposed.                             |
| FR-034 | The page must not imply the undecided full-library architecture has been selected.         |

### 8.7 About, CV, and contact

| ID     | Requirement                                                                                                      |
| ------ | ---------------------------------------------------------------------------------------------------------------- |
| FR-035 | About must explain the “broad range, deep .NET center” positioning.                                              |
| FR-036 | Capabilities must link to project evidence rather than appear only as technology logos.                          |
| FR-037 | Education and personal facts must be approved by Nour before publication.                                        |
| FR-038 | A verified existing CV PDF must be present before launch and downloadable without a form or gate.                |
| FR-039 | Primary recruiter contact must use `mailto:noureldeendev@gmail.com`.                                             |
| FR-040 | Secondary professional contact must link to `https://linkedin.com/in/nour-eldeen-eg`.                            |
| FR-041 | Secondary messaging links must use `https://t.me/DevNourEldeen` and `https://wa.me/201556335858`.                |
| FR-042 | WhatsApp and Telegram must appear only on approved About/Contact surfaces, not as the dominant Recruiter action. |

### 8.8 Navigation and localization

| ID     | Requirement                                                                                                                  |
| ------ | ---------------------------------------------------------------------------------------------------------------------------- |
| FR-043 | Navigation must expose Work, Knowledge, and About across core pages.                                                         |
| FR-044 | Language switching must open the equivalent page and project whenever it exists.                                             |
| FR-045 | All public pages must ship in English and Arabic together.                                                                   |
| FR-046 | Arabic must use a complete RTL composition, including navigation, diagrams, controls, and motion direction where meaningful. |
| FR-047 | English and Arabic must contain equivalent facts, attribution, evidence, and actions.                                        |
| FR-048 | Missing translation must block that page’s release rather than silently fall back to English.                                |

### 8.9 Errors and fallbacks

| ID     | Requirement                                                                                            |
| ------ | ------------------------------------------------------------------------------------------------------ |
| FR-049 | Unknown routes must show a localized not-found page with Work, Knowledge, About, and selector actions. |
| FR-050 | Media errors must retain text, evidence links, and navigation.                                         |
| FR-051 | Unsupported animation, graphics, or WebGL must fall back to static or lightweight media.               |
| FR-052 | External link failure must not break local navigation.                                                 |
| FR-053 | Core content must remain available when non-essential client-side behavior fails.                      |

## 9. Content Requirements

### Shared factual source

Content must live in version-controlled local files. The product model must keep these concepts separate even if implementation names differ:

- Project identity and localized copy.
- Project context and role.
- Verified facts and evidence status.
- Shared full case-study sections.
- Recruiter summaries and ordering.
- Knowledge collections.
- Contact channels.
- Analytics event names.

Audience presentations must not duplicate technical facts independently.

### Case-study release gate

Every project requires:

- Nour-approved role and attribution.
- Complete narrative sections from FR-024.
- Verified repository and any claimed deployment.
- At least three strong visuals including one system diagram.
- English and Arabic parity.
- No unresolved publication-blocking evidence gap.

### Approval

Nour is the final approver for all facts, attribution, English copy, Arabic copy, contact information, and release readiness.

## 10. Visual Prototype Requirements

Before final art direction or framework selection, prototype:

1. Project Multiverse.
2. Cinematic Product Stories.

Each prototype must cover:

- Language entry and short intro.
- Recruiter and Explore choices.
- One selected-work transition.
- First Bookify screen in shared and Recruiter contexts.
- English-to-Arabic switch and RTL behavior.
- Complete simplified mobile reduction.
- Reduced-motion behavior.
- Preliminary performance measurement.

The selection review must score communication of .NET depth, intentional range, distinctiveness, audience differentiation, bilingual quality, readability, mobile reduction, accessibility, performance, and maintainability.

## 11. Analytics and Success Measurement

### Primary success action

A qualified recruiter contacts Nour after reviewing portfolio evidence. When attribution is known, confirmed inbound recruiter contact is the primary outcome. Contact clicks are the measurable in-site proxy.

### Required events

- Language selected.
- Intro played, skipped, and replayed.
- Recruiter or Explore selected.
- Case study opened.
- Case study completed when its final substantive section becomes visible while the page is active.
- CV downloaded.
- Email, LinkedIn, Telegram, or WhatsApp clicked.

### Analytics constraints

- Use a zero-cost privacy-conscious solution.
- No session replay or invasive fingerprinting.
- Document collected data before launch.
- Establish a 30-day baseline before defining numeric targets.

## 12. Quality Requirements

### Accessibility

- Target WCAG 2.2 AA.
- All journeys and actions work by keyboard.
- Focus order and restoration remain correct across intro, selector, navigation, and route changes.
- Text and meaningful controls meet contrast requirements.
- Images and diagrams have useful alternatives.
- Videos use captions when speech or essential audio exists.
- Reduced motion removes non-essential movement without removing content.

### Performance

- Core pages target “Good” Core Web Vitals for LCP, INP, and CLS.
- Identity, navigation, and core text render before optional heavy scenes.
- Large video, 3D, game, and project media load progressively.
- No Unity build loads automatically.
- Detailed asset budgets are defined after prototype measurement.

### Browser and device support

- Current and previous major Chrome, Edge, Firefox, and Safari releases.
- Current iOS Safari and Android Chrome with simplified effects.
- Desktop receives the richest presentation.
- Mobile retains every fact, page, language, CV action, and contact action.

### Cost

- Required runtime and authoring services cost zero.
- A paid custom domain is not required for MVP acceptance.

## 13. Required States

| Surface           | Required states                                                                           |
| ----------------- | ----------------------------------------------------------------------------------------- |
| Intro             | First visit, skipped, returning visit, replay, reduced motion, media failure.             |
| Selector          | Ready, keyboard focus, route navigation, language switch.                                 |
| Project media     | Loading, loaded, failed, unsupported, reduced-data/lightweight fallback when implemented. |
| External evidence | Available, absent by design, failed link without local navigation loss.                   |
| CV                | Available at launch; absence is a release blocker.                                        |
| Contact           | Valid action; unavailable external application must not trap the visitor.                 |
| Localization      | English LTR, Arabic RTL, equivalent route, unsupported browser language.                  |
| Page              | Loading enhancement, content ready, not found, non-essential script failure.              |

## 14. Release Gates

The MVP cannot launch until:

- [ ] Project Multiverse and Cinematic Product Stories prototypes are evaluated and the final direction or explicit hybrid is selected.
- [ ] A framework, animation approach, zero-cost hosting provider, and detailed performance budgets are selected from prototype evidence.
- [ ] All five case studies pass the complete evidence and media gate.
- [ ] All five Knowledge collections have reviewed previews and public destinations.
- [ ] Every public page has approved English and Arabic versions.
- [ ] The existing CV PDF is supplied and verified.
- [ ] Email, LinkedIn, Telegram, and WhatsApp links are tested.
- [ ] WCAG 2.2 AA acceptance checks pass.
- [ ] Core Web Vitals meet the agreed “Good” thresholds on representative pages and devices.
- [ ] Supported desktop and mobile browser QA passes.
- [ ] Analytics events and privacy disclosure are verified.
- [ ] Nour gives final content and release approval.

## 15. MVP Acceptance Criteria

1. A first-time visitor can watch or skip the intro and choose Recruiter or Explore.
2. A returning visitor reaches the selector without replaying the intro by default.
3. Direct page links work without intro or selector gating.
4. Recruiter is visually and structurally distinct from Explore.
5. Recruiter sees role fit, .NET evidence, CV, and email contact before secondary range content.
6. All five projects have complete shared and Recruiter presentations backed by one factual source.
7. Every team or forked project discloses context and Nour’s role accurately.
8. Knowledge shows the five approved collections and no private vault content.
9. English and Arabic pages have equivalent content, routes, and actions.
10. Mobile provides the complete content and conversion journey with simplified visuals.
11. Keyboard and reduced-motion users can complete every journey.
12. Core content survives optional media or animation failure.
13. CV download and all approved contact actions work.
14. Required analytics events fire without session recording.
15. No Client, Developer, gamification, interactive-CV, full-library, or arcade placeholder appears in the MVP.

## 16. Deferred Decisions

- Final choice between Project Multiverse, Cinematic Product Stories, or an explicit hybrid.
- Frontend framework and animation stack.
- Zero-cost hosting provider and deployment model.
- Detailed asset and interaction budgets.
- Full Knowledge architecture after MVP.
- Gamification after usability data.
- Interactive CV after visitor research.
- Playable games after load and browser-support evaluation.
- Source and generation process of the existing CV PDF.
