---
title: Flagship Project Evidence Matrix
status: active
updated: 2026-07-21
language: en
tags:
  - portfolio
  - evidence-matrix
  - four-path
---

# Flagship Project Evidence Matrix

## Overview

This matrix records the evidence status for all five flagship projects using only existing facts from `docs/02 Content and Case Studies.md` and `docs/05 Decision Register.md`. No ownership, metrics, deployments, tests, outcomes, or architecture decisions are invented.

Evidence statuses use the five mandated labels (D-043):

- **VERIFIED** — confirmed through direct inspection or reliable source.
- **USER-CONFIRMED** — stated by Nour but not independently verified.
- **INFERRED — DO NOT PUBLISH** — suggested by available evidence but not confirmed; must not appear in public content.
- **MISSING** — required evidence not yet available.
- **NOT APPLICABLE** — the item does not apply to this project by nature.

**Arabic title (العنوان بالعربية):** مصفوفة أدلة المشاريع الخمسة الأولى

---

## BuildSense

| Evidence item           | Status                    | Source / Note                                                                                                                                                                        |
| ----------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Project context         | VERIFIED                  | Solo original product (`02 Content and Case Studies.md`).                                                                                                                            |
| Stack                   | VERIFIED                  | MEAN ecosystem: Angular, Node.js/Express, MongoDB, TypeScript, Nx monorepo (`02 Content and Case Studies.md`).                                                                       |
| Repository              | VERIFIED                  | https://github.com/NourEldeenMahmoud/BuildSense (`06 References.md`).                                                                                                                |
| Live deployment         | VERIFIED                  | https://buildsense.pages.dev/ (`02 Content and Case Studies.md`).                                                                                                                    |
| Role / ownership        | USER-CONFIRMED            | Product owner and engineer. Nour states solo ownership. Do not imply .NET involvement (`05 Decision Register.md`).                                                                   |
| Problem framing         | USER-CONFIRMED            | Help Egyptian PC buyers discover hardware, compare offers, check compatibility, and build purchase plans (`02 Content and Case Studies.md`).                                         |
| Architecture diagram    | MISSING                   | Not yet created or verified against deployed code.                                                                                                                                   |
| System/workflow diagram | MISSING                   | Not yet created.                                                                                                                                                                     |
| Key tradeoff            | MISSING                   | One documented architecture tradeoff in Nour's own words still needed (`02 Content and Case Studies.md`).                                                                            |
| Tests / CI evidence     | INFERRED — DO NOT PUBLISH | Repository contains testing and CI artifacts per `02 Content and Case Studies.md`, but no specific test results, coverage, or CI pipeline status have been verified for publication. |
| Screenshots / media     | MISSING                   | Final screenshots/video to use still needed (`02 Content and Case Studies.md`).                                                                                                      |
| Usage metrics           | MISSING                   | Verified usage metrics still needed (`02 Content and Case Studies.md`).                                                                                                              |
| Launch state            | MISSING                   | Exact launch state still needed (`02 Content and Case Studies.md`).                                                                                                                  |
| Known limitations       | MISSING                   | Not yet documented in Nour's own words.                                                                                                                                              |
| Reflection              | MISSING                   | Not yet documented.                                                                                                                                                                  |
| Publication state       | NOT APPLICABLE            | Not yet evaluated; publication gate not met.                                                                                                                                         |

**Arabic summary (ملخص بالعربية):** BuildSense ملكية فردية على منصة MEAN. لا يُستخدم .NET. توجد مستودع وموقع مُنشر. تُعدّ الأدلة المعمارية والوسائط والاختبارات والtradeoffs والأ划限ات والتأمّل.

---

## Bookify

| Evidence item        | Status         | Source / Note                                                                                                                                                                          |
| -------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Project context      | USER-CONFIRMED | Team project; Nour had a major role (`02 Content and Case Studies.md`).                                                                                                                |
| Stack                | VERIFIED       | ASP.NET Core MVC on .NET 9, EF Core, SQL Server, Stripe, SendGrid, ASP.NET Core Identity, N-tier architecture (`02 Content and Case Studies.md`).                                      |
| Repository           | VERIFIED       | https://github.com/NourEldeenMahmoud/Bookify (`06 References.md`).                                                                                                                     |
| Live deployment      | MISSING        | URL https://bookify.runasp.net listed in local profile but unreachable during 2026-07-21 review; must not be published as live demo until verified (`02 Content and Case Studies.md`). |
| Role / ownership     | USER-CONFIRMED | All backend work, booking/payments, identity/security, backend architecture, and frontend leadership (`02 Content and Case Studies.md`).                                               |
| Contributor evidence | MISSING        | Exact backend modules committed by Nour not yet documented (`02 Content and Case Studies.md`).                                                                                         |
| Problem framing      | USER-CONFIRMED | Hotel reservation workflow around availability, identity, payment, and administration (`02 Content and Case Studies.md`).                                                              |
| Architecture diagram | MISSING        | Not yet created or verified.                                                                                                                                                           |
| Key tradeoff         | MISSING        | Specific difficult booking or payment edge case not yet documented (`02 Content and Case Studies.md`).                                                                                 |
| Tests / CI evidence  | MISSING        | Tests and CI that can be demonstrated still needed (`02 Content and Case Studies.md`).                                                                                                 |
| Screenshots / media  | MISSING        | Screenshots still needed (`02 Content and Case Studies.md`).                                                                                                                           |
| Deployment status    | MISSING        | Current deployment status not verified (`02 Content and Case Studies.md`).                                                                                                             |
| Measured outcome     | MISSING        | No measured outcome documented.                                                                                                                                                        |
| Reflection           | MISSING        | Not yet documented.                                                                                                                                                                    |
| Publication state    | NOT APPLICABLE | Not yet evaluated; publication gate not met.                                                                                                                                           |

