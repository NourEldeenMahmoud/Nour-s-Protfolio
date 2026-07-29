import { ImageResponse } from "next/og";
import { isLocale } from "@/i18n/routing";

const socialKinds = new Set([
  "portfolio",
  "project",
  "case-study",
  "knowledge",
]);

function readParameter(url: URL, key: string, fallback: string, limit: number) {
  return (url.searchParams.get(key)?.trim() || fallback).slice(0, limit);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const requestedLocale = url.searchParams.get("locale") ?? "en";
  const locale = isLocale(requestedLocale) ? requestedLocale : "en";
  const requestedKind = url.searchParams.get("kind") ?? "portfolio";
  const kind = socialKinds.has(requestedKind) ? requestedKind : "portfolio";
  const title = readParameter(url, "title", "Nour Eldeen Mahmoud", 110);
  const description = readParameter(
    url,
    "description",
    ".NET-centered software engineering portfolio",
    220,
  );
  const isRtl = locale === "ar";

  return new ImageResponse(
    <div
      dir={isRtl ? "rtl" : "ltr"}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "68px 76px",
        overflow: "hidden",
        background: "#0b1014",
        color: "#f1eadc",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          background:
            "radial-gradient(circle at 82% 18%, rgba(96, 188, 207, 0.22), transparent 34%), radial-gradient(circle at 14% 86%, rgba(226, 185, 116, 0.2), transparent 38%)",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          color: "#e2b974",
          fontSize: 24,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        <span>NOUR / ENGINEERING CORE</span>
        <span>{kind.replace("-", " / ")}</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          maxWidth: 980,
          gap: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            width: 86,
            height: 6,
            borderRadius: 999,
            background: "linear-gradient(90deg, #e2b974, #78b8c6)",
          }}
        />
        <h1
          style={{
            margin: 0,
            fontSize: title.length > 70 ? 58 : 72,
            lineHeight: 1.04,
            letterSpacing: "-0.035em",
            textWrap: "balance",
          }}
        >
          {title}
        </h1>
        <p
          style={{
            margin: 0,
            maxWidth: 900,
            color: "#b9c0c3",
            fontSize: 28,
            lineHeight: 1.38,
            textWrap: "balance",
          }}
        >
          {description}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          position: "relative",
          justifyContent: "space-between",
          color: "#839096",
          fontSize: 22,
        }}
      >
        <span>.NET / FULL-STACK / SYSTEMS</span>
        <span>{isRtl ? "AR" : "EN"} / 2026</span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    },
  );
}
