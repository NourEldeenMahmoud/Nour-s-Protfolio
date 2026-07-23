---
title: Phase 0 Content Gaps Backlog
status: active
updated: 2026-07-21
language: en
tags:
  - portfolio
  - gaps-backlog
  - four-path
  - phase-0
---

# Phase 0 Content Gaps Backlog

## Overview

This backlog lists prioritized, actionable content gaps that block or risk blocking Phase 0 completion and first public launch. Gaps are derived from existing documentation facts only. No gaps are invented.

**Arabic title (العنوان بالعربية):** قائمة عوائق المحتوى لمراحل المرحلة صفر

---

## Priority Legend

| Priority | Meaning                                                           |
| -------- | ----------------------------------------------------------------- |
| P0       | Blocks Phase 0 exit or launch.                                    |
| P1       | Blocks a specific path or project from reaching publication gate. |
| P2       | Degrades quality or completeness but does not block launch.       |
| P3       | Nice-to-have for first release; deferrable.                       |

---

## Backlog

### Bookify Evidence Gaps

| ID    | Gap                                                                 | Status  | Owner / Question                                                                                  | Dependency                                                          | Blocking impact                                                                  |
| ----- | ------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| G-001 | Contributor attribution and exact backend modules committed by Nour | MISSING | Nour: document which backend modules and patterns were personally committed.                      | Required for Bookify publication gate.                              | Blocks Hire path (.NET flagship) and Bookify four-view vertical slice (Phase 6). |
| G-002 | Live-site verification for https://bookify.runasp.net               | MISSING | Nour: verify whether the site is live, accessible, and current. If not, remove from public links. | Blocks deployment-status claims.                                    | Blocks Watch media capture from live site and Hire proof.                        |
| G-003 | Tests and CI that can be demonstrated                               | MISSING | Nour: identify test projects, coverage, and CI pipeline.                                          | Required for Learn artifact inventory and Bookify publication gate. | Blocks Learn path for Bookify.                                                   |
| G-004 | Screenshots and directed media for Watch                            | MISSING | Nour: capture or select at least 4 strong Bookify visuals.                                        | Bookify four-view vertical slice (Phase 6).                         | Blocks Watch path for Bookify.                                                   |
| G-005 | Specific tradeoff or edge case in Nour's own words                  | MISSING | Nour: describe one real booking or payment tradeoff.                                              | Required for Learn path and publication gate.                       | Blocks Learn path for Bookify.                                                   |
| G-006 | Measured outcome or honest limitation                               | MISSING | Nour: state what the project achieved or where it falls short.                                    | Required for publication gate.                                      | Blocks all four paths for Bookify.                                               |

### BuildSense Evidence Gaps

| ID    | Gap                                   | Status  | Owner / Question                                                  | Dependency                                    | Blocking impact                             |
| ----- | ------------------------------------- | ------- | ----------------------------------------------------------------- | --------------------------------------------- | ------------------------------------------- |
| G-007 | Architecture diagram                  | MISSING | Nour: create or approve a verified system diagram.                | Required for all four paths.                  | Blocks all four paths for BuildSense.       |
| G-008 | Key tradeoff in Nour's own words      | MISSING | Nour: document one real architecture tradeoff.                    | Required for Learn path and publication gate. | Blocks Learn path for BuildSense.           |
| G-009 | Final screenshots and media selection | MISSING | Nour: select or capture at least 4 strong visuals.                | Required for all four paths.                  | Blocks Watch and Hire paths for BuildSense. |
| G-010 | Usage metrics                         | MISSING | Nour: provide verified metrics or document limitation.            | Required for publication gate.                | Blocks publication.                         |
| G-011 | Launch state documentation            | MISSING | Nour: confirm deployment status, features live, and known issues. | Required for publication gate.                | Blocks publication.                         |
| G-012 | Known limitations                     | MISSING | Nour: document at least one real limitation.                      | Required for Learn path and publication gate. | Blocks Learn path for BuildSense.           |

### Blood Bank Platform Evidence Gaps

| ID    | Gap                                        | Status  | Owner / Question                                          | Dependency                       | Blocking impact                       |
| ----- | ------------------------------------------ | ------- | --------------------------------------------------------- | -------------------------------- | ------------------------------------- |
| G-013 | Exact teammate contributions               | MISSING | Nour: document who contributed what.                      | Required for honest attribution. | Blocks all four paths.                |
| G-014 | Architecture diagram verified against code | MISSING | Nour: create a verified architecture diagram.             | Required for all four paths.     | Blocks all four paths for Blood Bank. |
| G-015 | API deployment status                      | MISSING | Nour: confirm whether the API is deployed and accessible. | Required for publication gate.   | Blocks publication and Watch media.   |
| G-016 | Data flow between desktop, API, and mobile | MISSING | Nour: document cross-platform data flow.                  | Required for Learn path.         | Blocks Learn path for Blood Bank.     |
| G-017 | Screenshots and media                      | MISSING | Nour: capture desktop, mobile, and API visuals.           | Required for all four paths.     | Blocks Watch and Hire paths.          |
| G-018 | Repository hygiene (generated artifacts)   | MISSING | Nour: clean generated/build artifacts from repositories.  | Required for publication gate.   | Blocks publication.                   |

### How to Train Your AI Evidence Gaps

