"use client";

import {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { CategoryId } from "@/content/project-showcase";
import type { ViewportAnchor } from "./category-icon-projections";
import { CATEGORY_IDS } from "./category-icon-projections";

/* ── Constants ── */

const MODEL_SCALE = 0.71; // ~6.6% further front-face reduction
const DEPTH_SCALE = 3.0; // depth-axis extrusion — side faces clearly readable
const BASE_Y_OFFSET = -7; // px — hover just above baked pedestal rings
const FOCUS_DURATION = 1.1;
const FLOAT_AMPLITUDE = 6; // 4–8 px idle float range
const ROT_AMPLITUDE = 0.05; // subtle continuous Y sway (~2.9°)
const HOVER_LIFT = 8; // 6–9 px range
const HOVER_SCALE = 1.05;
const ACTIVE_SCALE = 1.06;
const TILT_X = 0.12;
const EXPLORE_TILT_X = 0.04;

/** Per-icon yaw in radians — hero state, converging inward ±6° at edges. */
const HERO_YAW: Record<CategoryId, number> = {
  web: 0.105,
  "game-development": 0.052,
  desktop: 0,
  "mobile-applications": -0.052,
  bots: -0.105,
};

/** Per-icon yaw in radians — explore state, subtler ±3.5° at edges. */
const EXPLORE_YAW: Record<CategoryId, number> = {
  web: 0.061,
  "game-development": 0.03,
  desktop: 0,
  "mobile-applications": -0.03,
  bots: -0.061,
};

/* ── Types ── */

export type CategoryIconsCanvasProps = {
  viewportWidth: number;
  viewportHeight: number;
  heroAnchors: Record<CategoryId, ViewportAnchor>;
  exploreAnchors: Record<CategoryId, ViewportAnchor>;
  /** 0 = hero, 1 = explore. The canvas internally GSAP-tweens toward this. */
  focusTarget: 0 | 1;
  activeCategoryId: CategoryId;
  hoveredCategoryId?: CategoryId | null;
  /** When true, all GSAP tweens are skipped — models snap to final positions/static styling. */
  reducedMotion?: boolean;
};

/* ── Per-icon animated state (mutated by GSAP) ── */

type IconAnimState = {
  floatY: number;
  floatRotY: number;
  hoverLift: number;
  hoverScale: number;
  hoverFacing: number; // yaw offset to face toward viewer when hovered
  activeScale: number;
  emissiveIntensity: number;
  roughness: number;
};

function createAnimStates(): Record<CategoryId, IconAnimState> {
  const s = {} as Record<CategoryId, IconAnimState>;
  for (const id of CATEGORY_IDS) {
    s[id] = {
      floatY: 0,
      floatRotY: 0,
      hoverLift: 0,
      hoverScale: 1,
      hoverFacing: 0,
      activeScale: 1,
      emissiveIntensity: 0.012,
      roughness: 0.48,
    };
  }
  return s;
}

/* ── Error class for GLB load failures ── */

class IconLoadError extends Error {
  constructor(categoryId: string) {
    super(`Failed to load GLB icon: ${categoryId}`);
    this.name = "IconLoadError";
  }
}

/* ── Single icon mesh ── */

function IconMesh({
  categoryId,
  heroAnchor,
  exploreAnchor,
  focusProgressRef,
  animState,
  invalidate,
  onLoadError,
}: {
  categoryId: CategoryId;
  heroAnchor: ViewportAnchor;
  exploreAnchor: ViewportAnchor;
  focusProgressRef: React.RefObject<number>;
  animState: IconAnimState;
  invalidate: () => void;
  onLoadError: (id: CategoryId) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const loadedRef = useRef(false);
  const [loadFailed, setLoadFailed] = useState(false);

  const loader = useMemo(() => new GLTFLoader(), []);

  /* ── Load GLB, clone hierarchy, clone material per mesh ── */
  useEffect(() => {
    if (loadedRef.current || loadFailed) return;

    const url = `/models/showcase-icons/${categoryId}.glb`;
    let disposed = false;

    loader.load(
      url,
      (gltf) => {
        if (disposed || loadedRef.current) return;
        loadedRef.current = true;

        // Deep clone scene hierarchy (shares geometry refs, which is safe)
        const cloned = gltf.scene.clone(true);

        // Clone material per mesh so each icon owns its own instance,
        // then apply dark room-matched metal treatment
        cloned.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const srcMat = child.material as THREE.Material;
            const mat = srcMat.clone();
            child.material = mat;
            child.castShadow = false;
            child.receiveShadow = false;

            // Dark painted-metal / blue-black finish that responds to lighting
            if (mat instanceof THREE.MeshStandardMaterial) {
              mat.color.multiplyScalar(0.55);
              mat.metalness = 0.52;
              mat.roughness = 0.48;
              mat.emissive.set(0x0a0f18);
              mat.emissiveIntensity = 0.012;
            }

            // Store the first mesh material for GSAP emphasis tweens
            if (
              !materialRef.current &&
              mat instanceof THREE.MeshStandardMaterial
            ) {
              materialRef.current = mat;
            }
          }
        });

        modelRef.current = cloned;
        groupRef.current?.add(cloned);
        invalidate();
      },
      undefined,
      () => {
        if (!disposed) {
          setLoadFailed(true);
          onLoadError(categoryId);
        }
      },
    );

    return () => {
      disposed = true;
    };
  }, [categoryId, loader, invalidate, loadFailed, onLoadError]);

  /* ── Dispose cloned materials on unmount (not shared geometry) ── */
  useEffect(() => {
    const model = modelRef.current;
    return () => {
      if (model) {
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material.dispose();
          }
        });
        modelRef.current = null;
      }
    };
  }, []);

  /* ── Render error for error boundary ── */
  if (loadFailed) throw new IconLoadError(categoryId);

  /* ── Apply transforms from refs (driven by GSAP tweens in Scene) ── */
  useFrame(() => {
    const group = groupRef.current;
    const mat = materialRef.current;
    if (!group) return;

    const t = focusProgressRef.current;
    const pb = heroAnchor.pb + (exploreAnchor.pb - heroAnchor.pb) * t;
    const ph = heroAnchor.ph + (exploreAnchor.ph - heroAnchor.ph) * t;
    const displayH = ph * MODEL_SCALE;
    const baseScale = displayH * animState.hoverScale * animState.activeScale;
    const px = heroAnchor.px + (exploreAnchor.px - heroAnchor.px) * t;

    // Bottom-anchored with local pedestal offset
    group.position.set(
      px,
      pb -
        displayH / 2 +
        BASE_Y_OFFSET +
        animState.floatY -
        animState.hoverLift,
      0,
    );

    // Per-icon yaw interpolated between hero and explore orientations,
    // composed with idle sway and hover facing offset
    const xTilt = TILT_X + (EXPLORE_TILT_X - TILT_X) * t;
    const baseYaw =
      HERO_YAW[categoryId] +
      (EXPLORE_YAW[categoryId] - HERO_YAW[categoryId]) * t;
    group.rotation.set(
      xTilt,
      baseYaw + animState.floatRotY + animState.hoverFacing,
      0,
    );

    // Uniform XY scale × depth-extruded Z scale
    group.scale.set(baseScale, baseScale, baseScale * DEPTH_SCALE);

    // Material emphasis — driven by GSAP tweens via animState
    if (mat) {
      mat.emissiveIntensity = animState.emissiveIntensity;
      mat.roughness = animState.roughness;
    }
  });

  return <group ref={groupRef} />;
}

