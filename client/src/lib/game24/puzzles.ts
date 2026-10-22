import ranked from "./puzzles.json";

/**
 * The 1362 solvable quadruples drawn from 1-13, ordered easiest to hardest by
 * 4nums.com's published ranking (adjusted median solve time across ~7M
 * solves). The ranking is what makes difficulty tiers meaningful; solution
 * counts alone rate 3 3 8 8 as easy as 1 1 1 8.
 */
export interface RankedPuzzle {
  n: [number, number, number, number];
  /** Adjusted median solve time on 4nums.com, seconds. */
  amt: number;
  /** Share of attempts that were solved, percent. */
  rate: number;
}

export const PUZZLES = ranked as RankedPuzzle[];

export type Difficulty = "all" | "easy" | "medium" | "hard";

export const DIFFICULTIES: { id: Difficulty; label: string; blurb: string }[] = [
  { id: "all", label: "All", blurb: "Every solvable puzzle" },
  { id: "easy", label: "Easy", blurb: "Fastest third" },
  { id: "medium", label: "Medium", blurb: "Middle third" },
  { id: "hard", label: "Hard", blurb: "Slowest third" },
];

export function poolFor(d: Difficulty): RankedPuzzle[] {
  const third = Math.ceil(PUZZLES.length / 3);
  switch (d) {
    case "all":
      return PUZZLES;
    case "easy":
      return PUZZLES.slice(0, third);
    case "medium":
      return PUZZLES.slice(third, 2 * third);
    case "hard":
      return PUZZLES.slice(2 * third);
  }
}

export type Rng = () => number;

/** mulberry32: small, seedable, good enough for shuffling puzzles. */
export function seededRng(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffle<T>(xs: readonly T[], rng: Rng): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Deals puzzles from a shuffled bag so nothing repeats until the whole pool
 * has been seen. The four numbers are also shuffled so the layout of a
 * repeated puzzle is not memorable.
 */
export class Dealer {
  private bag: RankedPuzzle[] = [];
  constructor(
    private readonly pool: readonly RankedPuzzle[],
    private readonly rng: Rng = Math.random,
  ) {}

  next(): RankedPuzzle {
    if (this.bag.length === 0) this.bag = shuffle(this.pool, this.rng);
    const p = this.bag.pop()!;
    return { ...p, n: shuffle(p.n, this.rng) as RankedPuzzle["n"] };
  }
}

/** Puzzle of the day: same four numbers for everyone on a given UTC date. */
export function dailyPuzzle(date = new Date()): RankedPuzzle {
  const key = date.getUTCFullYear() * 10000 + (date.getUTCMonth() + 1) * 100 + date.getUTCDate();
  const rng = seededRng(key);
  const p = PUZZLES[Math.floor(rng() * PUZZLES.length)];
  return { ...p, n: shuffle(p.n, rng) as RankedPuzzle["n"] };
}
