---
title: Four-Path Content Map
status: active
updated: 2026-07-21
language: en
tags:
  - portfolio
  - content-map
  - four-path
---

# Four-Path Content Map

## Overview

The portfolio ships exactly four public paths: **Hire**, **Watch**, **Learn**, and **General**. All four reuse one Shared Content Core and must never duplicate or contradict project facts. The Shared Content Core is internal architecture, not a fifth visitor-facing path.

**Arabic title (العنوان بالعربية):** خريطة المحتوى للمسارين الأربعة

---

## Path Definitions

### Hire

| Attribute                        | Value                                                                                                                                                               |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Slug**                         | `/{lang}/hire`                                                                                                                                                      |
| **Audience intent**              | Recruiter or hiring manager evaluating Nour for a role, internship, or engineering opportunity.                                                                     |
| **Primary question**             | Does Nour fit a junior .NET backend or full-stack role?                                                                                                             |
| **Success action**               | Qualified recruiter contact after evidence review; CV download as supporting action.                                                                                |
| **Information priority**         | Target role, .NET evidence, contribution ownership, team context, CV, and contact — before secondary range content.                                                 |
| **Visual treatment**             | Lighter or more neutral visual world. Less decorative motion. Higher information density.                                                                           |
| **Shared Content Core sourcing** | Uses the same `ProjectFacts`, `EvidenceRecord`, and `PublicationState` as all other paths. Only hierarchy, copy depth, motion grammar, and project ordering differ. |

**Arabic summary (ملخص بالعربية):** مسار مُوجَّه للتوظيف. يقدّم أدلة على اللياقة الوظيفية في .NET قبل المحتوى الثانوي.

### Watch

| Attribute                        | Value                                                                                                                                       |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Slug**                         | `/{lang}/watch`                                                                                                                             |
| **Audience intent**              | Visitor who came to see Nour's work through a cinematic, media-forward project experience.                                                  |
| **Primary question**             | What does Nour's work look like when presented as directed media and project worlds?                                                        |
| **Success action**               | Project chapter completion and media engagement; path to contact or Hire when interest converts.                                            |
| **Information priority**         | Directed screenshots, video, interactions, workflows, and project identity as the navigation system — with context and role always visible. |
| **Visual treatment**             | Cinematic project worlds with project-specific accents, media treatment, and signature motifs. Watch is media-forward, **not video-only**.  |
| **Shared Content Core sourcing** | Uses the same `ProjectFacts` and `EvidenceRecord`. Presentation uses cinematic language, but facts never diverge from other paths.          |

**Important:** Watch does not mean a passive video-only page. It is an explorable showcase whose primary purpose is to let the visitor see the work quickly and memorably (D-042).

**Arabic summary (ملخص بالعربية):** مسار سينمائي يقدّم العمل عبر وسائط موجَّهة وعوالم مشاريع. ليس مسار فيديو فقط.

### Learn

| Attribute                        | Value                                                                                                                                                                       |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Slug**                         | `/{lang}/learn`                                                                                                                                                             |
| **Audience intent**              | Visitor who wants to understand Nour's architecture, decisions, experiments, knowledge, and working process.                                                                |
| **Primary question**             | How does Nour reason, build, validate, and learn?                                                                                                                           |
| **Success action**               | Tutorial and artifact opens; technical-depth engagement; path to contact for engineering-minded visitors.                                                                   |
| **Information priority**         | Architecture diagrams, ADRs, tradeoffs, experiments, tutorials, knowledge collections, validation, limitations, and reflections.                                            |
| **Visual treatment**             | Personal Engineering Workshop with structured zones. Restrained material tones, annotation marks, diagram lines, and workshop surfaces. Must not become visually cluttered. |
| **Shared Content Core sourcing** | Uses the same `ProjectFacts` and `EvidenceRecord`. Adds tutorial and knowledge artifacts not surfaced in other paths.                                                       |

**Arabic summary (ملخص بالعربية):** مسار هندسي تقني يعرض القرارات والتجارب والمعرفة وعملية التعلم.

### General

| Attribute                        | Value                                                                                                                                 |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Slug**                         | `/{lang}/general`                                                                                                                     |
| **Audience intent**              | Balanced public overview for visitors without a specialized intent, or who skip the intent selector.                                  |
| **Primary question**             | What kind of engineer is Nour, what is his strongest work, and what should I do next?                                                 |
| **Success action**               | Portfolio completion leading to contact, CV download, or navigation into a specialized path.                                          |
| **Information priority**         | Positioning, selected work, engineering approach, range with hierarchy, knowledge preview, About, and CV/contact.                     |
| **Visual treatment**             | Balanced editorial composition. Restrained and neutral motion.                                                                        |
| **Shared Content Core sourcing** | Uses the same `ProjectFacts` and `EvidenceRecord`. Equal but hierarchical access to work, process, knowledge, About, CV, and contact. |

