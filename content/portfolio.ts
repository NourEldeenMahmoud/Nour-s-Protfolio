import type { Locale } from "@/i18n/routing";
import { projectMediaSets } from "@/content/project-media";

export const projectSlugs = [
  "buildsense",
  "cinemaverse",
  "bookify",
  "frontend-mini-projects",
  "how-to-train-your-ai",
  "sharp-shooter",
  "royal-run",
  "galaxy-strike",
  "rocket-boost",
  "blood-bank-desktop",
  "dvld",
  "blood-bank-mobile",
  "met-summaries",
] as const;

export type ProjectSlug = (typeof projectSlugs)[number];

export type CategoryId =
  "web" | "game-development" | "desktop" | "mobile-applications" | "summaries";

/**
 * Product — a system, application, or service with a defined problem and users.
 * Game    — an interactive Unity / game-engine build.
 * Collection — a curated set of smaller items (landing pages, summaries, etc.).
 */
export type ProjectKind = "product" | "game" | "collection";

type LocalizedText = Record<Locale, string>;

export type ProjectMedia = {
  id: string;
  type: "image" | "video";
  src: string;
  alt: LocalizedText;
  caption?: LocalizedText;
  poster?: string;
  thumbnail?: string;
  group?: string;
  purpose?: "product" | "architecture" | "workflow" | "evidence";
  featured?: boolean;
  orientation?: "landscape" | "portrait" | "square";
  device?: "browser" | "desktop" | "mobile" | "diagram" | "none";
  treatment?: "stage" | "full" | "pair" | "sequence";
  theme?: "amber" | "cyan" | "neutral";
  focalPosition?: string;
  /** Playback length in seconds. Required for image-sequence timing. */
  duration?: number;
  transition?: "crossfade" | "masked-reveal" | "scale";
};

