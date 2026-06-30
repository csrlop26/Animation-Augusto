"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/FadeIn";
import { Counter } from "@/components/Counter";

/* ─── HERO ─────────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#080808]">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-[#c9a86c] opacity-[0.07] blur-[120px]" />
      </div>

      {/* nav */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-6"
      >
        <span className="text-[#f5f5f5] font-light tracking-[0.2em] text-sm uppercase">
          AugustoCS
        </span>
        <a
          href="#contacto"
          className="text-sm text-[#c9a86c] border border-[#c9a86c40] px-4 py-2 rounded-full hover:bg-[#c9a86c10] transition-colors"
        >
          Hablamos →
        </a>
      </motion.nav>

      {/* phone mockup */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative mb-16"
      >
        <div className="absolute inset-0 scale-75 rounded-[40px] bg-[#c9a86c] opacity-20 blur-[60px]" />
        <div
          className="relative w-[220px] rounded-[36px] bg-[#111] p-[3px]"
          style={{ boxShadow: "0 0 40px #c9a86c25, 0 0 100px #c9a86c10, inset 0 0 0 1px #c9a86c30" }}
        >
          <div className="rounded-[34px] bg-[#0d0d0d] overflow-hidden">
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-16 h-[5px] rounded-full bg-[#1a1a1a]" />
            </div>
            <div className="px-4 pb-6 space-y-3 min-h-[280px]">
              <div className="h-2 w-20 rounded-full bg-[#c9a86c30] mt-2" />
              <div className="h-8 w-full rounded-lg bg-[#1a1a1a] flex items-center px-3 gap-2">
                <div className="w-3 h-3 rounded-full bg-[#c9a86c40]" />
                <div className="h-1.5 w-24 rounded-full bg-[#ffffff15]" />
              </div>
              <div className="space-y-2 pt-1">
                {[80, 60, 90, 50, 70].map((w, i) => (
                  <div key={i} className="h-1.5 rounded-full bg-[#ffffff08]" style={{ width: `${w}%` }} />
                ))}
              </div>
              <div className="mt-4 rounded-xl bg-[#c9a86c12] border border-[#c9a86c20] p-3">
                <div className="h-2 w-28 rounded-full bg-[#c9a86c40] mb-2" />
                <div className="h-1.5 w-20 rounded-full bg-[#ffffff15]" />
              </div>
              <div className="rounded-lg bg-[#c9a86c] py-2 text-center">
                <div className="h-1.5 w-16 rounded-full bg-[#08080850] mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* headline */}
      <div className="relative z-10 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-[clamp(2.5rem,8vw,5rem)] font-light text-[#f5f5f5] leading-[1.1] tracking-tight"
        >
          Webs que{" "}
          <span className="italic text-[#c9a86c]" style={{ textShadow: "0 0 60px #c9a86c50" }}>
            venden.
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-4 text-[#ffffff50] text-base font-light max-w-xs mx-auto leading-relaxed"
        >
          Diseño web y UI que convierte visitantes en clientes.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-8 flex items-center gap-4 justify-center"
        >
          <a
            href="#servicios"
            className="px-6 py-3 rounded-full bg-[#c9a86c] text-[#080808] text-sm font-medium hover:bg-[#d4b87c] transition-colors"
          >
            Ver servicios
          </a>
          <a
            href="#contacto"
            className="px-6 py-3 rounded-full border border-[#ffffff15] text-[#ffffff60] text-sm hover:border-[#ffffff30] hover:text-[#ffffff90] transition-colors"
          >
            Contactar
          </a>
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 flex flex-col items-center gap-2"
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-[#c9a86c40]" />
        <span className="text-[#ffffff30] text-xs tracking-[0.2em] uppercase">Scroll</span>
      </motion.div>
    </section>
  );
}

/* ─── SERVICES ──────────────────────────────────────────────────────────────── */
const services = [
  {
    number: "01",
    title: "Diseño Web",
    description: "Interfaces limpias, modernas y rápidas. Tu marca, elevada al nivel que merece.",
  },
  {
    number: "02",
    title: "Webs que convierten",
    description: "Cada botón, cada sección pensada para que el visitante actúe. No solo diseño, resultados.",
  },
  {
    number: "03",
    title: "UI / UX",
    description: "Experiencias fluidas que retienen. Tu usuario no debería pensar, solo sentir.",
  },
];

function Services() {
  return (
    <section id="servicios" className="bg-[#f8f7f5] py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <p className="text-xs tracking-[0.3em] uppercase text-[#00000040] mb-4">Servicios</p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-light text-[#111] leading-[1.1] mb-16">
            Lo que hacemos
            <br />
            <span className="italic text-[#111111aa]">por tu negocio.</span>
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <FadeIn key={s.number} delay={i * 0.12}>
              <div
                className="group relative rounded-2xl bg-white p-8 transition-all duration-500 hover:scale-[1.02]"
                style={{ boxShadow: "0 0 0 1px #f0b8c015, 0 4px 24px #00000008" }}
              >
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: "0 0 40px #f0b8c030, 0 0 80px #f0b8c015, inset 0 0 0 1px #f0b8c035" }}
                />
                <span className="text-xs text-[#f0b8c0] font-medium tracking-widest">{s.number}</span>
                <h3 className="mt-4 text-xl font-medium text-[#111] leading-snug">{s.title}</h3>
                <p className="mt-3 text-sm text-[#11111180] leading-relaxed font-light">{s.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PROCESS ───────────────────────────────────────────────────────────────── */
function Process() {
  const steps = [
    { label: "Briefing", desc: "Entendemos tu negocio, tu cliente y tu objetivo real." },
    { label: "Diseño", desc: "Propuesta visual alineada con tu marca y enfocada en conversión." },
    { label: "Desarrollo", desc: "Implementación rápida, limpia y optimizada." },
    { label: "Lanzamiento", desc: "Tu web live. Métricas, ajustes y crecimiento." },
  ];

  return (
    <section className="bg-[#080808] py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <p className="text-xs tracking-[0.3em] uppercase text-[#ffffff30] mb-4">Proceso</p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-light text-[#f5f5f5] leading-[1.1] mb-20">
            Simple y{" "}
            <span className="italic text-[#c9a86c]">directo.</span>
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-4 gap-px bg-[#ffffff08] rounded-2xl overflow-hidden">
          {steps.map((step, i) => (
            <FadeIn key={step.label} delay={i * 0.1}>
              <div className="bg-[#080808] p-8 h-full flex flex-col gap-4">
                <span className="text-[#c9a86c40] text-4xl font-light">0{i + 1}</span>
                <h3 className="text-[#f5f5f5] font-medium">{step.label}</h3>
                <p className="text-sm text-[#ffffff40] font-light leading-relaxed">{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── RESULTS ───────────────────────────────────────────────────────────────── */
function Results() {
  const stats = [
    { value: 62, suffix: "%", label: "aumento medio de conversión" },
    { value: 30, suffix: "+", label: "proyectos entregados" },
    { value: 48, suffix: "h", label: "tiempo medio de entrega inicial" },
  ];

  return (
    <section className="bg-[#f8f7f5] py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <p className="text-xs tracking-[0.3em] uppercase text-[#00000040] mb-16">Resultados</p>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-12 md:gap-6">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.15}>
              <div className="flex flex-col gap-2">
                <p className="text-[clamp(3rem,8vw,5rem)] font-light text-[#111] leading-none tracking-tight">
                  <Counter end={s.value} suffix={s.suffix} />
                </p>
                <p className="text-sm text-[#11111160] font-light">{s.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ───────────────────────────────────────────────────────────────────── */
function CTA() {
  return (
    <section id="contacto" className="bg-[#080808] py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <FadeIn>
          <div
            className="relative rounded-3xl bg-[#0f0f0f] p-16 overflow-hidden"
            style={{ boxShadow: "0 0 60px #c9a86c18, 0 0 120px #c9a86c08, inset 0 0 0 1px #c9a86c20" }}
          >
            <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#c9a86c] opacity-[0.08] blur-[80px]" />
            <p className="text-xs tracking-[0.3em] uppercase text-[#c9a86c80] mb-6">¿Listo?</p>
            <h2 className="text-[clamp(1.8rem,5vw,3rem)] font-light text-[#f5f5f5] leading-[1.15] mb-4">
              Tu web está perdiendo{" "}
              <span className="italic text-[#c9a86c]">clientes ahora mismo.</span>
            </h2>
            <p className="text-[#ffffff40] text-sm font-light mb-10 max-w-sm mx-auto leading-relaxed">
              Hablamos 15 minutos. Analizamos tu situación y te decimos exactamente qué está fallando.
            </p>
            <a
              href="mailto:hola@augustocs.com"
              className="inline-block px-8 py-4 rounded-full bg-[#c9a86c] text-[#080808] text-sm font-medium hover:bg-[#d4b87c] transition-colors"
            >
              Hablar con Augusto →
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── FOOTER ────────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-[#ffffff08] py-8 px-6">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-[#ffffff30] text-sm font-light tracking-[0.15em]">AUGUSTOCS</span>
        <div className="flex gap-6 text-xs text-[#ffffff25]">
          <a href="https://instagram.com/augustocs.studio" className="hover:text-[#c9a86c] transition-colors">
            @AugustoCS.studio
          </a>
          <span>AugustoCS.com</span>
        </div>
      </div>
    </footer>
  );
}

/* ─── PAGE ───────────────────────────────────────────────────────────────────── */
export default function Page() {
  return (
    <main>
      <Hero />
      <Services />
      <Process />
      <Results />
      <CTA />
      <Footer />
    </main>
  );
}
