import { Component, lazy, Suspense, type ReactNode } from "react";
import { ClientOnly } from "@tanstack/react-router";
import type { RegionId } from "@/lib/intention-map";

const Brain3D = lazy(() => import("./brain-3d"));

class Brain3DBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  override state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  override componentDidCatch(error: unknown) { console.warn("Brain3D falló:", error); }
  override render() {
    if (this.state.failed) return <div className="brain3d-fallback">No se pudo cargar el cerebro 3D. Puedes seguir explorando las estructuras con los botones de la tarjeta.</div>;
    return this.props.children;
  }
}

export const regions: Record<RegionId, { name: string; role: string; focus: string; fact: string }> = {
  sara: { name: "SARA", role: "Sistema Activador Reticular Ascendente, en el tronco encefálico. Regula la vigilia y el nivel de alerta.", focus: "Sin alerta no hay atención: el SARA prepara al cerebro; la selección de qué notar la hacen redes corticales.", fact: "Una lesión en esta red puede provocar coma: es literalmente el «interruptor» de la conciencia despierta." },
  prefrontal: { name: "Córtex Prefrontal", role: "Zona frontal que planifica, toma decisiones y controla impulsos (funciones ejecutivas).", focus: "Mantiene tu meta activa en la memoria de trabajo y dirige la atención voluntaria hacia lo relevante.", fact: "Es la última región en madurar: termina su desarrollo alrededor de los 25 años." },
  hipotalamo: { name: "Hipotálamo", role: "Centro que regula sueño, hambre, temperatura y hormonas del estrés.", focus: "Un cuerpo descansado y regulado sostiene mejor la concentración; el sueño pobre la reduce.", fact: "Pesa unos 4 gramos —menos del 1% del cerebro— y aun así controla todo el sistema hormonal." },
  amigdala: { name: "Amígdala", role: "Estructura que detecta amenazas y asigna carga emocional a las experiencias.", focus: "La emoción vuelve más llamativos ciertos estímulos; el miedo excesivo puede secuestrar la atención.", fact: "Tiene forma y tamaño de almendra (de ahí su nombre en griego) y hay una en cada hemisferio." },
  hipocampo: { name: "Hipocampo", role: "Clave para formar nuevas memorias y orientarse en el espacio.", focus: "Consolida lo que practicas; la repetición espaciada y el sueño fortalecen ese aprendizaje.", fact: "En taxistas de Londres es más grande de lo habitual: aprender rutas lo modifica (Maguire, 2000)." },
};
const ids = Object.keys(regions) as RegionId[];
const names = Object.fromEntries(ids.map((id) => [id, regions[id].name])) as Record<RegionId, string>;

export function BrainModel({ active, highlighted = [], onSelect }: { active: RegionId; highlighted?: RegionId[]; onSelect: (id: RegionId) => void }) {
  const safeActive: RegionId = regions[active] ? active : "sara";
  const r = regions[safeActive];
  const safeHighlighted = (highlighted ?? []).filter((id) => id in regions);
  const fallback = <div className="brain3d-fallback">Cargando cerebro 3D…</div>;
  return (
    <div className="brain-tool">
      <div className="brain3d-stage">
        <Brain3DBoundary><ClientOnly fallback={fallback}><Suspense fallback={fallback}><Brain3D active={safeActive} highlighted={safeHighlighted} names={names} onSelect={onSelect} /></Suspense></ClientOnly></Brain3DBoundary>
        <p className="brain3d-hint">Arrastra para girar · Rueda para acercar · Clic en un punto</p>
      </div>
      <aside className="region-card" aria-live="polite">
        <p className="eyebrow">Estructura seleccionada</p>
        <h3 className="mt-2 text-4xl">{r.name}</h3>
        <p className="eyebrow mt-6">Función biológica</p>
        <p className="mt-2 text-sm leading-7">{r.role}</p>
        <p className="eyebrow mt-6">Relación con el enfoque</p>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">{r.focus}</p>
        <p className="eyebrow mt-6">Dato interesante</p>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">{r.fact}</p>
        <div className="mt-6 flex flex-wrap gap-2">{ids.map((id) => <button key={id} onClick={() => onSelect(id)} className={`region-chip ${id === active ? "is-active" : ""}`}>{regions[id].name}</button>)}</div>
      </aside>
    </div>
  );
}

export function BrainLink({ id, onGo, children }: { id: RegionId; onGo: (id: RegionId) => void; children?: ReactNode }) {
  return <button type="button" className="brain-link" onClick={() => onGo(id)}>{children ?? regions[id].name}</button>;
}
