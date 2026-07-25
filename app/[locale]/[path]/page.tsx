import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import {
  PathExperience,
  type PortfolioPath,
} from "@/components/paths/path-experience";
import { LearnExperiencePage } from "@/components/paths/learn/learn-page";
import { isLocale } from "@/i18n/routing";

const paths = ["hire", "watch", "learn", "general"] as const;

function isPath(value: string): value is PortfolioPath {
  return paths.includes(value as (typeof paths)[number]);
}

export function generateStaticParams() {
  return paths.map((path) => ({ path }));
}

export default async function DestinationContractPage({
  params,
}: {
  params: Promise<{ locale: string; path: string }>;
}) {
  const { locale, path } = await params;
  if (!isLocale(locale) || !isPath(path)) notFound();

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
