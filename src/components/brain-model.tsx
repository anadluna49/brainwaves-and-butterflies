import type { ReactNode } from "react";
import type { RegionId } from "@/lib/intention-map";

export const regions: Record<RegionId, { name: string; x: number; y: number; role: string; focus: string }> = {
  sara: { name: "SARA", x: 345, y: 300, role: "Sistema Activador Reticular Ascendente, en el tronco encefálico. Regula la vigilia y el nivel de alerta.", focus: "Sin alerta no hay atención: el SARA prepara al cerebro; la selección de qué notar la hacen redes corticales." },
  prefrontal: { name: "Córtex Prefrontal", x: 160, y: 150, role: "Zona frontal que planifica, toma decisiones y controla impulsos (funciones ejecutivas).", focus: "Mantiene tu meta activa en la memoria de trabajo y dirige la atención voluntaria hacia lo relevante." },
  hipotalamo: { name: "Hipotálamo", x: 285, y: 225, role: "Centro que regula sueño, hambre, temperatura y hormonas del estrés.", focus: "Un cuerpo descansado y regulado sostiene mejor la concentración; el sueño pobre la reduce." },
  amigdala: { name: "Amígdala", x: 250, y: 260, role: "Estructura que detecta amenazas y asigna carga emocional a las experiencias.", focus: "La emoción vuelve más llamativos ciertos estímulos; el miedo excesivo puede secuestrar la atención." },
  hipocampo: { name: "Hipocampo", x: 315, y: 255, role: "Clave para formar nuevas memorias y orientarse en el espacio.", focus: "Consolida lo que practicas; la repetición espaciada y el sueño fortalecen ese aprendizaje." },
};

export function BrainModel({ active, highlighted = [], onSelect }: { active: RegionId; highlighted?: RegionId[]; onSelect: (id: RegionId) => void }) {
  const r = regions[active];
  return (
    <div className="brain-tool">
      <svg viewBox="0 0 520 380" role="img" aria-label="Diagrama lateral del cerebro" className="brain-svg">
        <path className="brain-shape" d="M120 230 C70 200 70 120 130 85 C170 40 260 30 320 50 C400 70 460 120 455 190 C452 240 410 270 360 272 C350 300 330 320 300 318 C270 316 250 295 230 285 C190 290 140 265 120 230 Z" />
        <path className="brain-gyri" d="M150 110 C190 90 220 120 260 100 M200 70 C230 95 280 70 320 90 M330 80 C360 110 400 100 430 140 M140 170 C180 150 210 180 250 160 M280 140 C320 120 360 160 410 180 M170 220 C210 200 240 230 270 210" />
        <path className="brain-stem" d="M325 270 C330 300 335 330 345 365 L370 365 C365 330 365 300 362 272" />
        <path className="brain-cerebellum" d="M370 270 C400 300 450 290 455 250 C440 260 410 268 370 270 Z" />
        {(Object.keys(regions) as RegionId[]).map((id) => {
          const reg = regions[id];
          const on = id === active;
          const lit = highlighted.includes(id);
          return (
            <g key={id} className={`hotspot ${on ? "is-active" : ""} ${lit ? "is-lit" : ""}`} role="button" tabIndex={0} aria-pressed={on} aria-label={reg.name}
              onClick={() => onSelect(id)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(id); } }}>
              <circle cx={reg.x} cy={reg.y} r={on ? 34 : 22} className="hotspot-glow" />
              <circle cx={reg.x} cy={reg.y} r={7} className="hotspot-dot" />
              <text x={reg.x} y={reg.y - (on ? 42 : 30)} textAnchor="middle" className="hotspot-label">{reg.name}</text>
            </g>
          );
        })}
      </svg>
      <aside className="region-card" aria-live="polite">
        <p className="eyebrow">Estructura seleccionada</p>
        <h3 className="mt-2 text-4xl">{r.name}</h3>
        <p className="eyebrow mt-6">Función biológica</p>
        <p className="mt-2 text-sm leading-7">{r.role}</p>
        <p className="eyebrow mt-6">Relación con el enfoque</p>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">{r.focus}</p>
        <div className="mt-6 flex flex-wrap gap-2">{(Object.keys(regions) as RegionId[]).map((id) => <button key={id} onClick={() => onSelect(id)} className={`region-chip ${id === active ? "is-active" : ""}`}>{regions[id].name}</button>)}</div>
      </aside>
    </div>
  );
}

export function BrainLink({ id, onGo, children }: { id: RegionId; onGo: (id: RegionId) => void; children?: ReactNode }) {
  return <button type="button" className="brain-link" onClick={() => onGo(id)}>{children ?? regions[id].name}</button>;
}
