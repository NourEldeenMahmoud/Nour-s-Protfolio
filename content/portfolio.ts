import type { Locale } from "@/i18n/routing";
import { projectMediaPlaylists } from "@/content/project-media";

export const projectSlugs = [
  "buildsense",
  "bookify",
  "cinemaverse",
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
    kind: "product",
    title: "BuildSense",
    shortTitle: "BuildSense",
    image: "/projects/buildsense/home.webp",
    imageAlt: {
      en: "BuildSense hardware discovery home page",
      ar: "الصفحة الرئيسية لمنصة BuildSense لاكتشاف مكونات الحاسوب",
    },
    media: projectMediaPlaylists.buildsense,
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
    slug: "bookify",
    kind: "product",
    title: "Bookify Hotel Reservation System",
    shortTitle: "Bookify",
    image: "/projects/bookify/04-home.webp",
    imageAlt: {
      en: "Bookify hotel reservation home page",
      ar: "الصفحة الرئيسية لنظام حجز الفنادق Bookify",
    },
    media: projectMediaPlaylists.bookify,
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
    highlights: [
      "Date-range room search, availability checks, room details, booking history, and customer profiles.",
      "Admin dashboard for rooms, room types, bookings, refunds, users, occupancy, and revenue views.",
      "Stripe Payment Intents, SendGrid transactional email, ASP.NET Identity, RBAC, lockout, and CSRF protection.",
      "N-tier structure with Repository, Unit of Work, ViewModel, service layer, migrations, and health checks.",
    ],
    repository: "https://github.com/NourEldeenMahmoud/Bookify",
  },
  {
    slug: "cinemaverse",
    kind: "product",
    title: "CinemaVerse",
    shortTitle: "CinemaVerse",
    image: "/projects/cinemaverse/home.webp",
    imageAlt: {
      en: "CinemaVerse movie booking home page",
      ar: "الصفحة الرئيسية لمنصة حجز السينما CinemaVerse",
    },
    media: projectMediaPlaylists.cinemaverse,
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
    highlights: [
      "Movie discovery with search, genre and language filters, cast, images, and showtimes.",
      "Interactive seat selection, real-time availability, Stripe payments, QR tickets, and check-in management.",
      "Admin surfaces for movies, media, branches, halls, seat layouts, genres, showtimes, users, and bookings.",
      "JWT access and refresh tokens, rate-limited auth, Hangfire expiry/reminder jobs, MailKit, and Serilog.",
    ],
    repository: "https://github.com/NourEldeenMahmoud/CinemaVerse",
  },
  {
    slug: "frontend-mini-projects",
    kind: "collection",
    title: "Frontend Mini Projects",
    shortTitle: "Frontend Mini",
    image: "/projects/frontend-mini-projects/details/01-index.webp",
    imageAlt: {
      en: "Frontend Mini Projects landing pages collection index",
      ar: "فهرس مجموعة مشاريع الواجهات الأمامية المصغّرة",
    },
    media: projectMediaPlaylists["frontend-mini-projects"],
    summary: {
      en: "Six responsive landing-page challenges from Frontend Mentor, built with HTML, CSS, and vanilla JavaScript.",
      ar: "ستة تحديات لصفحات هبوط متجاوبة من Frontend Mentor، مبنية بـHTML وCSS وJavaScript خالص.",
    },
    context: {
      en: "Practice projects completed to sharpen responsive layout, CSS architecture, and component thinking before framework work.",
      ar: "مشاريع تدريبية أُنجزت لتعزيز التخطيط المتجاوب وهندسة CSS والتفكير بالمكونات قبل العمل بالأطر.",
    },
    contribution: {
      en: "Nour completed all six challenges individually, from design interpretation through pixel-accurate implementation and deployment.",
      ar: "أنجز نور التحديات الستة بمفرده، من تفسير التصميم إلى التنفيذ الدقيق والنشر.",
    },
    engineering: {
      en: "Each project uses semantic HTML5, modern CSS (custom properties, Flexbox, Grid), and minimal JavaScript for interactive elements. Deployed as a single GitHub Pages repository.",
      ar: "يستخدم كل مشروع HTML5 دلالياً وCSS حديثاً (متغيرات مخصصة، Flexbox، Grid) وجافا سكريبت محدوداً للعناصر التفاعلية. يُنشر كمستودع GitHub Pages واحد.",
    },
    evidence: {
      en: "All six pages are live on GitHub Pages, and the repository contains the source for each challenge.",
      ar: "الصفحات الست منشورة على GitHub Pages والمستودع يحتوي على مصدر كل تحدٍّ.",
    },
    limitation: {
      en: "These are pixel-accuracy exercises, not original product designs. Cross-browser automated test coverage is not included.",
      ar: "هذه تمارين دقة بكسل وليست تصاميم منتج أصلية. لا تتضمن تغطية اختبارات آلية عبر المتصفحات.",
    },
    stack: ["HTML5", "CSS3", "JavaScript", "GitHub Pages"],
    highlights: [
      "Bookmark Manager — tab-based landing page with animated indicator.",
      "Shortly URL Shortener — API-connected link shortener with copy and validation.",
      "Fylo — two-column landing with curved SVG section dividers.",
      "Loopstudios — CSS Grid hero with hover-overlay gallery.",
      "Testimonials Grid — CSS Grid two-column responsive testimonial layout.",
      "Clipboard — macOS-themed download landing page.",
    ],
    repository: "https://github.com/NourEldeenMahmoud/frontend-mini-projects",
    demo: "https://noureldeenmahmoud.github.io/frontend-mini-projects/",
  },
  // ──────────────────────────── GAME DEVELOPMENT ────────────────────────────
  {
    slug: "how-to-train-your-ai",
    kind: "game",
    title: "How To Train Your AI",
    shortTitle: "How To Train Your AI",
    image: "/projects/how-to-train-your-ai/preview/poster.webp",
    imageAlt: {
      en: "How To Train Your AI gameplay — ML-Agents trained bot combat",
      ar: "طريقة لعب How To Train Your AI — قتال بوت مدرّب بـML-Agents",
    },
    media: projectMediaPlaylists["how-to-train-your-ai"],
    summary: {
      en: "A Unity game featuring a bot trained with ML-Agents reinforcement learning to navigate an arena and eliminate the player.",
      ar: "لعبة Unity تضم بوتاً مدرَّباً بتعلم التعزيز عبر ML-Agents للتنقل داخل ساحة والقضاء على اللاعب.",
    },
    context: {
      en: "A university game project exploring ML-Agents training, arena design, and Unity game development.",
      ar: "مشروع لعبة جامعي يستكشف تدريب ML-Agents وتصميم الساحات وتطوير ألعاب Unity.",
    },
    contribution: {
      en: "Nour built the Unity environment, designed the training curriculum, implemented the ML-Agents reward function, and assembled the final game build.",
      ar: "بنى نور بيئة Unity وصمّم منهج التدريب ونفّذ دالة المكافأة في ML-Agents وجمّع الإصدار النهائي من اللعبة.",
    },
    engineering: {
      en: "The agent observes raycasts, velocity, and relative target position, then learns to pursue and eliminate the player using a shaped reward signal. Training was run in Unity Editor with the ML-Agents toolkit.",
      ar: "يرصد الوكيل أشعة الكشف والسرعة والموضع النسبي للهدف، ثم يتعلم ملاحقة اللاعب والقضاء عليه باستخدام إشارة مكافأة مُشكَّلة. جرى التدريب في Unity Editor بأدوات ML-Agents.",
    },
    evidence: {
      en: "The game trailer demonstrates the trained agent behavior. The repository contains the training configuration, reward function, and Unity project.",
      ar: "يُظهر عرض اللعبة سلوك الوكيل المدرَّب. يحتوي المستودع على تكوين التدريب ودالة المكافأة ومشروع Unity.",
    },
    limitation: {
      en: "Training metrics and convergence curves are not published. The agent generalizes to the recorded scenarios but edge-case robustness is not formally evaluated.",
      ar: "لا تُنشر مقاييس التدريب ومنحنيات التقارب. يُعمَّم الوكيل على السيناريوهات المسجّلة لكن متانة الحالات الطرفية لم تُقيَّم رسمياً.",
    },
    stack: ["Unity", "C#", "ML-Agents", "Python"],
    highlights: [
      "Reinforcement-learning agent trained entirely within Unity ML-Agents.",
      "Custom reward shaping for navigation, pursuit, and elimination objectives.",
      "Arena environment with obstacles, spawn management, and game state tracking.",
      "Full game build with HUD, health system, and win/loss conditions.",
    ],
    repository: "https://github.com/NourEldeenMahmoud/How-To-Train-Your-AI",
  },
  {
    slug: "sharp-shooter",
    kind: "game",
    title: "Sharp Shooter",
    shortTitle: "Sharp Shooter",
    image: "/projects/sharp-shooter/preview/poster.webp",
    imageAlt: {
      en: "Sharp Shooter first-person shooting gallery gameplay",
      ar: "طريقة لعب Sharp Shooter — معرض الرماية من منظور الشخص الأول",
    },
    media: projectMediaPlaylists["sharp-shooter"],
    summary: {
      en: "A first-person shooting-gallery game where the player eliminates targets across progressively harder waves.",
      ar: "لعبة معرض رماية من منظور الشخص الأول يُزيل فيها اللاعب الأهداف عبر موجات متصاعدة الصعوبة.",
    },
    context: {
      en: "A university game project exploring FPS mechanics, wave systems, and Unity's physics and input pipeline.",
      ar: "مشروع لعبة جامعي يستكشف ميكانيكا FPS وأنظمة الموجات وخط أنابيب الفيزياء والإدخال في Unity.",
    },
    contribution: {
      en: "Nour implemented the shooting mechanics, target spawning system, scoring, and the full game loop.",
      ar: "نفّذ نور ميكانيكا إطلاق النار ونظام توليد الأهداف والتسجيل وحلقة اللعبة الكاملة.",
    },
    engineering: {
      en: "The game uses Unity's physics raycast for hitscan shooting, a wave manager for progressive difficulty, and a score and health system with UI feedback.",
      ar: "تستخدم اللعبة raycast في الفيزياء بـUnity لإطلاق النار، ومدير موجات لتصعيد الصعوبة التدريجي، ونظاماً للنقاط والصحة مع تغذية راجعة في الواجهة.",
    },
    evidence: {
      en: "The gameplay recording demonstrates wave progression, target behavior, shooting mechanics, and scoring. The repository contains the Unity project.",
      ar: "يُظهر تسجيل اللعب تقدم الموجات وسلوك الأهداف وميكانيكا إطلاق النار والتسجيل. يحتوي المستودع على مشروع Unity.",
    },
    limitation: {
      en: "The game is a university exercise in mechanics, not a published product. Performance profiling and mobile compatibility are not evaluated.",
      ar: "اللعبة تمرين جامعي في الميكانيكا وليست منتجاً منشوراً. لم يُقيَّم أداء اللعبة أو توافقها مع الجوّال.",
    },
    stack: ["Unity", "C#"],
    highlights: [
      "Hitscan raycast shooting with hit detection, miss feedback, and scoring.",
      "Progressive wave system with increasing target speed and spawn rate.",
      "Target spawn manager with random position sampling and lifetime control.",
      "Health, ammo, score, and wave-completion HUD with end-screen results.",
    ],
    repository: "https://github.com/NourEldeenMahmoud/SharpShooter",
  },
  {
    slug: "royal-run",
    kind: "game",
    title: "Royal Run",
    shortTitle: "Royal Run",
    image: "/projects/royal-run/preview/poster.webp",
    imageAlt: {
      en: "Royal Run endless runner gameplay",
      ar: "طريقة لعب Royal Run — لعبة الركض اللانهائي",
    },
    media: projectMediaPlaylists["royal-run"],
    summary: {
      en: "An endless runner game where the player avoids obstacles, collects coins, and progresses through increasing speed.",
      ar: "لعبة ركض لانهائي يتجنب فيها اللاعب العقبات ويجمع العملات ويتقدم مع تزايد السرعة.",
    },
    context: {
      en: "A university game project built to practice procedural level generation, player control, and game loop design.",
      ar: "مشروع لعبة جامعي بُني لممارسة توليد المستويات الإجرائية والتحكم باللاعب وتصميم حلقة اللعبة.",
    },
    contribution: {
      en: "Nour designed and implemented the runner mechanics, obstacle spawning, coin system, and the full game loop.",
      ar: "صمّم نور ونفّذ ميكانيكا الركض وتوليد العقبات ونظام العملات وحلقة اللعبة الكاملة.",
    },
    engineering: {
      en: "The game uses object pooling for obstacle and coin spawning, a speed curve for progressive difficulty, and Unity's input system for responsive controls.",
      ar: "تستخدم اللعبة object pooling لتوليد العقبات والعملات، ومنحنى سرعة لتصعيد الصعوبة التدريجي، ونظام إدخال Unity للتحكم السريع الاستجابة.",
    },
    evidence: {
      en: "The gameplay recording shows obstacle variety, coin collection, speed scaling, and end-state transitions. The repository contains the Unity project.",
      ar: "يُظهر تسجيل اللعب تنوع العقبات وجمع العملات وتدرج السرعة وانتقالات حالة النهاية. يحتوي المستودع على مشروع Unity.",
    },
    limitation: {
      en: "The game is a university exercise. Level content is procedurally generated from a fixed asset pool and is not hand-authored.",
      ar: "اللعبة تمرين جامعي. يُولَّد محتوى المستوى إجرائياً من مجموعة أصول ثابتة وليس منشأً يدوياً.",
    },
    stack: ["Unity", "C#"],
    highlights: [
      "Procedural obstacle lane system with increasing density and speed.",
      "Object pooling for obstacles and coins to minimize garbage collection.",
      "Character controller with jump, slide, and lane-switch mechanics.",
      "Score, distance, and coin HUD with high-score persistence.",
    ],
    repository: "https://github.com/NourEldeenMahmoud/RoyalRun",
  },
  {
    slug: "galaxy-strike",
    kind: "game",
    title: "Galaxy Strike",
    shortTitle: "Galaxy Strike",
    image: "/projects/galaxy-strike/preview/poster.webp",
    imageAlt: {
      en: "Galaxy Strike space shooter gameplay",
      ar: "طريقة لعب Galaxy Strike — لعبة إطلاق النار الفضائي",
    },
    media: projectMediaPlaylists["galaxy-strike"],
    summary: {
      en: "A vertical space shooter where the player battles waves of enemy ships and bosses across a scrolling space environment.",
      ar: "لعبة إطلاق نار فضائية عمودية يقاتل فيها اللاعب موجات من سفن العدو والرؤساء في بيئة فضائية متحركة.",
    },
    context: {
      en: "A university game project exploring the classic shoot-em-up genre with enemy AI, bullet patterns, and boss encounters.",
      ar: "مشروع لعبة جامعي يستكشف نوع ألعاب إطلاق النار الكلاسيكية مع ذكاء اصطناعي للعدو وأنماط الرصاص ومواجهات الرؤساء.",
    },
    contribution: {
      en: "Nour built the player ship, enemy wave manager, bullet pooling, power-up drops, and boss behavior state machine.",
      ar: "بنى نور سفينة اللاعب ومدير موجات العدو وتجميع الرصاص وإسقاط الطاقة وآلة حالة سلوك الرئيس.",
    },
    engineering: {
      en: "The game uses coroutine-based enemy formation patterns, object pooling for bullets and effects, and a simple finite-state machine for boss phases.",
      ar: "تستخدم اللعبة أنماط تشكيل العدو المستندة إلى coroutine، وtooling pooling للرصاص والتأثيرات، وآلة حالة محدودة بسيطة لمراحل الرئيس.",
    },
    evidence: {
      en: "The gameplay recording shows enemy formations, bullet patterns, power-ups, and the boss encounter. The repository contains the Unity project.",
      ar: "يُظهر تسجيل اللعب تشكيلات العدو وأنماط الرصاص ومكوّنات الطاقة ومواجهة الرئيس. يحتوي المستودع على مشروع Unity.",
    },
    limitation: {
      en: "The game is a university exercise. Difficulty balancing and sound design are minimal. No leaderboard or save system.",
      ar: "اللعبة تمرين جامعي. توازن الصعوبة وتصميم الصوت محدودان. لا يوجد نظام قائمة متصدرين أو حفظ.",
    },
    stack: ["Unity", "C#"],
    highlights: [
      "Vertical scroll with parallax star fields and multi-layer backgrounds.",
      "Wave manager spawning enemy formations with coroutine-timed attack patterns.",
      "Object pooling for player and enemy bullets, explosions, and pickups.",
      "Multi-phase boss with health gates, pattern switches, and defeat sequence.",
    ],
    repository: "https://github.com/NourEldeenMahmoud/GalaxyStrike",
  },
  {
    slug: "rocket-boost",
    kind: "game",
    title: "Rocket Boost",
    shortTitle: "Rocket Boost",
    image: "/projects/rocket-boost/preview/poster.webp",
    imageAlt: {
      en: "Rocket Boost physics platformer gameplay",
      ar: "طريقة لعب Rocket Boost — منصة فيزياء الصاروخ",
    },
    media: projectMediaPlaylists["rocket-boost"],
    summary: {
      en: "A physics-based rocket platformer where the player navigates through obstacle courses using thrust and rotation.",
      ar: "لعبة منصات صاروخية قائمة على الفيزياء يتنقل فيها اللاعب عبر مسارات عقبات باستخدام الدفع والدوران.",
    },
    context: {
      en: "A university game project exploring Unity's physics-based character movement, level design, and spatial challenge construction.",
      ar: "مشروع لعبة جامعي يستكشف حركة الشخصية المستندة إلى الفيزياء في Unity وتصميم المستويات وبناء التحديات المكانية.",
    },
    contribution: {
      en: "Nour implemented the rocket physics controller, thrust and rotation handling, level layouts, and the checkpoint and respawn system.",
      ar: "نفّذ نور وحدة تحكم فيزياء الصاروخ ومعالجة الدفع والدوران وتخطيط المستويات ونظام نقاط التفتيش وإعادة التشغيل.",
    },
    engineering: {
      en: "Movement uses Rigidbody physics with applied thrust forces and torque. Levels are built from modular obstacle prefabs with collider-based hazard and landing-pad detection.",
      ar: "تستخدم الحركة فيزياء Rigidbody مع قوى الدفع والعزم المطبّق. تُبنى المستويات من قوالب عقبات معيارية مع كشف المخاطر ومناطق الهبوط القائم على المصادم.",
    },
    evidence: {
      en: "The gameplay recording shows multi-level navigation, physics response, hazard collisions, and checkpoint progression. The repository contains the Unity project.",
      ar: "يُظهر تسجيل اللعب التنقل متعدد المستويات واستجابة الفيزياء وتصادمات المخاطر وتقدم نقاط التفتيش. يحتوي المستودع على مشروع Unity.",
    },
    limitation: {
      en: "The game is a university exercise. Level count and visual polish are minimal. No save or leaderboard system.",
      ar: "اللعبة تمرين جامعي. عدد المستويات والإتقان البصري محدودان. لا يوجد نظام حفظ أو قائمة متصدرين.",
    },
    stack: ["Unity", "C#"],
    highlights: [
      "Physics-based rocket movement with Rigidbody thrust, torque, and drag.",
      "Modular level layout with obstacle, hazard, and landing-pad prefabs.",
      "Collider-based crash detection with particle effects and respawn.",
      "Checkpoint system with persistent progress across level restarts.",
    ],
    repository: "https://github.com/NourEldeenMahmoud/RocketBoost",
  },
  // ──────────────────────────── DESKTOP ────────────────────────────
  {
    slug: "blood-bank-desktop",
    kind: "product",
    title: "Blood Bank Management System",
    shortTitle: "BBMS Desktop",
    image: "/projects/blood-bank-desktop/details/02-dashboard.webp",
    imageAlt: {
      en: "Blood Bank desktop operations dashboard",
      ar: "لوحة عمليات نظام بنك الدم المكتبي",
    },
    media: projectMediaPlaylists["blood-bank-desktop"],
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
    kind: "product",
    title: "Driving and Vehicle License Department",
    shortTitle: "DVLD",
    image: "/projects/dvld/details/localdrivinglicense.webp",
    imageAlt: {
      en: "DVLD local driving license applications screen",
      ar: "شاشة طلبات رخص القيادة المحلية في نظام DVLD",
    },
    media: projectMediaPlaylists.dvld,
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
    kind: "product",
    title: "Blood Bank Mobile App",
    shortTitle: "BBMS Mobile",
    image: "/projects/blood-bank-mobile/details/01-home.webp",
    imageAlt: {
      en: "Blood Bank donor mobile application home screen",
      ar: "الشاشة الرئيسية لتطبيق المتبرعين في منصة بنك الدم",
    },
    media: projectMediaPlaylists["blood-bank-mobile"],
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
    kind: "collection",
    title: "MET Summaries",
    shortTitle: "MET Summaries",
    image: "/projects/met-summaries/details/01-index.webp",
    imageAlt: {
      en: "MET Summaries academic notes collection index",
      ar: "فهرس مجموعة ملاحظات MET الأكاديمية",
    },
    media: projectMediaPlaylists["met-summaries"],
    summary: {
      en: "A structured set of academic lecture summaries covering GIS, Computer Graphics, Networks, and Prolog, published as an interactive GitHub Pages site.",
      ar: "مجموعة منظمة من ملخصات المحاضرات الأكاديمية تغطي GIS والرسومات الحاسوبية والشبكات وProlog، منشورة كموقع GitHub Pages تفاعلي.",
    },
    context: {
      en: "Written during university coursework at MET to consolidate understanding of four technical subjects. Published so classmates and future students can benefit.",
      ar: "كُتبت أثناء دراسة جامعية في MET لتعزيز فهم أربع مواد تقنية. نُشرت لكي يستفيد منها الزملاء والطلاب المستقبليون.",
    },
    contribution: {
      en: "Nour authored all summaries individually, organized the GitHub Pages site structure, and maintained it across four subject areas.",
      ar: "أعدّ نور جميع الملخصات بمفرده ونظّم هيكل موقع GitHub Pages وصانه عبر أربع مجالات موضوعية.",
    },
    engineering: {
      en: "The site is a static GitHub Pages collection using HTML with consistent navigation, subject indexes, and per-lecture summary pages built from hand-written notes.",
      ar: "الموقع مجموعة GitHub Pages ثابتة تستخدم HTML مع تنقل متسق وفهارس للمواضيع وصفحات ملخص لكل محاضرة مبنية من ملاحظات مكتوبة بخط اليد.",
    },
    evidence: {
      en: "The site is live on GitHub Pages. All four subject indexes and their lecture pages are publicly accessible.",
      ar: "الموقع منشور على GitHub Pages. جميع فهارس المواضيع الأربعة وصفحات محاضراتها متاحة للعموم.",
    },
    limitation: {
      en: "These are personal study notes and not a peer-reviewed academic publication. Coverage is limited to the specific lectures studied.",
      ar: "هذه ملاحظات دراسة شخصية وليست منشوراً أكاديمياً محكّماً. يقتصر التغطية على المحاضرات المحددة التي دُرست.",
    },
    stack: ["HTML", "CSS", "GitHub Pages"],
    highlights: [
      "GIS summaries: 7 lectures covering Fundamentals, Data Models, Coordinate Systems, Vector/Raster, and Spatial Structures.",
      "Computer Graphics: 8 chapters on Foundations, Mathematical Bases, Primitives, and Drawing Algorithms.",
      "Networks: 9 lectures covering OSI, TCP/IP, Subnetting, Wireless, and Security/Cryptography.",
      "Prolog: 7 chapters with summaries and practice examples on Rules, Lists, Backtracking, and I/O.",
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
  if (project.media?.length) return project.media;

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
        project.slug === "blood-bank-mobile"
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
        project.slug === "blood-bank-mobile"
          ? ("portrait" as const)
          : ("landscape" as const),
      device:
        project.slug === "blood-bank-mobile"
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
 * For video projects: returns the optimized preview video + poster.
 * For image-only projects: returns the first 5–7 media items from the full playlist.
 */
export function getProjectPreviewMedia(project: Project): ProjectMedia[] {
  const all = getProjectMedia(project);
  // If the playlist already contains a video, use only the video as preview
  const videoItem = all.find((m) => m.type === "video");
  if (videoItem) return [videoItem];
  // Otherwise use up to 7 images
  return all.slice(0, 7);
}

/**
 * Returns the detail media for Project Details / Case Study Modal.
 * Always returns only images (never the preview video).
 * Falls back to the full image playlist.
 */
export function getProjectDetailMedia(project: Project): ProjectMedia[] {
  return getProjectMedia(project).filter((m) => m.type === "image");
}
