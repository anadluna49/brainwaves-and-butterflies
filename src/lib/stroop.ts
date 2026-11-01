export const COLORS = [
  { id: "rojo", word: "ROJO" },
  { id: "azul", word: "AZUL" },
  { id: "verde", word: "VERDE" },
  { id: "amarillo", word: "AMARILLO" },
] as const;
export type ColorId = (typeof COLORS)[number]["id"];
export type Trial = { word: ColorId; ink: ColorId };
export type Result = { correct: boolean; ms: number; congruent: boolean };

// Mostly incongruent trials: word and ink color differ.
export function makeTrials(n: number, rand = Math.random): Trial[] {
  return Array.from({ length: n }, (_, i) => {
    const word = COLORS[Math.floor(rand() * 4)]!.id;
    if (i % 4 === 3) return { word, ink: word };
    const others = COLORS.filter((c) => c.id !== word);
    return { word, ink: others[Math.floor(rand() * 3)]!.id };
  });
}

export function summarize(results: Result[]) {
  const ok = results.filter((r) => r.correct);
  const avg = (xs: Result[]) => (xs.length ? Math.round(xs.reduce((s, r) => s + r.ms, 0) / xs.length) : 0);
  return {
    accuracy: results.length ? Math.round((ok.length / results.length) * 100) : 0,
    avgMs: avg(ok),
    interferenceMs: avg(ok.filter((r) => !r.congruent)) - avg(ok.filter((r) => r.congruent)),
  };
}
