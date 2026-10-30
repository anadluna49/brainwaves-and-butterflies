import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Brain, Eye, Sparkles, Network, Moon, Sun, Target, RotateCw, Send } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mente Enfocada — Neurociencia de la atención y la atracción" },
      { name: "description", content: "Explora SARA, neuroplasticidad y neuropsicología: la explicación científica detrás de la ley de la atracción, para estudiantes." },
      { property: "og:title", content: "Mente Enfocada — Neurociencia de la atención" },
      { property: "og:description", content: "SARA, neuroplasticidad y la ciencia detrás de enfocar tu mente." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const pillars = [
  { icon: Eye, title: "SARA", text: "El Sistema de Activación Reticular Ascendente filtra millones de estímulos y prioriza lo que tu cerebro considera relevante." },
  { icon: Brain, title: "Neuropsicología", text: "Estudia cómo los procesos cerebrales sostienen la atención, la memoria, las emociones y la conducta." },
  { icon: Network, title: "Neuroplasticidad", text: "Las conexiones sinápticas se fortalecen con la repetición: lo que practicas, se vuelve estructura." },
  { icon: Sparkles, title: "Atracción científica", text: "No es magia: definir una meta orienta tu atención selectiva, y tu conducta encuentra oportunidades." },
];

const questions = [
  { q: "Cuando defines una meta, ¿con qué frecuencia la repasas?", opts: ["Casi nunca", "Algunas veces por semana", "A diario"] },
  { q: "¿Cómo manejas las distracciones al estudiar?", opts: ["Me disperso fácilmente", "Me cuesta, pero vuelvo", "Uso bloques de enfoque"] },
  { q: "¿Cuánto duermes en promedio?", opts: ["Menos de 6 h", "6–7 h", "7–9 h"] },
];

const results = [
  { title: "Circuitos en formación", text: "Tu red atencional aún es flexible y dispersa. Es el mejor punto de partida para moldearla.", tip: "Escribe tu meta cada mañana: la repetición activa la corteza prefrontal y entrena al SARA a detectarla." },
  { title: "Circuitos en consolidación", text: "Tienes hábitos de enfoque emergentes; las vías se están mielinizando.", tip: "Prueba bloques de 25 min con pausas de 5: la dopamina de cada pequeño logro refuerza el circuito." },
  { title: "Circuitos optimizados", text: "Tu cerebro muestra patrones de atención sostenida y buena higiene neuronal.", tip: "Durante el sueño profundo el hipocampo consolida lo aprendido. Protege tus 7–9 h como parte del estudio." },
];

const myths = [
  { myth: "Solo usamos el 10% del cerebro.", fact: "La neuroimagen muestra actividad en prácticamente todas las regiones a lo largo del día." },
  { myth: "Pensar en algo hace que el universo te lo envíe.", fact: "Enfocarte en una meta sesga tu atención selectiva (SARA), haciéndote notar y actuar sobre oportunidades." },
  { myth: "El cerebro adulto ya no cambia.", fact: "La neuroplasticidad persiste toda la vida; el aprendizaje modifica sinapsis a cualquier edad." },
  { myth: "Las personas son de 'cerebro izquierdo' o 'derecho'.", fact: "Ambos hemisferios colaboran constantemente; no existe dominancia de personalidad por hemisferio." },
];

function Index() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <header className="fixed inset-x-0 top-0 z-50">
        <nav className="glass mx-auto mt-4 flex max-w-5xl items-center justify-between rounded-full px-6 py-3">
          <a href="#inicio" className="flex items-center gap-2 font-display text-xl font-semibold">
            <Brain className="h-5 w-5" /> Mente Enfocada
          </a>
          <div className="hidden gap-6 text-sm md:flex">
            {[["pilares", "Pilares"], ["sara", "Activador"], ["test", "Evaluador"], ["mitos", "Mitos"], ["contacto", "Contacto"]].map(([id, l]) => (
              <a key={id} href={`#${id}`} className="opacity-80 transition hover:opacity-100">{l}</a>
            ))}
          </div>
          <button
            onClick={() => setDark((d) => !d)}
            aria-label="Cambiar modo de color"
            className="rounded-full border border-border p-2 transition hover:bg-accent hover:text-accent-foreground"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </nav>
      </header>

      {/* Hero */}
      <section id="inicio" className="neural-bg relative flex min-h-screen items-center justify-center px-6 pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="relative mx-auto mb-10 flex h-28 w-28 items-center justify-center">
            <span className="animate-pulse-ring absolute inset-0 rounded-full border border-border" />
            <span className="animate-pulse-ring absolute inset-0 rounded-full border border-border [animation-delay:1.2s]" />
            <div className="glass glow animate-float flex h-24 w-24 items-center justify-center rounded-full">
              <Brain className="h-12 w-12" strokeWidth={1.2} />
            </div>
          </div>
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-muted-foreground">Neurociencia · Neuropsicología · Atención</p>
          <h1 className="text-5xl font-medium leading-[1.05] md:text-7xl">
            Tu cerebro encuentra <em className="text-muted-foreground">lo que buscas</em>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg opacity-80">
            Descubre la explicación científica detrás de la "ley de la atracción": cómo el enfoque mental, el SARA y la neuroplasticidad moldean lo que percibes y logras.
          </p>
          <a href="#pilares" className="mt-10 inline-block rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition hover:scale-105">
            Explorar la ciencia
          </a>
        </div>
      </section>

      {/* Pillars */}
      <Section id="pilares" kicker="Fundamentos" title="Los 4 pilares">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ icon: Icon, title, text }) => (
            <article key={title} className="group rounded-2xl border bg-card p-6 text-card-foreground transition duration-500 hover:-translate-y-2 hover:glow">
              <div className="mb-5 inline-flex rounded-xl border border-border p-3 transition group-hover:bg-accent group-hover:text-accent-foreground">
                <Icon className="h-6 w-6" strokeWidth={1.4} />
              </div>
              <h3 className="mb-2 text-2xl font-semibold">{title}</h3>
              <p className="text-sm leading-relaxed opacity-80">{text}</p>
            </article>
          ))}
        </div>
      </Section>

      <SaraActivator />
      <CircuitTest />

      {/* Flip cards */}
      <Section id="mitos" kicker="Pensamiento crítico" title="Mitos vs. Evidencia" sub="Haz clic en cada ficha para girarla.">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {myths.map((m) => <FlipCard key={m.myth} {...m} />)}
        </div>
      </Section>

      <ContactForm />

      <footer className="border-t py-10 text-center text-sm text-muted-foreground">
        © 2026 Mente Enfocada · Divulgación científica para estudiantes
      </footer>
    </div>
  );
}

