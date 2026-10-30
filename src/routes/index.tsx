import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Brain, Eye, Network, Moon, Sun, Plus, Minus, Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NeuralSimulator, CoherenceDials } from "@/components/neural-lab";
import neuralImage from "@/assets/neural-field.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Mente Enfocada — Intención, conciencia y neurociencia" },
    { name: "description", content: "Un laboratorio de exploración sobre SARA, neuroplasticidad y la Teoría Sintérgica de Jacobo Grinberg. Atención, visualización y acción con rigor científico." },
    { property: "og:title", content: "Mente Enfocada — Intención, conciencia y neurociencia" },
    { property: "og:description", content: "Explora el campo neural y tus hábitos de enfoque, distinguiendo hipótesis de evidencia científica." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

const pillars = [
  { icon: Eye, title: "SARA", tag: "Alerta y atención", text: "Los circuitos del sistema reticular activador ascendente contribuyen a la vigilia y la alerta. La atención selectiva depende también de redes corticales: enfocar una meta puede cambiar qué notas." },
  { icon: Network, title: "Neuroplasticidad", tag: "Aprendizaje y experiencia", text: "El cerebro se adapta con la experiencia. La práctica, el descanso y el aprendizaje pueden modificar sus conexiones; imaginar un resultado no sustituye el proceso de alcanzarlo." },
  { icon: Brain, title: "Teoría Sintérgica", tag: "Jacobo Grinberg · Hipótesis", text: "Grinberg propuso que la experiencia surge de una interacción entre un campo neural y una estructura del espacio. Es una propuesta especulativa, no un mecanismo confirmado por la ciencia." },
];
const myths = [
  { myth: "La intención cambia por sí sola la realidad física.", fact: "La intención puede orientar decisiones y conducta. No hay evidencia sólida de que el pensamiento, por sí mismo, modifique acontecimientos externos.", category: "Intención" },
  { myth: "El SARA atrae lo que deseas.", fact: "El SARA contribuye a la alerta. Las redes de atención pueden hacer más relevantes ciertas señales; notarlas no significa que el cerebro las haya creado.", category: "Atención" },
  { myth: "Visualizar equivale a practicar.", fact: "El ensayo mental puede apoyar algunas habilidades, pero no reemplaza la práctica ni garantiza resultados. Imaginar el proceso es más útil si se acompaña de acciones concretas.", category: "Visualización" },
  { myth: "La Teoría Sintérgica está científicamente demostrada.", fact: "Sus afirmaciones centrales no cuentan con validación empírica robusta y replicada. Explorar una hipótesis no equivale a confirmar que sea verdadera.", category: "Conciencia" },
];

function Index() {
  const [dark, setDark] = useState(true);
  useEffect(() => { document.documentElement.classList.toggle("dark", dark); }, [dark]);
  return <div className="min-h-screen">
    <header className="site-header"><nav className="page-width flex items-center justify-between gap-4 py-5" aria-label="Navegación principal">
      <a href="#inicio" className="brand flex items-center gap-3"><Brain size={25} strokeWidth={1.3} /><span>Mente Enfocada<small>LABORATORIO DE CONCIENCIA</small></span></a>
      <div className="hidden items-center gap-7 text-xs lg:flex"><a href="#pilares">Fundamentos</a><a href="#campo">Campo neural</a><a href="#test">Autoevaluación</a><a href="#mitos">Evidencia</a></div>
      <div className="flex items-center gap-3"><Button variant="ghost" size="icon" aria-label="Cambiar modo de color" title={dark ? "Modo claro" : "Modo oscuro"} onClick={() => setDark(!dark)}>{dark ? <Sun /> : <Moon />}</Button><Button variant="outline" asChild className="hidden sm:inline-flex"><a href="#contacto">Conectar <ArrowUpRight /></a></Button></div>
    </nav></header>
    <main>
      <section id="inicio" className="hero-section">
        <img src={neuralImage} alt="Visualización anatómica de un cerebro y sus fibras neurales" width={1920} height={1024} className="hero-image" />
        <div className="hero-shade" />
        <div className="page-width relative z-10"><div className="hero-copy"><p className="eyebrow mb-7">Neurociencia / Percepción / Intención</p><h1>Mente Enfocada</h1><p className="hero-subtitle">Intención y co-creación<br />de la realidad.</p><p className="hero-description">Entre lo que percibes y lo que haces, existe un mundo de posibilidades. Explora la ciencia del enfoque y las preguntas de Jacobo Grinberg sobre la conciencia.</p><Button size="lg" asChild className="mt-8"><a href="#campo">Explorar el campo neural <ArrowUpRight /></a></Button><p className="mt-5 text-xs text-muted-foreground">Una mirada curiosa. Un criterio científico.</p></div></div>
        <div className="hero-bottom page-width"><span>OBSERVAR · IMAGINAR · ACTUAR</span><a href="#pilares" aria-label="Ver fundamentos"><ArrowDown size={18} /></a></div>
      </section>
      <section id="pilares" className="lab-section scroll-mt-24"><div className="section-heading"><div><p className="eyebrow">01 / Fundamentos</p><h2>Una mente. Distintas perspectivas.</h2></div><p>Lo que conocemos.<br />Lo que aún nos preguntamos.</p></div><div className="grid gap-6 md:grid-cols-3">{pillars.map(({ icon: Icon, title, tag, text }) => <article key={title} className="pillar-card"><Icon size={27} strokeWidth={1.2} /><p className="eyebrow mb-3 mt-8">{tag}</p><h3 className="mb-4 text-3xl">{title}</h3><p className="text-sm leading-7 text-muted-foreground">{text}</p></article>)}</div><p className="scientific-note">La conciencia participa en cómo experimentamos e interpretamos la realidad. Eso no demuestra que cree o modifique por sí sola el mundo físico.</p></section>
      <NeuralSimulator /><CoherenceDials />
      <section id="mitos" className="lab-section scroll-mt-24"><div className="section-heading"><div><p className="eyebrow">04 / Pensamiento crítico</p><h2>Más allá de lo que creemos</h2></div><p>La curiosidad abre preguntas.<br />La evidencia pone límites.</p></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{myths.map((myth) => <EvidenceCard key={myth.category} {...myth} />)}</div><div className="references"><span className="eyebrow">Lecturas y referencias</span><a href="https://www.ncbi.nlm.nih.gov/books/NBK549835/" target="_blank" rel="noreferrer">SARA · NCBI <ArrowUpRight size={13} /></a><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4595480/" target="_blank" rel="noreferrer">Imaginería mental · Nature Reviews <ArrowUpRight size={13} /></a><a href="https://www.scielo.cl/pdf/cmoebio/n84/0717-554X-cmoebio-84-76.pdf" target="_blank" rel="noreferrer">Teoría Sintérgica · Cinta de Moebio <ArrowUpRight size={13} /></a></div></section>
      <ContactForm />
    </main><footer className="page-width flex flex-wrap items-center justify-between gap-4 border-t py-8 text-xs text-muted-foreground"><span>© 2026 Mente Enfocada</span><span>Divulgación y exploración · No es una herramienta clínica</span><a href="#inicio" className="flex items-center gap-2">Volver al inicio <ArrowUpRight size={13} /></a></footer>
  </div>;
}

function EvidenceCard({ myth, fact, category }: { myth: string; fact: string; category: string }) {
  const [flipped, setFlipped] = useState(false);
  return <Button variant="ghost" aria-expanded={flipped} aria-label={`${flipped ? "Ver mito" : "Ver evidencia"}: ${category}`} onClick={() => setFlipped(!flipped)} className="evidence-button flip-scene h-80 w-full whitespace-normal p-0 text-left">
    <span className={`flip-inner relative block h-full w-full ${flipped ? "flipped" : ""}`}><span className="flip-face evidence-face"><span className="eyebrow">{category} / Mito</span><span className="font-display text-2xl leading-snug">{myth}</span><span className="flex items-center justify-between text-xs text-muted-foreground">Contrastar <Plus size={18} /></span></span><span className="flip-face flip-back evidence-face evidence-back"><span className="eyebrow">{category} / Evidencia</span><span className="text-sm leading-6">{fact}</span><span className="flex items-center justify-between text-xs">Volver <Minus size={18} /></span></span></span>
  </Button>;
}

function ContactForm() {
  const [previewed, setPreviewed] = useState(false);
  return <section id="contacto" className="contact-band scroll-mt-24"><div className="page-width grid gap-12 md:grid-cols-2"><div><p className="eyebrow mb-5">05 / Comunidad</p><h2>Conectar</h2><p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">Un espacio para quienes prefieren hacer buenas preguntas. Neurociencia, conciencia y aprendizaje para mentes curiosas.</p></div><div>{previewed ? <div role="status" className="py-10"><Check className="mb-5" /><h3 className="text-3xl">Vista previa completada</h3><p className="mt-4 text-sm text-muted-foreground">Tus datos no se han enviado ni guardado. Las suscripciones aún no están habilitadas.</p><Button variant="outline" className="mt-6" onClick={() => setPreviewed(false)}>Volver al formulario</Button></div> : <form className="grid gap-5" onSubmit={(e) => { e.preventDefault(); setPreviewed(true); }}><div className="grid gap-5 sm:grid-cols-2"><label className="form-label">Nombre<input name="name" required autoComplete="name" placeholder="Tu nombre" className="lab-input" /></label><label className="form-label">Correo electrónico<input name="email" required type="email" autoComplete="email" placeholder="tu@correo.com" className="lab-input" /></label></div><label className="form-label">Mensaje <span className="text-muted-foreground">(opcional)</span><textarea name="message" rows={3} placeholder="¿Qué despierta tu curiosidad?" className="lab-input resize-y" /></label><label className="flex items-center gap-3 text-xs text-muted-foreground"><input type="checkbox" defaultChecked className="newsletter-check" />Quiero recibir cápsulas de neurociencia</label><div className="flex flex-wrap items-center gap-4"><Button type="submit" size="lg"><Send /> Conectar <ArrowUpRight /></Button><span className="text-xs text-muted-foreground">Vista previa · No envía ni guarda datos</span></div></form>}</div></div></section>;
}
