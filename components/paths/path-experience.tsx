import Link from "next/link";
import type { Locale } from "@/i18n/routing";
import styles from "./path.module.css";

export type PortfolioPath = "learn" | "general";

const copy = {
  en: {
    back: "Return to the room",
    nav: "Portfolio paths",
    paths: {
      learn: "Engineering lab",
      general: "About",
    },
    learn: {
      eyebrow: "WORKSPACE / ENGINEERING LAB",
      title: "How the work is understood, built, and checked.",
      intro:
        "A readable workshop of verified knowledge collections, engineering domains, and the process behind this portfolio. Unpublished tutorials and unsupported claims are deliberately excluded.",
      zones: [
        {
          number: "01",
          title: "Systems shelf",
          description:
            ".NET, ASP.NET Core, EF Core, REST APIs, SQL Server, identity, authorization, and backend architecture form the technical center.",
          items: ["EF Core", "REST APIs", "Secured APIs", "SQL Server"],
        },
        {
          number: "02",
          title: "Experiment bench",
          description:
            "BuildSense extends into the MEAN ecosystem; the Blood Bank platform connects desktop, API, and Flutter; Unity work tests interactive systems.",
          items: ["Angular + Node", "Flutter", "Unity 6", "Automation"],
        },
        {
          number: "03",
          title: "Process wall",
          description:
            "Requirements establish intent, decisions record tradeoffs, implementation stays scoped, and tests plus review validate the result.",
          items: ["Understand", "Design", "Build", "Validate"],
        },
      ],
      knowledgeTitle: "Knowledge library",
      knowledgeIntro:
        "The first release tracks five verified collections. MET Summaries is currently the collection with a confirmed public destination.",
      knowledge: [
        "EF Core",
        "REST APIs",
        "Secured APIs",
        "JavaScript",
        "MET Summaries",
      ],
      visitKnowledge: "Open MET Summaries",
    },
    general: {
      eyebrow: "CENTRAL WALL / EXPLORATION",
      title: "Broad range. A deep center in .NET engineering.",
      intro:
        "I am Nour Eldeen Mahmoud, a software engineer focused on dependable backend and full-stack systems. I work across product, data, security, cross-platform applications, and interactive projects without losing the engineering center.",
      principlesTitle: "Working principles",
      principles: [
        [
          "Make the system legible",
          "Clear boundaries and evidence are more useful than hidden cleverness.",
        ],
        [
          "Treat constraints as design inputs",
          "Platform, team, domain, and data limits shape the solution.",
        ],
        [
          "Validate before presenting",
          "Tests, review, repositories, and honest limitations support every claim.",
        ],
      ],
      rangeTitle: "Selected range",
      range:
        ".NET web systems, Angular and Node product work, WinForms operations software, Flutter mobile applications, SQL-backed domains, and Unity interaction design.",
      projectPinboard: "Project pinboard",
      exploreWork: "Explore selected work",
      contactTitle: "Start a conversation",
      contact:
        "I am targeting junior .NET backend and full-stack roles, internships, and engineering opportunities where careful implementation and continued learning matter.",
      email: "Email Nour",
      linkedin: "LinkedIn",
      github: "GitHub",
    },
  },
  ar: {
    back: "العودة إلى الغرفة",
    nav: "مسارات المعرض",
    paths: {
      learn: "المعمل الهندسي",
      general: "عن نور",
    },
    learn: {
      eyebrow: "مساحة العمل / المعمل الهندسي",
      title: "كيف يُفهم العمل ويُبنى ويُراجع.",
      intro:
        "ورشة مقروءة للمجموعات المعرفية المؤكدة والمجالات الهندسية والمنهج المستخدم في هذا المعرض. تُستبعد الدروس غير المنشورة والادعاءات غير المدعومة عمداً.",
      zones: [
        {
          number: "01",
          title: "رف الأنظمة",
          description:
            "تشكل .NET وASP.NET Core وEF Core وREST APIs وSQL Server والهوية والصلاحيات وهندسة الباك إند المركز التقني.",
          items: ["EF Core", "REST APIs", "Secured APIs", "SQL Server"],
        },
        {
          number: "02",
          title: "منضدة التجارب",
          description:
            "يوسع BuildSense النطاق إلى MEAN، وتربط منصة بنك الدم بين سطح المكتب وAPI وFlutter، وتختبر أعمال Unity الأنظمة التفاعلية.",
          items: ["Angular + Node", "Flutter", "Unity 6", "Automation"],
        },
        {
          number: "03",
          title: "جدار العملية",
          description:
            "تحدد المتطلبات القصد، وتسجل القرارات المفاضلات، ويبقى التنفيذ محدداً، ثم تتحقق الاختبارات والمراجعة من النتيجة.",
          items: ["فهم", "تصميم", "بناء", "تحقق"],
        },
      ],
      knowledgeTitle: "المكتبة المعرفية",
      knowledgeIntro:
        "يتتبع الإصدار الأول خمس مجموعات مؤكدة. MET Summaries هي المجموعة ذات الوجهة العامة المؤكدة حالياً.",
      knowledge: [
        "EF Core",
        "REST APIs",
        "Secured APIs",
        "JavaScript",
        "MET Summaries",
      ],
      visitKnowledge: "افتح MET Summaries",
    },
    general: {
      eyebrow: "الجدار المركزي / الاستكشاف",
      title: "نطاق واسع. ومركز عميق في هندسة .NET.",
      intro:
        "أنا نور الدين محمود، مهندس برمجيات أركز على أنظمة الباك إند والفل ستاك الموثوقة. أعمل عبر المنتجات والبيانات والأمان والتطبيقات متعددة المنصات والمشاريع التفاعلية دون فقدان المركز الهندسي.",
      principlesTitle: "مبادئ العمل",
      principles: [
        [
          "اجعل النظام مفهوماً",
          "الحدود الواضحة والأدلة أنفع من الذكاء المخفي.",
        ],
        [
          "عامل القيود كمدخلات تصميم",
          "قيود المنصة والفريق والنطاق والبيانات تشكل الحل.",
        ],
        [
          "تحقق قبل العرض",
          "تدعم الاختبارات والمراجعة والمستودعات والقيود الصريحة كل ادعاء.",
        ],
      ],
      rangeTitle: "نطاق مختار",
      range:
        "أنظمة ويب .NET، ومنتجات Angular وNode، وبرامج عمليات WinForms، وتطبيقات Flutter، ونطاقات مدعومة بـSQL، وتصميم تفاعل Unity.",
      projectPinboard: "لوحة المشاريع",
      exploreWork: "استكشف الأعمال المختارة",
      contactTitle: "ابدأ محادثة",
      contact:
        "أستهدف أدوار الباك إند والفل ستاك للمبتدئين باستخدام .NET والتدريب والفرص الهندسية التي تقدر التنفيذ الدقيق والتعلم المستمر.",
      email: "راسل نور",
      linkedin: "LinkedIn",
      github: "GitHub",
    },
  },
} as const;

