"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const statusCopy = {
  en: {
    errorEyebrow: "SYSTEM / RECOVERY",
    errorTitle: "Something interrupted the experience.",
    errorBody:
      "Your work is safe. Retry this view or return to the engineering room.",
    notFoundEyebrow: "404 / ROUTE NOT FOUND",
    notFoundTitle: "This route does not exist.",
    notFoundBody: "The requested destination is unavailable or may have moved.",
    retry: "Try again",
    home: "Return to the engineering room",
  },
  ar: {
    errorEyebrow: "النظام / الاستعادة",
    errorTitle: "حدث عطل أوقف التجربة.",
    errorBody:
      "يمكنك إعادة محاولة فتح هذا العرض أو العودة إلى الغرفة الهندسية.",
    notFoundEyebrow: "404 / المسار غير موجود",
    notFoundTitle: "هذا المسار غير موجود.",
    notFoundBody: "الوجهة المطلوبة غير متاحة أو ربما تم نقلها.",
    retry: "إعادة المحاولة",
    home: "العودة إلى الغرفة الهندسية",
  },
} as const;

export function SystemStatus({
  kind,
  retry,
}: {
  kind: "error" | "not-found";
  retry?: () => void;
}) {
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] === "ar" ? "ar" : "en";
  const copy = statusCopy[locale];
  const isError = kind === "error";

  return (
    <main className="system-status">
      <section className="placeholder-shell" aria-labelledby="status-title">
        <p className="metadata-label">
          {isError ? copy.errorEyebrow : copy.notFoundEyebrow}
        </p>
        <h1 id="status-title">
          {isError ? copy.errorTitle : copy.notFoundTitle}
        </h1>
        <p>{isError ? copy.errorBody : copy.notFoundBody}</p>
        <div className="system-status-actions">
          {retry && (
            <button className="text-link" type="button" onClick={retry}>
              {copy.retry}
            </button>
          )}
          <Link className="text-link" href={`/${locale}`}>
            {copy.home}
          </Link>
        </div>
      </section>
    </main>
  );
}
