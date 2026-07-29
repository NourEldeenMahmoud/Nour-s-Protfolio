"use client";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "2rem",
          background: "#0b1014",
          color: "#f1eadc",
          fontFamily: "sans-serif",
        }}
      >
        <main style={{ maxWidth: "42rem" }}>
          <p>PORTFOLIO / RECOVERY</p>
          <h1>The portfolio could not finish loading.</h1>
          <p>
            Retry the experience. If the problem continues, reload the page.
          </p>
          <button type="button" onClick={reset}>
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
