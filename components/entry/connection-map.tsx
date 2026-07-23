import styles from "./entry.module.css";

export function ConnectionMap() {
  const lines = [
    "M80 55 C180 55 210 110 320 180",
    "M320 38 C320 100 320 110 320 180",
    "M560 55 C460 55 430 110 320 180",
    "M80 305 C180 305 210 250 320 180",
    "M320 322 C320 260 320 250 320 180",
    "M560 305 C460 305 430 250 320 180",
  ];

  return (
    <svg
      className={styles.connectionMap}
      viewBox="0 0 640 360"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {lines.map((path) => (
        <path key={path} data-connection pathLength="1" d={path} />
      ))}
    </svg>
  );
}
