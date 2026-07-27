import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/routing";
import { projects, type Project } from "@/content/portfolio";
import { caseStudySlugs } from "@/content/case-studies";
import styles from "./path.module.css";

export type PortfolioPath = "hire" | "watch" | "learn" | "general";

const copy = {
  en: {
    back: "Return to the room",
    nav: "Portfolio paths",
    paths: {
      watch: "Case studies",
      learn: "Engineering lab",
      general: "About",
      hire: "Hiring view",
    },
    watch: {
      eyebrow: "PINBOARD / CASE STUDIES",
      title: "Software built around real constraints.",
      intro:
        "Six repository-backed studies covering product engineering, .NET systems, desktop software, cross-platform work, and team delivery.",
      open: "Read case study",
      repository: "Repository",
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
      contactTitle: "Start a conversation",
      contact:
        "I am targeting junior .NET backend and full-stack roles, internships, and engineering opportunities where careful implementation and continued learning matter.",
      email: "Email Nour",
      linkedin: "LinkedIn",
      github: "GitHub",
    },
    hire: {
      eyebrow: "RECRUITER VIEW / ROLE EVIDENCE",
      title: "Evidence for a junior .NET backend or full-stack role.",
      intro:
        "A concise evaluation path: target role, relevant systems, contribution context, engineering range, and direct contact. No unsupported percentages or unavailable CV download are presented.",
      evidenceTitle: "Role evidence",
      evidence: [
        [
          "Bookify",
          ".NET 9 MVC, booking and payment workflows, identity, SQL Server, and backend architecture.",
        ],
        [
          "CinemaVerse",
          ".NET 9 API work across booking, ticketing, payments, JWT, and background jobs in a team context.",
        ],
        [
          "Blood Bank Platform",
          "Desktop, API, mobile, and SQL Server work across one operational domain.",
        ],
        [
          "BuildSense",
          "Solo product engineering, TypeScript, Angular, Node, data ingestion, testing, and CI.",
        ],
      ],
      honestTitle: "What this view does not claim",
      honest:
        "Team projects retain team attribution. Missing metrics, unpublished test evidence, and unverified deployments stay identified as limitations rather than being converted into marketing claims.",
      contact: "Discuss an opportunity",
    },
  },
  ar: {
    back: "العودة إلى الغرفة",
    nav: "مسارات المعرض",
    paths: {
      watch: "دراسات الحالة",
      learn: "المعمل الهندسي",
      general: "عن نور",
      hire: "مسار التوظيف",
    },
    watch: {
      eyebrow: "لوحة المشاريع / دراسات الحالة",
      title: "برمجيات بُنيت حول قيود حقيقية.",
      intro:
        "ست دراسات موثقة بالمستودعات تغطي هندسة المنتجات وأنظمة .NET وبرامج سطح المكتب والعمل متعدد المنصات والتسليم الجماعي.",
      open: "اقرأ دراسة الحالة",
      repository: "المستودع",
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
      contactTitle: "ابدأ محادثة",
      contact:
        "أستهدف أدوار الباك إند والفل ستاك للمبتدئين باستخدام .NET والتدريب والفرص الهندسية التي تقدر التنفيذ الدقيق والتعلم المستمر.",
      email: "راسل نور",
      linkedin: "LinkedIn",
      github: "GitHub",
    },
    hire: {
      eyebrow: "مسار مسؤول التوظيف / أدلة الملاءمة",
      title: "أدلة لدور مبتدئ في باك إند .NET أو الفل ستاك.",
      intro:
        "مسار تقييم مختصر: الدور المستهدف والأنظمة ذات الصلة وسياق المساهمة والنطاق الهندسي والتواصل المباشر، دون نسب غير مدعومة أو تنزيل سيرة ذاتية غير متاح.",
      evidenceTitle: "أدلة الدور",
      evidence: [
        [
          "Bookify",
          ".NET 9 MVC وتدفقات الحجز والدفع والهوية وSQL Server وهندسة الباك إند.",
        ],
        [
          "CinemaVerse",
          "عمل API باستخدام .NET 9 عبر الحجز والتذاكر والمدفوعات وJWT والمهام الخلفية ضمن فريق.",
        ],
        [
          "منصة بنك الدم",
          "سطح مكتب وAPI وموبايل وSQL Server ضمن نطاق عمليات واحد.",
        ],
        [
          "BuildSense",
          "هندسة منتج فردي وTypeScript وAngular وNode وجمع البيانات والاختبارات وCI.",
        ],
      ],
      honestTitle: "ما لا يدعيه هذا المسار",
      honest:
        "تحافظ المشاريع الجماعية على نسبتها للفريق. وتظل المقاييس المفقودة وأدلة الاختبارات غير المنشورة والنسخ غير المؤكدة قيوداً صريحة بدلاً من تحويلها إلى ادعاءات تسويقية.",
      contact: "ناقش فرصة",
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
        aria-label={locale === "ar" ? "صفحة نور الرئيسية" : "Nour Eldeen home"}
      >
        <span aria-hidden="true">NE</span>
        <strong>Nour Eldeen</strong>
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

function WatchPath({ locale }: { locale: Locale }) {
  const c = copy[locale].watch;
  const caseStudyProjects = caseStudySlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is Project => p !== undefined);

  return (
    <>
      <section className={styles.pathHero}>
        <p className={styles.eyebrow}>{c.eyebrow}</p>
        <h1>{c.title}</h1>
        <p>{c.intro}</p>
      </section>
      <section className={styles.projectGrid} aria-label={c.title}>
        {caseStudyProjects.map((project, index) => (
          <article
            key={project.slug}
            className={styles.projectCard}
            data-featured={project.featured || undefined}
          >
            <Link
              className={styles.projectImage}
              href={`/${locale}/case-studies/${project.slug}`}
              aria-label={`${c.open}: ${project.title}`}
            >
              <Image
                src={project.image}
                alt={project.imageAlt[locale]}
                fill
                sizes={
                  project.featured
                    ? "(max-width: 800px) 100vw, 64vw"
                    : "(max-width: 800px) 100vw, 32vw"
                }
                priority={index === 0}
              />
            </Link>
            <div className={styles.projectBody}>
              <p className={styles.projectNumber}>
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2>{project.shortTitle}</h2>
              <p>{project.summary[locale]}</p>
              <ul className={styles.stack} aria-label="Technology stack">
                {project.stack.slice(0, 4).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className={styles.projectActions}>
                <Link href={`/${locale}/case-studies/${project.slug}`}>
                  {c.open}
                </Link>
                <a href={project.repository} target="_blank" rel="noreferrer">
                  {c.repository}
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
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
          <Link href={`/${locale}/watch`}>{copy[locale].paths.watch}</Link>
          <Link href={`/${locale}/hire`}>{copy[locale].paths.hire}</Link>
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

function HirePath({ locale }: { locale: Locale }) {
  const c = copy[locale].hire;
  return (
    <>
      <section className={`${styles.pathHero} ${styles.hireHero}`}>
        <p className={styles.eyebrow}>{c.eyebrow}</p>
        <h1>{c.title}</h1>
        <p>{c.intro}</p>
        <a
          className={styles.primaryAction}
          href="mailto:noureldeendev@gmail.com"
        >
          {c.contact}
        </a>
      </section>
      <section className={styles.evidence}>
        <h2>{c.evidenceTitle}</h2>
        <div>
          {c.evidence.map(([title, description], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>
      <aside className={styles.honestBoundary}>
        <h2>{c.honestTitle}</h2>
        <p>{c.honest}</p>
      </aside>
      <Contact
        locale={locale}
        title={copy[locale].general.contactTitle}
        description={copy[locale].general.contact}
      />
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
      {path === "watch" && <WatchPath locale={locale} />}
      {path === "learn" && <LearnPath locale={locale} />}
      {path === "general" && <GeneralPath locale={locale} />}
      {path === "hire" && <HirePath locale={locale} />}
      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} Nour Eldeen Mahmoud</span>
        <Link href={`/${locale}`}>{copy[locale].back}</Link>
      </footer>
    </main>
  );
}
