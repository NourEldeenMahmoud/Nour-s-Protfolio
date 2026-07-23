---
title: Portfolio Build Requirements and Roadmap
status: active
updated: 2026-07-21
language: en
tags:
  - portfolio
  - requirements
  - roadmap
---

# Build Requirements and Roadmap

## Status of This Specification

This is a product and behavior specification, not a framework-specific component contract. The frontend framework, animation stack, hosting provider, domain, CMS model, and final route map remain open until a visual direction is selected.

## Functional Requirements

### Global

- Support English and Arabic with correct LTR and RTL layouts.
- Provide a complete shared experience without requiring audience selection.
- Provide a complete Recruiter experience in the first release.
- Provide a short, immediately skippable, once-per-visitor cinematic introduction with Replay and reduced-motion behavior.
- Expose only Recruiter and Explore choices in the MVP.
- Keep audience mode and language controls understandable and keyboard accessible.
- Expose selected work, project context, personal role, about, CV, and contact.
- Provide durable URLs for case studies and shareable social metadata.
- Preserve useful content when JavaScript, animation, WebGL, or high-performance graphics are unavailable.
- Provide a deliberate not-found experience with navigation back to useful content.

### Content

- Render content from version-controlled local structured data or content files so audience modes reuse one factual source. No external CMS is required.
- Keep English and Arabic content parity visible during authoring.
- Attach evidence status to every project field: verified, user-confirmed, or missing.
- Do not render planning TODOs or unsupported fields on the public site.
- Allow projects, tutorials, and knowledge collections to be added without redesigning the homepage.

### Audience Experiences

- The selector is optional and has an “Explore everything” path.
- Direct links can open a specific audience experience.
- Changing journeys returns the visitor to the audience selector.
- Modes may change visual direction, navigation, hierarchy, summaries, and calls to action, but factual project data stays shared.
- Recruiter uses a distinct visual world and recruiter-prefixed case-study presentations.

### Case Studies

