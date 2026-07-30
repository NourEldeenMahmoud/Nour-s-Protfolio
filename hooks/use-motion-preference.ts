import { useContext } from "react";
import { MotionPreferenceContext } from "@/components/providers/motion-provider";

export function useMotionPreference() {
  const motion = useContext(MotionPreferenceContext);
  if (!motion) {
    throw new Error("useMotionPreference must be used within MotionProvider.");
  }
  return motion;
}
