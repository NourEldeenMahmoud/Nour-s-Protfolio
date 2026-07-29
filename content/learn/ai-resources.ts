import type { LearnNode, LearnSection } from "./types";

function sourceSection(source: string): LearnSection {
  return {
    heading: { en: "Source", ar: "المصدر" },
    content: { en: source, ar: source },
    kind: "code",
  };
}

export const AI_SKILLS_FOLDER_ID = "ai-skills-folder" as const;
export const AI_AGENTS_FOLDER_ID = "ai-agents-folder" as const;
export const AI_WORKFLOWS_FOLDER_ID = "ai-workflows-folder" as const;

type SkillDef = readonly [
  string,
  string,
  string,
  string,
  string,
  readonly string[],
];

const skillDefs: SkillDef[] = [
  // ── Engineering Quality ──────────────────
  [
    "clean-code-guard",
    "Clean Code Guard",
    "Review production code for Clean Code, SOLID, DRY, KISS, YAGNI, and common LLM failure modes before it ships.",
    "مراجعة نظافة الكود",
    "مراجعة كود الإنتاج وفق مبادئ Clean Code وSOLID وDRY وKISS وYAGNI وأنماط فشل LLM الشائعة قبل التسليم.",
    ["clean-code", "code-review", "quality"],
  ] as const,
  [
    "test-guard",
    "Test Guard",
    "Review generated or changed test code against universal testing rules before it ships.",
    "مراجعة الاختبارات",
    "مراجعة كود الاختبارات المُنشأة أو المعدلة وفق قواعد الاختبار العالمية قبل التسليم.",
    ["testing", "code-review", "quality"],
  ] as const,
  [
    "docs-guard",
    "Docs Guard",
    "Review generated or changed documentation for accuracy, drift from source, and unverifiable claims before publishing.",
    "مراجعة التوثيق",
    "مراجعة التوثيق المُنشأ أو المعدل للتأكد من الدقة وعدم الانحراف عن المصدر وخلوه من الادعاءات غير القابلة للتحقق قبل النشر.",
    ["documentation", "code-review", "quality"],
  ] as const,
  [
    "security-review",
    "Security Review",
    "Review authentication, user input, secrets, API endpoints, and payment-sensitive features against security best practices.",
    "المراجعة الأمنية",
    "مراجعة المصادقة ومدخلات المستخدم والأسرار ونقاط نهاية API والميزات الحساسة للمدفوعات وفق أفضل ممارسات الأمان.",
    ["security", "code-review", "audit"],
  ] as const,

  // ── Planning & Delivery ──────────────────
  [
    "planner",
    "Planner",
    "High-fidelity universal planning orchestrator that transmutes complex requests into structured, skill-aware roadmaps.",
    "المخطط",
    "منسق تخطيط عالي الدقة يحول الطلبات المعقدة إلى خرائط طريق منظمة ومراعية للمهارات.",
    ["planning", "orchestration", "roadmap"],
  ] as const,
  [
    "grill-me",
    "Grill Me",
    "Interview the user relentlessly about a plan or design until resolving every branch of the decision tree.",
    "اختبار القرارات",
    "استجواب المستخدم باستمرار حول خطة أو تصميم حتى الوصول إلى فهم مشترك لكل فرع من شجرة القرار.",
    ["planning", "design", "decision"],
  ] as const,
  [
    "codex-delegate",
    "Codex Delegate",
    "Delegate a coding task to the OpenAI Codex CLI as a background implementer, then review its diff and land it yourself.",
    "تفويض Codex",
    "تفويض مهمة برمجية إلى OpenAI Codex CLI كمنفذ خلفي، ثم مراجعة الفرق ودمجه بنفسك.",
    ["delegation", "codex", "code-generation"],
  ] as const,
  [
    "skill-creator",
    "Skill Creator",
    "Create new skills, modify existing skills, run evals to test performance, and optimize skill descriptions for triggering accuracy.",
    "منشئ المهارات",
    "إنشاء مهارات جديدة وتعديل المهارات الحالية وتشغيل التقييمات لاختبار الأداء وتحسين أوصاف المهارات لدقة التشغيل.",
    ["skills", "evaluation", "optimization"],
  ] as const,

  // ── Obsidian & Knowledge ────────────────
  [
    "obsidian-vault",
    "Obsidian Vault",
    "Search, create, and manage notes in the Obsidian vault with wikilinks and index notes.",
    "خزانة Obsidian",
    "البحث وإنشاء وإدارة الملاحظات في خزانة Obsidian باستخدام روابط wikilink وملاحظات فهرسة.",
    ["obsidian", "notes", "vault"],
  ] as const,
  [
    "obsidian-cli",
    "Obsidian CLI",
    "Interact with Obsidian vaults from the command line to read, create, search, and manage notes, tasks, and properties.",
    "واجهة Obsidian CLI",
    "التفاعل مع خزائن Obsidian من سطر الأوامر لقراءة وإنشاء والبحث وإدارة الملاحظات والمهام والخصائص.",
    ["obsidian", "cli", "automation"],
  ] as const,
  [
    "obsidian-bases",
    "Obsidian Bases",
    "Create and edit Obsidian Bases with views, filters, formulas, and summaries for database-like note management.",
    "قواعد Obsidian",
    "إنشاء وتحرير قواعد Obsidian مع عروض ومرشحات وصيغ وملخصات لإدارة ملاحظات شبيهة بقواعد البيانات.",
    ["obsidian", "bases", "database"],
  ] as const,
  [
    "obsidian-canvas-creator",
    "Obsidian Canvas Creator",
    "Create Obsidian Canvas files from text content, supporting both MindMap and freeform layouts.",
    "منشئ Canvas",
    "إنشاء ملفات Canvas لـ Obsidian من محتوى نصي، مع دعم تخطيطات MindMap والحرة.",
    ["obsidian", "canvas", "visualization"],
  ] as const,
  [
    "obsidian-markdown",
    "Obsidian Markdown",
    "Rules and conventions for writing Obsidian-flavored Markdown with frontmatter, wikilinks, and callouts.",
    "Markdown في Obsidian",
    "قواعد وأعراف كتابة Markdown بنكهة Obsidian مع البيانات الوصفية وروابط wikilink والملاحظات المنبثقة.",
    ["obsidian", "markdown", "formatting"],
  ] as const,
  [
    "json-canvas",
    "JSON Canvas",
    "Create and edit JSON Canvas files with nodes, edges, groups, and connections for visual knowledge organization.",
    "JSON Canvas",
    "إنشاء وتحرير ملفات JSON Canvas بعقد وحواف ومجموعات ووصلات لتنظيم المعرفة بصرياً.",
    ["canvas", "json", "visualization"],
  ] as const,
  [
    "excalidraw-diagram",
    "Excalidraw Diagram",
    "Generate Excalidraw diagrams from text content with support for Obsidian, standard, and animated output modes.",
    "رسوم Excalidraw",
    "إنشاء رسوم Excalidraw من محتوى نصي مع دعم أوضاع الإخراج لـ Obsidian والقياسية والمتحركة.",
    ["diagram", "excalidraw", "visualization"],
  ] as const,
  [
    "mermaid-visualizer",
    "Mermaid Visualizer",
    "Transform text content into professional Mermaid diagrams for presentations and documentation with syntax error prevention.",
    "رسوم Mermaid",
    "تحويل المحتوى النصي إلى رسوم Mermaid احترافية للعروض والتوثيق مع منع أخطاء الصياغة.",
    ["diagram", "mermaid", "visualization"],
  ] as const,
  [
    "image-content-extraction-rules",
    "Image Content Extraction",
    "Extract text and figure content from images into structured markdown with verbatim text and figure descriptions.",
    "استخراج محتوى الصور",
    "استخراج النصوص والمحتويات البيانية من الصور إلى تنسيق markdown منظم مع نصوص حرفية ووصف للأشكال.",
    ["extraction", "images", "ocr"],
  ] as const,

  // ── Content & Summarization ──────────────
  [
    "course-summary-rules",
    "Course Summary Rules",
    "Rules for creating complete Egyptian Arabic course summaries from written Teachable course content with anti-hallucination enforcement.",
    "قواعد ملخصات الدورات",
    "قواعد إنشاء ملخصات كاملة للدورات بالعامية المصرية من محتوى Teachable المكتوب مع منع التخمين.",
    ["summarization", "courses", "arabic"],
  ] as const,
  [
    "defuddle",
    "Defuddle",
    "Extract clean markdown content from web pages, removing clutter and navigation to save tokens.",
    "استخراج المحتوى",
    "استخراج محتوى markdown نظيف من صفحات الويب مع إزالة الفوضى والتنقل لتوفير الرموز.",
    ["extraction", "web", "markdown"],
  ] as const,
  [
    "humanizer-ar-egt",
    "Humanizer AR-EG",
    "Remove AI-generated writing patterns from Egyptian Arabic text to make it sound authentically human-written.",
    "الكتابة الطبيعية",
    "إزالة أنماط الكتابة المولّدة بالذكاء الاصطناعي من النصوص بالعامية المصرية لجعلها تبدو بشرية أصيلة.",
    ["arabic", "writing", "humanizer"],
  ] as const,
  // ── Frontend & Design ────────────────────
  [
    "frontend-design",
    "Frontend Design",
    "Create distinctive, production-grade frontend interfaces with high design quality that avoids generic AI aesthetics.",
    "تصميم الواجهات",
    "إنشاء واجهات أمامية إنتاجية مميزة بجودة تصميم عالية تتجنب الجماليات العامة للذكاء الاصطناعي.",
    ["frontend", "design", "ui"],
  ] as const,

  // ── GSAP Animation ──────────────────────
  [
    "gsap-core",
    "GSAP Core",
    "Core GSAP API: gsap.to(), from(), fromTo(), easing, duration, stagger, defaults, and gsap.matchMedia() for responsive animation.",
    "GSAP الأساسية",
    "واجهة GSAP الأساسية: gsap.to() وfrom() وfromTo() والتسهيل والمدة والتدريج والإعدادات الافتراضية وgsap.matchMedia() للرسوم المتحركة المتجاوبة.",
    ["gsap", "animation", "core"],
  ] as const,
  [
    "gsap-frameworks",
    "GSAP Frameworks",
    "GSAP integration for Vue, Svelte, and other non-React frameworks with lifecycle management and cleanup on unmount.",
    "GSAP للأطر الأخرى",
    "دمج GSAP مع Vue وSvelte والأطر غير React مع إدارة دورة الحياة والتنظيف عند إزالة المكون.",
    ["gsap", "vue", "svelte", "animation"],
  ] as const,
  [
    "gsap-performance",
    "GSAP Performance",
    "Optimize GSAP animations by preferring transforms, avoiding layout thrashing, using will-change, and batching updates.",
    "أداء GSAP",
    "تحسين أداء رسوم GSAP بتفضيل التحويلات وتجنب إعادة التخطيط واستخدام will-change وتجميع التحديثات.",
    ["gsap", "performance", "optimization"],
  ] as const,
  [
    "gsap-plugins",
    "GSAP Plugins",
    "GSAP plugin registration and usage: ScrollToPlugin, ScrollSmoother, Flip, Draggable, Inertia, Observer, SplitText, and more.",
    "إضافات GSAP",
    "تسجيل واستخدام إضافات GSAP: ScrollToPlugin وScrollSmoother وFlip وDraggable وInertia وObserver وSplitText والمزيد.",
    ["gsap", "plugins", "scroll"],
  ] as const,
  [
    "gsap-react",
    "GSAP React",
    "GSAP integration for React and Next.js using the useGSAP hook, refs, gsap.context(), and cleanup on unmount.",
    "GSAP مع React",
    "دمج GSAP مع React وNext.js باستخدام useGSAP والمراجع وgsap.context() والتنظيف عند إزالة المكون.",
    ["gsap", "react", "nextjs", "animation"],
  ] as const,
  [
    "gsap-scrolltrigger",
    "GSAP ScrollTrigger",
    "Scroll-linked animations with pinning, scrub, triggers, and responsive breakpoints using ScrollTrigger.",
    "GSAP ScrollTrigger",
    "رسوم مرتبطة بالتمرير مع التثبيت والربط والمحفزات ونقاط التوقف المتجاوبة باستخدام ScrollTrigger.",
    ["gsap", "scroll", "trigger", "animation"],
  ] as const,
  [
    "gsap-timeline",
    "GSAP Timeline",
    "Animation sequencing with gsap.timeline(), position parameter, nesting, playback control, and choreography.",
    "تسلسل GSAP",
    "تسلسل الرسوم باستخدام gsap.timeline() ومعامل الموضع والتداخل والتحكم في التشغيل وتنسيق الحركات.",
    ["gsap", "timeline", "sequencing"],
  ] as const,
  [
    "gsap-utils",
    "GSAP Utils",
    "Utility functions in gsap.utils: clamp, mapRange, normalize, interpolate, random, snap, toArray, wrap, and pipe.",
    "أدوات GSAP",
    "الدوال المساعدة في gsap.utils: clamp وmapRange وnormalize وinterpolate وrandom وsnap وtoArray وwrap وpipe.",
    ["gsap", "utilities", "helpers"],
  ] as const,

  // ── Unity Architecture ───────────────────
  [
    "unity-abstract-factory",
    "Unity Abstract Factory",
    "Factory pattern for creating families of related objects, supporting both ScriptableObject composition and simple prefab instantiation.",
    "Abstract Factory",
    "نمط المصنع لإنشاء مجموعات من الكائنات ذات الصلة، مع دعم تركيب ScriptableObject والاستنساخ البسيط.",
    ["unity", "pattern", "factory", "architecture"],
  ] as const,
  [
    "unity-assembly-management",
    "Unity Assembly Management",
    "Manage project boundaries using Assembly Definitions for faster compile times and modular architecture.",
    "إدارة التجميعات",
    "إدارة حدود المشروع باستخدام Assembly Definitions لتسريع زمن الترجمة وتحقيق بنية معيارية.",
    ["unity", "assembly", "compilation", "architecture"],
  ] as const,
  [
    "unity-builder-pattern",
    "Unity Builder Pattern",
    "Step-by-step object construction using fluent interfaces that simplify complex GameObject setup.",
    "نمط البناء",
    "بناء الكائنات خطوة بخطوة باستخدام واجهات متدفقة تبسط إعداد GameObjects المعقدة.",
    ["unity", "pattern", "builder", "architecture"],
  ] as const,
  [
    "unity-code-reviewer",
    "Unity Code Reviewer",
    "Professional Unity C# code reviewer that detects anti-patterns, performance leaks, and enforces project-specific architecture.",
    "مراجعة كود Unity",
    "مراجع كود Unity C# محترف يكتشف الأنماط المعاكسة وتسريبات الأداء ويفرض بنية المشروع.",
    ["unity", "code-review", "csharp", "quality"],
  ] as const,
  [
    "unity-command-pattern",
    "Unity Command Pattern",
    "Encapsulate actions as objects for queuing, undo/redo support, and asynchronous execution.",
    "نمط الأوامر",
    "تغليف الإجراءات ككائنات للطابور ودعم التراجع/الإعادة والتنفيذ غير المتزامن.",
    ["unity", "pattern", "command", "undo"],
  ] as const,
  [
    "unity-composition-pattern",
    "Unity Composition Pattern",
    "Implement composition over inheritance using ScriptableObject configs and C# Tuples, replacing deep class hierarchies.",
    "نمط التركيب",
    "تطبيق التركيب بدلاً من الوراثة باستخدام إعدادات ScriptableObject وTuples في C#، واستبدال التسلسلات الهرمية العميقة.",
    ["unity", "pattern", "composition", "architecture"],
  ] as const,
  [
    "unity-data-persistence",
    "Unity Data Persistence",
    "Robust save/load system with data binding, serializable DTOs, and swappable backends using per-entity GUID identity.",
    "حفظ البيانات",
    "نظام حفظ/تحميل قوي مع ربط البيانات وDTOs قابلة للتسلسل وواجهات خلفية قابلة للتبديل باستخدام GUID لكل كيان.",
    ["unity", "persistence", "save", "data"],
  ] as const,
  [
    "unity-decorator-pattern",
    "Unity Decorator Pattern",
    "Dynamically modify object behavior by wrapping, perfect for buffs, debuffs, and stat calculations.",
    "نمط الزخرفة",
    "تعديل سلوك الكائنات ديناميكياً عبر التغليف، مثالي للتعزيزات والإضعافات وحسابات الإحصائيات.",
    ["unity", "pattern", "decorator", "gameplay"],
  ] as const,
  [
    "unity-dependency-injection",
    "Unity Dependency Injection",
    "Implement dependency inversion and injection patterns to decouple high-level logic from concrete implementations.",
    "حقن التبعيات",
    "تطبيق أنماط عكس التبعية وحقنها لفصل المنطق عالي المستوى عن التطبيقات الملموسة.",
    ["unity", "pattern", "dependency-injection", "architecture"],
  ] as const,
  [
    "unity-ecs-patterns",
    "Unity ECS Patterns",
    "Master Unity ECS with DOTS, Jobs, and Burst for high-performance data-oriented game development.",
    "أنماط ECS",
    "إتقان نظام ECS في Unity مع DOTS وJobs وBurst لتطوير ألعاب عالية الأداء موجهة بالبيانات.",
    ["unity", "ecs", "dots", "performance"],
  ] as const,
  [
    "unity-event-bus",
    "Unity Event Bus",
    "Advanced code-driven event bus with reflection-based bootstrapping that provides zero-setup global messaging.",
    "ناقل الأحداث",
    "ناقل أحداث متقدم يعمل بالكود مع تحميل تلقائي قائم على التأمل (Reflection) يوفر رسائل عالمية بدون إعداد.",
    ["unity", "events", "messaging", "architecture"],
  ] as const,
  [
    "unity-fsm",
    "Unity FSM",
    "Robust finite state machine using State and Strategy patterns for complex AI, player controllers, and state management.",
    "آلة الحالات",
    "آلة حالات محدودة قوية باستخدام State وStrategy للذكاء الاصطناعي المعقد وأدوات التحكم وإدارة الحالات.",
    ["unity", "fsm", "state-machine", "ai"],
  ] as const,
  [
    "unity-interaction",
    "Unity Interaction",
    "Generic raycast-based interaction system that works across RPG, platformer, and simulation genres.",
    "التفاعل في Unity",
    "نظام تفاعل قائم على الأشعة يعمل عبر أنواع ألعاب RPG والمنصات والمحاكاة.",
    ["unity", "interaction", "raycast", "gameplay"],
  ] as const,
  [
    "unity-memento-pattern",
    "Unity Memento Pattern",
    "Capture and restore object states for loadout managers, checkpoints, and undo/redo systems.",
    "نمط التذكار",
    "التقاط واستعادة حالات الكائنات لمديري التجهيزات ونقاط التفتيش وأنظمة التراجع/الإعادة.",
    ["unity", "pattern", "memento", "state"],
  ] as const,
  [
    "unity-mvc-pattern",
    "Unity MVC Pattern",
    "Model-View-Controller and Model-View-Presenter implementations for scalable UI and game system separation of concerns.",
    "نمط MVC",
    "تطبيقات MVC وMVP لواجهات مستخدم قابلة للتوسع وفصل اهتمامات أنظمة اللعبة.",
    ["unity", "mvc", "mvp", "architecture"],
  ] as const,
  [
    "unity-observer-pattern",
    "Unity Observer Pattern",
    "Reactive property system that decouples data from UI and logic using observable wrappers and UnityEvents.",
    "نمط المراقب",
    "نظام خصائص تفاعلي يفصل البيانات عن واجهة المستخدم والمنطق باستخدام مغلفات قابلة للمراقبة وUnityEvents.",
    ["unity", "observer", "reactive", "events"],
  ] as const,
  [
    "unity-singleton-pattern",
    "Unity Singleton Pattern",
    "Global manager access with strict lifecycle control, supporting standard, persistent, and regulator variations.",
    "نمط المفرد",
    "وصول عام للمديرين مع تحكم صارم في دورة الحياة، مع دعم الأنماط القياسية والدائمة والمنظمة.",
    ["unity", "pattern", "singleton", "architecture"],
  ] as const,
  [
    "unity-so-prefab-manager",
    "Unity SO Prefab Manager",
    "Manage ScriptableObject-to-Prefab relationships ensuring instance independence while maintaining a clean data-driven architecture.",
    "إدارة SO-Prefab",
    "إدارة العلاقات بين ScriptableObject وPrefab مع ضمان استقلالية كل مثيل والحفاظ على بنية نظيفة مدفوعة بالبيانات.",
    ["unity", "scriptableobject", "prefab", "architecture"],
  ] as const,
  [
    "unity-strategy-pattern",
    "Unity Strategy Pattern",
    "Encapsulate interchangeable algorithms using ScriptableObjects for hot-swapping behavior without modifying client code.",
    "نمط الاستراتيجية",
    "تغليف الخوارزميات القابلة للتبديل باستخدام ScriptableObjects لتبديل السلوك دون تعديل كود العميل.",
    ["unity", "pattern", "strategy", "architecture"],
  ] as const,
  [
    "unity-ui-data-binding",
    "Unity UI Data Binding",
    "MVVM-style data binding for Unity UI Toolkit using CreateProperty attribute and BindableProperty wrappers.",
    "ربط بيانات الواجهة",
    "ربط بيانات بنمط MVVM لواجهات Unity Toolkit باستخدام CreateProperty وBindableProperty.",
    ["unity", "ui", "data-binding", "mvvm"],
  ] as const,
  [
    "unity-ui-procedural",
    "Unity UI Procedural",
    "Advanced UI construction using C# code instead of UI Builder, with fluent extension methods and reusable manipulators.",
    "الواجهات الإجرائية",
    "بناء واجهات متقدمة باستخدام كود C# بدلاً من منشئ الواجهات، مع دوال تمديد متدفقة وأدوات تحكم قابلة لإعادة الاستخدام.",
    ["unity", "ui", "procedural", "code"],
  ] as const,
  [
    "unity-visitor-pattern",
    "Unity Visitor Pattern",
    "Decoupled operations on object structures for power-up systems and complex stat modifications without modifying existing classes.",
    "نمط الزائر",
    "عمليات منفصلة على هياكل الكائنات لأنظمة التعزيزات وتعديلات الإحصائيات المعقدة دون تعديل الفئات الموجودة.",
    ["unity", "pattern", "visitor", "architecture"],
  ] as const,
];

