"use client";

import { useEffect } from "react";
import { SystemStatus } from "@/components/system/system-status";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <SystemStatus kind="error" retry={reset} />;
}
