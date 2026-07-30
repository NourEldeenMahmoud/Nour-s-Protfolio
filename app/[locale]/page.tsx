import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { RoomExperience } from "@/components/room/room-experience";
import { isLocale } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "metadata" });
  return createPageMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    socialKind: "portfolio",
  });
}

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
        mobileExperience: {
          title: t("mobileExperience.title"),
          description: t("mobileExperience.description"),
          dismiss: t("mobileExperience.dismiss"),
        },
        profile: {
          triggerEyebrow: t("profile.triggerEyebrow"),
          triggerLabel: t("profile.triggerLabel"),
          open: t("profile.open"),
          eyebrow: t("profile.eyebrow"),
          close: t("profile.close"),
          portraitAlt: t("profile.portraitAlt"),
          fileNumber: t("profile.fileNumber"),
          title: t("profile.title"),
          role: t("profile.role"),
          location: t("profile.location"),
          graduation: t("profile.graduation"),
          intro: t("profile.intro"),
          downloadCv: t("profile.downloadCv"),
          emailAction: t("profile.emailAction"),
          navigation: t("profile.navigation"),
          aboutNav: t("profile.aboutNav"),
          cvNav: t("profile.cvNav"),
          contactNav: t("profile.contactNav"),
          focusLabel: t("profile.focusLabel"),
          focusValue: t("profile.focusValue"),
          educationLabel: t("profile.educationLabel"),
          educationValue: t("profile.educationValue"),
          locationLabel: t("profile.locationLabel"),
          aboutTitle: t("profile.aboutTitle"),
          aboutBody: t("profile.aboutBody"),
          cvTitle: t("profile.cvTitle"),
          cvIntro: t("profile.cvIntro"),
          degreeLabel: t("profile.degreeLabel"),
          degree: t("profile.degree"),
          academy: t("profile.academy"),
          trainingLabel: t("profile.trainingLabel"),
          training: t("profile.training"),
          skillsTitle: t("profile.skillsTitle"),
          skills: t.raw("profile.skills"),
          evidenceTitle: t("profile.evidenceTitle"),
          evidenceBody: t("profile.evidenceBody"),
          hiringView: t("profile.hiringView"),
          caseStudies: t("profile.caseStudies"),
          contactEyebrow: t("profile.contactEyebrow"),
          contactTitle: t("profile.contactTitle"),
          contactBody: t("profile.contactBody"),
          email: t("profile.email"),
          whatsapp: t("profile.whatsapp"),
          telegram: t("profile.telegram"),
          linkedin: t("profile.linkedin"),
          github: t("profile.github"),
        },
        certificate: {
          triggerEyebrow: t("certificate.triggerEyebrow"),
          triggerTitle: t("certificate.triggerTitle"),
          triggerAction: t("certificate.triggerAction"),
          open: t("certificate.open"),
          eyebrow: t("certificate.eyebrow"),
          close: t("certificate.close"),
          title: t("certificate.title"),
          description: t("certificate.description"),
          selectedLabel: t("certificate.selectedLabel"),
          galleryLabel: t("certificate.galleryLabel"),
          selectCertificate: t("certificate.selectCertificate"),
          certificateCount: t("certificate.certificateCount"),
        },
        clock: {
          label: t("clock.label"),
          timezone: t("clock.timezone"),
        },
        music: {
          label: t("music.label"),
          track: t("music.track"),
          play: t("music.play"),
          pause: t("music.pause"),
          mute: t("music.mute"),
          unmute: t("music.unmute"),
          volume: t("music.volume"),
          openControls: t("music.openControls"),
          closeControls: t("music.closeControls"),
          error: t("music.error"),
        },
        areas: {
          projects: {
            label: t("areas.projects.label"),
            description: t("areas.projects.description"),
          },
          exploration: {
            label: t("areas.exploration.label"),
            description: t("areas.exploration.description"),
          },
          lab: {
            label: t("areas.lab.label"),
            description: t("areas.lab.description"),
          },
        },
        showcase: {
          categoriesLabel: t("showcase.categoriesLabel"),
          projectsLabel: t.raw("showcase.projectsLabel"),
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
          currentScene: t("showcase.currentScene"),
          mediaUnavailable: t("showcase.mediaUnavailable"),
          emptyState: t("showcase.emptyState"),
        },
      }}
    />
  );
}
