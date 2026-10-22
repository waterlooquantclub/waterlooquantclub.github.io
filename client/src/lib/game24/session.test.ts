import { describe, expect, it } from "vitest";
import { foldAll } from "./board";
import { Dealer, dailyPuzzle, poolFor, seededRng, type RankedPuzzle } from "./puzzles";
import { bonus, done, finalScore, nextPuzzle, skip, startSession, tick, withBoard } from "./session";

const P = (n: [number, number, number, number]): RankedPuzzle => ({ n, amt: 5, rate: 99 });
const EASY = P([6, 6, 6, 6]); // 6+6+6+6, A solves it
const solveWithA = (s: ReturnType<typeof startSession>) => withBoard(s, foldAll(s.board, "+"));

describe("beat the clock", () => {
  it("starts at 120s, +10s per solve, pays out puzzle points", () => {
    let s = startSession("clock", "all", EASY);
    expect(s.clockMs).toBe(120_000);
    s = tick(s, 5_000);
    s = solveWithA(s);
    expect(s.phase).toBe("reveal");
    expect(s.solved).toBe(1);
    expect(s.clockMs).toBe(125_000);
    expect(s.score).toBe(s.records[0].points);
    expect(s.records[0].ms).toBe(5_000);
  });

  it("pauses the clock during the reveal", () => {
    let s = solveWithA(startSession("clock", "all", EASY));
    const before = s.clockMs;
    s = tick(s, 10_000);
    expect(s.clockMs).toBe(before);
  });

  it("skip costs 20s and can end the game", () => {
    let s = startSession("clock", "all", EASY);
    s = skip(s);
    expect(s.clockMs).toBe(100_000);
    expect(s.skipped).toBe(1);
    s = nextPuzzle(s, EASY);
    s = tick(s, 90_000);
    s = skip(s);
    expect(s.phase).toBe("over");
    expect(s.endReason).toBe("time");
    expect(s.clockMs).toBe(0);
  });

  it("ends when time runs out and records the unfinished puzzle", () => {
    const s = tick(startSession("clock", "all", EASY), 121_000);
    expect(s.phase).toBe("over");
    expect(s.records[s.records.length - 1]?.outcome).toBe("unfinished");
    expect(finalScore(s)).toBe(0);
  });

  it("final score = score + whole seconds left", () => {
    let s = solveWithA(tick(startSession("clock", "all", EASY), 3_500));
    s = done(s);
    expect(bonus(s)).toBe(126);
    expect(finalScore(s)).toBe(s.score + 126);
  });
});

describe("no time limit", () => {
  it("bonus = max(30·solved − 10·skipped − seconds, 0)", () => {
    let s = startSession("zen", "all", EASY);
    s = solveWithA(tick(s, 4_000));
    s = nextPuzzle(s, EASY);
    s = solveWithA(tick(s, 6_000));
    s = nextPuzzle(s, EASY);
    s = skip(s);
    s = done(s);
    expect(s.phase).toBe("over");
    expect(bonus(s)).toBe(30 * 2 - 10 - 10);
    s = { ...s, elapsedMs: 1_000_000 };
    expect(bonus(s)).toBe(0);
  });

  it("never runs out of time", () => {
    const s = tick(startSession("zen", "all", EASY), 10_000_000);
    expect(s.phase).toBe("playing");
  });
});

describe("dealing", () => {
  it("does not repeat a puzzle until the pool is exhausted", () => {
    const pool = poolFor("easy");
    const d = new Dealer(pool, seededRng(1));
    const seen = new Set<string>();
    for (let i = 0; i < pool.length; i++) seen.add([...d.next().n].sort((a, b) => a - b).join(" "));
    expect(seen.size).toBe(pool.length);
  });

  it("splits the ranking into three disjoint tiers", () => {
    const [e, m, h] = [poolFor("easy"), poolFor("medium"), poolFor("hard")];
    expect(e.length + m.length + h.length).toBe(poolFor("all").length);
    expect(e[e.length - 1]!.amt).toBeLessThanOrEqual(m[0].amt);
    expect(m[m.length - 1]!.amt).toBeLessThanOrEqual(h[0].amt);
  });

  it("puzzle of the day is stable for a date", () => {
    const d = new Date("2026-10-22T05:00:00Z");
    expect(dailyPuzzle(d)).toEqual(dailyPuzzle(new Date("2026-10-22T23:00:00Z")));
  });
});
