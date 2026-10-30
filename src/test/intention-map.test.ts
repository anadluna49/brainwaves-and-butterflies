import { describe, expect, it } from "vitest";
import { mapIntention } from "@/lib/intention-map";

describe("mapIntention", () => {
  it("returns nothing for an empty goal", () => expect(mapIntention("  ")).toEqual([]));
  it("always includes SARA and prefrontal for a goal", () => expect(mapIntention("viajar")).toEqual(["sara", "prefrontal"]));
  it("adds amygdala for fear-related goals", () => expect(mapIntention("Perder el miedo a hablar")).toContain("amigdala"));
  it("adds hippocampus and hypothalamus when relevant", () => {
    const r = mapIntention("Dormir mejor y memorizar inglés");
    expect(r).toContain("hipotalamo");
    expect(r).toContain("hipocampo");
  });
});