type AgentDef = readonly [string, string, string, string, string, string];

const agentDefs: AgentDef[] = [
  [
    "resource-agent-project-explorer",
    "Project Explorer",
    "Focused read-only discovery agent that inspects relevant files and reports reusable patterns, constraints, conflicts, and validation commands.",
    "مستكشف المشروع",
    "وكيل استكشاف للقراءة فقط يفحص الملفات ذات الصلة ويبلغ عن الأنماط القابلة لإعادة الاستخدام والقيود والتعارضات وأوامر التحقق.",
    "project-explorer.md",
  ] as const,
  [
    "resource-agent-manager",
    "Manager",
    "Scope, UX, design, planning, review, and acceptance criteria owner who delegates discovery and produces implementation plans.",
    "المدير",
    "مالك النطاق وتجربة المستخدم والتصميم والتخطيط والمراجعة ومعايير القبول الذي يفوض الاستكشاف وينتج خطط التنفيذ.",
    "manager.md",
  ] as const,
  [
    "resource-agent-course-worker",
    "Course Summary Worker",
    "Creates structured course summaries from written Teachable content using defined rules and anti-hallucination enforcement.",
    "عامل تلخيص الدورات",
    "ينشئ ملخصات دورات منظمة من محتوى Teachable المكتوب باستخدام قواعد محددة مع منع التخمين.",
    "course-summary-worker.md",
  ] as const,
  [
    "resource-agent-course-reviewer",
    "Course Summary Reviewer",
    "Reviews AI-assisted summaries for accuracy, completeness, factual correctness, and honest limitation reporting against source material.",
    "مراجع ملخصات الدورات",
    "يراجع الملخصات المدعومة بالذكاء الاصطناعي من حيث الدقة والاكتمال والصحة الواقعية والإبلاغ الصادق عن القيود مقارنة بالمصادر.",
    "course-summary-reviewer.md",
  ] as const,
  [
    "resource-agent-course-orchestrator",
    "Course Summary Orchestrator",
    "Orchestrates the multi-agent summary pipeline: assigns units, dispatches workers, triggers reviews, and manages fix cycles.",
    "منسق ملخصات الدورات",
    "ينسق خط إنتاج الملخصات متعدد الوكلاء: يوزع الوحدات ويُشغل العمال ويُطلق المراجعات ويدير دورات التصحيح.",
    "course-summary-orchestrator.md",
  ] as const,
  [
    "resource-agent-course-fixer",
    "Course Summary Fixer",
    "Applies targeted corrections to summaries based on reviewer flags, addressing only required changes without scope creep.",
    "مصحح ملخصات الدورات",
    "يطبق التصحيحات المستهدفة على الملخصات بناءً على إشارات المراجع، ويعالج فقط التغييرات المطلوبة دون توسع النطاق.",
    "course-summary-fixer.md",
  ] as const,
  [
    "resource-agent-code-writer",
    "Project Code Writer",
    "Implements scoped tasks delegated by the manager: follows the approved plan, makes minimal changes, runs focused validation, and reports results.",
    "كاتب الكود",
    "ينفذ المهام المحددة التي يفوضها المدير: يتبع الخطة المعتمدة ويُجري تغييرات بسيطة ويشغل التحقق المركز ويبلغ النتائج.",
    "code-writer.md",
  ] as const,
];

