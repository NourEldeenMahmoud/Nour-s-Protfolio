"use client";

import { useCallback, useEffect, useRef } from "react";
import type { Locale } from "@/i18n/routing";
import { widgetsV2 } from "@/content/learn";
import { WidgetHero } from "./widget-hero";
import { WidgetFeatured } from "./widget-featured";
import styles from "./learn.module.css";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface LearnWidgetsProps {
  locale: Locale;
  onOpenFolder: (id: string, name: string) => void;
  onOpenFile: (id: string, name: string) => void;
  learnNodeMap: Map<string, { name: Record<Locale, string> }>;
}

export function LearnWidgets({
  locale,
  onOpenFolder,
  onOpenFile,
  learnNodeMap,
}: LearnWidgetsProps) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOpen = useCallback(
    (folderId?: string, fileId?: string) => {
      if (fileId) {
        const node = learnNodeMap.get(fileId);
        if (node) onOpenFile(fileId, node.name[locale]);
      } else if (folderId) {
        const node = learnNodeMap.get(folderId);
        if (node) onOpenFolder(folderId, node.name[locale]);
      }
    },
    [locale, onOpenFolder, onOpenFile, learnNodeMap],
  );

  // GSAP entry animation
  useEffect(() => {
    if (reducedMotion) return;

    let cleanup: (() => void) | undefined;
    void import("gsap").then(({ gsap }) => {
      const ctx = gsap.context(() => {
        const cards = containerRef.current?.querySelectorAll(`.${styles.widgetCard}`);
        if (!cards?.length) return;
        gsap.set(cards, { y: 20, opacity: 0 });
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.15,
        });
      }, containerRef);
      cleanup = () => ctx.revert();
    });

    return () => {
      cleanup?.();
    };
  }, [reducedMotion]);

  const heroWidget = widgetsV2.find((w) => w.kind === "hero");
  const featuredWidget = widgetsV2.find((w) => w.kind === "featured");

  return (
    <div ref={containerRef} className={styles.learnWidgets} aria-label="Widgets">
      {heroWidget?.kind === "hero" && (
        <WidgetHero widget={heroWidget} onOpen={handleOpen} />
      )}
      {featuredWidget?.kind === "featured" && (
        <WidgetFeatured widget={featuredWidget} onOpen={handleOpen} />
      )}
    </div>
  );
}
