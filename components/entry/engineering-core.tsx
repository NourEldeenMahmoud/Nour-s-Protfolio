import styles from "./entry.module.css";

export function EngineeringCore({ process }: { process: string[] }) {
  return (
    <div className={styles.coreAssembly} data-core aria-hidden="true">
      <svg className={styles.coreSvg} viewBox="0 0 320 320" role="presentation">
        <defs>
          <linearGradient id="core-metal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f0bd6a" />
            <stop offset="0.5" stopColor="#8f642d" />
            <stop offset="1" stopColor="#f1efe8" />
          </linearGradient>
        </defs>
        <g data-core-piece className={styles.coreOuter}>
          <path d="M160 18 283 89v142l-123 71L37 231V89Z" />
        </g>
        <g data-core-piece className={styles.coreMiddle}>
          <path d="m160 54 92 53v106l-92 53-92-53V107Z" />
          <circle cx="160" cy="160" r="82" />
        </g>
        <g data-core-piece className={styles.coreInner}>
          <path d="m160 100 52 30v60l-52 30-52-30v-60Z" />
          <circle cx="160" cy="160" r="13" />
        </g>
      </svg>
      <ol className={styles.processRing}>
        {process.map((step, index) => (
          <li
            key={step}
            data-process-step
            style={{ "--step": index } as React.CSSProperties}
          >
            <span>{String(index + 1).padStart(2, "0")}</span> {step}
          </li>
        ))}
      </ol>
    </div>
  );
}