type WorkflowDef = readonly [string, string, string, string, string, string];

const workflowDefs: WorkflowDef[] = [
  [
    "resource-wf-software-delivery",
    "Software Delivery Orchestration",
    "Human-reviewed orchestration definition that structures feature delivery through manager scoping, explorer discovery, writer implementation, and guard review.",
    "تنسيق تسليم البرمجيات",
    "تعريف تنسيق مُراجع بشرياً يهيكل تسليم الميزات عبر تحديد نطاق المدير واستكشاف المستكشف وتنفيذ الكاتب ومراجعة الحماية.",
    "manager.md — Software Delivery Orchestration",
  ] as const,
  [
    "resource-wf-course-pipeline",
    "Course Summary Pipeline",
    "End-to-end multi-agent pipeline for converting course material into reviewed, published summaries using orchestrator, worker, reviewer, and fixer agents.",
    "خط إنتاج ملخصات الدورات",
    "خط إنتاج متعدد الوكلاء من البداية للنهاية لتحويل مواد الدورات إلى ملخصات مراجعة ومنشورة باستخدام المنسق والعامل والمراجع والمصحح.",
    "course-summary-orchestrator.md",
  ] as const,
  [
    "resource-wf-planning",
    "High-Fidelity Planning",
    "Structured planning orchestration that transmutes complex requests into phased roadmaps with dependency-aware sequencing, test procedures, and coverage enforcement.",
    "التخطيط عالي الدقة",
    "تنسيق تخطيط منظم يحول الطلبات المعقدة إلى خرائط طريق مرحلية مع تسلسل مراعٍ للتبعيات وإجراءات اختبار وضمان التغطية.",
    "planner/SKILL.md — High-Fidelity Planning",
  ] as const,
  [
    "resource-wf-codex-delegation",
    "Codex Delegation Loop",
    "Delegation workflow that dispatches bounded implementation tasks to Codex CLI, then reviews the resulting diff and lands approved changes.",
    "حلقة تفويض Codex",
    "سير عمل التفويض الذي يرسل مهام تنفيذية محدودة إلى Codex CLI ثم يراجع الفرق الناتج ويدمج التغييرات المعتمدة.",
    "codex-delegate/SKILL.md — Codex Delegation Loop",
  ] as const,
  [
    "resource-wf-skill-eval",
    "Skill Evaluation Loop",
    "Measurement workflow for creating, modifying, and benchmarking skill performance with variance analysis and description optimization.",
    "حلقة تقييم المهارات",
    "سير عمل قياسي لإنشاء وتعديل واختبار أداء المهارات مع تحليل التباين وتحسين الأوصاف.",
    "skill-creator/SKILL.md — Skill Evaluation Loop",
  ] as const,
];

