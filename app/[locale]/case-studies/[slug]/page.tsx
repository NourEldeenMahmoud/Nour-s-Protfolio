import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { CaseStudyExperience } from "@/components/case-studies/case-study-experience";
import { caseStudySlugs, getCaseStudy } from "@/content/case-studies";
import { getProject } from "@/content/portfolio";
import { isLocale } from "@/i18n/routing";
import { JsonLd } from "@/components/seo/json-ld";
import { createPageMetadata } from "@/lib/seo";
import { createCaseStudyStructuredData } from "@/lib/structured-data";

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project || !isLocale(locale)) return {};
  return createPageMetadata({
    locale,
    path: `/case-studies/${project.slug}`,
    title:
      locale === "ar"
        ? `دراسة حالة ${project.title} | نور الدين محمود`
        : `${project.title} Case Study | Nour Eldeen Mahmoud`,
    description: project.context[locale],
    socialKind: "case-study",
    type: "article",
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const project = getProject(slug);
  const study = getCaseStudy(slug);
  if (!project || !study) notFound();
  setRequestLocale(locale);
  return (
    <>
      <JsonLd data={createCaseStudyStructuredData(project, locale)} />
      <CaseStudyExperience locale={locale} project={project} study={study} />
    </>
  );
}
