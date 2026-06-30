"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/FadeIn";
import { Counter } from "@/components/Counter";
import { WordReveal } from "@/components/WordReveal";

/* ─── Marquee ──────────────────────────────────────────────────────────── */
function Marquee() {
  const items = [
    "Diseño Web", "Conversión", "UI / UX", "Landing Pages",
    "E-commerce", "Branding Digital", "Motion Design", "Webs que venden",
  ];
  return (
    <div className="border-y border-white/[0.05] py-4 overflow-hidden bg-[#0B0B0B]">
      <div className="flex w-max animate-marquee">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap px-7 text-[11px] font-light tracking-[0.22em] uppercase text-white/18 flex items-center gap-7"
          >
            {item}
            <span style={{ color: "#B8973E", opacity: 0.35 }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Browser Mockup (desktop hero only) ──────────────────────────────── */
function BrowserMockup() {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden"
      style={{
        boxShadow:
          "0 0 0 1px rgba(184,151,62,0.12), 0 32px 80px rgba(0,0,0,0.6), 0 0 100px rgba(184,151,62,0.05)",
      }}
    >
      <div className="flex items-center gap-3 px-4 py-3.5 bg-[#161616] border-b border-white/[0.05]">
        <div className="flex gap-1.5">
          {["#FF5F57", "#FFBD2E", "#27C840"].map((c) => (
            <div key={c} className="w-2.5 h-2.5 rounded-full opacity-50" style={{ background: c }} />
          ))}
        </div>
        <div className="flex-1 mx-3 bg-[#0D0D0D] rounded-md px-3 py-1.5 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: "#B8973E40" }} />
          <span className="text-[10px] text-white/20 font-light tracking-wide">augustocs.com</span>
        </div>
      </div>
      <div className="bg-[#0D0D0D] p-5 space-y-3.5">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.04]">
          <div className="h-2 w-16 rounded-full bg-white/20" />
          <div className="flex gap-3">
            {[36, 44, 32].map((w, i) => (
              <div key={i} className="h-1.5 rounded-full bg-white/[0.08]" style={{ width: w }} />
            ))}
          </div>
          <div className="h-6 w-20 rounded-full" style={{ background: "#B8973E" }} />
        </div>
        <div className="py-3 space-y-2">
          <div className="h-5 w-2/3 rounded-lg bg-white/12" />
          <div className="h-5 w-1/2 rounded-lg" style={{ background: "#B8973E35" }} />
          <div className="h-3 w-3/4 rounded-full bg-white/[0.07] mt-4" />
          <div className="h-3 w-2/3 rounded-full bg-white/[0.07]" />
          <div className="flex gap-2 mt-4">
            <div className="h-7 w-24 rounded-full" style={{ background: "#B8973E" }} />
            <div className="h-7 w-20 rounded-full border border-white/[0.1]" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 pt-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-white/[0.06] p-3 space-y-1.5" style={{ background: "rgba(255,255,255,0.025)" }}>
              <div className="h-1.5 w-6 rounded-full" style={{ background: "#B8973E35" }} />
              <div className="h-2.5 w-14 rounded-md bg-white/16" />
              <div className="h-1.5 w-full rounded-full bg-white/[0.07]" />
              <div className="h-1.5 w-4/5 rounded-full bg-white/[0.07]" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {["62%", "30+", "48h"].map((n) => (
            <div key={n} className="rounded-xl p-3 border border-[#B8973E15]" style={{ background: "rgba(184,151,62,0.05)" }}>
              <p className="text-sm font-medium mb-1" style={{ color: "#B8973E" }}>{n}</p>
              <div className="h-1.5 w-10 rounded-full bg-white/[0.08]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Phone Placeholder (work section) ───────────────────────────────── */
interface PhoneProps {
  number: string;
  category: string;
  hint: string;
  gradient: string;
}
function PhonePlaceholder({ number, category, hint, gradient }: PhoneProps) {
  return (
    <div className="flex flex-col gap-4">
      <div
        className="relative w-full rounded-[38px] overflow-hidden border border-white/[0.08]"
        style={{
          aspectRatio: "9/19.5",
          boxShadow: "0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
        }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-0 right-0 flex justify-center pt-3 z-10">
          <div className="w-20 h-[22px] rounded-full bg-[#0B0B0B]" />
        </div>

        {/* Placeholder content */}
        <div className={`absolute inset-0 ${gradient} flex flex-col`}>
          {/* Simulated nav */}
          <div className="mt-14 px-5 flex items-center justify-between">
            <div className="h-2 w-12 rounded-full bg-white/20" />
            <div className="h-5 w-14 rounded-full" style={{ background: "#B8973E30" }} />
          </div>

          {/* Simulated hero content */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 gap-3">
            {/* "+" add screenshot button */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              className="w-12 h-12 rounded-full border border-[#B8973E35] flex items-center justify-center mb-1 cursor-pointer"
              style={{ background: "rgba(184,151,62,0.06)" }}
            >
              <span className="text-2xl font-light leading-none" style={{ color: "#B8973E60" }}>+</span>
            </motion.div>
            <p className="text-[10px] font-light tracking-[0.2em] uppercase text-white/20">Añadir captura</p>
            <p className="text-[9px] tracking-widest uppercase mt-0.5" style={{ color: "#B8973E", opacity: 0.5 }}>{hint}</p>
          </div>

          {/* Simulated bottom card */}
          <div className="mx-5 mb-8 rounded-2xl border border-white/[0.07] p-4" style={{ background: "rgba(255,255,255,0.03)" }}>
            <div className="h-2 w-20 rounded-full bg-white/15 mb-2" />
            <div className="h-1.5 w-full rounded-full bg-white/[0.07] mb-1" />
            <div className="h-1.5 w-3/4 rounded-full bg-white/[0.07]" />
          </div>
        </div>

        {/* Shimmer overlay */}
        <div className="absolute inset-0 animate-shimmer pointer-events-none" />
      </div>

      {/* Label */}
      <div className="px-1">
        <p className="text-[9px] tracking-[0.22em] uppercase mb-1.5" style={{ color: "#B8973E", opacity: 0.7 }}>{category}</p>
        <p className="text-sm font-light text-white/35">{number}</p>
      </div>
    </div>
  );
}

/* ─── Hero ─────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col bg-[#0B0B0B] overflow-hidden">
      {/* Ambient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 65% 40%, rgba(184,151,62,0.055) 0%, transparent 70%)",
        }}
      />

      {/* Nav */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        className="flex items-center justify-between px-5 lg:px-16 py-5 border-b border-white/[0.05] relative z-10"
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#0B0B0B] text-xs font-bold"
            style={{ background: "#B8973E" }}
          >
            A
          </div>
          <span className="text-[#EFEFEF] text-sm font-light tracking-[0.18em] uppercase">AugustoCS</span>
        </div>
        <nav className="hidden md:flex items-center gap-10 text-sm text-white/30 font-light">
          <a href="#servicios" className="hover:text-white/70 transition-colors">Servicios</a>
          <a href="#trabajo" className="hover:text-white/70 transition-colors">Trabajo</a>
          <a href="#contacto" className="hover:text-white/70 transition-colors">Contacto</a>
        </nav>
        <a
          href="#contacto"
          className="text-sm font-medium text-[#0B0B0B] px-5 py-2.5 rounded-full transition-all hover:scale-105"
          style={{ background: "#B8973E" }}
        >
          Hablamos
        </a>
      </motion.header>

      {/* Content */}
      <div className="flex-1 grid lg:grid-cols-[1fr_1.05fr] gap-8 lg:gap-20 items-center px-5 lg:px-16 py-12 lg:py-20 max-w-7xl mx-auto w-full relative z-10">

        {/* Left / top on mobile */}
        <div className="order-2 lg:order-1">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#B8973E20] mb-7 lg:mb-9"
            style={{ background: "rgba(184,151,62,0.06)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#B8973E" }} />
            <span className="text-[10px] tracking-[0.18em] uppercase font-light" style={{ color: "#B8973E" }}>
              Disponible · Proyectos 2025
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-[clamp(2.6rem,7vw,4.5rem)] leading-[1.07] tracking-tight text-[#EFEFEF] font-light mb-7 lg:mb-8">
            <WordReveal text="Diseño web que" immediate stagger={0.06} />
            <br />
            <WordReveal
              text="convierte"
              immediate
              delay={0.22}
              className="font-serif italic"
              stagger={0.04}
            />
            <span className="font-light text-[#EFEFEF]">
              <WordReveal text=" visitas en" immediate delay={0.3} stagger={0.06} />
            </span>
            <br />
            <WordReveal
              text="clientes."
              immediate
              delay={0.46}
              className="font-serif italic"
              stagger={0.04}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.65 }}
            className="text-white/38 text-[15px] leading-[1.85] font-light max-w-[380px] mb-9"
          >
            Creamos páginas con una sola obsesión: que cada visita valga.
            Interfaz, copy y estructura al servicio de la conversión.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="flex items-center gap-3 flex-wrap"
          >
            <a
              href="#contacto"
              className="px-7 py-3.5 rounded-full text-[#0B0B0B] text-sm font-semibold transition-all hover:scale-105 active:scale-95"
              style={{ background: "#B8973E" }}
            >
              Empezar proyecto
            </a>
            <a
              href="#servicios"
              className="px-7 py-3.5 rounded-full border border-white/[0.1] text-white/35 text-sm hover:border-white/20 hover:text-white/65 transition-colors"
            >
              Ver servicios
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 pt-7 border-t border-white/[0.07] flex gap-8 lg:gap-10"
          >
            {[
              { n: "30+", label: "Proyectos" },
              { n: "62%", label: "Conversión ↑" },
              { n: "48h", label: "1ª entrega" },
            ].map((s) => (
              <div key={s.n}>
                <p className="text-2xl font-light mb-0.5" style={{ color: "#B8973E" }}>{s.n}</p>
                <p className="text-white/25 text-xs font-light">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Browser mockup (desktop) / Phone mockup (mobile) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 lg:order-2"
        >
          {/* Desktop: browser */}
          <div className="hidden lg:block">
            <BrowserMockup />
          </div>

          {/* Mobile: centered phone */}
          <div className="flex justify-center lg:hidden">
            <div
              className="w-[200px] rounded-[34px] overflow-hidden border border-white/[0.08]"
              style={{ boxShadow: "0 0 0 1px rgba(184,151,62,0.12), 0 24px 60px rgba(0,0,0,0.5), 0 0 80px rgba(184,151,62,0.06)" }}
            >
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-16 h-[5px] rounded-full bg-white/10" />
              </div>
              <div className="px-4 pb-5 space-y-2.5 min-h-[220px]">
                <div className="h-2 w-20 rounded-full mt-2" style={{ background: "#B8973E30" }} />
                <div className="h-7 w-full rounded-lg bg-[#1a1a1a] flex items-center px-3 gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#B8973E40" }} />
                  <div className="h-1.5 w-20 rounded-full bg-white/12" />
                </div>
                <div className="space-y-1.5 pt-0.5">
                  {[75, 55, 85, 45].map((w, i) => (
                    <div key={i} className="h-1.5 rounded-full bg-white/[0.07]" style={{ width: `${w}%` }} />
                  ))}
                </div>
                <div className="rounded-xl border border-[#B8973E18] p-2.5" style={{ background: "rgba(184,151,62,0.07)" }}>
                  <div className="h-2 w-20 rounded-full mb-1.5" style={{ background: "#B8973E35" }} />
                  <div className="h-1.5 w-14 rounded-full bg-white/12" />
                </div>
                <div className="rounded-lg py-1.5 text-center" style={{ background: "#B8973E" }}>
                  <div className="h-1.5 w-12 rounded-full bg-black/30 mx-auto" />
                </div>
              </div>
            </div>
          </div>
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
    description: "Interfaces que comunican tu valor antes de que el usuario lea una sola línea. Velocidad, estética y claridad en cada píxel.",
  },
  {
    number: "02",
    tag: "Conversión · CRO",
    title: "Webs que venden",
    description: "Cada titular, botón y sección diseñados con un objetivo: que el visitante actúe. No decoración, resultados medibles.",
  },
  {
    number: "03",
    tag: "UX · Producto",
    title: "UI / UX",
    description: "El usuario no debería pensar, solo sentir. Flujos intuitivos, jerarquía visual y microinteracciones que retienen.",
  },
];

function Services() {
  return (
    <section id="servicios" className="py-24 lg:py-32 px-5 lg:px-16" style={{ background: "#F5F4F0" }}>
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="grid lg:grid-cols-[240px_1fr] gap-10 lg:gap-24 mb-12 lg:mb-14">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-black/25 font-light mb-3">Servicios</p>
              <h2 className="text-[clamp(2rem,5vw,3rem)] font-light text-[#111] leading-[1.1]">
                Lo que{" "}
                <span className="font-serif italic text-[#111]/50">hacemos.</span>
              </h2>
            </div>
            <div className="flex lg:items-end">
              <p className="text-sm text-black/38 font-light leading-[1.85] max-w-sm">
                Cada proyecto es un sistema completo: diseño, copy, estructura
                y optimización trabajando juntos hacia un solo objetivo.
              </p>
            </div>
          </div>
        </FadeIn>

        <div className="border-t border-black/[0.07]">
          {services.map((s, i) => (
            <FadeIn key={s.number} delay={i * 0.08} direction="left">
              <div className="group grid grid-cols-[44px_1fr] lg:grid-cols-[44px_200px_1fr] gap-5 lg:gap-12 py-8 lg:py-9 border-b border-black/[0.07] hover:bg-black/[0.018] transition-colors duration-300 px-3 -mx-3 rounded-xl cursor-default">
                <span className="text-xs text-black/22 font-light pt-1 tabular-nums">{s.number}</span>
                <div>
                  <span className="text-[9px] tracking-[0.22em] uppercase mb-2 block font-medium" style={{ color: "#B8973E" }}>{s.tag}</span>
                  <h3 className="text-lg lg:text-xl font-light text-[#111] group-hover:text-[#B8973E] transition-colors duration-300">{s.title}</h3>
                </div>
                <p className="col-span-2 lg:col-span-1 text-sm text-black/40 font-light leading-[1.85] lg:self-center">{s.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Work / Portfolio ──────────────────────────────────────────────────── */
const projects = [
  {
    number: "Proyecto 01",
    category: "E-commerce",
    hint: "captura de tienda online",
    gradient: "bg-gradient-to-b from-[#B8973E08] via-[#0D0D0D] to-[#0B0B0B]",
  },
  {
    number: "Proyecto 02",
    category: "Hostelería / Restaurante",
    hint: "captura de web gastronómica",
    gradient: "bg-gradient-to-b from-[#7B4B2A08] via-[#0D0D0D] to-[#0B0B0B]",
  },
  {
    number: "Proyecto 03",
    category: "Marca / Branding",
    hint: "captura de web de marca",
    gradient: "bg-gradient-to-b from-[#6B7A5A08] via-[#0D0D0D] to-[#0B0B0B]",
  },
];

function Work() {
  return (
    <section id="trabajo" className="py-24 lg:py-32 bg-[#0B0B0B] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-16">
        <FadeIn>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14 lg:mb-16">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/20 font-light mb-3">Trabajo</p>
              <h2 className="text-[clamp(2rem,4.5vw,3rem)] font-light text-[#EFEFEF] leading-[1.1]">
                Proyectos{" "}
                <span className="font-serif italic" style={{ color: "#B8973E" }}>recientes.</span>
              </h2>
            </div>
            <p className="text-sm text-white/22 font-light max-w-xs lg:text-right leading-[1.8]">
              Webs reales, resultados reales.
              Cada proyecto es único y construido desde cero.
            </p>
          </div>
        </FadeIn>

        {/* Mobile: horizontal snap scroll — Desktop: 3-column grid */}
        <div className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-none lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
          {projects.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="flex-shrink-0 w-[72vw] max-w-[300px] snap-center lg:w-auto lg:max-w-none"
            >
              <PhonePlaceholder {...p} />
            </motion.div>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <p className="text-center text-[10px] tracking-[0.25em] uppercase text-white/18 mt-10 font-light">
            Próximamente · Añade tus capturas en los espacios de arriba
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Process ───────────────────────────────────────────────────────────── */
function Process() {
  const steps = [
    { n: "01", label: "Briefing", desc: "Entendemos tu negocio, tu cliente y qué le impide convertir. Sin plantillas, cada proyecto desde cero." },
    { n: "02", label: "Diseño", desc: "Propuesta visual con copy, jerarquía y estructura de conversión integrados desde el primer día." },
    { n: "03", label: "Desarrollo", desc: "Implementación rápida, código limpio, rendimiento optimizado. Sin bloatware." },
    { n: "04", label: "Lanzamiento", desc: "Tu web live con métricas configuradas. Revisiones incluidas en el primer mes." },
  ];

  return (
    <section id="proceso" className="py-24 lg:py-32 px-5 lg:px-16 bg-[#F5F4F0]">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14 lg:mb-20">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-black/25 font-light mb-3">Proceso</p>
              <h2 className="text-[clamp(2rem,4.5vw,3rem)] font-light text-[#111] leading-[1.1]">
                Simple y{" "}
                <span className="font-serif italic text-[#111]/45">sin sorpresas.</span>
              </h2>
            </div>
            <p className="text-sm text-black/35 font-light max-w-xs leading-[1.8] lg:text-right">
              De la idea a la web publicada en el menor tiempo posible, sin sacrificar calidad.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden bg-black/[0.07]">
          {steps.map((step, i) => (
            <FadeIn key={step.n} delay={i * 0.08}>
              <div className="bg-[#F5F4F0] p-7 lg:p-10 h-full flex flex-col gap-5 group hover:bg-[#F0EEE9] transition-colors duration-300">
                <span className="font-serif text-4xl lg:text-5xl leading-none italic text-[#111]/12">{step.n}</span>
                <div>
                  <h3 className="text-[#111] font-medium text-base lg:text-lg mb-2.5">{step.label}</h3>
                  <p className="text-xs lg:text-sm text-black/35 font-light leading-[1.85]">{step.desc}</p>
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
    <section className="py-24 lg:py-32 px-5 lg:px-16 bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/20 font-light mb-16 lg:mb-20">Resultados</p>
        </FadeIn>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0 lg:divide-x lg:divide-white/[0.06]">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.1}>
              <div className="lg:px-10 first:lg:pl-0 last:lg:pr-0">
                <p className="font-serif italic text-[clamp(3rem,7vw,5rem)] text-[#EFEFEF] leading-none mb-3">
                  <Counter end={s.value} suffix={s.suffix} />
                </p>
                <p className="text-[11px] text-white/30 font-light leading-[1.7]">{s.label}</p>
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
    <section id="contacto" className="py-24 lg:py-32 px-5 lg:px-16 bg-[#0B0B0B]">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div
            className="relative rounded-2xl lg:rounded-3xl p-10 lg:p-20 overflow-hidden text-center"
            style={{
              background: "linear-gradient(160deg, #111111 0%, #0E0E0E 100%)",
              boxShadow: "0 0 0 1px rgba(184,151,62,0.13), 0 0 100px rgba(184,151,62,0.06), 0 40px 80px rgba(0,0,0,0.4)",
            }}
          >
            <div
              className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(184,151,62,0.09) 0%, transparent 70%)" }}
            />
            <p className="text-[10px] tracking-[0.3em] uppercase font-light mb-7" style={{ color: "#B8973E", opacity: 0.6 }}>
              ¿Listo para convertir?
            </p>
            <h2 className="font-light text-[clamp(1.8rem,4.5vw,3.5rem)] text-[#EFEFEF] leading-[1.1] mb-5">
              Tu web actual está{" "}
              <span className="font-serif italic" style={{ color: "#B8973E" }}>perdiendo clientes</span>
              <br className="hidden sm:block" />
              {" "}cada hora que pasa.
            </h2>
            <p className="text-white/28 text-[15px] font-light mb-10 max-w-sm mx-auto leading-[1.85]">
              15 minutos, sin compromiso. Te digo exactamente qué está fallando y cómo arreglarlo.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <a
                href="mailto:hola@augustocs.com"
                className="px-7 py-4 rounded-full text-[#0B0B0B] text-sm font-semibold transition-all hover:scale-105 active:scale-95"
                style={{ background: "#B8973E" }}
              >
                Hablar con Augusto →
              </a>
              <a
                href="https://instagram.com/augustocs.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-4 rounded-full border border-white/[0.1] text-white/30 text-sm hover:border-white/20 hover:text-white/55 transition-colors"
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
    <footer className="bg-[#0B0B0B] border-t border-white/[0.05] py-7 px-5 lg:px-16">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md flex items-center justify-center text-[#0B0B0B] text-[9px] font-bold" style={{ background: "#B8973E" }}>A</div>
          <span className="text-white/18 text-xs font-light tracking-[0.18em] uppercase">AugustoCS</span>
        </div>
        <p className="text-white/12 text-xs font-light">&copy; 2025</p>
        <div className="flex gap-5">
          <a href="https://instagram.com/augustocs.studio" className="text-white/20 text-xs hover:text-[#B8973E] transition-colors">IG</a>
          <a href="mailto:hola@augustocs.com" className="text-white/20 text-xs hover:text-[#B8973E] transition-colors">Email</a>
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
      <Marquee />
      <Services />
      <Work />
      <Marquee />
      <Process />
      <Stats />
      <CTA />
      <Footer />
    </main>
  );
}
