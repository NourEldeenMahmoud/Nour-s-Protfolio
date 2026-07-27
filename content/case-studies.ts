import type { ProjectSlug } from "@/content/portfolio";
import type { Locale } from "@/i18n/routing";

export type LocalizedCaseStudyText = Record<Locale, string>;

export type CaseStudyDecision = {
  title: LocalizedCaseStudyText;
  decision: LocalizedCaseStudyText;
  rationale: LocalizedCaseStudyText;
  tradeoff: LocalizedCaseStudyText;
  alternatives?: LocalizedCaseStudyText[];
};

export type CaseStudyArchitecture = {
  summary: LocalizedCaseStudyText;
  nodes: Array<{
    id: string;
    label: LocalizedCaseStudyText;
    detail: LocalizedCaseStudyText;
  }>;
  links: Array<[string, string]>;
};

export type CaseStudyEvidence = {
  type?: "image" | "video";
  src: string;
  poster?: string;
  alt: LocalizedCaseStudyText;
  caption: LocalizedCaseStudyText;
  kind: "product" | "architecture" | "workflow";
  portrait?: boolean;
};

type DetailedPoint = {
  title: LocalizedCaseStudyText;
  detail: LocalizedCaseStudyText;
};

type FeatureStory = DetailedPoint & {
  implementation: LocalizedCaseStudyText;
};

type ChallengeStory = DetailedPoint & {
  response: LocalizedCaseStudyText;
};

export type CaseStudy = {
  projectSlug: ProjectSlug;
  projectType: LocalizedCaseStudyText;
  teamContext: LocalizedCaseStudyText;
  role: LocalizedCaseStudyText;
  problem: LocalizedCaseStudyText;
  audience: LocalizedCaseStudyText;
  constraints: LocalizedCaseStudyText[];
  investigation: DetailedPoint[];
  decisions?: CaseStudyDecision[];
  architecture: CaseStudyArchitecture;
  features: FeatureStory[];
  challenges?: ChallengeStory[];
  quality?: DetailedPoint[];
  outcome: LocalizedCaseStudyText;
  nextStep?: LocalizedCaseStudyText;
  evidence: CaseStudyEvidence[];
};

const text = (en: string, ar: string): LocalizedCaseStudyText => ({ en, ar });

