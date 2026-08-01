"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { track } from "@vercel/analytics";

function classifyExternalLink(href: string) {
  if (href.startsWith("mailto:")) return "email";
  if (href.includes("github.com")) return "github";
  if (href.includes("linkedin.com")) return "linkedin";
  if (href.includes("noureldeenmahmoud.github.io")) return "learning_site";
  return "other";
}

function getPageType(pathname: string) {
  const projectMatch = pathname.match(/\/[^/]+\/(?:projects|case-studies)\/([^/]+)/);
  if (projectMatch) return { type: "project", project: projectMatch[1] };
  return { type: "site" };
}

export function PortfolioAnalytics() {
  const pathname = usePathname();
  const sessionReportedRef = useRef(false);

  useEffect(() => {
    let activeMilliseconds = 0;
    let visibleStartedAt = Date.now();
    let pageReported = false;

    function reportPageTime() {
      if (pageReported) return;
      if (!document.hidden) activeMilliseconds += Date.now() - visibleStartedAt;
      pageReported = true;

      const seconds = Math.round(activeMilliseconds / 1000);
      if (seconds < 1) return;

      const page = getPageType(pathname);
      void track("page_time_spent", {
        page_type: page.type,
        seconds,
        ...(page.type === "project" ? { project: page.project } : {}),
      });
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        activeMilliseconds += Date.now() - visibleStartedAt;
        visibleStartedAt = Date.now();
      } else {
        visibleStartedAt = Date.now();
      }
    }

    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const markedEvent = target.closest<HTMLElement>("[data-analytics-event]");
      if (markedEvent) {
        const eventName = markedEvent.dataset.analyticsEvent;
        if (eventName) {
          void track(eventName, {
            ...(markedEvent.dataset.analyticsValue
              ? { value: markedEvent.dataset.analyticsValue }
              : {}),
            ...(markedEvent.dataset.project
              ? { project: markedEvent.dataset.project }
              : {}),
            ...(markedEvent.dataset.category
              ? { category: markedEvent.dataset.category }
              : {}),
          });
        }
      }

      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const url = new URL(link.href, window.location.href);
      if (link.hasAttribute("download")) {
        const isCv = url.pathname.toLowerCase().includes("cv");
        void track(isCv ? "cv_downloaded" : "file_downloaded", {
          file_type: url.pathname.split(".").at(-1) ?? "unknown",
        });
        return;
      }

      if (url.origin !== window.location.origin) {
        const destination = classifyExternalLink(url.href);
        const eventName =
          destination === "email"
            ? "contact_clicked"
            : destination === "github"
              ? link.textContent?.toLowerCase().match(/repository|source/)
                ? "repository_clicked"
                : "github_clicked"
              : destination === "linkedin"
                ? "linkedin_clicked"
                : destination === "learning_site"
                  ? "learning_resource_opened"
                : link.textContent?.toLowerCase().includes("demo")
                  ? "project_demo_clicked"
                  : "external_link_clicked";
        void track(eventName, { destination });
        return;
      }

      const localeMatch = url.pathname.match(/^\/(en|ar)(?:\/|$)/);
      const currentLocaleMatch = window.location.pathname.match(/^\/(en|ar)(?:\/|$)/);
      if (localeMatch && currentLocaleMatch && localeMatch[1] !== currentLocaleMatch[1]) {
        void track("language_changed", { language: localeMatch[1] });
        return;
      }

      if (link.dataset.area) {
        void track("path_area_selected", { area: link.dataset.area });
        return;
      }

      const pathMatch = url.pathname.match(/^\/[^/]+\/(hire|watch|learn)\/?$/);
      if (pathMatch) {
        void track("path_selected", { path: pathMatch[1] });
        return;
      }

      const projectMatch = url.pathname.match(
        /^\/[^/]+\/(?:projects|case-studies)\/([^/]+)\/?$/,
      );
      if (projectMatch) {
        void track("project_opened", { project: projectMatch[1] });
      }
    }

    function handleMediaPlay(event: Event) {
      const video = event.target;
      if (!(video instanceof HTMLVideoElement)) return;

      void track("media_played", {
        page: window.location.pathname,
        media: video.currentSrc ? "video" : "unknown",
      });
    }

    document.addEventListener("click", handleClick);
    document.addEventListener("play", handleMediaPlay, true);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      reportPageTime();
      document.removeEventListener("click", handleClick);
      document.removeEventListener("play", handleMediaPlay, true);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [pathname]);

  useEffect(() => {
    let activeMilliseconds = 0;
    let visibleStartedAt = Date.now();

    function handleVisibilityChange() {
      if (document.hidden) {
        activeMilliseconds += Date.now() - visibleStartedAt;
      } else {
        visibleStartedAt = Date.now();
      }
    }

    function reportSessionTime() {
      if (sessionReportedRef.current) return;
      sessionReportedRef.current = true;

      if (!document.hidden) activeMilliseconds += Date.now() - visibleStartedAt;
      const seconds = Math.round(activeMilliseconds / 1000);
      if (seconds >= 1) {
        void track("site_time_spent", { seconds });
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", reportSessionTime);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", reportSessionTime);
    };
  }, []);

  return null;
}
