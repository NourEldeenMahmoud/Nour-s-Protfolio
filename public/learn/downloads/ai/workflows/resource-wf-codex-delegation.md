---
name: codex-delegate
description: >-
  Delegate a coding task to the OpenAI Codex CLI as a background implementer, then review its diff and
  land it yourself. Use this whenever the user wants to hand implementation work to Codex — phrasings
  like "have Codex do X", "delegate this to Codex", "run it through Codex", or "use Codex to
  implement/fix/refactor" — or wants to run a queue of coding tasks through Codex while staying the
  reviewer. Prefer it over a one-shot Codex forwarder (such as the codex-rescue agent) specifically
  when the user will review the resulting diff and commit it themselves, or wants the full
  brief → dispatch → review → commit loop across a single task or a queue. Also reach for it proactively
  for a separate implementation pass on a bounded, well-specified task (an implementation sweep, a
  migration, a mechanical refactor, parallel work). Covers writing the Codex brief, dispatching it via
  the bundled relay.mjs helper, waiting for completion, reviewing the result, and committing. DO NOT USE
  for tasks small enough to do inline, or when the user wants the code written directly without
  delegating.
license: MIT
compatibility: Requires the `codex` CLI (OpenAI Codex) installed and authenticated, Node 18+, and git. The orchestrating agent must be able to run shell commands and read files. Shell examples assume bash/zsh (macOS/Linux, or Git Bash/WSL on Windows).
metadata:
  version: 0.1.0
---

# Codex Delegate

You are the **orchestrator**. This skill lets you hand a bounded coding task to a separate
**implementer** — the OpenAI Codex CLI — then review what it produced and land it yourself. You write
the brief and own the judgment; Codex does the typing in its own sandbox; you verify and commit.

Nothing here is specific to one orchestrating agent. The loop needs only the ability to run a shell
command and read a file, so it works the same whether you are Claude Code, OpenCode with a selected
model, or any comparable agent. (It is designed for and run on Claude Code; treat other orchestrators
as designed-for, not yet proven.)

## When NOT to use this

- The task is small enough to just do inline — delegation overhead is not worth it.
- The `codex` CLI is not installed or not authenticated (run `codex login`).
- You want to write the code yourself, or you only need a review (use Codex's own `review` command).

## Prerequisites (check once)

1. `codex --version` succeeds. If not, install (`npm i -g @openai/codex`) and `codex login`.
2. **Confirm which `codex` is on PATH.** Multiple installs are common (e.g. a current npm/nvm copy and
   a stale Homebrew one). `command -v codex` shows the active one and `codex --version` its version —
   an old binary predates flags this skill relies on (`codex exec --json`, `-o`, `exec resume`). The
   relay also records the version it ran into `result.json`, so a stale binary is visible after the fact.
3. You are in (or will point `--cd` at) the target git repository.

## The loop

Run these five steps per task. Steps 1, 4, and 5 are your judgment; 2 and 3 are mechanical.

### 1. Write the brief

Codex sees **only** the text you send — no repo memory, no chat history, no shared context. Everything the
task needs goes in the brief: the goal, the current state, what to change, what to leave untouched,
the project's **actual** gate commands (discover them from the repo's CLAUDE.md/AGENTS.md/Makefile —
do not assume), and a report contract. Tell Codex it will **not** commit (you will). Keep one task per
brief. Full guidance and a template: [references/writing-the-brief.md](references/writing-the-brief.md).

### 2. Dispatch

Send the brief to Codex with the bundled helper. It wraps `codex exec`, captures the run, and writes a
structured `result.json` — so your only job is "run a command, read a file." (`<skill-dir>` below is
this skill's installed directory — the folder containing this `SKILL.md`, i.e. the directory you loaded
the skill from. Claude Code prints it as "Base directory for this skill" when the skill loads; on other
orchestrators use that same directory — if unsure where it landed, run
`find ~ -name relay.mjs -path '*codex-delegate*'` and substitute the directory above it.)

```bash
node "<skill-dir>/scripts/relay.mjs" --brief brief.txt --cd /path/to/repo
# read-only (review/diagnosis, no edits):   add --read-only
# continue the previous Codex session:      add --resume-last  (send only the delta brief)
# see all options:                          node .../relay.mjs --help
```

