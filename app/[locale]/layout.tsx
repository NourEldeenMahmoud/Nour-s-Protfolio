import type { Metadata } from "next";
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
import "@/styles/globals.css";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: { en: "/en", ar: "/ar" },
    },
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
              __html: `(function(){var root=document.documentElement;try{var params=new URLSearchParams(location.search);var manual=params.get("reducedMotion")==="1"||localStorage.getItem("portfolio-reduced-motion")==="true";var systemReduced=matchMedia("(prefers-reduced-motion:reduce)").matches;root.dataset.motion=manual||systemReduced?"reduced":"full";}catch(e){root.dataset.motion="full";}})()`,
            }}
          />
        )}
      </head>
      <body>
        <MotionProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
