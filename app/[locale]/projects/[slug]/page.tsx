import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ProjectExperience } from "@/components/projects/project-experience";
import { getProject, projectSlugs } from "@/content/portfolio";
import { isLocale } from "@/i18n/routing";

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
  return {
    title: `${project.title} | Nour Eldeen Mahmoud`,
    description: project.summary[locale],
  };
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
  return <ProjectExperience locale={locale} project={project} />;
}
