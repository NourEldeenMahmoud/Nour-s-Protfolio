"use client";

import Link from "next/link";
import { useEffectEvent, useLayoutEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/routing";
import { ConnectionMap } from "./connection-map";
import { EngineeringCore } from "./engineering-core";
import {
  getIntroEligibility,
  LONG_VISIBILITY_INTERRUPTION_MS,
  persistIntroSeen,
  readIntroSeen,
} from "./entry-state";
import styles from "./entry.module.css";

const pathOrder = ["hire", "watch", "learn"] as const;

type PathKey = (typeof pathOrder)[number] | "general";
type EntryCopy = {
  eyebrow: string;
  name: string;
  role: string;
  statement: string;
  selectorTitle: string;
  selectorHint: string;
  skip: string;
  replay: string;
  language: string;
  languageLabel: string;
  statusPlaying: string;
  statusReady: string;
  signals: string[];
  process: string[];
  paths: Record<PathKey, { label: string; description: string }>;
};

export function EntryExperience({
  locale,
  copy,
}: {
  locale: Locale;
  copy: EntryCopy;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const selectorHeadingRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const contextRef = useRef<gsap.Context | null>(null);
  const visibilityCleanupRef = useRef<(() => void) | null>(null);
  const [run, setRun] = useState(0);
  const [isSelectorReady, setIsSelectorReady] = useState(false);
  const [status, setStatus] = useState(copy.statusReady);

  function clearTimeline() {
    visibilityCleanupRef.current?.();
    visibilityCleanupRef.current = null;
    timelineRef.current?.kill();
    timelineRef.current = null;
    contextRef.current?.revert();
    contextRef.current = null;
  }

  function completeIntro() {
    clearTimeline();
    persistIntroSeen(window.localStorage);
    if (rootRef.current) rootRef.current.dataset.entryState = "selector";
    setIsSelectorReady(true);
    setStatus(copy.statusReady);
    requestAnimationFrame(() => selectorHeadingRef.current?.focus());
  }

  const completeIntroAfterEffect = useEffectEvent(completeIntro);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const seen = readIntroSeen(window.localStorage);
    const replayRequested =
      run > 0 || new URLSearchParams(window.location.search).has("replay");
    const eligibility = getIntroEligibility({
      isEntryRoute: true,
      reducedMotion,
      replayRequested,
      seen,
    });

    if (eligibility === "static") {
      root.dataset.entryState = "selector";
      const frame = requestAnimationFrame(() => {
        setIsSelectorReady(true);
        setStatus(copy.statusReady);
      });
      return () => cancelAnimationFrame(frame);
    }

    root.dataset.entryState = "playing";
    let cancelled = false;

    void import("gsap")
      .then(({ gsap }) => {
        if (cancelled) return;
        setStatus(copy.statusPlaying);
        const mobile = window.matchMedia("(max-width: 767px)").matches;
        const duration = mobile ? 3.2 : 5;
        const scale = duration / 5;

        contextRef.current = gsap.context(() => {
          const signals = gsap.utils.toArray<HTMLElement>("[data-signal]");
          const connections =
            gsap.utils.toArray<SVGPathElement>("[data-connection]");
          const corePieces =
            gsap.utils.toArray<SVGElement>("[data-core-piece]");
          const process = gsap.utils.toArray<HTMLElement>(
            "[data-process-step]",
          );
          const identity = gsap.utils.toArray<HTMLElement>("[data-identity]");
          const tracks = gsap.utils.toArray<HTMLElement>("[data-intent-track]");
          const selectorText = gsap.utils.toArray<HTMLElement>(
            "[data-selector-text]",
          );

          gsap.set(signals, { autoAlpha: 0, scale: 0.86 });
          gsap.set(connections, { strokeDashoffset: 1 });
          gsap.set(corePieces, { autoAlpha: 0, scale: 0.72, rotation: -8 });
          gsap.set(process, { autoAlpha: 0, y: 8 });
          gsap.set(identity, { autoAlpha: 0, y: 18 });
          gsap.set([...tracks, ...selectorText], { autoAlpha: 0, y: 20 });

          timelineRef.current = gsap
            .timeline({
              defaults: { ease: "power3.out" },
              onComplete: completeIntroAfterEffect,
            })
            .addLabel("signals", 0)
            .to(
              signals,
              {
                autoAlpha: 1,
                scale: 1,
                duration: 0.55 * scale,
                stagger: 0.055 * scale,
              },
              "signals",
            )
            .addLabel("pattern", 0.78 * scale)
            .to(
              connections,
              {
                strokeDashoffset: 0,
                duration: 1.15 * scale,
                stagger: 0.045 * scale,
                ease: "power2.inOut",
              },
              "pattern",
            )
            .to(
              process,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.4 * scale,
                stagger: 0.08 * scale,
              },
              1.25 * scale,
            )
            .addLabel("core", 1.88 * scale)
            .to(
              corePieces,
              {
                autoAlpha: 1,
                scale: 1,
                rotation: 0,
                transformOrigin: "50% 50%",
                duration: 0.85 * scale,
                stagger: 0.1 * scale,
                ease: "power3.inOut",
              },
              "core",
            )
            .addLabel("identity", 3.05 * scale)
            .to(
              identity,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.68 * scale,
                stagger: 0.08 * scale,
              },
              "identity",
            )
            .addLabel("intent", 3.92 * scale)
            .to(
              selectorText,
              { autoAlpha: 1, y: 0, duration: 0.42 * scale },
              "intent",
            )
            .to(
              tracks,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.62 * scale,
                stagger: 0.08 * scale,
              },
              `intent+=${0.12 * scale}`,
            )
            .to({}, { duration: 0.16 * scale });
        }, root);

        let hiddenAt: number | null = null;
        const onVisibilityChange = () => {
          const timeline = timelineRef.current;
          if (!timeline) return;
          if (document.hidden) {
            hiddenAt = Date.now();
            timeline.pause();
            return;
          }
          if (
            hiddenAt !== null &&
            Date.now() - hiddenAt >= LONG_VISIBILITY_INTERRUPTION_MS
          ) {
            completeIntroAfterEffect();
          } else {
            timeline.resume();
          }
          hiddenAt = null;
        };
        document.addEventListener("visibilitychange", onVisibilityChange);
        visibilityCleanupRef.current = () =>
          document.removeEventListener("visibilitychange", onVisibilityChange);
        if (document.hidden) onVisibilityChange();
      })
      .catch(() => {
        if (!cancelled) {
          root.dataset.entryState = "selector";
          setIsSelectorReady(true);
          setStatus(copy.statusReady);
        }
      });

    return () => {
      cancelled = true;
      clearTimeline();
    };
  }, [copy.statusPlaying, copy.statusReady, run]);

  function replayIntro() {
    clearTimeline();
    setIsSelectorReady(false);
    setStatus(copy.statusPlaying);
    setRun((value) => value + 1);
  }

  const alternateLocale = locale === "en" ? "ar" : "en";

  return (
    <main
      ref={rootRef}
      className={`relative min-h-svh overflow-hidden ${styles.entry}`}
      data-entry-state="selector"
    >
      <button className={styles.skip} type="button" onClick={completeIntro}>
        {copy.skip}
      </button>

      <header className={styles.topbar}>
        <p>{copy.eyebrow}</p>
        <Link
          href={`/${alternateLocale}`}
          hrefLang={alternateLocale}
          lang={alternateLocale}
          aria-label={copy.languageLabel}
        >
          {copy.language}
        </Link>
      </header>

      <section className={styles.scene} aria-labelledby="identity-title">
        <div className={styles.atmosphere} aria-hidden="true" />
        <ConnectionMap />

        <ul className={styles.signals} aria-hidden="true">
          {copy.signals.map((signal, index) => (
            <li key={signal} data-signal data-index={index + 1}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {signal}
            </li>
          ))}
        </ul>

        <EngineeringCore process={copy.process} />

        <div className={styles.identity} data-identity>
          <p>{copy.role}</p>
          <h1 id="identity-title">{copy.name}</h1>
          <p>{copy.statement}</p>
        </div>
      </section>

      <section
        className={styles.selector}
        aria-labelledby="intent-selector-title"
      >
        <div className={styles.selectorHeading} data-selector-text>
          <p>{copy.selectorHint}</p>
          <h2 id="intent-selector-title" ref={selectorHeadingRef} tabIndex={-1}>
            {copy.selectorTitle}
          </h2>
        </div>

        <nav
          className={styles.pathGrid}
          aria-labelledby="intent-selector-title"
        >
          {pathOrder.map((path, index) => (
            <Link
              key={path}
              className={styles.pathCard}
              href={`/${locale}/${path}`}
              data-intent-track
              data-path={path}
            >
              <span className={styles.pathNumber}>0{index + 1}</span>
              <strong>{copy.paths[path].label}</strong>
              <span>{copy.paths[path].description}</span>
              <span className={styles.pathArrow} aria-hidden="true">
                {locale === "ar" ? "↖" : "↗"}
              </span>
            </Link>
          ))}
        </nav>

        <Link
          className={styles.generalPath}
          href={`/${locale}/general`}
          data-intent-track
          data-path="general"
        >
          <span>04 / DEFAULT</span>
          <strong>{copy.paths.general.label}</strong>
          <span>{copy.paths.general.description}</span>
          <span aria-hidden="true">{locale === "ar" ? "←" : "→"}</span>
        </Link>

        <button
          className={styles.replay}
          type="button"
          onClick={replayIntro}
          hidden={!isSelectorReady}
        >
          {copy.replay}
        </button>
      </section>

      <p
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {status}
      </p>
    </main>
  );
}
