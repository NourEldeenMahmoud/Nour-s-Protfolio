"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

function classifyExternalLink(href: string) {
  if (href.startsWith("mailto:")) return "email";
  if (href.includes("github.com")) return "github";
  if (href.includes("linkedin.com")) return "linkedin";
  if (href.includes("noureldeenmahmoud.github.io")) return "learning_site";
  return "other";
}

export function PortfolioAnalytics() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

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
        void track("external_link_clicked", {
          destination: classifyExternalLink(url.href),
        });
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

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("play", handleMediaPlay, true);
    };
  }, []);

  return null;
}
