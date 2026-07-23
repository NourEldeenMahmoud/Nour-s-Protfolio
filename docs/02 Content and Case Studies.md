---
title: Portfolio Content and Case Studies
status: active
updated: 2026-07-21
language: en
tags:
  - portfolio
  - content
  - case-studies
---

# Content and Case Studies

## Content Model

Every published case study must use the same evidence model:

1. **Context:** personal, team, university, fork, course, or practice.
2. **Problem:** who needed what and why it mattered.
3. **Role:** what Nour personally owned or influenced.
4. **Constraints:** technical, time, team, platform, or domain limits.
5. **Solution:** system boundaries and important workflows.
6. **Key decision:** one real tradeoff and why it was chosen.
7. **Validation:** tests, review, deployment, demo, or user feedback that actually exists.
8. **Outcome:** a verifiable result; no invented metrics.
9. **Reflection:** what worked, what did not, and what would change.
10. **Evidence:** repository, live demo, screenshots, video, diagrams, or code excerpts.

> [!warning] Publication gate
> Missing facts stay marked as evidence gaps in this planning file. “Coming soon” placeholders and unsupported claims do not ship on the public site.

Every featured case study blocks launch until it has the complete evidence set:

- Verified project context and Nour’s role.
- Problem, constraints, architecture, and one key workflow.
- One real engineering tradeoff.
- Validation evidence.
- A verified qualitative outcome or an explicit honest limitation when metrics do not exist.
- Reflection and next improvement.
- Repository and any verified demo.
- At least three strong visual assets, including one system diagram and an appropriate mix of screenshots, video, or interaction captures.

Nour is the final approver for facts, attribution, English copy, Arabic copy, and publication readiness.

## Featured Case Studies

### 1. BuildSense

