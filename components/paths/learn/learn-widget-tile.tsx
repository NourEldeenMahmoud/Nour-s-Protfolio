"use client";

import styles from "./learn.module.css";

interface LearnWidgetTileProps {
  label: string;
  value: string;
}

export function LearnWidgetTile({ label, value }: LearnWidgetTileProps) {
  return (
    <div className={styles.widgetTile}>
      <span className={styles.widgetTileLabel}>{label}</span>
      <span className={styles.widgetTileValue}>{value}</span>
    </div>
  );
}
