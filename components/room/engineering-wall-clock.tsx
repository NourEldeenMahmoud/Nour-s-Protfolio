"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import type { Locale } from "@/i18n/routing";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  sourceToViewport,
  type Anchor,
  type ViewportAnchor,
} from "./category-icon-projections";
import styles from "./engineering-wall-clock.module.css";

const CAIRO_TIME_ZONE = "Africa/Cairo";
const CLOCK_ANCHOR: Anchor = { cx: 0.848, by: 0.333, h: 0.095 };
const clockTicks = Array.from({ length: 12 }, (_, index) => index * 30);

const cairoPartsFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: CAIRO_TIME_ZONE,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

export type EngineeringWallClockCopy = {
  label: string;
  timezone: string;
};

export function getCairoClockAngles(date: Date) {
  const parts = Object.fromEntries(
    cairoPartsFormatter
      .formatToParts(date)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, Number(part.value)]),
  );
  const hour = parts.hour ?? 0;
  const minute = parts.minute ?? 0;
  const second = parts.second ?? 0;

  return {
    hour: ((hour % 12) + minute / 60 + second / 3600) * 30,
    minute: (minute + second / 60) * 6,
    second: second * 6,
  };
}

export function EngineeringWallClock({
  locale,
  copy,
  active,
}: {
  locale: Locale;
  copy: EngineeringWallClockCopy;
  active: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const [now, setNow] = useState<Date | null>(null);
  const [position, setPosition] = useState<ViewportAnchor | null>(null);
  const timeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-GB", {
        timeZone: CAIRO_TIME_ZONE,
        hour: "2-digit",
        minute: "2-digit",
        second: reducedMotion ? undefined : "2-digit",
      }),
    [locale, reducedMotion],
  );

  useEffect(() => {
    function projectClock() {
      setPosition(
        sourceToViewport(CLOCK_ANCHOR, window.innerWidth, window.innerHeight),
      );
    }

    projectClock();
    window.addEventListener("resize", projectClock);
    return () => window.removeEventListener("resize", projectClock);
  }, []);

  useEffect(() => {
    if (!active) return;

    function updateClock() {
      setNow(new Date());
    }

    updateClock();
    const interval = window.setInterval(
      updateClock,
      reducedMotion ? 60_000 : 1_000,
    );
    return () => window.clearInterval(interval);
  }, [active, reducedMotion]);

  if (!now || !position) return null;

  const angles = getCairoClockAngles(now);
  const clockStyle = {
    "--clock-x": `${position.px}px`,
    "--clock-y": `${position.pb}px`,
    "--clock-size": `${position.ph}px`,
  } as CSSProperties;
  return (
    <div
      className={styles.clock}
      data-active={active || undefined}
      style={clockStyle}
    >
      <time
        dateTime={now.toISOString()}
        aria-label={`${copy.label}: ${timeFormatter.format(now)}`}
      >
        <svg viewBox="0 0 220 258" role="presentation">
          <defs>
            <radialGradient id="clock-face" cx="42%" cy="34%" r="72%">
              <stop offset="0" stopColor="#182833" />
              <stop offset="0.72" stopColor="#0b141c" />
              <stop offset="1" stopColor="#060b10" />
            </radialGradient>
            <linearGradient id="clock-brass" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f0c77f" />
              <stop offset="0.45" stopColor="#9e6d30" />
              <stop offset="1" stopColor="#e5b45f" />
            </linearGradient>
          </defs>

          <path className={styles.wallMount} d="M78 13h64l10 14H68Z" />
          <circle className={styles.outerRim} cx="110" cy="111" r="96" />
          <circle className={styles.innerRim} cx="110" cy="111" r="87" />
          <circle className={styles.face} cx="110" cy="111" r="79" />

          <g className={styles.ticks}>
            {clockTicks.map((rotation, index) => (
              <line
                key={rotation}
                x1="110"
                y1="39"
                x2="110"
                y2={index % 3 === 0 ? "49" : "45"}
                transform={`rotate(${rotation} 110 111)`}
              />
            ))}
          </g>

          <text className={styles.brand} x="110" y="79">
            ENGINEERING
          </text>
          <text className={styles.zone} x="110" y="153">
            {copy.timezone}
          </text>

          <g
            className={styles.hourHand}
            transform={`rotate(${angles.hour} 110 111)`}
          >
            <line x1="110" y1="116" x2="110" y2="73" />
          </g>
          <g
            className={styles.minuteHand}
            transform={`rotate(${angles.minute} 110 111)`}
          >
            <line x1="110" y1="119" x2="110" y2="56" />
          </g>
          <g
            className={styles.secondHand}
            transform={`rotate(${angles.second} 110 111)`}
          >
            <line x1="110" y1="135" x2="110" y2="42" />
          </g>
          <circle className={styles.pin} cx="110" cy="111" r="6" />

          <path className={styles.mechanismBridge} d="M85 199h50l9 38H76Z" />
          <g className={styles.gear}>
            <circle cx="110" cy="220" r="22" />
            <circle cx="110" cy="220" r="13" />
            <path d="M110 198v44M88 220h44M94.5 204.5l31 31M125.5 204.5l-31 31" />
          </g>
          <circle className={styles.gearPin} cx="110" cy="220" r="4" />
        </svg>
      </time>
    </div>
  );
}
