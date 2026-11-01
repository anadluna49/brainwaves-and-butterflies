import { useRef, useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COLORS, makeTrials, summarize, type ColorId, type Result, type Trial } from "@/lib/stroop";

const N = 12;

export function StroopTest() {
  const [trials, setTrials] = useState<Trial[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [conflict, setConflict] = useState(0);
  const start = useRef(0);
  const i = results.length;
  const running = trials.length > 0 && i < N;
  const done = trials.length > 0 && i >= N;
  const cur = trials[i];

  const begin = () => { setTrials(makeTrials(N)); setResults([]); setConflict(0); start.current = performance.now(); };
  const answer = (c: ColorId) => {
    if (!cur) return;
    const ms = Math.round(performance.now() - start.current);
    const congruent = cur.word === cur.ink;
    setResults((r) => [...r, { correct: c === cur.ink, ms, congruent }]);
    setConflict(congruent ? 25 : Math.min(100, 45 + ms / 25));
    start.current = performance.now();
  };
  const s = summarize(results);

  return (
    <section id="stroop" className="lab-section scroll-mt-24">
      <div className="section-heading"><div><p className="eyebrow">04 / Prueba de atención</p><h2>Efecto Stroop</h2></div><p>Elige el color de la tinta,<br />no lo que dice la palabra.</p></div>
      <div className="stroop-tool">
        <div className="stroop-stage">
          {!running && !done && <div className="text-center"><p className="mb-6 max-w-md text-sm leading-7 text-muted-foreground">Verás {N} palabras. Responde lo más rápido posible el <strong className="text-foreground">color de la tinta</strong>. Leer es automático; ignorarlo exige control.</p><Button size="lg" onClick={begin}><Play /> Empezar</Button></div>}
          {running && cur && <>
            <p className="eyebrow">Ensayo {i + 1} / {N}</p>
            <p className={`stroop-word ink-${cur.ink}`} aria-live="polite">{COLORS.find((c) => c.id === cur.word)!.word}</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{COLORS.map((c) => <Button key={c.id} variant="outline" onClick={() => answer(c.id)} className="stroop-btn"><span className={`stroop-dot ink-bg-${c.id}`} />{c.id}</Button>)}</div>
          </>}
          {done && <div className="text-center" role="status"><p className="eyebrow">Tu resultado</p><p className="mt-3 font-display text-6xl">{s.avgMs} ms</p><p className="mt-2 text-sm text-muted-foreground">Tiempo de reacción medio · {s.accuracy}% de aciertos</p><p className="mx-auto mt-4 max-w-md text-sm leading-7">Las palabras en conflicto te costaron <strong>{Math.max(0, s.interferenceMs)} ms</strong> más: ese es el «costo» de que tu córtex prefrontal frene la lectura automática.</p><Button className="mt-6" variant="ghost" onClick={begin}><RotateCcw /> Repetir</Button></div>}
        </div>
        <aside className="stroop-meter">
          <p className="eyebrow">En vivo · Córtex Prefrontal</p>
          <p className="mt-2 font-display text-3xl">{conflict > 70 ? "Lucha intensa" : conflict > 40 ? "Controlando la distracción" : "En calma"}</p>
          <div className="meter-track mt-5"><div className="meter-fill" style={{ height: `${conflict}%` }} /></div>
          <p className="mt-5 text-xs leading-6 text-muted-foreground">El córtex cingulado anterior detecta el conflicto entre palabra y color; el prefrontal dorsolateral impone la regla «di la tinta». Respuestas lentas en palabras incongruentes = más esfuerzo de control.</p>
        </aside>
      </div>
      <p className="scientific-note">Descrito por J. R. Stroop (1935). Indicador ilustrativo calculado con tu tiempo de respuesta; no mide actividad cerebral.</p>
    </section>
  );
}

const waves = [
  { name: "Delta", hz: "0.5–4 Hz", f: 1, state: "Sueño profundo, reparación del cuerpo." },
  { name: "Theta", hz: "4–8 Hz", f: 2, state: "Somnolencia, ensoñación, memoria y meditación profunda." },
  { name: "Alfa", hz: "8–13 Hz", f: 4, state: "Relajación despierta, ojos cerrados, calma atenta." },
  { name: "Beta", hz: "13–30 Hz", f: 8, state: "Concentración activa, razonamiento, también estrés." },
  { name: "Gamma", hz: "30–100 Hz", f: 16, state: "Integración de información y percepción unificada." },
];
function wavePath(f: number) {
  return Array.from({ length: 241 }, (_, i) => `${i ? "L" : "M"}${i * 5},${(30 - Math.sin((i / 240) * Math.PI * 2 * f * 2) * (f > 8 ? 12 : 20)).toFixed(1)}`).join(" ");
}

export function BrainWaves() {
  const [sel, setSel] = useState(2);
  const w = waves[sel]!;
  return (
    <section id="ondas" className="lab-section scroll-mt-24">
      <div className="section-heading"><div><p className="eyebrow">05 / Electroencefalografía</p><h2>Ondas cerebrales</h2></div><p>El EEG sí mide campos eléctricos reales<br />producidos por millones de neuronas.</p></div>
      <div className="waves-tool">
        {waves.map((x, k) => (
          <button key={x.name} onClick={() => setSel(k)} className={`wave-row ${k === sel ? "is-active" : ""}`} aria-pressed={k === sel}>
            <span className="wave-name"><span className="font-display text-2xl">{x.name}</span><span className="eyebrow">{x.hz}</span></span>
            <svg viewBox="0 0 600 60" preserveAspectRatio="none" className="wave-svg" aria-hidden="true"><g className="wave-scroll" style={{ animationDuration: `${6 - k}s` }}><path d={wavePath(x.f)} /><path d={wavePath(x.f)} transform="translate(1200 0)" /></g></svg>
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div><p className="eyebrow">Estado asociado · {w.name}</p><p className="mt-3 font-display text-3xl leading-snug">{w.state}</p></div>
        <div><p className="eyebrow">Conexión con el Campo Neuronal de Grinberg</p><p className="mt-3 text-sm leading-7 text-muted-foreground">Grinberg partió de un hecho medible: la actividad sincronizada de las neuronas produce campos eléctricos que el EEG registra desde el cuero cabelludo. Él midió la <em>coherencia</em> entre hemisferios durante la meditación y la interpretó como un campo neuronal más «sintérgico». La parte comprobada es el campo eléctrico y su relación con estados mentales; su interacción con una «lattice» sigue siendo hipótesis.</p></div>
      </div>
    </section>
  );
}
