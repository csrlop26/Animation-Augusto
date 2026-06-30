"use client";

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { noise2D } from "@remotion/noise";

if (typeof document !== "undefined") {
  const id = "__augusto-reel-fonts";
  if (!document.getElementById(id)) {
    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      @font-face {
        font-family: 'InterVar';
        src: url('/fonts/Inter-variable.woff2') format('woff2');
        font-weight: 100 900;
        font-style: normal;
      }
    `;
    document.head.appendChild(style);
  }
}

const BG = "#F0EFEB";
const INK = "#1A1A1A";
const GOLD = "#B8973E";

const ease = Easing.bezier(0.16, 1, 0.3, 1);

function fi(f: number, from: number, to: number, a: number, b: number): number {
  return interpolate(f, [from, to], [a, b], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
}

function blurReveal(f: number, start: number, dur = 22) {
  return {
    opacity: fi(f, start, start + dur, 0, 1),
    filter: `blur(${fi(f, start, start + dur, 12, 0)}px)`,
  };
}

function glowPulse(f: number, base: number, amp: number, period: number) {
  return base + Math.sin((f / period) * Math.PI * 2) * amp;
}

function organicFloat(f: number, seedX: string, seedY: string, entryFrame = 80) {
  const progress = fi(f, entryFrame, entryFrame + 20, 0, 1);
  return {
    x: noise2D(seedX, f / 90, 0) * 5 * progress,
    y: noise2D(seedY, f / 70, 0) * 14 * progress,
  };
}

// ── Global overlays ───────────────────────────────────────────

const GrainOverlay: React.FC = () => {
  const f = useCurrentFrame();
  const seed = f % 600;
  return (
    <AbsoluteFill
      style={{
        zIndex: 300,
        pointerEvents: "none",
        mixBlendMode: "overlay",
        opacity: 0.055,
      }}
    >
      <svg width="1080" height="1920" style={{ position: "absolute" }}>
        <defs>
          <filter id={`grain-${seed}`} x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.72 0.75"
              numOctaves="4"
              seed={seed}
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <rect
          x="0" y="0" width="1080" height="1920"
          filter={`url(#grain-${seed})`}
        />
      </svg>
    </AbsoluteFill>
  );
};

const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      zIndex: 250,
      pointerEvents: "none",
      background:
        "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(0,0,0,0.38) 100%)",
    }}
  />
);

