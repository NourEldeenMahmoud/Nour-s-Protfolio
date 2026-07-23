---
title: Learn Experience Artifact Inventory
status: active
updated: 2026-07-21
language: en
tags:
  - portfolio
  - learn
  - artifact-inventory
  - four-path
---

# Learn Experience Artifact Inventory

## Overview

Learn is the personal engineering workshop path. It presents architecture, decisions, experiments, tutorials, knowledge collections, validation, and learning process. This inventory catalogs known and missing artifacts using only existing facts.

**Arabic title (العنوان بالعربية):** جرد أثاث تجربة "تعلم"

---

## Workshop Zones (TDD §14.5)

| Zone               | Purpose                                                      |
| ------------------ | ------------------------------------------------------------ |
| Systems shelf      | .NET, APIs, architecture, data, security.                    |
| Project breakdowns | Technical case-study views per project.                      |
| Process wall       | Requirements, ADRs, diagrams, tests, validation.             |
| Experiment bench   | MEAN, Unity, Flutter, automation, unfamiliar domains.        |
| Knowledge library  | EF Core, REST APIs, Secured APIs, JavaScript, MET summaries. |
| Tutorial desk      | How I Work and technical tutorials.                          |
| Reflection log     | Limitations, mistakes, and next improvements.                |

---

## Knowledge Collections (First Release)

| Collection    | Public status | Source                                                                                                                                  |
| ------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| EF Core       | VERIFIED      | Listed in D-036 as approved MVP collection. Public destination not yet confirmed.                                                       |
| REST APIs     | VERIFIED      | Listed in D-036 as approved MVP collection. Public destination not yet confirmed.                                                       |
| Secured APIs  | VERIFIED      | Listed in D-036 as approved MVP collection. Public destination not yet confirmed.                                                       |
| JavaScript    | VERIFIED      | Listed in D-036 as approved MVP collection. Public destination not yet confirmed.                                                       |
| MET Summaries | VERIFIED      | MET Summaries repository: https://github.com/NourEldeenMahmoud/MET-Summaries. Site: https://noureldeenmahmoud.github.io/MET-Summaries/. |

**Gap:** Each collection must have a verified preview copy and a public destination before launch (`07 Product Requirements Document.md` §14).

**Arabic summary (ملخص بالعربية):** خمس مجموعات معرفية مُعتمدة. MET Summaries لها موقع عام. المجموعات الأربع الأخرى تحتاج نسخ معاينة ومواقع عامة موثّقة.

---

## Per-Project Technical Artifacts

### BuildSense

| Artifact type                      | Status                    | Note                                                                                                                |
| ---------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Architecture diagram               | MISSING                   | Not yet created.                                                                                                    |
| ADR (Architecture Decision Record) | MISSING                   | No ADR documented.                                                                                                  |
| Key tradeoff                       | MISSING                   | One documented tradeoff in Nour's own words still needed (`02 Content and Case Studies.md`).                        |
| Test evidence / discussion         | INFERRED — DO NOT PUBLISH | Repository may contain testing artifacts per `02 Content and Case Studies.md` but nothing verified for publication. |
| Code context / excerpts            | MISSING                   | No code excerpts selected or verified.                                                                              |
| Experiment notes                   | MISSING                   | No documented experiments.                                                                                          |
| Reflection                         | MISSING                   | Not yet documented.                                                                                                 |
| Validation documentation           | MISSING                   | No validation documentation verified.                                                                               |

### Bookify

| Artifact type                      | Status  | Note                                                                            |
| ---------------------------------- | ------- | ------------------------------------------------------------------------------- |
| Architecture diagram               | MISSING | Not yet created.                                                                |
| ADR (Architecture Decision Record) | MISSING | No ADR documented.                                                              |
| Key tradeoff                       | MISSING | Specific edge case not documented (`02 Content and Case Studies.md`).           |
| Test evidence / discussion         | MISSING | Tests that can be demonstrated still needed (`02 Content and Case Studies.md`). |
| Code context / excerpts            | MISSING | No code excerpts selected or verified.                                          |
| Experiment notes                   | MISSING | No documented experiments.                                                      |
| Reflection                         | MISSING | Not yet documented.                                                             |
| Validation documentation           | MISSING | No validation documentation verified.                                           |

