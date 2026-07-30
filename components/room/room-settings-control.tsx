"use client";

import {
  useEffect,
  useState,
  type CSSProperties,
  type ChangeEvent,
} from "react";
import { useRoomMusic } from "@/components/providers/room-music-provider";
import type { MotionPreference } from "@/components/providers/motion-provider";
import { useMotionPreference } from "@/hooks/use-motion-preference";
import styles from "./room-settings-control.module.css";

export type RoomMusicCopy = {
  label: string;
  track: string;
  play: string;
  pause: string;
  mute: string;
  unmute: string;
  volume: string;
  error: string;
};

export type RoomSettingsCopy = {
  label: string;
  openControls: string;
  closeControls: string;
  motionLabel: string;
  motionDescription: string;
  motionSystem: string;
  motionFull: string;
  motionReduced: string;
};

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M9.6 3.4 10 2h4l.4 1.4a8.8 8.8 0 0 1 1.6.7l1.3-.7 2.8 2.8-.7 1.3c.3.5.5 1 .7 1.6l1.4.4v4l-1.4.4a8.8 8.8 0 0 1-.7 1.6l.7 1.3-2.8 2.8-1.3-.7a8.8 8.8 0 0 1-1.6.7L14 22h-4l-.4-1.4a8.8 8.8 0 0 1-1.6-.7l-1.3.7-2.8-2.8.7-1.3a8.8 8.8 0 0 1-.7-1.6L2.5 14v-4l1.4-.4a8.8 8.8 0 0 1 .7-1.6l-.7-1.3 2.8-2.8 1.3.7c.5-.3 1-.5 1.6-.7Z"
        fill="none"
      />
      <circle cx="12" cy="12" r="3.1" fill="none" />
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

const motionOptions: Array<{
  value: MotionPreference;
  label: keyof Pick<
    RoomSettingsCopy,
    "motionSystem" | "motionFull" | "motionReduced"
  >;
}> = [
  { value: "system", label: "motionSystem" },
  { value: "full", label: "motionFull" },
  { value: "reduced", label: "motionReduced" },
];

export function RoomSettingsControl({
  settingsCopy,
  musicCopy,
}: {
  settingsCopy: RoomSettingsCopy;
  musicCopy: RoomMusicCopy;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { preference, setPreference } = useMotionPreference();
  const {
    isPlaying,
    isMuted,
    volume,
    hasError,
    activate,
    togglePlayback,
    toggleMute,
    setVolume,
  } = useRoomMusic();

  useEffect(() => {
    activate();
  }, [activate]);

  function changeVolume(event: ChangeEvent<HTMLInputElement>) {
    setVolume(Number(event.currentTarget.value));
  }

  return (
    <div
      className={styles.control}
      data-playing={isPlaying || undefined}
      data-expanded={isExpanded || undefined}
      role="group"
      aria-label={settingsCopy.label}
    >
      <button
        type="button"
        className={styles.launcher}
        aria-label={
          isExpanded ? settingsCopy.closeControls : settingsCopy.openControls
        }
        aria-expanded={isExpanded}
        aria-controls="room-settings-panel"
        onClick={() => setIsExpanded((expanded) => !expanded)}
      >
        <SettingsIcon />
        {isPlaying && !isMuted && (
          <span className={styles.playingIndicator} aria-hidden="true" />
        )}
      </button>

      <div
        id="room-settings-panel"
        className={styles.panel}
        hidden={!isExpanded}
      >
        <fieldset className={styles.motionFieldset}>
          <legend>{settingsCopy.motionLabel}</legend>
          <p>{settingsCopy.motionDescription}</p>
          <div className={styles.motionOptions}>
            {motionOptions.map((option) => (
              <label key={option.value}>
                <input
                  type="radio"
                  name="room-motion-preference"
                  value={option.value}
                  checked={preference === option.value}
                  onChange={() => setPreference(option.value)}
                />
                <span>{settingsCopy[option.label]}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div
          className={styles.audioSection}
          role="group"
          aria-label={musicCopy.label}
        >
          <span className={styles.sectionLabel}>{musicCopy.label}</span>
          <div className={styles.audioControls}>
            <button
              type="button"
              className={styles.iconButton}
              aria-label={isPlaying ? musicCopy.pause : musicCopy.play}
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
              <span>{musicCopy.track}</span>
            </span>

            <button
              type="button"
              className={styles.iconButton}
              aria-label={isMuted ? musicCopy.unmute : musicCopy.mute}
              aria-pressed={isMuted}
              onClick={toggleMute}
            >
              <SpeakerIcon muted={isMuted} />
            </button>

            <label
              className={styles.volume}
              style={{ "--volume-level": `${volume * 100}%` } as CSSProperties}
            >
              <span className="sr-only">{musicCopy.volume}</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                aria-label={musicCopy.volume}
                onChange={changeVolume}
              />
            </label>
          </div>
        </div>
      </div>

      {hasError && (
        <span className="sr-only" role="status">
          {musicCopy.error}
        </span>
      )}
    </div>
  );
}