function PathHeader({
  locale,
  active,
}: {
  locale: Locale;
  active: PortfolioPath;
}) {
  const c = copy[locale];
  return (
    <header className={styles.header}>
      <Link
        className={styles.brand}
        href={`/${locale}`}
        aria-label={
          locale === "ar" ? "صفحة نور الرئيسية" : "Nour Eldeen Dev home"
        }
      >
        <span aria-hidden="true">NE</span>
        <strong>Nour Eldeen Dev</strong>
      </Link>
      <nav aria-label={c.nav}>
        {(Object.keys(c.paths) as PortfolioPath[]).map((path) => (
          <Link
            key={path}
            href={`/${locale}/${path}`}
            aria-current={active === path ? "page" : undefined}
          >
            {c.paths[path]}
          </Link>
        ))}
      </nav>
      <Link className={styles.roomReturn} href={`/${locale}`}>
        <span aria-hidden="true">←</span> {c.back}
      </Link>
    </header>
  );
}

function LearnPath({ locale }: { locale: Locale }) {
  const c = copy[locale].learn;
  return (
    <>
      <section className={styles.pathHero}>
        <p className={styles.eyebrow}>{c.eyebrow}</p>
        <h1>{c.title}</h1>
        <p>{c.intro}</p>
      </section>
      <section className={styles.labGrid}>
        {c.zones.map((zone) => (
          <article key={zone.number} className={styles.labZone}>
            <span>{zone.number}</span>
            <h2>{zone.title}</h2>
            <p>{zone.description}</p>
            <ul className={styles.stack}>
              {zone.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
      <section className={styles.knowledge}>
        <div>
          <p className={styles.eyebrow}>05 / LIBRARY</p>
          <h2>{c.knowledgeTitle}</h2>
          <p>{c.knowledgeIntro}</p>
          <a
            className={styles.primaryAction}
            href="https://noureldeenmahmoud.github.io/MET-Summaries/"
            target="_blank"
            rel="noreferrer"
          >
            {c.visitKnowledge}
          </a>
        </div>
        <ol>
          {c.knowledge.map((item, index) => (
            <li key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item}
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}

function GeneralPath({ locale }: { locale: Locale }) {
  const c = copy[locale].general;
  return (
    <>
      <section className={`${styles.pathHero} ${styles.generalHero}`}>
        <p className={styles.eyebrow}>{c.eyebrow}</p>
        <h1>{c.title}</h1>
        <p>{c.intro}</p>
        <div className={styles.heroLinks}>
          <Link href={`/${locale}?focus=projects`}>{c.projectPinboard}</Link>
          <Link href={`/${locale}?focus=exploration`}>{c.exploreWork}</Link>
        </div>
      </section>
      <section className={styles.principles}>
        <h2>{c.principlesTitle}</h2>
        <div>
          {c.principles.map(([title, description], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className={styles.range}>
        <p className={styles.eyebrow}>RANGE / EVIDENCE</p>
        <h2>{c.rangeTitle}</h2>
        <p>{c.range}</p>
      </section>
      <Contact locale={locale} title={c.contactTitle} description={c.contact} />
    </>
  );
}

function Contact({
  locale,
  title,
  description,
}: {
  locale: Locale;
  title: string;
  description: string;
}) {
  const c = copy[locale].general;
  return (
    <section className={styles.contact}>
      <div>
        <p className={styles.eyebrow}>CONTACT / NEXT STEP</p>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className={styles.contactLinks}>
        <a href="mailto:noureldeendev@gmail.com">{c.email}</a>
        <a
          href="https://linkedin.com/in/nour-eldeen-eg"
          target="_blank"
          rel="noreferrer"
        >
          {c.linkedin}
        </a>
        <a
          href="https://github.com/NourEldeenMahmoud"
          target="_blank"
          rel="noreferrer"
        >
          {c.github}
        </a>
      </div>
    </section>
  );
}

export function PathExperience({
  locale,
  path,
}: {
  locale: Locale;
  path: PortfolioPath;
}) {
  return (
    <main className={styles.path} data-path={path}>
      <PathHeader locale={locale} active={path} />
      {path === "learn" && <LearnPath locale={locale} />}
      {path === "general" && <GeneralPath locale={locale} />}
      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} Nour Eldeen Mahmoud</span>
        <Link href={`/${locale}`}>{copy[locale].back}</Link>
      </footer>
    </main>
  );
}