### Blood Bank Platform

| Artifact type                      | Status  | Note                                                                                           |
| ---------------------------------- | ------- | ---------------------------------------------------------------------------------------------- |
| Architecture diagram               | MISSING | Architecture diagram verified against code not yet created (`02 Content and Case Studies.md`). |
| ADR (Architecture Decision Record) | MISSING | No ADR documented.                                                                             |
| Key tradeoff                       | MISSING | Not yet documented.                                                                            |
| Test evidence / discussion         | MISSING | Tests not documented (`02 Content and Case Studies.md`).                                       |
| Code context / excerpts            | MISSING | No code excerpts selected or verified.                                                         |
| Cross-platform data flow           | MISSING | Data flow between desktop, API, and mobile not documented (`02 Content and Case Studies.md`).  |
| Reflection                         | MISSING | Not yet documented.                                                                            |

### How to Train Your AI

| Artifact type                      | Status  | Note                                                                              |
| ---------------------------------- | ------- | --------------------------------------------------------------------------------- |
| Architecture diagram               | MISSING | Not yet created.                                                                  |
| ADR (Architecture Decision Record) | MISSING | No ADR documented.                                                                |
| Key tradeoff                       | MISSING | Not yet documented.                                                               |
| Authored systems documentation     | MISSING | Exact systems authored by Nour not documented (`02 Content and Case Studies.md`). |
| Technical postmortem               | MISSING | Not yet documented (`02 Content and Case Studies.md`).                            |
| Code context / excerpts            | MISSING | No code excerpts selected or verified.                                            |
| Reflection                         | MISSING | Not yet documented.                                                               |

### CinemaVerse

| Artifact type                            | Status  | Note                                                                                                |
| ---------------------------------------- | ------- | --------------------------------------------------------------------------------------------------- |
| Architecture diagram                     | MISSING | Not yet created.                                                                                    |
| ADR (Architecture Decision Record)       | MISSING | No ADR documented.                                                                                  |
| Key tradeoff                             | MISSING | Not yet documented.                                                                                 |
| Test evidence / discussion               | MISSING | Tests not documented (`02 Content and Case Studies.md`).                                            |
| Seat-concurrency / payment documentation | MISSING | Exact payment flow and seat-concurrency behavior not documented (`02 Content and Case Studies.md`). |
| Code context / excerpts                  | MISSING | No code excerpts selected or verified.                                                              |
| Reflection                               | MISSING | Not yet documented.                                                                                 |

---

## How I Work Tutorials (First Release)

| Tutorial                                                                          | Status  | Note                                                                      |
| --------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------- |
| How course material becomes structured Obsidian summaries                         | MISSING | Candidate listed in `02 Content and Case Studies.md` but not yet created. |
| How summary quality is reviewed and corrected                                     | MISSING | Candidate listed in `02 Content and Case Studies.md` but not yet created. |
| How requirements, ADRs, and implementation tasks guide AI-assisted development    | MISSING | Candidate listed in `02 Content and Case Studies.md` but not yet created. |
| How Nour validates generated code rather than treating AI output as finished work | MISSING | Candidate listed in `02 Content and Case Studies.md` but not yet created. |

Each tutorial must show: inputs, process, tools, validation, output, limitations, and reusable steps. Publish only workflows that can be demonstrated (`02 Content and Case Studies.md`).

**Arabic summary (ملخص بالعربية):** أربعة دروس مرشّحة لم تُنشأ بعد. كل درس يجب أن يعرض المدخلات والأدوات والتحقق والمخرجات والقيود.

---

## Learn Path EN/AR Parity Requirements

1. Every artifact title, description, and annotation must exist in both English and Arabic.
2. Architecture diagrams must include text explanations in both languages.
3. Code context must retain technology terms in their original form with Arabic explanatory text.
4. Tutorial content must be fully bilingual.
5. Knowledge collection previews must exist in both languages.
6. Evidence labels must display identically in both language versions.

---

## Files Consulted

- `docs/02 Content and Case Studies.md` — evidence gaps, tutorial candidates, knowledge collections.
- `docs/05 Decision Register.md` — D-036, evidence blockers.
- `docs/06 References.md` — MET Summaries links.
- `docs/011 TDD.md` — §14.5, §14.10, §9.
