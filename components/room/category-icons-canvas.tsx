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
import type { ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { CategoryId } from "@/content/project-showcase";
import type { ViewportAnchor } from "./category-icon-projections";
import { CATEGORY_IDS, screenYToWorldY } from "./category-icon-projections";
import {
  CATEGORY_ICONS_DIAGNOSTICS_ENABLED,
  CATEGORY_ICONS_DPR,
  CATEGORY_ICONS_POWER_PREFERENCE,
} from "./category-icons-policy";

const MODEL_SCALE = 0.71;
const BASE_Y_OFFSET = -7;
const FOCUS_DURATION = 1.1;
const FLOAT_AMPLITUDE = 7;
const ROT_Y_AMPLITUDE = THREE.MathUtils.degToRad(3.25);
const ROLL_AMPLITUDE = THREE.MathUtils.degToRad(1.35);
const HOVER_LIFT = 8;

const HERO_YAW: Record<CategoryId, number> = {
  web: THREE.MathUtils.degToRad(6),
  "game-development": THREE.MathUtils.degToRad(3),
  desktop: 0,
  "mobile-applications": THREE.MathUtils.degToRad(-3),
  summaries: THREE.MathUtils.degToRad(-6),
};

const EXPLORE_YAW: Record<CategoryId, number> = {
  web: THREE.MathUtils.degToRad(3.5),
  "game-development": THREE.MathUtils.degToRad(1.75),
  desktop: 0,
  "mobile-applications": THREE.MathUtils.degToRad(-1.75),
  summaries: THREE.MathUtils.degToRad(-3.5),
};

const FLOAT_PHASES = [0.08, 0.42, 0.73, 0.25, 0.61];
const HIT_WIDTHS: Record<CategoryId, number> = {
  web: 1.12,
  "game-development": 1.5,
  desktop: 1.22,
  "mobile-applications": 0.86,
  summaries: 1.28,
};

export type CategoryIconsCanvasProps = {
  viewportWidth: number;
  viewportHeight: number;
  heroAnchors: Record<CategoryId, ViewportAnchor>;
  exploreAnchors: Record<CategoryId, ViewportAnchor>;
  focusTarget: 0 | 1;
  activeCategoryId: CategoryId;
  hoveredCategoryId?: CategoryId | null;
  focusedCategoryId?: CategoryId | null;
  eventSourceRef?: React.RefObject<HTMLElement | null>;
  onCategoryClick?: (id: CategoryId) => void;
  onCategoryHover?: (id: CategoryId | null) => void;
  reducedMotion?: boolean;
};

type IconAnimState = {
  floatY: number;
  floatRotY: number;
  floatRollZ: number;
  interactionLift: number;
  interactionScale: number;
  interactionFacing: number;
  interactionTilt: number;
  emissiveIntensity: number;
  roughness: number;
  shadowOpacity: number;
  shadowScale: number;
};

type MaterialBinding = {
  material: THREE.MeshStandardMaterial;
  emissiveFactor: number;
  roughnessOffset: number;
};

function createAnimStates(): Record<CategoryId, IconAnimState> {
  return Object.fromEntries(
    CATEGORY_IDS.map((id) => [
      id,
      {
        floatY: 0,
        floatRotY: 0,
        floatRollZ: 0,
        interactionLift: 0,
        interactionScale: 1,
        interactionFacing: 0,
        interactionTilt: 0,
        emissiveIntensity: 0.12,
        roughness: 0.3,
        shadowOpacity: 0.2,
        shadowScale: 1,
      },
    ]),
  ) as Record<CategoryId, IconAnimState>;
}

function resetIdleMotion(state: IconAnimState) {
  state.floatY = 0;
  state.floatRotY = 0;
  state.floatRollZ = 0;
}

class IconLoadError extends Error {
  readonly path: string;
  readonly originalError: unknown;

  constructor(path: string, originalError: unknown) {
    super(`Failed to load category icon GLB: ${path}`);
    this.name = "IconLoadError";
    this.path = path;
    this.originalError = originalError;
  }
}

function createIconMaterial(sourceName: string): MaterialBinding {
  const isSide = sourceName.includes("IconSide");
  const material = new THREE.MeshStandardMaterial({
    color: isSide ? 0x29343c : 0xffedc9,
    metalness: isSide ? 0.44 : 0.54,
    roughness: isSide ? 0.33 : 0.26,
    emissive: isSide ? 0x4c2a20 : 0xc66c35,
    emissiveIntensity: isSide ? 0.035 : 0.12,
  });
  material.name = sourceName;
  return {
    material,
    emissiveFactor: isSide ? 0.28 : 1,
    roughnessOffset: isSide ? 0.055 : -0.025,
  };
}

function createShadowMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    depthTest: false,
    uniforms: { uOpacity: { value: 0.2 } },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform float uOpacity;
      void main() {
        vec2 centered = (vUv - 0.5) * vec2(1.0, 2.4);
        float alpha = smoothstep(0.52, 0.04, length(centered)) * uOpacity;
        gl_FragColor = vec4(0.035, 0.025, 0.02, alpha);
      }
    `,
  });
}

const diagnosedModels = new Set<string>();
let canvasDiagnosticsReported = false;

function IconMesh({
  categoryId,
  heroAnchor,
  exploreAnchor,
  focusProgressRef,
  animState,
  invalidate,
  onLoadError,
  onCategoryClick,
  onCategoryHover,
  viewportHeight,
}: {
  categoryId: CategoryId;
  heroAnchor: ViewportAnchor;
  exploreAnchor: ViewportAnchor;
  focusProgressRef: React.RefObject<number>;
  animState: IconAnimState;
  invalidate: () => void;
  onLoadError: (error: IconLoadError) => void;
  onCategoryClick?: (id: CategoryId) => void;
  onCategoryHover?: (id: CategoryId | null) => void;
  viewportHeight: number;
}) {
  const rootRef = useRef<THREE.Group>(null);
  const modelTransformRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const shadowRef = useRef<THREE.Mesh>(null);
  const materialsRef = useRef<MaterialBinding[]>([]);
  const loadedRef = useRef(false);
  const [loadError, setLoadError] = useState<IconLoadError | null>(null);
  const loader = useMemo(() => new GLTFLoader(), []);
  const shadowMaterial = useMemo(() => createShadowMaterial(), []);

  useEffect(() => {
    if (loadedRef.current || loadError) return;

    const path = `/models/showcase-icons/${categoryId}.glb`;
    let disposed = false;

    loader.load(
      path,
      (gltf) => {
        if (disposed || loadedRef.current) return;
        loadedRef.current = true;

        const cloned = gltf.scene.clone(true);
        const bindings: MaterialBinding[] = [];
        let meshCount = 0;
        let vertexCount = 0;
        let hasNormals = true;

        cloned.traverse((child) => {
          if (!(child instanceof THREE.Mesh)) return;
          meshCount += 1;
          vertexCount += child.geometry.getAttribute("position")?.count ?? 0;
          hasNormals &&= !!child.geometry.getAttribute("normal");
          const sourceMaterials = Array.isArray(child.material)
            ? child.material
            : [child.material];
          const replacements = sourceMaterials.map((source) => {
            const binding = createIconMaterial(source.name);
            bindings.push(binding);
            return binding.material;
          });
          child.material = Array.isArray(child.material)
            ? replacements
            : replacements[0]!;
          child.castShadow = false;
          child.receiveShadow = false;
          child.raycast = () => null;
        });

        const bounds = new THREE.Box3().setFromObject(cloned);
        const dimensions = bounds.getSize(new THREE.Vector3());
        const normalization = dimensions.y || 1;
        const normalized = dimensions.clone().divideScalar(normalization);

        if (CATEGORY_ICONS_DIAGNOSTICS_ENABLED && !diagnosedModels.has(path)) {
          diagnosedModels.add(path);
          console.info(`[CategoryIcons] loaded ${path}`, {
            normalizedBoundingBox: {
              width: Number(normalized.x.toFixed(4)),
              height: Number(normalized.y.toFixed(4)),
              depth: Number(normalized.z.toFixed(4)),
            },
            meshCount,
            vertexCount,
            normals: hasNormals ? "present" : "missing",
            materialCount: bindings.length,
          });
        }

        materialsRef.current = bindings;
        modelRef.current = cloned;
        modelTransformRef.current?.add(cloned);
        invalidate();
      },
      undefined,
      (originalError) => {
        if (disposed) return;
        const error = new IconLoadError(path, originalError);
        if (CATEGORY_ICONS_DIAGNOSTICS_ENABLED) {
          console.error(
            `[CategoryIcons] GLB load failed: ${path}`,
            originalError,
          );
        }
        setLoadError(error);
        onLoadError(error);
      },
    );

    return () => {
      disposed = true;
    };
  }, [categoryId, invalidate, loadError, loader, onLoadError]);

  useEffect(() => {
    return () => {
      const model = modelRef.current;
      if (model) {
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const materials = Array.isArray(child.material)
              ? child.material
              : [child.material];
            materials.forEach((material) => material.dispose());
          }
        });
      }
      modelRef.current = null;
      materialsRef.current = [];
      shadowMaterial.dispose();
    };
  }, [shadowMaterial]);

  if (loadError) throw loadError;

  function handlePointerEnter(event: ThreeEvent<PointerEvent>) {
    event.stopPropagation();
    document.body.style.cursor = "pointer";
    onCategoryHover?.(categoryId);
  }

  function handlePointerLeave(event: ThreeEvent<PointerEvent>) {
    event.stopPropagation();
    document.body.style.cursor = "";
    onCategoryHover?.(null);
  }

  function handleClick(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation();
    const nativeTarget = event.nativeEvent.target;
    if (
      nativeTarget instanceof Element &&
      nativeTarget.closest("[data-category-icon-control='true']")
    ) {
      return;
    }
    event.nativeEvent.preventDefault();
    event.nativeEvent.stopImmediatePropagation();
    onCategoryClick?.(categoryId);
  }

  useEffect(() => {
    return () => {
      document.body.style.cursor = "";
    };
  }, []);

  // eslint-disable-next-line react-hooks/immutability -- R3F frame callbacks mutate Three.js scene objects by design.
  useFrame(() => {
    const root = rootRef.current;
    const modelTransform = modelTransformRef.current;
    const shadow = shadowRef.current;
    if (!root || !modelTransform || !shadow) return;

    const focus = focusProgressRef.current;
    const pedestalBottom =
      heroAnchor.pb + (exploreAnchor.pb - heroAnchor.pb) * focus;
    const projectedHeight =
      heroAnchor.ph + (exploreAnchor.ph - heroAnchor.ph) * focus;
    const displayHeight = projectedHeight * MODEL_SCALE;
    const x = heroAnchor.px + (exploreAnchor.px - heroAnchor.px) * focus;
    const pedestalY = screenYToWorldY(
      pedestalBottom + BASE_Y_OFFSET,
      viewportHeight,
    );

    root.position.set(x, pedestalY, 0);
    modelTransform.position.set(
      0,
      displayHeight / 2 + animState.floatY + animState.interactionLift,
      0,
    );

    const baseYaw =
      HERO_YAW[categoryId] +
      (EXPLORE_YAW[categoryId] - HERO_YAW[categoryId]) * focus;
    const baseTilt = THREE.MathUtils.lerp(0.1, 0.035, focus);
    modelTransform.rotation.set(
      baseTilt + animState.interactionTilt,
      baseYaw + animState.floatRotY + animState.interactionFacing,
      animState.floatRollZ,
    );
    const scale = displayHeight * animState.interactionScale;
    modelTransform.scale.setScalar(scale);

    shadow.position.set(0, 1.5, -4);
    shadow.scale.set(
      displayHeight * 0.72 * animState.shadowScale,
      displayHeight * 0.19 * animState.shadowScale,
      1,
    );
    // eslint-disable-next-line react-hooks/immutability -- Three.js uniforms are designed for per-frame mutation.
    shadowMaterial.uniforms.uOpacity!.value = animState.shadowOpacity;

    for (const binding of materialsRef.current) {
      // eslint-disable-next-line react-hooks/immutability -- Three.js materials are designed for per-frame mutation.
      binding.material.emissiveIntensity =
        animState.emissiveIntensity * binding.emissiveFactor;
      binding.material.roughness = THREE.MathUtils.clamp(
        animState.roughness + binding.roughnessOffset,
        0.2,
        0.39,
      );
    }
  });

  return (
    <group ref={rootRef}>
      <mesh ref={shadowRef} material={shadowMaterial} renderOrder={-1}>
        <planeGeometry args={[1, 1]} />
      </mesh>
      <group ref={modelTransformRef}>
        <mesh
          position={[0, 0, 0.02]}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onClick={handleClick}
        >
          <boxGeometry args={[HIT_WIDTHS[categoryId], 1.12, 0.28]} />
          <meshBasicMaterial
            transparent
            opacity={0}
            depthWrite={false}
            colorWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
}

function StudioLighting({
  viewportWidth,
  viewportHeight,
}: {
  viewportWidth: number;
  viewportHeight: number;
}) {
  const scene = useThree((state) => state.scene);
  const keyRef = useRef<THREE.DirectionalLight>(null);
  const rimRef = useRef<THREE.DirectionalLight>(null);

  useEffect(() => {
    const target = new THREE.Vector3(viewportWidth / 2, viewportHeight / 2, 0);
    const lights = [keyRef.current, rimRef.current].filter(
      (light): light is THREE.DirectionalLight => !!light,
    );
    for (const light of lights) {
      light.target.position.copy(target);
      scene.add(light.target);
    }
    return () => {
      for (const light of lights) scene.remove(light.target);
    };
  }, [scene, viewportHeight, viewportWidth]);

  return (
    <>
      <hemisphereLight args={[0xd2dfeb, 0x241a18, 0.58]} />
      <directionalLight
        ref={keyRef}
        position={[viewportWidth * 0.28, viewportHeight * 1.05, 520]}
        intensity={2.7}
        color={0xffdfb5}
      />
      <directionalLight
        ref={rimRef}
        position={[viewportWidth * 0.78, viewportHeight * 0.62, -360]}
        intensity={1.42}
        color={0x91c9f0}
      />
      <pointLight
        position={[viewportWidth / 2, viewportHeight * 0.42, 180]}
        intensity={0.56}
        color={0xffa45f}
        distance={0}
        decay={0}
      />
    </>
  );
}

function Scene({
  heroAnchors,
  exploreAnchors,
  focusTarget,
  activeCategoryId,
  hoveredCategoryId,
  focusedCategoryId,
  onCategoryClick,
  onCategoryHover,
  reducedMotion = false,
  viewportWidth,
  viewportHeight,
}: CategoryIconsCanvasProps) {
  const invalidate = useThree((state) => state.invalidate);
  const focusProgressRef = useRef(0);
  const animStates = useMemo(() => createAnimStates(), []);
  const [loadError, setLoadError] = useState<IconLoadError | null>(null);

  const handleLoadError = useCallback((error: IconLoadError) => {
    setLoadError(error);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      focusProgressRef.current = focusTarget;
      invalidate();
      return;
    }
    let cancelled = false;
    let tween: { kill: () => void } | null = null;
    void import("gsap").then(({ gsap }) => {
      if (cancelled) return;
      tween = gsap.to(focusProgressRef, {
        current: focusTarget,
        duration: FOCUS_DURATION,
        ease: "power3.out",
        overwrite: true,
        onUpdate: invalidate,
      });
    });
    return () => {
      cancelled = true;
      tween?.kill();
    };
  }, [focusTarget, invalidate, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) {
      for (const id of CATEGORY_IDS) {
        resetIdleMotion(animStates[id]);
      }
      invalidate();
      return;
    }

    let cancelled = false;
    let context: ReturnType<
      Awaited<typeof import("gsap")>["gsap"]["context"]
    > | null = null;
    void import("gsap").then(({ gsap }) => {
      if (cancelled) return;
      context = gsap.context(() => {
        CATEGORY_IDS.forEach((id, index) => {
          const state = animStates[id];
          const direction = index % 2 === 0 ? 1 : -1;
          const vertical = gsap.fromTo(
            state,
            { floatY: -FLOAT_AMPLITUDE },
            {
              floatY: FLOAT_AMPLITUDE,
              duration: 2.2 + index * 0.11,
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut",
              onUpdate: invalidate,
            },
          );
          const sway = gsap.fromTo(
            state,
            {
              floatRotY: -ROT_Y_AMPLITUDE * direction,
              floatRollZ: ROLL_AMPLITUDE * direction,
            },
            {
              floatRotY: ROT_Y_AMPLITUDE * direction,
              floatRollZ: -ROLL_AMPLITUDE * direction,
              duration: 2.45 + index * 0.09,
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut",
              onUpdate: invalidate,
            },
          );
          vertical.progress(FLOAT_PHASES[index]!);
          sway.progress((FLOAT_PHASES[index]! + 0.31) % 1);
        });
      });
    });
    return () => {
      cancelled = true;
      context?.revert();
    };
  }, [animStates, invalidate, reducedMotion]);

  useEffect(() => {
    const targets = CATEGORY_IDS.map((id) => {
      const engaged = hoveredCategoryId === id || focusedCategoryId === id;
      const active = activeCategoryId === id;
      return {
        state: animStates[id],
        values: {
          interactionLift: engaged ? HOVER_LIFT : active ? 2 : 0,
          interactionScale: engaged
            ? active
              ? 1.085
              : 1.06
            : active
              ? 1.05
              : 1,
          interactionFacing: engaged ? -HERO_YAW[id] * 0.72 : 0,
          interactionTilt: engaged ? -0.035 : 0,
          emissiveIntensity: engaged
            ? active
              ? 0.29
              : 0.2
            : active
              ? 0.27
              : 0.12,
          roughness: engaged ? 0.23 : active ? 0.26 : 0.3,
          shadowOpacity: engaged ? 0.33 : active ? 0.27 : 0.2,
          shadowScale: engaged ? 0.84 : active ? 0.92 : 1,
        },
      };
    });

    if (reducedMotion) {
      for (const target of targets) Object.assign(target.state, target.values);
      invalidate();
      return;
    }

    let cancelled = false;
    let context: ReturnType<
      Awaited<typeof import("gsap")>["gsap"]["context"]
    > | null = null;
    void import("gsap").then(({ gsap }) => {
      if (cancelled) return;
      context = gsap.context(() => {
        for (const target of targets) {
          gsap.to(target.state, {
            ...target.values,
            duration: 0.38,
            ease: "power2.out",
            overwrite: "auto",
            onUpdate: invalidate,
          });
        }
      });
    });
    return () => {
      cancelled = true;
      context?.revert();
    };
  }, [
    activeCategoryId,
    animStates,
    focusedCategoryId,
    hoveredCategoryId,
    invalidate,
    reducedMotion,
  ]);

  if (loadError) throw loadError;

  return (
    <>
      <StudioLighting
        viewportWidth={viewportWidth}
        viewportHeight={viewportHeight}
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
          onCategoryClick={onCategoryClick}
          onCategoryHover={onCategoryHover}
          viewportHeight={viewportHeight}
        />
      ))}
    </>
  );
}

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
  onError?: (error: Error) => void;
};

type ErrorBoundaryState = { hasError: boolean };

class CanvasErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    if (CATEGORY_ICONS_DIAGNOSTICS_ENABLED) {
      console.error("[CategoryIcons] Canvas error", error);
    }
    this.props.onError?.(error);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

export default function CategoryIconsCanvas({
  viewportWidth,
  viewportHeight,
  eventSourceRef,
  ...sceneProps
}: CategoryIconsCanvasProps) {
  return (
    <Canvas
      orthographic
      camera={{
        left: 0,
        right: viewportWidth,
        top: viewportHeight,
        bottom: 0,
        near: 0.1,
        far: 1000,
        position: [0, 0, 500],
      }}
      dpr={CATEGORY_ICONS_DPR}
      eventSource={eventSourceRef as unknown as React.RefObject<HTMLElement>}
      eventPrefix="client"
      frameloop="demand"
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: CATEGORY_ICONS_POWER_PREFERENCE,
      }}
      style={{ background: "transparent" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.12;

        if (CATEGORY_ICONS_DIAGNOSTICS_ENABLED && !canvasDiagnosticsReported) {
          canvasDiagnosticsReported = true;
          const context = gl.getContext();
          const debugInfo = context.getExtension("WEBGL_debug_renderer_info");
          const isWebGL2 =
            typeof WebGL2RenderingContext !== "undefined" &&
            context instanceof WebGL2RenderingContext;
          console.info("[CategoryIcons] Canvas mounted", {
            webGLVersion: isWebGL2 ? "WebGL 2" : "WebGL 1",
            renderer: debugInfo
              ? context.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
              : context.getParameter(context.RENDERER),
            effectiveDpr: gl.getPixelRatio(),
            powerPreference: CATEGORY_ICONS_POWER_PREFERENCE,
            animationMode: sceneProps.reducedMotion ? "static" : "full",
          });
        }
      }}
    >
      <Scene
        {...sceneProps}
        viewportWidth={viewportWidth}
        viewportHeight={viewportHeight}
      />
    </Canvas>
  );
}

export { CanvasErrorBoundary };
