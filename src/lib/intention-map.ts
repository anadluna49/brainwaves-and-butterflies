export type RegionId = "sara" | "prefrontal" | "hipotalamo" | "amigdala" | "hipocampo";

// Educational keyword heuristic, not a neural measurement.
const rules: Array<{ region: RegionId; words: string[] }> = [
  { region: "prefrontal", words: ["plan", "estudi", "examen", "aprend", "proyecto", "meta", "organiz", "trabaj", "negocio", "decid"] },
  { region: "amigdala", words: ["miedo", "ansiedad", "nervio", "hablar", "público", "publico", "confianza", "segur", "estrés", "estres"] },
  { region: "hipotalamo", words: ["dorm", "sueño", "comer", "salud", "ejercicio", "correr", "energía", "energia", "peso", "descans"] },
  { region: "hipocampo", words: ["memor", "recordar", "idioma", "inglés", "ingles", "leer", "hábito", "habito", "rutina", "memoriz"] },
];

export function mapIntention(goal: string): RegionId[] {
  const text = goal.toLowerCase();
  if (!text.trim()) return [];
  const found = rules.filter((r) => r.words.some((w) => text.includes(w))).map((r) => r.region);
  // Any defined goal engages alertness (SARA) and executive planning (prefrontal).
  return Array.from(new Set<RegionId>(["sara", "prefrontal", ...found]));
}
