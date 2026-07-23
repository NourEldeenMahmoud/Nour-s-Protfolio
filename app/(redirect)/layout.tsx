import type { ReactNode } from "react";
import "@/styles/globals.css";

export default function RedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
