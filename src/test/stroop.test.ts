import { describe, expect, it } from "vitest";
import { makeTrials, summarize } from "@/lib/stroop";

describe("stroop", () => {
  it("makes most trials incongruent", () => {
    const t = makeTrials(12);
    expect(t.filter((x) => x.word !== x.ink).length).toBe(9);
  });
  it("averages only correct answers and computes interference", () => {
    const s = summarize([
      { correct: true, ms: 800, congruent: false },
      { correct: true, ms: 600, congruent: true },
      { correct: false, ms: 300, congruent: false },
    ]);
    expect(s).toEqual({ accuracy: 67, avgMs: 700, interferenceMs: 200 });
  });
});