- Support fast and deep reading paths.
- Show project type and Nour’s role before technical details.
- Support images, video, diagrams, repositories, demos, and code excerpts.
- Make media optional so incomplete projects do not create broken layouts.
- Mark external links and preserve a clear route back to the portfolio.
- Block launch until all five case studies satisfy the complete evidence set defined in [[English/02 Content and Case Studies#Content Model|Content and Case Studies]].

### Contact and CV

- CV download is always directly accessible.
- Contact does not require account creation or lead-gating.
- Primary recruiter contact is `noureldeendev@gmail.com`; LinkedIn is secondary.
- Telegram and WhatsApp are secondary options on Contact/About only.
- An existing CV PDF is required before launch even though its source process is not yet defined.
- Prevent private contact data from being added unintentionally.

### Analytics

Use zero-cost, privacy-conscious analytics without session recording. Measure audience choice, case-study opens and completion, CV downloads, language choice, and contact clicks. Qualified recruiter contact is the primary success action.

Collect a 30-day baseline after launch before setting numeric conversion or engagement targets.

## Non-Functional Requirements

### Desktop-first quality

- Build the richest experience for modern desktop browsers.
- Avoid assuming a high-end GPU; define visual fallbacks for demanding scenes.
- Keep initial identity and navigation available before optional media loads.

### Complete mobile fallback

- All information and actions remain available on mobile.
- Heavy interactions reduce to lighter motion, video, or static evidence.
- Layout works across narrow screens in both LTR and RTL.

### Accessibility baseline

Target WCAG 2.2 AA. Require semantic structure, keyboard navigation, readable contrast, visible focus, alternative text, captions where needed, correct RTL behavior, and reduced-motion alternatives.

### Performance baseline

- Split optional visual experiences from critical content.
- Lazy-load large video, 3D, and game assets.
- Do not load Unity builds on page entry.
- Prevent animations from causing layout instability.
- Core content must target “Good” Core Web Vitals for LCP, INP, and CLS. Define detailed asset budgets after the visual prototype and framework are selected.

### Resilience

- Text and navigation survive media failure.
- Case studies survive missing demos.
- External knowledge and repository links fail without breaking local navigation.
- Visual effects are enhancements, not prerequisites.

### Browser support

- Test the current and previous major releases of Chrome, Edge, Firefox, and Safari.
- Test current iOS Safari and Android Chrome with simplified effects.
- Unsupported visual capabilities fall back without removing content or actions.

### Cost constraint

- The MVP uses zero-cost hosting, analytics, fonts, assets, and content tooling.
- Do not require a paid domain, CMS, asset license, or recurring service.

## Proposed Content Schema

The implementation should represent these concepts even if names change:

```text
AudienceExperience
Project
ProjectRole
CaseStudySection
EvidenceItem
Tutorial
KnowledgeCollection
ContactChannel
Decision
```

Each localized content record needs a stable identity shared across languages. Do not duplicate technical facts independently in each audience mode.

## Delivery Phases

### Phase 0: Evidence and direction

- [ ] Prototype Project Multiverse and Cinematic Product Stories, then select one direction or an explicit hybrid based on the documented evaluation criteria.
- [ ] Confirm framework, animation approach, content model, hosting strategy, and route map.
- [ ] Close the complete evidence set for all five featured case studies.
- [ ] Verify project roles, repository links, live demos, CV, and contact links.
- [ ] Approve English and Arabic positioning copy.
- [ ] Create a media inventory and identify missing captures.

**Exit criterion:** the team can build without inventing content, ownership, routes, or visual behavior.

### Phase 1: Shared foundation

- [ ] Establish design tokens, type, layout, motion rules, RTL behavior, and content schema.
- [ ] Build shared entry, navigation, selected work, case-study template, about, CV, and contact.
- [ ] Add English and Arabic content infrastructure.
- [ ] Add static mobile reductions for expensive desktop scenes.

### Phase 2: Recruiter experience

- [ ] Implement Recruiter-specific hierarchy and copy.
- [ ] Publish evidence-backed Bookify, Blood Bank, and CinemaVerse sections.
- [ ] Add BuildSense and How to Train Your AI as breadth and leadership proof.
- [ ] Map skills to project evidence.
- [ ] Validate CV and contact conversion paths.
- [ ] Implement the distinct Recruiter visual world and recruiter-prefixed project presentations.

### Phase 3: Polish and release

- [ ] Cross-browser and responsive testing.
- [ ] Keyboard, focus, screen-reader, contrast, and reduced-motion checks.
- [ ] RTL visual QA by page and interaction.
- [ ] Performance profiling on representative desktop and mobile devices.
- [ ] Metadata, social previews, sitemap, robots behavior, and not-found page.
- [ ] Link checking and content accuracy review.

### Phase 4: Expanded experiences

- [ ] Client experience.
- [ ] Developer experience.
- [ ] “How I Work” tutorials.
- [ ] Knowledge-product integration.
- [ ] Optional gamification experiment.
- [ ] Interactive CV only after separate validation.

## First-Release Acceptance Criteria

- [ ] A visitor can skip audience selection and still access everything essential.
- [ ] Recruiter experience clearly targets junior .NET backend/full-stack roles.
- [ ] Every featured project states context and Nour’s contribution.
- [ ] All five featured projects pass the complete evidence and media gate.
- [ ] No unsupported project metric or ownership claim appears.
- [ ] English and Arabic paths contain equivalent facts and calls to action.
- [ ] Every page and action works on mobile in a simplified form.
- [ ] CV and verified contact channels are directly accessible.
- [ ] Large visual assets do not block core content.
- [ ] Keyboard and reduced-motion users can complete every journey.
- [ ] No MVP feature depends on gamification.
- [ ] English and Arabic pages launch together under language-prefixed URLs.
- [ ] Client and Developer choices remain hidden until their complete experiences exist.
- [ ] Core pages meet the agreed WCAG 2.2 AA and Core Web Vitals launch gates.

## Explicitly Out of MVP

- Full Client and Developer worlds.
- Progress tracking, collectible cards, terminal unlocks, or completion rewards.
- Interactive AI CV.
- Automatic publishing from the private Obsidian vault.
- Full embedded knowledge library.
- A five-game WebGL arcade.
- Framework-specific implementation promises before visual selection.
- Paid services, assets, hosting, domains, or tooling.