**Default behavior:** General is the default continuation when the visitor skips the intent selector. Skipping or choosing the neutral continuation opens `/{lang}/general` (TDD §11.1).

**Arabic summary (ملخص بالعربية):** مسار عام متوازن. هو المسار الافتراضي عند تخطي اختيار النية.

---

## Entry Selector Behavior

The entry page (`/{lang}`) presents **Hire**, **Watch**, and **Learn** as the three primary intent choices and **General** as a visible secondary action.

| Action                                 | Result                        |
| -------------------------------------- | ----------------------------- |
| Select Hire                            | Navigate to `/{lang}/hire`    |
| Select Watch                           | Navigate to `/{lang}/watch`   |
| Select Learn                           | Navigate to `/{lang}/learn`   |
| Select General / Skip intent selection | Navigate to `/{lang}/general` |

All four routes bypass the intro when accessed directly.

**Arabic summary (ملخص بالعربية):** يعرض الدخول ثلاثة خيارات رئيسية (توظيف، مشاهدة، تعلم) ومساراً عاماً افتراضياً.

---

## Shared Content Core

The Shared Content Core provides:

- **Language-neutral facts:** project context, stack, link URLs, evidence status, role classification, publication state, media file identity.
- **Localized narratives:** English and Arabic narrative sections per project.
- **Evidence records:** one set of `EvidenceRecord` entries referenced by all paths.
- **Media records:** one set of `MediaRecord` entries referenced by all paths.
- **Publication state:** one set of `PublicationState` checks per project.

The Shared Content Core is **not** a fifth public path. It exists as internal architecture.

**Arabic summary (ملخص بالعربية):** اللبّ المشترک للمحتوى بنية داخلية وليس مساراً خامساً. يوفّر الحقائق والوسائط والأدلة المشتركة.

---

## Content Allocation by Path

| Content element          | Hire                        | Watch                               | Learn                               | General          |
| ------------------------ | --------------------------- | ----------------------------------- | ----------------------------------- | ---------------- |
| Project context and role | Yes — concise, role-focused | Yes — alongside media               | Yes — architecture context          | Yes — balanced   |
| Problem and solution     | Compressed                  | Visual/workflow focused             | Decision and constraint focused     | Full             |
| Architecture diagrams    | Supporting                  | Signature moments                   | Primary                             | Available        |
| Workflows                | Key workflows               | Directed media sequences            | Validation and process              | Available        |
| Evidence labels          | Prominent                   | Visible alongside spectacle         | Technical evidence                  | Available        |
| Tradeoffs                | Supporting                  | Link to Learn                       | Primary                             | Supporting       |
| Tutorials and knowledge  | Not primary                 | Not primary                         | Primary                             | Preview          |
| CV and contact           | First screen                | Ending                              | Ending                              | Ending           |
| Knowledge preview        | Supporting                  | Not primary                         | Primary collections                 | Preview          |
| About                    | Available                   | Ending section                      | Available                           | Preview and full |
| Media emphasis           | Screenshots, proof images   | Directed media, video, interactions | Diagrams, code context, annotations | Balanced mix     |

**Arabic summary (ملخص بالعربية):** كل مسار يستخدم نفس اللبّ المشترک مع ترتيب وتعميق مختلف للمحتوى.

---

## Four-Path Consistency Rules

1. **No factual duplication.** All paths read from one `ProjectFacts` source.
2. **No contradiction.** If a fact appears in Hire, Watch, Learn, and General, it must be the same fact.
3. **Evidence labels are shared.** Every path displays the same evidence status for a given record.
4. **English and Arabic parity.** Every path must ship in both languages with equivalent facts, evidence, and actions.
5. **General is never hidden.** General must remain accessible as a public route and as the default skip behavior.
6. **Watch is not video-only.** Watch uses directed media broadly, not only video.
7. **Hire is not a résumé page.** Hire is a distinct visual world backed by shared facts.

---

## Files Consulted

- `docs/011 TDD.md` — §2.4, §7, §11, §13, §14, §26.
- `docs/05 Decision Register.md` — D-004, D-006, D-021, D-024, D-026, D-040, D-041, D-042.
- `docs/02 Content and Case Studies.md` — content model, evidence gaps.
- `docs/01 Product Strategy.md` — audiences, success criteria.