function Section({ id, kicker, title, sub, children }: { id: string; kicker: string; title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <div className="mb-12 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-muted-foreground">{kicker}</p>
        <h2 className="text-4xl font-medium md:text-5xl">{title}</h2>
        {sub && <p className="mt-3 opacity-70">{sub}</p>}
      </div>
      {children}
    </section>
  );
}

function SaraActivator() {
  const [goal, setGoal] = useState("");
  const [active, setActive] = useState(false);
  const words = goal.trim().split(/\s+/).filter(Boolean).length;
  const focus = Math.min(100, words * 12 + (goal.length > 0 ? 10 : 0));

  return (
    <Section id="sara" kicker="Interactivo" title="Activador SARA" sub="Escribe tu meta con claridad y observa cómo se enfoca tu atención.">
      <div className="glass mx-auto max-w-3xl rounded-2xl p-8">
        <label htmlFor="goal" className="mb-2 block text-sm font-semibold">Mi meta es…</label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="goal"
            value={goal}
            onChange={(e) => { setGoal(e.target.value); setActive(false); }}
            placeholder="Ej. Aprobar Neuroanatomía con 9 este semestre"
            className="flex-1 rounded-xl border border-input bg-background/60 px-4 py-3 outline-none transition focus:ring-2 focus:ring-ring"
          />
          <button
            disabled={!goal.trim()}
            onClick={() => setActive(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:scale-105 disabled:opacity-40"
          >
            <Target className="h-4 w-4" /> Activar
          </button>
        </div>

        <div className="mt-6">
          <div className="mb-1 flex justify-between text-xs text-muted-foreground">
            <span>Nivel de especificidad</span><span>{focus}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: `${focus}%` }} />
          </div>
        </div>

        {active && (
          <div className="animate-in fade-in zoom-in-95 mt-8 flex flex-col items-center text-center duration-700">
            <div className="relative mb-6 flex h-40 w-40 items-center justify-center">
              {[0, 0.6, 1.2].map((d) => (
                <span key={d} className="animate-pulse-ring absolute inset-0 rounded-full border-2 border-border" style={{ animationDelay: `${d}s` }} />
              ))}
              <div className="glow flex h-20 w-20 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Target className="h-9 w-9" />
              </div>
            </div>
            <p className="font-display text-2xl italic">"{goal}"</p>
            <p className="mt-3 max-w-lg text-sm opacity-80">
              {focus >= 60
                ? "Excelente: una meta específica permite al SARA etiquetarla como relevante. A partir de ahora notarás más estímulos relacionados."
                : "Buen inicio. Añade detalles (qué, cuándo, cuánto) para que tu filtro atencional la reconozca con más precisión."}
            </p>
          </div>
        )}
      </div>
    </Section>
  );
}

