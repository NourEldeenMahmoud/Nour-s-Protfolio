import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  MotionPreferenceContext,
  type MotionPreference,
} from "@/components/providers/motion-provider";
import { RoomMusicProvider } from "@/components/providers/room-music-provider";
import {
  RoomSettingsControl,
  type RoomMusicCopy,
  type RoomSettingsCopy,
} from "@/components/room/room-settings-control";

const copy: RoomMusicCopy = {
  label: "Room music controls",
  track: "Vastness",
  play: "Play room music",
  pause: "Pause room music",
  mute: "Mute room music",
  unmute: "Unmute room music",
  volume: "Room music volume",
  error: "The room music could not be played.",
};

const settingsCopy: RoomSettingsCopy = {
  label: "Experience settings",
  openControls: "Open experience settings",
  closeControls: "Close experience settings",
  motionLabel: "Site motion",
  motionSystem: "System",
  motionFull: "Full",
  motionReduced: "Reduced",
};

function SettingsControl() {
  const [preference, setPreference] = useState<MotionPreference>("system");

  return (
    <MotionPreferenceContext.Provider value={{ preference, setPreference }}>
      <RoomMusicProvider>
        <RoomSettingsControl settingsCopy={settingsCopy} musicCopy={copy} />
      </RoomMusicProvider>
    </MotionPreferenceContext.Provider>
  );
}

function NavigationHarness() {
  const [showRoom, setShowRoom] = useState(true);
  const [preference, setPreference] = useState<MotionPreference>("system");
  return (
    <MotionPreferenceContext.Provider value={{ preference, setPreference }}>
      <RoomMusicProvider>
        <button type="button" onClick={() => setShowRoom(false)}>
          Open project
        </button>
        {showRoom ? (
          <RoomSettingsControl settingsCopy={settingsCopy} musicCopy={copy} />
        ) : (
          <main>Project page</main>
        )}
      </RoomMusicProvider>
    </MotionPreferenceContext.Provider>
  );
}

describe("RoomSettingsControl", () => {
  beforeEach(() => {
    vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
  });

  afterEach(() => vi.restoreAllMocks());

  it("starts at low volume and reveals playback, mute, and volume controls", async () => {
    const user = userEvent.setup();
    const { container } = render(<SettingsControl />);
    const audio = container.querySelector("audio")!;

    expect(audio).toHaveAttribute("src", "/audio/vastness.mp3");
    expect(audio).toHaveAttribute("preload", "none");
    expect(audio).toHaveProperty("volume", 0.2);
    await waitFor(() => expect(audio.play).toHaveBeenCalledOnce());
    fireEvent.play(audio);

    expect(
      screen.queryByRole("button", { name: copy.pause }),
    ).not.toBeInTheDocument();
    await user.click(
      screen.getByRole("button", { name: settingsCopy.openControls }),
    );
    expect(
      screen.getByRole("button", { name: settingsCopy.closeControls }),
    ).toHaveAttribute("aria-expanded", "true");

    await user.click(screen.getByRole("button", { name: copy.mute }));
    expect(audio).toHaveProperty("muted", true);
    expect(screen.getByRole("button", { name: copy.unmute })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    fireEvent.change(screen.getByRole("slider", { name: copy.volume }), {
      target: { value: "0.7" },
    });
    expect(audio).toHaveProperty("volume", 0.7);

    await user.click(screen.getByRole("button", { name: copy.pause }));
    expect(audio.pause).toHaveBeenCalledOnce();
  });

  it("offers keyboard-native System, Full, and Reduced motion choices", async () => {
    const user = userEvent.setup();
    render(<SettingsControl />);

    await user.click(
      screen.getByRole("button", { name: settingsCopy.openControls }),
    );

    const system = screen.getByRole("radio", {
      name: settingsCopy.motionSystem,
    });
    const full = screen.getByRole("radio", { name: settingsCopy.motionFull });
    const reduced = screen.getByRole("radio", {
      name: settingsCopy.motionReduced,
    });

    expect(system).toBeChecked();
    expect(full).not.toBeChecked();
    expect(reduced).not.toBeChecked();

    system.focus();
    await user.keyboard("{ArrowRight}");
    expect(full).toBeChecked();
    expect(system).not.toBeChecked();
  });

  it("keeps the same playing audio element mounted across page navigation", async () => {
    const user = userEvent.setup();
    const { container } = render(<NavigationHarness />);
    const audio = container.querySelector("audio")!;

    await waitFor(() => expect(audio.play).toHaveBeenCalledOnce());
    fireEvent.play(audio);
    await user.click(screen.getByRole("button", { name: "Open project" }));

    expect(screen.getByRole("main")).toHaveTextContent("Project page");
    expect(container.querySelector("audio")).toBe(audio);
    expect(audio.pause).not.toHaveBeenCalled();
  });
});
