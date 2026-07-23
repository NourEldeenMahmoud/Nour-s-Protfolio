import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  PathExperience,
  type PortfolioPath,
} from "@/components/paths/path-experience";
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
  return <PathExperience locale={locale} path={path} />;
}