// ── Scene 1: Intro (90f) ──────────────────────────────────────
const SceneIntro: React.FC = () => {
  const f = useCurrentFrame();
  const ls = fi(f, 5, 75, 0.28, 0.5);

  return (
    <AbsoluteFill
      style={{
        background: BG,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p
        style={{
          fontFamily: "'InterVar', system-ui",
          fontWeight: 500,
          fontSize: 30,
          letterSpacing: `${ls}em`,
          color: INK,
          textTransform: "uppercase",
          margin: 0,
          ...blurReveal(f, 0, 28),
        }}
      >
        AugustoCS
      </p>
    </AbsoluteFill>
  );
};

// ── Scene 2: Hook (180f) ──────────────────────────────────────
const SceneHook: React.FC = () => {
  const f = useCurrentFrame();
  const glowOp = glowPulse(f, fi(f, 0, 60, 0, 0.9), 0.08, 90);

  return (
    <AbsoluteFill
      style={{
        background: BG,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 860,
          height: 560,
          background: "radial-gradient(ellipse, rgba(184,151,62,0.26) 0%, transparent 65%)",
          opacity: glowOp,
          filter: "blur(80px)",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          zIndex: 1,
          paddingLeft: 60,
          paddingRight: 60,
        }}
      >
        <p
          style={{
            fontFamily: "'InterVar', system-ui",
            fontWeight: 800,
            fontSize: 140,
            color: INK,
            margin: 0,
            lineHeight: 1.0,
            textAlign: "center",
            ...blurReveal(f, 0, 26),
          }}
        >
          Diseño web
        </p>
        <p
          style={{
            fontFamily: "'InterVar', system-ui",
            fontWeight: 800,
            fontSize: 140,
            color: GOLD,
            margin: 0,
            lineHeight: 1.0,
            textAlign: "center",
            ...blurReveal(f, 22, 26),
          }}
        >
          que convierte.
        </p>
      </div>
      <p
        style={{
          fontFamily: "'InterVar', system-ui",
          fontWeight: 400,
          fontSize: 38,
          color: INK,
          marginTop: 52,
          letterSpacing: "0.02em",
          zIndex: 1,
          textAlign: "center",
          paddingLeft: 80,
          paddingRight: 80,
          ...blurReveal(f, 72, 22),
          opacity: (blurReveal(f, 72, 22).opacity as number) * 0.55,
        }}
      >
        Webs a medida que generan resultados.
      </p>
    </AbsoluteFill>
  );
};

// ── Phone screen — real text content ─────────────────────────
const PhoneScreen: React.FC<{ f: number }> = ({ f }) => {
  const headerStyle = blurReveal(f, 75, 18);
  const heroStyle = { opacity: fi(f, 88, 108, 0, 1), transform: `translateY(${fi(f, 88, 108, 12, 0)}px)` };
  const btnStyle = { opacity: fi(f, 108, 126, 0, 1), transform: `scale(${fi(f, 108, 126, 0.88, 1)})` };
  const card1Style = { opacity: fi(f, 118, 136, 0, 1), transform: `translateX(${fi(f, 118, 136, 22, 0)}px)` };
  const card2Style = { opacity: fi(f, 130, 148, 0, 1), transform: `translateX(${fi(f, 130, 148, 22, 0)}px)` };
  const card3Style = { opacity: fi(f, 142, 160, 0, 1), transform: `translateX(${fi(f, 142, 160, 22, 0)}px)` };

  const cards = [
    { style: card1Style, accent: "#B8973E22", label: "Diseño web", sub: "Landing page" },
    { style: card2Style, accent: "#0B0B0B0D", label: "E-commerce", sub: "Tienda online" },
    { style: card3Style, accent: "#0B0B0B0D", label: "Branding", sub: "Identidad visual" },
  ];

  return (
    <div style={{ background: "#fff", width: "100%", height: "100%" }}>
      <div
        style={{
          background: "#0B0B0B",
          height: 72,
          display: "flex",
          alignItems: "flex-end",
          paddingLeft: 24,
          paddingBottom: 12,
          paddingRight: 24,
          justifyContent: "space-between",
          ...headerStyle,
        }}
      >
        <p style={{ fontFamily: "'InterVar', system-ui", fontWeight: 700, fontSize: 13, color: GOLD, margin: 0, letterSpacing: "0.06em" }}>
          AugustoCS
        </p>
        <div style={{ display: "flex", gap: 14 }}>
          {["Inicio", "Servicios", "Contacto"].map((label, i) => (
            <p key={i} style={{ fontFamily: "'InterVar', system-ui", fontSize: 9, color: "rgba(255,255,255,0.42)", margin: 0 }}>
              {label}
            </p>
          ))}
        </div>
      </div>

      <div
        style={{
          background: "linear-gradient(165deg, #0f0f0f 0%, #1a1230 100%)",
          height: 230,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 24,
          gap: 0,
          ...heroStyle,
        }}
      >
        <p style={{ fontFamily: "'InterVar', system-ui", fontWeight: 800, fontSize: 20, color: "rgba(255,255,255,0.95)", margin: 0, lineHeight: 1.15 }}>
          Tu Negocio Online
        </p>
        <p style={{ fontFamily: "'InterVar', system-ui", fontWeight: 400, fontSize: 12, color: "rgba(255,255,255,0.48)", margin: "6px 0 0" }}>
          Diseño web que convierte visitas
        </p>
        <div
          style={{
            ...btnStyle,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: GOLD,
            borderRadius: 10,
            marginTop: 14,
            paddingLeft: 16,
            paddingRight: 16,
            height: 34,
            width: "fit-content",
          }}
        >
          <p style={{ fontFamily: "'InterVar', system-ui", fontWeight: 600, fontSize: 11, color: "#fff", margin: 0 }}>
            Empieza hoy →
          </p>
        </div>
      </div>

      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12, background: "#fafafa" }}>
        {cards.map((card, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
              borderRadius: 14,
              padding: "13px 15px",
              display: "flex",
              alignItems: "center",
              gap: 13,
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              ...card.style,
            }}
          >
            <div style={{ width: 38, height: 38, borderRadius: 10, background: card.accent, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "'InterVar', system-ui", fontWeight: 600, fontSize: 11, color: "#1A1A1A", margin: 0 }}>
                {card.label}
              </p>
              <p style={{ fontFamily: "'InterVar', system-ui", fontWeight: 400, fontSize: 9, color: "rgba(26,26,26,0.42)", margin: "3px 0 0" }}>
                {card.sub}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Phone: React.FC<{ f: number }> = ({ f }) => (
  <div
    style={{
      width: 370,
      height: 750,
      background: "#1C1C1E",
      borderRadius: 54,
      border: "10px solid #2A2A2C",
      overflow: "hidden",
      position: "relative",
      boxShadow:
        "0 80px 160px rgba(0,0,0,0.45), 0 20px 40px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255,255,255,0.08)",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 10,
        left: "50%",
        transform: "translateX(-50%)",
        width: 120,
        height: 36,
        background: "#000",
        borderRadius: 20,
        zIndex: 10,
      }}
    />
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 20,
        pointerEvents: "none",
        borderRadius: 44,
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.04) 30%, transparent 55%)",
      }}
    />
    <PhoneScreen f={f} />
  </div>
);