**Arabic summary (ملخص بالعربية):** Bookify مشروع فريق على ASP.NET Core. نور أكمل العمل الخلفي بالكامل. لا تتوفر أدلة مساهمة محددة ولا موقع مباشر موثّق ولا اختبارات ولا لقطات شاشة.

---

## Blood Bank Platform

| Evidence item               | Status         | Source / Note                                                                                                          |
| --------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Project context             | USER-CONFIRMED | University team project; Nour states he implemented roughly 90% (`02 Content and Case Studies.md`).                    |
| Stack                       | USER-CONFIRMED | WinForms desktop, .NET REST API, Flutter donor app, SQL Server, JWT authentication (`02 Content and Case Studies.md`). |
| Desktop repository          | VERIFIED       | https://github.com/NourEldeenMahmoud/BBMS-Project (`06 References.md`).                                                |
| Mobile/API repository       | VERIFIED       | https://github.com/NourEldeenMahmoud/Blood-Bank-mobile-App (`06 References.md`).                                       |
| Role / ownership            | USER-CONFIRMED | "I implemented most of the system." Do not claim 100% ownership (`02 Content and Case Studies.md`).                    |
| Teammate contributions      | MISSING        | Exact teammate split not documented (`02 Content and Case Studies.md`).                                                |
| Architecture diagram        | MISSING        | Architecture diagram verified against code not yet created (`02 Content and Case Studies.md`).                         |
| API deployment status       | MISSING        | API location and deployment status unknown (`02 Content and Case Studies.md`).                                         |
| Key tradeoff                | MISSING        | Not yet documented.                                                                                                    |
| Tests evidence              | MISSING        | Tests not yet documented (`02 Content and Case Studies.md`).                                                           |
| Screenshots / media         | MISSING        | Screenshots still needed (`02 Content and Case Studies.md`).                                                           |
| Notification implementation | MISSING        | Notification implementation not yet verified (`02 Content and Case Studies.md`).                                       |
| Data flow documentation     | MISSING        | Data flow between desktop, API, and mobile not documented (`02 Content and Case Studies.md`).                          |
| Repository hygiene          | MISSING        | Generated/build artifacts to clean (`05 Decision Register.md`).                                                        |
| Reflection                  | MISSING        | Not yet documented.                                                                                                    |
| Publication state           | NOT APPLICABLE | Not yet evaluated; publication gate not met.                                                                           |

**Arabic summary (ملخص بالعربية):** Blood Bank مشروع جامعي. نور نفّذ الجزء الأكبر. تتوفر مستودعان. تُعدّ مساهمات الفريق والهيكلية والاختبارات والوسائط والنشر.

---

## How to Train Your AI

| Evidence item              | Status                    | Source / Note                                                                                                      |
| -------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Project context            | USER-CONFIRMED            | Team project (`02 Content and Case Studies.md`).                                                                   |
| Stack                      | USER-CONFIRMED            | Unity 6 first-person narrative game with three training mini-games (`02 Content and Case Studies.md`).             |
| Repository                 | VERIFIED                  | https://github.com/NourEldeenMahmoud/HowToTrainYourAI-Game (`06 References.md`).                                   |
| Role / ownership           | USER-CONFIRMED            | Generalist and team leader (`02 Content and Case Studies.md`).                                                     |
| Team responsibilities      | MISSING                   | Exact team responsibilities not documented (`02 Content and Case Studies.md`).                                     |
| Course / event context     | MISSING                   | Course or event context not documented (`02 Content and Case Studies.md`).                                         |
| Asset and audio provenance | MISSING                   | Asset and audio provenance not documented (`02 Content and Case Studies.md`).                                      |
| Authored systems / scenes  | MISSING                   | Exact systems and scenes authored by Nour not documented (`02 Content and Case Studies.md`).                       |
| Architecture diagram       | MISSING                   | Not yet created.                                                                                                   |
| Key tradeoff               | MISSING                   | Not yet documented.                                                                                                |
| Playable build             | MISSING                   | Playable build not yet available (`02 Content and Case Studies.md`).                                               |
| Supported platforms        | MISSING                   | Supported platforms not documented (`02 Content and Case Studies.md`).                                             |
| Video evidence             | INFERRED — DO NOT PUBLISH | Repository screenshots/video may exist per `02 Content and Case Studies.md`, but nothing verified for publication. |
| Technical postmortem       | MISSING                   | Not yet documented (`02 Content and Case Studies.md`).                                                             |
| Reflection                 | MISSING                   | Not yet documented.                                                                                                |
| Publication state          | NOT APPLICABLE            | Not yet evaluated; publication gate not met.                                                                       |

