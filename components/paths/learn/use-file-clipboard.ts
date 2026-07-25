"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "learn-clipboard";
const TOAST_DURATION = 2000;

export interface ClipboardData {
  fileId: string;
  folderId: string;
}

export function getCopiedFile(): ClipboardData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as ClipboardData;
    if (typeof data.fileId === "string" && typeof data.folderId === "string") {
      return data;
    }
    return null;
  } catch {
    return null;
  }
}

export function copyFileToClipboard(fileId: string, folderId: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ fileId, folderId }));
}

export function clearClipboard(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STORAGE_KEY);
}

export function useFileClipboard() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copyFile = useCallback((fileId: string, folderId: string) => {
    copyFileToClipboard(fileId, folderId);
    if (timerRef.current) clearTimeout(timerRef.current);
    setCopiedId(fileId);
    timerRef.current = setTimeout(() => setCopiedId(null), TOAST_DURATION);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { copiedId, copyFile, getCopiedFile, clearClipboard };
}
