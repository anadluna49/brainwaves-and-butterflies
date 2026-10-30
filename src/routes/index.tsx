import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Brain, Moon, Sun, Plus, Minus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrainModel, BrainLink, regions } from "@/components/brain-model";
import { mapIntention, type RegionId } from "@/lib/intention-map";
import neuralImage from "@/assets/neural-field.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "NeuroSintergia — Neurociencia de la intención y el enfoque" },
    { name: "description", content: "Cerebro interactivo, Teoría Sintérgica de Jacobo Grinberg y la explicación biológica de la ley de la atracción, con evidencia científica." },
    { property: "og:title", content: "NeuroSintergia — Neurociencia de la intención y el enfoque" },
    { property: "og:description", content: "Explora SARA, córtex prefrontal, amígdala, hipocampo e hipotálamo y mapea tu intención hacia la acción." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

const myths = [
  { category: "Pensamiento", myth: "Pensar en algo con fuerza hace que ocurra.", fact: "No existe evidencia replicada de que el pensamiento por sí solo cause eventos externos. Lo que sí cambia es tu conducta: metas concretas + planes «si-entonces» aumentan el logro (Gollwitzer & Sheeran, 2006, meta-análisis de 94 estudios)." },
  { category: "Atención", myth: "El universo te envía señales cuando deseas algo.", fact: "Es atención selectiva: cuando una meta está activa, el cerebro prioriza estímulos relacionados. En el experimento del «gorila invisible» (Simons & Chabris, 1999) cerca del 50% no vio lo que no buscaba." },
  { category: "Visualización", myth: "Visualizar el éxito basta para conseguirlo.", fact: "Fantasear solo con el resultado puede reducir la energía y el logro (Oettingen, 2012). Funciona mejor contrastar meta y obstáculos (método WOOP) e imaginar el proceso." },
  { category: "Sintergia", myth: "La Teoría Sintérgica está demostrada.", fact: "Los experimentos de Grinberg sobre «potencial transferido» (1994) no han sido replicados de forma robusta. Es una hipótesis interesante, no un hecho científico." },
];

function Index() {
  const [dark, setDark] = useState(true);
  const [active, setActive] = useState<RegionId>("sara");
  const [flash, setFlash] = useState(0);
  const [goal, setGoal] = useState("");
  const [mapped, setMapped] = useState<RegionId[]>([]);
  useEffect(() => { document.documentElement.classList.toggle("dark", dark); }, [dark]);
  const go = (id: RegionId) => { setActive(id); setFlash((f) => f + 1); document.getElementById("cerebro")?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const L = (id: RegionId, label?: string) => <BrainLink id={id} onGo={go}>{label}</BrainLink>;

  return <div className="min-h-screen">
    <header className="site-header"><nav className="page-width flex items-center justify-between gap-4 py-5" aria-label="Navegación principal">
      <a href="#inicio" className="brand flex items-center gap-3"><Brain size={25} strokeWidth={1.3} /><span>NeuroSintergia<small>LABORATORIO DE CONCIENCIA</small></span></a>
      <div className="hidden items-center gap-7 text-xs lg:flex"><a href="#cerebro">Cerebro interactivo</a><a href="#sintergia">Energía sintérgica</a><a href="#mapeador">Mapeador</a><a href="#mitos">Mitos vs. evidencia</a></div>
      <Button variant="ghost" size="icon" aria-label="Cambiar modo de color" title={dark ? "Modo claro" : "Modo oscuro"} onClick={() => setDark(!dark)}>{dark ? <Sun /> : <Moon />}</Button>
    </nav></header>
    <main>
      <section id="inicio" className="hero-section">
        <img src={neuralImage} alt="Visualización anatómica de un cerebro y sus fibras neurales" width={1920} height={1024} className="hero-image" />
        <div className="hero-shade" />
        <div className="page-width relative z-10"><div className="hero-copy"><p className="eyebrow mb-7">Neurociencia / Atención / Intención</p><h1 className="hero-title">Tu cerebro decide qué ves</h1><p className="hero-subtitle">La neurociencia de la intención,<br />sin magia.</p><p className="hero-description">Lo que llamamos «ley de la atracción» tiene una base biológica: atención selectiva, motivación y aprendizaje. Aquí exploramos lo comprobado y lo que Jacobo Grinberg propuso.</p><Button size="lg" asChild className="mt-8"><a href="#cerebro">Explorar el cerebro <ArrowUpRight /></a></Button></div></div>
        <div className="hero-bottom page-width"><span>OBSERVAR · ENFOCAR · ACTUAR</span><a href="#cerebro" aria-label="Ir al cerebro"><ArrowDown size={18} /></a></div>
      </section>

      <section id="cerebro" className="lab-section scroll-mt-24">
        <div className="section-heading"><div><p className="eyebrow">01 / Modelo interactivo</p><h2>El cerebro del enfoque</h2></div><p>Haz clic en un punto luminoso<br />para conocer cada estructura.</p></div>
        <div key={flash} className={flash ? "flash-ring rounded-lg" : ""}><BrainModel active={active} onSelect={setActive} highlighted={mapped} /></div>
        <p className="scientific-note">Diagrama simplificado y esquemático: las posiciones son aproximadas y varias estructuras (amígdala, hipocampo, hipotálamo) se encuentran en el interior del cerebro.</p>
      </section>

      <section id="sintergia" className="lab-section scroll-mt-24">
        <div className="section-heading"><div><p className="eyebrow">02 / Sección especial</p><h2>Energía Sintérgica y Ley de la Atracción</h2></div><p>Hipótesis de Grinberg.<br />Mecanismos comprobados.</p></div>
        <div className="synergy-grid">
          <article className="pillar-card"><p className="eyebrow mb-3">Hipótesis · Grinberg</p><h3 className="mb-4 text-3xl">Campo Neuronal</h3><p className="text-sm leading-7 text-muted-foreground">Jacobo Grinberg (UNAM, 1980–1994) propuso que la actividad coordinada de millones de neuronas genera un <em>campo neuronal</em>. Cuanto más coherente es —por ejemplo con la atención sostenida que organiza el {L("prefrontal")}— mayor sería su «sintergia» (síntesis + energía).</p></article>
          <article className="pillar-card"><p className="eyebrow mb-3">Hipótesis · Grinberg</p><h3 className="mb-4 text-3xl">La Lattice</h3><p className="text-sm leading-7 text-muted-foreground">La <em>lattice</em> sería la estructura básica del espacio-tiempo, una red de información. Según Grinberg, el campo neuronal interactúa con ella y de ese «choque» surge la experiencia perceptual. No existe hoy evidencia física que confirme la lattice.</p></article>
          <article className="pillar-card"><p className="eyebrow mb-3">Evidencia · Neurociencia</p><h3 className="mb-4 text-3xl">Manifestar, explicado</h3><p className="text-sm leading-7 text-muted-foreground">El {L("sara")} eleva tu alerta; el {L("prefrontal")} mantiene la meta y filtra lo relevante; la {L("amigdala")} marca lo emocionalmente importante; el {L("hipocampo")} consolida lo practicado y el {L("hipotalamo")} regula energía y descanso. Resultado: <strong className="text-foreground">notas más oportunidades y actúas sobre ellas</strong>. Eso es «atracción» biológica.</p></article>
        </div>
        <p className="scientific-note">Puente entre ambas: la idea de que la conciencia «organiza» la realidad coincide con algo comprobado —la atención selecciona qué información percibimos—, pero no prueba que la mente modifique el mundo físico.</p>
      </section>

      <section id="mapeador" className="lab-section scroll-mt-24">
        <div className="section-heading"><div><p className="eyebrow">03 / Herramienta práctica</p><h2>Mapeador de Intención</h2></div><p>Escribe tu objetivo.<br />Descubre su ruta biológica.</p></div>
        <form className="flex flex-col gap-4 md:flex-row" onSubmit={(e) => { e.preventDefault(); setMapped(mapIntention(goal)); }}>
          <input value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="Ej. Aprobar mi examen de anatomía sin ansiedad" className="lab-textarea" aria-label="Tu objetivo" />
          <Button type="submit" size="lg" disabled={!goal.trim()}><Sparkles /> Mapear intención</Button>
        </form>
        {mapped.length > 0 && <div className="mt-10 grid gap-8 md:grid-cols-2" role="status">
          <div><p className="eyebrow mb-4">Áreas que participan</p><ul className="grid gap-3">{mapped.map((id) => <li key={id} className="pillar-card py-4"><BrainLink id={id} onGo={go} /><p className="mt-1 text-xs leading-6 text-muted-foreground">{regions[id].focus}</p></li>)}</ul><p className="mt-3 text-xs text-muted-foreground">Las áreas también se iluminan en el cerebro interactivo.</p></div>
          <div><p className="eyebrow mb-4">De la intención a la acción biológica</p><ol className="grid gap-4 text-sm leading-7">
            <li><strong>1. Define:</strong> escribe la meta concreta y medible. Activa tu {L("prefrontal")}.</li>
            <li><strong>2. Alerta:</strong> elige un bloque de 25 min sin distracciones; el {L("sara")} sostiene la vigilia.</li>
            <li><strong>3. Regula:</strong> {mapped.includes("amigdala") ? <>nombra el miedo y respira lento: reduce la reactividad de la {L("amigdala")}.</> : <>anticipa un obstáculo y su solución (plan «si-entonces»).</>}</li>
            <li><strong>4. Repite:</strong> practica en días distintos y duerme bien para que el {L("hipocampo")} consolide.</li>
            <li><strong>5. Recarga:</strong> {mapped.includes("hipotalamo") ? "cuida horarios de sueño y comida; " : ""}el {L("hipotalamo")} regula tu energía.</li>
          </ol></div>
        </div>}
        <p className="scientific-note">Asociación educativa por palabras clave. No mide tu actividad cerebral.</p>
      </section>

      <section id="mitos" className="lab-section scroll-mt-24">
        <div className="section-heading"><div><p className="eyebrow">04 / Pensamiento crítico</p><h2>Mitos vs. Evidencia</h2></div><p>Haz clic en cada ficha<br />para ver los datos.</p></div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{myths.map((m) => <EvidenceCard key={m.category} {...m} />)}</div>
        <div className="references"><span className="eyebrow">Referencias</span>
          <a href="https://www.ncbi.nlm.nih.gov/books/NBK549835/" target="_blank" rel="noreferrer">SARA · NCBI <ArrowUpRight size={13} /></a>
          <a href="https://journals.sagepub.com/doi/10.1068/p281059" target="_blank" rel="noreferrer">Simons & Chabris, 1999 <ArrowUpRight size={13} /></a>
          <a href="https://doi.org/10.1016/S0065-2601(06)38002-1" target="_blank" rel="noreferrer">Gollwitzer & Sheeran, 2006 <ArrowUpRight size={13} /></a>
          <a href="https://www.scielo.cl/pdf/cmoebio/n84/0717-554X-cmoebio-84-76.pdf" target="_blank" rel="noreferrer">Teoría Sintérgica · Cinta de Moebio <ArrowUpRight size={13} /></a>
        </div>
      </section>
    </main>
    <footer className="page-width flex flex-wrap items-center justify-between gap-4 py-8 text-xs text-muted-foreground"><span>© 2026 NeuroSintergia</span><span>Divulgación educativa · No es una herramienta clínica</span><a href="#inicio" className="flex items-center gap-2">Volver al inicio <ArrowUpRight size={13} /></a></footer>
  </div>;
}

function EvidenceCard({ myth, fact, category }: { myth: string; fact: string; category: string }) {
  const [flipped, setFlipped] = useState(false);
  return <Button variant="ghost" aria-expanded={flipped} aria-label={`${flipped ? "Ver mito" : "Ver evidencia"}: ${category}`} onClick={() => setFlipped(!flipped)} className="evidence-button flip-scene h-[24rem] w-full whitespace-normal p-0 text-left">
    <span className={`flip-inner relative block h-full w-full ${flipped ? "flipped" : ""}`}><span className="flip-face evidence-face"><span className="eyebrow">{category} / Mito</span><span className="font-display text-2xl leading-snug">{myth}</span><span className="flex items-center justify-between text-xs text-muted-foreground">Ver evidencia <Plus size={18} /></span></span><span className="flip-face flip-back evidence-face evidence-back"><span className="eyebrow">{category} / Evidencia</span><span className="text-sm leading-6">{fact}</span><span className="flex items-center justify-between text-xs">Volver <Minus size={18} /></span></span></span>
  </Button>;
}