function buildSkill(definition: SkillDef): LearnNode {
  const [slug, enName, enSummary, arName, arSummary, tags] = definition;
  return {
    id: `resource-${slug}`,
    name: { en: enName, ar: arName },
    type: "file",
    kind: "skill",
    summary: { en: enSummary, ar: arSummary },
    sections: [
      {
        heading: { en: "Purpose", ar: "الغرض" },
        content: { en: enSummary, ar: arSummary },
      },
      sourceSection("SKILL.md"),
    ],
    tags: [...tags],
    relatedFileIds: [],
    relatedProjectSlugs: [],
    presentation: "resource",
    downloadName: `${slug}.zip`,
    downloadUrl: `/learn/downloads/ai/skills/${slug}.zip`,
    public: true,
    parentId: AI_SKILLS_FOLDER_ID,
    children: [],
  };
}

function buildAgent(definition: AgentDef): LearnNode {
  const [id, enName, enSummary, arName, arSummary, sourceFile] = definition;
  return {
    id,
    name: { en: enName, ar: arName },
    type: "file",
    kind: "workflow",
    summary: { en: enSummary, ar: arSummary },
    sections: [
      {
        heading: { en: "Role", ar: "الدور" },
        content: { en: enSummary, ar: arSummary },
      },
      sourceSection(sourceFile),
    ],
    tags: ["ai", "agent", ...enName.toLowerCase().split(/\s+/)],
    relatedFileIds: [],
    relatedProjectSlugs: [],
    presentation: "resource",
    downloadName: sourceFile,
    downloadUrl: `/learn/downloads/ai/agents/${sourceFile}`,
    public: true,
    parentId: AI_AGENTS_FOLDER_ID,
    children: [],
  };
}

