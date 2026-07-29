"use client";

import { useCallback } from "react";
import Image from "next/image";
import type { HeroWidget } from "@/content/learn";
import { WidgetCard } from "./widget-card";
import styles from "./learn.module.css";

interface WidgetHeroProps {
  widget: HeroWidget;
  onOpen: (folderId?: string, fileId?: string) => void;
}

export function WidgetHero({ widget, onOpen }: WidgetHeroProps) {
  const handleClick = useCallback(() => {
    onOpen(widget.openFolderId, widget.openFileId);
  }, [onOpen, widget.openFolderId, widget.openFileId]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick();
      }
    },
    [handleClick],
  );

  return (
    <WidgetCard
      variant="hero"
      role="button"
      tabIndex={0}
      aria-label={`${widget.title} — ${widget.subtitle}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.widgetCardAccentStrip} />

      <div className={styles.widgetCardBody}>
        <div className={styles.widgetCardTop}>
          <div className={styles.widgetCardAvatar}>
            {widget.avatarSrc ? (
              <Image
                className={styles.widgetCardAvatarImage}
                src={widget.avatarSrc}
                alt=""
                width={160}
                height={160}
                sizes="80px"
                draggable={false}
              />
            ) : (
              <span className={styles.widgetCardAvatarText}>
                {widget.avatarFallback}
              </span>
            )}
          </div>
          <div className={styles.widgetCardIdentity}>
            <h3 className={styles.widgetCardName}>{widget.title}</h3>
            <span className={styles.widgetCardSubtitle}>{widget.subtitle}</span>
          </div>
        </div>

        <p className={styles.widgetCardDescription}>{widget.content}</p>

        <div className={styles.widgetCardCapsules}>
          {widget.capsules.map((cap) => (
            <div key={cap.label} className={styles.widgetCardCapsule}>
              <span className={styles.widgetCardCapsuleLabel}>{cap.label}</span>
              <span className={styles.widgetCardCapsuleValue}>{cap.value}</span>
            </div>
          ))}
        </div>

        <div className={styles.widgetCardFeature}>
          {widget.featureItems.map((fi) => (
            <div key={fi.label} className={styles.widgetCardFeatureItem}>
              <span className={styles.widgetCardFeatureDot} />
              <span>{fi.label}</span>
            </div>
          ))}
        </div>

        {widget.downloadCvUrl && (
          <a
            className={styles.widgetCardCvDownload}
            href={widget.downloadCvUrl}
            download
          >
            <span aria-hidden="true">↓</span>
            {widget.downloadCvLabel ?? "Download CV"}
          </a>
        )}
        <div className={styles.widgetCardFooter}>
          <span>{widget.footer}</span>
        </div>
      </div>
    </WidgetCard>
  );
}