function CircuitTest() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const done = step >= questions.length;
  const result = results[score <= 2 ? 0 : score <= 4 ? 1 : 2];

  return (
    <Section id="test" kicker="Autoevaluación" title="Evaluador de circuitos neuronales" sub="3 preguntas rápidas para conocer tus hábitos de enfoque.">
      <div className="mx-auto max-w-2xl rounded-2xl border bg-card p-8 text-card-foreground">
        <div className="mb-8 flex gap-2">
          {questions.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${i < step ? "bg-primary" : "bg-muted"}`} />
          ))}
        </div>
        {!done ? (
          <div key={step} className="animate-in fade-in slide-in-from-right-4 duration-500">
            <p className="mb-1 text-xs uppercase tracking-widest opacity-60">Pregunta {step + 1} de 3</p>
            <h3 className="mb-6 text-2xl font-semibold">{questions[step].q}</h3>
            <div className="grid gap-3">
              {questions[step].opts.map((o, i) => (
                <button
                  key={o}
                  onClick={() => { setScore((s) => s + i); setStep((s) => s + 1); }}
                  className="rounded-xl border border-border px-5 py-4 text-left transition hover:translate-x-1 hover:bg-accent hover:text-accent-foreground"
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in zoom-in-95 text-center duration-700">
            <Network className="mx-auto mb-4 h-12 w-12" strokeWidth={1.2} />
            <p className="text-xs uppercase tracking-widest opacity-60">Diagnóstico</p>
            <h3 className="mt-2 text-3xl font-semibold">{result.title}</h3>
            <p className="mt-3 opacity-80">{result.text}</p>
            <div className="mt-6 rounded-xl border border-border bg-background/40 p-5 text-left">
              <p className="mb-1 text-sm font-semibold">💡 Tip neurocientífico</p>
              <p className="text-sm opacity-85">{result.tip}</p>
            </div>
            <button onClick={() => { setStep(0); setScore(0); }} className="mt-6 inline-flex items-center gap-2 text-sm underline-offset-4 hover:underline">
              <RotateCw className="h-4 w-4" /> Repetir test
            </button>
          </div>
        )}
      </div>
    </Section>
  );
}

function FlipCard({ myth, fact }: { myth: string; fact: string }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button onClick={() => setFlipped((f) => !f)} className="flip-scene h-72 w-full text-left" aria-label="Girar ficha">
      <div className={`flip-inner relative h-full w-full ${flipped ? "flipped" : ""}`}>
        <div className="flip-face absolute inset-0 flex flex-col justify-between rounded-2xl border bg-card p-6 text-card-foreground">
          <span className="text-xs uppercase tracking-widest opacity-60">Mito</span>
          <p className="font-display text-2xl leading-snug">{myth}</p>
          <span className="flex items-center gap-1 text-xs opacity-60"><RotateCw className="h-3 w-3" /> Clic para ver evidencia</span>
        </div>
        <div className="flip-face flip-back absolute inset-0 flex flex-col justify-between rounded-2xl border border-border bg-accent p-6 text-accent-foreground glow">
          <span className="text-xs uppercase tracking-widest opacity-80">Evidencia</span>
          <p className="text-base leading-relaxed">{fact}</p>
          <span className="text-xs opacity-70">Clic para volver</span>
        </div>
      </div>
    </button>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const field = "w-full rounded-xl border border-input bg-background/60 px-4 py-3 outline-none transition focus:ring-2 focus:ring-ring";
  return (
    <Section id="contacto" kicker="Comunidad" title="Suscríbete o escríbenos" sub="Recibe cápsulas de neurociencia para estudiantes.">
      <div className="glass mx-auto max-w-xl rounded-2xl p-8">
        {sent ? (
          <div className="animate-in fade-in zoom-in-95 py-10 text-center duration-500">
            <Sparkles className="mx-auto mb-4 h-10 w-10" />
            <h3 className="text-3xl font-semibold">¡Gracias por suscribirte!</h3>
            <p className="mt-2 opacity-80">Tu red neuronal acaba de ganar una nueva conexión.</p>
            <button onClick={() => setSent(false)} className="mt-6 text-sm underline-offset-4 hover:underline">Enviar otro mensaje</button>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid gap-4">
            <input required placeholder="Nombre" className={field} />
            <input required type="email" placeholder="Correo electrónico" className={field} />
            <textarea rows={4} placeholder="Mensaje (opcional)" className={field} />
            <label className="flex items-center gap-2 text-sm opacity-80">
              <input type="checkbox" defaultChecked className="accent-accent" /> Quiero recibir el boletín mensual
            </label>
            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:scale-[1.02]">
              <Send className="h-4 w-4" /> Enviar
            </button>
          </form>
        )}
      </div>
    </Section>
  );
}
