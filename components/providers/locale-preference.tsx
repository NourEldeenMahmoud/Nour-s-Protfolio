"use client";

import { useEffect } from "react";
import { localeCookieName, type Locale } from "@/i18n/routing";

export function LocalePreference({ locale }: { locale: Locale }) {
  useEffect(() => {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
  }, [locale]);

  return null;
}