/* ── Scene contents ── */

function Scene({
  heroAnchors,
  exploreAnchors,
  focusTarget,
  activeCategoryId,
  hoveredCategoryId,
  reducedMotion = false,
}: Omit<CategoryIconsCanvasProps, "viewportWidth" | "viewportHeight">) {
  const invalidate = useThree((s) => s.invalidate);
  const focusProgressRef = useRef(0);
  const animStates = useMemo(() => createAnimStates(), []);
  const [loadError, setLoadError] = useState<CategoryId | null>(null);

  const handleLoadError = useCallback((id: CategoryId) => {
    setLoadError(id);
  }, []);

  /* ── GSAP focus transition (skipped when reducedMotion — snaps immediately) ── */
  useEffect(() => {
    if (reducedMotion) {
      focusProgressRef.current = focusTarget;
      invalidate();
      return;
    }
    let cancelled = false;
    void import("gsap").then(({ gsap }) => {
      if (cancelled) return;
      gsap.to(focusProgressRef, {
        current: focusTarget,
        duration: FOCUS_DURATION,
        ease: "power3.out",
        overwrite: true,
        onUpdate: () => invalidate(),
      });
    });
    return () => {
      cancelled = true;
    };
  }, [focusTarget, invalidate, reducedMotion]);

  /* ── GSAP idle float tweens (yoyo, staggered) — skipped when reducedMotion ── */
  useEffect(() => {
    if (reducedMotion) return;
    let cancelled = false;
    let ctx: ReturnType<
      Awaited<typeof import("gsap")>["gsap"]["context"]
    > | null = null;

    void import("gsap").then(({ gsap }) => {
      if (cancelled) return;

      ctx = gsap.context(() => {
        for (const id of CATEGORY_IDS) {
          const catIndex = CATEGORY_IDS.indexOf(id);
          const state = animStates[id];

          // Y float — 4.2–5.4s staggered, premium easing
          gsap.to(state, {
            floatY: FLOAT_AMPLITUDE,
            duration: 4.2 + catIndex * 0.3,
            yoyo: true,
            repeat: -1,
            ease: "power2.inOut",
            delay: catIndex * 0.3,
            onUpdate: () => invalidate(),
          });

          // Y sway — 4.5–5.5s staggered, composited on base yaw
          gsap.to(state, {
            floatRotY: ROT_AMPLITUDE * (catIndex % 2 === 0 ? 1 : -1),
            duration: 4.5 + catIndex * 0.25,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            delay: catIndex * 0.2,
            onUpdate: () => invalidate(),
          });
        }
      });
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- animStates is stable (useMemo)
  }, [invalidate, reducedMotion]);

  /* ── GSAP hover lift + facing tweens (snapped when reducedMotion) ── */
  useEffect(() => {
    if (reducedMotion) {
      for (const id of CATEGORY_IDS) {
        const isHov = hoveredCategoryId === id;
        // eslint-disable-next-line react-hooks/immutability -- animStates is the mutable animation state machine
        animStates[id].hoverLift = isHov ? HOVER_LIFT : 0;
        animStates[id].hoverScale = isHov ? HOVER_SCALE : 1;
        animStates[id].hoverFacing = isHov ? -HERO_YAW[id] * 0.6 : 0;
        animStates[id].emissiveIntensity = isHov ? 0.04 : 0.012;
      }
      invalidate();
      return;
    }
    void import("gsap").then(({ gsap }) => {
      for (const id of CATEGORY_IDS) {
        const isHov = hoveredCategoryId === id;
        gsap.to(animStates[id], {
          hoverLift: isHov ? HOVER_LIFT : 0,
          hoverScale: isHov ? HOVER_SCALE : 1,
          hoverFacing: isHov ? -HERO_YAW[id] * 0.6 : 0,
          emissiveIntensity: isHov ? 0.04 : 0.012,
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
          onUpdate: () => invalidate(),
        });
      }
    });
  }, [hoveredCategoryId, invalidate, animStates, reducedMotion]);

  /* ── GSAP active scale + material emphasis tweens (snapped when reducedMotion) ── */
  useEffect(() => {
    if (reducedMotion) {
      for (const id of CATEGORY_IDS) {
        const isAct = activeCategoryId === id;
        // eslint-disable-next-line react-hooks/immutability -- animStates is the mutable animation state machine
        animStates[id].activeScale = isAct ? ACTIVE_SCALE : 1;
        animStates[id].emissiveIntensity = isAct ? 0.07 : 0.012;
        animStates[id].roughness = isAct ? 0.42 : 0.48;
      }
      invalidate();
      return;
    }
    void import("gsap").then(({ gsap }) => {
      for (const id of CATEGORY_IDS) {
        const isAct = activeCategoryId === id;
        gsap.to(animStates[id], {
          activeScale: isAct ? ACTIVE_SCALE : 1,
          emissiveIntensity: isAct ? 0.07 : 0.012,
          roughness: isAct ? 0.42 : 0.48,
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
          onUpdate: () => invalidate(),
        });
      }
    });
  }, [activeCategoryId, invalidate, animStates, reducedMotion]);

  /* ── Propagate GLB load error to error boundary ── */
  if (loadError) throw new IconLoadError(loadError);

  return (
    <>
      <ambientLight intensity={0.2} color={0xd0d8e8} />
      <directionalLight
        position={[180, -120, 300]}
        intensity={0.85}
        color={0xffe4c0}
      />
      <directionalLight
        position={[-150, 80, -200]}
        intensity={0.35}
        color={0xa8c0d8}
      />

      {CATEGORY_IDS.map((id) => (
        <IconMesh
          key={id}
          categoryId={id}
          heroAnchor={heroAnchors[id]}
          exploreAnchor={exploreAnchors[id]}
          focusProgressRef={focusProgressRef}
          animState={animStates[id]}
          invalidate={invalidate}
          onLoadError={handleLoadError}
        />
      ))}
    </>
  );
}

/* ── Minimal React error boundary ── */

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class CanvasErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    // Silently handle — fallback is rendered
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[CategoryIcons] Canvas error, falling back:",
        error.message,
      );
    }
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

/* ── Main exported Canvas component ── */

export default function CategoryIconsCanvas({
  viewportWidth,
  viewportHeight,
  ...sceneProps
}: CategoryIconsCanvasProps) {
  return (
    <Canvas
      orthographic
      camera={{
        left: 0,
        right: viewportWidth,
        top: 0,
        bottom: viewportHeight,
        near: -1000,
        far: 1000,
        position: [0, 0, 500],
      }}
      dpr={[0, 1.5]}
      frameloop="demand"
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      }}
      style={{ background: "transparent" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <Scene {...sceneProps} />
    </Canvas>
  );
}

export { CanvasErrorBoundary };
