import { useContext } from "react";
import { MotionContext } from "@/components/providers/motion-provider";

export function useReducedMotion(): boolean {
  return useContext(MotionContext);
}
