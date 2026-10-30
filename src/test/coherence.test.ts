import { describe, expect, it } from "vitest";
import { coherenceScore, lowestHabit } from "../lib/coherence";

describe("three-dial self-report", () => {
  it("includes attention, visualization and action equally", () => {
    expect(coherenceScore({ attention: 30, visualization: 60, action: 90 })).toBe(60);
    expect(coherenceScore({ attention: 0, visualization: 0, action: 0 })).toBe(0);
    expect(coherenceScore({ attention: 100, visualization: 100, action: 100 })).toBe(100);
  });
  it("targets the lowest-rated habit for the tip", () => {
    expect(lowestHabit({ attention: 70, visualization: 20, action: 90 })).toBe("visualization");
    expect(lowestHabit({ attention: 70, visualization: 80, action: 10 })).toBe("action");
  });
});