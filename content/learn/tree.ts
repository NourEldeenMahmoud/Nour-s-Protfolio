import type { LearnNode } from "./types";
import { certificateGallery } from "./certificates";
import {
  AI_AGENTS_FOLDER_ID,
  AI_SKILLS_FOLDER_ID,
  AI_WORKFLOWS_FOLDER_ID,
  aiResourceNodes,
} from "./ai-resources";

export const learnNodes: LearnNode[] = [
  {
    id: "this-pc",
    name: { en: "This PC", ar: "هذا الكمبيوتر" },
    type: "folder",
    kind: "folder",
    summary: {
      en: "A shortcut to Nour's knowledge desktop.",
      ar: "اختصار لسطح مكتب معرفة نور.",
    },
    tags: [],
    relatedFileIds: [],
    relatedProjectSlugs: [],
    public: true,
    parentId: null,
    children: [
      "apps",
      "workflows",
      "knowledge",
      "certifications",
      "about",
      "skills",
      "obsidian-vault",
    ],
  },
  {
    id: "start-here",
    name: { en: "00 Start Here", ar: "00 ابدأ هنا" },
    type: "folder",
    kind: "folder",
    summary: {
      en: "A brief orientation for first-time visitors.",
      ar: "ملخص للزوار الجدد.",
    },
    tags: ["orientation", "overview"],
    relatedFileIds: ["about", "knowledge-dotnet"],
    relatedProjectSlugs: [],
    public: false,
    parentId: "about",
    children: ["start-here-welcome"],
  },
  {
    id: "start-here-welcome",
    name: { en: "Welcome.md", ar: "مرحبا.md" },
    type: "file",
    kind: "document",
    summary: {
      en: "How this knowledge desktop is organized and what you can find here.",
      ar: "كيف منظّم سطح المكتب المعرفي هذا وماذا يمكنك العثور عليه هنا.",
    },
    sections: [
      {
        heading: { en: "Purpose", ar: "الغرض" },
        content: {
          en: "This desktop organizes publicly shareable knowledge collections, AI-assisted workflow documentation, skill evidence, and engineering reflections into a navigable file system.",
          ar: "يرتّب سطح المكتب هذا المجموعات المعرفية القابلة للنشر العام وتوثيق سير العمل بمساعدة الذكاء الاصطناعي وأدلة المهارات والتأملات الهندسية في نظام ملفات قابل للتنقل.",
        },
      },
      {
        heading: { en: "What is included", ar: "ما هو متضمن" },
        content: {
          en: "Verified knowledge collections tied to real project repositories. Honest workflow descriptions that credit human judgment. Skill files grounded in project evidence.",
          ar: "مجموعات معرفية مؤكدة مرتبطة بمستودعات مشاريع حقيقية. أوصاف سير عمل صادقة تعطي الفضل للحكم البشري. ملفات مهارات مدعومة بأدلة المشاريع.",
        },
        kind: "list",
        items: [
          {
            en: "Knowledge Library — verified technical collections",
            ar: "المكتبة المعرفية — مجموعات تقنية مؤكدة",
          },
          {
            en: "About Nour — engineering identity and journey",
            ar: "عن نور — الهوية والرحلة الهندسية",
          },
          {
            en: "AI-Assisted Workflows — human-reviewed processes",
            ar: "سير العمل بمساعدة الذكاء الاصطناعي — عمليات مراجعة بشرية",
          },
          {
            en: "Skills & Evidence — project-backed capabilities",
            ar: "المهارات والأدلة — قدرات مدعومة بالمشاريع",
          },
          {
            en: "Learning Lab — experiments and reflections",
            ar: "مختبر التعلم — تجارب وتأملات",
          },
        ],
      },
      {
        heading: { en: "How to navigate", ar: "كيفية التنقل" },
        content: {
          en: "Double-click or press Enter on any folder to open it in the File Explorer. Click any document to open it in the read-only viewer. Use the taskbar for quick access to folders, search, and language switching.",
          ar: "انقر مرتين أو اضغط Enter على أي مجلد لفتحه في مستكشف الملفات. انقر على أي مستند لفتحه في العارض للقراءة فقط. استخدم شريط المهام للوصول السريع إلى المجلدات والبحث وتبديل اللغة.",
        },
        kind: "steps",
      },
    ],
    tags: ["orientation", "start"],
    relatedFileIds: ["about"],
    relatedProjectSlugs: [],
    public: false,
    parentId: "start-here",
    children: [],
  },
  {
    id: "knowledge",
    name: { en: "03 Summaries", ar: "03 الملخصات" },
    type: "folder",
    kind: "folder",
    summary: {
      en: "Technical and university summaries organized by domain.",
      ar: "ملخصات تقنية وجامعية منظمة حسب المجال.",
    },
    tags: ["knowledge", "library"],
    relatedFileIds: [],
    relatedProjectSlugs: [],
    public: true,
    parentId: "this-pc",
    children: ["knowledge-dotnet", "knowledge-web", "knowledge-university"],
  },
  {
    id: "knowledge-dotnet",
    name: { en: ".NET", ar: ".NET" },
    type: "folder",
    kind: "folder",
    summary: {
      en: ".NET backend knowledge: EF Core, REST APIs, and secured APIs.",
      ar: "معرفة باك إند .NET: EF Core وREST APIs وSecured APIs.",
    },
    tags: [".net", "backend", "ef core", "rest", "api"],
    relatedFileIds: ["skill-dotnet-backend"],
    relatedProjectSlugs: ["bookify", "cinemaverse"],
    public: true,
    parentId: "knowledge",
    children: ["knowledge-efcore", "knowledge-rest", "knowledge-secured"],
  },
  {
    id: "knowledge-efcore",
    name: { en: "EF Core", ar: "EF Core" },
    type: "file",
    kind: "collection",
    summary: {
      en: "Entity Framework Core patterns, data modeling, and migration practices used across .NET projects.",
      ar: "أنماط Entity Framework Core ونمذجة البيانات وممارسات الترحيل المستخدمة عبر مشاريع .NET.",
    },
    sections: [
      {
        heading: { en: "Collection overview", ar: "نظرة عامة على المجموعة" },
        content: {
          en: "EF Core is the primary data-access technology across Nour's .NET backend work. The collection documents Repository and Unit of Work patterns, DbContext configuration, relationship modeling, and migration management.",
          ar: "EF Core هو تقنية الوصول إلى البيانات الأساسية في عمل نور الباك إند باستخدام .NET. توثّق المجموعة أنماط Repository وUnit of Work وتكوين DbContext ونمذجة العلاقات وإدارة الترحيل.",
        },
      },
      {
        heading: { en: "Where this is applied", ar: "حيث يُطبّق" },
        content: {
          en: "Bookify uses EF Core with Repository and Unit of Work for hotel reservations, booking workflows, and payment records. CinemaVerse applies EF Core across movies, bookings, tickets, and Hangfire job scheduling.",
          ar: "يستخدم Bookify EF Core مع Repository وUnit of Work لحجوزات الفنادق وتدفقات الحجز وسجلات الدفع. يطبق CinemaVerse EF Core عبر الأفلام والحجوزات والتذاكر وجدولة مهام Hangfire.",
        },
        kind: "list",
        items: [
          {
            en: "Bookify — N-tier MVC with Repository, Unit of Work, and ViewModel patterns",
            ar: "Bookify — بنية متعددة الطبقات مع أنماط Repository وUnit of Work وViewModel",
          },
          {
            en: "CinemaVerse — service and repository stack behind the Angular frontend",
            ar: "CinemaVerse — طبقات الخدمة والمستودعات خلف واجهة Angular",
          },
        ],
      },
      {
        heading: { en: "Known limitations", ar: "القيود المعروفة" },
        content: {
          en: "Advanced performance tuning, caching strategies, and large-scale data partitioning are not yet documented as verified knowledge in this collection.",
          ar: "لم تُوثّق بعد استراتيجيات تحسين الأداء المتقدمة وتخزين البيانات المؤقت وتقسيم البيانات على نطاق واسع كمعرفة مؤكدة في هذه المجموعة.",
        },
        kind: "callout",
      },
    ],
    tags: ["ef core", "database", "orm", ".net", "repository pattern"],
    relatedFileIds: ["knowledge-rest", "skill-dotnet-backend"],
    relatedProjectSlugs: ["bookify", "cinemaverse"],
    public: true,
    parentId: "knowledge-dotnet",
    children: [],
  },
  {
    id: "knowledge-rest",
    name: { en: "REST APIs", ar: "REST APIs" },
    type: "file",
    kind: "collection",
    summary: {
      en: "RESTful API design, endpoint structure, error handling, and documentation practices in ASP.NET Core.",
      ar: "تصميم RESTful API وهياكل النقاط النهائية ومعالجة الأخطاء وممارسات التوثيق في ASP.NET Core.",
    },
    sections: [
      {
        heading: { en: "Collection overview", ar: "نظرة عامة على المجموعة" },
        content: {
          en: "This collection covers REST API patterns in ASP.NET Core: controller structure, route design, status codes, validation, Swagger documentation, and error-response conventions.",
          ar: "تغطي هذه المجموعة أنماط REST API في ASP.NET Core: هيكل الكنترولر وتصميم المسارات وأكواد الحالة والتحقق والتوثيق عبر Swagger واتفاقيات استجابة الأخطاء.",
        },
      },
      {
        heading: { en: "Where this is applied", ar: "حيث يُطبّق" },
        content: {
          en: "Blood Bank Mobile connects to an ASP.NET Core API with Swagger docs, JWT authentication, CORS, and structured error handling. CinemaVerse exposes 94 documented endpoints across user and admin workflows.",
          ar: "يتصل Blood Bank Mobile بواجهة ASP.NET Core API مع توثيق Swagger ومصادقة JWT وCORS ومعالجة أخطاء منظمة. يكشف CinemaVerse 94 نقطة نهاية موثقة عبر تدفقات المستخدم والإدارة.",
        },
        kind: "list",
        items: [
          {
            en: "Blood Bank Mobile — REST API with Swagger, JWT, and CORS",
            ar: "Blood Bank Mobile — REST API مع Swagger وJWT وCORS",
          },
          {
            en: "CinemaVerse — 94 documented endpoints with Hangfire background jobs",
            ar: "CinemaVerse — 94 نقطة نهاية موثقة مع مهام Hangfire الخلفية",
          },
        ],
      },
    ],
    tags: ["rest", "api", "asp.net core", "swagger", "http"],
    relatedFileIds: ["knowledge-secured", "skill-dotnet-backend"],
    relatedProjectSlugs: ["blood-bank-mobile", "cinemaverse"],
    public: true,
    parentId: "knowledge-dotnet",
    children: [],
  },
  {
    id: "knowledge-secured",
    name: { en: "Secured APIs", ar: "Secured APIs" },
    type: "file",
    kind: "collection",
    summary: {
      en: "Authentication, authorization, JWT tokens, role-based access, and security patterns in .NET systems.",
      ar: "المصادقة والصلاحيات ورموز JWT والوصول المبني على الأدوار وأنماط الأمان في أنظمة .NET.",
    },
    sections: [
      {
        heading: { en: "Collection overview", ar: "نظرة عامة على المجموعة" },
        content: {
          en: "Security patterns across Nour's .NET projects: JWT access and refresh tokens, ASP.NET Identity, role-based access control, CSRF protection, rate limiting, and lockout policies.",
          ar: "أنماط الأمان عبر مشاريع نور باستخدام .NET: رموز JWT للوصول والتجديد وASP.NET Identity والوصول المبني على الأدوار وحماية CSRF وتحديد المعدل وسياسات القفل.",
        },
      },
      {
        heading: { en: "Where this is applied", ar: "حيث يُطبّق" },
        content: {
          en: "Bookify implements Stripe payment intents, ASP.NET Identity, RBAC, lockout, and CSRF protection. CinemaVerse uses JWT access and refresh tokens, rate-limited auth, and Hangfire expiry jobs. Blood Bank Desktop supports role-based access with authentication.",
          ar: "ينفذ Bookify Stripe Payment Intents وASP.NET Identity والوصول المبني على الأدوار والقفل وحماية CSRF. يستخدم CinemaVerse رموز JWT للوصول والتجديد والمصادقة المحددة المعدل ومهام انتهاء الصلاحية. يدعم Blood Bank Desktop الوصول المبني على الأدوار مع المصادقة.",
        },
        kind: "list",
        items: [
          {
            en: "Bookify — Stripe, ASP.NET Identity, RBAC, CSRF",
            ar: "Bookify — Stripe وASP.NET Identity والوصول المبني على الأدوار وCSRF",
          },
          {
            en: "CinemaVerse — JWT, rate limiting, Hangfire expiry",
            ar: "CinemaVerse — JWT وتحديد المعدل ومهام انتهاء الصلاحية",
          },
          {
            en: "Blood Bank Desktop — role-based access and authentication",
            ar: "Blood Bank Desktop — الوصول المبني على الأدوار والمصادقة",
          },
        ],
      },
    ],
    tags: ["security", "jwt", "authentication", "authorization", ".net"],
    relatedFileIds: ["knowledge-rest", "skill-dotnet-backend"],
    relatedProjectSlugs: ["bookify", "cinemaverse", "blood-bank-desktop"],
    public: true,
    parentId: "knowledge-dotnet",
    children: [],
  },
  {
    id: "knowledge-web",
    name: { en: "Web", ar: "ويب" },
    type: "folder",
    kind: "folder",
    summary: {
      en: "Web frontend knowledge: JavaScript and TypeScript across frameworks.",
      ar: "معرفة واجهة الويب: JavaScript وTypeScript عبر الأطر.",
    },
    tags: ["web", "frontend", "javascript", "typescript"],
    relatedFileIds: [],
    relatedProjectSlugs: ["buildsense"],
    public: true,
    parentId: "knowledge",
    children: ["knowledge-javascript"],
  },
  {
    id: "knowledge-javascript",
    name: { en: "JavaScript", ar: "JavaScript" },
    type: "file",
    kind: "collection",
    summary: {
      en: "JavaScript and TypeScript knowledge applied across Angular, Node.js, and Express projects.",
      ar: "معرفة JavaScript وTypeScript المطبّقة عبر مشاريع Angular وNode.js وExpress.",
    },
    sections: [
      {
        heading: { en: "Collection overview", ar: "نظرة عامة على المجموعة" },
        content: {
          en: "JavaScript and TypeScript form the frontend and API layer for BuildSense. Angular provides the component architecture; Express handles the API; Node powers the ingestion worker.",
          ar: "تشكل JavaScript وTypeScript طبقة الواجهة الأمامية وواجهة API لـBuildSense. توفر Angular بنية المكونات؛ يتعامل Express مع واجهة API؛ ويعمل Node بعامل جمع البيانات.",
        },
      },
      {
        heading: { en: "Where this is applied", ar: "حيث يُطبّق" },
        content: {
          en: "BuildSense is the primary TypeScript application: Angular 19 frontend, Express API, MongoDB data layer, Nx monorepo structure, automated tests, and CI pipeline.",
          ar: "BuildSense هو التطبيق الرئيسي باستخدام TypeScript: واجهة Angular 19 وواجهة Express وطبقة بيانات MongoDB وهياكل Nx monorepo والاختبارات الآلية وخط CI.",
        },
        kind: "list",
        items: [
          {
            en: "BuildSense — Angular 19, Express, MongoDB, Nx",
            ar: "BuildSense — Angular 19 وExpress وMongoDB وNx",
          },
        ],
      },
    ],
    tags: ["javascript", "typescript", "angular", "node", "express"],
    relatedFileIds: ["skill-fullstack", "skill-dotnet-backend"],
    relatedProjectSlugs: ["buildsense"],
    public: true,
    parentId: "knowledge-web",
    children: [],
  },
  {
    id: "knowledge-university",
    name: { en: "University", ar: "الجامعة" },
    type: "folder",
    kind: "folder",
    summary: {
      en: "Academic knowledge collections tied to university coursework.",
      ar: "مجموعات معرفية أكاديمية مرتبطة بالدروس الجامعية.",
    },
    tags: ["university", "academic"],
    relatedFileIds: [],
    relatedProjectSlugs: ["blood-bank-desktop", "blood-bank-mobile", "dvld"],
    public: true,
    parentId: "knowledge",
    children: ["knowledge-met"],
  },
  {
    id: "knowledge-met",
    name: { en: "MET Summaries", ar: "ملخصات هندسة الحاسوب" },
    type: "file",
    kind: "collection",
    summary: {
      en: "MET faculty course summaries published as a public knowledge destination.",
      ar: "ملخصات مقررات كلية هندسة الحاسوب المنشورة كوجهة معرفية عامة.",
    },
    presentation: "summary",
    downloadName: "met-summaries-overview.md",
    links: [
      {
        label: { en: "Open summaries site", ar: "افتح موقع الملخصات" },
        href: "https://noureldeenmahmoud.github.io/MET-Summaries/",
        kind: "website",
      },
      {
        label: { en: "View source repository", ar: "اعرض مستودع المصدر" },
        href: "https://github.com/NourEldeenMahmoud/MET-Summaries",
        kind: "repository",
      },
    ],
    media: [
      {
        src: "/projects/met-summaries/details/hero-dark.webp",
        alt: {
          en: "MET Summaries dark home page",
          ar: "الصفحة الرئيسية الداكنة لموقع MET Summaries",
        },
        caption: {
          en: "Subject-led summary navigation",
          ar: "تنقل الملخصات حسب المادة",
        },
      },
      {
        src: "/projects/met-summaries/details/lesson-example.webp",
        alt: {
          en: "A structured lesson summary",
          ar: "مثال لملخص درس منظم",
        },
        caption: {
          en: "Concepts, examples, and study context",
          ar: "مفاهيم وأمثلة وسياق دراسي",
        },
      },
      {
        src: "/projects/met-summaries/details/knowledge-graph.webp",
        alt: {
          en: "Connected summary knowledge graph",
          ar: "رسم معرفي مترابط للملخصات",
        },
        caption: {
          en: "Cross-linked course knowledge",
          ar: "معرفة المقررات المترابطة",
        },
      },
    ],
    sections: [
      {
        heading: { en: "Collection overview", ar: "نظرة عامة على المجموعة" },
        content: {
          en: "The MET Summaries project publishes cleaned course summaries from Nour's university faculty as a publicly accessible static site. It is the first collection in the Knowledge Library with a confirmed public destination.",
          ar: "ينشر مشروع MET Summaries ملخصات المقررات المنسّقة من كلية الجامعة كموقع ثابت متاح للعامة. إنها أول مجموعة في المكتبة المعرفية لها وجهة عامة مؤكدة.",
        },
      },
      {
        heading: { en: "What is included", ar: "ما هو متضمن" },
        content: {
          en: "Course summaries cover core computer engineering topics. The summaries are reviewed, cleaned, and formatted for public reading before publishing.",
          ar: "تغطي ملخصات المقررات مواضيع أساسية في هندسة الحاسوب. تتم مراجعة الملخصات وتنظيفها وتنسيقها للقراءة العامة قبل النشر.",
        },
        kind: "list",
        items: [
          {
            en: "Published at noureldeenmahmoud.github.io/MET-Summaries/",
            ar: "منشورة على noureldeenmahmoud.github.io/MET-Summaries/",
          },
        ],
      },
      {
        heading: { en: "Known limitations", ar: "القيود المعروفة" },
        content: {
          en: "Individual course coverage depends on publicly shareable summaries. Not all courses or semesters may be represented.",
          ar: "تعتمد التغطية لكل مقرر على الملخصات القابلة للنشر. قد لا تكون جميع المقررات أو الفصول ممثلة.",
        },
        kind: "callout",
      },
    ],
    tags: ["university", "met", "summaries", "courses"],
    relatedFileIds: [],
    relatedProjectSlugs: [],
    public: true,
    parentId: "knowledge-university",
    children: [],
  },
  {
    id: "about",
    name: { en: "05 About Me", ar: "05 عني" },
    type: "file",
    kind: "document",
    summary: {
      en: ".NET backend and full-stack engineer building dependable products across web, desktop, mobile, and interactive systems.",
      ar: "مهندس باك إند .NET وفل ستاك يبني منتجات موثوقة عبر الويب وسطح المكتب والموبايل والأنظمة التفاعلية.",
    },
    presentation: "profile",
    downloadName: "nour-eldeen-profile.md",
    links: [
      {
        label: { en: "Email", ar: "البريد الإلكتروني" },
        href: "mailto:noureldeendev@gmail.com",
        kind: "email",
      },
      {
        label: { en: "GitHub", ar: "GitHub" },
        href: "https://github.com/NourEldeenMahmoud",
        kind: "github",
      },
      {
        label: { en: "LinkedIn", ar: "LinkedIn" },
        href: "https://linkedin.com/in/nour-eldeen-eg",
        kind: "linkedin",
      },
    ],
    sections: [
      {
        heading: { en: "Profile", ar: "الملف الشخصي" },
        content: {
          en: "Nour Eldeen Mahmoud is a .NET-focused software engineer. His professional center is backend and full-stack development; Flutter, WinForms, Unity, and AI-assisted workflows demonstrate range across platforms and technical domains.",
          ar: "نور الدين محمود مهندس برمجيات يركز على .NET. يتمحور تخصصه المهني حول الباك إند والفل ستاك، بينما توضح Flutter وWinForms وUnity وسير العمل بمساعدة الذكاء الاصطناعي قدرته عبر منصات ومجالات تقنية متعددة.",
        },
      },
      {
        heading: { en: "Target roles", ar: "الأدوار المستهدفة" },
        content: {
          en: "Open to junior .NET backend and full-stack roles, internships, and engineering opportunities centered on careful implementation and continued learning.",
          ar: "متاح لأدوار باك إند .NET وفل ستاك للمبتدئين والتدريب والفرص الهندسية التي تركز على التنفيذ الدقيق والتعلم المستمر.",
        },
      },
      {
        heading: { en: "Engineering principles", ar: "المبادئ الهندسية" },
        content: {
          en: "Three principles guide the work.",
          ar: "ثلاثة مبادئ توجه العمل.",
        },
        kind: "list",
        items: [
          {
            en: "Make systems legible through clear boundaries and evidence.",
            ar: "اجعل الأنظمة مفهومة من خلال الحدود الواضحة والأدلة.",
          },
          {
            en: "Treat platform, team, domain, and data constraints as design inputs.",
            ar: "عامل قيود المنصة والفريق والنطاق والبيانات كمدخلات تصميم.",
          },
          {
            en: "Validate claims with tests, review, repositories, and honest limitations.",
            ar: "تحقق من الادعاءات بالاختبارات والمراجعة والمستودعات والقيود الصريحة.",
          },
        ],
      },
      {
        heading: { en: "Learning loop", ar: "دورة التعلم" },
        content: {
          en: "Understand, design, build, then validate.",
          ar: "افهم، ثم صمم، ثم ابنِ، ثم تحقق.",
        },
        kind: "steps",
        items: [
          {
            en: "Understand the source and scope.",
            ar: "افهم المصدر والنطاق.",
          },
          { en: "Design around a real constraint.", ar: "صمم حول قيد حقيقي." },
          {
            en: "Build with evidence and documentation.",
            ar: "ابنِ مع الأدلة والتوثيق.",
          },
          {
            en: "Validate behavior and limitations.",
            ar: "تحقق من السلوك والقيود.",
          },
        ],
      },
    ],
    tags: ["about", "identity", "contact"],
    relatedFileIds: [],
    relatedProjectSlugs: [],
    public: true,
    parentId: "this-pc",
    children: [],
  },
  {
    id: "about-profile",
    name: { en: "Profile.md", ar: "الملف الشخصي.md" },
    type: "file",
    kind: "document",
    summary: {
      en: "Who Nour is, what he builds, and what roles he targets.",
      ar: "من هو نور وماذا يبني وأي أدوار يستهدف.",
    },
    sections: [
      {
        heading: { en: "Profile", ar: "الملف الشخصي" },
        content: {
          en: "Nour Eldeen Mahmoud is a .NET-centered software engineer building dependable systems across backend, full-stack, cross-platform, and interactive work. He focuses on legible architecture, validated claims, and evidence-backed limitations.",
          ar: "نور الدين محمود هو مهندس برمجيات يرتكز عمله على .NET يبني أنظمة موثوقة عبر الباك إند والفل ستاك والتطبيقات متعددة المنصات والتجارب التفاعلية. يركز على الهندسة المفهومة والادعاءات المحققة والقيود المدعومة بالأدلة.",
        },
      },
      {
        heading: { en: "Target roles", ar: "الأدوار المستهدفة" },
        content: {
          en: "Junior .NET backend roles, full-stack roles, internships, and engineering opportunities where careful implementation and continued learning matter.",
          ar: "أدوار باك إند .NET للمبتدئين، وأدوار فل ستاك، والتدريب، والفرص الهندسية التي تهتم بالتنفيذ الدقيق والتعلم المستمر.",
        },
        kind: "list",
      },
    ],
    tags: ["profile", "about", "roles"],
    relatedFileIds: ["about-identity", "about-journey"],
    relatedProjectSlugs: [],
    public: false,
    parentId: "about",
    children: [],
  },
  {
    id: "about-identity",
    name: { en: "Engineering Identity.md", ar: "الهوية الهندسية.md" },
    type: "file",
    kind: "document",
    summary: {
      en: "The engineering principles and working values that guide Nour's approach.",
      ar: "المبادئ الهندسية وقيم العمل التي توجّه نهج نور.",
    },
    sections: [
      {
        heading: { en: "Working principles", ar: "مبادئ العمل" },
        content: {
          en: "Three core principles guide every project.",
          ar: "ثلاثة مبادئ أساسية توجّه كل مشروع.",
        },
        kind: "list",
        items: [
          {
            en: "Make the system legible — Clear boundaries and evidence are more useful than hidden cleverness.",
            ar: "اجعل النظام مفهوماً — الحدود الواضحة والأدلة أنفع من الذكاء المخفي.",
          },
          {
            en: "Treat constraints as design inputs — Platform, team, domain, and data limits shape the solution.",
            ar: "عامل القيود كمدخلات تصميم — قيود المنصة والفريق والنطاق والبيانات تشكل الحل.",
          },
          {
            en: "Validate before presenting — Tests, review, repositories, and honest limitations support every claim.",
            ar: "تحقق قبل العرض — تدعم الاختبارات والمراجعة والمستودعات والقيود الصريحة كل ادعاء.",
          },
        ],
      },
    ],
    tags: ["principles", "values", "identity"],
    relatedFileIds: ["about-profile", "about-learning"],
    relatedProjectSlugs: [],
    public: false,
    parentId: "about",
    children: [],
  },
  {
    id: "about-learning",
    name: { en: "Learning System.md", ar: "نظام التعلم.md" },
    type: "file",
    kind: "document",
    summary: {
      en: "How Nour structures learning: understand, design, build, validate.",
      ar: "كيف يهيكل نور التعلم: فهم، تصميم، بناء، تحقق.",
    },
    sections: [
      {
        heading: { en: "Learning cycle", ar: "دورة التعلم" },
        content: {
          en: "Nour follows a four-stage learning cycle applied to every technical domain.",
          ar: "يتبع نور دورة تعلم من أربع مراحل تُطبّق على كل مجال تقني.",
        },
        kind: "steps",
        items: [
          {
            en: "Understand — Read official docs, identify core patterns, and define the scope.",
            ar: "فهم — اقرأ التوثيق الرسمي، حدّد الأنماط الأساسية، وعرّف النطاق.",
          },
          {
            en: "Design — Apply patterns to a real project constraint or problem.",
            ar: "تصميم — طبّق الأنماط على قيود أو مشكلات مشاريع حقيقية.",
          },
          {
            en: "Build — Implement with tests, documentation, and repository evidence.",
            ar: "بناء — نفّذ مع اختبارات وتوثيق وأدلة مستودع.",
          },
          {
            en: "Validate — Review against official patterns, compare with peers, and document limitations.",
            ar: "تحقق — راجع مقابل الأنماط الرسميّة، قارن مع الأقران، ووثّق القيود.",
          },
        ],
      },
    ],
    tags: ["learning", "process", "methodology"],
    relatedFileIds: ["about-identity", "about-journey"],
    relatedProjectSlugs: [],
    public: false,
    parentId: "about",
    children: [],
  },
  {
    id: "about-journey",
    name: { en: "Journey.md", ar: "الرحلة.md" },
    type: "file",
    kind: "document",
    summary: {
      en: "The academic and project journey that shaped Nour's engineering practice.",
      ar: "الرحلة الأكاديمية والمشاريع التي شكّلت الممارسة الهندسية لنور.",
    },
    sections: [
      {
        heading: { en: "Journey", ar: "الرحلة" },
        content: {
          en: "Nour's engineering practice was built through university projects and self-directed product engineering. The Blood Bank platform, DVLD, Bookify, CinemaVerse, and BuildSense each contributed different technical domains.",
          ar: "بُنيت الممارسة الهندسية لنور عبر مشاريع جامعية وهندسة منتجات ذاتية التوجيه. منصة بنك الدم وDVLD وBookify وCinemaVerse وBuildSense ساهم كل منها في مجالات تقنية مختلفة.",
        },
        kind: "list",
        items: [
          {
            en: "University team projects: Blood Bank (desktop, mobile, API, SQL Server)",
            ar: "مشاريع جماعية جامعية: بنك الدم (مكتب، موبايل، API، SQL Server)",
          },
          {
            en: "Desktop systems: DVLD (WinForms, ADO.NET, rules-heavy domain)",
            ar: "أنظمة مكتبية: DVLD (WinForms وADO.NET ونطاق كثيف القواعد)",
          },
          {
            en: "Full-stack team: Bookify (MVC, identity, payments, EF Core)",
            ar: "فل ستاك جماعي: Bookify (MVC والهوية والمدفوعات وEF Core)",
          },
          {
            en: "Full-stack team: CinemaVerse (API, Angular, JWT, Hangfire)",
            ar: "فل ستاك جماعي: CinemaVerse (API وAngular وJWT وHangfire)",
          },
          {
            en: "Solo product: BuildSense (Angular, Node, Express, Nx, CI)",
            ar: "منتج فردي: BuildSense (Angular وNode وExpress وNx وCI)",
          },
        ],
      },
    ],
    tags: ["journey", "timeline", "projects"],
    relatedFileIds: ["about-profile", "skill-crossplatform"],
    relatedProjectSlugs: [
      "bookify",
      "cinemaverse",
      "blood-bank-desktop",
      "blood-bank-mobile",
      "dvld",
      "buildsense",
    ],
    public: false,
    parentId: "about",
    children: [],
  },
  {
    id: "about-contact",
    name: { en: "Contact and Links.md", ar: "التواصل والروابط.md" },
    type: "file",
    kind: "document",
    summary: {
      en: "How to reach Nour: email, LinkedIn, and GitHub.",
      ar: "كيف تتواصل مع نور: البريد الإلكتروني وLinkedIn وGitHub.",
    },
    sections: [
      {
        heading: { en: "Contact", ar: "التواصل" },
        content: {
          en: "Nour is open to junior .NET backend and full-stack opportunities, internships, and engineering roles.",
          ar: "نور مفتوح لأدوار باك إند .NET وفل ستاك للمبتدئين والتدريب والفرص الهندسية.",
        },
        kind: "list",
        items: [
          {
            en: "Email: noureldeendev@gmail.com",
            ar: "البريد الإلكتروني: noureldeendev@gmail.com",
          },
          {
            en: "LinkedIn: linkedin.com/in/nour-eldeen-eg",
            ar: "LinkedIn: linkedin.com/in/nour-eldeen-eg",
          },
          {
            en: "GitHub: github.com/NourEldeenMahmoud",
            ar: "GitHub: github.com/NourEldeenMahmoud",
          },
        ],
      },
    ],
    tags: ["contact", "email", "linkedin", "github"],
    relatedFileIds: ["about-profile"],
    relatedProjectSlugs: [],
    public: false,
    parentId: "about",
    children: [],
  },
  {
    id: "workflows",
    name: {
      en: "02 AI Skills, Agents & Workflows",
      ar: "02 مهارات ووكلاء وسير عمل الذكاء الاصطناعي",
    },
    type: "folder",
    kind: "folder",
    summary: {
      en: "Reusable AI capabilities, specialized agents, and human-reviewed workflows.",
      ar: "قدرات ذكاء اصطناعي قابلة لإعادة الاستخدام ووكلاء متخصصون وسير عمل بمراجعة بشرية.",
    },
    tags: ["ai", "workflow", "process"],
    relatedFileIds: ["skill-engineering-practice"],
    relatedProjectSlugs: [],
    public: true,
    parentId: "this-pc",
    children: [
      AI_SKILLS_FOLDER_ID,
      AI_AGENTS_FOLDER_ID,
      AI_WORKFLOWS_FOLDER_ID,
    ],
  },
  {
    id: "workflow-course-to-obsidian",
    name: {
      en: "Course Material to Obsidian Summaries.workflow",
      ar: "تحويل مقررات إلى ملخصات Obsidian.workflow",
    },
    type: "file",
    kind: "workflow",
    summary: {
      en: "A structured process for converting course material into clean Obsidian vault summaries.",
      ar: "هيكلية عملية لتحويل مقررات إلى ملخصات نظيفة في Obsidian vault.",
    },
    sections: [
      {
        heading: { en: "Purpose", ar: "الغرض" },
        content: {
          en: "Convert raw course material from university lectures into organized, searchable Obsidian vault notes with consistent formatting.",
          ar: "تحويل المادة الخام من محاضرات الجامعة إلى ملاحظات منظمة وقابلة للبحث في Obsidian vault بتنسيق متسق.",
        },
      },
      {
        heading: { en: "Input", ar: "المدخلات" },
        content: {
          en: "Raw course notes, lecture slides, textbook excerpts, and university material.",
          ar: "ملاحظات مقررات خام وشرائح المحاضرات ومقتطفات الكتب والمادة الجامعية.",
        },
      },
      {
        heading: { en: "Steps", ar: "الخطوات" },
        content: {
          en: "Follow these steps in order. Each step has a clear output.",
          ar: "اتبع هذه الخطوات بالترتيب. لكل خطوة مخرج واضح.",
        },
        kind: "steps",
        items: [
          {
            en: "Collect source material and identify which topics to summarize.",
            ar: "اجمع المادة المصدرية وحدد المواضيع المراد تلخيصها.",
          },
          {
            en: "Draft a structured outline with headings, key concepts, and cross-references.",
            ar: "أعد مخططًا منظماً بعناوين ومفاهيم أساسية وروابط مرجعية.",
          },
          {
            en: "Use AI to generate a first draft from the outline and source material.",
            ar: "استخدم الذكاء الاصطناعي لإنشاء مسودة أولية من المخطط والمادة المصدرية.",
          },
          {
            en: "Review every claim against the source material. Correct inaccuracies.",
            ar: "راجع كل ادعاء مقابل المادة المصدرية. صحّح عدم الدقة.",
          },
          {
            en: "Format for Obsidian: add tags, wikilinks, and metadata.",
            ar: "نسّق لـObsidian: أضف وسوم وروابط wikilink وبيانات وصفية.",
          },
          {
            en: "Publish to the MET Summaries repository after review.",
            ar: "انشر إلى مستودع MET Summaries بعد المراجعة.",
          },
        ],
      },
      {
        heading: { en: "Tools used", ar: "الأدوات المستخدمة" },
        content: {
          en: "Obsidian for note management, AI assistants for first-draft generation, Git for version control, GitHub Pages for publishing.",
          ar: "Obsidian لإدارة الملاحظات، مساعدي الذكاء الاصطناعي لمسودة أولية، Git للتحكم في الإصدارات، GitHub Pages للنشر.",
        },
        kind: "list",
      },
      {
        heading: { en: "AI contribution", ar: "مساهمة الذكاء الاصطناعي" },
        content: {
          en: "AI assists with drafting structured content from raw material. It does not verify facts, make editorial decisions, or publish content.",
          ar: "يساعد الذكاء الاصطناعي في إ drafts محتوى منظماً من المادة الخام. لا يتحقق من الحقائق أو يتخذ قرارات تحريرية أو ينشر المحتوى.",
        },
      },
      {
        heading: {
          en: "Nour's review and decisions",
          ar: "مراجعة نور وقراراته",
        },
        content: {
          en: "Nour reviews every draft against source material, corrects errors, removes unsupported claims, adds cross-references, and approves for publication.",
          ar: "يراجع نور كل مسودة مقابل المادة المصدرية، ويصحح الأخطاء، ويحذف الادعاءات غير المدعومة، ويضيف مراجع تكاملية، ويوافق على النشر.",
        },
      },
      {
        heading: { en: "Validation", ar: "التحقق" },
        content: {
          en: "Cross-reference with official course material. Verify that no private notes or unshared content is published.",
          ar: "تحقق من تطابق المادة مع مصادر المقرر الرسمية. تأكد من عدم نشر ملاحظات خاصة أو محتوى غير مشترك.",
        },
      },
      {
        heading: { en: "Output", ar: "المخرجات" },
        content: {
          en: "Clean Obsidian notes published to the MET Summaries GitHub Pages site.",
          ar: "ملاحظات نظيفة منشورة على موقع MET Summaries على GitHub Pages.",
        },
      },
      {
        heading: { en: "Limitations", ar: "القيود" },
        content: {
          en: "Coverage depends on available source material. AI drafts may contain subtle inaccuracies that require careful human review.",
          ar: "تعتمد التغطية على المادة المصدرية المتاحة. قد تحتوي مسودات الذكاء الاصطناعي على عدم دقة دقيقة تتطلب مراجعة بشرية دقيقة.",
        },
        kind: "callout",
      },
    ],
    tags: ["obsidian", "course material", "summarization", "ai-assisted"],
    relatedFileIds: ["knowledge-met", "workflow-review-quality"],
    relatedProjectSlugs: [],
    public: false,
    parentId: "workflows",
    children: [],
  },
  {
    id: "workflow-review-quality",
    name: {
      en: "Reviewing Summary Quality.workflow",
      ar: "مراجعة جودة الملخصات.workflow",
    },
    type: "file",
    kind: "workflow",
    summary: {
      en: "How AI-assisted summaries are reviewed for accuracy, completeness, and honesty.",
      ar: "كيف تُراجع ملخصات مساعدة الذكاء الاصطناعي من حيث الدقة والاكتمال والصدق.",
    },
    sections: [
      {
        heading: { en: "Purpose", ar: "الغرض" },
        content: {
          en: "Ensure that AI-generated summaries are accurate, complete, free of hallucinated claims, and honest about limitations.",
          ar: "التأكد من أن ملخصات الذكاء الاصطناعي دقيقة ومكتملة وخالية من الادعاءات الوهمية وصادقة بشأن القيود.",
        },
      },
      {
        heading: { en: "Input", ar: "المدخلات" },
        content: {
          en: "Draft summaries produced with AI assistance and original source material.",
          ar: "مسودات ملخصات منتجة بمساعدة الذكاء الاصطناعي والمادة المصدرية الأصلية.",
        },
      },
      {
        heading: { en: "Steps", ar: "الخطوات" },
        content: {
          en: "A systematic review checklist.",
          ar: "قائمة مراجعة منهجية.",
        },
        kind: "steps",
        items: [
          {
            en: "Compare each claim against the source material.",
            ar: "قارن كل ادعاء مع المادة المصدرية.",
          },
          {
            en: "Flag any hallucinated facts, incorrect attributions, or invented details.",
            ar: "حدد أي حقائق وهمية أو نسب خاطئة أو تفاصيل مختلقة.",
          },
          {
            en: "Verify cross-references and wikilinks point to real notes.",
            ar: "تحقق من أن الروابط المرجعية تشير إلى ملاحظات حقيقية.",
          },
          {
            en: "Check that limitations are stated explicitly.",
            ar: "تأكد من ذكر القيود بوضوح.",
          },
          {
            en: "Approve, request changes, or reject.",
            ar: "وافق، أو اطلب تغييرات، أو ارفض.",
          },
        ],
      },
      {
        heading: { en: "AI contribution", ar: "مساهمة الذكاء الاصطناعي" },
        content: {
          en: "AI can assist with formatting checks and flagging potential inconsistencies, but the final quality decision is always human.",
          ar: "يمكن للذكاء الاصطناعي المساعدة في فحوصات التنسيق وتحديد عدم التناسق المحتمل، لكن قرار الجودة النهائي دائمًا بشرعي.",
        },
      },
      {
        heading: { en: "Limitations", ar: "القيود" },
        content: {
          en: "Review thoroughness depends on available time and source access. Not all edge cases may be caught.",
          ar: "تعتمد شاملة المراجعة على الوقت المتاح والوصول إلى المصادر. قد لا تُلاحظ جميع الحالات الحدية.",
        },
        kind: "callout",
      },
    ],
    tags: ["review", "quality", "ai-assisted", "checklist"],
    relatedFileIds: [
      "workflow-course-to-obsidian",
      "workflow-validating-ai-code",
    ],
    relatedProjectSlugs: [],
    public: false,
    parentId: "workflows",
    children: [],
  },
  {
    id: "workflow-requirements-to-code",
    name: {
      en: "Requirements and ADRs to Implementation.workflow",
      ar: "من المتطلبات وADR إلى التنفيذ.workflow",
    },
    type: "file",
    kind: "workflow",
    summary: {
      en: "How requirements and architectural decisions become working implementation with AI assistance.",
      ar: "كيف تصبح المتطلبات وقرارات هندسية تنفيذاً فعالاً بمساعدة الذكاء الاصطناعي.",
    },
    sections: [
      {
        heading: { en: "Purpose", ar: "الغرض" },
        content: {
          en: "Translate product requirements and Architecture Decision Records into implementation plans, code structure, and verified deliverables.",
          ar: "ترجمة متطلبات المنتج وسجلات قرارات الهندسة إلى خطط تنفيذ وهيكل كود ونواتج محققة.",
        },
      },
      {
        heading: { en: "Input", ar: "المدخلات" },
        content: {
          en: "Feature requirements, ADRs, existing codebase context, and team constraints.",
          ar: "متطلبات الميزة، سجلات قرارات الهندسة، سياق قاعدة الكود الحالية، وقيود الفريق.",
        },
      },
      {
        heading: { en: "Steps", ar: "الخطوات" },
        content: {
          en: "From requirements to code.",
          ar: "من المتطلبات إلى الكود.",
        },
        kind: "steps",
        items: [
          {
            en: "Read and understand the requirement or ADR completely.",
            ar: "اقرأ وافهم المتطلب أو سجل القرار بالكامل.",
          },
          {
            en: "Identify constraints: framework, team conventions, data shape.",
            ar: "حدد القيود: الإطار، اتفاقيات الفريق، شكل البيانات.",
          },
          {
            en: "Draft an implementation plan with clear boundaries.",
            ar: "أعد خطة تنفيذ بحدود واضحة.",
          },
          {
            en: "Use AI to draft initial code structure from the plan.",
            ar: "استخدم الذكاء الاصطناعي للكتابة المسودة لهيكل الكود من الخطة.",
          },
          {
            en: "Review AI-generated code against the plan and constraints.",
            ar: "راجع الكود المولّد بالذكاء الاصطناعي مقابل الخطة والقيود.",
          },
          {
            en: "Write tests that verify the implementation meets the requirement.",
            ar: "اكتب اختبارات تتحقق من أن التنفيذ يلبي المتطلب.",
          },
          {
            en: "Document decisions and tradeoffs in code or ADR updates.",
            ar: "وثّق القرارات والمفاضلات في الكود أو تحديثات ADR.",
          },
        ],
      },
      {
        heading: { en: "AI contribution", ar: "مساهمة الذكاء الاصطناعي" },
        content: {
          en: "AI drafts initial code structure, suggests patterns, and generates boilerplate. All design decisions, constraint analysis, and final code remain human responsibilities.",
          ar: "يكتب الذكاء الاصطناعي مسودة هيكل الكود ويقترح الأنماط ويولّد الكود الأساسي. تبقى جميع قرارات التصميم وتحليل القيود والكود النهائي مسؤوليات بشرية.",
        },
      },
      {
        heading: { en: "Limitations", ar: "القيود" },
        content: {
          en: "AI suggestions may not account for project-specific conventions without explicit context. Review must happen before merge.",
          ar: "قد لا تأخذ اقتراحات الذكاء الاصطناعي في الاعتبار اتفاقيات المشروع المحددة بدون سياق صريح. يجب أن تحدث المراجعة قبل الدمج.",
        },
        kind: "callout",
      },
    ],
    tags: ["requirements", "adr", "implementation", "ai-assisted"],
    relatedFileIds: [
      "skill-engineering-practice",
      "workflow-validating-ai-code",
    ],
    relatedProjectSlugs: ["bookify", "buildsense"],
    public: false,
    parentId: "workflows",
    children: [],
  },
  {
    id: "workflow-validating-ai-code",
    name: {
      en: "Validating AI-Generated Code.workflow",
      ar: "التحقق من الكود المولّد بالذكاء الاصطناعي.workflow",
    },
    type: "file",
    kind: "workflow",
    summary: {
      en: "The checklist used to verify AI-generated code before it enters the codebase.",
      ar: "قائمة التحقق المستخدمة للتحقق من الكود المولّد بالذكاء الاصطناعي قبل دخوله قاعدة الكود.",
    },
    sections: [
      {
        heading: { en: "Purpose", ar: "الغرض" },
        content: {
          en: "Ensure AI-generated code meets project standards, passes tests, and does not introduce security or logic issues.",
          ar: "التأكد من أن الكود المولّد بالذكاء الاصطناعي يلبي معايير المشروع ويجتاز الاختبارات ولا يُدخل مشاكل أمنية أو منطقية.",
        },
      },
      {
        heading: { en: "Input", ar: "المدخلات" },
        content: {
          en: "AI-generated code drafts, project conventions, test suites, and security requirements.",
          ar: "مسودات كود مولّدة بالذكاء الاصطناعي، اتفاقيات المشروع، مجموعات الاختبار، المتطلبات الأمنية.",
        },
      },
      {
        heading: { en: "Steps", ar: "الخطوات" },
        content: { en: "A validation checklist.", ar: "قائمة تحقق من التحقق." },
        kind: "steps",
        items: [
          {
            en: "Read the AI-generated code line by line.",
            ar: "اقرأ الكود المولّد بالذكاء الاصطناعي سطرًا بسطر.",
          },
          {
            en: "Verify it follows project conventions and patterns.",
            ar: "تحقق من أنه يتبع اتفاقيات وأنماط المشروع.",
          },
          {
            en: "Run the existing test suite.",
            ar: "شغّل مجموعة الاختبارات الحالية.",
          },
          {
            en: "Write new tests for AI-generated logic.",
            ar: "اكتب اختبارات جديدة للمنطق المولّد بالذكاء الاصطناعي.",
          },
          {
            en: "Check for security issues: secrets, injection, unvalidated input.",
            ar: "تحقق من المشاكل الأمنية: أسرار، حقن، مدخلات غير محققة.",
          },
          {
            en: "Verify error handling covers failure cases.",
            ar: "تحقق من تغطية معالجة الأخطاء لحالات الفشل.",
          },
          {
            en: "Review with a peer or document the review decision.",
            ar: "راجع مع زميل أو وثّق قرار المراجعة.",
          },
        ],
      },
      {
        heading: { en: "AI contribution", ar: "مساهمة الذكاء الاصطناعي" },
        content: {
          en: "AI generates the initial code draft. It does not self-validate against project standards or make approval decisions.",
          ar: "يولّد الذكاء الاصطناعي مسودة الكود الأولية. لا يتحقق ذاتياً من معايير المشروع أو يتخذ قرارات الموافقة.",
        },
      },
      {
        heading: { en: "Limitations", ar: "القيود" },
        content: {
          en: "Some AI-generated issues may be subtle and require deep domain knowledge to catch. Not all edge cases are testable.",
          ar: "قد تكون بعض مشاكل الذكاء الاصطناعي دقيقة وتتطلب معرفة عميقة بالنطاق لاكتشافها. ليست جميع الحالات الحدية قابلة للاختبار.",
        },
        kind: "callout",
      },
    ],
    tags: ["validation", "testing", "ai-generated", "security"],
    relatedFileIds: [
      "workflow-requirements-to-code",
      "skill-engineering-practice",
    ],
    relatedProjectSlugs: ["buildsense"],
    public: false,
    parentId: "workflows",
    children: [],
  },
  {
    id: "skills",
    name: { en: "06 Technical Skills", ar: "06 المهارات التقنية" },
    type: "file",
    kind: "skill",
    summary: {
      en: "A visual, project-backed map of Nour's .NET center and cross-platform engineering range.",
      ar: "خريطة بصرية مدعومة بالمشاريع لمركز خبرة نور في .NET ونطاقه الهندسي متعدد المنصات.",
    },
    presentation: "skills",
    downloadName: "nour-eldeen-technical-skills.md",
    sections: [
      {
        heading: { en: ".NET & Backend", ar: ".NET والباك إند" },
        content: {
          en: "The professional center, evidenced across Bookify, CinemaVerse, Blood Bank, and DVLD.",
          ar: "المركز المهني، ومدعوم بأدلة من Bookify وCinemaVerse وبنك الدم وDVLD.",
        },
        kind: "list",
        items: [
          {
            en: "C#, ASP.NET Core MVC, Web API, Minimal APIs",
            ar: "C# وASP.NET Core MVC وWeb API وMinimal APIs",
          },
          {
            en: "EF Core, Repository, Unit of Work, migrations",
            ar: "EF Core وRepository وUnit of Work والترحيلات",
          },
          {
            en: "Identity, JWT, RBAC, Stripe, Hangfire",
            ar: "Identity وJWT وRBAC وStripe وHangfire",
          },
          {
            en: "REST, Swagger, validation, logging, health checks",
            ar: "REST وSwagger والتحقق والتسجيل وفحوصات الصحة",
          },
        ],
      },
      {
        heading: { en: "Frontend & Full Stack", ar: "الواجهات والفل ستاك" },
        content: {
          en: "End-to-end product work across Angular and ASP.NET MVC systems.",
          ar: "عمل منتجات متكامل عبر أنظمة Angular وASP.NET MVC.",
        },
        kind: "list",
        items: [
          {
            en: "Angular, TypeScript, JavaScript, HTML, Tailwind CSS",
            ar: "Angular وTypeScript وJavaScript وHTML وTailwind CSS",
          },
          {
            en: "Node.js, Express, Nx monorepos",
            ar: "Node.js وExpress وNx monorepos",
          },
          {
            en: "Razor views and responsive interfaces",
            ar: "واجهات Razor وتصميمات متجاوبة",
          },
        ],
      },
      {
        heading: { en: "Data & Security", ar: "البيانات والأمان" },
        content: {
          en: "Relational and document data with practical application-security controls.",
          ar: "بيانات علائقية ووثائقية مع ضوابط أمان تطبيقية عملية.",
        },
        kind: "list",
        items: [
          {
            en: "SQL Server, T-SQL, ADO.NET, MongoDB",
            ar: "SQL Server وT-SQL وADO.NET وMongoDB",
          },
          {
            en: "CSRF protection, CORS, Helmet, input validation",
            ar: "حماية CSRF وCORS وHelmet والتحقق من المدخلات",
          },
          {
            en: "Authentication, authorization, audit logging",
            ar: "المصادقة والصلاحيات وسجلات التدقيق",
          },
        ],
      },
      {
        heading: {
          en: "Desktop, Mobile & Games",
          ar: "سطح المكتب والموبايل والألعاب",
        },
        content: {
          en: "Breadth across product platforms and interactive systems.",
          ar: "نطاق واسع عبر منصات المنتجات والأنظمة التفاعلية.",
        },
        kind: "list",
        items: [
          {
            en: "WinForms, Flutter, Dart, three-tier architecture",
            ar: "WinForms وFlutter وDart والبنية ثلاثية الطبقات",
          },
          {
            en: "Unity 6, C# scripting, Cinemachine, NavMesh",
            ar: "Unity 6 وبرمجة C# وCinemachine وNavMesh",
          },
          {
            en: "Physics, object pooling, particles, ShaderLab/HLSL",
            ar: "الفيزياء وتجميع الكائنات والجسيمات وShaderLab/HLSL",
          },
        ],
      },
      {
        heading: { en: "Quality & Tooling", ar: "الجودة والأدوات" },
        content: {
          en: "Validation and delivery practices with varying depth by project.",
          ar: "ممارسات التحقق والتسليم بعمق يختلف حسب المشروع.",
        },
        kind: "list",
        items: [
          {
            en: "Vitest, Playwright, axe-core, integration testing",
            ar: "Vitest وPlaywright وaxe-core واختبارات التكامل",
          },
          {
            en: "Git, GitHub, CI pipelines, GitHub Pages",
            ar: "Git وGitHub وخطوط CI وGitHub Pages",
          },
          {
            en: "Architecture and API documentation",
            ar: "توثيق الهندسة وواجهات API",
          },
        ],
      },
    ],
    tags: ["skills", "evidence"],
    relatedFileIds: [
      "skill-dotnet-backend",
      "skill-fullstack",
      "skill-crossplatform",
      "skill-engineering-practice",
    ],
    relatedProjectSlugs: [],
    public: true,
    parentId: "this-pc",
    children: [],
  },
  {
    id: "skill-dotnet-backend",
    name: { en: ".NET Backend", ar: "باك إند .NET" },
    type: "file",
    kind: "skill",
    summary: {
      en: "ASP.NET Core, EF Core, SQL Server, identity, and backend architecture.",
      ar: "ASP.NET Core وEF Core وSQL Server والهوية وهندسة الباك إند.",
    },
    sections: [
      {
        heading: {
          en: "What this capability means",
          ar: "ماذا تعني هذه القدرة",
        },
        content: {
          en: "Design and implement .NET backend systems with layered architecture, data access through EF Core, REST API design, authentication, and SQL Server persistence.",
          ar: "تصميم وتنفيذ أنظمة باك إند .NET ببنية متعددة الطبقات والوصول للبيانات عبر EF Core وتصميم REST API والمصادقة وتخزين SQL Server.",
        },
      },
      {
        heading: { en: "Where Nour used it", ar: "حيث استخدمها نور" },
        content: {
          en: "Project evidence for this capability.",
          ar: "أدلة المشاريع لهذه القدرة.",
        },
        kind: "list",
        items: [
          {
            en: "Bookify — N-tier MVC with Repository, Unit of Work, Stripe, Identity, and health checks",
            ar: "Bookify — بنية متعددة الطبقات مع Repository وUnit of Work وStripe والهوية وفحوصات الصحة",
          },
          {
            en: "CinemaVerse — API with JWT, Hangfire, 94 endpoints, and Angular frontend",
            ar: "CinemaVerse — API مع JWT وHangfire و94 نقطة نهاية وواجهة Angular",
          },
          {
            en: "Blood Bank Desktop — WinForms, ADO.NET, three-tier architecture",
            ar: "Blood Bank Desktop — WinForms وADO.NET وبنية ثلاثية الطبقات",
          },
        ],
      },
      {
        heading: { en: "Related knowledge", ar: "معرفة ذات صلة" },
        content: {
          en: "Knowledge collections that support this skill.",
          ar: "مجموعات معرفية تدعم هذه المهارة.",
        },
        kind: "list",
        items: [
          {
            en: "EF Core — Repository, Unit of Work, DbContext",
            ar: "EF Core — Repository وUnit of Work وDbContext",
          },
          {
            en: "REST APIs — controller design, Swagger, error handling",
            ar: "REST APIs — تصميم الكنترولر وSwagger ومعالجة الأخطاء",
          },
          {
            en: "Secured APIs — JWT, Identity, RBAC",
            ar: "Secured APIs — JWT والهوية والوصول المبني على الأدوار",
          },
        ],
      },
      {
        heading: { en: "Honest limitations", ar: "قيود صريحة" },
        content: {
          en: "Team projects retain team attribution. Deployment evidence, detailed test coverage metrics, and production monitoring are not published as verified claims.",
          ar: "تحافظ المشاريع الجماعية على نسبتها للفريق. أدلة النشر وتغطية الاختبارات التفصيلية ومراقبة الإنتاج لا تُنشر كادعاءات مؤكدة.",
        },
        kind: "callout",
      },
    ],
    tags: [".net", "backend", "asp.net", "ef core", "sql server"],
    relatedFileIds: ["knowledge-efcore", "knowledge-rest", "knowledge-secured"],
    relatedProjectSlugs: ["bookify", "cinemaverse", "blood-bank-desktop"],
    public: true,
    parentId: "skills",
    children: [],
  },
  {
    id: "skill-fullstack",
    name: { en: "Full-Stack Range", ar: "نطاق الفل ستاك" },
    type: "file",
    kind: "skill",
    summary: {
      en: "Angular, Node.js, Express, MongoDB, and end-to-end product engineering.",
      ar: "Angular وNode.js وExpress وMongoDB وهندسة منتجات من البداية للنهاية.",
    },
    sections: [
      {
        heading: {
          en: "What this capability means",
          ar: "ماذا تعني هذه القدرة",
        },
        content: {
          en: "Build and maintain full-stack applications spanning frontend frameworks, API layers, databases, and deployment pipelines.",
          ar: "بناء وصيانة تطبيقات فل ستاك تمتد عبر أطر الواجهة الأمامية وطبقات API وقواعد البيانات وخطوط النشر.",
        },
      },
      {
        heading: { en: "Where Nour used it", ar: "حيث استخدمها نور" },
        content: {
          en: "BuildSense is the primary full-stack evidence.",
          ar: "BuildSense هو الدليل الرئيسي على الفل ستاك.",
        },
        kind: "list",
        items: [
          {
            en: "BuildSense — Angular 19, Express, MongoDB, Nx monorepo, CI",
            ar: "BuildSense — Angular 19 وExpress وMongoDB وNx monorepo وCI",
          },
        ],
      },
      {
        heading: { en: "Honest limitations", ar: "قيود صريحة" },
        content: {
          en: "Full-stack depth varies by project. BuildSense is solo work; team-based full-stack experience outside .NET is limited.",
          ar: "يتغير عمق الفل ستاك حسب المشروع. BuildSense عمل فردي؛ تجربة الفل ستاك الجماعية خارج .NET محدودة.",
        },
        kind: "callout",
      },
    ],
    tags: ["full-stack", "angular", "node", "express", "mongodb"],
    relatedFileIds: ["knowledge-javascript", "skill-dotnet-backend"],
    relatedProjectSlugs: ["buildsense"],
    public: true,
    parentId: "skills",
    children: [],
  },
  {
    id: "skill-crossplatform",
    name: { en: "Cross-Platform", ar: "متعدد المنصات" },
    type: "file",
    kind: "skill",
    summary: {
      en: "Flutter mobile, WinForms desktop, and multi-platform domain coverage.",
      ar: "Flutter للموبايل وWinForms لسطح المكتب وتغطية نطاق متعددة المنصات.",
    },
    sections: [
      {
        heading: {
          en: "What this capability means",
          ar: "ماذا تعني هذه القدرة",
        },
        content: {
          en: "Build applications that span desktop, mobile, and web platforms while sharing domain logic and data through a common backend.",
          ar: "بناء تطبيقات تمتد عبر سطح المكتب والموبايل والويب مع مشاركة منطق النطاق والبيانات من خلال باك إند مشترك.",
        },
      },
      {
        heading: { en: "Where Nour used it", ar: "حيث استخدمها نور" },
        content: {
          en: "The Blood Bank platform and DVLD demonstrate cross-platform coverage.",
          ar: "تُظهر منصة بنك الدم وDVLD التغطية متعددة المنصات.",
        },
        kind: "list",
        items: [
          {
            en: "Blood Bank — WinForms desktop, Flutter mobile, ASP.NET Core API, shared SQL Server",
            ar: "بنك الدم — WinForms مكتب وFlutter موبايل وASP.NET Core API وSQL Server مشترك",
          },
          {
            en: "DVLD — WinForms with ADO.NET and rules-heavy domain logic",
            ar: "DVLD — WinForms مع ADO.NET ومنطق نطاق كثيف القواعد",
          },
        ],
      },
      {
        heading: { en: "Honest limitations", ar: "قيود صريحة" },
        content: {
          en: "These are university team projects. Individual module ownership is not published as percentages. Cross-platform architecture was a shared effort.",
          ar: "هذه مشاريع جامعية جماعية. لا تُنشر ملكية الوحدات الفردية كنسب مئوية. كانت هندسة متعددة المنصات جهداً مشتركاً.",
        },
        kind: "callout",
      },
    ],
    tags: ["cross-platform", "flutter", "winforms", "mobile", "desktop"],
    relatedFileIds: ["skill-dotnet-backend"],
    relatedProjectSlugs: ["blood-bank-desktop", "blood-bank-mobile", "dvld"],
    public: true,
    parentId: "skills",
    children: [],
  },
  {
    id: "skill-engineering-practice",
    name: { en: "Engineering Practice", ar: "الممارسة الهندسية" },
    type: "file",
    kind: "skill",
    summary: {
      en: "Test-driven validation, code review, documentation, and repository discipline.",
      ar: "التحقق المبني على الاختبارات ومراجعة الكود والتوثيق وانضباط المستودع.",
    },
    sections: [
      {
        heading: {
          en: "What this capability means",
          ar: "ماذا تعني هذه القدرة",
        },
        content: {
          en: "Apply engineering discipline across all projects: testing, code review, documentation, version control, and honest limitation reporting.",
          ar: "تطبيق الانضباط الهندسي عبر جميع المشاريع: الاختبارات ومراجعة الكود والتوثيق والتحكم في الإصدارات والقيود الصريحة.",
        },
      },
      {
        heading: { en: "Where Nour used it", ar: "حيث استخدمها نور" },
        content: {
          en: "Every public project demonstrates some aspect of engineering practice.",
          ar: "يُظهر كل مشروع عام جانباً من الممارسة الهندسية.",
        },
        kind: "list",
        items: [
          {
            en: "BuildSense — automated tests, CI, architecture documentation",
            ar: "BuildSense — اختبارات آلية وCI وتوثيق هندسي",
          },
          {
            en: "Bookify — repository patterns, migrations, health checks",
            ar: "Bookify — أنماط المستودعات والترحيل وفحوصات الصحة",
          },
          {
            en: "CinemaVerse — 94 documented endpoints, Swagger",
            ar: "CinemaVerse — 94 نقطة نهاية موثقة وSwagger",
          },
        ],
      },
      {
        heading: { en: "Honest limitations", ar: "قيود صريحة" },
        content: {
          en: "Test coverage depth varies. CI is confirmed for BuildSense but not fully documented for all projects. Code review in team projects was collaborative.",
          ar: "يتغير عمق تغطية الاختبارات. يُأكّد CI لـBuildSense لكنه غير موثق بالكامل لجميع المشاريع. كانت مراجعة الكود في المشاريع الجماعية تعاونية.",
        },
        kind: "callout",
      },
    ],
    tags: ["testing", "ci", "documentation", "review", "engineering"],
    relatedFileIds: ["resource-wf-software-delivery", "skill-dotnet-backend"],
    relatedProjectSlugs: ["buildsense", "bookify", "cinemaverse"],
    public: true,
    parentId: "skills",
    children: [],
  },
  {
    id: "lab",
    name: { en: "Learning Lab", ar: "مختبر التعلم" },
    type: "folder",
    kind: "folder",
    summary: {
      en: "Experiments, current learning topics, and engineering reflections.",
      ar: "تجارب مواضيع التعلم الحالية والتأملات الهندسية.",
    },
    tags: ["lab", "learning", "experiments"],
    relatedFileIds: ["about"],
    relatedProjectSlugs: [],
    public: true,
    parentId: "skills",
    children: ["lab-currently", "lab-experiments", "lab-reflections"],
  },
  {
    id: "lab-currently",
    name: { en: "Currently Learning.md", ar: "أتعلّم حالياً.md" },
    type: "file",
    kind: "document",
    summary: {
      en: "What Nour is actively learning right now.",
      ar: "ما الذي يتعلّمه نور حالياً بشكل نشط.",
    },
    sections: [
      {
        heading: { en: "Currently learning", ar: "أتعلّم حالياً" },
        content: {
          en: "Nour is currently focused on deepening .NET backend skills and expanding into areas directly relevant to target roles.",
          ar: "يركز نور حالياً على تعميق مهارات باك إند .NET والتوسع في مجالات ذات صلة مباشرة بالأدوار المستهدفة.",
        },
        kind: "list",
        items: [
          {
            en: "Advanced EF Core patterns and performance tuning",
            ar: "أنماط EF Core المتقدمة وتحسين الأداء",
          },
          {
            en: "ASP.NET Core minimal APIs and vertical slice architecture",
            ar: "ASP.NET Core minimal APIs والبنية العمودية",
          },
          {
            en: "Integration testing and contract testing",
            ar: "اختبار التكامل واختبار العقود",
          },
        ],
      },
      {
        heading: { en: "How this is tracked", ar: "كيفية التتبع" },
        content: {
          en: "Learning entries are updated as new topics are started or completed. They reflect honest current activity, not marketing claims.",
          ar: "تُحدّث سجلات التعلم عند بدء أو إكمال مواضيع جديدة. تعكس النشاط الحالي الصادق بدلاً من الادعاءات التسويقية.",
        },
        kind: "callout",
      },
    ],
    tags: ["currently learning", "active"],
    relatedFileIds: ["about", "lab-experiments"],
    relatedProjectSlugs: [],
    public: true,
    parentId: "lab",
    children: [],
  },
  {
    id: "lab-experiments",
    name: { en: "Experiments", ar: "تجارب" },
    type: "folder",
    kind: "folder",
    summary: {
      en: "Exploratory projects and technical experiments.",
      ar: "مشاريع استكشافية وتجارب تقنية.",
    },
    tags: ["experiments"],
    relatedFileIds: ["skill-engineering-practice"],
    relatedProjectSlugs: ["buildsense"],
    public: true,
    parentId: "lab",
    children: [],
  },
  {
    id: "lab-reflections",
    name: {
      en: "Reflections and Postmortems",
      ar: "تأملات وتحليل ما بعد الانتهاء",
    },
    type: "folder",
    kind: "folder",
    summary: {
      en: "Lessons learned and postmortem analyses from completed projects.",
      ar: "دروس مستفادة وتحليلات ما بعد الانتهاء من المشاريع المكتملة.",
    },
    tags: ["reflections", "postmortems"],
    relatedFileIds: ["skill-engineering-practice"],
    relatedProjectSlugs: ["bookify", "buildsense"],
    public: true,
    parentId: "lab",
    children: [],
  },
  {
    id: "apps",
    name: { en: "01 Essential Apps", ar: "01 التطبيقات الأساسية" },
    type: "folder",
    kind: "folder",
    summary: {
      en: "The five tools at the center of Nour's AI-assisted learning and development workflow.",
      ar: "الأدوات الخمس الأساسية في سير عمل نور للتعلم والتطوير بمساعدة الذكاء الاصطناعي.",
    },
    tags: ["applications", "tools"],
    relatedFileIds: [],
    relatedProjectSlugs: [],
    public: true,
    parentId: "this-pc",
    children: [
      "app-antigravity",
      "app-opencode",
      "app-obsidian",
      "app-notebooklm",
      "app-hermes",
    ],
  },
  {
    id: "app-vscode",
    name: { en: "Visual Studio Code", ar: "Visual Studio Code" },
    type: "file",
    kind: "document",
    summary: {
      en: "Primary code editor for all development work across .NET, TypeScript, and scripting.",
      ar: "محرر الكود الرئيسي لجميع أعمال التطوير عبر .NET وTypeScript والسكريبت.",
    },
    sections: [
      {
        heading: { en: "What this tool is", ar: "ما هذا الأداة" },
        content: {
          en: "VS Code is the main development environment used across all of Nour's projects. It provides IntelliSense, integrated debugging, terminal access, Git integration, and a large extension ecosystem.",
          ar: "VS Code هو بيئة التطوير الرئيسية المستخدمة في جميع مشاريع نور. يوفر IntelliSense والتنقيح المدمج والوصول للطرفية وتكامل Git ونظام إضافات واسع.",
        },
      },
      {
        heading: { en: "What Nour uses it for", ar: "لماذا يستخدمها نور" },
        content: {
          en: "Daily development tasks.",
          ar: "مهام التطوير اليومية.",
        },
        kind: "list",
        items: [
          {
            en: "Writing and debugging C#, TypeScript, and Dart code",
            ar: "كتابة وتنقيح كود C# وTypeScript وDart",
          },
          {
            en: "Running tests and viewing results inline",
            ar: "تشغيل الاختبارات وعرض النتائج",
          },
          {
            en: "Managing Git branches, commits, and diffs",
            ar: "إدارة فروع Git والالتزامات والفروقات",
          },
          {
            en: "Terminal commands for builds, scripts, and tooling",
            ar: "أوامر الطرفية للبناء والسكريبتات والأدوات",
          },
        ],
      },
      {
        heading: { en: "Related skills", ar: "مهارات ذات صلة" },
        content: {
          en: "Engineering practice across all projects.",
          ar: "الممارسة الهندسية عبر جميع المشاريع.",
        },
        kind: "list",
        items: [
          { en: ".NET Backend", ar: "باك إند .NET" },
          { en: "Full-Stack Range", ar: "نطاق الفل ستاك" },
          { en: "Engineering Practice", ar: "الممارسة الهندسية" },
        ],
      },
    ],
    tags: ["editor", "ide", "development", "vscode"],
    relatedFileIds: ["knowledge-dotnet", "knowledge-web"],
    relatedProjectSlugs: [
      "bookify",
      "cinemaverse",
      "buildsense",
      "blood-bank-desktop",
    ],
    public: false,
    parentId: "apps",
    children: [],
  },
  {
    id: "app-obsidian",
    name: { en: "Obsidian", ar: "Obsidian" },
    type: "file",
    kind: "document",
    summary: {
      en: "Note-taking and knowledge organization tool used to maintain structured learning vaults.",
      ar: "أداة تدوين الملاحظات وتنظيم المعرفة المستخدمة للحفاظ على خزائن تعلم منظمة.",
    },
    sections: [
      {
        heading: { en: "What this tool is", ar: "ما هذا الأداة" },
        content: {
          en: "Obsidian is used to maintain a personal knowledge vault where technical summaries, course notes, and workflow documentation are organized with wikilinks and tags.",
          ar: "يُستخدم Obsidian للحفاظ على خزانة معرفة شخصية حيث تُنظَّم الملخصات التقنية وملاحظات المقررات وتوثيق سير العمل بروابط wikilink ووسوم.",
        },
      },
      {
        heading: { en: "What Nour uses it for", ar: "لماذا يستخدمها نور" },
        content: {
          en: "Knowledge management tasks.",
          ar: "مهام إدارة المعرفة.",
        },
        kind: "list",
        items: [
          {
            en: "Writing and organizing technical summaries",
            ar: "كتابة وتنظيم الملخصات التقنية",
          },
          {
            en: "Linking related notes with wikilinks",
            ar: "ربط الملاحظات ذات الصلة بروابط wikilink",
          },
          {
            en: "Maintaining the MET Summaries workflow source files",
            ar: "صيانة ملفات مصدر سير عمل MET Summaries",
          },
          {
            en: "Structuring learning notes by domain",
            ar: "هيكلة ملاحظات التعلم حسب المجال",
          },
        ],
      },
    ],
    tags: ["notes", "knowledge", "vault", "markdown", "obsidian"],
    relatedFileIds: [
      "workflow-course-to-obsidian",
      "workflow-review-quality",
      "knowledge-met",
    ],
    relatedProjectSlugs: [],
    public: true,
    parentId: "apps",
    children: [],
  },
  {
    id: "app-postman",
    name: { en: "Postman", ar: "Postman" },
    type: "file",
    kind: "document",
    summary: {
      en: "API testing and request exploration tool for backend development.",
      ar: "أداة اختبار API واستكشاف الطلبات لتطوير الباك إند.",
    },
    sections: [
      {
        heading: { en: "What this tool is", ar: "ما هذا الأداة" },
        content: {
          en: "Postman is used to inspect, test, and validate HTTP endpoints during backend and full-stack development. It provides a visual interface for constructing requests and examining responses.",
          ar: "يُستخدم Postman لفحص واختبار والتحقق من نقاط نهاية HTTP أثناء تطوير الباك إند والفل ستاك. يوفر واجهة بصرية لبناء الطلبات وفحص الاستجابات.",
        },
      },
      {
        heading: { en: "What Nour uses it for", ar: "لماذا يستخدمها نور" },
        content: { en: "API testing tasks.", ar: "مهام اختبار API." },
        kind: "list",
        items: [
          {
            en: "Testing REST API endpoints during development",
            ar: "اختبار نقاط نهاية REST API أثناء التطوير",
          },
          {
            en: "Validating authentication flows with JWT tokens",
            ar: "التحقق من تدفقات المصادقة برموز JWT",
          },
          {
            en: "Inspecting response bodies, status codes, and headers",
            ar: "فحص هيئات الاستجابة وأكواد الحالة والترويسات",
          },
        ],
      },
    ],
    tags: ["api", "testing", "rest", "http", "postman"],
    relatedFileIds: ["knowledge-rest", "knowledge-secured"],
    relatedProjectSlugs: ["cinemaverse", "blood-bank-mobile"],
    public: false,
    parentId: "apps",
    children: [],
  },
  {
    id: "app-ssms",
    name: {
      en: "SQL Server Management Studio",
      ar: "SQL Server Management Studio",
    },
    type: "file",
    kind: "document",
    summary: {
      en: "Database management tool for SQL Server used across .NET backend projects.",
      ar: "أداة إدارة قاعدة البيانات لـ SQL Server المستخدمة عبر مشاريع باك إند .NET.",
    },
    sections: [
      {
        heading: { en: "What this tool is", ar: "ما هذا الأداة" },
        content: {
          en: "SSMS is used to manage, query, and inspect SQL Server databases directly. It provides the GUI for creating tables, running queries, and managing stored procedures.",
          ar: "يُستخدم SSMS لإدارة واستعلام وفحص قواعد بيانات SQL Server مباشرة. يوفر واجهة رسومية لإنشاء الجداول وتشغيل الاستعلامات وإجراءات التخزين المخزنة.",
        },
      },
      {
        heading: { en: "What Nour uses it for", ar: "لماذا يستخدمها نور" },
        content: {
          en: "Database management tasks.",
          ar: "مهام إدارة قاعدة البيانات.",
        },
        kind: "list",
        items: [
          {
            en: "Writing and testing SQL queries",
            ar: "كتابة واختبار استعلامات SQL",
          },
          {
            en: "Inspecting database schemas and table structures",
            ar: "فحص مخططات قاعدة البيانات وهيكل الجداول",
          },
          {
            en: "Managing migrations and seed data",
            ar: "إدارة الترحيل والبيانات الأولية",
          },
        ],
      },
    ],
    tags: ["database", "sql", "sqlserver", "ssms"],
    relatedFileIds: ["knowledge-efcore", "knowledge-dotnet"],
    relatedProjectSlugs: ["bookify", "blood-bank-desktop"],
    public: false,
    parentId: "apps",
    children: [],
  },
  {
    id: "app-mongodb-compass",
    name: { en: "MongoDB Compass", ar: "MongoDB Compass" },
    type: "file",
    kind: "document",
    summary: {
      en: "GUI for MongoDB used to explore and inspect document-based data.",
      ar: "واجهة رسومية لـ MongoDB مستخدمة لاستكشاف وفحص البيانات المبنية على المستندات.",
    },
    sections: [
      {
        heading: { en: "What this tool is", ar: "ما هذا الأداة" },
        content: {
          en: "MongoDB Compass provides a visual interface for exploring collections, running queries, and inspecting documents in MongoDB databases.",
          ar: "توفر MongoDB Compass واجهة بصرية لاستكشاف المجموعات وتشغيل الاستعلامات وفحص المستندات في قواعد بيانات MongoDB.",
        },
      },
      {
        heading: { en: "What Nour uses it for", ar: "لماذا يستخدمها نور" },
        content: { en: "MongoDB data inspection.", ar: "فحص بيانات MongoDB." },
        kind: "list",
        items: [
          {
            en: "Exploring document collections and schemas",
            ar: "استكشاف مجموعات المستندات والمخططات",
          },
          {
            en: "Running and debugging aggregation pipelines",
            ar: "تشغيل وتنقيح خطوط أنابيب التجميع",
          },
        ],
      },
    ],
    tags: ["database", "mongodb", "nosql", "compass"],
    relatedFileIds: ["knowledge-javascript"],
    relatedProjectSlugs: ["buildsense"],
    public: false,
    parentId: "apps",
    children: [],
  },
  {
    id: "app-unity",
    name: { en: "Unity", ar: "Unity" },
    type: "file",
    kind: "document",
    summary: {
      en: "Game engine and 3D environment used for interactive scene prototyping.",
      ar: "محرك ألعاب وبيئة ثلاثية الأبعاد مستخدمة لنموذج المشاهد التفاعلية.",
    },
    sections: [
      {
        heading: { en: "What this tool is", ar: "ما هذا الأداة" },
        content: {
          en: "Unity is used for 3D scene prototyping and interactive environment work, particularly for the portfolio room concept.",
          ar: "يُستخدم Unity لنموذج المشاهد ثلاثية الأبعاد والعمل على البيئات التفاعلية، خاصة لمفهوم غرفة المحفظة.",
        },
      },
      {
        heading: { en: "What Nour uses it for", ar: "لماذا يستخدمها نور" },
        content: {
          en: "3D prototyping tasks.",
          ar: "مهام النموذج الأولي ثلاثي الأبعاد.",
        },
        kind: "list",
        items: [
          {
            en: "Prototyping 3D room scenes and lighting setups",
            ar: "نموذج مشاهد الغرف ثلاثية الأبعاد وإعدادات الإضاءة",
          },
          {
            en: "Testing camera angles and spatial compositions",
            ar: "اختبار زوايا الكاميرا والتراكيب المكانية",
          },
        ],
      },
    ],
    tags: ["3d", "engine", "unity", "prototyping"],
    relatedFileIds: [],
    relatedProjectSlugs: [],
    public: false,
    parentId: "apps",
    children: [],
  },
  {
    id: "app-blender",
    name: { en: "Blender", ar: "Blender" },
    type: "file",
    kind: "document",
    summary: {
      en: "Open-source 3D modeling and rendering tool for visual asset creation.",
      ar: "أداة نمذجة وعرض مفتوحة المصدر ثلاثية الأبعاد لإنشاء الأصول البصرية.",
    },
    sections: [
      {
        heading: { en: "What this tool is", ar: "ما هذا الأداة" },
        content: {
          en: "Blender is used for 3D modeling, material setup, and rendering experiments for portfolio scene assets.",
          ar: "يُستخدم Blender للنمذجة ثلاثية الأبعاد وإعداد المواد وتجارب العرض لأصول مشاهد المحفظة.",
        },
      },
      {
        heading: { en: "What Nour uses it for", ar: "لماذا يستخدمها نور" },
        content: {
          en: "3D content creation tasks.",
          ar: "مهام إنشاء المحتوى ثلاثي الأبعاد.",
        },
        kind: "list",
        items: [
          {
            en: "3D modeling and material setup for scene assets",
            ar: "النمذجة ثلاثية الأبعاد وإعداد المواد لأصول المشاهد",
          },
          {
            en: "Rendering preview images of spatial compositions",
            ar: "عرض صور معاينة للتركيبات المكانية",
          },
          {
            en: "Importing and arranging third-party 3D models",
            ar: "استيراد وترتيب نماذج طرف ثالث ثلاثية الأبعاد",
          },
        ],
      },
    ],
    tags: ["3d", "modeling", "blender", "rendering"],
    relatedFileIds: [],
    relatedProjectSlugs: [],
    public: false,
    parentId: "apps",
    children: [],
  },
  {
    id: "app-discord",
    name: { en: "Discord", ar: "Discord" },
    type: "file",
    kind: "document",
    summary: {
      en: "Communication platform for project collaboration and community engagement.",
      ar: "منصة تواصل للتعاون في المشاريع والمشاركة في المجتمعات.",
    },
    sections: [
      {
        heading: { en: "What this tool is", ar: "ما هذا الأداة" },
        content: {
          en: "Discord is used for real-time communication with development communities, project collaboration, and staying updated with technology discussions.",
          ar: "يُستخدم Discord للتواصل في الوقت الفعلي مع مجتمعات التطوير والتعاون في المشاريع ومتابعة مناقشات التقنية.",
        },
      },
      {
        heading: { en: "What Nour uses it for", ar: "لماذا يستخدمها نور" },
        content: {
          en: "Communication and collaboration.",
          ar: "التواصل والتعاون.",
        },
        kind: "list",
        items: [
          {
            en: "Communicating with development communities",
            ar: "التواصل مع مجتمعات التطوير",
          },
          {
            en: "Collaborating on projects with remote teammates",
            ar: "التعاون في المشاريع مع أعضاء الفريق عن بُعد",
          },
          {
            en: "Screen sharing for code reviews",
            ar: "مشاركة الشاشة لمراجعة الكود",
          },
        ],
      },
    ],
    tags: ["communication", "chat", "community", "discord"],
    relatedFileIds: [],
    relatedProjectSlugs: [],
    public: false,
    parentId: "apps",
    children: [],
  },
  {
    id: "app-steam",
    name: { en: "Steam", ar: "Steam" },
    type: "file",
    kind: "document",
    summary: {
      en: "Gaming platform and distribution service for PC gaming.",
      ar: "منصة ألعاب وخدمة توزيع لألعاب الكمبيوتر.",
    },
    sections: [
      {
        heading: { en: "What this tool is", ar: "ما هذا الأداة" },
        content: {
          en: "Steam is the primary platform for PC gaming, providing game distribution, community features, and game development tools.",
          ar: "Steam هو المنصة الرئيسية لألعاب الكمبيوتر، توفر توزيع الألعاب والميزات المجتمعية وأدوات تطوير الألعاب.",
        },
      },
      {
        heading: { en: "What Nour uses it for", ar: "لماذا يستخدمها نور" },
        content: {
          en: "Gaming and design research.",
          ar: "الألعاب وبحث التصميم.",
        },
        kind: "list",
        items: [
          {
            en: "Playing and testing PC games",
            ar: "تشغيل واختبار ألعاب الكمبيوتر",
          },
          {
            en: "Discovering indie games for design inspiration",
            ar: "اكتشاف ألعاب indie للإلهام التصميمي",
          },
        ],
      },
    ],
    tags: ["gaming", "platform", "steam", "indie"],
    relatedFileIds: [],
    relatedProjectSlugs: [],
    public: false,
    parentId: "apps",
    children: [],
  },
  {
    id: "app-bitwarden",
    name: { en: "Bitwarden", ar: "Bitwarden" },
    type: "file",
    kind: "document",
    summary: {
      en: "Open-source password manager for secure credential storage.",
      ar: "مدير كلمات مرور مفتوح المصدر لتخزين بيانات الاعتماد بشكل آمن.",
    },
    sections: [
      {
        heading: { en: "What this tool is", ar: "ما هذا الأداة" },
        content: {
          en: "Bitwarden manages passwords, secure notes, and authentication tokens across all development accounts.",
          ar: "يُدير Bitwarden كلمات المرور والملاحظات الآمنة ورموز المصادقة عبر جميع حسابات التطوير.",
        },
      },
      {
        heading: { en: "What Nour uses it for", ar: "لماذا يستخدمها نور" },
        content: {
          en: "Security and credential management.",
          ar: "الأمان وإدارة بيانات الاعتماد.",
        },
        kind: "list",
        items: [
          {
            en: "Managing passwords for development accounts",
            ar: "إدارة كلمات مرور حسابات التطوير",
          },
          {
            en: "Storing secure notes and API keys safely",
            ar: "تخزين ملاحظات آمنة ومفاتيح API بأمان",
          },
          {
            en: "Generating strong, unique passwords",
            ar: "إنشاء كلمات مرور قوية وفريدة",
          },
        ],
      },
    ],
    tags: ["security", "password", "vault", "bitwarden"],
    relatedFileIds: [],
    relatedProjectSlugs: [],
    public: false,
    parentId: "apps",
    children: [],
  },
  {
    id: "ai-skills-overview",
    name: { en: "AI Skills Library", ar: "مكتبة مهارات الذكاء الاصطناعي" },
    type: "file",
    kind: "skill",
    summary: {
      en: "Reusable capabilities that give coding agents focused methods and quality rules.",
      ar: "قدرات قابلة لإعادة الاستخدام تمنح وكلاء البرمجة أساليب مركزة وقواعد جودة.",
    },
    sections: [
      {
        heading: { en: "Engineering quality", ar: "جودة الهندسة" },
        content: {
          en: "Guard skills review production code, tests, documentation, and security-sensitive changes before delivery.",
          ar: "تراجع مهارات الحماية كود الإنتاج والاختبارات والتوثيق والتغييرات الحساسة أمنياً قبل التسليم.",
        },
        kind: "list",
        items: [
          { en: "Clean Code Guard", ar: "مراجعة نظافة الكود" },
          { en: "Test Guard", ar: "مراجعة الاختبارات" },
          { en: "Docs Guard", ar: "مراجعة التوثيق" },
          { en: "Security Review", ar: "المراجعة الأمنية" },
        ],
      },
      {
        heading: { en: "Planning and delivery", ar: "التخطيط والتسليم" },
        content: {
          en: "Planning, interrogation, delegation, and skill-building capabilities structure complex work before implementation.",
          ar: "تنظم قدرات التخطيط والاستجواب والتفويض وبناء المهارات العمل المعقد قبل التنفيذ.",
        },
        kind: "list",
        items: [
          { en: "Planner and Grill Me", ar: "التخطيط واختبار القرارات" },
          { en: "Codex Delegation", ar: "تفويض مهام البرمجة" },
          { en: "Skill Creator", ar: "إنشاء وتقييم المهارات" },
        ],
      },
      {
        heading: { en: "Knowledge and visualization", ar: "المعرفة والتصور" },
        content: {
          en: "Obsidian, Canvas, Mermaid, Excalidraw, and content-extraction skills turn source material into connected, reviewable knowledge.",
          ar: "تحول مهارات Obsidian وCanvas وMermaid وExcalidraw واستخراج المحتوى المواد المصدرية إلى معرفة مترابطة قابلة للمراجعة.",
        },
      },
      {
        heading: {
          en: "Frontend, motion, and Unity",
          ar: "الواجهات والحركة وUnity",
        },
        content: {
          en: "Specialized frontend, GSAP, interaction, and Unity architecture skills provide focused implementation patterns without mixing responsibilities.",
          ar: "توفر مهارات الواجهات وGSAP والتفاعل وهندسة Unity أنماط تنفيذ متخصصة دون خلط المسؤوليات.",
        },
      },
    ],
    tags: [
      "ai",
      "skills",
      "quality",
      "planning",
      "obsidian",
      "unity",
      "motion",
    ],
    relatedFileIds: ["ai-agents-overview", "workflow-validating-ai-code"],
    relatedProjectSlugs: [],
    public: false,
    parentId: "workflows",
    children: [],
  },
  {
    id: "ai-agents-overview",
    name: { en: "Agent Team", ar: "فريق الوكلاء" },
    type: "file",
    kind: "workflow",
    summary: {
      en: "Specialized agents divide discovery, implementation, and content quality into reviewable roles.",
      ar: "يقسم الوكلاء المتخصصون الاستكشاف والتنفيذ وجودة المحتوى إلى أدوار قابلة للمراجعة.",
    },
    sections: [
      {
        heading: { en: "Software delivery", ar: "تسليم البرمجيات" },
        content: {
          en: "The manager owns scope and review, the explorer maps the relevant code, and the writer implements bounded changes with validation.",
          ar: "يدير الوكيل المسؤول النطاق والمراجعة، ويستكشف وكيل المشروع الكود المطلوب، وينفذ وكيل الكتابة تغييرات محددة مع التحقق.",
        },
        kind: "list",
        items: [
          {
            en: "Manager — scope, planning, coordination, review",
            ar: "المدير — النطاق والتخطيط والتنسيق والمراجعة",
          },
          {
            en: "Project Explorer — focused read-only discovery",
            ar: "مستكشف المشروع — استكشاف مركز للقراءة فقط",
          },
          {
            en: "Code Writer — scoped implementation and validation",
            ar: "كاتب الكود — تنفيذ محدد والتحقق",
          },
        ],
      },
      {
        heading: { en: "Summary pipeline", ar: "خط إنتاج الملخصات" },
        content: {
          en: "An orchestrator assigns units, workers summarize, reviewers compare against sources, and fixers apply only required corrections.",
          ar: "يوزع المنسق الوحدات، ويلخص العمال، ويقارن المراجعون بالمصادر، ويطبق المصححون التعديلات المطلوبة فقط.",
        },
        kind: "list",
        items: [
          { en: "Course Summary Orchestrator", ar: "منسق ملخصات الدورات" },
          { en: "Course Summary Worker", ar: "عامل تلخيص الدورات" },
          { en: "Course Summary Reviewer", ar: "مراجع ملخصات الدورات" },
          { en: "Course Summary Fixer", ar: "مصحح ملخصات الدورات" },
        ],
      },
    ],
    tags: ["ai", "agents", "delegation", "review", "workflow"],
    relatedFileIds: ["ai-skills-overview", "workflow-requirements-to-code"],
    relatedProjectSlugs: [],
    public: false,
    parentId: "workflows",
    children: [],
  },
  ...aiResourceNodes,
  {
    id: "certifications",
    name: { en: "04 Certifications", ar: "04 الشهادات" },
    type: "folder",
    kind: "folder",
    summary: {
      en: "Completed programs and courses across .NET, databases, algorithms, frontend, Unity, and professional development.",
      ar: "برامج ودورات مكتملة في .NET وقواعد البيانات والخوارزميات والواجهات وUnity والتطوير المهني.",
    },
    tags: ["certificates", "courses", "learning"],
    relatedFileIds: ["about", "skill-dotnet-backend"],
    relatedProjectSlugs: [],
    public: true,
    parentId: "this-pc",
    children: ["certifications-overview"],
  },
  {
    id: "certifications-overview",
    name: { en: "Certificate Library", ar: "مكتبة الشهادات" },
    type: "file",
    kind: "collection",
    summary: {
      en: "A complete, equal-weight view of 37 course and program certificates.",
      ar: "عرض كامل ومتساوي الأهمية لـ37 شهادة دورة وبرنامج.",
    },
    media: certificateGallery,
    sections: [
      {
        heading: { en: "Programs", ar: "البرامج" },
        content: {
          en: "Long-form professional development programs.",
          ar: "برامج تطوير مهني ممتدة.",
        },
        kind: "list",
        items: [
          {
            en: "DEPI — Full Stack .NET Web Developer",
            ar: "DEPI — مطور ويب Full Stack .NET",
          },
          {
            en: "DEPI — Business English Track",
            ar: "DEPI — مسار اللغة الإنجليزية للأعمال",
          },
        ],
      },
      {
        heading: { en: "Udemy", ar: "Udemy" },
        content: {
          en: "Project-led frontend and game-development courses.",
          ar: "دورات عملية في الواجهات وتطوير الألعاب.",
        },
        kind: "list",
        items: [
          { en: "Tailwind CSS From Scratch", ar: "Tailwind CSS من البداية" },
          {
            en: "Complete C# Unity 3D Game Development in Unity 6",
            ar: "تطوير ألعاب Unity 3D باستخدام C# وUnity 6",
          },
        ],
      },
      {
        heading: { en: "ITI Mahara-Tech", ar: "ITI Mahara-Tech" },
        content: {
          en: "Database foundations and Transact-SQL.",
          ar: "أساسيات قواعد البيانات وTransact-SQL.",
        },
        kind: "list",
        items: [
          { en: "Database Fundamentals", ar: "أساسيات قواعد البيانات" },
          { en: "Introduction to Databases", ar: "مقدمة إلى قواعد البيانات" },
          {
            en: "Transact-SQL Queries Using SQL Server",
            ar: "استعلامات Transact-SQL باستخدام SQL Server",
          },
        ],
      },
      {
        heading: { en: "ProgrammingAdvices", ar: "ProgrammingAdvices" },
        content: {
          en: "A progressive track from programming foundations to backend engineering.",
          ar: "مسار متدرج من أساسيات البرمجة إلى هندسة الباك إند.",
        },
        kind: "list",
        items: [
          {
            en: "Programming Foundations — Levels 1 and 2",
            ar: "أساسيات البرمجة — المستويان 1 و2",
          },
          {
            en: "Algorithms & Problem Solving — Levels 1 through 6",
            ar: "الخوارزميات وحل المشكلات — المستويات 1 إلى 6",
          },
          {
            en: "C++ Programming — Levels 1 and 2",
            ar: "برمجة C++ — المستويان 1 و2",
          },
          {
            en: "OOP Concepts and Applications",
            ar: "مفاهيم وتطبيقات البرمجة كائنية التوجه",
          },
          {
            en: "Data Structures — Levels 1 and 2",
            ar: "هياكل البيانات — المستويان 1 و2",
          },
          {
            en: "C# Programming — Levels 1 and 2",
            ar: "برمجة C# — المستويان 1 و2",
          },
          {
            en: "SQL and Database Projects — Levels 1 and 2",
            ar: "SQL ومشاريع قواعد البيانات — المستويان 1 و2",
          },
          {
            en: "C# Database Connectivity and Full Real Project",
            ar: "ربط C# بقواعد البيانات ومشروع عملي كامل",
          },
          {
            en: "RESTful APIs, Secure APIs, and Windows Services",
            ar: "RESTful APIs وتأمين APIs وخدمات Windows",
          },
          {
            en: "SOLID Principles and EF Core Fundamentals",
            ar: "مبادئ SOLID وأساسيات EF Core",
          },
          { en: "HTML and CSS Deep Dive", ar: "تعمق في HTML وCSS" },
        ],
      },
    ],
    tags: [
      "certificates",
      ".net",
      "algorithms",
      "database",
      "frontend",
      "unity",
    ],
    relatedFileIds: ["skill-dotnet-backend", "skill-engineering-practice"],
    relatedProjectSlugs: [],
    public: true,
    parentId: "certifications",
    children: [],
  },
  {
    id: "obsidian-vault",
    name: { en: "07 Obsidian Vault", ar: "07 خزانة Obsidian" },
    type: "folder",
    kind: "folder",
    summary: {
      en: "How Nour captures, organizes, connects, and retrieves technical knowledge.",
      ar: "كيف يجمع نور المعرفة التقنية وينظمها ويربطها ويسترجعها.",
    },
    tags: ["obsidian", "vault", "knowledge management", "linked thinking"],
    relatedFileIds: ["app-obsidian", "resource-wf-course-pipeline"],
    relatedProjectSlugs: [],
    public: true,
    parentId: "this-pc",
    children: ["obsidian-vault-overview", "obsidian-vault-preview"],
  },
  {
    id: "obsidian-vault-overview",
    name: { en: "How My Vault Works", ar: "كيف تعمل خزانتي" },
    type: "file",
    kind: "collection",
    summary: {
      en: "A technical learning system built around an extended PARA structure and linked notes.",
      ar: "نظام تعلم تقني مبني على هيكل PARA موسع وملاحظات مترابطة.",
    },
    presentation: "vault-structure",
    downloadName: "obsidian-vault-structure.md",
    sections: [
      {
        heading: { en: "Structure", ar: "الهيكل" },
        content: {
          en: "The vault separates navigation, active projects, ongoing areas, reference material, archives, media, and an AI-assisted workspace layer.",
          ar: "تفصل الخزانة بين التنقل والمشاريع النشطة والمجالات المستمرة والمواد المرجعية والأرشيف والوسائط وطبقة عمل بمساعدة الذكاء الاصطناعي.",
        },
        kind: "list",
        items: [
          {
            en: "Index — capture, templates, and navigation",
            ar: "الفهرس — الجمع والقوالب والتنقل",
          },
          { en: "Projects — active outcomes", ar: "المشاريع — النتائج النشطة" },
          {
            en: "Areas — ongoing responsibilities and learning",
            ar: "المجالات — المسؤوليات والتعلم المستمر",
          },
          {
            en: "Resources — technical knowledge library",
            ar: "المصادر — مكتبة المعرفة التقنية",
          },
          {
            en: "Archive, Extras, and Agent workspace",
            ar: "الأرشيف والإضافات ومساحة عمل الوكلاء",
          },
        ],
      },
      {
        heading: { en: "Privacy-safe structure", ar: "هيكل آمن للخصوصية" },
        content: {
          en: "vault/\n├── 00 Index/\n│   ├── Templates/\n│   └── Inbox/ [content excluded]\n├── 01 Projects/\n│   ├── Documentation & requirements/\n│   ├── Backend/\n│   ├── Frontend/\n│   └── UI/\n├── 02 Areas/\n│   ├── Main dashboards/\n│   ├── Learning & Programming/\n│   ├── Personal/ [content excluded]\n│   └── College/ [content excluded]\n├── 03 Resources/\n│   ├── Web Development/\n│   ├── CS Fundamentals/\n│   ├── System Design & Architecture/\n│   ├── AI & LLMs/\n│   ├── Cybersecurity/\n│   └── Productivity & Tools/\n├── 04 Archive/ [content excluded]\n├── 05 Extras/\n└── 06 Agent/ [private profiles and automation excluded]",
          ar: "vault/\n├── 00 Index/\n│   ├── Templates/\n│   └── Inbox/ [المحتوى مستبعد]\n├── 01 Projects/\n│   ├── Documentation & requirements/\n│   ├── Backend/\n│   ├── Frontend/\n│   └── UI/\n├── 02 Areas/\n│   ├── Main dashboards/\n│   ├── Learning & Programming/\n│   ├── Personal/ [المحتوى مستبعد]\n│   └── College/ [المحتوى مستبعد]\n├── 03 Resources/\n│   ├── Web Development/\n│   ├── CS Fundamentals/\n│   ├── System Design & Architecture/\n│   ├── AI & LLMs/\n│   ├── Cybersecurity/\n│   └── Productivity & Tools/\n├── 04 Archive/ [المحتوى مستبعد]\n├── 05 Extras/\n└── 06 Agent/ [الملفات الشخصية والأتمتة مستبعدة]",
        },
        kind: "code",
      },
      {
        heading: { en: "Linked thinking", ar: "التفكير المترابط" },
        content: {
          en: "Wikilinks connect hub notes, projects, learning areas, resources, and workflows so related material can be reached from more than one path.",
          ar: "تربط wikilinks ملاحظات المحاور والمشاريع ومجالات التعلم والمصادر وسير العمل حتى يمكن الوصول إلى المواد المرتبطة من أكثر من مسار.",
        },
      },
      {
        heading: { en: "Knowledge workflow", ar: "سير عمل المعرفة" },
        content: {
          en: "A repeatable path from raw input to reusable knowledge.",
          ar: "مسار متكرر من المدخل الخام إلى معرفة قابلة لإعادة الاستخدام.",
        },
        kind: "steps",
        items: [
          {
            en: "Capture material in the inbox or a project context.",
            ar: "اجمع المادة في صندوق الوارد أو سياق مشروع.",
          },
          {
            en: "Classify it into Projects, Areas, Resources, or Archive.",
            ar: "صنفها إلى مشاريع أو مجالات أو مصادر أو أرشيف.",
          },
          {
            en: "Connect related notes with links, tags, and frontmatter.",
            ar: "اربط الملاحظات ذات الصلة بالروابط والوسوم والبيانات الوصفية.",
          },
          {
            en: "Use queries, dashboards, and reviews to retrieve and maintain it.",
            ar: "استخدم الاستعلامات ولوحات المتابعة والمراجعات لاسترجاعها وصيانتها.",
          },
        ],
      },
      {
        heading: { en: "Tools inside the vault", ar: "أدوات داخل الخزانة" },
        content: {
          en: "Dataview, Tasks, Canvas, Templater, QuickAdd, Kanban, Excalidraw, Bases, RTL support, and GitHub Sync extend the plain-Markdown foundation.",
          ar: "توسع Dataview وTasks وCanvas وTemplater وQuickAdd وKanban وExcalidraw وBases ودعم RTL وGitHub Sync أساس Markdown البسيط.",
        },
      },
    ],
    tags: ["obsidian", "para", "wikilinks", "dataview", "canvas", "pkm"],
    relatedFileIds: [
      "app-obsidian",
      "resource-wf-course-pipeline",
      "knowledge-met",
    ],
    relatedProjectSlugs: [],
    public: true,
    parentId: "obsidian-vault",
    children: [],
  },
  {
    id: "obsidian-vault-preview",
    name: { en: "Vault Visual Preview", ar: "معاينة شكل الخزانة" },
    type: "file",
    kind: "collection",
    summary: {
      en: "A privacy-safe reconstruction of the configured Obsidian dashboard, canvas, and linked-note experience.",
      ar: "إعادة بناء آمنة للخصوصية لشكل لوحة Obsidian وCanvas وتجربة الملاحظات المترابطة المهيأة.",
    },
    presentation: "vault-preview",
    downloadName: "obsidian-vault-visual-preview.md",
    sections: [
      {
        heading: { en: "Visual language", ar: "اللغة البصرية" },
        content: {
          en: "The vault uses the GitHub theme at an 18px base size with custom dashboard and canvas snippets: rounded groups, soft shadows, colored borders, a gradient dashboard header, and RTL-aware task layouts.",
          ar: "تستخدم الخزانة سمة GitHub بحجم أساسي 18px مع تنسيقات مخصصة للوحة وCanvas: مجموعات مستديرة وظلال ناعمة وحدود ملونة ورأس متدرج وتخطيطات مهام تدعم RTL.",
        },
      },
      {
        heading: { en: "Startup canvas", ar: "لوحة البداية" },
        content: {
          en: "Obsidian opens a task canvas organized into three working columns plus a separate leisure area. The preview uses generic labels because live tasks and recent-file history are private.",
          ar: "يفتح Obsidian لوحة مهام منظمة في ثلاثة أعمدة عمل مع مساحة منفصلة للراحة. تستخدم المعاينة تسميات عامة لأن المهام الفعلية وسجل الملفات الحديثة خاصان.",
        },
        kind: "callout",
      },
      {
        heading: { en: "Connected navigation", ar: "التنقل المترابط" },
        content: {
          en: "Index notes, Dataview dashboards, wikilinks, canvases, and project hubs provide multiple paths into the same knowledge without duplicating source notes.",
          ar: "توفر ملاحظات الفهرسة ولوحات Dataview وروابط wikilink ولوحات Canvas ومحاور المشاريع مسارات متعددة لنفس المعرفة دون تكرار الملاحظات المصدرية.",
        },
      },
    ],
    tags: ["obsidian", "dashboard", "canvas", "preview", "privacy-safe"],
    relatedFileIds: ["obsidian-vault-overview", "app-obsidian"],
    relatedProjectSlugs: [],
    public: true,
    parentId: "obsidian-vault",
    children: [],
  },
  {
    id: "app-antigravity",
    name: { en: "Antigravity", ar: "Antigravity" },
    type: "file",
    kind: "document",
    summary: {
      en: "Google AI Pro backup for AI-assisted coding.",
      ar: "أداة احتياطية للبرمجة بمساعدة الذكاء الاصطناعي عبر Google AI Pro.",
    },
    sections: [
      {
        heading: { en: "Place in the workflow", ar: "مكانها في سير العمل" },
        content: {
          en: "Nour uses Antigravity as a backup when his main AI coding tools run out, keeping development work moving through a second model ecosystem.",
          ar: "يستخدم نور Antigravity كأداة احتياطية عند نفاد حدود أدوات البرمجة الأساسية بالذكاء الاصطناعي، ليستمر العمل عبر منظومة نماذج ثانية.",
        },
      },
    ],
    tags: ["ai", "google", "coding", "backup"],
    relatedFileIds: ["ai-skills-folder"],
    relatedProjectSlugs: [],
    public: true,
    parentId: "apps",
    children: [],
  },
  {
    id: "app-opencode",
    name: { en: "OpenCode CLI", ar: "OpenCode CLI" },
    type: "file",
    kind: "document",
    summary: {
      en: "Terminal-native coding agent for end-to-end repository work.",
      ar: "وكيل برمجة يعمل من الطرفية لإدارة العمل الكامل داخل المستودع.",
    },
    sections: [
      {
        heading: { en: "Why it is essential", ar: "لماذا هو أساسي" },
        content: {
          en: "OpenCode brings codebase exploration, implementation, commands, testing, review, and Git workflows into one model-agnostic terminal interface.",
          ar: "يجمع OpenCode استكشاف قاعدة الكود والتنفيذ والأوامر والاختبارات والمراجعة وسير عمل Git في واجهة طرفية واحدة تدعم نماذج متعددة.",
        },
      },
      {
        heading: { en: "Core uses", ar: "الاستخدامات الأساسية" },
        content: {
          en: "Daily AI-assisted engineering tasks.",
          ar: "مهام هندسية يومية بمساعدة الذكاء الاصطناعي.",
        },
        kind: "list",
        items: [
          {
            en: "Features, bug fixes, refactors, and migrations",
            ar: "الميزات وإصلاح الأخطاء وإعادة الهيكلة والترحيل",
          },
          {
            en: "Code review, testing, builds, and validation",
            ar: "مراجعة الكود والاختبارات والبناء والتحقق",
          },
          {
            en: "Repository-wide exploration and Git workflows",
            ar: "استكشاف المستودع وسير عمل Git",
          },
        ],
      },
    ],
    tags: ["ai", "cli", "coding agent", "terminal", "git"],
    relatedFileIds: ["ai-skills-folder", "ai-agents-folder"],
    relatedProjectSlugs: [],
    public: true,
    parentId: "apps",
    children: [],
  },
  {
    id: "app-notebooklm",
    name: { en: "NotebookLM", ar: "NotebookLM" },
    type: "file",
    kind: "document",
    summary: {
      en: "Grounded research notebook with source citations.",
      ar: "دفتر بحث يعتمد على المصادر ويقدم استشهادات.",
    },
    sections: [
      {
        heading: { en: "How it helps", ar: "كيف يساعد" },
        content: {
          en: "NotebookLM turns supplied documents, transcripts, pages, and videos into a focused conversational knowledge base whose answers cite the original material.",
          ar: "يحول NotebookLM المستندات والنصوص والصفحات والفيديوهات المضافة إلى قاعدة معرفة حوارية مركزة تستشهد بالمادة الأصلية.",
        },
      },
      {
        heading: { en: "Core uses", ar: "الاستخدامات الأساسية" },
        content: {
          en: "Research and learning from large source sets.",
          ar: "البحث والتعلم من مجموعات كبيرة من المصادر.",
        },
        kind: "list",
        items: [
          { en: "Course and lecture analysis", ar: "تحليل الدورات والمحاضرات" },
          {
            en: "Comparing evidence across sources",
            ar: "مقارنة الأدلة بين المصادر",
          },
          {
            en: "Following cited answers back to source material",
            ar: "العودة من الإجابات المستشهدة إلى المادة المصدرية",
          },
        ],
      },
    ],
    tags: ["ai", "research", "citations", "learning"],
    relatedFileIds: ["knowledge-met", "resource-wf-course-pipeline"],
    relatedProjectSlugs: [],
    public: true,
    parentId: "apps",
    children: [],
  },
  {
    id: "app-hermes",
    name: { en: "Hermes Agent", ar: "Hermes Agent" },
    type: "file",
    kind: "document",
    summary: {
      en: "Local personal agent with memory, schedules, skills, and tools.",
      ar: "وكيل شخصي محلي بذاكرة ومهام مجدولة ومهارات وأدوات.",
    },
    sections: [
      {
        heading: { en: "What makes it different", ar: "ما الذي يميزه" },
        content: {
          en: "Hermes Agent combines persistent memory, scheduled tasks, reusable skills, terminal tools, messaging integrations, and sub-agent delegation in a customizable local framework.",
          ar: "يجمع Hermes Agent الذاكرة المستمرة والمهام المجدولة والمهارات القابلة لإعادة الاستخدام وأدوات الطرفية وتكاملات المراسلة وتفويض الوكلاء في إطار محلي قابل للتخصيص.",
        },
      },
      {
        heading: { en: "Core uses", ar: "الاستخدامات الأساسية" },
        content: {
          en: "Long-running and repeatable assistance.",
          ar: "مساعدة مستمرة وقابلة للتكرار.",
        },
        kind: "list",
        items: [
          {
            en: "Personal automation and scheduled workflows",
            ar: "الأتمتة الشخصية وسير العمل المجدول",
          },
          {
            en: "Research, note-taking, and coding support",
            ar: "دعم البحث وتدوين الملاحظات والبرمجة",
          },
          {
            en: "Multi-agent delegation for complex tasks",
            ar: "تفويض متعدد الوكلاء للمهام المعقدة",
          },
        ],
      },
    ],
    tags: ["ai", "agent", "memory", "automation", "skills"],
    relatedFileIds: ["ai-agents-folder", "ai-skills-folder"],
    relatedProjectSlugs: [],
    public: true,
    parentId: "apps",
    children: [],
  },
];