export type Project = {
  slug: ProjectSlug;
  category: CategoryId;
  kind: ProjectKind;
  title: string;
  shortTitle: string;
  image: string;
  imageAlt: LocalizedText;
  gallery?: Array<{ src: string; alt: LocalizedText }>;
  /** Rich media takes precedence over image/gallery in Project Exploration. */
  media?: ProjectMedia[];
  summary: LocalizedText;
  context: LocalizedText;
  contribution: LocalizedText;
  engineering: LocalizedText;
  evidence: LocalizedText;
  limitation: LocalizedText;
  stack: string[];
  highlights?: string[];
  repository: string;
  demo?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  // ──────────────────────────── WEB ────────────────────────────
  {
    slug: "buildsense",
    category: "web",
    kind: "product",
    title: "BuildSense",
    shortTitle: "BuildSense",
    image: "/projects/buildsense/details/home.webp",
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
      en: "I designed and built the product, its Angular interfaces, Express API, ingestion worker, compatibility rules, and shared Nx packages.",
      ar: "صممت المنتج وبنيته، بما يشمل واجهات Angular وواجهة Express وعامل جمع البيانات وقواعد التوافق وحزم Nx المشتركة.",
    },
    engineering: {
      en: "The system separates public web, API, and ingestion worker responsibilities. It preserves source evidence, links offers for the same product, and reports unknown compatibility facts instead of guessing.",
      ar: "يفصل النظام بين واجهة الويب العامة وواجهة API وعامل جمع البيانات، ويحفظ أدلة المصادر ويربط عروض المنتج نفسه ويعرض حقائق التوافق المجهولة بدلاً من التخمين.",
    },
    evidence: {
      en: "I publish the source, live catalog, architecture documentation, automated tests, CI, and operational tooling.",
      ar: "أنشر الكود والكتالوج الحي ووثائق البنية والاختبارات الآلية وCI وأدوات التشغيل.",
    },
    limitation: {
      en: "I keep compatibility evidence-gated: missing source facts appear as unknown rather than a guessed result.",
      ar: "أبقي التوافق مشروطاً بالأدلة؛ تظهر حقائق المصدر الناقصة كغير معروفة بدلاً من نتيجة مخمنة.",
    },
    stack: ["Angular 19", "TypeScript", "Node.js", "Express", "MongoDB", "Nx"],
    highlights: [
      "Search, filters, sorting, pagination, product offers, and source-store links.",
      "Persistent eight-slot PC builder with compatibility states: compatible, warning, incompatible, and unknown.",
      "Multi-store worker pipeline with immutable snapshots, identity matching, offer publishing, and fact extraction.",
      "Admin console for scrape runs, match reviews, data quality, compatibility coverage, and reprocessing jobs.",
    ],
    repository: "https://github.com/NourEldeenMahmoud/BuildSense",
    demo: "https://buildsense.pages.dev/",
    featured: true,
  },
  {
    slug: "cinemaverse",
    category: "web",
    kind: "product",
    title: "CinemaVerse",
    shortTitle: "CinemaVerse",
    image: "/projects/cinemaverse/details/home.webp",
    imageAlt: {
      en: "CinemaVerse movie booking home page",
      ar: "الصفحة الرئيسية لمنصة حجز السينما CinemaVerse",
    },
    summary: {
      en: "A cinema ticket platform covering discovery, seats, bookings, payments, tickets, and administration.",
      ar: "منصة لتذاكر السينما تشمل الاستكشاف والمقاعد والحجوزات والمدفوعات والتذاكر والإدارة.",
    },
    context: {
      en: "I built CinemaVerse with a three-person team as a full cinema booking platform and .NET backend case study.",
      ar: "بنيت CinemaVerse مع فريق من ثلاثة أشخاص كمنصة متكاملة لحجز السينما ودراسة حالة للباك إند باستخدام .NET.",
    },
    contribution: {
      en: "I worked on backend architecture, booking and ticketing, and payments. I shared backend responsibility with a teammate.",
      ar: "عملت على هندسة الباك إند والحجز والتذاكر والمدفوعات، وشاركت مسؤولية الباك إند مع زميل.",
    },
    engineering: {
      en: "Angular communicates with an ASP.NET Core service and repository stack that integrates JWT, Stripe, QR tickets, Hangfire jobs, email, rate limiting, and an admin surface.",
      ar: "يتواصل Angular مع طبقات الخدمة والمستودعات في ASP.NET Core التي تتكامل مع JWT وStripe وتذاكر QR ومهام Hangfire والبريد وتحديد المعدل وواجهة الإدارة.",
    },
    evidence: {
      en: "Our project includes the full stack, 94 API endpoints, customer and admin workflows, authentication, and background jobs.",
      ar: "يتضمن مشروعنا التقنيات الكاملة و94 نقطة API وتدفقات العميل والإدارة والمصادقة والمهام الخلفية.",
    },
    limitation: {
      en: "I present my backend scope as shared; the next technical work is automated coverage for seat concurrency, payment, expiry, and ticket issuance.",
      ar: "أعرض نطاق عملي في الباك إند كمسؤولية مشتركة؛ والعمل التقني التالي هو تغطية آلية لتزامن المقاعد والدفع والانتهاء وإصدار التذاكر.",
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
    highlights: [
      "Movie discovery with search, genre and language filters, cast, images, and showtimes.",
      "Interactive seat selection, real-time availability, Stripe payments, QR tickets, and check-in management.",
      "Admin surfaces for movies, media, branches, halls, seat layouts, genres, showtimes, users, and bookings.",
      "JWT access and refresh tokens, rate-limited auth, Hangfire expiry/reminder jobs, MailKit, and Serilog.",
    ],
    repository: "https://github.com/NourEldeenMahmoud/CinemaVerse",
  },
  {
    slug: "bookify",
    category: "web",
    kind: "product",
    title: "Bookify Hotel Reservation System",
    shortTitle: "Bookify",
    image: "/projects/bookify/details/04-home.webp",
    imageAlt: {
      en: "Bookify hotel reservation home page",
      ar: "الصفحة الرئيسية لنظام حجز الفنادق Bookify",
    },
    summary: {
      en: "A hotel reservation application covering availability, booking, payment, identity, and administration.",
      ar: "تطبيق لحجز الفنادق يغطي التوفر والحجز والدفع والهوية والإدارة.",
    },
    context: {
      en: "I led this team project as my flagship .NET full-stack case study.",
      ar: "قدت هذا المشروع الجماعي كدراسة الحالة الرئيسية لعملي المتكامل باستخدام .NET.",
    },
    contribution: {
      en: "I owned the backend work, booking and payment flows, identity and security, backend architecture, and frontend leadership.",
      ar: "توليت أعمال الباك إند وتدفقات الحجز والدفع والهوية والأمان وهندسة الباك إند وقيادة الواجهة الأمامية.",
    },
    engineering: {
      en: "The application uses an N-tier structure with presentation, service, and data-access layers, plus Repository and Unit of Work patterns around EF Core and SQL Server.",
      ar: "يستخدم التطبيق بنية متعددة الطبقات تشمل العرض والخدمات والوصول إلى البيانات، مع نمطي Repository وUnit of Work حول EF Core وSQL Server.",
    },
    evidence: {
      en: "I implemented customer and admin workflows, Stripe Payment Intents, SendGrid email, role-based access, health checks, and concurrency controls.",
      ar: "نفذت تدفقات العملاء والإدارة وStripe Payment Intents والبريد عبر SendGrid والصلاحيات وفحوصات الصحة والتحكم في التزامن.",
    },
    limitation: {
      en: "I currently present the source and product evidence rather than a live demo; automated booking and payment integration coverage is the next technical step.",
      ar: "أعرض حالياً الكود وأدلة المنتج بدلاً من نسخة حية؛ وإضافة تغطية تكامل آلية للحجز والدفع هي الخطوة التقنية التالية.",
    },
    stack: [
      ".NET 9",
      "ASP.NET Core MVC",
      "EF Core",
      "SQL Server",
      "Stripe",
      "Identity",
    ],
    highlights: [
      "Date-range room search, availability checks, room details, booking history, and customer profiles.",
      "Admin dashboard for rooms, room types, bookings, refunds, users, occupancy, and revenue views.",
      "Stripe Payment Intents, SendGrid transactional email, ASP.NET Identity, RBAC, lockout, and CSRF protection.",
      "N-tier structure with Repository, Unit of Work, ViewModel, service layer, migrations, and health checks.",
    ],
    repository: "https://github.com/NourEldeenMahmoud/Bookify",
  },
  {
    slug: "frontend-mini-projects",
    category: "web",
    kind: "collection",
    title: "Frontend Mini Projects",
    shortTitle: "Frontend Mini",
    image: "/projects/frontend-mini-projects/details/01-index.webp",
    imageAlt: {
      en: "Frontend Mini Projects landing pages collection index",
      ar: "فهرس مجموعة مشاريع الواجهات الأمامية المصغّرة",
    },
    summary: {
      en: "Six responsive landing-page challenges built with HTML and Tailwind CSS.",
      ar: "ستة تحديات لصفحات هبوط متجاوبة مبنية بـHTML وTailwind CSS.",
    },
    context: {
      en: "Practice challenges from Frontend Mentor completed to sharpen responsive layout and modern component structure.",
      ar: "تحديات تدريبية من Frontend Mentor أُنجزت لتعزيز التخطيط المتجاوب وهيكل المكونات الحديث.",
    },
    contribution: {
      en: "Nour completed all six challenges individually, from design interpretation through pixel-accurate layout implementation and GitHub Pages deployment.",
      ar: "أنجز نور التحديات الستة بمفرده، من تفسير التصميم إلى التنفيذ الدقيق والنشر على GitHub Pages.",
    },
    engineering: {
      en: "Each project uses semantic HTML5, utility-first Tailwind CSS, and minimal JavaScript where needed for mobile overlays, accordions, and tabs.",
      ar: "يستخدم كل مشروع HTML5 دلالياً وTailwind CSS قائماً على المرافق وجافا سكريبت محدوداً للقوائم المنبثقة والتبويبات.",
    },
    evidence: {
      en: "All six landing pages are live on GitHub Pages, and the repository contains the source code for each challenge.",
      ar: "الصفحات الست منشورة على GitHub Pages والمستودع يحتوي على كود المصدر لكل تحدٍّ.",
    },
    limitation: {
      en: "These are design implementation exercises based on Frontend Mentor challenges, not original product designs.",
      ar: "هذه تمارين تنفيذ تصاميم استناداً إلى تحديات Frontend Mentor وليست تصاميم منتج أصلية.",
    },
    stack: ["HTML5", "Tailwind CSS", "JavaScript", "GitHub Pages"],
    highlights: [
      "Bookmark Manager — tabbed features section with accordion FAQ.",
      "Shortly — responsive URL shortener landing page layout.",
      "Fylo — dark/light theme landing page with feature cards.",
      "Loopstudios — responsive VR landing page with CSS Grid gallery.",
      "Testimonials Grid — multi-column responsive grid layout.",
      "Clipboard — feature showcase landing page.",
    ],
    repository: "https://github.com/NourEldeenMahmoud/frontend-mini-projects",
    demo: "https://noureldeenmahmoud.github.io/frontend-mini-projects/",
  },

  // ──────────────────────────── GAME DEVELOPMENT ────────────────────────────
  {
    slug: "how-to-train-your-ai",
    category: "game-development",
    kind: "game",
    title: "How To Train Your AI",
    shortTitle: "How To Train Your AI",
    image: "/projects/how-to-train-your-ai/details/01-gameplay.webp",
    imageAlt: {
      en: "How To Train Your AI gameplay — narrative introduction",
      ar: "طريقة لعب How To Train Your AI — المقدمة السردية",
    },
    summary: {
      en: "A narrative first-person Unity 6 experience where the player trains and repairs a robot across three interactive mini-games.",
      ar: "تجربة سردية من منظور الشخص الأول بـUnity 6 يدرّب فيها اللاعب روبوتاً ويصلحه عبر ثلاث ألعاب مصغرة تفاعلية.",
    },
    context: {
      en: "A university game development project focusing on narrative integration, state switching, and interactive mini-game mechanics.",
      ar: "مشروع تطوير ألعاب جامعي يركز على الدمج السردي والتبديل بين الحالات وميكانيكا الألعاب المصغرة التفاعلية.",
    },
    contribution: {
      en: "Built in a team of four. Nour developed the core systems, Mini-Game 1 (calibration), and robot logic. Omar worked on Mini-Game 1, Oraby on Mini-Game 2 (energy & path efficiency), and Aya on Mini-Game 3 (spatial push puzzle) and post-credits.",
      ar: "بُنيت ضمن فريق من أربعة. طور نور الأنظمة الأساسية واللعبة المصغرة 1 (المعايرة) ومنطق الروبوت، وعمل عمر على اللعبة 1، وعرابي على اللعبة 2 (الطاقة والكفاءة)، وآية على اللعبة 3 (لغز الدفع المكاني) وشاشة الخاتمة.",
    },
    engineering: {
      en: "The project uses Unity 6 with URP, Cinemachine, AI Navigation, and Input System. Features player/robot control switching, persistent statistics, fault events based on trial results, and event-driven scene transitions.",
      ar: "يستخدم المشروع Unity 6 مع URP وCinemachine وAI Navigation وInput System. يتضمن التبديل بين التحكم باللاعب والروبوت، وإحصائيات مستمرة، وأحداث أعطال استناداً لنتائج الاختبار، وانتقالات مشاهد قائمة على الأحداث.",
    },
    evidence: {
      en: "The repository contains the complete Unity 6 project, README documentation, architectural notes, and full game scene setup.",
      ar: "يحتوي المستودع على مشروع Unity 6 الكامل وتوثيق README والملاحظات الهندسية وإعداد المشاهد الكامل.",
    },
    limitation: {
      en: "This is a narrative training experience with custom puzzle scripts; it does not utilize autonomous agents or external machine learning toolkits.",
      ar: "هذه تجربة تدريب سردية بسكريبتات ألغاز مخصصة؛ ولا تستخدم وكلاء ذاتية أو أدوات التعلم الآلي الخارجي.",
    },
    stack: [
      "Unity 6",
      "C#",
      "Universal Render Pipeline",
      "Cinemachine",
      "Input System",
      "AI Navigation",
      "TextMeshPro",
      "Timeline",
    ],
    highlights: [
      "Narrative introduction with grandfather messages and story-driven progression.",
      "Control switching between player interaction and robot operational view.",
      "Three distinct training mini-games: control calibration, energy/path efficiency, and spatial push puzzle.",
      "Persistent robot statistics, fault event system, and custom AI pathfinding.",
    ],
    repository: "https://github.com/NourEldeenMahmoud/HowToTrainYourAI-Game",
  },
  {
    slug: "sharp-shooter",
    category: "game-development",
    kind: "game",
    title: "Sharp Shooter",
    shortTitle: "Sharp Shooter",
    image: "/projects/sharp-shooter/details/01-gameplay.webp",
    imageAlt: {
      en: "Sharp Shooter precision aim-training gameplay",
      ar: "طريقة لعب Sharp Shooter — تدريب الرماية الدقيقة",
    },
    summary: {
      en: "A first-person precision aim-training game with raycast shooting, target spawning, and accuracy tracking.",
      ar: "لعبة تدريب رماية دقيقة من منظور الشخص الأول تعتمد على إطلاق النار بـraycast وتوليد الأهداف وتتبع الدقة.",
    },
    context: {
      en: "A Unity mechanics study exploring first-person aim, target lifecycles, and time-limited scoring.",
      ar: "دراسة ميكانيكا في Unity تستكشف التصويب من منظور الشخص الأول ودورة حياة الأهداف والتسجيل الموقوت.",
    },
    contribution: {
      en: "Developed as part of the Unity Projects repository.",
      ar: "طُوِّرت كجزء من مستودع مشاريع Unity.",
    },
    engineering: {
      en: "Uses Unity physics raycasts for hit detection, target spawning and lifetime management, hit/miss UI feedback, and end-of-round score summaries.",
      ar: "تستخدم raycasts في فيزياء Unity لكشف الإصابة، وإدارة توليد الأهداف وعمرها، وتغذية راجعة في الواجهة للإصابة والخطأ، وموجز النقاط بنهاية الجولة.",
    },
    evidence: {
      en: "Verified source code and scene files are available in the shared Unity-Projects repository.",
      ar: "كود المصدر وملفات المشاهد المتحقق منها متاحة في مستودع Unity-Projects المشترك.",
    },
    limitation: {
      en: "Focused aim-training prototype without health bars, ammunition management, or progressive enemy waves.",
      ar: "نموذج أولي لتدريب التصويب بدون شريط صحة أو إدارة ذخيرة أو موجات أعداء متصاعدة.",
    },
    stack: ["Unity", "C#"],
    highlights: [
      "Raycast-based instant hit detection.",
      "Time-limited rounds with target lifecycle management.",
      "Accuracy tracking and hit/miss visual feedback.",
      "End-of-round performance summary UI.",
    ],
    repository: "https://github.com/NourEldeenMahmoud/Unity-Projects",
  },
  {
    slug: "royal-run",
    category: "game-development",
    kind: "game",
    title: "Royal Run",
    shortTitle: "Royal Run",
    image: "/projects/royal-run/details/01-gameplay.webp",
    imageAlt: {
      en: "Royal Run endless runner gameplay",
      ar: "طريقة لعب Royal Run — لعبة الركض اللانهائي",
    },
    summary: {
      en: "An endless runner featuring automatic forward movement, procedural obstacle generation, and high-score tracking.",
      ar: "لعبة ركض لانهائي تتميز بالحركة الأمامية التلقائية وتوليد العقبات الإجرائي وتتبع أعلى النقاط.",
    },
    context: {
      en: "A Unity project exploring continuous movement mechanics, obstacle spawner timing, and collision detection.",
      ar: "مشروع Unity يستكشف ميكانيكا الحركة المستمرة وتوقيت توليد العقبات وكشف التصادم.",
    },
    contribution: {
      en: "Developed as part of the Unity Projects repository.",
      ar: "طُوِّرت كجزء من مستودع مشاريع Unity.",
    },
    engineering: {
      en: "Implements automatic character forward momentum, obstacle spawning ahead of the player, speed scaling over distance, animations for running, jumping, and death, and game-over state resetting.",
      ar: "تنفّذ الزخم الأمامي التلقائي للشخصية، وتوليد العقبات أمام اللاعب، وتدرج السرعة مع المسافة، وتحريك الركض والقفز والموت، وإعادة ضبط حالة نهاية اللعبة.",
    },
    evidence: {
      en: "Verified source code and scene files are available in the shared Unity-Projects repository.",
      ar: "كود المصدر وملفات المشاهد المتحقق منها متاحة في مستودع Unity-Projects المشترك.",
    },
    limitation: {
      en: "Single-lane runner prototype without coin collection, lane switching, or object pooling optimization.",
      ar: "نموذج أولي لركض في مسار واحد بدون جمع عملات أو تبديل مسارات أو تحسين تجميع الأجسام.",
    },
    stack: ["Unity", "C#"],
    highlights: [
      "Automatic forward movement and speed acceleration.",
      "Procedural obstacle spawning based on distance.",
      "Running, jumping, and obstacle collision animations.",
      "Distance-based score tracking and high-score saving.",
    ],
    repository: "https://github.com/NourEldeenMahmoud/Unity-Projects",
  },
  {
    slug: "galaxy-strike",
    category: "game-development",
    kind: "game",
    title: "Galaxy Strike",
    shortTitle: "Galaxy Strike",
    image: "/projects/galaxy-strike/details/01-gameplay.webp",
    imageAlt: {
      en: "Galaxy Strike 2D space shooter gameplay",
      ar: "طريقة لعب Galaxy Strike — إطلاق النار الفضائي ثنائي الأبعاد",
    },
    summary: {
      en: "A 2D top-down space shooter featuring free movement, continuous projectile fire, and wave spawning.",
      ar: "لعبة إطلاق نار فضائية ثنائية الأبعاد من الأعلى تتميز بالحركة الحرة وإطلاق المقذوفات المستمر وتوليد الموجات.",
    },
    context: {
      en: "A 2D arcade shooter project focusing on projectile pooling, enemy wave mechanics, and scrolling visual effects.",
      ar: "مشروع لعبة أركيد ثنائية الأبعاد يركز على تجميع المقذوفات وميكانيكا موجات الأعداء وتأثيرات التمرير البصري.",
    },
    contribution: {
      en: "Developed as part of the Unity Projects repository.",
      ar: "طُوِّرت كجزء من مستودع مشاريع Unity.",
    },
    engineering: {
      en: "Features 2D ship physics movement, projectile object pooling, continuous weapon firing, player and enemy health management, scrolling space background shaders, and ShaderLab custom visual work.",
      ar: "تتضمن حركة فيزياء السفن ثنائية الأبعاد، وتجميع مقذوفات الأسلحة، وإطلاق النار المستمر، وإدارة صحة اللاعب والأعداء، ومظلات الخلفية الفضائية المتحركة، وتأثيرات ShaderLab المخصصة.",
    },
    evidence: {
      en: "Verified source code, shaders, and scene files are available in the shared Unity-Projects repository.",
      ar: "كود المصدر والمظلات وملفات المشاهد المتحقق منها متاحة في مستودع Unity-Projects المشترك.",
    },
    limitation: {
      en: "2D wave shooter prototype without multi-phase bosses, power-up items, or complex state-machine bosses.",
      ar: "نموذج أولي لموجات إطلاق النار ثنائي الأبعاد بدون رؤساء متعددين المراحل أو عناصر طاقة أو آلات حالة معقدة للرؤساء.",
    },
    stack: ["Unity", "C#", "ShaderLab"],
    highlights: [
      "Free 2D top-down player ship movement.",
      "Projectile object pooling for laser weaponry.",
      "Enemy wave spawner and health system.",
      "Scrolling background shader with HLSL visual work.",
    ],
    repository: "https://github.com/NourEldeenMahmoud/Unity-Projects",
  },
  {
    slug: "rocket-boost",
    category: "game-development",
    kind: "game",
    title: "Rocket Boost",
    shortTitle: "Rocket Boost",
    image: "/projects/rocket-boost/details/01-gameplay.webp",
    imageAlt: {
      en: "Rocket Boost 3D physics flight gameplay",
      ar: "طريقة لعب Rocket Boost — الطيران الفيزيائي ثلاثي الأبعاد",
    },
    summary: {
      en: "A 3D physics-based rocket flight game where players navigate obstacle courses using thrust and rotational control.",
      ar: "لعبة طيران صاروخي ثلاثية الأبعاد قائمة على الفيزياء يتنقل فيها اللاعبون عبر مسارات العقبات باستخدام الدفع والدوران.",
    },
    context: {
      en: "Internal project name: Astro Rocket. A 3D physics challenge built to study Rigidbody forces, torque, and collision detection.",
      ar: "اسم المشروع الداخلي: Astro Rocket. تحدي فيزياء ثلاثي الأبعاد بُني لدراسة قوى Rigidbody والعزم وكشف التصادم.",
    },
    contribution: {
      en: "Developed as part of the Unity Projects repository under the name Astro Rocket.",
      ar: "طُوِّرت كجزء من مستودع مشاريع Unity تحت اسم Astro Rocket.",
    },
    engineering: {
      en: "Uses Rigidbody thrust vectors and torque rotation, collision detection for landing pads versus hazard obstacles, particle systems for rocket engine trails, audio feedback, and multi-level scene progression.",
      ar: "تستخدم متجهات دفع Rigidbody ودوران العزم، وكشف التصادم لمنصات الهبوط مقابل عقبات المخاطر، وأنظمة الجسيمات لشرار محرك الصاروخ، والتغذية الراجعة الصوتية، والتقدم عبر مستويات متعددة.",
    },
    evidence: {
      en: "Verified source code and level scenes exist under Astro Rocket in the shared Unity-Projects repository.",
      ar: "كود المصدر ومشاهد المستويات المتحقق منها موجودة تحت اسم Astro Rocket في مستودع Unity-Projects المشترك.",
    },
    limitation: {
      en: "Physics flight prototype without mid-level checkpoints, save systems, or persistent progress saving.",
      ar: "نموذج أولي للطيران الفيزيائي بدون نقاط تفتيش منتصف المستوى أو نظام حفظ أو تقدم مستمر.",
    },
    stack: ["Unity", "C#"],
    highlights: [
      "Rigidbody physics thrust and rotational torque controls.",
      "Landing pad vs hazard collision detection.",
      "Engine particle trails and sound effects.",
      "Multi-stage obstacle level progression.",
    ],
    repository: "https://github.com/NourEldeenMahmoud/Unity-Projects",
  },

  // ──────────────────────────── DESKTOP ────────────────────────────
  {
    slug: "blood-bank-desktop",
    category: "desktop",
    kind: "product",
    title: "Blood Bank Management System",
    shortTitle: "BBMS Desktop",
    image: "/projects/blood-bank-desktop/details/02-dashboard.webp",
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
      en: "I implemented most of this university team system while sharing responsibility with my teammate.",
      ar: "نفذت معظم هذا النظام الجامعي الجماعي مع مشاركة المسؤولية مع زميلي.",
    },
    engineering: {
      en: "The desktop application follows presentation, business, and data-access tiers and supports donor records, blood units, testing, matching, transfusion, reporting, and role-based access.",
      ar: "يتبع التطبيق المكتبي طبقات العرض ومنطق الأعمال والوصول إلى البيانات، ويدعم سجلات المتبرعين ووحدات الدم والفحوصات والمطابقة ونقل الدم والتقارير والصلاحيات.",
    },
    evidence: {
      en: "I publish the source, setup instructions, operational screenshots, and three-tier structure.",
      ar: "أنشر الكود وتعليمات التشغيل وصور العمليات والبنية ثلاثية الطبقات.",
    },
    limitation: {
      en: "I present this as shared team work; automated lifecycle coverage for compatibility, expiry, allocation, and transfusion is the next technical step.",
      ar: "أعرض هذا كعمل جماعي مشترك؛ وإضافة تغطية آلية لدورة حياة التوافق والصلاحية والتخصيص ونقل الدم هي الخطوة التقنية التالية.",
    },
    stack: [".NET Framework", "WinForms", "C#", "SQL Server", "Guna UI2"],
    highlights: [
      "Donor, patient, employee, blood unit, donation, transfusion, and reporting workflows.",
      "Blood compatibility checks, expiration detection, test results, low-stock alerts, and unit traceability.",
      "Three-tier Windows Forms architecture with Guna UI2 cards, navigation, charts, search, and validation.",
      "Role-based access, authentication, data sanitization, and audit logging for critical operations.",
    ],
    repository: "https://github.com/NourEldeenMahmoud/BBMS-Project",
  },
  {
    slug: "dvld",
    category: "desktop",
    kind: "product",
    title: "Driving and Vehicle License Department",
    shortTitle: "DVLD",
    image: "/projects/dvld/details/localdrivinglicense.webp",
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
      en: "I implemented the Windows Forms workflows, business rules, ADO.NET data access, and SQL Server integration.",
      ar: "نفذت تدفقات Windows Forms وقواعد الأعمال والوصول للبيانات عبر ADO.NET والتكامل مع SQL Server.",
    },
    engineering: {
      en: "The solution separates Windows Forms presentation, business rules, and ADO.NET data access. It covers license classes, staged tests, renewals, replacements, international permits, and detainment.",
      ar: "يفصل الحل بين عرض Windows Forms وقواعد الأعمال والوصول للبيانات عبر ADO.NET، ويغطي فئات الرخص والاختبارات المرحلية والتجديد والاستبدال والرخص الدولية والحجز.",
    },
    evidence: {
      en: "I publish the solution, database backup instructions, workflow details, and interface screenshots.",
      ar: "أنشر الحل وتعليمات استعادة قاعدة البيانات وتفاصيل التدفقات وصور الواجهة.",
    },
    limitation: {
      en: "I use this supporting project to demonstrate rules-heavy desktop design; automated lifecycle tests are the next technical step.",
      ar: "أستخدم هذا المشروع الداعم لإظهار تصميم نظام مكتبي كثيف القواعد؛ واختبارات دورة الحياة الآلية هي الخطوة التقنية التالية.",
    },
    stack: ["C#", ".NET Framework", "Windows Forms", "ADO.NET", "SQL Server"],
    highlights: [
      "People and user records with permissions, credentials, account freezing, and personal history.",
      "License classes, staged vision/theory/practical tests, appointments, fees, issuance, and renewals.",
      "International permits, detainment and release, lost or damaged replacements, and driver history.",
      "Three-tier architecture with ADO.NET data access and Crystal Reports for reporting.",
    ],
    repository: "https://github.com/NourEldeenMahmoud/DVLD",
  },

  // ──────────────────────────── MOBILE ────────────────────────────
  {
    slug: "blood-bank-mobile",
    category: "mobile-applications",
    kind: "product",
    title: "Blood Bank Mobile App",
    shortTitle: "BBMS Mobile",
    image: "/projects/blood-bank-mobile/details/01-home.webp",
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
      en: "I implemented most of the wider team platform while sharing responsibility across the mobile, API, desktop, and database modules.",
      ar: "نفذت معظم منصة الفريق الأوسع مع مشاركة المسؤولية عبر وحدات الموبايل وAPI وسطح المكتب وقاعدة البيانات.",
    },
    engineering: {
      en: "Flutter uses Provider state management and REST services to support authentication, profiles, appointments, donation history, and notifications through an ASP.NET Core API.",
      ar: "يستخدم Flutter إدارة الحالة عبر Provider وخدمات REST لدعم تسجيل الدخول والملفات والمواعيد وسجل التبرع والإشعارات من خلال ASP.NET Core API.",
    },
    evidence: {
      en: "Our project includes the Flutter application, ASP.NET Core API, shared database setup, Swagger access, and end-to-end appointment workflow.",
      ar: "يتضمن مشروعنا تطبيق Flutter وASP.NET Core API وإعداد قاعدة البيانات المشتركة وSwagger وتدفق المواعيد الكامل.",
    },
    limitation: {
      en: "I present the mobile, API, and desktop integration as shared team work; automated cross-client appointment tests are the next technical step.",
      ar: "أعرض تكامل الموبايل وAPI وسطح المكتب كعمل جماعي مشترك؛ واختبارات المواعيد الآلية عبر العميلين هي الخطوة التقنية التالية.",
    },
    stack: [
      "Flutter",
      "Dart",
      "ASP.NET Core 6",
      "REST",
      "Provider",
      "SQL Server",
    ],
    highlights: [
      "Flutter donor app with phone authentication, profiles, blood details, appointments, history, and notifications.",
      "REST API with Swagger documentation, JWT authentication, CORS, and structured error handling.",
      "Integrated mobile, desktop, API, and SQL Server workflow from appointment booking to donation processing.",
      "Provider state management with organized models, services, routes, screens, and reusable widgets.",
    ],
    repository: "https://github.com/NourEldeenMahmoud/Blood-Bank-mobile-App",
  },

  // ──────────────────────────── SUMMARIES ────────────────────────────
  {
    slug: "met-summaries",
    category: "summaries",
    kind: "collection",
    title: "MET Summaries",
    shortTitle: "MET Summaries",
    image: "/projects/met-summaries/details/01-index.webp",
    imageAlt: {
      en: "MET Summaries academic notes collection index",
      ar: "فهرس مجموعة ملاحظات MET الأكاديمية",
    },
    summary: {
      en: "A structured set of academic lecture summaries in Egyptian Arabic covering GIS, Computer Graphics, Networks, and Prolog.",
      ar: "مجموعة منظمة من ملخصات المحاضرات الأكاديمية باللهجة المصرية تغطي نظم المعلومات الجغرافية والرسومات والشبكات وProlog.",
    },
    context: {
      en: "Written during university coursework at MET to consolidate key concepts across four subjects and published on GitHub Pages.",
      ar: "كُتبت أثناء الدراسة الجامعية في MET لترسيخ المفاهيم الأساسية عبر أربع مواد ونُشرت على GitHub Pages.",
    },
    contribution: {
      en: "Nour authored and organized the study summaries and structured the public GitHub Pages documentation site.",
      ar: "أعدّ نور ونظّم الملخصات الدراسية وهيكل موقع التوثيق العام على GitHub Pages.",
    },
    engineering: {
      en: "Static GitHub Pages collection built with HTML and CSS, featuring structured subject navigation indexes and per-topic summary pages.",
      ar: "مجموعة GitHub Pages ثابتة مبنية بـHTML وCSS، تتميز بفهارس تنقل موضوعية منظمة وصفحات ملخصات تفصيلية لكل موضوع.",
    },
    evidence: {
      en: "The repository and live GitHub Pages website contain the full study notes across all four subject indexes.",
      ar: "يحتوي المستودع وموقع GitHub Pages المنشور على ملاحظات الدراسة الكاملة عبر فهارس المواد الأربع.",
    },
    limitation: {
      en: "Personal academic study notes; scope is limited to the specific subjects covered during MET coursework.",
      ar: "ملاحظات دراسية أكاديمية شخصية؛ يقتصر النطاق على المواد المحددة التي دُرست في MET.",
    },
    stack: ["HTML", "CSS", "GitHub Pages"],
    highlights: [
      "GIS summaries covering Fundamentals, Vector/Raster models, Coordinate Systems, and Spatial Data.",
      "Computer Graphics chapter summaries on Mathematical Foundations, Primitives, and Rendering.",
      "Computer Networks guides covering OSI model, TCP/IP, Subnetting, and Security fundamentals.",
      "Prolog programming notes covering Rules, Recursion, List processing, and Backtracking.",
    ],
    repository: "https://github.com/NourEldeenMahmoud/MET-Summaries",
    demo: "https://noureldeenmahmoud.github.io/MET-Summaries/",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Returns the full media playlist for a project (used by project details / gallery). */
export function getProjectMedia(project: Project): ProjectMedia[] {
  const set = projectMediaSets[project.slug];
  if (set) {
    return [...set.preview, ...set.details];
  }
  return [
    {
      id: `${project.slug}-hero`,
      type: "image" as const,
      src: project.image,
      alt: project.imageAlt,
      caption: project.summary,
      group: "overview",
      purpose: "product" as const,
      featured: true,
      orientation: "landscape" as const,
      device:
        project.category === "mobile-applications"
          ? ("mobile" as const)
          : ("browser" as const),
      treatment: "stage" as const,
      theme: "amber" as const,
      focalPosition: "50% 50%",
    },
    ...(project.gallery ?? []).map((item, index) => ({
      id: `${project.slug}-gallery-${index + 1}`,
      type: "image" as const,
      src: item.src,
      alt: item.alt,
      caption: item.alt,
      group: "product",
      purpose: "product" as const,
      featured: index === 0,
      orientation:
        project.category === "mobile-applications"
          ? ("portrait" as const)
          : ("landscape" as const),
      device:
        project.category === "mobile-applications"
          ? ("mobile" as const)
          : ("browser" as const),
      treatment: "full" as const,
      theme: "cyan" as const,
      focalPosition: "50% 50%",
    })),
  ];
}

/**
 * Returns the preview media for the Project Exploration (Center Showcase) player.
 * Reads directly from projectMediaSets[project.slug].preview.
 */
export function getProjectPreviewMedia(project: Project): ProjectMedia[] {
  const set = projectMediaSets[project.slug];
  if (set?.preview?.length) {
    return set.preview;
  }
  return getProjectMedia(project).slice(0, 7);
}

/**
 * Returns the detail media for Project Details / Case Study Modal.
 * Reads directly from projectMediaSets[project.slug].details (images only).
 */
export function getProjectDetailMedia(project: Project): ProjectMedia[] {
  const set = projectMediaSets[project.slug];
  if (set?.details?.length) {
    return set.details;
  }
  return getProjectMedia(project).filter((m) => m.type === "image");
}
