import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/routing";
import { MotionProvider } from "@/components/providers/motion-provider";
import { LocalePreference } from "@/components/providers/locale-preference";
import { RoomMusicProvider } from "@/components/providers/room-music-provider";
import { JsonLd } from "@/components/seo/json-ld";
import { getSiteUrl, personName, siteName } from "@/lib/seo";
import { createHomeStructuredData } from "@/lib/structured-data";
import "@/styles/globals.css";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: "#0b1014",
};

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    metadataBase: getSiteUrl(),
    title: t("title"),
    description: t("description"),
    applicationName: siteName,
    authors: [{ name: personName, url: getSiteUrl() }],
    creator: personName,
    publisher: siteName,
    formatDetection: { email: false, address: false, telephone: false },
  };
}

const isProduction = process.env.NODE_ENV === "production";

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      data-scroll-behavior="smooth"
      data-motion="full"
      suppressHydrationWarning
    >
      <head>
        {isProduction && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){var root=document.documentElement;var params=new URLSearchParams(location.search);var forced=params.get("reducedMotion")==="1";var systemReduced=matchMedia("(prefers-reduced-motion:reduce)").matches;var preference="system";try{var saved=localStorage.getItem("portfolio-motion-preference");var legacy=localStorage.getItem("portfolio-reduced-motion")==="true";preference=saved==="full"||saved==="reduced"?saved:legacy?"reduced":"system";}catch(e){preference="system";}root.dataset.motion=forced||preference==="reduced"||preference==="system"&&systemReduced?"reduced":"full";})()`,
            }}
          />
        )}
      </head>
      <body>
        <JsonLd data={createHomeStructuredData(locale)} />
        <LocalePreference locale={locale} />
        <MotionProvider>
          <NextIntlClientProvider messages={messages}>
            <RoomMusicProvider>{children}</RoomMusicProvider>
          </NextIntlClientProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
