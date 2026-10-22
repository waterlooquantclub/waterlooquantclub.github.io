import { describe, expect, it } from "vitest";
import { clickOp, clickTile, foldAll, isDeadEnd, isSolved, newBoard, remaining, reset, undo, type Board } from "./board";
import { format, type Op } from "./rational";

const play = (b: Board, moves: (number | Op)[]) =>
  moves.reduce<Board>((acc, m) => (typeof m === "number" ? clickTile(acc, m) : clickOp(acc, m)), b);

const shown = (b: Board) => b.slots.map((s) => (s ? format(s) : "_"));

describe("board", () => {
  it("combines into the second tile and keeps it selected", () => {
    const b = play(newBoard([3, 4, 5, 7]), [3, "+", 2]); // 7 + 5
    expect(shown(b)).toEqual(["3", "4", "12", "_"]);
    expect(b.selected).toBe(2);
    expect(b.steps.map((s) => s.label)).toEqual(["7 + 5 = 12"]);
  });

  it("solves (7 + 5 − 4) × 3 by chaining", () => {
    const b = play(newBoard([3, 4, 5, 7]), [3, "+", 2, "-", 1, "*", 0]);
    expect(isSolved(b)).toBe(true);
    expect(remaining(b)).toBe(1);
  });

  it("keeps fractions exact: 8 ÷ (3 − 8 ÷ 3)", () => {
    const b0 = newBoard([3, 3, 8, 8]);
    let b = play(b0, [2, "/", 0]); // 8/3 in slot 0
    expect(shown(b)[0]).toBe("8/3");
    b = play(b, [1, "-", 0]); // 3 - 8/3 = 1/3 in slot 0
    expect(shown(b)[0]).toBe("1/3");
    b = play(b, [3, "/", 0]); // 8 ÷ 1/3
    expect(isSolved(b)).toBe(true);
  });

  it("rejects division by zero without changing the board", () => {
    let b = play(newBoard([2, 2, 3, 8]), [0, "-", 1]); // 0 in slot 1
    b = play(b, [3, "/", 1]);
    expect(b.error).toMatch(/zero/);
    expect(shown(b)).toEqual(["_", "0", "3", "8"]);
  });

  it("selecting: second click on same tile deselects; op needs a selection", () => {
    let b = clickOp(newBoard([1, 2, 3, 4]), "+");
    expect(b.op).toBeNull();
    b = clickTile(b, 0);
    expect(b.selected).toBe(0);
    b = clickTile(b, 0);
    expect(b.selected).toBeNull();
    b = play(b, [0, 1]); // no op: just moves selection
    expect(b.selected).toBe(1);
    expect(remaining(b)).toBe(4);
  });

  it("undo steps back one move, then clears selection; reset restores the deal", () => {
    let b = play(newBoard([3, 4, 5, 7]), [3, "+", 2, "-", 1]);
    expect(remaining(b)).toBe(2);
    b = undo(b);
    expect(shown(b)).toEqual(["3", "4", "12", "_"]);
    b = clickOp(b, "*");
    b = undo(b); // first undo just cancels the pending operator
    expect(b.op).toBeNull();
    expect(shown(b)).toEqual(["3", "4", "12", "_"]);
    b = undo(b);
    expect(shown(b)).toEqual(["3", "4", "5", "7"]);
    b = play(b, [0, "*", 1]);
    b = reset(b);
    expect(shown(b)).toEqual(["3", "4", "5", "7"]);
    expect(b.steps).toEqual([]);
  });

  it("A / S fold everything left; one undo reverts the fold", () => {
    let b = foldAll(newBoard([6, 6, 6, 6]), "+");
    expect(isSolved(b)).toBe(true);
    b = foldAll(newBoard([1, 2, 3, 4]), "*");
    expect(isSolved(b)).toBe(true);
    b = undo(b);
    expect(shown(b)).toEqual(["1", "2", "3", "4"]);
  });

  it("flags a dead end when one non-24 number is left", () => {
    const b = foldAll(newBoard([1, 1, 1, 1]), "+");
    expect(isDeadEnd(b)).toBe(true);
    expect(isSolved(b)).toBe(false);
  });
});