function buildWorkflow(definition: WorkflowDef): LearnNode {
  const [id, enName, enSummary, arName, arSummary, sourceDesc] = definition;
  return {
    id,
    name: { en: enName, ar: arName },
    type: "file",
    kind: "workflow",
    summary: { en: enSummary, ar: arSummary },
    sections: [
      {
        heading: { en: "Purpose", ar: "الغرض" },
        content: { en: enSummary, ar: arSummary },
      },
      {
        heading: { en: "Source definition", ar: "تعريف المصدر" },
        content: { en: sourceDesc, ar: sourceDesc },
        kind: "code",
      },
    ],
    tags: ["ai", "workflow", ...enName.toLowerCase().split(/\s+/)],
    relatedFileIds: [],
    relatedProjectSlugs: [],
    presentation: "resource",
    downloadName: `${id}.md`,
    downloadUrl: `/learn/downloads/ai/workflows/${id}.md`,
    public: true,
    parentId: AI_WORKFLOWS_FOLDER_ID,
    children: [],
  };
}

const skillFolder: LearnNode = {
  id: AI_SKILLS_FOLDER_ID,
  name: { en: "AI Skills", ar: "مهارات الذكاء الاصطناعي" },
  type: "folder",
  kind: "folder",
  summary: {
    en: "Configured reusable skills that give coding agents focused methods, quality rules, and domain-specific patterns.",
    ar: "مهارات قابلة لإعادة الاستخدام مهيأة تمنح وكلاء البرمجة أساليب مركزة وقواعد جودة وأنماط خاصة بالمجال.",
  },
  tags: ["ai", "skills", "library"],
  relatedFileIds: [],
  relatedProjectSlugs: [],
  public: true,
  parentId: "workflows",
  children: skillDefs.map((df) => `resource-${df[0]}`),
};

