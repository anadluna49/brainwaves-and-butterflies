import { useState } from "react";
import { ArrowUpRight, Brain, Crosshair, Eye, Play, RotateCcw, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { coherenceScore, lowestHabit, type FocusHabits } from "@/lib/coherence";

function fieldWave(row: number, value: number) {
  return Array.from({ length: 121 }, (_, i) => {
    const x = i * 5;
    const phase = (1 - value / 100) * row * 1.7;
    const y = 85 + row * 13 + Math.sin(x / 34 + phase) * (7 + (100 - value) / 5);
    return `${i === 0 ? "M" : "L"}${x},${y.toFixed(2)}`;
  }).join(" ");
}

export function NeuralSimulator() {
  const [value, setValue] = useState(50);
  const [moving, setMoving] = useState(true);
  const state = value === 100 ? "Sintergia Perfecta" : value < 35 ? "Disonancia" : value < 75 ? "En integración" : "Alta sincronía";
  return (
    <section id="campo" className="lab-section scroll-mt-24">
      <div className="section-heading"><div><p className="eyebrow">02 / Exploración interactiva</p><h2>El campo neural</h2></div><p>Una metáfora visual de la Teoría Sintérgica.<br />No una medición de tu cerebro.</p></div>
      <div className="field-tool">
        <div className="field-toolbar"><span className="flex items-center gap-2"><Activity size={15} /> SIMULADOR / {String(value).padStart(3, "0")}</span><Button size="icon" variant="ghost" aria-label={moving ? "Pausar campo" : "Reanudar campo"} title={moving ? "Pausar campo" : "Reanudar campo"} onClick={() => setMoving(!moving)}>{moving ? <span className="pause-symbol">Ⅱ</span> : <Play />}</Button></div>
        <div className={`neural-visual ${moving ? "is-moving" : ""}`}>
          <svg viewBox="0 0 600 390" role="img" aria-label={`Gráfico cerebral: ${state}`} className="field-svg">
            <defs><clipPath id="brain-clip"><path d="M293 77 C254 43 191 60 165 108 C127 118 120 165 130 196 C105 237 128 280 155 290 C170 334 227 347 280 319 L294 292 L306 292 L320 319 C373 347 430 334 445 290 C472 280 495 237 470 196 C480 165 473 118 435 108 C409 60 346 43 307 77 Z" /></clipPath></defs>
            <g className="field-grid" fill="none" stroke="currentColor">{Array.from({ length: 9 }, (_, i) => <path key={i} d={`M0 ${40 + i * 40} H600`} />)}{Array.from({ length: 15 }, (_, i) => <path key={i} d={`M${20 + i * 40} 0 V390`} />)}</g>
            <g className="field-waves" fill="none" stroke="currentColor">{Array.from({ length: 18 }, (_, i) => <path key={i} d={fieldWave(i, value)} opacity={0.15 + (i % 3) * 0.1} />)}</g>
            <path className="brain-outline" d="M293 77 C254 43 191 60 165 108 C127 118 120 165 130 196 C105 237 128 280 155 290 C170 334 227 347 280 319 L294 292 L306 292 L320 319 C373 347 430 334 445 290 C472 280 495 237 470 196 C480 165 473 118 435 108 C409 60 346 43 307 77 Z" />
            <g clipPath="url(#brain-clip)" className="brain-fibers" fill="none" stroke="currentColor">{Array.from({ length: 20 }, (_, i) => <path key={i} d={`M300 300 C${110 + i * 7} ${330 - i * 13}, ${130 + i * 4} ${60 + i * 9}, 294 ${78 + i * 9} M300 300 C${490 - i * 7} ${330 - i * 13}, ${470 - i * 4} ${60 + i * 9}, 306 ${78 + i * 9}`} opacity={0.25 + value / 200} />)}<path d="M300 75 V305" /></g>
            <g className="neural-nodes" fill="currentColor">{Array.from({ length: 18 }, (_, i) => { const angle = i * 2.4; return <circle key={i} cx={300 + Math.cos(angle) * (65 + i * 3)} cy={195 + Math.sin(angle) * (55 + i * 3)} r={2 + value / 60} />; })}</g>
            <text x="22" y="375" className="svg-label">CAMPO NEURAL · MODELO CONCEPTUAL</text><text x="578" y="375" textAnchor="end" className="svg-label">{value}/100</text>
          </svg>
        </div>
        <div className="field-controls"><div className="mb-6 flex flex-wrap items-center justify-between gap-3"><label id="field-label" className="text-sm">Sincronía del modelo</label><span className="font-display text-2xl" aria-live="polite">{state}</span></div><Slider aria-labelledby="field-label" value={[value]} onValueChange={([v]) => setValue(v ?? 0)} min={0} max={100} step={1} /><div className="mt-4 flex justify-between text-xs text-muted-foreground"><span>Disonancia</span><span>Sintergia Perfecta</span></div></div>
      </div>
      <p className="scientific-note">En la propuesta de Grinberg, la «sintergia» describe una organización del campo neural. Este modelo no demuestra que la intención altere la realidad física.</p>
    </section>
  );
}

const dialData = [
  { key: "attention" as const, label: "Atención", icon: Crosshair, question: "¿Qué tan presente estás al estudiar?", tip: "Elige una tarea y aparta el teléfono durante 20 minutos. Reducir estímulos competidores favorece la atención sostenida." },
  { key: "visualization" as const, label: "Visualización", icon: Eye, question: "¿Qué tan claro imaginas el proceso?", tip: "Visualiza los pasos, no solo el resultado: abrir tus apuntes, practicar y corregir. Acompaña el ensayo mental con práctica real." },
  { key: "action" as const, label: "Acción", icon: ArrowUpRight, question: "¿Con qué constancia das pasos concretos?", tip: "Convierte tu intención en una acción pequeña: «Después de desayunar, resolveré dos ejercicios». La práctica repetida favorece el aprendizaje." },
];

export function CoherenceDials() {
  const [habits, setHabits] = useState<FocusHabits>({ attention: 50, visualization: 50, action: 50 });
  const [reported, setReported] = useState(false);
  const score = coherenceScore(habits);
  const tip = dialData.find((dial) => dial.key === lowestHabit(habits)) ?? dialData[0];
  if (!tip) return null;
  return (
    <section id="test" className="lab-section scroll-mt-24">
      <div className="section-heading"><div><p className="eyebrow">03 / Autoobservación</p><h2>De la intención a la acción</h2></div><p>Tres dimensiones de tus hábitos.<br />Una pausa para observarte.</p></div>
      <div className="grid gap-8 md:grid-cols-3">{dialData.map(({ key, label, icon: Icon, question }, i) => <div key={key} className="dial-item"><div className="flex items-center justify-between"><span className="eyebrow">0{i + 1}</span><Icon size={20} strokeWidth={1.3} /></div><div className="dial-graphic"><svg viewBox="0 0 160 160" aria-hidden="true"><circle cx="80" cy="80" r="67" className="dial-track" /><circle cx="80" cy="80" r="67" className="dial-value" strokeDasharray={`${habits[key] * 4.21} 421`} transform="rotate(-90 80 80)" /><path d="M80 7 V15 M153 80 H145 M80 153 V145 M7 80 H15" className="dial-ticks" /></svg><div className="dial-number"><span>{habits[key]}</span><small>/ 100</small></div></div><label id={`${key}-label`} className="mb-2 block font-display text-3xl">{label}</label><p className="mb-7 min-h-10 text-sm text-muted-foreground">{question}</p><Slider aria-labelledby={`${key}-label`} value={[habits[key]]} onValueChange={([value]) => { setHabits((h) => ({ ...h, [key]: value ?? 0 })); setReported(false); }} min={0} max={100} step={1} /><div className="mt-3 flex justify-between text-xs text-muted-foreground"><span>Poco</span><span>Mucho</span></div></div>)}</div>
      <div className="mt-10 flex flex-col items-center gap-4"><Button size="lg" onClick={() => setReported(true)}><Brain /> Generar mi reporte <ArrowUpRight /></Button><p className="text-center text-xs text-muted-foreground">Autoevaluación orientativa. No mide actividad cerebral ni sustituye un diagnóstico.</p></div>
      {reported && <div className="coherence-report mt-10" role="status"><div><p className="eyebrow">Tu reporte de coherencia mental</p><h3 className="mt-3 text-3xl">{score < 40 ? "Un punto de partida" : score < 75 ? "Hábitos en integración" : "Intención y hábitos alineados"}</h3><p className="mt-4 text-sm text-muted-foreground">Índice de hábitos declarado: <strong className="text-foreground">{score}/100</strong>. Promedio de tus tres respuestas, no una medida de sincronía neural.</p></div><div><p className="mb-3 text-sm font-semibold">Tu siguiente paso · {tip.label}</p><p className="text-sm leading-relaxed text-muted-foreground">{tip.tip}</p><Button className="mt-4" variant="ghost" onClick={() => { setHabits({ attention: 50, visualization: 50, action: 50 }); setReported(false); }}><RotateCcw /> Volver a empezar</Button></div></div>}
    </section>
  );
}