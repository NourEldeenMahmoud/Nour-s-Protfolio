"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { certificateGallery } from "@/content/learn/certificates";
import type { Locale } from "@/i18n/routing";
import { NavIcon } from "@/components/paths/learn/learn-icons";
import styles from "./certificate-spotlight.module.css";

export type CertificateSpotlightCopy = {
  triggerEyebrow: string;
  triggerTitle: string;
  triggerAction: string;
  open: string;
  eyebrow: string;
  close: string;
  title: string;
  description: string;
  selectedLabel: string;
  galleryLabel: string;
  selectCertificate: string;
  certificateCount: string;
};

function CertificateDialog({
  locale,
  copy,
  onClose,
}: {
  locale: Locale;
  copy: CertificateSpotlightCopy;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCertificate = certificateGallery[activeIndex]!;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="certificate-title"
      onCancel={(event) => {
        event.preventDefault();
        event.currentTarget.close();
      }}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      <article className={styles.modal}>
        <header className={styles.header}>
          <div>
            <p>{copy.eyebrow}</p>
            <span>
              {certificateGallery.length} / {copy.certificateCount}
            </span>
          </div>
          <button
            type="button"
            aria-label={copy.close}
            autoFocus
            onClick={() => dialogRef.current?.close()}
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <div className={styles.content}>
          <div className={styles.viewer}>
            <figure className={styles.certificate}>
              <Image
                key={activeCertificate.src}
                src={activeCertificate.src}
                alt={activeCertificate.alt[locale]}
                fill
                sizes="(max-width: 820px) 94vw, 62vw"
              />
            </figure>

            <section className={styles.details}>
              <p className={styles.kicker}>
                {copy.selectedLabel} /{" "}
                {String(activeIndex + 1).padStart(2, "0")}
              </p>
              <h2 id="certificate-title">{copy.title}</h2>
              <h3>{activeCertificate.caption[locale]}</h3>
              <p>{copy.description}</p>
            </section>
          </div>

          <section className={styles.gallery} aria-label={copy.galleryLabel}>
            <header>
              <p>{copy.galleryLabel}</p>
              <span>
                {certificateGallery.length} {copy.certificateCount}
              </span>
            </header>
            <div className={styles.galleryGrid}>
              {certificateGallery.map((certificate, index) => (
                <button
                  key={certificate.src}
                  type="button"
                  aria-label={`${copy.selectCertificate}: ${certificate.caption[locale]}`}
                  aria-pressed={activeIndex === index}
                  onClick={() => setActiveIndex(index)}
                >
                  <span className={styles.thumbnail}>
                    <Image
                      src={certificate.src}
                      alt=""
                      fill
                      sizes="(max-width: 520px) 42vw, 11rem"
                      loading="lazy"
                    />
                  </span>
                  <span>{certificate.caption[locale]}</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </article>
    </dialog>
  );
}

export function CertificateSpotlight({
  locale,
  copy,
  active,
}: {
  locale: Locale;
  copy: CertificateSpotlightCopy;
  active: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className={styles.trigger}
        type="button"
        data-active={active || undefined}
        data-analytics-event="certificate_opened"
        aria-label={copy.open}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        tabIndex={active ? 0 : -1}
        onClick={() => setIsOpen(true)}
      >
        <span className={styles.seal} aria-hidden="true">
          <NavIcon id="certifications" className={styles.certificateIcon} />
        </span>
        <span className={styles.triggerCopy}>
          <span>{copy.triggerEyebrow}</span>
          <strong>{copy.triggerTitle}</strong>
          <small>{copy.triggerAction}</small>
        </span>
        <span className={styles.arrow} aria-hidden="true">
          {locale === "ar" ? "←" : "→"}
        </span>
      </button>

      {isOpen && (
        <CertificateDialog
          locale={locale}
          copy={copy}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
