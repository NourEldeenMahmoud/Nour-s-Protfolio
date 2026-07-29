import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { localeCookieName, resolvePreferredLocale } from "@/i18n/routing";

export default async function RootPage() {
  const [cookieStore, headerStore] = await Promise.all([cookies(), headers()]);
  const locale = resolvePreferredLocale(
    cookieStore.get(localeCookieName)?.value,
    headerStore.get("accept-language"),
  );

  redirect(`/${locale}`);
}
