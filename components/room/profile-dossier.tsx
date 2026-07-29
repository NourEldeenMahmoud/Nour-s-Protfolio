"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Locale } from "@/i18n/routing";
import styles from "./profile-dossier.module.css";

export type ProfileDossierCopy = {
  triggerEyebrow: string;
  triggerLabel: string;
  open: string;
  eyebrow: string;
  close: string;
  portraitAlt: string;
  fileNumber: string;
  title: string;
  role: string;
  location: string;
  graduation: string;
  intro: string;
  downloadCv: string;
  emailAction: string;
  navigation: string;
  aboutNav: string;
  cvNav: string;
  contactNav: string;
  focusLabel: string;
  focusValue: string;
  educationLabel: string;
  educationValue: string;
  locationLabel: string;
  aboutTitle: string;
  aboutBody: string;
  cvTitle: string;
  cvIntro: string;
  degreeLabel: string;
  degree: string;
  academy: string;
  trainingLabel: string;
  training: string;
  skillsTitle: string;
  skills: string[];
  evidenceTitle: string;
  evidenceBody: string;
  hiringView: string;
  caseStudies: string;
  contactEyebrow: string;
  contactTitle: string;
  contactBody: string;
  email: string;
  whatsapp: string;
  telegram: string;
  linkedin: string;
  github: string;
};

export function ProfileDossier({
  locale,
  copy,
  onClose,
}: {
  locale: Locale;
  copy: ProfileDossierCopy;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="profile-dossier-title"
      onCancel={(event) => {
        event.preventDefault();
        event.currentTarget.close();
      }}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      <article className={styles.dossier}>
        <header className={styles.header}>
          <div>
            <p>{copy.eyebrow}</p>
            <span>{copy.fileNumber}</span>
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

        <div className={styles.scrollArea}>
          <section className={styles.identity}>
            <div className={styles.portraitFrame}>
              <Image
                src="/profile/nour-eldeen.webp"
                alt={copy.portraitAlt}
                fill
                sizes="112px"
                priority
              />
              <span aria-hidden="true">ID / NE</span>
            </div>
            <div className={styles.identityCopy}>
              <p className={styles.status}>
                <span aria-hidden="true" />
                {copy.role}
              </p>
              <h2 id="profile-dossier-title">{copy.title}</h2>
              <div className={styles.identityMeta}>
                <span>{copy.location}</span>
                <span>{copy.graduation}</span>
              </div>
            </div>
            <p className={styles.intro}>{copy.intro}</p>
            <div className={styles.primaryActions}>
              <a
                className={styles.downloadAction}
                href="/learn/downloads/NourEldeen_CV.pdf"
                download
              >
                <span>{copy.downloadCv}</span>
                <span aria-hidden="true">↓ PDF</span>
              </a>
              <a
                className={styles.emailAction}
                href="mailto:noureldeendev@gmail.com"
              >
                {copy.emailAction}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </section>

          <nav className={styles.sectionNav} aria-label={copy.navigation}>
            <a href="#profile-about">
              <span>01</span>
              {copy.aboutNav}
            </a>
            <a href="#profile-cv">
              <span>02</span>
              {copy.cvNav}
            </a>
            <a href="#profile-contact">
              <span>03</span>
              {copy.contactNav}
            </a>
          </nav>

          <dl className={styles.quickFacts}>
            <div>
              <dt>{copy.focusLabel}</dt>
              <dd>{copy.focusValue}</dd>
            </div>
            <div>
              <dt>{copy.educationLabel}</dt>
              <dd>{copy.educationValue}</dd>
            </div>
            <div>
              <dt>{copy.locationLabel}</dt>
              <dd>{copy.location}</dd>
            </div>
          </dl>

          <section id="profile-about" className={styles.contentSection}>
            <p className={styles.sectionNumber}>01 / {copy.aboutNav}</p>
            <h3>{copy.aboutTitle}</h3>
            <p>{copy.aboutBody}</p>
          </section>

          <section
            id="profile-cv"
            className={`${styles.contentSection} ${styles.cvSection}`}
          >
            <p className={styles.sectionNumber}>02 / {copy.cvNav}</p>
            <h3>{copy.cvTitle}</h3>
            <p>{copy.cvIntro}</p>

            <div className={styles.timeline}>
              <article>
                <span>{copy.degreeLabel}</span>
                <h4>{copy.degree}</h4>
                <p>{copy.academy}</p>
                <small>{copy.graduation}</small>
              </article>
              <article>
                <span>{copy.trainingLabel}</span>
                <h4>{copy.training}</h4>
              </article>
            </div>

            <div className={styles.skills}>
              <h4>{copy.skillsTitle}</h4>
              <ul aria-label={copy.skillsTitle}>
                {copy.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>

            <aside className={styles.evidence}>
              <p>{copy.evidenceTitle}</p>
              <span>{copy.evidenceBody}</span>
              <div>
                <Link href={`/${locale}?focus=projects`}>
                  {copy.hiringView}
                  <span aria-hidden="true">{locale === "ar" ? "←" : "→"}</span>
                </Link>
                <Link href={`/${locale}?focus=exploration`}>
                  {copy.caseStudies}
                  <span aria-hidden="true">{locale === "ar" ? "←" : "→"}</span>
                </Link>
              </div>
            </aside>
          </section>

          <section id="profile-contact" className={styles.contactSection}>
            <p>{copy.contactEyebrow}</p>
            <h3>{copy.contactTitle}</h3>
            <span>{copy.contactBody}</span>
            <div className={styles.contactLinks}>
              <a href="mailto:noureldeendev@gmail.com">{copy.email}</a>
              <a
                href="https://wa.me/201556335858"
                target="_blank"
                rel="noreferrer"
              >
                {copy.whatsapp} <span aria-hidden="true">↗</span>
              </a>
              <a
                href="https://t.me/DevNourEldeen"
                target="_blank"
                rel="noreferrer"
              >
                {copy.telegram} <span aria-hidden="true">↗</span>
              </a>
              <a
                href="https://linkedin.com/in/nour-eldeen-eg"
                target="_blank"
                rel="noreferrer"
              >
                {copy.linkedin} <span aria-hidden="true">↗</span>
              </a>
              <a
                href="https://github.com/NourEldeenMahmoud"
                target="_blank"
                rel="noreferrer"
              >
                {copy.github} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </section>
        </div>
      </article>
    </dialog>
  );
}