**Arabic summary (ملخص بالعربية):** How to Train Your AI مشروع فريق على Unity 6. نور كان مسيّراً عاماً. تتوفر المستودع. تُعدّ مسؤوليات الفريق والأصول والأنظمة المُنجزة والبناء القابل للتشغيل.

---

## CinemaVerse

| Evidence item               | Status         | Source / Note                                                                                                                                                                             |
| --------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Project context             | USER-CONFIRMED | Team repository fork; original repository under teammate's account (`02 Content and Case Studies.md`).                                                                                    |
| Stack                       | VERIFIED       | ASP.NET Core Web API on .NET 9, EF Core 9, SQL Server, JWT, Stripe, Hangfire, Serilog, MailKit, RazorLight, caching, rate limiting, N-tier (`02 Content and Case Studies.md`).            |
| Nour's fork                 | VERIFIED       | https://github.com/NourEldeenMahmoud/CinemaVerse (`06 References.md`).                                                                                                                    |
| Team repository             | VERIFIED       | https://github.com/OmarAbouelkheirr/CinemaVerse (`06 References.md`).                                                                                                                     |
| Role / ownership            | USER-CONFIRMED | Backend development including backend architecture, booking/ticketing, and payments. Backend work shared with a teammate; do not imply sole ownership (`02 Content and Case Studies.md`). |
| Commit / PR evidence        | MISSING        | Commit/PR evidence for Nour's modules not yet documented (`02 Content and Case Studies.md`).                                                                                              |
| Problem framing             | USER-CONFIRMED | Backend workflows for cinema discovery, seat reservation, ticketing, and payment in a team setting (`02 Content and Case Studies.md`).                                                    |
| Architecture diagram        | MISSING        | Not yet created.                                                                                                                                                                          |
| Key tradeoff                | MISSING        | Not yet documented.                                                                                                                                                                       |
| Seat-concurrency behavior   | MISSING        | Seat-concurrency behavior not documented (`02 Content and Case Studies.md`).                                                                                                              |
| Payment flow details        | MISSING        | Exact payment flow not documented (`02 Content and Case Studies.md`).                                                                                                                     |
| Tests evidence              | MISSING        | Tests not documented (`02 Content and Case Studies.md`).                                                                                                                                  |
| Frontend / deployment state | MISSING        | Current frontend and deployment state unknown (`02 Content and Case Studies.md`).                                                                                                         |
| Screenshots / API demo      | MISSING        | Screenshots or API demo not available (`02 Content and Case Studies.md`).                                                                                                                 |
| Reflection                  | MISSING        | Not yet documented.                                                                                                                                                                       |
| Publication state           | NOT APPLICABLE | Not yet evaluated; publication gate not met.                                                                                                                                              |

**Arabic summary (ملخص بالعربية):** CinemaVerse فورك فريق على ASP.NET Core. نور عمل في الخلفيّة مع زميل. لا تتوفر أدلة الالتزامات ولا الاختبارات ولا حالة النشر.

---

## Publication Safety

This matrix is a planning instrument. The following rules apply:

1. Items with status **INFERRED — DO NOT PUBLISH** must never appear as public claims.
2. Items with status **MISSING** block the publication gate for the affected project.
3. Items with status **NOT APPLICABLE** are recorded for completeness and do not block publication.
4. Items with status **USER-CONFIRMED** require Nour's review before publication but do not block the evidence matrix from being used for planning.
5. Items with status **VERIFIED** are safe for internal planning and can be used to draft public content pending final review.
6. No evidence item may be upgraded in status without the original source being recorded.

**Arabic summary (ملخص بالعربية):** هذه المصفوفة أداة تخطيط. لا تُنشر أي حالة "مستنتَج — لا تُنشر". العناصر المفقودة تمنع النشر.

---

## Files Consulted

- `docs/02 Content and Case Studies.md` — evidence gaps, context, stack, role, links.
- `docs/05 Decision Register.md` — attribution decisions, evidence blockers.
- `docs/06 References.md` — verified repository and deployment links.
