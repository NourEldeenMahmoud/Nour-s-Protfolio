"use client";

import { forwardRef, type ReactNode } from "react";
import styles from "./learn.module.css";

interface WidgetCardProps {
  variant: "hero" | "featured";
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  role?: string;
  tabIndex?: number;
  "aria-label"?: string;
}

export const WidgetCard = forwardRef<HTMLDivElement, WidgetCardProps>(
  function WidgetCard(
    { variant, className = "", children, onClick, onKeyDown, onMouseEnter, onMouseLeave, onFocus, onBlur, ...rest },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={`${styles.widgetCard} ${className}`}
        data-variant={variant}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
