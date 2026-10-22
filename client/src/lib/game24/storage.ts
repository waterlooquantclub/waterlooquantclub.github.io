import type { Difficulty } from "./puzzles";
import type { Mode } from "./session";

/** Personal bests and settings live in localStorage; there is no backend. */
const KEY = "wqc-24game:v1";

export interface Best {
  score: number;
  solved: number;
  at: string;
}

interface Stored {
  bests: Record<string, Best>;
  showSolutions: boolean;
}

function read(): Stored {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { bests: {}, showSolutions: true, ...JSON.parse(raw) };
  } catch {
    // Private mode or corrupt JSON: start fresh.
  }
  return { bests: {}, showSolutions: true };
}

function write(s: Stored) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    // Storage full or blocked; bests just won't persist.
  }
}

const bestKey = (m: Mode, d: Difficulty) => `${m}:${d}`;

export function getBest(m: Mode, d: Difficulty): Best | null {
  return read().bests[bestKey(m, d)] ?? null;
}

/** Records the score if it beats the stored best. Returns true on a new best. */
export function submitScore(m: Mode, d: Difficulty, score: number, solved: number): boolean {
  const s = read();
  const prev = s.bests[bestKey(m, d)];
  if (prev && prev.score >= score) return false;
  if (score <= 0) return false;
  s.bests[bestKey(m, d)] = { score, solved, at: new Date().toISOString() };
  write(s);
  return true;
}

export function getShowSolutions(): boolean {
  return read().showSolutions;
}

export function setShowSolutions(v: boolean) {
  write({ ...read(), showSolutions: v });
}
