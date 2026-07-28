import type { ProjectSlug } from "@/content/portfolio";
import type { Locale } from "@/i18n/routing";

export type LocalizedCaseStudyText = Record<Locale, string>;

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
  architecture: CaseStudyArchitecture;
  features: FeatureStory[];
  challenges?: ChallengeStory[];
  quality?: DetailedPoint[];
  outcome: LocalizedCaseStudyText;
  nextStep?: LocalizedCaseStudyText;
  evidence: CaseStudyEvidence[];
};

const text = (en: string, ar: string): LocalizedCaseStudyText => ({ en, ar });

export const caseStudies: Partial<Record<ProjectSlug, CaseStudy>> = {
  buildsense: {
    projectSlug: "buildsense",
    projectType: text(
      "Solo product / full-stack system",
      "منتج فردي / نظام متكامل",
    ),
    teamContext: text("Individual project", "مشروع فردي"),
    role: text(
      "I designed the product and built its Angular interfaces, Express API, ingestion worker, compatibility rules, and shared Nx packages.",
      "صممت المنتج وبنيت واجهات Angular وواجهة Express وعامل جمع البيانات وقواعد التوافق وحزم Nx المشتركة.",
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
          "I compared retailer naming and specification patterns to determine which facts could prove that two offers represented the same component.",
          "قارنت أنماط التسمية والمواصفات بين المتاجر لأحدد الحقائق التي تثبت أن عرضين يمثلان المكوّن نفسه.",
        ),
      },
      {
        title: text(
          "Uncertainty is a product state",
          "عدم اليقين حالة داخل المنتج",
        ),
        detail: text(
          "I traced compatibility rules back to their required sockets, dimensions, wattage, and interfaces, then treated every missing prerequisite as an explicit unknown.",
          "تتبعت قواعد التوافق حتى بيانات المقابس والأبعاد والطاقة والواجهات المطلوبة، ثم عاملت كل متطلب ناقص كحالة غير معروفة صريحة.",
        ),
      },
      {
        title: text(
          "Separate request work from ingestion",
          "فصل الطلبات عن جمع البيانات",
        ),
        detail: text(
          "I separated interactive catalog requests from long-running store ingestion after mapping their different timeout, retry, and recovery needs.",
          "فصلت طلبات الكتالوج التفاعلية عن جمع بيانات المتاجر الطويل بعد تحديد اختلاف احتياجات المهلة وإعادة المحاولة والاسترداد.",
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
          "I built eight persistent component slots that retain a public build and its compatibility state.",
          "بنيت ثمانية مواضع مستمرة للمكونات تحتفظ بالتجميعة العامة وحالة توافقها.",
        ),
        implementation: text(
          "I connected candidate search, offer comparison, rule reasons, and missing facts to each slot.",
          "ربطت البحث عن المرشحين ومقارنة العروض وأسباب القواعد والحقائق الناقصة بكل موضع.",
        ),
      },
      {
        title: text("Multi-store catalog", "كتالوج متعدد المتاجر"),
        detail: text(
          "I combined verified specifications and known retailer offers on one product page.",
          "جمعت المواصفات المتحققة وعروض المتاجر المعروفة في صفحة منتج واحدة.",
        ),
        implementation: text(
          "I preserved provenance with immutable snapshots, normalization, identity matching, and idempotent offer publishing.",
          "حافظت على مصدر البيانات باستخدام لقطات غير قابلة للتغيير والتوحيد ومطابقة الهوية والنشر الآمن المتكرر للعروض.",
        ),
      },
      {
        title: text("Purchase plan", "خطة شراء"),
        detail: text(
          "I turned a completed build into a store-by-store purchase checklist.",
          "حوّلت التجميعة المكتملة إلى قائمة شراء منظمة حسب المتجر.",
        ),
        implementation: text(
          "I included quantities, retailer links, an estimated total, JSON export, and print-to-PDF support.",
          "أضفت الكميات وروابط المتاجر والإجمالي التقديري وتصدير JSON والطباعة إلى PDF.",
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
          "I require exact identity evidence before the pipeline links offers.",
          "أشترط دليلاً دقيقاً على الهوية قبل أن تربط المنظومة العروض.",
        ),
      },
      {
        title: text("Protected retailer pages", "صفحات المتاجر المحمية"),
        detail: text(
          "Not every source supports reliable direct HTTP discovery.",
          "لا يدعم كل مصدر اكتشافاً موثوقاً عبر HTTP مباشرة.",
        ),
        response: text(
          "I gave specific adapters an approved browser-capture input while retaining the same snapshot pipeline.",
          "أضفت لموصلات محددة مدخل لقطات متصفح معتمدة مع الحفاظ على مسار اللقطات نفسه.",
        ),
      },
    ],
    quality: [
      {
        title: text("Security", "الأمان"),
        detail: text(
          "I protected the administration surface with Helmet, CORS, scrypt, opaque sessions, CSRF, and origin validation.",
          "حميت واجهة الإدارة باستخدام Helmet وCORS وscrypt والجلسات غير الشفافة وCSRF والتحقق من المصدر.",
        ),
      },
      {
        title: text("Reliability", "الاعتمادية"),
        detail: text(
          "I made failures inspectable with immutable snapshots, idempotent publishing, resumable runs, request IDs, and readiness/liveness endpoints.",
          "جعلت الأعطال قابلة للفحص باستخدام اللقطات غير القابلة للتغيير والنشر الآمن والاستئناف ومعرفات الطلب ونقاط الجاهزية.",
        ),
      },
      {
        title: text("Validation", "التحقق"),
        detail: text(
          "I configured Vitest, MongoDB Memory Server, Playwright, axe-core, CI, and strict TypeScript across the workspace.",
          "أعددت Vitest وMongoDB Memory Server وPlaywright وaxe-core وCI وTypeScript الصارم عبر مساحة العمل.",
        ),
      },
    ],
    outcome: text(
      "I implemented a public decision-support catalog, eight-slot builder, compatibility engine, purchase plan, admin console, and multi-store ingestion pipeline.",
      "نفذت كتالوجاً عاماً لدعم القرار وأداة تجميع بثمانية مواضع ومحرك توافق وخطة شراء ووحدة إدارة ومنظومة جمع متعددة المتاجر.",
    ),
    nextStep: text(
      "My next step is to expand reliable source coverage while keeping every compatibility result gated by verified facts.",
      "خطوتي التالية هي توسيع تغطية المصادر الموثوقة مع إبقاء كل نتيجة توافق مشروطة بحقائق متحققة.",
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
      {
        src: "/projects/buildsense/details/product-details.webp",
        alt: text(
          "BuildSense product details and offers",
          "تفاصيل المنتج وعروض المتاجر في BuildSense",
        ),
        caption: text(
          "Exhibit E / normalized product evidence",
          "الدليل هـ / أدلة المنتج الموحدة",
        ),
        kind: "product",
      },
      {
        src: "/projects/buildsense/details/comparison.webp",
        alt: text(
          "BuildSense component comparison",
          "مقارنة المكونات في BuildSense",
        ),
        caption: text(
          "Exhibit F / side-by-side component analysis",
          "الدليل و / تحليل المكونات جنباً إلى جنب",
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
      "I led a six-person university team and contributed to the backend.",
      "قدت فريقاً جامعياً من ستة أشخاص وساهمت في تطوير الباك إند.",
    ),
    role: text(
      "I owned the backend, booking and payment flows, identity and security, backend architecture, and frontend leadership.",
      "توليت الباك إند وتدفقات الحجز والدفع والهوية والأمان وهندسة الباك إند وقيادة الواجهة الأمامية.",
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
          "I traced room state from date-range search through availability, checkout, and payment confirmation to identify every point where overlapping requests could diverge.",
          "تتبعت حالة الغرفة من البحث حسب التاريخ مروراً بالتوفر وإتمام الحجز حتى تأكيد الدفع لتحديد كل نقطة قد تختلف فيها الطلبات المتداخلة.",
        ),
      },
      {
        title: text("Boundary security", "أمان الحدود"),
        detail: text(
          "I mapped forms, cookies, uploads, role boundaries, and payment callbacks separately because each crosses the application boundary differently.",
          "حللت النماذج وملفات الارتباط والرفع وحدود الأدوار واستدعاءات الدفع بشكل منفصل لأن كل منها يعبر حدود التطبيق بطريقة مختلفة.",
        ),
      },
      {
        title: text("Operational visibility", "وضوح التشغيل"),
        detail: text(
          "I separated database, email, and payment readiness so one healthy web process could not hide a failed dependency.",
          "فصلت جاهزية قاعدة البيانات والبريد والدفع حتى لا تخفي عملية ويب سليمة فشل أحد الاعتمادات.",
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
          "I built room discovery around date range, type, price, and occupancy instead of showing inventory that could not be booked.",
          "بنيت اكتشاف الغرف حول التاريخ والنوع والسعر والإشغال بدلاً من عرض مخزون لا يمكن حجزه.",
        ),
        implementation: text(
          "I centralized availability checks in RoomAvailabilityService before room selection and booking.",
          "جمعت فحوصات التوفر داخل RoomAvailabilityService قبل اختيار الغرفة والحجز.",
        ),
      },
      {
        title: text("Booking and payment", "الحجز والدفع"),
        detail: text(
          "I connected the booking summary to Stripe payment and confirmation email.",
          "ربطت ملخص الحجز بالدفع عبر Stripe وبريد التأكيد.",
        ),
        implementation: text(
          "I preserved the lifecycle with Payment Intents, idempotency support, booking status, payment history, and refund operations.",
          "حافظت على دورة الحياة باستخدام Payment Intents ودعم التكرار الآمن وحالة الحجز وسجل الدفع وعمليات الاسترداد.",
        ),
      },
      {
        title: text("Hotel administration", "إدارة الفندق"),
        detail: text(
          "I gave staff one surface for rooms, room types, bookings, refunds, users, and operational summaries.",
          "وفرت للموظفين واجهة واحدة للغرف وأنواعها والحجوزات والاسترداد والمستخدمين والملخصات التشغيلية.",
        ),
        implementation: text(
          "I protected admin controllers by role and passed ViewModels through services instead of exposing entities directly.",
          "حميت وحدات تحكم الإدارة حسب الدور ومررت ViewModels عبر الخدمات بدلاً من كشف الكيانات مباشرة.",
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
          "I used RowVersion optimistic concurrency and coordinated transactions to reject stale booking updates.",
          "استخدمت RowVersion للتزامن التفاؤلي ومعاملات منسقة لرفض تحديثات الحجز القديمة.",
        ),
      },
      {
        title: text("External service health", "صحة الخدمات الخارجية"),
        detail: text(
          "A working web process does not guarantee database, SendGrid, or Stripe readiness.",
          "تشغيل عملية الويب لا يضمن جاهزية قاعدة البيانات أو SendGrid أو Stripe.",
        ),
        response: text(
          "I added dedicated health checks that report each dependency independently through a health UI.",
          "أضفت فحوصات صحة مخصصة تعرض حالة كل اعتماد بشكل مستقل عبر واجهة الصحة.",
        ),
      },
    ],
    quality: [
      {
        title: text("Security", "الأمان"),
        detail: text(
          "I protected account and admin workflows with ASP.NET Identity, RBAC, lockout, secure cookies, antiforgery validation, Razor encoding, and upload validation.",
          "حميت تدفقات الحساب والإدارة باستخدام ASP.NET Identity وRBAC والقفل وملفات الارتباط الآمنة وAntiforgery وترميز Razor والتحقق من الرفع.",
        ),
      },
      {
        title: text("Data integrity", "سلامة البيانات"),
        detail: text(
          "I kept input and persistence boundaries explicit with EF Core parameterization, ViewModels, RowVersion, Unit of Work, and migrations.",
          "أبقيت حدود الإدخال والتخزين صريحة باستخدام معلمات EF Core وViewModels وRowVersion وUnit of Work والترحيلات.",
        ),
      },
      {
        title: text("Operations", "التشغيل"),
        detail: text(
          "I exposed system state through Serilog rolling logs and database, payment, and email health checks.",
          "أظهرت حالة النظام من خلال سجلات Serilog الدورية وفحوصات قاعدة البيانات والدفع والبريد.",
        ),
      },
    ],
    outcome: text(
      "Our team delivered customer booking and payment journeys plus an administration surface for rooms, bookings, refunds, users, and operational views.",
      "سلّم فريقنا تدفقات الحجز والدفع للعملاء إلى جانب واجهة إدارة للغرف والحجوزات والاسترداد والمستخدمين والمشاهد التشغيلية.",
    ),
    nextStep: text(
      "My next technical step is to add automated integration coverage for overlapping bookings, payment confirmation, and refund recovery.",
      "خطوتي التقنية التالية هي إضافة اختبارات تكامل آلية للحجوزات المتداخلة وتأكيد الدفع واسترداد المبالغ.",
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
        src: "/case-studies/bookify/admin-dashboard.webp",
        alt: text("Bookify administration dashboard", "لوحة إدارة Bookify"),
        caption: text(
          "Exhibit C / staff operations",
          "الدليل ج / عمليات الموظفين",
        ),
        kind: "workflow",
      },
      {
        src: "/projects/bookify/details/06-managebooking.webp",
        alt: text("Bookify booking management", "إدارة الحجوزات في Bookify"),
        caption: text(
          "Exhibit D / booking operations",
          "الدليل د / عمليات الحجز",
        ),
        kind: "workflow",
      },
      {
        src: "/projects/bookify/details/07-managerooms.webp",
        alt: text("Bookify room management", "إدارة الغرف في Bookify"),
        caption: text(
          "Exhibit E / room inventory controls",
          "الدليل هـ / التحكم في مخزون الغرف",
        ),
        kind: "workflow",
      },
      {
        src: "/projects/bookify/details/09-paymentconfrimation.webp",
        alt: text("Bookify payment confirmation", "تأكيد الدفع في Bookify"),
        caption: text(
          "Exhibit F / payment completion",
          "الدليل و / إتمام الدفع",
        ),
        kind: "workflow",
      },
      {
        src: "/projects/bookify/details/14-usermanagment.webp",
        alt: text("Bookify user management", "إدارة المستخدمين في Bookify"),
        caption: text(
          "Exhibit G / role-controlled accounts",
          "الدليل ز / حسابات محكومة بالأدوار",
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
      "I built this university project with one teammate.",
      "بنيت هذا المشروع الجامعي مع زميل واحد.",
    ),
    role: text(
      "I implemented most of the system as part of the team; responsibility was shared.",
      "نفذت معظم النظام ضمن الفريق؛ وكانت المسؤولية مشتركة.",
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
          "I mapped every blood-unit transition from donation through testing, inventory, transfusion, or disposal so no screen could bypass its lifecycle.",
          "رسمت كل انتقال لوحدة الدم من التبرع عبر الفحص والمخزون ونقل الدم أو التخلص منها حتى لا تتجاوز أي شاشة دورة حياتها.",
        ),
      },
      {
        title: text("Operational roles", "الأدوار التشغيلية"),
        detail: text(
          "I separated donor, patient, inventory, and reporting capabilities to identify the access each staff role actually needed.",
          "فصلت وظائف المتبرعين والمرضى والمخزون والتقارير لأحدد الوصول الذي يحتاجه كل دور وظيفي فعلياً.",
        ),
      },
      {
        title: text("Safe allocation rules", "قواعد التخصيص الآمن"),
        detail: text(
          "I traced matching from patient request to compatibility, test result, expiry, availability, and final unit allocation.",
          "تتبعت المطابقة من طلب المريض إلى التوافق ونتيجة الفحص والصلاحية والتوفر ثم التخصيص النهائي للوحدة.",
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
          "I connected donor registration, donation processing, unit testing, stock monitoring, and expiry in one workflow.",
          "ربطت تسجيل المتبرع ومعالجة التبرع وفحص الوحدة ومراقبة المخزون والصلاحية في تدفق واحد.",
        ),
        implementation: text(
          "I kept compatibility, automatic expiry detection, test results, low-stock alerts, and unit status in the business layer.",
          "أبقيت التوافق واكتشاف انتهاء الصلاحية ونتائج الفحص وتنبيهات المخزون وحالة الوحدة داخل طبقة الأعمال.",
        ),
      },
      {
        title: text("Transfusion workflow", "تدفق نقل الدم"),
        detail: text(
          "I connected patient requests to matching and blood-unit allocation.",
          "ربطت طلبات المرضى بالمطابقة وتخصيص وحدات الدم.",
        ),
        implementation: text(
          "I recorded the request, match, allocation, and transfusion history in the same operational domain.",
          "سجلت الطلب والمطابقة والتخصيص وسجل نقل الدم داخل النطاق التشغيلي نفسه.",
        ),
      },
    ],
    challenges: [
      {
        title: text(
          "Blood-unit lifecycle integrity",
          "سلامة دورة حياة وحدة الدم",
        ),
        detail: text(
          "Testing, expiry, allocation, transfusion, and disposal can all change whether a unit is usable.",
          "يمكن للفحص والصلاحية والتخصيص ونقل الدم والتخلص أن تغيّر جميعها صلاحية استخدام الوحدة.",
        ),
        response: text(
          "I centralized these transitions in business-layer rules and retained the unit history instead of deriving state from individual forms.",
          "جمعت هذه الانتقالات في قواعد طبقة الأعمال واحتفظت بسجل الوحدة بدلاً من اشتقاق حالتها من النماذج الفردية.",
        ),
      },
      {
        title: text(
          "Compatible does not mean available",
          "التوافق لا يعني التوفر",
        ),
        detail: text(
          "A compatible unit can still be expired, untested, allocated, or unavailable.",
          "قد تكون الوحدة المتوافقة منتهية أو غير مفحوصة أو مخصصة أو غير متاحة.",
        ),
        response: text(
          "I required compatibility, accepted test results, valid expiry, and available status before allocation.",
          "اشترطت التوافق ونتائج فحص مقبولة وصلاحية سارية وحالة متاحة قبل التخصيص.",
        ),
      },
      {
        title: text("Role-sensitive records", "سجلات حساسة حسب الدور"),
        detail: text(
          "Donor medical data, patient requests, employee records, and reports should not share unrestricted access.",
          "لا ينبغي أن تتشارك بيانات المتبرعين الطبية وطلبات المرضى وسجلات الموظفين والتقارير وصولاً غير مقيد.",
        ),
        response: text(
          "I combined authentication, role-based access, input sanitization, and audit logging around critical operations.",
          "جمعت المصادقة والصلاحيات حسب الدور وتنقية المدخلات وسجل التدقيق حول العمليات الحرجة.",
        ),
      },
    ],
    quality: [
      {
        title: text("Security", "الأمان"),
        detail: text(
          "I applied authentication, role-based access, input sanitization, and audit logging to critical operations.",
          "طبقت المصادقة والصلاحيات حسب الدور وتنقية المدخلات وسجل التدقيق على العمليات الحرجة.",
        ),
      },
      {
        title: text("Reliability", "الاعتمادية"),
        detail: text(
          "I connected inventory state to operational history through automatic expiry detection and unit traceability.",
          "ربطت حالة المخزون بالسجل التشغيلي من خلال اكتشاف انتهاء الصلاحية تلقائياً وتتبع الوحدات.",
        ),
      },
    ],
    outcome: text(
      "Our team delivered a three-tier desktop system covering donor, patient, employee, unit, donation, transfusion, matching, and reporting workflows.",
      "سلّم فريقنا نظاماً مكتبياً ثلاثي الطبقات يغطي تدفقات المتبرعين والمرضى والموظفين والوحدات والتبرع ونقل الدم والمطابقة والتقارير.",
    ),
    nextStep: text(
      "My next technical step is to add automated lifecycle tests for compatibility, expiry, allocation, transfusion, and disposal transitions.",
      "خطوتي التقنية التالية هي إضافة اختبارات آلية لدورة الحياة تشمل التوافق والصلاحية والتخصيص ونقل الدم والتخلص.",
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
      {
        src: "/projects/blood-bank-desktop/details/03-donate.webp",
        alt: text(
          "Blood Bank donation workflow",
          "تدفق التبرع في نظام بنك الدم",
        ),
        caption: text(
          "Exhibit B / donation processing",
          "الدليل ب / معالجة التبرع",
        ),
        kind: "workflow",
      },
      {
        src: "/projects/blood-bank-desktop/details/05-findamatch.webp",
        alt: text(
          "Blood Bank compatibility matching",
          "مطابقة التوافق في نظام بنك الدم",
        ),
        caption: text(
          "Exhibit C / compatible-unit search",
          "الدليل ج / البحث عن وحدة متوافقة",
        ),
        kind: "workflow",
      },
      {
        src: "/projects/blood-bank-desktop/details/07-managedonors.webp",
        alt: text(
          "Blood Bank donor management",
          "إدارة المتبرعين في نظام بنك الدم",
        ),
        caption: text(
          "Exhibit D / donor records",
          "الدليل د / سجلات المتبرعين",
        ),
        kind: "workflow",
      },
      {
        src: "/projects/blood-bank-desktop/details/08-matchfound.webp",
        alt: text("Blood Bank matched unit result", "نتيجة مطابقة وحدة دم"),
        caption: text(
          "Exhibit E / allocation candidate",
          "الدليل هـ / وحدة مرشحة للتخصيص",
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
      "I built this with my university team as part of the wider Blood Bank platform.",
      "بنيت هذا الجزء مع فريقي الجامعي ضمن منصة بنك الدم الأوسع.",
    ),
    role: text(
      "I implemented most of the wider platform as part of the team; responsibility was shared across modules.",
      "نفذت معظم المنصة الأوسع ضمن الفريق؛ وكانت المسؤولية مشتركة عبر الوحدات.",
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
          "I traced a booking from the donor's phone to staff-visible work, donation processing, history, and the final donor update.",
          "تتبعت الحجز من هاتف المتبرع إلى العمل الظاهر للموظف ومعالجة التبرع والسجل والتحديث النهائي للمتبرع.",
        ),
      },
      {
        title: text("Mobile service boundary", "حد خدمات الموبايل"),
        detail: text(
          "I separated screen state, Provider responsibilities, REST services, and persistence concerns before mapping the mobile flows.",
          "فصلت حالة الشاشات ومسؤوليات Provider وخدمات REST واهتمامات التخزين قبل رسم تدفقات الموبايل.",
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
          "I connected registration, login, profile, blood details, and donation history in the donor account experience.",
          "ربطت التسجيل والدخول والملف وبيانات الدم وسجل التبرع داخل تجربة حساب المتبرع.",
        ),
        implementation: text(
          "I organized Flutter models, routes, screens, services, widgets, and Provider state around structured REST responses.",
          "نظمت نماذج Flutter والمسارات والشاشات والخدمات والعناصر وحالة Provider حول استجابات REST منظمة.",
        ),
      },
      {
        title: text("Appointment workflow", "تدفق الموعد"),
        detail: text(
          "I built a scheduling flow for selecting a date, time, and location and receiving a confirmation state.",
          "بنيت تدفق جدولة لاختيار التاريخ والوقت والموقع والحصول على حالة تأكيد.",
        ),
        implementation: text(
          "I persisted the appointment through the API so staff could process the same record from the shared database.",
          "حفظت الموعد عبر API حتى يعالج الموظفون السجل نفسه من قاعدة البيانات المشتركة.",
        ),
      },
      {
        title: text("Notifications", "الإشعارات"),
        detail: text(
          "I included appointment, request, and system notification states in the interface.",
          "أضفت حالات إشعارات المواعيد والطلبات والنظام إلى الواجهة.",
        ),
        implementation: text(
          "The notification models and screens keep those update types distinct in the donor experience.",
          "تحافظ نماذج الإشعارات وشاشاتها على فصل أنواع التحديث داخل تجربة المتبرع.",
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
          "I connected both clients to the API and shared SQL Server workflow instead of maintaining isolated records.",
          "ربطت العميلين بواجهة API وتدفق SQL Server المشترك بدلاً من الاحتفاظ بسجلات معزولة.",
        ),
      },
      {
        title: text("Network authentication state", "حالة المصادقة عبر الشبكة"),
        detail: text(
          "Login, profile, and protected donor data must remain coherent when requests fail or sessions expire.",
          "يجب أن تظل بيانات الدخول والملف وبيانات المتبرع المحمية متسقة عند فشل الطلبات أو انتهاء الجلسة.",
        ),
        response: text(
          "I kept authentication in the API boundary with JWT, CORS policy, structured errors, and explicit client service handling.",
          "أبقيت المصادقة عند حدود API باستخدام JWT وسياسة CORS وأخطاء منظمة ومعالجة صريحة داخل خدمات العميل.",
        ),
      },
      {
        title: text("Growing mobile state", "نمو حالة تطبيق الموبايل"),
        detail: text(
          "Accounts, appointments, history, and notifications can couple screens directly to transport code.",
          "قد تربط الحسابات والمواعيد والسجل والإشعارات الشاشات مباشرة بكود النقل.",
        ),
        response: text(
          "I separated models, Provider state, services, routes, screens, and reusable widgets by responsibility.",
          "فصلت النماذج وحالة Provider والخدمات والمسارات والشاشات والعناصر القابلة لإعادة الاستخدام حسب المسؤولية.",
        ),
      },
    ],
    quality: [
      {
        title: text("API security", "أمان API"),
        detail: text(
          "I used JWT authentication, CORS policy, Swagger contracts, and structured error handling at the API boundary.",
          "استخدمت مصادقة JWT وسياسة CORS وعقود Swagger ومعالجة الأخطاء المنظمة عند حدود API.",
        ),
      },
      {
        title: text("Maintainability", "قابلية الصيانة"),
        detail: text(
          "I assigned explicit Flutter responsibilities to models, providers, routes, screens, services, utilities, and widgets.",
          "حددت مسؤوليات Flutter صريحة للنماذج وProvider والمسارات والشاشات والخدمات والأدوات والعناصر.",
        ),
      },
    ],
    outcome: text(
      "Our platform includes a donor-facing Flutter application, ASP.NET Core API, shared database, and an appointment-to-donation workflow connected to staff operations.",
      "تتضمن منصتنا تطبيق Flutter للمتبرعين وواجهة ASP.NET Core وقاعدة بيانات مشتركة وتدفقاً من الموعد إلى التبرع متصلاً بعمليات الموظفين.",
    ),
    nextStep: text(
      "My next technical step is to add automated API and client-state tests for authentication expiry and appointment transitions across both clients.",
      "خطوتي التقنية التالية هي إضافة اختبارات آلية لواجهة API وحالة العميل لانتهاء المصادقة وانتقالات المواعيد عبر العميلين.",
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
      {
        src: "/projects/blood-bank-mobile/details/02-login.webp",
        alt: text("Blood Bank mobile login", "تسجيل الدخول في تطبيق بنك الدم"),
        caption: text(
          "Exhibit D / donor authentication",
          "الدليل د / مصادقة المتبرع",
        ),
        kind: "workflow",
        portrait: true,
      },
      {
        src: "/projects/blood-bank-mobile/details/03-register.webp",
        alt: text(
          "Blood Bank donor registration",
          "تسجيل المتبرع في تطبيق بنك الدم",
        ),
        caption: text(
          "Exhibit E / account registration",
          "الدليل هـ / تسجيل الحساب",
        ),
        kind: "workflow",
        portrait: true,
      },
      {
        src: "/projects/blood-bank-mobile/details/06-profile.webp",
        alt: text("Blood Bank donor profile", "ملف المتبرع في تطبيق بنك الدم"),
        caption: text(
          "Exhibit F / donor profile state",
          "الدليل و / حالة ملف المتبرع",
        ),
        kind: "product",
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
      "I developed this as a supporting .NET desktop project.",
      "طورت هذا النظام كمشروع مكتبي داعم باستخدام .NET.",
    ),
    role: text(
      "I implemented the Windows Forms workflows, business rules, ADO.NET data access, and SQL Server integration.",
      "نفذت تدفقات Windows Forms وقواعد الأعمال والوصول للبيانات عبر ADO.NET والتكامل مع SQL Server.",
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
          "I compared new licenses, renewals, replacements, international permits, and detainment to identify their shared records and different prerequisites before building forms.",
          "قارنت الرخص الجديدة والتجديد والاستبدال والرخص الدولية والحجز لأحدد السجلات المشتركة والمتطلبات المختلفة قبل بناء النماذج.",
        ),
      },
      {
        title: text("Staged test progression", "تقدم الاختبارات المرحلي"),
        detail: text(
          "I traced vision, theory, and practical tests through appointments, results, retakes, fees, and ordered eligibility.",
          "تتبعت اختبارات النظر والنظري والعملي عبر المواعيد والنتائج والإعادات والرسوم والأهلية المرتبة.",
        ),
      },
      {
        title: text("History as a rule input", "السجل كمدخل للقواعد"),
        detail: text(
          "I examined how prior applications, active licenses, detainment, and driver history affect whether a new service can proceed.",
          "فحصت كيف تؤثر الطلبات السابقة والرخص النشطة والحجز وسجل السائق على إمكانية تنفيذ خدمة جديدة.",
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
          "I built an application pipeline that moves through eligibility, fees, vision, theory, practical testing, and issuance.",
          "بنيت مسار طلب يمر عبر الأهلية والرسوم واختبارات النظر والنظري والعملي والإصدار.",
        ),
        implementation: text(
          "I coordinated appointments, results, retakes, license classes, validity, and applicant history in the business layer.",
          "نسقت المواعيد والنتائج والإعادات وفئات الرخص والصلاحية وسجل المتقدم داخل طبقة الأعمال.",
        ),
      },
      {
        title: text("License services", "خدمات الرخص"),
        detail: text(
          "I implemented renewals, international permits, lost or damaged replacements, detainment, and release.",
          "نفذت التجديد والرخص الدولية واستبدال المفقود أو التالف والحجز والإفراج.",
        ),
        implementation: text(
          "Each service checks its prerequisites and preserves the driver and license history before changing state.",
          "تتحقق كل خدمة من متطلباتها وتحافظ على سجل السائق والرخصة قبل تغيير الحالة.",
        ),
      },
    ],
    challenges: [
      {
        title: text("Ordered test eligibility", "أهلية الاختبارات المرتبة"),
        detail: text(
          "Applicants cannot skip from vision to practical testing, and failed attempts require a new appointment and fee path.",
          "لا يمكن للمتقدم تجاوز اختبار النظر إلى العملي، وتتطلب المحاولة الفاشلة موعداً ومسار رسوم جديداً.",
        ),
        response: text(
          "I enforced the vision, theory, and practical sequence in business rules and checked prior results before creating each appointment.",
          "فرضت تسلسل النظر والنظري والعملي داخل قواعد الأعمال وفحصت النتائج السابقة قبل إنشاء كل موعد.",
        ),
      },
      {
        title: text("One driver, multiple services", "سائق واحد وخدمات متعددة"),
        detail: text(
          "Renewal, replacement, international licensing, detainment, and release all modify related license history differently.",
          "يعدل التجديد والاستبدال والرخصة الدولية والحجز والإفراج سجل الرخصة المرتبط بطرق مختلفة.",
        ),
        response: text(
          "I gave each service its own prerequisite checks while preserving shared person, driver, application, and license records.",
          "خصصت لكل خدمة فحوصات متطلبات مستقلة مع الحفاظ على سجلات الشخص والسائق والطلب والرخصة المشتركة.",
        ),
      },
      {
        title: text(
          "Eligibility depends on history",
          "الأهلية تعتمد على السجل",
        ),
        detail: text(
          "Age, license class, active licenses, prior applications, validity, and detainment can block an operation.",
          "قد يمنع العمر وفئة الرخصة والرخص النشطة والطلبات السابقة والصلاحية والحجز تنفيذ العملية.",
        ),
        response: text(
          "I resolved these checks in the business layer before sending parameterized ADO.NET commands to persistence.",
          "نفذت هذه الفحوصات داخل طبقة الأعمال قبل إرسال أوامر ADO.NET ذات المعلمات إلى التخزين.",
        ),
      },
    ],
    quality: [
      {
        title: text("Rule isolation", "عزل القواعد"),
        detail: text(
          "I separated Windows Forms event handling, business rules, and ADO.NET data access so lifecycle checks stay reusable across services.",
          "فصلت معالجة أحداث Windows Forms وقواعد الأعمال والوصول للبيانات عبر ADO.NET حتى تظل فحوصات دورة الحياة قابلة لإعادة الاستخدام عبر الخدمات.",
        ),
      },
      {
        title: text("Controlled persistence", "تخزين محكوم"),
        detail: text(
          "I used parameterized ADO.NET queries and commands against SQL Server, then exposed printable operational records through Crystal Reports.",
          "استخدمت استعلامات وأوامر ADO.NET ذات معلمات مع SQL Server، ثم عرضت السجلات التشغيلية القابلة للطباعة عبر Crystal Reports.",
        ),
      },
    ],
    outcome: text(
      "I implemented people, users, license classes, applications, staged tests, issuance, renewals, international permits, replacements, and detainment workflows in one desktop system.",
      "نفذت تدفقات الأشخاص والمستخدمين وفئات الرخص والطلبات والاختبارات المرحلية والإصدار والتجديد والرخص الدولية والاستبدال والحجز داخل نظام مكتبي واحد.",
    ),
    nextStep: text(
      "My next technical step is to add automated tests around ordered eligibility, duplicate applications, renewal validity, and detainment transitions.",
      "خطوتي التقنية التالية هي إضافة اختبارات آلية للأهلية المرتبة والطلبات المكررة وصلاحية التجديد وانتقالات الحجز.",
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
      {
        src: "/projects/dvld/details/localdrivinglicense.webp",
        alt: text(
          "DVLD local license applications",
          "طلبات الرخص المحلية في DVLD",
        ),
        caption: text(
          "Exhibit B / application pipeline",
          "الدليل ب / مسار الطلب",
        ),
        kind: "workflow",
      },
      {
        src: "/projects/dvld/details/test.webp",
        alt: text(
          "DVLD staged test management",
          "إدارة الاختبارات المرحلية في DVLD",
        ),
        caption: text(
          "Exhibit C / ordered tests and results",
          "الدليل ج / الاختبارات والنتائج المرتبة",
        ),
        kind: "workflow",
      },
      {
        src: "/projects/dvld/details/intlicense.webp",
        alt: text("DVLD international licenses", "الرخص الدولية في DVLD"),
        caption: text(
          "Exhibit D / international permit service",
          "الدليل د / خدمة الرخصة الدولية",
        ),
        kind: "workflow",
      },
      {
        src: "/projects/dvld/details/detain.webp",
        alt: text("DVLD detained licenses", "الرخص المحجوزة في DVLD"),
        caption: text(
          "Exhibit E / detainment history",
          "الدليل هـ / سجل الحجز",
        ),
        kind: "workflow",
      },
      {
        src: "/projects/dvld/details/people.webp",
        alt: text("DVLD people records", "سجلات الأشخاص في DVLD"),
        caption: text(
          "Exhibit F / identity records",
          "الدليل و / سجلات الهوية",
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
      "I worked in a three-person team with one other backend contributor and one frontend contributor.",
      "عملت ضمن فريق من ثلاثة أشخاص مع مطور باك إند آخر ومطور للواجهة الأمامية.",
    ),
    role: text(
      "I worked on backend architecture, booking and ticketing, and payments; backend responsibility was shared.",
      "عملت على هندسة الباك إند والحجز والتذاكر والمدفوعات؛ وكانت مسؤولية الباك إند مشتركة.",
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
          "I traced movie discovery, showtime selection, seat availability, payment, QR ticket generation, and check-in as one booking state chain.",
          "تتبعت اكتشاف الفيلم واختيار العرض وتوفر المقعد والدفع وإنشاء تذكرة QR والدخول كسلسلة واحدة لحالة الحجز.",
        ),
      },
      {
        title: text("Scheduled state changes", "تغييرات الحالة المجدولة"),
        detail: text(
          "I identified unpaid-booking expiry and upcoming-show reminders as time-driven work that cannot depend on an active request.",
          "حددت انتهاء الحجوزات غير المدفوعة وتذكيرات العروض القادمة كعمل مرتبط بالوقت لا يمكن أن يعتمد على طلب نشط.",
        ),
      },
      {
        title: text("Administrative conflicts", "تعارضات الإدارة"),
        detail: text(
          "I mapped showtime duration, hall occupancy, and branch schedules to find where administrative edits could create conflicts.",
          "ربطت مدة العرض وإشغال القاعة وجداول الفروع لاكتشاف أين قد تنشئ تعديلات الإدارة تعارضات.",
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
          "I connected movie discovery and showtimes to an interactive seat grid for the booking handoff.",
          "ربطت اكتشاف الأفلام ومواعيد العرض بشبكة مقاعد تفاعلية لبدء الحجز.",
        ),
        implementation: text(
          "I exposed public movie and seat endpoints before moving the user into authenticated booking work.",
          "وفرت نقاط API عامة للأفلام والمقاعد قبل انتقال المستخدم إلى أعمال الحجز المحمية.",
        ),
      },
      {
        title: text("Payment and ticketing", "الدفع والتذاكر"),
        detail: text(
          "I connected booking state to Stripe payment, QR ticket generation, email, and check-in lookup.",
          "ربطت حالة الحجز بالدفع عبر Stripe وإنشاء تذكرة QR والبريد والبحث عند الدخول.",
        ),
        implementation: text(
          "I coordinated payment, booking, ticket, and email concerns through backend services behind stable API contracts.",
          "نسقت الدفع والحجز والتذكرة والبريد عبر خدمات الباك إند خلف عقود API ثابتة.",
        ),
      },
      {
        title: text("Cinema administration", "إدارة السينما"),
        detail: text(
          "I supported administration for movies, media, branches, halls, seat layouts, showtimes, users, bookings, payments, and tickets.",
          "دعمت إدارة الأفلام والوسائط والفروع والقاعات والمقاعد والعروض والمستخدمين والحجوزات والمدفوعات والتذاكر.",
        ),
        implementation: text(
          "I kept role-protected admin features behind the same service and repository boundaries as customer booking.",
          "أبقيت وظائف الإدارة المحمية بالأدوار خلف حدود الخدمات والمستودعات نفسها المستخدمة في حجز العميل.",
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
          "I used a Hangfire job to expire pending bookings every minute and persist job state in SQL Server.",
          "استخدمت مهمة Hangfire لإنهاء الحجوزات المعلقة كل دقيقة وحفظ حالة المهام في SQL Server.",
        ),
      },
      {
        title: text("Authentication abuse", "إساءة استخدام المصادقة"),
        detail: text(
          "Login, refresh, and logout endpoints are sensitive public entry points.",
          "تعد نقاط الدخول والتجديد والخروج مداخل عامة حساسة.",
        ),
        response: text(
          "I rate-limited those endpoints to five requests per minute per IP.",
          "حددت تلك النقاط بخمسة طلبات في الدقيقة لكل عنوان IP.",
        ),
      },
      {
        title: text("Showtime conflicts", "تعارضات مواعيد العرض"),
        detail: text(
          "Overlapping schedules can assign one hall to incompatible showtimes.",
          "قد تسند الجداول المتداخلة قاعة واحدة إلى عروض متعارضة.",
        ),
        response: text(
          "I validated hall and time ranges through the service layer before persisting administrative schedule changes.",
          "تحققت من القاعة والنطاقات الزمنية عبر طبقة الخدمات قبل حفظ تغييرات جدول الإدارة.",
        ),
      },
      {
        title: text(
          "Payment-to-ticket handoff",
          "الانتقال من الدفع إلى التذكرة",
        ),
        detail: text(
          "A booking should not produce a valid QR ticket before payment state is accepted.",
          "لا ينبغي أن ينتج الحجز تذكرة QR صالحة قبل قبول حالة الدفع.",
        ),
        response: text(
          "I coordinated payment confirmation, booking state, ticket generation, and email in backend services instead of the controller.",
          "نسقت تأكيد الدفع وحالة الحجز وإنشاء التذكرة والبريد داخل خدمات الباك إند بدلاً من وحدة التحكم.",
        ),
      },
    ],
    quality: [
      {
        title: text("Security", "الأمان"),
        detail: text(
          "I protected system boundaries with JWT access and refresh tokens, BCrypt, RBAC, rate limiting, and admin-only job visibility.",
          "حميت حدود النظام باستخدام رموز JWT والوصول والتجديد وBCrypt وRBAC وتحديد المعدل وعرض المهام للإدارة فقط.",
        ),
      },
      {
        title: text("Reliability", "الاعتمادية"),
        detail: text(
          "I persisted scheduled expiry and reminder jobs through Hangfire in SQL Server and used Serilog for structured application logging.",
          "حفظت مهام الانتهاء والتذكير المجدولة عبر Hangfire في SQL Server واستخدمت Serilog للسجلات المنظمة.",
        ),
      },
      {
        title: text("Contract clarity", "وضوح العقود"),
        detail: text(
          "I kept standard success, pagination, and problem-detail response shapes consistent across 94 API endpoints.",
          "حافظت على اتساق أشكال النجاح والتقسيم وتفاصيل المشكلات عبر 94 نقطة API.",
        ),
      },
    ],
    outcome: text(
      "Our team delivered customer discovery, seat booking, payment, QR tickets, check-in, and broad cinema administration across Angular and .NET.",
      "سلّم فريقنا اكتشاف الأفلام وحجز المقاعد والدفع وتذاكر QR والدخول وإدارة سينما واسعة عبر Angular و.NET.",
    ),
    nextStep: text(
      "My next technical step is to add automated concurrency and integration tests for seat holds, payment confirmation, booking expiry, and ticket issuance.",
      "خطوتي التقنية التالية هي إضافة اختبارات آلية للتزامن والتكامل لحجز المقاعد وتأكيد الدفع وانتهاء الحجز وإصدار التذكرة.",
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
      {
        src: "/projects/cinemaverse/details/movie-management.webp",
        alt: text(
          "CinemaVerse movie management",
          "إدارة الأفلام في CinemaVerse",
        ),
        caption: text(
          "Exhibit E / movie administration",
          "الدليل هـ / إدارة الأفلام",
        ),
        kind: "workflow",
      },
      {
        src: "/projects/cinemaverse/details/admin-dashboard.webp",
        alt: text("CinemaVerse admin dashboard", "لوحة إدارة CinemaVerse"),
        caption: text(
          "Exhibit F / cinema operations overview",
          "الدليل و / نظرة عامة على عمليات السينما",
        ),
        kind: "workflow",
      },
    ],
  },
};

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies[slug as ProjectSlug];
}

export function hasCaseStudy(slug: string): boolean {
  return Boolean(caseStudies[slug as ProjectSlug]);
}

export const caseStudySlugs = Object.keys(caseStudies) as ProjectSlug[];
