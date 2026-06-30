"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/FadeIn";
import { Counter } from "@/components/Counter";

/* ─── Browser Mockup ───────────────────────────────────────────────────── */
function BrowserMockup() {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden"
      style={{
        boxShadow:
          "0 0 0 1px rgba(184,151,62,0.12), 0 32px 80px rgba(0,0,0,0.6), 0 0 100px rgba(184,151,62,0.06)",
      }}
    >
      {/* Chrome */}
      <div className="flex items-center gap-3 px-4 py-3.5 bg-[#161616] border-b border-white/[0.05]">
        <div className="flex gap-1.5">
          {["#FF5F57", "#FFBD2E", "#27C840"].map((c) => (
            <div key={c} className="w-2.5 h-2.5 rounded-full opacity-50" style={{ background: c }} />
          ))}
        </div>
        <div className="flex-1 mx-3 bg-[#0D0D0D] rounded-md px-3 py-1.5 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#B8973E30]" />
          <span className="text-[10px] text-white/20 font-light tracking-wide">augustocs.com</span>
        </div>
      </div>

      {/* Screen */}
      <div className="bg-[#0D0D0D] p-5 space-y-3.5">
        {/* Nav mock */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.04]">
          <div className="h-2 w-16 rounded-full bg-white/20" />
          <div className="flex gap-3">
            {[9, 11, 8].map((w, i) => (
              <div key={i} className="h-1.5 rounded-full bg-white/[0.08]" style={{ width: w * 4 }} />
            ))}
          </div>
          <div className="h-6 w-20 rounded-full bg-[#B8973E]" />
        </div>

        {/* Hero area */}
        <div className="py-3 space-y-2">
          <div className="h-5 w-2/3 rounded-lg bg-white/12" />
          <div className="h-5 w-1/2 rounded-lg bg-[#B8973E35]" />
          <div className="h-3 w-3/4 rounded-full bg-white/[0.07] mt-4" />
          <div className="h-3 w-2/3 rounded-full bg-white/[0.07]" />
          <div className="flex gap-2 mt-4">
            <div className="h-7 w-24 rounded-full bg-[#B8973E]" />
            <div className="h-7 w-20 rounded-full border border-white/[0.1]" />
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-white/[0.06] p-3 space-y-1.5"
              style={{ background: "rgba(255,255,255,0.025)" }}
            >
              <div className="h-1.5 w-6 rounded-full bg-[#B8973E35]" />
              <div className="h-2.5 w-14 rounded-md bg-white/16" />
              <div className="h-1.5 w-full rounded-full bg-white/[0.07]" />
              <div className="h-1.5 w-4/5 rounded-full bg-white/[0.07]" />
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          {["62%", "30+", "48h"].map((n) => (
            <div
              key={n}
              className="rounded-xl p-3 border border-[#B8973E15]"
              style={{ background: "rgba(184,151,62,0.05)" }}
            >
              <p className="text-[#B8973E] text-sm font-medium mb-1">{n}</p>
              <div className="h-1.5 w-10 rounded-full bg-white/[0.08]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Hero ─────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col bg-[#0B0B0B] overflow-hidden">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute top-1/3 right-1/3 w-[800px] h-[800px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(184,151,62,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Nav */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        className="flex items-center justify-between px-8 lg:px-16 py-6 border-b border-white/[0.05]"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#0B0B0B] text-xs font-bold"
            style={{ background: "#B8973E" }}
          >
            A
          </div>
          <span className="text-[#EFEFEF] text-sm font-light tracking-[0.18em] uppercase font-sans">
            AugustoCS
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-10 text-sm text-white/30 font-light">
          <a href="#servicios" className="hover:text-white/70 transition-colors duration-200">Servicios</a>
          <a href="#proceso" className="hover:text-white/70 transition-colors duration-200">Proceso</a>
          <a href="#contacto" className="hover:text-white/70 transition-colors duration-200">Contacto</a>
        </nav>

        <a
          href="#contacto"
          className="text-sm font-medium text-[#0B0B0B] px-5 py-2.5 rounded-full transition-colors duration-200"
          style={{ background: "#B8973E" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#C9A84E")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#B8973E")}
        >
          Hablamos
        </a>
      </motion.header>

      {/* Main content */}
      <div className="flex-1 grid lg:grid-cols-[1fr_1.05fr] gap-16 lg:gap-24 items-center px-8 lg:px-16 py-20 max-w-7xl mx-auto w-full">
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#B8973E20] mb-9"
            style={{ background: "rgba(184,151,62,0.06)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#B8973E]" />
            <span className="text-[10px] text-[#B8973E] tracking-[0.18em] uppercase font-light">
              Disponible · Proyectos 2025
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.6rem,5vw,4.5rem)] leading-[1.07] tracking-tight text-[#EFEFEF] font-light mb-8"
          >
            Diseño web que{" "}
            <span className="font-serif italic" style={{ color: "#B8973E" }}>
              convierte
            </span>
            <br />
            visitas en{" "}
            <span className="font-serif italic" style={{ color: "#B8973E" }}>
              clientes.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="text-white/40 text-[15px] leading-[1.85] font-light max-w-[400px] mb-10"
          >
            Creamos páginas con una sola obsesión: que cada visita valga.
            Interfaz, copy y estructura al servicio de la conversión.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex items-center gap-3 flex-wrap"
          >
            <a
              href="#contacto"
              className="px-7 py-3.5 rounded-full text-[#0B0B0B] text-sm font-semibold transition-colors duration-200"
              style={{ background: "#B8973E" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#C9A84E")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#B8973E")}
            >
              Empezar proyecto
            </a>
            <a
              href="#servicios"
              className="px-7 py-3.5 rounded-full border border-white/[0.1] text-white/35 text-sm hover:border-white/20 hover:text-white/65 transition-colors duration-200"
            >
              Ver servicios
            </a>
          </motion.div>

          {/* Inline stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-16 pt-8 border-t border-white/[0.07] flex gap-10"
          >
            {[
              { n: "30+", label: "Proyectos" },
              { n: "62%", label: "Conversión ↑" },
              { n: "48h", label: "Entrega inicial" },
            ].map((s) => (
              <div key={s.n}>
                <p className="text-[#B8973E] text-2xl font-light mb-0.5">{s.n}</p>
                <p className="text-white/25 text-xs font-light">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: mockup */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block"
        >
          <BrowserMockup />
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Services ──────────────────────────────────────────────────────────── */
const services = [
  {
    number: "01",
    tag: "Branding Digital",
    title: "Diseño Web",
    description:
      "Interfaces que comunican tu valor antes de que el usuario lea una sola línea. Velocidad, estética y claridad en cada píxel.",
  },
  {
    number: "02",
    tag: "Conversión · CRO",
    title: "Webs que venden",
    description:
      "Cada titular, botón y sección diseñados con un objetivo: que el visitante actúe. No decoración, resultados medibles.",
  },
  {
    number: "03",
    tag: "UX · Producto",
    title: "UI / UX",
    description:
      "El usuario no debería pensar, solo sentir. Flujos intuitivos, jerarquía visual y microinteracciones que retienen.",
  },
];

function Services() {
  return (
    <section id="servicios" className="py-32 px-8 lg:px-16" style={{ background: "#F5F4F0" }}>
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="grid lg:grid-cols-[260px_1fr] gap-12 lg:gap-24 mb-14">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-black/25 font-light mb-3">
                Servicios
              </p>
              <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-light text-[#111] leading-[1.1]">
                Lo que{" "}
                <span className="font-serif italic text-[#111]/55">hacemos.</span>
              </h2>
            </div>
            <div className="flex items-end">
              <p className="text-sm text-black/40 font-light leading-[1.8] max-w-sm">
                Cada proyecto es un sistema completo: diseño, copy, estructura
                y optimización trabajando juntos hacia un solo objetivo.
              </p>
            </div>
          </div>
        </FadeIn>

        <div className="border-t border-black/[0.07]">
          {services.map((s, i) => (
            <FadeIn key={s.number} delay={i * 0.1}>
              <div className="group grid grid-cols-[56px_1fr] lg:grid-cols-[56px_220px_1fr] gap-6 lg:gap-12 py-9 border-b border-black/[0.07] hover:bg-black/[0.018] transition-colors duration-300 px-4 -mx-4 rounded-xl cursor-default">
                <span className="text-xs text-black/22 font-light pt-1.5 tabular-nums">{s.number}</span>
                <div>
                  <span className="text-[9px] tracking-[0.22em] uppercase text-[#B8973E] mb-2.5 block font-medium">
                    {s.tag}
                  </span>
                  <h3 className="text-xl font-light text-[#111] group-hover:text-[#B8973E] transition-colors duration-300">
                    {s.title}
                  </h3>
                </div>
                <p className="col-span-2 lg:col-span-1 text-sm text-black/42 font-light leading-[1.85] self-center">
                  {s.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Process ───────────────────────────────────────────────────────────── */
function Process() {
  const steps = [
    {
      n: "01",
      label: "Briefing",
      desc: "Entendemos tu negocio, tu cliente y qué le impide convertir. Sin plantillas, cada proyecto desde cero.",
    },
    {
      n: "02",
      label: "Diseño",
      desc: "Propuesta visual con copy, jerarquía y estructura de conversión integrados desde el primer día.",
    },
    {
      n: "03",
      label: "Desarrollo",
      desc: "Implementación rápida, código limpio, rendimiento optimizado. Sin bloatware.",
    },
    {
      n: "04",
      label: "Lanzamiento",
      desc: "Tu web live con métricas configuradas. Revisiones incluidas en el primer mes.",
    },
  ];

  return (
    <section id="proceso" className="py-32 px-8 lg:px-16 bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-20 gap-8">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/20 font-light mb-3">
                Proceso
              </p>
              <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-light text-[#EFEFEF] leading-[1.1]">
                Simple y{" "}
                <span className="font-serif italic text-[#B8973E]">sin sorpresas.</span>
              </h2>
            </div>
            <p className="text-sm text-white/22 font-light max-w-xs leading-[1.8] lg:text-right">
              De la idea a la web publicada en el menor tiempo posible, sin sacrificar calidad.
            </p>
          </div>
        </FadeIn>

        <div
          className="grid md:grid-cols-4 gap-px rounded-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          {steps.map((step, i) => (
            <FadeIn key={step.n} delay={i * 0.08}>
              <div className="bg-[#0B0B0B] p-8 lg:p-10 h-full flex flex-col gap-8 group hover:bg-[#0E0E0E] transition-colors duration-300">
                <div className="flex items-start justify-between">
                  <span
                    className="font-serif text-5xl leading-none italic"
                    style={{ color: "rgba(184,151,62,0.2)" }}
                  >
                    {step.n}
                  </span>
                  <span className="text-white/20 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2">
                    →
                  </span>
                </div>
                <div>
                  <h3 className="text-[#EFEFEF] font-medium text-lg mb-3">{step.label}</h3>
                  <p className="text-sm text-white/28 font-light leading-[1.85]">{step.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Stats ─────────────────────────────────────────────────────────────── */
function Stats() {
  const stats = [
    { value: 62, suffix: "%", label: "aumento medio de conversión" },
    { value: 30, suffix: "+", label: "proyectos entregados" },
    { value: 48, suffix: "h", label: "primera entrega" },
    { value: 100, suffix: "%", label: "proyectos a tiempo" },
  ];

  return (
    <section className="py-32 px-8 lg:px-16" style={{ background: "#F5F4F0" }}>
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <p className="text-[10px] tracking-[0.3em] uppercase text-black/25 font-light mb-20">
            Resultados
          </p>
        </FadeIn>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 lg:divide-x lg:divide-black/[0.07]">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.1}>
              <div className="lg:px-10 first:lg:pl-0 last:lg:pr-0">
                <p className="font-serif italic text-[clamp(3.5rem,5.5vw,5rem)] text-[#111] leading-none mb-3">
                  <Counter end={s.value} suffix={s.suffix} />
                </p>
                <p className="text-xs text-black/35 font-light leading-[1.7]">{s.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ───────────────────────────────────────────────────────────────── */
function CTA() {
  return (
    <section id="contacto" className="py-32 px-8 lg:px-16 bg-[#0B0B0B]">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div
            className="relative rounded-3xl p-12 lg:p-20 overflow-hidden text-center"
            style={{
              background: "linear-gradient(160deg, #111111 0%, #0D0D0D 100%)",
              boxShadow:
                "0 0 0 1px rgba(184,151,62,0.14), 0 0 100px rgba(184,151,62,0.07), 0 40px 80px rgba(0,0,0,0.4)",
            }}
          >
            {/* Top glow */}
            <div
              className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(184,151,62,0.1) 0%, transparent 70%)",
              }}
            />

            <p className="text-[10px] tracking-[0.3em] uppercase text-[#B8973E] opacity-60 mb-8 font-light">
              ¿Listo para convertir?
            </p>
            <h2 className="font-light text-[clamp(1.8rem,4vw,3.5rem)] text-[#EFEFEF] leading-[1.1] mb-6">
              Tu web actual está{" "}
              <span className="font-serif italic text-[#B8973E]">perdiendo clientes</span>
              <br className="hidden sm:block" />
              {" "}cada hora que pasa.
            </h2>
            <p className="text-white/28 text-[15px] font-light mb-12 max-w-sm mx-auto leading-[1.85]">
              15 minutos, sin compromiso. Te digo exactamente qué está fallando y cómo arreglarlo.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a
                href="mailto:hola@augustocs.com"
                className="px-8 py-4 rounded-full text-[#0B0B0B] text-sm font-semibold transition-colors duration-200"
                style={{ background: "#B8973E" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#C9A84E")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#B8973E")}
              >
                Hablar con Augusto →
              </a>
              <a
                href="https://instagram.com/augustocs.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full border border-white/[0.1] text-white/30 text-sm hover:border-white/20 hover:text-white/55 transition-colors duration-200"
              >
                @AugustoCS.studio
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-[#0B0B0B] border-t border-white/[0.05] py-8 px-8 lg:px-16">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="w-5 h-5 rounded-md flex items-center justify-center text-[#0B0B0B] text-[9px] font-bold"
            style={{ background: "#B8973E" }}
          >
            A
          </div>
          <span className="text-white/18 text-xs font-light tracking-[0.18em] uppercase">AugustoCS</span>
        </div>
        <p className="text-white/12 text-xs font-light">&copy; 2025</p>
        <div className="flex gap-6">
          <a
            href="https://instagram.com/augustocs.studio"
            className="text-white/20 text-xs hover:text-[#B8973E] transition-colors duration-200"
          >
            Instagram
          </a>
          <a
            href="mailto:hola@augustocs.com"
            className="text-white/20 text-xs hover:text-[#B8973E] transition-colors duration-200"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────── */
export default function Page() {
  return (
    <main>
      <Hero />
      <Services />
      <Process />
      <Stats />
      <CTA />
      <Footer />
    </main>
  );
}
