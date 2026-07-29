import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ProjectExperience } from "@/components/projects/project-experience";
import { getProject, projectSlugs } from "@/content/portfolio";
import { isLocale } from "@/i18n/routing";
import { JsonLd } from "@/components/seo/json-ld";
import { createPageMetadata } from "@/lib/seo";
import { createProjectStructuredData } from "@/lib/structured-data";

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
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
    path: `/projects/${project.slug}`,
    title: `${project.title} | Nour Eldeen Mahmoud`,
    description: project.summary[locale],
    socialKind: "project",
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const project = getProject(slug);
  if (!project) notFound();
  setRequestLocale(locale);
  return (
    <>
      <JsonLd data={createProjectStructuredData(project, locale)} />
      <ProjectExperience locale={locale} project={project} />
    </>
  );
}
