import { setRequestLocale } from "next-intl/server";
import { notFound, permanentRedirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import {
  PathExperience,
  type PortfolioPath,
} from "@/components/paths/path-experience";
import { LearnExperiencePage } from "@/components/paths/learn/learn-page";
import { isLocale } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/seo";

const paths = ["learn", "general"] as const;

const pathMetadata = {
  en: {
    learn: {
      title: "Engineering Knowledge & Workflow | Nour Eldeen Mahmoud",
      description:
        "Explore Nour Eldeen Mahmoud's verified engineering knowledge, tools, workflows, certificates, and learning system.",
    },
    general: {
      title: "About Nour Eldeen Mahmoud | Software Engineer",
      description:
        "Meet Nour Eldeen Mahmoud, a .NET-centered software engineer working across backend, full-stack, cross-platform, and interactive systems.",
    },
  },
  ar: {
    learn: {
      title: "المعرفة وسير العمل الهندسي | نور الدين محمود",
      description:
        "استكشف معرفة نور الدين محمود الهندسية المؤكدة وأدواته وسير العمل والشهادات ونظام التعلم.",
    },
    general: {
      title: "عن نور الدين محمود | مهندس برمجيات",
      description:
        "تعرّف على نور الدين محمود، مهندس برمجيات يرتكز عمله على .NET عبر الباك إند والفل ستاك والأنظمة متعددة المنصات والتفاعلية.",
    },
  },
} as const;

function isPath(value: string): value is PortfolioPath {
  return paths.includes(value as (typeof paths)[number]);
}

export function generateStaticParams() {
  return paths.map((path) => ({ path }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; path: string }>;
}): Promise<Metadata> {
  const { locale, path } = await params;
  if (!isLocale(locale) || !isPath(path)) return {};
  const copy = pathMetadata[locale][path];
  return createPageMetadata({
    locale,
    path: `/${path}`,
    title: copy.title,
    description: copy.description,
    socialKind: path === "learn" ? "knowledge" : "portfolio",
  });
}

export default async function DestinationContractPage({
  params,
}: {
  params: Promise<{ locale: string; path: string }>;
}) {
  const { locale, path } = await params;
  if (!isLocale(locale) || !isPath(path)) notFound();

  if (path === "general") permanentRedirect(`/${locale}`);

  setRequestLocale(locale);

  if (path === "learn") {
    const t = await getTranslations("learnDesktop");
    return (
      <LearnExperiencePage
        locale={locale}
        copy={{
          returnToRoom: t("returnToRoom"),
          openComputer: t("openComputer"),
          start: t("start"),
          search: t("search"),
          searchPlaceholder: t("searchPlaceholder"),
          fileExplorer: t("fileExplorer"),
          desktop: t("desktop"),
          emptyFolder: t("emptyFolder"),
          itemCountPattern: t("itemCount", { count: "{{count}}" }),
          thisPC: t("thisPC"),
          copyLink: t("copyLink"),
          copied: t("copied"),
          openProject: t("openProject"),
          relatedFiles: t("relatedFiles"),
          relatedProjects: t("relatedProjects"),
          limitations: t("limitations"),
          startMenuTitle: t("startMenuTitle"),
          noResults: t("noResults"),
          languageLabel: t("languageLabel"),
          usedFor: t("usedFor"),
          workflowUses: t("workflowUses"),
          relatedSkills: t("relatedSkills"),
          menuCopy: t("menuCopy"),
          menuRefresh: t("menuRefresh"),
          menuOpen: t("menuOpen"),
          menuHideWidgets: t("menuHideWidgets"),
          menuShowWidgets: t("menuShowWidgets"),
          menuAbout: t("menuAbout"),
          menuReturn: t("menuReturn"),
          menuPaste: t("menuPaste"),
          toastFileCopied: t("toastFileCopied"),
          toastTextCopied: t("toastTextCopied"),
          toastCopyFailed: t("toastCopyFailed"),
          menuSortBy: t("menuSortBy"),
          sortName: t("sortName"),
          sortItemType: t("sortItemType"),
          sortDefault: t("sortDefault"),
          sortCustom: t("sortCustom"),
          toastDesktopRefreshed: t("toastDesktopRefreshed"),
        }}
      />
    );
  }

  return <PathExperience locale={locale} path={path} />;
}
import type { Metadata } from "next";