The helper defaults to a write-capable (`workspace-write`) sandbox and writes its artifacts to a temp
dir, so the repo under review stays clean. It **never commits** — see step 5. Mechanics, flags, and the
`result.json` shape: [references/dispatch-and-poll.md](references/dispatch-and-poll.md).

### 3. Wait for completion

The helper blocks until Codex finishes, so back it with whatever your orchestrator offers and resume
when it returns:

- **Claude Code:** run the Bash call with `run_in_background: true`; you are notified on completion.
- **Plain shell / other agents:** run it in the foreground for short tasks, or background it and poll
  the result file — `… &` in bash/zsh (including Git Bash/WSL), or your shell's equivalent (`Start-Job`
  in PowerShell, `start /b` in cmd). The run is done when `result.json` exists with a `status`. (A
  pre-run usage error — bad args or an empty brief — instead exits with code 2 and a stderr message and
  writes no result file, so check the exit code too. A missing `codex` binary exits 127 but *does* write
  a `result.json` with status `codex_unavailable`.)

Do not trust progress trackers over reality: a run is finished when `result.json` is written and the
process has exited. Read the working tree, not a status line.

### 4. Review — do not trust the self-report

Codex's `result.json` includes its own summary and gate claims. **Re-verify, don't accept:**

- **Re-run the project's gates yourself** (the test/lint/build commands from step 1). Never take
  "gates passed" on faith.
- **Read the diff** against the brief: did Codex do what was asked, nothing more (scope creep) and
  nothing less? `touchedFiles` in the result is your starting point.
- **Run the relevant guard skills** on the diff if you have them installed (clean-code-guard,
  test-guard, etc. from `guard-skills`) — this skill produces the work; those skills judge it.
- For schema/migration changes, round-trip them; for removals, grep for dangling references.

Full checklist: [references/review-and-land.md](references/review-and-land.md).

### 5. Land it

Because Codex's sandbox cannot reliably write `.git` (it varies by version, OS, and path), **the
orchestrator commits.** Only after the gates pass and the diff holds:

- Commit the verified work yourself, with a clear message.
- If it needs changes, send a delta brief with `--resume-last` (don't restate the whole task) and
  review again.

## Non-negotiables

- **Re-run the gates yourself.** The self-report is a claim, not evidence.
- **The orchestrator commits, never Codex.** Don't assume Codex committed; it didn't.
- **One task = one brief = one commit.** Split unrelated work into separate runs.
- **Trust the working tree and process state** over any progress tracker.

## Authorization model

Delegation is something the human opts into. Once they have ("run this queue", "proceed"), committing
verified, gate-passing work is the agreed contract — that is the whole point. Two limits on that
mandate: **surface, don't absorb** (report Codex's design decisions, defensible-but-unasked turns, and
non-blocking nitpicks rather than silently keeping them) and **stop for scope changes** (if correct
completion needs going beyond the brief, ask — don't expand the mandate yourself). The full treatment
is in [references/review-and-land.md](references/review-and-land.md).

## Trust and safety

`scripts/relay.mjs` itself makes no network calls, reads or writes no credentials, and sends no
telemetry; it has no dependencies (Node built-ins only) and shells out only to `codex` and `git`. The
`codex` process it launches does authenticate — exactly as you do at the terminal. Read the script
before you run it. It is the one executable in this package; everything else is Markdown.

## References

- [references/writing-the-brief.md](references/writing-the-brief.md) — how to write a brief Codex can
  execute blind: structure, XML blocks, the report contract, embedding the real gate commands.
- [references/dispatch-and-poll.md](references/dispatch-and-poll.md) — `relay.mjs` flags, the
  `result.json` contract, backgrounding per orchestrator, and recovery when a run misbehaves.
- [references/review-and-land.md](references/review-and-land.md) — the review checklist, the commit
  boundary, and the rework cycle via `--resume-last`.
- [references/multi-task-queues.md](references/multi-task-queues.md) — running a sequential queue:
  carrying constraints forward, progress tracking, and the end-of-run coherence check.

## What this skill does NOT do

- It does not commit for you — that is deliberate (step 5).
- It does not review the code's quality itself — pair it with guard skills.
- It does not run your tests — you re-run the project's own gates in step 4.
- It is not the inverse direction (Codex reviewing your work). For that, use the openai-codex plugin's
  review command or stop-review gate.