export const caseStudies: Record<ProjectSlug, CaseStudy> = {
  buildsense: {
    projectSlug: "buildsense",
    projectType: text(
      "Solo product / full-stack system",
      "منتج فردي / نظام متكامل",
    ),
    teamContext: text("Individual project", "مشروع فردي"),
    role: text(
      "Product design, Angular interfaces, Express API, ingestion worker, compatibility rules, and shared Nx packages.",
      "تصميم المنتج وواجهات Angular وواجهة Express وعامل جمع البيانات وقواعد التوافق وحزم Nx المشتركة.",
    ),
    problem: text(
      "Egyptian PC shoppers had to reconcile fragmented retailer catalogs, duplicate product listings, uneven specifications, and uncertain part compatibility on their own.",
      "كان على مشتري مكونات الحاسوب في مصر التوفيق بأنفسهم بين كتالوجات متاجر متفرقة وقوائم منتجات مكررة ومواصفات متفاوتة وتوافق غير مؤكد بين القطع.",
    ),
    audience: text(
      "People comparing PC components and planning a build across local retailers.",
      "الأشخاص الذين يقارنون مكونات الحاسوب ويخططون لتجميعة عبر المتاجر المحلية.",
    ),
    constraints: [
      text(
        "Retailer data differs in naming, structure, completeness, and availability.",
        "تختلف بيانات المتاجر في التسمية والبنية والاكتمال والتوفر.",
      ),
      text(
        "Compatibility cannot be claimed when the required source facts are missing.",
        "لا يمكن تأكيد التوافق عند غياب الحقائق المطلوبة من المصدر.",
      ),
      text(
        "Some protected pages require approved browser captures rather than direct HTTP collection.",
        "تتطلب بعض الصفحات المحمية لقطات متصفح معتمدة بدلاً من الجمع المباشر عبر HTTP.",
      ),
    ],
    investigation: [
      {
        title: text("Identity before aggregation", "الهوية قبل التجميع"),
        detail: text(
          "Cross-store offers need exact product identity evidence before they can be presented as the same component.",
          "تحتاج عروض المتاجر المختلفة إلى دليل دقيق على هوية المنتج قبل عرضها كمكوّن واحد.",
        ),
      },
      {
        title: text(
          "Uncertainty is a product state",
          "عدم اليقين حالة داخل المنتج",
        ),
        detail: text(
          "Missing sockets, dimensions, wattage, or interface facts must remain visible instead of being interpreted as compatibility.",
          "يجب أن تظل حقائق المقابس والأبعاد والطاقة والواجهات الناقصة ظاهرة بدلاً من تفسيرها كتوافق.",
        ),
      },
      {
        title: text(
          "Separate request work from ingestion",
          "فصل الطلبات عن جمع البيانات",
        ),
        detail: text(
          "Catalog requests and long-running store ingestion have different reliability and execution needs.",
          "تختلف احتياجات الاعتمادية والتنفيذ بين طلبات الكتالوج وعمليات جمع بيانات المتاجر الطويلة.",
        ),
      },
    ],
    decisions: [
      {
        title: text("Evidence-gated compatibility", "توافق مشروط بالأدلة"),
        decision: text(
          "Return compatible, warning, incompatible, or unknown with rule reasons and missing facts.",
          "إرجاع متوافق أو تحذير أو غير متوافق أو غير معروف مع أسباب القاعدة والحقائق الناقصة.",
        ),
        rationale: text(
          "Unknown preserves user trust when source coverage or verified precision is insufficient.",
          "تحافظ حالة غير معروف على ثقة المستخدم عندما تكون تغطية المصادر أو دقتها غير كافية.",
        ),
        tradeoff: text(
          "The interface exposes incomplete data rather than producing a simpler but misleading answer.",
          "تعرض الواجهة نقص البيانات بدلاً من تقديم إجابة أبسط لكنها مضللة.",
        ),
        alternatives: [
          text(
            "Treat absent facts as compatible, rejected because absence is not evidence.",
            "اعتبار الحقائق الغائبة متوافقة، وتم رفضه لأن الغياب ليس دليلاً.",
          ),
        ],
      },
      {
        title: text("Dedicated ingestion worker", "عامل مستقل لجمع البيانات"),
        decision: text(
          "Keep discovery, capture, parsing, publishing, and fact extraction outside HTTP requests.",
          "إبقاء الاكتشاف والالتقاط والتحليل والنشر واستخراج الحقائق خارج طلبات HTTP.",
        ),
        rationale: text(
          "Store-scoped runs can be resumed and background jobs can be claimed independently by the worker.",
          "يمكن استئناف عمليات كل متجر ومعالجة المهام الخلفية بشكل مستقل بواسطة العامل.",
        ),
        tradeoff: text(
          "The system gains an additional runtime application and operational boundary.",
          "يضيف النظام تطبيق تشغيل وحداً تشغيلياً إضافياً.",
        ),
      },
    ],
    architecture: {
      summary: text(
        "An Nx monorepo separates the Angular public/admin UI, Express API, ingestion worker, MongoDB, and shared domain packages.",
        "يفصل مستودع Nx بين واجهة Angular العامة والإدارية وواجهة Express وعامل جمع البيانات وMongoDB وحزم النطاق المشتركة.",
      ),
      nodes: [
        {
          id: "stores",
          label: text("Retailers", "المتاجر"),
          detail: text("Pages and approved captures", "صفحات ولقطات معتمدة"),
        },
        {
          id: "worker",
          label: text("Worker", "العامل"),
          detail: text(
            "Discover, snapshot, parse, match",
            "اكتشاف ولقطات وتحليل ومطابقة",
          ),
        },
        {
          id: "database",
          label: text("MongoDB", "MongoDB"),
          detail: text(
            "Catalog, offers, builds, jobs",
            "الكتالوج والعروض والتجميعات والمهام",
          ),
        },
        {
          id: "api",
          label: text("Express API", "واجهة Express"),
          detail: text(
            "Catalog, builds, admin",
            "الكتالوج والتجميعات والإدارة",
          ),
        },
        {
          id: "web",
          label: text("Angular UI", "واجهة Angular"),
          detail: text(
            "Public and admin experiences",
            "التجربتان العامة والإدارية",
          ),
        },
      ],
      links: [
        ["stores", "worker"],
        ["worker", "database"],
        ["database", "api"],
        ["api", "web"],
      ],
    },
    features: [
      {
        title: text("Persistent PC builder", "أداة تجميع مستمرة"),
        detail: text(
          "Eight component slots retain a public build and its compatibility state.",
          "تحتفظ ثمانية مواضع للمكونات بتجميعة عامة وحالة توافقها.",
        ),
        implementation: text(
          "Candidate search, offer comparison, rule reasons, and missing facts are connected to each slot.",
          "يرتبط البحث عن المرشحين ومقارنة العروض وأسباب القواعد والحقائق الناقصة بكل موضع.",
        ),
      },
      {
        title: text("Multi-store catalog", "كتالوج متعدد المتاجر"),
        detail: text(
          "Product pages combine verified specifications with known retailer offers.",
          "تجمع صفحات المنتجات بين المواصفات المتحققة وعروض المتاجر المعروفة.",
        ),
        implementation: text(
          "Immutable snapshots, normalization, identity matching, and idempotent offer publishing preserve provenance.",
          "تحافظ اللقطات غير القابلة للتغيير والتوحيد ومطابقة الهوية والنشر المتكرر بأمان على مصدر البيانات.",
        ),
      },
      {
        title: text("Purchase plan", "خطة شراء"),
        detail: text(
          "A completed build becomes a store-by-store purchase checklist.",
          "تتحول التجميعة المكتملة إلى قائمة شراء منظمة حسب المتجر.",
        ),
        implementation: text(
          "The plan includes quantities, retailer links, estimated total, JSON export, and print-to-PDF support.",
          "تشمل الخطة الكميات وروابط المتاجر والإجمالي التقديري وتصدير JSON والطباعة إلى PDF.",
        ),
      },
    ],
    challenges: [
      {
        title: text("Cross-store product identity", "هوية المنتج عبر المتاجر"),
        detail: text(
          "Similar names do not prove that two retailer listings represent the same component.",
          "تشابه الأسماء لا يثبت أن قائمتين من متجرين تمثلان المكوّن نفسه.",
        ),
        response: text(
          "The pipeline requires exact identity evidence before offers are linked.",
          "تتطلب المنظومة دليلاً دقيقاً على الهوية قبل ربط العروض.",
        ),
      },
      {
        title: text("Protected retailer pages", "صفحات المتاجر المحمية"),
        detail: text(
          "Not every source supports reliable direct HTTP discovery.",
          "لا يدعم كل مصدر اكتشافاً موثوقاً عبر HTTP مباشرة.",
        ),
        response: text(
          "Specific adapters accept approved browser-capture manifests while retaining the same snapshot pipeline.",
          "تقبل موصلات محددة قوائم لقطات متصفح معتمدة مع الحفاظ على مسار اللقطات نفسه.",
        ),
      },
    ],
    quality: [
      {
        title: text("Security", "الأمان"),
        detail: text(
          "Helmet, CORS, scrypt, opaque sessions, CSRF, and origin validation protect the administration surface.",
          "تحمي Helmet وCORS وscrypt والجلسات غير الشفافة وCSRF والتحقق من المصدر واجهة الإدارة.",
        ),
      },
      {
        title: text("Reliability", "الاعتمادية"),
        detail: text(
          "Immutable snapshots, idempotent publishing, resumable runs, request IDs, and readiness/liveness endpoints make failures inspectable.",
          "تجعل اللقطات غير القابلة للتغيير والنشر الآمن والاستئناف ومعرفات الطلب ونقاط الجاهزية الأعطال قابلة للفحص.",
        ),
      },
      {
        title: text("Validation", "التحقق"),
        detail: text(
          "The repository includes Vitest, MongoDB Memory Server, Playwright, axe-core, CI, and strict TypeScript.",
          "يتضمن المستودع Vitest وMongoDB Memory Server وPlaywright وaxe-core وCI وTypeScript الصارم.",
        ),
      },
    ],
    outcome: text(
      "A public decision-support catalog, eight-slot builder, compatibility engine, purchase plan, admin console, and multi-store ingestion pipeline are implemented and documented.",
      "تم تنفيذ وتوثيق كتالوج عام لدعم القرار وأداة تجميع بثمانية مواضع ومحرك توافق وخطة شراء ووحدة إدارة ومنظومة جمع متعددة المتاجر.",
    ),
    nextStep: text(
      "Compatibility remains evidence-gated; expanding reliable source facts is more important than presenting unsupported certainty.",
      "يظل التوافق مشروطاً بالأدلة؛ وتوسيع الحقائق الموثوقة من المصادر أهم من تقديم يقين غير مدعوم.",
    ),
    evidence: [
      {
        src: "/case-studies/buildsense/home.webp",
        alt: text(
          "BuildSense catalog home page",
          "الصفحة الرئيسية لكتالوج BuildSense",
        ),
        caption: text(
          "Exhibit A / unified product discovery",
          "الدليل أ / اكتشاف موحد للمنتجات",
        ),
        kind: "product",
      },
      {
        src: "/case-studies/buildsense/pc-builder.webp",
        alt: text(
          "BuildSense PC builder workspace",
          "مساحة تجميع الحاسوب في BuildSense",
        ),
        caption: text(
          "Exhibit B / persistent eight-slot builder",
          "الدليل ب / أداة تجميع مستمرة بثمانية مواضع",
        ),
        kind: "workflow",
      },
      {
        src: "/case-studies/buildsense/admin-compatibility.webp",
        alt: text(
          "BuildSense compatibility quality review",
          "مراجعة جودة التوافق في BuildSense",
        ),
        caption: text(
          "Exhibit C / evidence coverage and rule readiness",
          "الدليل ج / تغطية الأدلة وجاهزية القواعد",
        ),
        kind: "architecture",
      },
      {
        src: "/case-studies/buildsense/purchase-plan.webp",
        alt: text("BuildSense purchase plan", "خطة شراء BuildSense"),
        caption: text(
          "Exhibit D / store-by-store execution plan",
          "الدليل د / خطة تنفيذ حسب المتجر",
        ),
        kind: "workflow",
      },
    ],
  },
  bookify: {
    projectSlug: "bookify",
    projectType: text(
      "Team project / .NET full-stack",
      "مشروع جماعي / .NET متكامل",
    ),
    teamContext: text(
      "Six-person university team; Nour was team leader and backend contributor.",
      "فريق جامعي من ستة أشخاص؛ كان نور قائد الفريق ومطوراً للباك إند.",
    ),
    role: text(
      "Backend, booking and payment flows, identity and security, backend architecture, and frontend leadership.",
      "الباك إند وتدفقات الحجز والدفع والهوية والأمان وهندسة الباك إند وقيادة الواجهة الأمامية.",
    ),
    problem: text(
      "Customers need trustworthy date-based room availability and payment, while hotel staff need one controlled surface for rooms, bookings, refunds, and users.",
      "يحتاج العملاء إلى توفر موثوق للغرف حسب التاريخ ودفع آمن، بينما يحتاج موظفو الفندق إلى واجهة موحدة للغرف والحجوزات والاسترداد والمستخدمين.",
    ),
    audience: text(
      "Hotel guests and staff administering inventory, bookings, and customer accounts.",
      "نزلاء الفندق والموظفون المسؤولون عن المخزون والحجوزات وحسابات العملاء.",
    ),
    constraints: [
      text(
        "Availability and booking state must remain consistent across overlapping requests.",
        "يجب أن تظل حالة التوفر والحجز متسقة عبر الطلبات المتداخلة.",
      ),
      text(
        "Payment, refund, and email integrations introduce external failure boundaries.",
        "تضيف تكاملات الدفع والاسترداد والبريد حدود فشل خارجية.",
      ),
      text(
        "Customer and administrator capabilities require strict role separation.",
        "تتطلب صلاحيات العملاء والإدارة فصلاً صارماً للأدوار.",
      ),
    ],
    investigation: [
      {
        title: text("Booking integrity", "سلامة الحجز"),
        detail: text(
          "Date-range search, availability checks, checkout, and payment confirmation must agree on the same room state.",
          "يجب أن تتفق نتائج البحث حسب التاريخ وفحوصات التوفر وإتمام الحجز وتأكيد الدفع على حالة الغرفة نفسها.",
        ),
      },
      {
        title: text("Boundary security", "أمان الحدود"),
        detail: text(
          "Forms, cookies, uploads, roles, and payment callbacks each require explicit validation and authorization.",
          "تحتاج النماذج وملفات الارتباط والرفع والأدوار واستدعاءات الدفع إلى تحقق وصلاحيات صريحة.",
        ),
      },
      {
        title: text("Operational visibility", "وضوح التشغيل"),
        detail: text(
          "Database, email, and payment dependencies need independent health checks and structured logs.",
          "تحتاج قاعدة البيانات والبريد والدفع إلى فحوصات صحة مستقلة وسجلات منظمة.",
        ),
      },
    ],
    decisions: [
      {
        title: text("N-tier boundaries", "حدود متعددة الطبقات"),
        decision: text(
          "Separate MVC presentation, services, and EF Core data access with repositories and Unit of Work.",
          "فصل عرض MVC والخدمات والوصول للبيانات عبر EF Core باستخدام Repository وUnit of Work.",
        ),
        rationale: text(
          "Business rules and integrations remain outside controllers while transactions coordinate repository work.",
          "تظل قواعد الأعمال والتكاملات خارج وحدات التحكم بينما تنسق المعاملات عمل المستودعات.",
        ),
        tradeoff: text(
          "More explicit layers and contracts increase project structure and navigation cost.",
          "تزيد الطبقات والعقود الصريحة من حجم البنية وتكلفة التنقل داخل المشروع.",
        ),
      },
      {
        title: text("Stripe Payment Intents", "Stripe Payment Intents"),
        decision: text(
          "Use Payment Intents with confirmation and refund support rather than treating checkout as a local status change.",
          "استخدام Payment Intents مع التأكيد والاسترداد بدلاً من معاملة الدفع كتغيير حالة محلي.",
        ),
        rationale: text(
          "Payment lifecycle and idempotency remain aligned with the payment provider.",
          "تظل دورة حياة الدفع والتكرار الآمن متوافقين مع مزود الدفع.",
        ),
        tradeoff: text(
          "The booking workflow must handle an external state machine and configuration dependency.",
          "يجب أن يتعامل تدفق الحجز مع آلة حالات خارجية واعتماد على الإعدادات.",
        ),
      },
    ],
    architecture: {
      summary: text(
        "ASP.NET Core MVC delegates booking, payment, availability, identity, and email work to services over EF Core repositories and SQL Server.",
        "يفوض ASP.NET Core MVC أعمال الحجز والدفع والتوفر والهوية والبريد إلى خدمات فوق مستودعات EF Core وSQL Server.",
      ),
      nodes: [
        {
          id: "web",
          label: text("MVC web", "ويب MVC"),
          detail: text(
            "Controllers, Razor, ViewModels",
            "وحدات تحكم وRazor وViewModels",
          ),
        },
        {
          id: "services",
          label: text("Services", "الخدمات"),
          detail: text(
            "Booking, availability, payment, email",
            "الحجز والتوفر والدفع والبريد",
          ),
        },
        {
          id: "data",
          label: text("Data layer", "طبقة البيانات"),
          detail: text(
            "EF Core, repositories, Unit of Work",
            "EF Core وRepository وUnit of Work",
          ),
        },
        {
          id: "sql",
          label: text("SQL Server", "SQL Server"),
          detail: text("Rooms, bookings, identity", "الغرف والحجوزات والهوية"),
        },
        {
          id: "external",
          label: text("External services", "خدمات خارجية"),
          detail: text("Stripe and SendGrid", "Stripe وSendGrid"),
        },
      ],
      links: [
        ["web", "services"],
        ["services", "data"],
        ["data", "sql"],
        ["services", "external"],
      ],
    },
    features: [
      {
        title: text("Availability-led discovery", "اكتشاف قائم على التوفر"),
        detail: text(
          "Guests search rooms by date range, type, price, and occupancy.",
          "يبحث الضيوف عن الغرف حسب التاريخ والنوع والسعر والإشغال.",
        ),
        implementation: text(
          "RoomAvailabilityService centralizes checks before room selection and booking.",
          "تجمع RoomAvailabilityService فحوصات التوفر قبل اختيار الغرفة والحجز.",
        ),
      },
      {
        title: text("Booking and payment", "الحجز والدفع"),
        detail: text(
          "A booking summary leads into Stripe payment and confirmation email.",
          "يقود ملخص الحجز إلى الدفع عبر Stripe وبريد التأكيد.",
        ),
        implementation: text(
          "Payment intents, idempotency support, booking status, payment history, and refund operations preserve the lifecycle.",
          "تحافظ Payment Intents ودعم التكرار الآمن وحالة الحجز وسجل الدفع والاسترداد على دورة الحياة.",
        ),
      },
      {
        title: text("Hotel administration", "إدارة الفندق"),
        detail: text(
          "Staff manage rooms, room types, bookings, refunds, users, and operational summaries.",
          "يدير الموظفون الغرف وأنواعها والحجوزات والاسترداد والمستخدمين والملخصات التشغيلية.",
        ),
        implementation: text(
          "Role-protected admin controllers use services and ViewModels rather than exposing entities directly.",
          "تستخدم وحدات الإدارة المحمية بالأدوار الخدمات وViewModels بدلاً من كشف الكيانات مباشرة.",
        ),
      },
    ],
    challenges: [
      {
        title: text("Concurrent booking state", "تزامن حالة الحجز"),
        detail: text(
          "Room state can change between availability search and booking completion.",
          "قد تتغير حالة الغرفة بين البحث عن التوفر وإتمام الحجز.",
        ),
        response: text(
          "The documented design uses RowVersion optimistic concurrency and coordinated transactions.",
          "يستخدم التصميم الموثق RowVersion للتزامن التفاؤلي ومعاملات منسقة.",
        ),
      },
      {
        title: text("External service health", "صحة الخدمات الخارجية"),
        detail: text(
          "A working web process does not guarantee database, SendGrid, or Stripe readiness.",
          "تشغيل عملية الويب لا يضمن جاهزية قاعدة البيانات أو SendGrid أو Stripe.",
        ),
        response: text(
          "Dedicated health checks report each dependency independently through a health UI.",
          "تعرض فحوصات صحة مخصصة حالة كل اعتماد بشكل مستقل عبر واجهة الصحة.",
        ),
      },
    ],
    quality: [
      {
        title: text("Security", "الأمان"),
        detail: text(
          "ASP.NET Identity, RBAC, lockout, secure cookies, antiforgery validation, Razor encoding, and upload validation protect account and admin workflows.",
          "تحمي ASP.NET Identity وRBAC والقفل وملفات الارتباط الآمنة وAntiforgery وترميز Razor والتحقق من الرفع تدفقات الحساب والإدارة.",
        ),
      },
      {
        title: text("Data integrity", "سلامة البيانات"),
        detail: text(
          "EF Core parameterization, ViewModels, RowVersion, Unit of Work, and migrations keep input and persistence boundaries explicit.",
          "تجعل معلمات EF Core وViewModels وRowVersion وUnit of Work والترحيلات حدود الإدخال والتخزين صريحة.",
        ),
      },
      {
        title: text("Operations", "التشغيل"),
        detail: text(
          "Serilog rolling logs and database, payment, and email health checks expose system state.",
          "تكشف سجلات Serilog الدورية وفحوصات قاعدة البيانات والدفع والبريد حالة النظام.",
        ),
      },
    ],
    outcome: text(
      "The team delivered customer booking and payment journeys plus an administration surface for rooms, bookings, refunds, users, and operational views.",
      "سلّم الفريق تدفقات الحجز والدفع للعملاء إلى جانب واجهة إدارة للغرف والحجوزات والاسترداد والمستخدمين والمشاهد التشغيلية.",
    ),
    nextStep: text(
      "The previously listed deployment was unreachable during review, so the repository remains the verified delivery evidence.",
      "تعذر الوصول إلى النسخة المنشورة المذكورة سابقاً أثناء المراجعة، لذلك يظل المستودع هو دليل التسليم المتحقق منه.",
    ),
    evidence: [
      {
        src: "/case-studies/bookify/home.webp",
        alt: text(
          "Bookify hotel search home page",
          "الصفحة الرئيسية للبحث في Bookify",
        ),
        caption: text(
          "Exhibit A / customer entry point",
          "الدليل أ / نقطة دخول العميل",
        ),
        kind: "product",
      },
      {
        src: "/case-studies/bookify/booking.webp",
        alt: text("Bookify reservation checkout", "إتمام الحجز في Bookify"),
        caption: text("Exhibit B / booking handoff", "الدليل ب / انتقال الحجز"),
        kind: "workflow",
      },
      {
        src: "/case-studies/bookify/database-erd.webp",
        alt: text(
          "Bookify database relationship diagram",
          "مخطط علاقات قاعدة بيانات Bookify",
        ),
        caption: text(
          "Exhibit C / persistent domain",
          "الدليل ج / نطاق البيانات الدائم",
        ),
        kind: "architecture",
      },
      {
        src: "/case-studies/bookify/admin-dashboard.webp",
        alt: text("Bookify administration dashboard", "لوحة إدارة Bookify"),
        caption: text(
          "Exhibit D / staff operations",
          "الدليل د / عمليات الموظفين",
        ),
        kind: "workflow",
      },
    ],
  },
  "blood-bank-desktop": {
    projectSlug: "blood-bank-desktop",
    projectType: text(
      "University team project / desktop operations",
      "مشروع جامعي جماعي / عمليات مكتبية",
    ),
    teamContext: text(
      "Two contributors are listed in the public repository.",
      "يذكر المستودع العام مساهمين اثنين.",
    ),
    role: text(
      "Nour reports implementing most of the system; sole ownership is not claimed.",
      "يذكر نور أنه نفذ معظم النظام ولا يدعي الملكية الفردية الكاملة.",
    ),
    problem: text(
      "Blood-bank staff need one traceable workflow for donors, units, tests, inventory, patients, transfusions, and employee access.",
      "يحتاج موظفو بنك الدم إلى تدفق واحد قابل للتتبع للمتبرعين والوحدات والفحوصات والمخزون والمرضى ونقل الدم وصلاحيات الموظفين.",
    ),
    audience: text(
      "Donation-center employees and administrators.",
      "موظفو مراكز التبرع والمسؤولون.",
    ),
    constraints: [
      text(
        "Blood compatibility, test results, expiration, and unit allocation are domain rules, not presentation details.",
        "التوافق ونتائج الفحوصات والصلاحية وتخصيص الوحدات قواعد نطاق وليست تفاصيل عرض.",
      ),
      text(
        "Medical and employee records require validation and role-controlled access.",
        "تتطلب السجلات الطبية وسجلات الموظفين تحققاً ووصولاً محكوماً بالأدوار.",
      ),
    ],
    investigation: [
      {
        title: text("Unit lifecycle", "دورة حياة الوحدة"),
        detail: text(
          "A blood unit must remain traceable from donation through testing, inventory, transfusion, or disposal.",
          "يجب أن تظل وحدة الدم قابلة للتتبع من التبرع عبر الفحص والمخزون ونقل الدم أو التخلص منها.",
        ),
      },
      {
        title: text("Operational roles", "الأدوار التشغيلية"),
        detail: text(
          "Staff accounts need controlled access to donor, patient, inventory, and reporting capabilities.",
          "تحتاج حسابات الموظفين إلى وصول محكوم لوظائف المتبرعين والمرضى والمخزون والتقارير.",
        ),
      },
    ],
    decisions: [
      {
        title: text(
          "Three-tier desktop architecture",
          "بنية مكتبية ثلاثية الطبقات",
        ),
        decision: text(
          "Separate Windows Forms presentation, business rules, and SQL Server data access.",
          "فصل عرض Windows Forms وقواعد الأعمال والوصول إلى SQL Server.",
        ),
        rationale: text(
          "Compatibility, expiration, validation, and allocation rules stay outside form event handlers.",
          "تبقى قواعد التوافق والصلاحية والتحقق والتخصيص خارج معالجات أحداث النماذج.",
        ),
        tradeoff: text(
          "The solution carries explicit projects and mappings across each layer.",
          "يحمل الحل مشاريع وربطاً صريحاً عبر كل طبقة.",
        ),
      },
    ],
    architecture: {
      summary: text(
        "A Windows Forms presentation layer calls business services that enforce rules before ADO.NET data access reaches SQL Server.",
        "تستدعي طبقة عرض Windows Forms خدمات الأعمال التي تطبق القواعد قبل وصول ADO.NET إلى SQL Server.",
      ),
      nodes: [
        {
          id: "ui",
          label: text("WinForms UI", "واجهة WinForms"),
          detail: text("Dashboard and workflows", "لوحة وتدفقات العمل"),
        },
        {
          id: "business",
          label: text("Business layer", "طبقة الأعمال"),
          detail: text("Validation and domain rules", "التحقق وقواعد النطاق"),
        },
        {
          id: "data",
          label: text("Data access", "الوصول للبيانات"),
          detail: text("Database operations", "عمليات قاعدة البيانات"),
        },
        {
          id: "sql",
          label: text("SQL Server", "SQL Server"),
          detail: text("Operational records", "السجلات التشغيلية"),
        },
      ],
      links: [
        ["ui", "business"],
        ["business", "data"],
        ["data", "sql"],
      ],
    },
    features: [
      {
        title: text("Donation and inventory", "التبرع والمخزون"),
        detail: text(
          "Staff register donors, process donations, test units, and monitor stock and expiry.",
          "يسجل الموظفون المتبرعين ويعالجون التبرعات ويفحصون الوحدات ويراقبون المخزون والصلاحية.",
        ),
        implementation: text(
          "Business rules cover compatibility, automatic expiry detection, test results, low-stock alerts, and unit status.",
          "تغطي قواعد الأعمال التوافق واكتشاف انتهاء الصلاحية ونتائج الفحص وتنبيهات المخزون وحالة الوحدة.",
        ),
      },
      {
        title: text("Transfusion workflow", "تدفق نقل الدم"),
        detail: text(
          "Patient requests connect to matching and blood-unit allocation.",
          "ترتبط طلبات المرضى بالمطابقة وتخصيص وحدات الدم.",
        ),
        implementation: text(
          "The system records request, match, allocation, and transfusion history through the same operational domain.",
          "يسجل النظام الطلب والمطابقة والتخصيص وسجل نقل الدم داخل النطاق التشغيلي نفسه.",
        ),
      },
    ],
    quality: [
      {
        title: text("Security", "الأمان"),
        detail: text(
          "The repository documents authentication, role-based access, sanitization, and audit logging for critical operations.",
          "يوثق المستودع المصادقة والصلاحيات حسب الدور وتنقية البيانات وسجل التدقيق للعمليات الحرجة.",
        ),
      },
      {
        title: text("Reliability", "الاعتمادية"),
        detail: text(
          "Expiration detection and unit traceability keep inventory state connected to operational history.",
          "يربط اكتشاف انتهاء الصلاحية وتتبع الوحدات حالة المخزون بالسجل التشغيلي.",
        ),
      },
    ],
    outcome: text(
      "The team delivered a three-tier desktop system covering donor, patient, employee, unit, donation, transfusion, matching, and reporting workflows.",
      "سلّم الفريق نظاماً مكتبياً ثلاثي الطبقات يغطي تدفقات المتبرعين والمرضى والموظفين والوحدات والتبرع ونقل الدم والمطابقة والتقارير.",
    ),
    nextStep: text(
      "Exact teammate attribution, test coverage, and a code-verified cross-platform architecture diagram remain documentation gaps.",
      "ما زال توثيق مساهمات أعضاء الفريق وتغطية الاختبارات ومخطط بنية متعدد المنصات متحقق منه من الكود غير مكتمل.",
    ),
    evidence: [
      {
        src: "/case-studies/blood-bank-desktop/dashboard-redacted.webp",
        alt: text(
          "Redacted Blood Bank operations dashboard",
          "لوحة عمليات بنك الدم بعد حجب البيانات",
        ),
        caption: text(
          "Exhibit A / operational overview, personal data redacted",
          "الدليل أ / نظرة تشغيلية مع حجب البيانات الشخصية",
        ),
        kind: "workflow",
      },
    ],
  },
  "blood-bank-mobile": {
    projectSlug: "blood-bank-mobile",
    projectType: text(
      "University team project / mobile and API",
      "مشروع جامعي جماعي / موبايل وAPI",
    ),
    teamContext: text(
      "Part of the wider university Blood Bank platform.",
      "جزء من منصة بنك الدم الجامعية الأوسع.",
    ),
    role: text(
      "Nour reports implementing most of the wider platform; module ownership percentages are not published.",
      "يذكر نور أنه نفذ معظم المنصة الأوسع ولا تُنشر نسب ملكية الوحدات.",
    ),
    problem: text(
      "Donors need mobile access to registration, appointments, history, and updates that remains connected to staff operations.",
      "يحتاج المتبرعون إلى وصول عبر الموبايل للتسجيل والمواعيد والسجل والتحديثات مع بقاء التجربة متصلة بعمليات الموظفين.",
    ),
    audience: text(
      "Blood donors using a mobile device and staff processing their appointments.",
      "المتبرعون عبر الهاتف والموظفون الذين يعالجون مواعيدهم.",
    ),
    constraints: [
      text(
        "Mobile, API, desktop, and SQL Server state must describe the same appointment workflow.",
        "يجب أن تصف حالة الموبايل وAPI وسطح المكتب وSQL Server تدفق الموعد نفسه.",
      ),
      text(
        "Authentication and donor medical details cross a network boundary.",
        "تعبر المصادقة والتفاصيل الطبية للمتبرع حداً شبكياً.",
      ),
    ],
    investigation: [
      {
        title: text(
          "End-to-end appointment state",
          "حالة الموعد من البداية للنهاية",
        ),
        detail: text(
          "A mobile booking becomes staff-visible work, then a processed donation and donor update.",
          "يتحول الحجز عبر الموبايل إلى عمل ظاهر للموظف ثم تبرع معالج وتحديث للمتبرع.",
        ),
      },
      {
        title: text("Mobile service boundary", "حد خدمات الموبايل"),
        detail: text(
          "Screens and Provider state should consume structured REST services rather than database concerns.",
          "يجب أن تستهلك الشاشات وحالة Provider خدمات REST منظمة بدلاً من تفاصيل قاعدة البيانات.",
        ),
      },
    ],
    architecture: {
      summary: text(
        "Flutter screens and Provider state call an ASP.NET Core 6 REST API connected to the shared SQL Server domain used by staff operations.",
        "تستدعي شاشات Flutter وحالة Provider واجهة REST على ASP.NET Core 6 متصلة بنطاق SQL Server المشترك مع عمليات الموظفين.",
      ),
      nodes: [
        {
          id: "mobile",
          label: text("Flutter app", "تطبيق Flutter"),
          detail: text("Screens, Provider, services", "شاشات وProvider وخدمات"),
        },
        {
          id: "api",
          label: text("ASP.NET API", "واجهة ASP.NET"),
          detail: text("Controllers and services", "وحدات تحكم وخدمات"),
        },
        {
          id: "sql",
          label: text("SQL Server", "SQL Server"),
          detail: text("Shared operational data", "بيانات تشغيلية مشتركة"),
        },
        {
          id: "desktop",
          label: text("Staff desktop", "سطح مكتب الموظفين"),
          detail: text("Appointment processing", "معالجة المواعيد"),
        },
      ],
      links: [
        ["mobile", "api"],
        ["api", "sql"],
        ["desktop", "sql"],
      ],
    },
    features: [
      {
        title: text("Donor account", "حساب المتبرع"),
        detail: text(
          "Registration, login, profile, blood details, and donation history are available on mobile.",
          "يتوفر التسجيل والدخول والملف وبيانات الدم وسجل التبرع على الموبايل.",
        ),
        implementation: text(
          "Flutter organizes models, routes, screens, services, widgets, and Provider state around REST responses.",
          "ينظم Flutter النماذج والمسارات والشاشات والخدمات والعناصر وحالة Provider حول استجابات REST.",
        ),
      },
      {
        title: text("Appointment workflow", "تدفق الموعد"),
        detail: text(
          "Donors select a date, time, and location and receive a confirmation state.",
          "يختار المتبرع التاريخ والوقت والموقع ويحصل على حالة تأكيد.",
        ),
        implementation: text(
          "The API persists the appointment for staff processing against the shared database.",
          "تحفظ API الموعد لمعالجته بواسطة الموظفين في قاعدة البيانات المشتركة.",
        ),
      },
      {
        title: text("Notifications", "الإشعارات"),
        detail: text(
          "The interface includes appointment, request, and system notification states.",
          "تتضمن الواجهة حالات إشعارات المواعيد والطلبات والنظام.",
        ),
        implementation: text(
          "Published documentation describes notification flows, while deployment behavior remains an evidence gap.",
          "يصف التوثيق المنشور تدفقات الإشعارات بينما يظل سلوك النشر فجوة في الأدلة.",
        ),
      },
    ],
    challenges: [
      {
        title: text("Cross-application consistency", "الاتساق عبر التطبيقات"),
        detail: text(
          "A donor action must become coherent work in a separate desktop application.",
          "يجب أن يتحول إجراء المتبرع إلى عمل متسق داخل تطبيق مكتبي منفصل.",
        ),
        response: text(
          "Both clients connect through the documented API/shared SQL Server workflow instead of maintaining isolated records.",
          "يتصل العميلان عبر تدفق API وSQL Server المشترك الموثق بدلاً من الاحتفاظ بسجلات معزولة.",
        ),
      },
    ],
    quality: [
      {
        title: text("API security", "أمان API"),
        detail: text(
          "The repository documents JWT authentication, CORS support, Swagger, and structured error handling.",
          "يوثق المستودع مصادقة JWT ودعم CORS وSwagger ومعالجة الأخطاء المنظمة.",
        ),
      },
      {
        title: text("Maintainability", "قابلية الصيانة"),
        detail: text(
          "Models, providers, routes, screens, services, utilities, and widgets have explicit Flutter responsibilities.",
          "للنماذج وProvider والمسارات والشاشات والخدمات والأدوات والعناصر مسؤوليات Flutter صريحة.",
        ),
      },
    ],
    outcome: text(
      "The repository delivers a donor-facing Flutter application, ASP.NET Core API, shared database setup, and documented appointment-to-donation workflow.",
      "يقدم المستودع تطبيق Flutter للمتبرعين وواجهة ASP.NET Core وإعداد قاعدة بيانات مشتركة وتدفقاً موثقاً من الموعد إلى التبرع.",
    ),
    nextStep: text(
      "Notification behavior, deployment status, automated tests, and the exact desktop/API/mobile data flow need stronger published evidence.",
      "تحتاج الإشعارات وحالة النشر والاختبارات الآلية وتدفق البيانات الدقيق بين سطح المكتب وAPI والموبايل إلى أدلة منشورة أقوى.",
    ),
    evidence: [
      {
        src: "/case-studies/blood-bank-mobile/home.webp",
        alt: text(
          "Blood Bank donor mobile home",
          "الشاشة الرئيسية لتطبيق متبرعي بنك الدم",
        ),
        caption: text(
          "Exhibit A / donor account overview",
          "الدليل أ / نظرة عامة على حساب المتبرع",
        ),
        kind: "product",
        portrait: true,
      },
      {
        src: "/case-studies/blood-bank-mobile/appointment-schedule.webp",
        alt: text("Blood Bank appointment scheduling", "جدولة موعد التبرع"),
        caption: text(
          "Exhibit B / appointment entry",
          "الدليل ب / إدخال الموعد",
        ),
        kind: "workflow",
        portrait: true,
      },
      {
        src: "/case-studies/blood-bank-mobile/notifications.webp",
        alt: text("Blood Bank mobile notifications", "إشعارات تطبيق بنك الدم"),
        caption: text(
          "Exhibit C / donor update states",
          "الدليل ج / حالات تحديث المتبرع",
        ),
        kind: "workflow",
        portrait: true,
      },
    ],
  },
  dvld: {
    projectSlug: "dvld",
    projectType: text(
      "Desktop system / rules-heavy domain",
      "نظام مكتبي / نطاق كثيف القواعد",
    ),
    teamContext: text(
      "Contributor breakdown is not published.",
      "لا ينشر المستودع توزيعاً للمساهمين.",
    ),
    role: text(
      "The repository verifies implementation scope but not detailed individual attribution.",
      "يثبت المستودع نطاق التنفيذ دون إسناد فردي تفصيلي.",
    ),
    problem: text(
      "A licensing department must coordinate people, applications, staged tests, fees, license states, users, and enforcement history without losing domain rules.",
      "يجب على جهة التراخيص تنسيق الأشخاص والطلبات والاختبارات المرحلية والرسوم وحالات الرخص والمستخدمين وسجل الإجراءات دون فقد قواعد النطاق.",
    ),
    audience: text(
      "Government licensing staff managing applicants, drivers, tests, and licenses.",
      "موظفو جهات التراخيص الذين يديرون المتقدمين والسائقين والاختبارات والرخص.",
    ),
    constraints: [
      text(
        "Eligibility, age, test sequence, fees, validity, and detainment rules vary by operation and license class.",
        "تختلف قواعد الأهلية والعمر وتسلسل الاختبارات والرسوم والصلاحية والحجز حسب العملية وفئة الرخصة.",
      ),
      text(
        "Personal and credential data requires controlled user access.",
        "تتطلب البيانات الشخصية وبيانات الدخول وصولاً محكوماً للمستخدمين.",
      ),
    ],
    investigation: [
      {
        title: text("Lifecycle before screens", "دورة الحياة قبل الشاشات"),
        detail: text(
          "New licenses, renewals, replacements, international permits, and detainment share records but enforce different prerequisites.",
          "تشترك الرخص الجديدة والتجديد والاستبدال والرخص الدولية والحجز في السجلات مع متطلبات مختلفة.",
        ),
      },
      {
        title: text("Staged test progression", "تقدم الاختبارات المرحلي"),
        detail: text(
          "Vision, theory, and practical tests require appointments, results, retakes, and ordered eligibility.",
          "تحتاج اختبارات النظر والنظري والعملي إلى مواعيد ونتائج وإعادات وأهلية مرتبة.",
        ),
      },
    ],
    decisions: [
      {
        title: text("Three-tier rule separation", "فصل القواعد عبر ثلاث طبقات"),
        decision: text(
          "Keep Windows Forms, business rules, and ADO.NET persistence in separate projects.",
          "إبقاء Windows Forms وقواعد الأعمال والتخزين عبر ADO.NET في مشاريع منفصلة.",
        ),
        rationale: text(
          "Licensing prerequisites and state transitions remain reusable across forms.",
          "تظل متطلبات الترخيص وانتقالات الحالة قابلة لإعادة الاستخدام عبر النماذج.",
        ),
        tradeoff: text(
          "Mappings and calls cross explicit layer boundaries for each workflow.",
          "تعبر عمليات الربط والاستدعاء حدود طبقات صريحة لكل تدفق.",
        ),
      },
    ],
    architecture: {
      summary: text(
        "Windows Forms presentation calls a business layer that applies licensing rules before ADO.NET commands reach SQL Server.",
        "يستدعي عرض Windows Forms طبقة أعمال تطبق قواعد الترخيص قبل وصول أوامر ADO.NET إلى SQL Server.",
      ),
      nodes: [
        {
          id: "ui",
          label: text("DVLD UI", "واجهة DVLD"),
          detail: text("Forms and navigation", "نماذج وتنقل"),
        },
        {
          id: "business",
          label: text("Business rules", "قواعد الأعمال"),
          detail: text("Eligibility and lifecycle", "الأهلية ودورة الحياة"),
        },
        {
          id: "data",
          label: text("ADO.NET", "ADO.NET"),
          detail: text("Queries and commands", "استعلامات وأوامر"),
        },
        {
          id: "sql",
          label: text("SQL Server", "SQL Server"),
          detail: text(
            "People, applications, tests, licenses",
            "الأشخاص والطلبات والاختبارات والرخص",
          ),
        },
      ],
      links: [
        ["ui", "business"],
        ["business", "data"],
        ["data", "sql"],
      ],
    },
    features: [
      {
        title: text("License application pipeline", "مسار طلب الرخصة"),
        detail: text(
          "Applications move through eligibility, fees, vision, theory, practical testing, and issuance.",
          "تمر الطلبات عبر الأهلية والرسوم واختبارات النظر والنظري والعملي والإصدار.",
        ),
        implementation: text(
          "Business rules coordinate appointments, results, retakes, license classes, validity, and applicant history.",
          "تنسق قواعد الأعمال المواعيد والنتائج والإعادات وفئات الرخص والصلاحية وسجل المتقدم.",
        ),
      },
      {
        title: text("License services", "خدمات الرخص"),
        detail: text(
          "The system supports renewals, international permits, lost/damaged replacements, detainment, and release.",
          "يدعم النظام التجديد والرخص الدولية واستبدال المفقود أو التالف والحجز والإفراج.",
        ),
        implementation: text(
          "Each service checks the documented prerequisites and preserves the driver and license history.",
          "تتحقق كل خدمة من المتطلبات الموثقة وتحافظ على سجل السائق والرخصة.",
        ),
      },
    ],
    quality: [
      {
        title: text("Maintainability", "قابلية الصيانة"),
        detail: text(
          "Presentation, business, and data access responsibilities are separated across the solution.",
          "تفصل المسؤوليات بين العرض والأعمال والوصول للبيانات عبر الحل.",
        ),
      },
      {
        title: text("Reporting", "التقارير"),
        detail: text(
          "Crystal Reports complements operational records with printable reporting.",
          "تكمل Crystal Reports السجلات التشغيلية بتقارير قابلة للطباعة.",
        ),
      },
    ],
    outcome: text(
      "The desktop solution implements people, users, license classes, applications, staged tests, issuance, renewals, international permits, replacements, and detainment workflows.",
      "ينفذ الحل المكتبي الأشخاص والمستخدمين وفئات الرخص والطلبات والاختبارات المرحلية والإصدار والتجديد والرخص الدولية والاستبدال والحجز.",
    ),
    nextStep: text(
      "Validation results, deployment, and detailed ownership evidence are not presented as verified claims.",
      "لا تُعرض نتائج تحقق أو نشر أو أدلة ملكية تفصيلية على أنها حقائق مؤكدة.",
    ),
    evidence: [
      {
        src: "/case-studies/dvld/main-shell.webp",
        alt: text("DVLD main application shell", "الواجهة الرئيسية لنظام DVLD"),
        caption: text(
          "Exhibit A / licensing operations entry point",
          "الدليل أ / نقطة دخول عمليات الترخيص",
        ),
        kind: "workflow",
      },
    ],
  },
  cinemaverse: {
    projectSlug: "cinemaverse",
    projectType: text(
      "Team project / .NET backend",
      "مشروع جماعي / باك إند .NET",
    ),
    teamContext: text(
      "Three-person team: two backend contributors and one frontend contributor.",
      "فريق من ثلاثة أشخاص: مطوران للباك إند ومطور للواجهة الأمامية.",
    ),
    role: text(
      "Backend architecture, booking and ticketing, and payments; backend ownership was shared.",
      "هندسة الباك إند والحجز والتذاكر والمدفوعات؛ وكانت ملكية الباك إند مشتركة.",
    ),
    problem: text(
      "Cinema customers need a connected path from discovery to seat selection, payment, and ticket validation while staff manage branches, halls, showtimes, and bookings.",
      "يحتاج عملاء السينما إلى مسار متصل من الاكتشاف إلى المقاعد والدفع والتحقق من التذكرة، بينما يدير الموظفون الفروع والقاعات والعروض والحجوزات.",
    ),
    audience: text(
      "Cinema customers, administrators, and check-in staff.",
      "عملاء السينما والمسؤولون وموظفو الدخول.",
    ),
    constraints: [
      text(
        "Seat and booking state changes over time and crosses payment boundaries.",
        "تتغير حالة المقاعد والحجز مع الوقت وتعبر حدود الدفع.",
      ),
      text(
        "Customer, administrator, and check-in capabilities require different authorization.",
        "تتطلب وظائف العميل والمسؤول وموظف الدخول صلاحيات مختلفة.",
      ),
      text(
        "Pending bookings and reminders require work outside request-response traffic.",
        "تتطلب الحجوزات المعلقة والتذكيرات عملاً خارج دورة الطلب والاستجابة.",
      ),
    ],
    investigation: [
      {
        title: text("Booking lifecycle", "دورة حياة الحجز"),
        detail: text(
          "Movie, showtime, seat availability, payment, QR ticket, and check-in states form one chain.",
          "تشكل حالات الفيلم والعرض وتوفر المقعد والدفع وتذكرة QR والدخول سلسلة واحدة.",
        ),
      },
      {
        title: text("Scheduled state changes", "تغييرات الحالة المجدولة"),
        detail: text(
          "Unpaid bookings expire and upcoming shows generate reminders without an active user request.",
          "تنتهي الحجوزات غير المدفوعة وتُرسل تذكيرات العروض القادمة دون طلب مستخدم نشط.",
        ),
      },
      {
        title: text("Administrative conflicts", "تعارضات الإدارة"),
        detail: text(
          "Showtime scheduling must detect conflicts across halls and movies.",
          "يجب أن تكتشف جدولة العروض التعارضات بين القاعات والأفلام.",
        ),
      },
    ],
    decisions: [
      {
        title: text(
          "Service and repository backend",
          "باك إند قائم على الخدمات والمستودعات",
        ),
        decision: text(
          "Controllers delegate business work to services over EF Core repositories.",
          "تفوض وحدات التحكم أعمال النطاق إلى خدمات فوق مستودعات EF Core.",
        ),
        rationale: text(
          "Booking, payment, ticketing, and administration rules stay out of transport code.",
          "تبقى قواعد الحجز والدفع والتذاكر والإدارة خارج كود النقل.",
        ),
        tradeoff: text(
          "DTOs, mappers, interfaces, services, and repositories add explicit coordination.",
          "تضيف DTOs وعمليات الربط والواجهات والخدمات والمستودعات تنسيقاً صريحاً.",
        ),
      },
      {
        title: text("Hangfire background jobs", "مهام Hangfire الخلفية"),
        decision: text(
          "Expire pending bookings every minute and send show reminders every fifteen minutes.",
          "إنهاء الحجوزات المعلقة كل دقيقة وإرسال تذكيرات العروض كل خمس عشرة دقيقة.",
        ),
        rationale: text(
          "Time-driven booking work remains independent from incoming HTTP requests.",
          "يبقى العمل المرتبط بالوقت مستقلاً عن طلبات HTTP الواردة.",
        ),
        tradeoff: text(
          "The system depends on a job processor and durable SQL Server job storage.",
          "يعتمد النظام على معالج مهام وتخزين دائم للمهام في SQL Server.",
        ),
      },
    ],
    architecture: {
      summary: text(
        "Angular calls an ASP.NET Core API whose controllers, services, repositories, and EF Core data layer integrate SQL Server, Stripe, Hangfire, and email.",
        "يستدعي Angular واجهة ASP.NET Core تتكامل فيها وحدات التحكم والخدمات والمستودعات وEF Core مع SQL Server وStripe وHangfire والبريد.",
      ),
      nodes: [
        {
          id: "angular",
          label: text("Angular", "Angular"),
          detail: text("Customer and admin UI", "واجهة العميل والإدارة"),
        },
        {
          id: "api",
          label: text("ASP.NET API", "واجهة ASP.NET"),
          detail: text("Controllers and JWT", "وحدات التحكم وJWT"),
        },
        {
          id: "services",
          label: text("Services", "الخدمات"),
          detail: text("Booking, payment, tickets", "الحجز والدفع والتذاكر"),
        },
        {
          id: "data",
          label: text("EF Core + SQL", "EF Core + SQL"),
          detail: text("Persistent cinema domain", "نطاق السينما الدائم"),
        },
        {
          id: "external",
          label: text("Platform services", "خدمات المنصة"),
          detail: text(
            "Stripe, Hangfire, MailKit",
            "Stripe وHangfire وMailKit",
          ),
        },
      ],
      links: [
        ["angular", "api"],
        ["api", "services"],
        ["services", "data"],
        ["services", "external"],
      ],
    },
    features: [
      {
        title: text(
          "Discovery to seat selection",
          "من الاكتشاف إلى اختيار المقعد",
        ),
        detail: text(
          "Customers browse movies, filter listings, inspect showtimes, and choose from an interactive seat grid.",
          "يتصفح العملاء الأفلام ويرشحون القوائم ويفحصون العروض ويختارون من شبكة مقاعد تفاعلية.",
        ),
        implementation: text(
          "Angular user features consume public movie and seat endpoints before authenticated booking work.",
          "تستهلك ميزات Angular للمستخدم نقاط الأفلام والمقاعد العامة قبل أعمال الحجز المحمية.",
        ),
      },
      {
        title: text("Payment and ticketing", "الدفع والتذاكر"),
        detail: text(
          "Bookings connect Stripe payment to QR ticket generation and check-in lookup.",
          "تربط الحجوزات دفع Stripe بإنشاء تذكرة QR والبحث عند الدخول.",
        ),
        implementation: text(
          "Backend services coordinate payment, booking, ticket, and email concerns across documented endpoints.",
          "تنسق خدمات الباك إند الدفع والحجز والتذكرة والبريد عبر نقاط API الموثقة.",
        ),
      },
      {
        title: text("Cinema administration", "إدارة السينما"),
        detail: text(
          "Admins manage movies, media, branches, halls, seat layouts, showtimes, users, bookings, payments, and tickets.",
          "يدير المسؤولون الأفلام والوسائط والفروع والقاعات والمقاعد والعروض والمستخدمين والحجوزات والمدفوعات والتذاكر.",
        ),
        implementation: text(
          "Role-protected admin features use the same service and repository boundaries as customer booking.",
          "تستخدم وظائف الإدارة المحمية بالأدوار حدود الخدمات والمستودعات نفسها المستخدمة في حجز العميل.",
        ),
      },
    ],
    challenges: [
      {
        title: text(
          "Time-bound pending bookings",
          "الحجوزات المعلقة محدودة الوقت",
        ),
        detail: text(
          "Unpaid reservations cannot remain active indefinitely.",
          "لا يمكن أن تظل الحجوزات غير المدفوعة نشطة بلا نهاية.",
        ),
        response: text(
          "A Hangfire job expires pending bookings every minute according to the published schedule.",
          "تنهي مهمة Hangfire الحجوزات المعلقة كل دقيقة حسب الجدول المنشور.",
        ),
      },
      {
        title: text("Authentication abuse", "إساءة استخدام المصادقة"),
        detail: text(
          "Login, refresh, and logout endpoints are sensitive public entry points.",
          "تعد نقاط الدخول والتجديد والخروج مداخل عامة حساسة.",
        ),
        response: text(
          "The documented API rate-limits those endpoints to five requests per minute per IP.",
          "تحدد API الموثقة تلك النقاط بخمسة طلبات في الدقيقة لكل عنوان IP.",
        ),
      },
    ],
    quality: [
      {
        title: text("Security", "الأمان"),
        detail: text(
          "JWT access/refresh tokens, BCrypt, RBAC, rate limiting, and admin-only job visibility protect system boundaries.",
          "تحمي رموز JWT والتجديد وBCrypt وRBAC وتحديد المعدل وعرض المهام للإدارة فقط حدود النظام.",
        ),
      },
      {
        title: text("Reliability", "الاعتمادية"),
        detail: text(
          "Hangfire persists scheduled expiry and reminder jobs in SQL Server; Serilog supports structured application logging.",
          "يحفظ Hangfire مهام الانتهاء والتذكير المجدولة في SQL Server ويدعم Serilog السجلات المنظمة.",
        ),
      },
      {
        title: text("Contract clarity", "وضوح العقود"),
        detail: text(
          "The README documents standard success, pagination, and problem-detail response shapes across 94 endpoints.",
          "يوثق README أشكال النجاح والتقسيم ومشكلات الاستجابة عبر 94 نقطة API.",
        ),
      },
    ],
    outcome: text(
      "The team delivered customer discovery, seat booking, payment, QR tickets, check-in, and broad cinema administration across Angular and .NET.",
      "سلّم الفريق اكتشاف الأفلام وحجز المقاعد والدفع وتذاكر QR والدخول وإدارة سينما واسعة عبر Angular و.NET.",
    ),
    nextStep: text(
      "Commit-level ownership, seat-concurrency behavior, payment-flow evidence, and automated test coverage remain publication gaps.",
      "تظل ملكية الالتزامات وسلوك تزامن المقاعد وأدلة تدفق الدفع وتغطية الاختبارات الآلية فجوات في النشر.",
    ),
    evidence: [
      {
        src: "/case-studies/cinemaverse/home.webp",
        alt: text(
          "CinemaVerse customer home",
          "الصفحة الرئيسية لعميل CinemaVerse",
        ),
        caption: text(
          "Exhibit A / discovery entry",
          "الدليل أ / مدخل الاكتشاف",
        ),
        kind: "product",
      },
      {
        src: "/case-studies/cinemaverse/seat-selection.webp",
        alt: text(
          "CinemaVerse seat selection",
          "اختيار المقاعد في CinemaVerse",
        ),
        caption: text(
          "Exhibit B / booking decision point",
          "الدليل ب / نقطة قرار الحجز",
        ),
        kind: "workflow",
      },
      {
        src: "/case-studies/cinemaverse/hall-editor.webp",
        alt: text("CinemaVerse hall editor", "محرر القاعات في CinemaVerse"),
        caption: text(
          "Exhibit C / hall and seat configuration",
          "الدليل ج / إعداد القاعة والمقاعد",
        ),
        kind: "workflow",
      },
      {
        src: "/case-studies/cinemaverse/showtime-management.webp",
        alt: text(
          "CinemaVerse showtime management",
          "إدارة مواعيد العرض في CinemaVerse",
        ),
        caption: text(
          "Exhibit D / scheduling operations",
          "الدليل د / عمليات الجدولة",
        ),
        kind: "workflow",
      },
    ],
  },
};

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies[slug as ProjectSlug];
}
