import { describe, expect, it } from "vitest";
import { isSolvable, puzzlePoints, solve } from "./solver";
import { PUZZLES } from "./puzzles";
import { apply, rat } from "./rational";

/** Evaluate a rendered solution string exactly, to check it really makes 24. */
function evaluate(expr: string): { n: number; d: number } {
  const toks = expr.replace(/−/g, "-").replace(/×/g, "*").replace(/÷/g, "/").match(/\d+|[-+*/()]/g)!;
  let i = 0;
  const peek = () => toks[i];
  const atom = (): ReturnType<typeof rat> => {
    if (peek() === "(") {
      i++;
      const v = sum();
      i++; // )
      return v;
    }
    return rat(Number(toks[i++]));
  };
  const prod = () => {
    let v = atom();
    while (peek() === "*" || peek() === "/") {
      const op = toks[i++] as "*" | "/";
      v = apply(v, op, atom())!;
    }
    return v;
  };
  const sum = (): ReturnType<typeof rat> => {
    let v = prod();
    while (peek() === "+" || peek() === "-") {
      const op = toks[i++] as "+" | "-";
      v = apply(v, op, prod())!;
    }
    return v;
  };
  return sum();
}

const numbersIn = (expr: string) => (expr.match(/\d+/g) ?? []).map(Number).sort((a, b) => a - b);

describe("solver", () => {
  it("finds the single solution to 3 3 8 8 (needs fractions)", () => {
    expect(solve([3, 3, 8, 8])).toEqual(["8 ÷ (3 − 8 ÷ 3)"]);
  });

  it("treats reorderings as one solution: 1 1 1 8", () => {
    expect(solve([1, 1, 1, 8])).toEqual(["(1 + 1 + 1) × 8"]);
  });

  it("reports unsolvable sets", () => {
    expect(isSolvable([1, 1, 1, 1])).toBe(false);
    expect(solve([1, 1, 1, 1])).toEqual([]);
    expect(isSolvable([13, 13, 13, 13])).toBe(false);
  });

  it("every printed solution evaluates to 24 and uses exactly the four numbers", () => {
    for (const nums of [[3, 4, 5, 7], [1, 5, 5, 5], [2, 3, 5, 12], [4, 4, 10, 10], [6, 6, 6, 6]]) {
      const sols = solve(nums);
      expect(sols.length).toBeGreaterThan(0);
      for (const s of sols) {
        expect(evaluate(s)).toEqual({ n: 24, d: 1 });
        expect(numbersIn(s)).toEqual([...nums].sort((a, b) => a - b));
      }
    }
  });

  it("does not list duplicate solutions", () => {
    for (const nums of [[1, 2, 3, 4], [2, 2, 6, 6], [12, 12, 12, 12]]) {
      const sols = solve(nums);
      expect(new Set(sols).size).toBe(sols.length);
    }
  });

  it("folds a−(b−c) into a−b+c and a÷(b÷c) into a×c÷b", () => {
    // 1 2 3 4 has many forms; 4 × 3 × 2 × 1 and 4 × 3 × 2 ÷ 1 must collapse.
    const sols = solve([1, 2, 3, 4]);
    expect(sols.filter((s) => /^4 × 3 × 2 [×÷] 1$/.test(s))).toHaveLength(1);
  });

  it("follows the 4nums.com theory for trivial variants (x×c÷c = x+c−c, ×1 = ÷1)", () => {
    expect(solve([4, 6, 7, 7])).toEqual(["6 × 4 + 7 − 7", "7 + 7 + 6 + 4", "(7 + 6 − 7) × 4"]);
    expect(solve([1, 1, 4, 6])).toEqual(["6 × 4 + 1 − 1"]);
    expect(solve([12, 12, 12, 12])).toEqual(["12 + 12 + 12 − 12"]);
    expect(solve([1, 2, 3, 4])).toEqual(["4 × 3 × 2 × 1", "(3 + 2 + 1) × 4", "(4 + 2) × (3 + 1)"]);
  });

  it("agrees with the 1362 solvable quadruples from 1 to 13", () => {
    let solvable = 0;
    for (let a = 1; a <= 13; a++)
      for (let b = a; b <= 13; b++)
        for (let c = b; c <= 13; c++)
          for (let d = c; d <= 13; d++) if (isSolvable([a, b, c, d])) solvable++;
    expect(solvable).toBe(1362);
    expect(PUZZLES).toHaveLength(1362);
    const keys = new Set(PUZZLES.map((p) => p.n.join(" ")));
    expect(keys.size).toBe(1362);
    for (const p of PUZZLES) expect(isSolvable(p.n)).toBe(true);
  }, 60_000);

  it("scores puzzles as 10 × (1 + 2 / solutions)", () => {
    expect(puzzlePoints(1)).toBe(30);
    expect(puzzlePoints(2)).toBe(20);
    expect(puzzlePoints(4)).toBe(15);
    expect(puzzlePoints(20)).toBe(11);
  });
});
