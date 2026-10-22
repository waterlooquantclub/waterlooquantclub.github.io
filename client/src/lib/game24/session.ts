import { newBoard, isSolved, type Board } from "./board";
import { puzzlePoints, solve } from "./solver";
import type { Difficulty, RankedPuzzle } from "./puzzles";

/**
 * Scoring follows 4nums.com:
 * - Beat the clock: start with 120s, +10s per solve, −20s per skip.
 *   Final = in-game score + seconds left.
 * - No time limit: Final = in-game score + max(30·solved − 10·skipped − seconds used, 0).
 * - Each puzzle is worth 10 × (1 + 2 / unique solutions) points.
 * The clock is paused while solutions are on screen between puzzles.
 */
export type Mode = "clock" | "zen";

export const CLOCK_START_MS = 120_000;
export const SOLVE_BONUS_MS = 10_000;
export const SKIP_PENALTY_MS = 20_000;

export interface PuzzleRecord {
  numbers: number[];
  solutions: string[];
  points: number;
  outcome: "solved" | "skipped" | "unfinished";
  ms: number;
  steps: string[];
}

export interface Session {
  mode: Mode;
  difficulty: Difficulty;
  phase: "playing" | "reveal" | "over";
  puzzle: RankedPuzzle;
  solutions: string[];
  board: Board;
  /** Beat the clock: time remaining. */
  clockMs: number;
  /** Total active play time (excludes reveals). */
  elapsedMs: number;
  /** Active time spent on the current puzzle. */
  puzzleMs: number;
  score: number;
  solved: number;
  skipped: number;
  records: PuzzleRecord[];
  /** Why the game ended. */
  endReason: "time" | "done" | null;
}

export function startSession(mode: Mode, difficulty: Difficulty, first: RankedPuzzle): Session {
  return {
    mode,
    difficulty,
    phase: "playing",
    ...loadPuzzle(first),
    clockMs: CLOCK_START_MS,
    elapsedMs: 0,
    score: 0,
    solved: 0,
    skipped: 0,
    records: [],
    endReason: null,
  };
}

function loadPuzzle(p: RankedPuzzle) {
  return { puzzle: p, solutions: solve(p.n), board: newBoard(p.n), puzzleMs: 0 };
}

function record(s: Session, outcome: PuzzleRecord["outcome"]): PuzzleRecord {
  return {
    numbers: [...s.puzzle.n],
    solutions: s.solutions,
    points: puzzlePoints(s.solutions.length),
    outcome,
    ms: s.puzzleMs,
    steps: s.board.steps.map((x) => x.label),
  };
}

/** Advance active time. No-op outside the playing phase. */
export function tick(s: Session, dtMs: number): Session {
  if (s.phase !== "playing" || dtMs <= 0) return s;
  const next = { ...s, elapsedMs: s.elapsedMs + dtMs, puzzleMs: s.puzzleMs + dtMs };
  if (s.mode === "clock") {
    next.clockMs = s.clockMs - dtMs;
    if (next.clockMs <= 0) return end({ ...next, clockMs: 0 }, "time");
  }
  return next;
}

/** Install a new board state; if it now reads 24, bank the puzzle. */
export function withBoard(s: Session, board: Board): Session {
  if (s.phase !== "playing") return s;
  const next = { ...s, board };
  if (!isSolved(board)) return next;
  const rec = record(next, "solved");
  return {
    ...next,
    phase: "reveal",
    score: s.score + rec.points,
    solved: s.solved + 1,
    clockMs: s.mode === "clock" ? s.clockMs + SOLVE_BONUS_MS : s.clockMs,
    records: [...s.records, rec],
  };
}

export function skip(s: Session): Session {
  if (s.phase !== "playing") return s;
  const rec = record(s, "skipped");
  const next: Session = { ...s, phase: "reveal", skipped: s.skipped + 1, records: [...s.records, rec] };
  if (s.mode === "clock") {
    next.clockMs = s.clockMs - SKIP_PENALTY_MS;
    if (next.clockMs <= 0) return end({ ...next, clockMs: 0 }, "time");
  }
  return next;
}

export function nextPuzzle(s: Session, p: RankedPuzzle): Session {
  if (s.phase !== "reveal") return s;
  return { ...s, phase: "playing", ...loadPuzzle(p) };
}

export function done(s: Session): Session {
  if (s.phase === "over") return s;
  return end(s, "done");
}

function end(s: Session, reason: "time" | "done"): Session {
  const records = s.phase === "playing" ? [...s.records, record(s, "unfinished")] : s.records;
  return { ...s, phase: "over", endReason: reason, records };
}

export function bonus(s: Session): number {
  if (s.mode === "clock") return Math.floor(Math.max(0, s.clockMs) / 1000);
  return Math.max(0, 30 * s.solved - 10 * s.skipped - Math.floor(s.elapsedMs / 1000));
}

export function finalScore(s: Session): number {
  return s.score + bonus(s);
}

/** Seconds solutions stay up between puzzles, as on 4nums.com: 4 + solution count (capped). */
export function revealSeconds(s: Session): number {
  return Math.min(4 + s.solutions.length, 12);
}
