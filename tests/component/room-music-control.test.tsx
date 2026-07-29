import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  RoomMusicControl,
  type RoomMusicCopy,
} from "@/components/room/room-music-control";

const copy: RoomMusicCopy = {
  label: "Room music controls",
  track: "Vastness",
  play: "Play room music",
  pause: "Pause room music",
  mute: "Mute room music",
  unmute: "Unmute room music",
  volume: "Room music volume",
  openControls: "Open room music controls",
  closeControls: "Close room music controls",
  error: "The room music could not be played.",
};

describe("RoomMusicControl", () => {
  beforeEach(() => {
    vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
  });

  afterEach(() => vi.restoreAllMocks());

  it("starts at low volume and reveals playback, mute, and volume controls", async () => {
    const user = userEvent.setup();
    const { container } = render(<RoomMusicControl copy={copy} />);
    const audio = container.querySelector("audio")!;

    expect(audio).toHaveAttribute("src", "/audio/vastness.mp3");
    expect(audio).toHaveAttribute("preload", "none");
    expect(audio).toHaveProperty("volume", 0.28);
    await waitFor(() => expect(audio.play).toHaveBeenCalledOnce());
    fireEvent.play(audio);

    expect(
      screen.queryByRole("button", { name: copy.pause }),
    ).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: copy.openControls }));
    expect(
      screen.getByRole("button", { name: copy.closeControls }),
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
});
