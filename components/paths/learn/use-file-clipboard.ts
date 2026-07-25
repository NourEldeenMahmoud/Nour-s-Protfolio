"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "learn-clipboard";
const TOAST_DURATION = 2000;

export interface ClipboardData {
  fileId: string;
  folderId: string;
}

function safeGetClipboard(): ClipboardData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (
      typeof data !== "object" || data === null ||
      typeof data.fileId !== "string" || !data.fileId ||
      typeof data.folderId !== "string" || !data.folderId
    ) return null;
    return data;
  } catch {
    return null;
  }
}

export function getCopiedFile(): ClipboardData | null {
  return safeGetClipboard();
}

export function copyFileToClipboard(fileId: string, folderId: string): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ fileId, folderId }));
  } catch {
    // storage full or unavailable
  }
}

export function clearClipboard(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
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