// ── Scene 3: Phone (270f) ─────────────────────────────────────
const ScenePhone: React.FC = () => {
  const f = useCurrentFrame();
  const rotY = fi(f, 0, 80, -24, -6);
  const rotX = fi(f, 0, 80, 10, 2);
  const ty = fi(f, 0, 80, 340, 0);
  const sc = fi(f, 0, 80, 0.8, 1);
  const glowOp = glowPulse(f, fi(f, 30, 100, 0, 0.8), 0.06, 80);
  const labelOp = fi(f, 85, 115, 0, 0.65);
  const mbX = fi(f, 0, 58, 22, 0);
  const mbY = fi(f, 0, 58, 3, 0);
  const float = organicFloat(f, "ph-fx", "ph-fy", 80);

  return (
    <AbsoluteFill
      style={{
        background: BG,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="phone-dir-blur">
            <feGaussianBlur stdDeviation={`${mbX} ${mbY}`} />
          </filter>
        </defs>
      </svg>
      <div
        style={{
          position: "absolute",
          width: 640,
          height: 640,
          background: "radial-gradient(circle, rgba(184,151,62,0.3) 0%, transparent 68%)",
          opacity: glowOp,
          filter: "blur(100px)",
        }}
      />
      <div
        style={{
          filter: mbX > 0.4 ? "url(#phone-dir-blur)" : "none",
          transform: `perspective(1500px) rotateY(${rotY}deg) rotateX(${rotX}deg) translateX(${float.x}px) translateY(${ty + float.y}px) scale(${sc})`,
        }}
      >
        <Phone f={f} />
      </div>
      <p
        style={{
          fontFamily: "'InterVar', system-ui",
          fontWeight: 400,
          fontSize: 28,
          color: INK,
          opacity: labelOp,
          letterSpacing: "0.1em",
          marginTop: 64,
          textTransform: "uppercase",
        }}
      >
        Tu web · Tu negocio
      </p>
    </AbsoluteFill>
  );
};

// ── Browser content — real text ───────────────────────────────
const BrowserContent: React.FC<{ f: number }> = ({ f }) => {
  const navStyle = { opacity: fi(f, 65, 82, 0, 1) };
  const h1Style = { opacity: fi(f, 78, 96, 0, 1), transform: `translateY(${fi(f, 78, 96, 14, 0)}px)` };
  const h2Style = { opacity: fi(f, 90, 106, 0, 1), transform: `translateY(${fi(f, 90, 106, 10, 0)}px)` };
  const btnStyle = { opacity: fi(f, 100, 116, 0, 1), transform: `scale(${fi(f, 100, 116, 0.9, 1)})` };
  const card1Op = fi(f, 112, 128, 0, 1);
  const card2Op = fi(f, 122, 138, 0, 1);
  const card3Op = fi(f, 132, 148, 0, 1);

  const serviceCards = [
    { op: card1Op, icon: "#B8973E22", title: "Landing", desc: "Convierte" },
    { op: card2Op, icon: "#ffffff09", title: "E-commerce", desc: "Vende 24/7" },
    { op: card3Op, icon: "#ffffff09", title: "Branding", desc: "Destaca" },
  ];

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", ...navStyle }}>
        <p style={{ fontFamily: "'InterVar', system-ui", fontWeight: 700, fontSize: 17, color: GOLD, margin: 0, letterSpacing: "0.04em" }}>
          AugustoCS
        </p>
        <div style={{ display: "flex", gap: 28 }}>
          {["Inicio", "Servicios", "Proyectos", "Contacto"].map((label, i) => (
            <p key={i} style={{ fontFamily: "'InterVar', system-ui", fontSize: 12, color: "rgba(255,255,255,0.3)", margin: 0 }}>
              {label}
            </p>
          ))}
        </div>
      </div>

      <div style={{ paddingTop: 16 }}>
        <p style={{ fontFamily: "'InterVar', system-ui", fontWeight: 800, fontSize: 34, color: "rgba(255,255,255,0.95)", margin: 0, lineHeight: 1.1, ...h1Style }}>
          Tu web. Tu marca.
        </p>
        <p style={{ fontFamily: "'InterVar', system-ui", fontWeight: 400, fontSize: 18, color: "rgba(255,255,255,0.44)", margin: "10px 0 0", lineHeight: 1.4, ...h2Style }}>
          Diseño profesional que genera
          <br />resultados reales.
        </p>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: GOLD,
            borderRadius: 11,
            paddingLeft: 28,
            paddingRight: 28,
            height: 46,
            marginTop: 24,
            ...btnStyle,
          }}
        >
          <p style={{ fontFamily: "'InterVar', system-ui", fontWeight: 600, fontSize: 15, color: "#fff", margin: 0 }}>
            Quiero mi web →
          </p>
        </div>
      </div>

      <div style={{ display: "flex", gap: 18 }}>
        {serviceCards.map((card, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 110,
              background: "#161616",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.06)",
              padding: 18,
              display: "flex",
              flexDirection: "column",
              gap: 10,
              opacity: card.op,
              transform: `translateY(${fi(f, 112 + i * 10, 128 + i * 10, 18, 0)}px)`,
            }}
          >
            <div style={{ width: 34, height: 34, background: card.icon, borderRadius: 9 }} />
            <p style={{ fontFamily: "'InterVar', system-ui", fontWeight: 600, fontSize: 12, color: "rgba(255,255,255,0.7)", margin: 0 }}>
              {card.title}
            </p>
            <p style={{ fontFamily: "'InterVar', system-ui", fontWeight: 400, fontSize: 10, color: "rgba(255,255,255,0.28)", margin: 0 }}>
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

const Browser: React.FC<{ f: number }> = ({ f }) => (
  <div
    style={{
      width: 840,
      borderRadius: 18,
      overflow: "hidden",
      boxShadow: "0 70px 150px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(255,255,255,0.04)",
    }}
  >
    <div style={{ background: "#1E1E1E", height: 52, display: "flex", alignItems: "center", paddingLeft: 18, gap: 8 }}>
      {["#FF5F56", "#FFBD2E", "#27C93F"].map((c, i) => (
        <div key={i} style={{ width: 13, height: 13, borderRadius: 7, background: c }} />
      ))}
      <div style={{ flex: 1, margin: "0 18px", background: "#2A2A2A", borderRadius: 8, height: 30, display: "flex", alignItems: "center", paddingLeft: 14, gap: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#27C93F", opacity: 0.7 }} />
        <p style={{ fontFamily: "'InterVar', system-ui", fontSize: 11, color: "rgba(255,255,255,0.28)", margin: 0 }}>
          augustocs.studio
        </p>
      </div>
    </div>
    <div style={{ background: "#0B0B0B", height: 510, padding: 34, display: "flex", flexDirection: "column", gap: 26 }}>
      <BrowserContent f={f} />
    </div>
  </div>
);

// ── Scene 4: Browser (210f) ───────────────────────────────────
const SceneBrowser: React.FC = () => {
  const f = useCurrentFrame();
  const tx = fi(f, 0, 78, 280, 0);
  const rotY = fi(f, 0, 78, 22, 5);
  const sc = fi(f, 0, 78, 0.84, 1);
  const glowOp = glowPulse(f, fi(f, 20, 88, 0, 0.72), 0.06, 85);
  const labelOp = fi(f, 90, 118, 0, 0.6);
  const mbX = fi(f, 0, 56, 20, 0);
  const mbY = fi(f, 0, 56, 2, 0);
  const float = organicFloat(f, "br-fx", "br-fy", 78);

  return (
    <AbsoluteFill
      style={{
        background: BG,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="browser-dir-blur">
            <feGaussianBlur stdDeviation={`${mbX} ${mbY}`} />
          </filter>
        </defs>
      </svg>
      <div
        style={{
          position: "absolute",
          width: 740,
          height: 440,
          background: "radial-gradient(ellipse, rgba(184,151,62,0.22) 0%, transparent 68%)",
          opacity: glowOp,
          filter: "blur(75px)",
        }}
      />
      <div
        style={{
          filter: mbX > 0.4 ? "url(#browser-dir-blur)" : "none",
          transform: `perspective(1800px) rotateY(-${rotY}deg) translateX(${tx + float.x * 2}px) translateY(${float.y}px) scale(${sc})`,
        }}
      >
        <Browser f={f} />
      </div>
      <p
        style={{
          fontFamily: "'InterVar', system-ui",
          fontWeight: 400,
          fontSize: 28,
          color: INK,
          opacity: labelOp,
          letterSpacing: "0.06em",
          marginTop: 52,
        }}
      >
        @AugustoCS.studio
      </p>
    </AbsoluteFill>
  );
};

// ── Scene 5: Double mockup (180f) ─────────────────────────────
const SceneDouble: React.FC = () => {
  const f = useCurrentFrame();
  const lRotY = fi(f, 0, 80, -30, -10);
  const lTX = fi(f, 0, 80, -260, 0);
  const lBlur = fi(f, 0, 55, 20, 0);
  const lSc = fi(f, 0, 80, 0.82, 1);
  const rRotY = fi(f, 0, 80, 30, 8);
  const rTX = fi(f, 0, 80, 260, 0);
  const rBlur = fi(f, 10, 65, 20, 0);
  const rSc = fi(f, 0, 80, 0.82, 1);
  const glowOp = glowPulse(f, fi(f, 30, 90, 0, 0.7), 0.07, 90);
  const labelOp = fi(f, 90, 118, 0, 0.5);
  const lFloat = organicFloat(f, "dl-fx", "dl-fy", 80);
  const rFloat = organicFloat(f, "dr-fx", "dr-fy", 80);

  return (
    <AbsoluteFill
      style={{
        background: BG,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 700,
          background: "radial-gradient(ellipse, rgba(184,151,62,0.18) 0%, transparent 65%)",
          opacity: glowOp,
          filter: "blur(90px)",
        }}
      />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: -20, position: "relative" }}>
        {/* Left: Phone */}
        <div
          style={{
            filter: `blur(${lBlur}px)`,
            transform: `perspective(1600px) rotateY(${lRotY}deg) translateX(${lTX + lFloat.x}px) translateY(${lFloat.y}px) scale(${lSc})`,
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: 280, height: 568,
              background: "#1C1C1E",
              borderRadius: 44,
              border: "8px solid #2A2A2C",
              overflow: "hidden",
              position: "relative",
              boxShadow: "0 60px 120px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.07)",
            }}
          >
            <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 90, height: 28, background: "#000", borderRadius: 16, zIndex: 10 }} />
            <div style={{ position: "absolute", inset: 0, zIndex: 20, pointerEvents: "none", borderRadius: 36, background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 45%)" }} />
            <div style={{ background: "#0B0B0B", height: 52, display: "flex", alignItems: "flex-end", padding: "0 18px 10px" }}>
              <p style={{ fontFamily: "'InterVar', system-ui", fontWeight: 700, fontSize: 11, color: GOLD, margin: 0 }}>AugustoCS</p>
            </div>
            <div style={{ background: "linear-gradient(165deg, #0f0f0f, #1a1230)", height: 170, padding: 18, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 6 }}>
              <p style={{ fontFamily: "'InterVar', system-ui", fontWeight: 800, fontSize: 15, color: "rgba(255,255,255,0.9)", margin: 0 }}>Tu Negocio Online</p>
              <p style={{ fontFamily: "'InterVar', system-ui", fontWeight: 400, fontSize: 10, color: "rgba(255,255,255,0.4)", margin: 0 }}>Diseño web que convierte</p>
              <div style={{ width: 78, height: 28, background: GOLD, borderRadius: 8, marginTop: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <p style={{ fontFamily: "'InterVar', system-ui", fontWeight: 600, fontSize: 9, color: "#fff", margin: 0 }}>Empieza →</p>
              </div>
            </div>
            <div style={{ padding: 12, background: "#fafafa", display: "flex", flexDirection: "column", gap: 10 }}>
              {["Diseño web", "E-commerce", "Branding"].map((label, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 10, padding: "10px 12px", display: "flex", gap: 10, alignItems: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                  <div style={{ width: 28, height: 28, borderRadius: 7, background: i === 0 ? "#B8973E22" : "#0B0B0B0D", flexShrink: 0 }} />
                  <p style={{ fontFamily: "'InterVar', system-ui", fontWeight: 600, fontSize: 10, color: "#1A1A1A", margin: 0 }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Browser */}
        <div
          style={{
            filter: `blur(${rBlur}px)`,
            transform: `perspective(1600px) rotateY(${rRotY}deg) translateX(${rTX + rFloat.x * 2}px) translateY(${rFloat.y}px) scale(${rSc})`,
            zIndex: 1,
          }}
        >
          <div style={{ width: 560, borderRadius: 14, overflow: "hidden", boxShadow: "0 50px 120px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.08)" }}>
            <div style={{ background: "#1E1E1E", height: 40, display: "flex", alignItems: "center", paddingLeft: 14, gap: 6 }}>
              {["#FF5F56", "#FFBD2E", "#27C93F"].map((c, i) => (
                <div key={i} style={{ width: 10, height: 10, borderRadius: 5, background: c }} />
              ))}
              <div style={{ flex: 1, margin: "0 14px", background: "#2A2A2A", borderRadius: 6, height: 22, display: "flex", alignItems: "center", paddingLeft: 10, gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#27C93F", opacity: 0.7 }} />
                <p style={{ fontFamily: "'InterVar', system-ui", fontSize: 9, color: "rgba(255,255,255,0.25)", margin: 0 }}>augustocs.studio</p>
              </div>
            </div>
            <div style={{ background: "#0B0B0B", height: 360, padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ fontFamily: "'InterVar', system-ui", fontWeight: 700, fontSize: 14, color: GOLD, margin: 0 }}>AugustoCS</p>
                <div style={{ display: "flex", gap: 18 }}>
                  {["Inicio", "Servicios", "Proyectos", "Contacto"].map((l, i) => (
                    <p key={i} style={{ fontFamily: "'InterVar', system-ui", fontSize: 10, color: "rgba(255,255,255,0.22)", margin: 0 }}>{l}</p>
                  ))}
                </div>
              </div>
              <div>
                <p style={{ fontFamily: "'InterVar', system-ui", fontWeight: 800, fontSize: 24, color: "rgba(255,255,255,0.92)", margin: 0, lineHeight: 1.1 }}>Tu web. Tu marca.</p>
                <p style={{ fontFamily: "'InterVar', system-ui", fontWeight: 400, fontSize: 14, color: "rgba(255,255,255,0.38)", margin: "8px 0 0" }}>Diseño profesional que genera resultados reales.</p>
                <div style={{ display: "inline-flex", alignItems: "center", background: GOLD, borderRadius: 8, padding: "0 20px", height: 34, marginTop: 14 }}>
                  <p style={{ fontFamily: "'InterVar', system-ui", fontWeight: 600, fontSize: 12, color: "#fff", margin: 0 }}>Quiero mi web →</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                {["Landing", "E-commerce", "Branding"].map((label, i) => (
                  <div key={i} style={{ flex: 1, height: 80, background: "#161616", borderRadius: 10, border: "1px solid rgba(255,255,255,0.05)", padding: 12 }}>
                    <div style={{ width: 24, height: 24, background: i === 0 ? "#B8973E22" : "#ffffff08", borderRadius: 6, marginBottom: 8 }} />
                    <p style={{ fontFamily: "'InterVar', system-ui", fontWeight: 600, fontSize: 10, color: "rgba(255,255,255,0.5)", margin: 0 }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <p style={{ fontFamily: "'InterVar', system-ui", fontWeight: 400, fontSize: 28, color: INK, opacity: labelOp, letterSpacing: "0.06em", marginTop: 56, textAlign: "center" }}>
        Diseño · Desarrollo · Conversión
      </p>
    </AbsoluteFill>
  );
};

// ── Scene 6: Stats (120f) ─────────────────────────────────────
const SceneStats: React.FC = () => {
  const f = useCurrentFrame();
  const count = Math.round(fi(f, 0, 50, 0, 12));
  const numOp = fi(f, 0, 20, 0, 1);
  const numScale = fi(f, 0, 50, 0.88, 1);
  const l1Op = fi(f, 22, 42, 0, 1);
  const divOp = fi(f, 40, 60, 0, 0.2);
  const l2Op = fi(f, 55, 75, 0, 0.7);
  const glowOp = glowPulse(f, fi(f, 0, 40, 0, 0.5), 0.08, 70);

  return (
    <AbsoluteFill style={{ background: BG, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
      <div style={{ position: "absolute", width: 560, height: 560, background: "radial-gradient(circle, rgba(184,151,62,0.2) 0%, transparent 70%)", opacity: glowOp, filter: "blur(80px)" }} />
      <p style={{ fontFamily: "'InterVar', system-ui", fontWeight: 800, fontSize: 240, color: GOLD, margin: 0, lineHeight: 1, opacity: numOp, letterSpacing: "-0.02em", transform: `scale(${numScale})` }}>
        {count}
      </p>
      <p style={{ fontFamily: "'InterVar', system-ui", fontWeight: 400, fontSize: 46, color: INK, margin: 0, letterSpacing: "0.01em", opacity: l1Op, marginTop: -6 }}>
        proyectos entregados
      </p>
      <div style={{ width: 60, height: 1, background: INK, opacity: divOp, margin: "24px 0" }} />
      <p style={{ fontFamily: "'InterVar', system-ui", fontWeight: 400, fontSize: 36, color: INK, margin: 0, opacity: l2Op, letterSpacing: "0.03em" }}>
        0 compromisos rotos
      </p>
    </AbsoluteFill>
  );
};

// ── Scene 7: CTA (90f) ────────────────────────────────────────
const SceneCTA: React.FC = () => {
  const f = useCurrentFrame();
  const glowOp = glowPulse(f, fi(f, 0, 40, 0, 0.6), 0.08, 75);

  return (
    <AbsoluteFill style={{ background: BG, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
      <div style={{ position: "absolute", width: 700, height: 500, background: "radial-gradient(ellipse, rgba(184,151,62,0.18) 0%, transparent 65%)", opacity: glowOp, filter: "blur(70px)" }} />
      <p style={{ fontFamily: "'InterVar', system-ui", fontWeight: 700, fontSize: 96, color: INK, margin: 0, letterSpacing: "-0.02em", zIndex: 1, ...blurReveal(f, 0, 28) }}>
        AugustoCS
      </p>
      <p style={{ fontFamily: "'InterVar', system-ui", fontWeight: 400, fontSize: 40, color: GOLD, margin: 0, letterSpacing: "0.04em", zIndex: 1, ...blurReveal(f, 20, 26) }}>
        @AugustoCS.studio
      </p>
      <p style={{ fontFamily: "'InterVar', system-ui", fontWeight: 400, fontSize: 28, color: INK, margin: "16px 0 0", letterSpacing: "0.07em", textTransform: "uppercase", zIndex: 1, ...blurReveal(f, 44, 24), opacity: (blurReveal(f, 44, 24).opacity as number) * 0.5 }}>
        DM para trabajar juntos
      </p>
    </AbsoluteFill>
  );
};

// ── Root composition ──────────────────────────────────────────
export const Reel: React.FC = () => {
  const FADE = 15;
  const t = linearTiming({ durationInFrames: FADE });

  return (
    <AbsoluteFill>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={90}><SceneIntro /></TransitionSeries.Sequence>
        <TransitionSeries.Transition timing={t} presentation={fade()} />
        <TransitionSeries.Sequence durationInFrames={180}><SceneHook /></TransitionSeries.Sequence>
        <TransitionSeries.Transition timing={t} presentation={fade()} />
        <TransitionSeries.Sequence durationInFrames={270}><ScenePhone /></TransitionSeries.Sequence>
        <TransitionSeries.Transition timing={t} presentation={fade()} />
        <TransitionSeries.Sequence durationInFrames={210}><SceneBrowser /></TransitionSeries.Sequence>
        <TransitionSeries.Transition timing={t} presentation={fade()} />
        <TransitionSeries.Sequence durationInFrames={180}><SceneDouble /></TransitionSeries.Sequence>
        <TransitionSeries.Transition timing={t} presentation={fade()} />
        <TransitionSeries.Sequence durationInFrames={120}><SceneStats /></TransitionSeries.Sequence>
        <TransitionSeries.Transition timing={t} presentation={fade()} />
        <TransitionSeries.Sequence durationInFrames={90}><SceneCTA /></TransitionSeries.Sequence>
      </TransitionSeries>
      <Vignette />
      <GrainOverlay />
    </AbsoluteFill>
  );
};