- **Portfolio role:** strongest product-thinking and engineering-process story; demonstrates range outside .NET.
- **Context:** solo original product.
- **Stack:** MEAN ecosystem: Angular, Node.js/Express, MongoDB, and TypeScript, organized as an Nx monorepo.
- **Problem:** help Egyptian PC buyers discover locally available hardware, compare offers, check compatibility, and build purchase plans.
- **Evidence available:** [repository](https://github.com/NourEldeenMahmoud/BuildSense), [deployed site](https://buildsense.pages.dev/), product and architecture documentation, testing and CI artifacts in the repository.
- **Story angle:** converting inconsistent retailer and hardware data into trustworthy purchase decisions.
- **Do not imply:** that this is a .NET project.
- **Evidence gaps:** verified usage metrics; exact launch state; final screenshots/video to use; one documented architecture tradeoff in Nour’s own words; known limitations.

### 2. Bookify

- **Portfolio role:** clearest flagship evidence for .NET full-stack work.
- **Context:** team project; Nour had a major role.
- **Nour’s stated contribution:** all backend work, booking and payments, identity and security, backend architecture, and frontend leadership.
- **Verified local project profile:** ASP.NET Core MVC on .NET 9, EF Core, SQL Server, Stripe, SendGrid, ASP.NET Core Identity, N-tier architecture, Repository and Unit of Work patterns.
- **Evidence available:** [repository](https://github.com/NourEldeenMahmoud/Bookify). A local project profile lists `https://bookify.runasp.net` as the homepage, but the site was unreachable during the 2026-07-21 documentation review and must not be published as a live demo until verified.
- **Story angle:** designing a hotel reservation workflow around availability, identity, payment, and administration.
- **Evidence gaps:** contributor attribution; exact backend modules committed by Nour; current deployment status; tests and CI that can be demonstrated; screenshots; one difficult booking or payment edge case; measured outcome.

### 3. Blood Bank Platform

- **Portfolio role:** strongest cross-platform and university-team systems story.
- **Context:** university team project; Nour states he implemented roughly 90%.
- **System scope:** WinForms operational desktop application, .NET REST API, Flutter donor application, SQL Server, and JWT authentication.
- **Evidence available:** [desktop repository](https://github.com/NourEldeenMahmoud/BBMS-Project), [mobile/API repository](https://github.com/NourEldeenMahmoud/Blood-Bank-mobile-App), local project profiles describing the components.
- **Story angle:** supporting one blood-donation domain across staff and donor experiences.
- **Attribution wording:** “University team project. I implemented most of the system.” Do not claim 100% ownership.
- **Evidence gaps:** exact teammate contributions; architecture diagram verified against code; API location and deployment status; generated/build artifacts to clean; screenshots; tests; notification implementation; data flow between desktop, API, and mobile.

### 4. How to Train Your AI

- **Portfolio role:** creative engineering, Unity, leadership, and generalist range.
- **Context:** team project.
- **Nour’s stated role:** generalist and leader.
- **Repository description:** Unity 6 first-person narrative game with three training mini-games whose performance affects the robot’s later reliability.
- **Evidence available:** [repository](https://github.com/NourEldeenMahmoud/HowToTrainYourAI-Game), repository screenshots/video where available.
- **Story angle:** coordinating design and engineering around a narrative system where player training has consequences.
- **Evidence gaps:** exact systems and scenes authored by Nour; team responsibilities; course or event context; asset and audio provenance; playable build; supported platforms; technical postmortem.

### 5. CinemaVerse

- **Portfolio role:** additional .NET backend and team-collaboration evidence.
- **Context:** team repository fork; original repository is under a teammate’s account.
- **Nour’s stated contribution:** backend development, including backend architecture, booking and ticketing, and payments. Backend work was shared with a teammate; the public copy does not need percentages, but it must not imply sole ownership.
- **Verified local project profile:** ASP.NET Core Web API on .NET 9, EF Core 9, SQL Server, JWT, Stripe, Hangfire, Serilog, MailKit, RazorLight, caching, rate limiting, and an N-tier structure.
- **Evidence available:** [Nour’s fork](https://github.com/NourEldeenMahmoud/CinemaVerse), [team repository](https://github.com/OmarAbouelkheirr/CinemaVerse).
- **Story angle:** implementing backend workflows for cinema discovery, seat reservation, ticketing, and payment in a team setting.
- **Evidence gaps:** commit/PR evidence for Nour’s modules; current frontend and deployment state; tests; exact payment flow; seat-concurrency behavior; screenshots or API demo.

## Supporting Content

### About and CV

- Target roles: junior .NET backend and full-stack roles.
- Explain the “broad range, deep center” model directly.
- Show selected capabilities grouped by evidence, not a wall of technology logos.
- Include education, structured self-study, team leadership, links, CV, and contact methods.
- Verify degree wording, grade, DEPI dates, CV asset, and all social URLs before publication.

### How I Work Tutorials

The old “AI Workflows” concept becomes instructional content based on real processes, not a dashboard claiming six systems run continuously.

First candidate tutorials:

- How course material becomes structured Obsidian summaries.
- How summary quality is reviewed and corrected.
- How requirements, ADRs, and implementation tasks guide AI-assisted development.
- How Nour validates generated code rather than treating AI output as finished work.

Each tutorial must show inputs, process, tools, validation, output, limitations, and reusable steps. Publish only workflows that can be demonstrated.

### Knowledge Preview

Existing and planned collections include MET summaries, EF Core, ASP.NET Core, REST APIs, secured APIs with JWT/roles/policies, LINQ, JavaScript, HTML, T-SQL, Assembly, and other self-study notes.

The MVP Knowledge page previews five representative collections: EF Core, REST APIs, Secured APIs, JavaScript, and MET Summaries. Link only to material that is actually public.

Whether the full library is embedded or hosted as a separate StudyHub remains undecided.

### Additional Work

Keep secondary projects searchable by capability, not as equal flagship cards:

- .NET applications: StudyTracker, DVLD, StoryForge Bot.
- Games: Unity Projects, RockPaperScissors.
- Bots and automation: XPTracker Bot, StoryForge Bot.
- Practice: Frontend Mini Projects, Bank Management System, DEPI assignments.
- Knowledge: MET Summaries, T-SQL Summary, Assembly 8086 Summary, secured API notes.

## Required Asset Checklist

- [ ] Existing CV PDF supplied and verified before launch; its source and generation process remain unspecified.
- [ ] Professional portrait or a documented decision not to use one.
- [ ] Verified GitHub, LinkedIn, email, and other contact URLs.
- [ ] 3-6 high-quality visuals for each featured case study.
- [ ] One architecture diagram per technical case study.
- [ ] Role and contributor statement per team project.
- [ ] Demo or short video when a live build is unavailable.
- [ ] Logo, favicon, Open Graph image, and social preview copy.
- [ ] English and Arabic final copy reviewed for factual parity.

## Public Contact Channels

- Primary recruiter action: email at `noureldeendev@gmail.com`.
- Secondary professional action: [LinkedIn](https://linkedin.com/in/nour-eldeen-eg).
- Secondary messaging options on Contact/About: Telegram `@DevNourEldeen` and WhatsApp at the user-approved public number.
- Email and LinkedIn remain visually primary. WhatsApp publication intentionally exposes the phone number and must not be added anywhere beyond the approved contact surfaces.
