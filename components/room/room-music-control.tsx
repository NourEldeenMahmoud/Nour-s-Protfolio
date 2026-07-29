"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ChangeEvent,
} from "react";
import styles from "./room-music-control.module.css";

const DEFAULT_VOLUME = 0.28;

export type RoomMusicCopy = {
  label: string;
  track: string;
  play: string;
  pause: string;
  mute: string;
  unmute: string;
  volume: string;
  openControls: string;
  closeControls: string;
  error: string;
};

function MusicIcon({ playing }: { playing: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 18V6l10-2v12" fill="none" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="16.5" cy="16" r="2.5" />
      {playing && (
        <circle className={styles.musicPulse} cx="12" cy="12" r="10" />
      )}
    </svg>
  );
}

function PlayIcon({ playing }: { playing: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {playing ? (
        <path d="M7 5h4v14H7zm6 0h4v14h-4z" />
      ) : (
        <path d="m8 5 11 7-11 7z" />
      )}
    </svg>
  );
}

function SpeakerIcon({ muted }: { muted: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 9v6h4l5 4V5L8 9H4z" />
      {muted ? (
        <path d="m17 9 4 6m0-6-4 6" fill="none" />
      ) : (
        <path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" />
      )}
    </svg>
  );
}

export function RoomMusicControl({ copy }: { copy: RoomMusicCopy }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = DEFAULT_VOLUME;

    function removeStartListeners() {
      document.removeEventListener("pointerdown", startOnInteraction);
      document.removeEventListener("keydown", startOnInteraction);
    }

    function startOnInteraction() {
      removeStartListeners();
      const currentAudio = audioRef.current;
      if (currentAudio) {
        void currentAudio.play().catch(() => setHasError(true));
      }
    }

    void audio.play().catch(() => {
      document.addEventListener("pointerdown", startOnInteraction, {
        once: true,
      });
      document.addEventListener("keydown", startOnInteraction, { once: true });
    });

    return removeStartListeners;
  }, []);

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
    const nextMuted = !isMuted;
    audio.muted = nextMuted;
    setIsMuted(nextMuted);
  }

  function changeVolume(event: ChangeEvent<HTMLInputElement>) {
    const nextVolume = Number(event.currentTarget.value);
    if (audioRef.current) audioRef.current.volume = nextVolume;
    setVolume(nextVolume);
  }

  return (
    <div
      className={styles.control}
      data-playing={isPlaying || undefined}
      data-expanded={isExpanded || undefined}
      role="group"
      aria-label={copy.label}
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

      <button
        type="button"
        className={styles.launcher}
        aria-label={isExpanded ? copy.closeControls : copy.openControls}
        aria-expanded={isExpanded}
        aria-controls="room-music-panel"
        onClick={() => setIsExpanded((expanded) => !expanded)}
      >
        <MusicIcon playing={isPlaying && !isMuted} />
      </button>

      <div id="room-music-panel" className={styles.panel} hidden={!isExpanded}>
        <button
          type="button"
          className={styles.iconButton}
          aria-label={isPlaying ? copy.pause : copy.play}
          onClick={togglePlayback}
        >
          <PlayIcon playing={isPlaying} />
        </button>

        <span className={styles.track} aria-hidden="true">
          <span className={styles.equalizer}>
            <i />
            <i />
            <i />
          </span>
          <span>{copy.track}</span>
        </span>

        <button
          type="button"
          className={styles.iconButton}
          aria-label={isMuted ? copy.unmute : copy.mute}
          aria-pressed={isMuted}
          onClick={toggleMute}
        >
          <SpeakerIcon muted={isMuted} />
        </button>

        <label
          className={styles.volume}
          style={{ "--volume-level": `${volume * 100}%` } as CSSProperties}
        >
          <span className="sr-only">{copy.volume}</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            aria-label={copy.volume}
            onChange={changeVolume}
          />
        </label>
      </div>

      {hasError && (
        <span className="sr-only" role="status">
          {copy.error}
        </span>
      )}
    </div>
  );
}
