# Portfolio OpenCode Tooling

This directory contains project-local OpenCode configuration and tooling for the Portfolio project.

## Creative Generation Tools (new)

These additions provide the agent with creative-generation guidance, templates, and a particle-config MCP. They are all **already enabled** in `opencode.json` and discoverable after restart. None install a runtime, framework, or browser.

### Skills

| Skill                       | What it does                                                                                                                                                                                | Source                                                            |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **algorithmic-art**         | Seeded p5.js generative art: flow fields, particle systems, interactive parameter exploration. Outputs self-contained HTML artifacts.                                                       | Anthropic `skills` repo, Apache-2.0                               |
| **canvas-design**           | Static visual art composition (posters, art) as PDF/PNG. Includes 80+ bundled OFL fonts.                                                                                                    | Anthropic `skills` repo, Apache-2.0                               |
| **remotion-best-practices** | Cinematic scene composition, sequencing, timing, transitions, effects, light leaks, audio visualization, video editing, 3D/Lottie/SFX guidance, rendering, captions. Includes 9 sub-skills. | Remotion repo, Remotion License (free for individuals/small orgs) |
| **interaction-design**      | Concrete microinteractions, gestures, transitions, loading choreography, scroll patterns, state transitions, feedback patterns.                                                             | wshobson/agents, MIT                                              |

**Important:** These skills provide guidance, patterns, and templates only. They do not render output themselves. The agent generates code artifacts (HTML, PDF, PNG, config objects) based on the skill instructions.

### tsParticles MCP (v4.3.2)

A local stdio MCP server that generates tsParticles configuration objects, suggests minimal plugins, lists official effect/shape/preset packages, and diagnoses configuration options. It does not install a browser runtime or render particles.

**Start/use:** Already enabled in `opencode.json`. OpenCode starts it automatically.

## QA/Browser-Observation Tools (pre-existing)

| MCP                 | Version | Purpose                                                          |
| ------------------- | ------- | ---------------------------------------------------------------- |
| **Chrome DevTools** | v1.6.0  | Console, DOM, network, performance inspection in headless Chrome |
| **Playwright**      | v0.0.78 | Cross-browser automation, QA, page observation via system Chrome |

**Start/use:** Already enabled in `opencode.json`. OpenCode starts them automatically.

These MCP servers are quality assurance and development aids. They are NOT animation libraries, 3D engines, runtime framework code, shader compilers, or visual design tools.

### Project skill: portfolio-cinematic-visuals

A custom OpenCode skill that directs the agent to the right source-of-truth documents for all portfolio visual and motion work. See `skills/portfolio-cinematic-visuals/SKILL.md`.

## Security and Privacy

- Chrome DevTools MCP runs in headless / isolated mode. Browser data is transient.
- No personal profiles are accessed.
- No data is sent to external analytics. Usage statistics have been explicitly disabled.
- Playwright MCP runs headless with `--isolated` (in-memory profile) using the system Chrome channel. No personal browser profile is attached. No browser binaries are downloaded.
- tsParticles MCP runs in stdio mode (no network port). It generates configuration objects locally.
- All creative skills provide guidance only; no external network calls are made by the skills themselves.
- Permission to launch MCP servers is controlled by OpenCode's permission system.

## Disabling

To disable a server temporarily, set `"enabled": false` for its entry in the root `opencode.json`.

To remove completely, delete its entry from the `mcp` object in `opencode.json` and optionally clean up the unused dependency from `package.json`.

## What was NOT installed (and why)

| Tool/Service                      | Reason not installed                                                                                                                            |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Remotion runtime**              | Only the best-practices skill/guidance was installed. No Remotion npm packages, React, or rendering pipeline. Decision deferred until Phase 1+. |
| **Blender MCP**                   | Blender MCP requires a Blender add-on which cannot be safely or project-locally completed without modifying the Blender installation.           |
| **Spline**                        | Spline is a paid/freemium tool. D-032 prohibits paid services. Runtime integration requires the selected framework.                             |
| **Rive**                          | Rive integration requires the runtime stack to be decided (O-002).                                                                              |
| **react-three-fiber / Three.js**  | Framework and animation stack are undecided per O-001 and O-002. Adding runtime rendering packages now would contradict Phase 0 constraints.    |
| **Any runtime animation library** | Decision D-014 delays all framework/animation/library choices until visual prototypes are complete.                                             |

## Restart required

After adding or modifying `opencode.json` you must restart OpenCode for the changes to take effect.
