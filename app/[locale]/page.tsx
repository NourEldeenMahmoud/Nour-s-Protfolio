import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { RoomExperience } from "@/components/room/room-experience";
import { isLocale } from "@/i18n/routing";

export default async function EntryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  setRequestLocale(locale);
  const t = await getTranslations("room");

  return (
    <RoomExperience
      locale={locale}
      copy={{
        eyebrow: t("eyebrow"),
        name: t("name"),
        role: t("role"),
        introStatus: t("introStatus"),
        readyStatus: t("readyStatus"),
        loading: t("loading"),
        skip: t("skip"),
        replay: t("replay"),
        returnToRoom: t("returnToRoom"),
        openComputer: t("openComputer"),
        language: t("language"),
        languageLabel: t("languageLabel"),
        instruction: t("instruction"),
        areas: {
          projects: {
            label: t("areas.projects.label"),
            description: t("areas.projects.description"),
            path: "hire",
          },
          exploration: {
            label: t("areas.exploration.label"),
            description: t("areas.exploration.description"),
            path: "watch",
          },
          lab: {
            label: t("areas.lab.label"),
            description: t("areas.lab.description"),
            path: "learn",
          },
        },
        showcase: {
          categoriesLabel: t("showcase.categoriesLabel"),
          previousProject: t("showcase.previousProject"),
          nextProject: t("showcase.nextProject"),
          previousMedia: t("showcase.previousMedia"),
          nextMedia: t("showcase.nextMedia"),
          projectCount: t.raw("showcase.projectCount"),
          play: t("showcase.play"),
          pause: t("showcase.pause"),
          timeline: t("showcase.timeline"),
          elapsed: t("showcase.elapsed"),
          mediaCount: t.raw("showcase.mediaCount"),
          viewProject: t("showcase.viewProject"),
          repository: t("showcase.repository"),
          currentScene: t("showcase.currentScene"),
          mediaUnavailable: t("showcase.mediaUnavailable"),
          emptyState: t("showcase.emptyState"),
        },
      }}
    />
  );
}