| ID    | Gap                                       | Status  | Owner / Question                                                                 | Dependency                       | Blocking impact                     |
| ----- | ----------------------------------------- | ------- | -------------------------------------------------------------------------------- | -------------------------------- | ----------------------------------- |
| G-019 | Exact systems and scenes authored by Nour | MISSING | Nour: document which Unity systems, scenes, and scripts were personally created. | Required for honest attribution. | Blocks all four paths.              |
| G-020 | Team responsibilities                     | MISSING | Nour: document team member roles.                                                | Required for honest attribution. | Blocks all four paths.              |
| G-021 | Course or event context                   | MISSING | Nour: document the course, event, or context in which the project was created.   | Required for honest attribution. | Blocks publication.                 |
| G-022 | Asset and audio provenance                | MISSING | Nour: document which assets are original, licensed, or borrowed.                 | Required for publication gate.   | Blocks publication.                 |
| G-023 | Playable build or video evidence          | MISSING | Nour: provide a playable build or verified video.                                | Required for Watch path.         | Blocks Watch path for this project. |
| G-024 | Technical postmortem                      | MISSING | Nour: document what worked, what did not, and what would change.                 | Required for Learn path.         | Blocks Learn path for this project. |

### CinemaVerse Evidence Gaps

| ID    | Gap                                             | Status  | Owner / Question                                                   | Dependency                                    | Blocking impact                             |
| ----- | ----------------------------------------------- | ------- | ------------------------------------------------------------------ | --------------------------------------------- | ------------------------------------------- |
| G-025 | Commit / PR evidence for Nour's modules         | MISSING | Nour: identify commits or PRs demonstrating backend contributions. | Required for honest attribution.              | Blocks all four paths.                      |
| G-026 | Tests evidence                                  | MISSING | Nour: identify existing tests or document their absence.           | Required for Learn path and publication gate. | Blocks Learn path and publication.          |
| G-027 | Payment flow and seat-concurrency documentation | MISSING | Nour: document the exact payment and seat-concurrency behavior.    | Required for Learn path.                      | Blocks Learn path for CinemaVerse.          |
| G-028 | Screenshots or API demo                         | MISSING | Nour: capture or create visuals.                                   | Required for Watch and Hire paths.            | Blocks Watch and Hire paths.                |
| G-029 | Frontend and deployment state                   | MISSING | Nour: confirm whether the frontend is deployed and accessible.     | Required for publication gate.                | Blocks publication and Watch media capture. |

### Cross-Path Gaps

| ID    | Gap                                                      | Status             | Owner / Question                                                                                                               | Dependency                                             | Blocking impact                                                               |
| ----- | -------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ | ----------------------------------------------------------------------------- |
| G-030 | English and Arabic positioning copy approval             | MISSING            | Nour: review and approve path intro copy in English and Arabic (docs/16).                                                      | Required for all paths to launch.                      | Blocks launch.                                                                |
| G-031 | CV PDF supply and verification (O-009)                   | MISSING            | Nour: supply the existing CV PDF that will ship.                                                                               | Required for Hire path and About page.                 | Blocks Hire path and contact conversion.                                      |
| G-032 | Verified contact links                                   | MISSING            | Nour: verify email, LinkedIn, Telegram, and WhatsApp links are functional.                                                     | Required for all paths.                                | Blocks contact conversion on all paths.                                       |
| G-033 | Education wording verification                           | MISSING            | Nour: confirm degree, grade, DEPI dates, and education copy.                                                                   | Required for Hire and About.                           | Blocks Hire path.                                                             |
| G-034 | Knowledge collection public destinations (5 collections) | MISSING            | Nour: confirm public URLs or destinations for EF Core, REST APIs, Secured APIs, JavaScript, and MET Summaries previews.        | Required for Learn path.                               | Blocks Learn path knowledge library.                                          |
| G-035 | Knowledge collection preview copy                        | MISSING            | Nour: approve preview copy for each of the five collections.                                                                   | Required for Learn path.                               | Blocks Learn path knowledge library.                                          |
| G-036 | How I Work tutorial creation (at least one)              | MISSING            | Nour: create or approve at least one complete tutorial with inputs, process, validation, output, limitations, and attribution. | Required for Learn path.                               | Blocks Learn path completeness.                                               |
| G-037 | O-001 visual direction decision                          | OPEN               | Nour: select final visual direction (Project Multiverse, Cinematic Product Stories, or hybrid).                                | Blocks framework selection and detailed art direction. | Does not block Phase 0 documentation exit but blocks Phase 1+ implementation. |
| G-038 | All five projects: key tradeoff in Nour's own words      | MISSING (all five) | Nour: document one real tradeoff per project.                                                                                  | Required for Learn path and publication gate.          | Blocks Learn path for all five projects.                                      |
| G-039 | All five projects: reflection                            | MISSING (all five) | Nour: document what worked, what did not, and what would change for each project.                                              | Required for publication gate.                         | Blocks publication for all five projects.                                     |
| G-040 | All five projects: architecture diagram                  | MISSING (all five) | Nour: create or approve one architecture diagram per project.                                                                  | Required for all four paths.                           | Blocks all four paths for all five projects.                                  |

---

## Summary

| Priority                               | Count | Status   |
| -------------------------------------- | ----- | -------- |
| P0 (blocks Phase 0 exit / launch)      | 14    | All open |
| P1 (blocks a specific path or project) | 16    | All open |
| P2 (degrades quality)                  | 8     | All open |
| P3 (deferrable)                        | 2     | All open |

**Total open gaps:** 40

**Arabic summary (ملخص بالعربية):** أربعون فجوة محتوى مفتوحة. أربعة عشر منها تمنع خروج المرحلة صفر أو الإطلاق.

---

## Files Consulted

- `docs/02 Content and Case Studies.md` — evidence gaps per project.
- `docs/05 Decision Register.md` — evidence blockers, O-009.
- `docs/06 References.md` — verified links.
- `docs/011 TDD.md` — Phase 0 exit criteria.
