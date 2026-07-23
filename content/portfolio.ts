import type { Locale } from "@/i18n/routing";

export const projectSlugs = [
  "buildsense",
  "bookify",
  "blood-bank-desktop",
  "blood-bank-mobile",
  "dvld",
  "cinemaverse",
] as const;

export type ProjectSlug = (typeof projectSlugs)[number];

type LocalizedText = Record<Locale, string>;

export type Project = {
  slug: ProjectSlug;
  title: string;
  shortTitle: string;
  image: string;
  imageAlt: LocalizedText;
  summary: LocalizedText;
  context: LocalizedText;
  contribution: LocalizedText;
  engineering: LocalizedText;
  evidence: LocalizedText;
  limitation: LocalizedText;
  stack: string[];
  repository: string;
  demo?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "buildsense",
    title: "BuildSense",
    shortTitle: "BuildSense",
    image: "/projects/buildsense.webp",
    imageAlt: {
      en: "BuildSense hardware discovery home page",
      ar: "الصفحة الرئيسية لمنصة BuildSense لاكتشاف مكونات الحاسوب",
    },
    summary: {
      en: "PC hardware discovery and compatibility for the Egyptian market.",
      ar: "منصة لاكتشاف مكونات الحاسوب والتحقق من توافقها للسوق المصري.",
    },
    context: {
      en: "A solo original product that turns fragmented local retailer data into one decision-support catalog.",
      ar: "منتج أصلي فردي يحوّل بيانات المتاجر المحلية المتفرقة إلى كتالوج موحد يدعم قرار الشراء.",
    },
    contribution: {
      en: "Nour designed and built the product, its Angular interfaces, Express API, ingestion worker, compatibility rules, and shared Nx packages.",
      ar: "صمّم نور المنتج وبناه، بما يشمل واجهات Angular وواجهة Express والعامل الخاص بجمع البيانات وقواعد التوافق وحزم Nx المشتركة.",
    },
    engineering: {
      en: "The system separates public web, API, and ingestion worker responsibilities. It preserves source evidence, links offers for the same product, and reports unknown compatibility facts instead of guessing.",
      ar: "يفصل النظام بين واجهة الويب العامة وواجهة API وعامل جمع البيانات، ويحفظ أدلة المصادر ويربط عروض المنتج نفسه ويعرض حقائق التوافق المجهولة بدلاً من التخمين.",
    },
    evidence: {
      en: "Public repository, deployed catalog, architecture documentation, automated tests, CI, and operational tooling are available.",
      ar: "يتوفر مستودع عام ونسخة منشورة ووثائق هندسية واختبارات آلية وCI وأدوات تشغيلية.",
    },
    limitation: {
      en: "Compatibility remains evidence-gated: missing source facts are shown as unknown, and verified usage metrics are not published.",
      ar: "يظل التوافق مرتبطاً بجودة الأدلة؛ تظهر الحقائق الناقصة كغير معروفة، ولا توجد مقاييس استخدام منشورة تم التحقق منها.",
    },
    stack: ["Angular 19", "TypeScript", "Node.js", "Express", "MongoDB", "Nx"],
    repository: "https://github.com/NourEldeenMahmoud/BuildSense",
    demo: "https://buildsense.pages.dev/",
    featured: true,
  },
  {
    slug: "bookify",
    title: "Bookify Hotel Reservation System",
    shortTitle: "Bookify",
    image: "/projects/bookify.webp",
    imageAlt: {
      en: "Bookify hotel reservation home page",
      ar: "الصفحة الرئيسية لنظام حجز الفنادق Bookify",
    },
    summary: {
      en: "A hotel reservation application covering availability, booking, payment, identity, and administration.",
      ar: "تطبيق لحجز الفنادق يغطي التوفر والحجز والدفع والهوية والإدارة.",
    },
    context: {
      en: "A team project and the clearest flagship evidence for Nour's .NET full-stack work.",
      ar: "مشروع جماعي وأوضح دليل رئيسي على عمل نور المتكامل باستخدام .NET.",
    },
    contribution: {
      en: "Nour states that he owned the backend work, booking and payment flows, identity and security, backend architecture, and frontend leadership.",
      ar: "يوضح نور أنه تولى أعمال الباك إند وتدفقات الحجز والدفع والهوية والأمان وهندسة الباك إند وقيادة الواجهة الأمامية.",
    },
    engineering: {
      en: "The application uses an N-tier structure with presentation, service, and data-access layers, plus Repository and Unit of Work patterns around EF Core and SQL Server.",
      ar: "يستخدم التطبيق بنية متعددة الطبقات تشمل العرض والخدمات والوصول إلى البيانات، مع نمطي Repository وUnit of Work حول EF Core وSQL Server.",
    },
    evidence: {
      en: "The repository documents customer and admin workflows, Stripe payment intents, SendGrid email, role-based access, health checks, and concurrency controls.",
      ar: "يوثق المستودع تدفقات العملاء والإدارة وStripe Payment Intents والبريد عبر SendGrid والصلاحيات والفحوصات الصحية والتحكم في التزامن.",
    },
    limitation: {
      en: "The previously listed deployment was unreachable during review, so this portfolio links to the repository rather than presenting an unverified live demo.",
      ar: "تعذر الوصول إلى النسخة المنشورة المذكورة سابقاً أثناء المراجعة، لذلك يرتبط المعرض بالمستودع بدلاً من عرض نسخة حية غير مؤكدة.",
    },
    stack: [
      ".NET 9",
      "ASP.NET Core MVC",
      "EF Core",
      "SQL Server",
      "Stripe",
      "Identity",
    ],
    repository: "https://github.com/NourEldeenMahmoud/Bookify",
  },
  {
    slug: "blood-bank-desktop",
    title: "Blood Bank Management System",
    shortTitle: "BBMS Desktop",
    image: "/projects/blood-bank-desktop.webp",
    imageAlt: {
      en: "Blood Bank desktop operations dashboard",
      ar: "لوحة عمليات نظام بنك الدم المكتبي",
    },
    summary: {
      en: "A Windows desktop system for donations, inventory, transfusions, patients, and employee access.",
      ar: "نظام مكتبي لويندوز لإدارة التبرعات والمخزون ونقل الدم والمرضى وصلاحيات الموظفين.",
    },
    context: {
      en: "Part of a university team platform spanning staff operations, a donor application, an API, and one SQL Server domain.",
      ar: "جزء من منصة جامعية جماعية تضم عمليات الموظفين وتطبيق المتبرعين وواجهة API ونطاق بيانات موحداً على SQL Server.",
    },
    contribution: {
      en: "Nour describes this as a university team project in which he implemented most of the system; the portfolio does not claim sole ownership.",
      ar: "يصف نور المشروع بأنه عمل جامعي جماعي نفذ فيه معظم النظام، ولا يدعي المعرض ملكيته الفردية الكاملة.",
    },
    engineering: {
      en: "The desktop application follows presentation, business, and data-access tiers and supports donor records, blood units, testing, matching, transfusion, reporting, and role-based access.",
      ar: "يتبع التطبيق المكتبي طبقات العرض ومنطق الأعمال والوصول إلى البيانات، ويدعم سجلات المتبرعين ووحدات الدم والفحوصات والمطابقة ونقل الدم والتقارير والصلاحيات.",
    },
    evidence: {
      en: "The public repository includes source code, setup instructions, operational screenshots, and the documented three-tier structure.",
      ar: "يتضمن المستودع العام الكود وتعليمات التشغيل وصور العمليات وتوثيق البنية ثلاثية الطبقات.",
    },
    limitation: {
      en: "Exact teammate attribution, test coverage, and a code-verified cross-platform architecture diagram remain documentation gaps.",
      ar: "ما زال توثيق مساهمات أعضاء الفريق وتغطية الاختبارات ومخطط البنية متعدد المنصات المتحقق منه من الكود غير مكتمل.",
    },
    stack: [".NET Framework", "WinForms", "C#", "SQL Server", "Guna UI2"],
    repository: "https://github.com/NourEldeenMahmoud/BBMS-Project",
  },
  {
    slug: "blood-bank-mobile",
    title: "Blood Bank Mobile App",
    shortTitle: "BBMS Mobile",
    image: "/projects/blood-bank-mobile.jpg",
    imageAlt: {
      en: "Blood Bank donor mobile application home screen",
      ar: "الشاشة الرئيسية لتطبيق المتبرعين في منصة بنك الدم",
    },
    summary: {
      en: "A Flutter donor experience connected to a .NET API and the wider blood-bank platform.",
      ar: "تجربة للمتبرعين مبنية بـFlutter ومتصلة بواجهة .NET وبمنصة بنك الدم الأوسع.",
    },
    context: {
      en: "The donor-facing half of the university Blood Bank platform, designed to connect appointments and donation history with staff operations.",
      ar: "الجزء الموجه للمتبرعين من منصة بنك الدم الجامعية، ويربط المواعيد وسجل التبرع بعمليات الموظفين.",
    },
    contribution: {
      en: "It belongs to the same team system in which Nour reports implementing most of the platform; individual module ownership is not published as a percentage.",
      ar: "ينتمي إلى النظام الجماعي نفسه الذي يذكر نور أنه نفذ معظمه، ولا تُنشر ملكية الوحدات الفردية كنسب مئوية.",
    },
    engineering: {
      en: "Flutter uses Provider state management and REST services to support authentication, profiles, appointments, donation history, and notifications through an ASP.NET Core API.",
      ar: "يستخدم Flutter إدارة الحالة عبر Provider وخدمات REST لدعم تسجيل الدخول والملفات والمواعيد وسجل التبرع والإشعارات من خلال ASP.NET Core API.",
    },
    evidence: {
      en: "The repository documents the Flutter application, ASP.NET Core API, shared database setup, Swagger access, and the end-to-end appointment workflow.",
      ar: "يوثق المستودع تطبيق Flutter وASP.NET Core API وإعداد قاعدة البيانات المشتركة وSwagger وتدفق المواعيد الكامل.",
    },
    limitation: {
      en: "Notification behavior, deployment status, automated tests, and the exact desktop/API/mobile data flow still need stronger published evidence.",
      ar: "ما زالت الإشعارات وحالة النشر والاختبارات الآلية وتدفق البيانات الدقيق بين سطح المكتب وAPI والموبايل بحاجة إلى أدلة منشورة أقوى.",
    },
    stack: [
      "Flutter",
      "Dart",
      "ASP.NET Core 6",
      "REST",
      "Provider",
      "SQL Server",
    ],
    repository: "https://github.com/NourEldeenMahmoud/Blood-Bank-mobile-App",
  },
  {
    slug: "dvld",
    title: "Driving and Vehicle License Department",
    shortTitle: "DVLD",
    image: "/projects/dvld.webp",
    imageAlt: {
      en: "DVLD local driving license applications screen",
      ar: "شاشة طلبات رخص القيادة المحلية في نظام DVLD",
    },
    summary: {
      en: "A Windows Forms application for driving licenses, applications, tests, people, and users.",
      ar: "تطبيق Windows Forms لإدارة رخص القيادة والطلبات والاختبارات والأشخاص والمستخدمين.",
    },
    context: {
      en: "A supporting .NET desktop project focused on a rules-heavy government licensing domain.",
      ar: "مشروع مكتبي داعم باستخدام .NET يركز على نطاق حكومي كثيف القواعد لإدارة التراخيص.",
    },
    contribution: {
      en: "The public repository establishes the implementation and feature scope, but it does not publish a detailed contributor breakdown.",
      ar: "يثبت المستودع العام نطاق التنفيذ والخصائص، لكنه لا ينشر توزيعاً تفصيلياً لمساهمات المطورين.",
    },
    engineering: {
      en: "The solution separates Windows Forms presentation, business rules, and ADO.NET data access. It covers license classes, staged tests, renewals, replacements, international permits, and detainment.",
      ar: "يفصل الحل بين عرض Windows Forms وقواعد الأعمال والوصول للبيانات عبر ADO.NET، ويغطي فئات الرخص والاختبارات المرحلية والتجديد والاستبدال والرخص الدولية والحجز.",
    },
    evidence: {
      en: "The repository includes the solution, database backup instructions, feature documentation, and interface screenshots.",
      ar: "يتضمن المستودع الحل وتعليمات استعادة قاعدة البيانات وتوثيق الخصائص وصور الواجهة.",
    },
    limitation: {
      en: "This is supporting work: validation results, deployment, and detailed ownership evidence are not presented as verified claims.",
      ar: "هذا عمل داعم؛ لا تُعرض نتائج تحقق أو نشر أو أدلة ملكية تفصيلية على أنها حقائق مؤكدة.",
    },
    stack: ["C#", ".NET Framework", "Windows Forms", "ADO.NET", "SQL Server"],
    repository: "https://github.com/NourEldeenMahmoud/DVLD",
  },
  {
    slug: "cinemaverse",
    title: "CinemaVerse",
    shortTitle: "CinemaVerse",
    image: "/projects/cinemaverse.webp",
    imageAlt: {
      en: "CinemaVerse movie booking home page",
      ar: "الصفحة الرئيسية لمنصة حجز السينما CinemaVerse",
    },
    summary: {
      en: "A cinema ticket platform covering discovery, seats, bookings, payments, tickets, and administration.",
      ar: "منصة لتذاكر السينما تشمل الاستكشاف والمقاعد والحجوزات والمدفوعات والتذاكر والإدارة.",
    },
    context: {
      en: "A team project and supporting .NET backend case study. Nour's public repository is a fork of the team repository.",
      ar: "مشروع جماعي ودراسة حالة داعمة للباك إند باستخدام .NET، ومستودع نور العام نسخة متفرعة من مستودع الفريق.",
    },
    contribution: {
      en: "Nour worked on backend architecture, booking and ticketing, and payments. Backend work was shared with a teammate and is not presented as sole ownership.",
      ar: "عمل نور على هندسة الباك إند والحجز والتذاكر والمدفوعات، وشارك زميلاً في الباك إند ولا يُعرض العمل كملكية فردية.",
    },
    engineering: {
      en: "Angular communicates with an ASP.NET Core service and repository stack. The documented platform includes JWT, Stripe, QR tickets, Hangfire jobs, email, rate limiting, and an admin surface.",
      ar: "يتواصل Angular مع طبقات الخدمة والمستودعات في ASP.NET Core، وتشمل المنصة الموثقة JWT وStripe وتذاكر QR ومهام Hangfire والبريد وتحديد المعدل وواجهة الإدارة.",
    },
    evidence: {
      en: "The repository README documents the full stack, 94 API endpoints, user and admin workflows, authentication behavior, and background jobs.",
      ar: "يوثق README التقنيات و94 نقطة API وتدفقات المستخدم والإدارة وسلوك المصادقة والمهام الخلفية.",
    },
    limitation: {
      en: "Commit-level ownership, seat-concurrency behavior, payment-flow evidence, and automated test coverage remain publication gaps.",
      ar: "ما زالت ملكية الالتزامات وسلوك تزامن المقاعد وأدلة تدفق الدفع وتغطية الاختبارات الآلية فجوات في النشر.",
    },
    stack: [
      "Angular 21",
      ".NET 9",
      "EF Core",
      "SQL Server",
      "JWT",
      "Stripe",
      "Hangfire",
    ],
    repository: "https://github.com/NourEldeenMahmoud/CinemaVerse",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