const agentFolder: LearnNode = {
  id: AI_AGENTS_FOLDER_ID,
  name: { en: "AI Agents", ar: "وكلاء الذكاء الاصطناعي" },
  type: "folder",
  kind: "folder",
  summary: {
    en: "Specialized agent definitions that divide discovery, implementation, and content quality into reviewable roles.",
    ar: "تعريفات وكلاء متخصصين يقسمون الاستكشاف والتنفيذ وجودة المحتوى إلى أدوار قابلة للمراجعة.",
  },
  tags: ["ai", "agents", "team"],
  relatedFileIds: [],
  relatedProjectSlugs: [],
  public: true,
  parentId: "workflows",
  children: agentDefs.map((df) => df[0]),
};

const workflowFolder: LearnNode = {
  id: AI_WORKFLOWS_FOLDER_ID,
  name: { en: "AI Workflows", ar: "سير عمل الذكاء الاصطناعي" },
  type: "folder",
  kind: "folder",
  summary: {
    en: "Source-backed orchestration definitions that govern multi-agent processes and human-reviewed delivery pipelines.",
    ar: "تعريفات تنسيق مدعومة بالمصادر تحكم العمليات متعددة الوكلاء وخطوط التسليم المُدارة بمراجعة بشرية.",
  },
  tags: ["ai", "workflows", "orchestration"],
  relatedFileIds: [],
  relatedProjectSlugs: [],
  public: true,
  parentId: "workflows",
  children: workflowDefs.map((df) => df[0]),
};

export const aiResourceNodes: LearnNode[] = [
  skillFolder,
  agentFolder,
  workflowFolder,
  ...skillDefs.map(buildSkill),
  ...agentDefs.map(buildAgent),
  ...workflowDefs.map(buildWorkflow),
];
