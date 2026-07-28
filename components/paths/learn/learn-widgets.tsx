"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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

interface WidgetPosition {
  x: number;
  y: number;
}

interface WidgetBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

const WIDGET_POSITION_KEY = "learn-widget-position";
const DEFAULT_WIDGET_POSITION = { x: 0, y: 0 };

function readWidgetPosition(): WidgetPosition {
  try {
    const stored = localStorage.getItem(WIDGET_POSITION_KEY);
    if (!stored) return DEFAULT_WIDGET_POSITION;
    const parsed = JSON.parse(stored) as Partial<WidgetPosition>;
    if (typeof parsed.x === "number" && typeof parsed.y === "number") {
      return { x: parsed.x, y: parsed.y };
    }
  } catch (error) {
    if (error instanceof DOMException || error instanceof SyntaxError) {
      return DEFAULT_WIDGET_POSITION;
    }
    throw error;
  }
  return DEFAULT_WIDGET_POSITION;
}

function getWidgetBounds(
  container: HTMLDivElement,
  position: WidgetPosition,
): WidgetBounds | null {
  const parent = container.parentElement;
  if (!parent) return null;
  const rect = container.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();
  return {
    minX: position.x + parentRect.left - rect.left,
    maxX: position.x + parentRect.right - rect.right,
    minY: position.y + parentRect.top - rect.top,
    maxY: position.y + parentRect.bottom - rect.bottom,
  };
}

export function LearnWidgets({
  locale,
  onOpenFolder,
  onOpenFile,
  learnNodeMap,
}: LearnWidgetsProps) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<WidgetPosition>(
    DEFAULT_WIDGET_POSITION,
  );
  const dragRef = useRef<{
    pointerId: number;
    originX: number;
    originY: number;
    startX: number;
    startY: number;
    bounds: WidgetBounds;
  } | null>(null);

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- local preference is restored before paint
    setPosition(readWidgetPosition());
  }, []);

  const persistPosition = useCallback((next: WidgetPosition) => {
    try {
      localStorage.setItem(WIDGET_POSITION_KEY, JSON.stringify(next));
    } catch (error) {
      if (!(error instanceof DOMException)) throw error;
    }
  }, []);

  const clampPosition = useCallback(
    (next: WidgetPosition, bounds = dragRef.current?.bounds) => {
      if (!bounds) return next;
      return {
        x: Math.min(bounds.maxX, Math.max(bounds.minX, next.x)),
        y: Math.min(bounds.maxY, Math.max(bounds.minY, next.y)),
      };
    },
    [],
  );

  const handleDragStart = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      if (event.button !== 0) return;
      const container = containerRef.current;
      if (!container) return;

      const bounds = getWidgetBounds(container, position);
      if (!bounds) return;
      dragRef.current = {
        pointerId: event.pointerId,
        originX: event.clientX,
        originY: event.clientY,
        startX: position.x,
        startY: position.y,
        bounds,
      };
      event.currentTarget.setPointerCapture(event.pointerId);
      container.dataset.dragging = "true";
    },
    [position],
  );

  const handleDragMove = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;
      setPosition(
        clampPosition({
          x: drag.startX + event.clientX - drag.originX,
          y: drag.startY + event.clientY - drag.originY,
        }),
      );
    },
    [clampPosition],
  );

  const handleDragEnd = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;
      const next = clampPosition({
        x: drag.startX + event.clientX - drag.originX,
        y: drag.startY + event.clientY - drag.originY,
      });
      dragRef.current = null;
      containerRef.current?.removeAttribute("data-dragging");
      setPosition(next);
      persistPosition(next);
    },
    [clampPosition, persistPosition],
  );

  const handleDragCancel = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      if (dragRef.current?.pointerId !== event.pointerId) return;
      dragRef.current = null;
      containerRef.current?.removeAttribute("data-dragging");
    },
    [],
  );

  const handleDragKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      const direction = {
        ArrowLeft: { x: -12, y: 0 },
        ArrowRight: { x: 12, y: 0 },
        ArrowUp: { x: 0, y: -12 },
        ArrowDown: { x: 0, y: 12 },
      }[event.key];
      if (!direction && event.key !== "Home") return;
      event.preventDefault();
      const next =
        event.key === "Home"
          ? { x: 0, y: 0 }
          : { x: position.x + direction!.x, y: position.y + direction!.y };
      const container = containerRef.current;
      if (!container) return;
      const bounds = getWidgetBounds(container, position);
      if (!bounds) return;
      const constrained = clampPosition(next, bounds);
      setPosition(constrained);
      persistPosition(constrained);
    },
    [clampPosition, persistPosition, position],
  );

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
        const cards = containerRef.current?.querySelectorAll(
          `.${styles.widgetCard}`,
        );
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
    <div
      ref={containerRef}
      className={styles.learnWidgets}
      aria-label="Widgets"
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
    >
      <button
        type="button"
        className={styles.learnWidgetsDragHandle}
        aria-label={
          locale === "ar"
            ? "نقل الأدوات. استخدم مفاتيح الأسهم أو اسحب."
            : "Move widgets. Use arrow keys or drag."
        }
        title={locale === "ar" ? "نقل الأدوات" : "Move widgets"}
        onPointerDown={handleDragStart}
        onPointerMove={handleDragMove}
        onPointerUp={handleDragEnd}
        onPointerCancel={handleDragCancel}
        onKeyDown={handleDragKeyDown}
      >
        <span aria-hidden="true">⠿</span>
      </button>
      {heroWidget?.kind === "hero" && (
        <WidgetHero widget={heroWidget} onOpen={handleOpen} />
      )}
      {featuredWidget?.kind === "featured" && (
        <WidgetFeatured widget={featuredWidget} onOpen={handleOpen} />
      )}
    </div>
  );
}
