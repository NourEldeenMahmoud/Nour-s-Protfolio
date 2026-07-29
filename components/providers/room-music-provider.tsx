"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const DEFAULT_VOLUME = 0.2;

type RoomMusicState = {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  hasError: boolean;
  activate: () => void;
  togglePlayback: () => void;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
};

const RoomMusicContext = createContext<RoomMusicState | null>(null);

export function useRoomMusic() {
  const music = useContext(RoomMusicContext);
  if (!music)
    throw new Error("useRoomMusic must be used within RoomMusicProvider.");
  return music;
}

export function RoomMusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const activatedRef = useRef(false);
  const startCleanupRef = useRef<(() => void) | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(DEFAULT_VOLUME);
  const [hasError, setHasError] = useState(false);

  const activate = useCallback(() => {
    if (activatedRef.current) return;
    activatedRef.current = true;
    const currentAudio = audioRef.current;
    if (!currentAudio) return;
    currentAudio.volume = DEFAULT_VOLUME;

    function removeStartListeners() {
      document.removeEventListener("pointerdown", startOnInteraction);
      document.removeEventListener("keydown", startOnInteraction);
      startCleanupRef.current = null;
    }

    function startOnInteraction() {
      removeStartListeners();
      const audio = audioRef.current;
      if (audio) void audio.play().catch(() => setHasError(true));
    }

    void currentAudio.play().catch(() => {
      startCleanupRef.current = removeStartListeners;
      document.addEventListener("pointerdown", startOnInteraction, {
        once: true,
      });
      document.addEventListener("keydown", startOnInteraction, { once: true });
    });
  }, []);

  useEffect(() => () => startCleanupRef.current?.(), []);

  function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      return;
    }

    setHasError(false);
    void audio.play().catch(() => setHasError(true));
  }

  function toggleMute() {
    const audio = audioRef.current;
    if (!audio) return;
    const nextMuted = !audio.muted;
    audio.muted = nextMuted;
    setIsMuted(nextMuted);
  }

  function updateVolume(nextVolume: number) {
    if (audioRef.current) audioRef.current.volume = nextVolume;
    setVolumeState(nextVolume);
  }

  return (
    <RoomMusicContext.Provider
      value={{
        isPlaying,
        isMuted,
        volume,
        hasError,
        activate,
        togglePlayback,
        toggleMute,
        setVolume: updateVolume,
      }}
    >
      <audio
        ref={audioRef}
        src="/audio/vastness.mp3"
        preload="none"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => setHasError(true)}
      />
      {children}
    </RoomMusicContext.Provider>
  );
}
