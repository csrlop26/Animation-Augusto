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
const easeIn = Easing.bezier(0.4, 0, 1, 1);

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
          background:
            "radial-gradient(ellipse, rgba(184,151,62,0.26) 0%, transparent 65%)",
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

// ── Phone screen with animated content ───────────────────────
const PhoneScreen: React.FC<{ f: number }> = ({ f }) => {
  const headerStyle = blurReveal(f, 75, 18);
  const heroStyle = { opacity: fi(f, 88, 108, 0, 1), transform: `translateY(${fi(f, 88, 108, 12, 0)}px)` };
  const btnStyle = { opacity: fi(f, 108, 126, 0, 1), transform: `scale(${fi(f, 108, 126, 0.88, 1)})` };
  const card1Style = { opacity: fi(f, 118, 136, 0, 1), transform: `translateX(${fi(f, 118, 136, 22, 0)}px)` };
  const card2Style = { opacity: fi(f, 130, 148, 0, 1), transform: `translateX(${fi(f, 130, 148, 22, 0)}px)` };
  const card3Style = { opacity: fi(f, 142, 160, 0, 1), transform: `translateX(${fi(f, 142, 160, 22, 0)}px)` };

  const cards = [
    { style: card1Style, accent: "#B8973E22", aw: 88 },
    { style: card2Style, accent: "#0B0B0B0D", aw: 68 },
    { style: card3Style, accent: "#0B0B0B0D", aw: 78 },
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
        <div style={{ width: 90, height: 14, background: "#B8973E", borderRadius: 3 }} />
        <div style={{ display: "flex", gap: 14 }}>
          {[44, 36, 44].map((w, i) => (
            <div key={i} style={{ width: w, height: 9, background: "rgba(255,255,255,0.3)", borderRadius: 3 }} />
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
          gap: 10,
          ...heroStyle,
        }}
      >
        <div style={{ width: 210, height: 20, background: "rgba(255,255,255,0.88)", borderRadius: 4 }} />
        <div style={{ width: 165, height: 14, background: "rgba(255,255,255,0.38)", borderRadius: 3 }} />
        <div style={{ ...btnStyle, width: 104, height: 36, background: "#B8973E", borderRadius: 10, marginTop: 6 }} />
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
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7 }}>
              <div style={{ width: `${card.aw}%`, height: 10, background: "#1A1A1A28", borderRadius: 3 }} />
              <div style={{ width: "55%", height: 8, background: "#1A1A1A14", borderRadius: 3 }} />
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
        "0 80px 160px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.07)",
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
    <PhoneScreen f={f} />
  </div>
);

// ── Scene 3: Phone (270f) ─────────────────────────────────────
const ScenePhone: React.FC = () => {
  const f = useCurrentFrame();
  const rotY = fi(f, 0, 80, -24, -6);
  const rotX = fi(f, 0, 80, 10, 2);
  const ty = fi(f, 0, 80, 340, 0);
  const blurPx = fi(f, 0, 60, 24, 0);
  const sc = fi(f, 0, 80, 0.8, 1);
  const glowOp = glowPulse(f, fi(f, 30, 100, 0, 0.8), 0.06, 80);
  const labelOp = fi(f, 85, 115, 0, 0.65);
  const floatY = f > 80 ? Math.sin(((f - 80) / 30) * Math.PI) * 12 : 0;

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
          width: 640,
          height: 640,
          background: "radial-gradient(circle, rgba(184,151,62,0.3) 0%, transparent 68%)",
          opacity: glowOp,
          filter: "blur(100px)",
        }}
      />
      <div
        style={{
          filter: `blur(${blurPx}px)`,
          transform: `perspective(1500px) rotateY(${rotY}deg) rotateX(${rotX}deg) translateY(${ty + floatY}px) scale(${sc})`,
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

// ── Browser screen with animated content ─────────────────────
const BrowserContent: React.FC<{ f: number }> = ({ f }) => {
  const navStyle = { opacity: fi(f, 65, 82, 0, 1) };
  const h1Style = { opacity: fi(f, 78, 96, 0, 1), transform: `translateY(${fi(f, 78, 96, 14, 0)}px)` };
  const h2Style = { opacity: fi(f, 90, 106, 0, 1), transform: `translateY(${fi(f, 90, 106, 10, 0)}px)` };
  const btnStyle = { opacity: fi(f, 100, 116, 0, 1), transform: `scale(${fi(f, 100, 116, 0.9, 1)})` };
  const card1Op = fi(f, 112, 128, 0, 1);
  const card2Op = fi(f, 122, 138, 0, 1);
  const card3Op = fi(f, 132, 148, 0, 1);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          ...navStyle,
        }}
      >
        <div style={{ width: 110, height: 16, background: "#B8973E", borderRadius: 4 }} />
        <div style={{ display: "flex", gap: 28 }}>
          {[56, 46, 62, 54].map((w, i) => (
            <div key={i} style={{ width: w, height: 10, background: "rgba(255,255,255,0.28)", borderRadius: 3 }} />
          ))}
        </div>
      </div>

      <div style={{ paddingTop: 16 }}>
        <div style={{ width: 440, height: 30, background: "rgba(255,255,255,0.86)", borderRadius: 5, marginBottom: 13, ...h1Style }} />
        <div style={{ width: 360, height: 20, background: "rgba(255,255,255,0.38)", borderRadius: 4, marginBottom: 9, ...h2Style }} />
        <div style={{ width: 285, height: 20, background: "rgba(255,255,255,0.22)", borderRadius: 4, marginBottom: 28, ...h2Style }} />
        <div style={{ width: 148, height: 46, background: "#B8973E", borderRadius: 11, ...btnStyle }} />
      </div>

      <div style={{ display: "flex", gap: 18 }}>
        {[
          { op: card1Op, icon: "#B8973E22" },
          { op: card2Op, icon: "#ffffff09" },
          { op: card3Op, icon: "#ffffff09" },
        ].map((card, i) => (
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
            <div style={{ width: "68%", height: 8, background: "rgba(255,255,255,0.38)", borderRadius: 3 }} />
            <div style={{ width: "48%", height: 7, background: "rgba(255,255,255,0.18)", borderRadius: 3 }} />
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
      boxShadow: "0 70px 150px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.1)",
    }}
  >
    <div
      style={{
        background: "#1E1E1E",
        height: 52,
        display: "flex",
        alignItems: "center",
        paddingLeft: 18,
        gap: 8,
      }}
    >
      {["#FF5F56", "#FFBD2E", "#27C93F"].map((c, i) => (
        <div key={i} style={{ width: 13, height: 13, borderRadius: 7, background: c }} />
      ))}
      <div
        style={{
          flex: 1,
          margin: "0 18px",
          background: "#2A2A2A",
          borderRadius: 8,
          height: 30,
          display: "flex",
          alignItems: "center",
          paddingLeft: 14,
        }}
      >
        <div style={{ width: 130, height: 8, background: "#3C3C3C", borderRadius: 3 }} />
      </div>
    </div>
    <div
      style={{
        background: "#0B0B0B",
        height: 510,
        padding: 34,
        display: "flex",
        flexDirection: "column",
        gap: 26,
      }}
    >
      <BrowserContent f={f} />
    </div>
  </div>
);

// ── Scene 4: Browser (210f) ───────────────────────────────────
const SceneBrowser: React.FC = () => {
  const f = useCurrentFrame();
  const tx = fi(f, 0, 78, 280, 0);
  const rotY = fi(f, 0, 78, 22, 5);
  const blurPx = fi(f, 0, 58, 20, 0);
  const sc = fi(f, 0, 78, 0.84, 1);
  const glowOp = glowPulse(f, fi(f, 20, 88, 0, 0.72), 0.06, 85);
  const labelOp = fi(f, 90, 118, 0, 0.6);
  const floatY = f > 78 ? Math.sin(((f - 78) / 36) * Math.PI) * 10 : 0;

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
          width: 740,
          height: 440,
          background: "radial-gradient(ellipse, rgba(184,151,62,0.22) 0%, transparent 68%)",
          opacity: glowOp,
          filter: "blur(75px)",
        }}
      />
      <div
        style={{
          filter: `blur(${blurPx}px)`,
          transform: `perspective(1800px) rotateY(-${rotY}deg) translateX(${tx}px) translateY(${floatY}px) scale(${sc})`,
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
  const lFloat = f > 80 ? Math.sin(((f - 80) / 28) * Math.PI) * 9 : 0;

  const rRotY = fi(f, 0, 80, 30, 8);
  const rTX = fi(f, 0, 80, 260, 0);
  const rBlur = fi(f, 10, 65, 20, 0);
  const rSc = fi(f, 0, 80, 0.82, 1);
  const rFloat = f > 80 ? Math.sin(((f - 80) / 28 + 0.5) * Math.PI) * 9 : 0;

  const glowOp = glowPulse(f, fi(f, 30, 90, 0, 0.7), 0.07, 90);
  const labelOp = fi(f, 90, 118, 0, 0.5);

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

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: -20,
          position: "relative",
        }}
      >
        <div
          style={{
            filter: `blur(${lBlur}px)`,
            transform: `perspective(1600px) rotateY(${lRotY}deg) translateX(${lTX}px) translateY(${lFloat}px) scale(${lSc})`,
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: 280,
              height: 568,
              background: "#1C1C1E",
              borderRadius: 44,
              border: "8px solid #2A2A2C",
              overflow: "hidden",
              position: "relative",
              boxShadow: "0 60px 120px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.07)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 8,
                left: "50%",
                transform: "translateX(-50%)",
                width: 90,
                height: 28,
                background: "#000",
                borderRadius: 16,
                zIndex: 10,
              }}
            />
            <div style={{ background: "#0B0B0B", height: 52, display: "flex", alignItems: "flex-end", padding: "0 18px 10px" }}>
              <div style={{ width: 68, height: 10, background: "#B8973E", borderRadius: 2 }} />
            </div>
            <div style={{ background: "linear-gradient(165deg, #0f0f0f, #1a1230)", height: 170, padding: 18, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 8 }}>
              <div style={{ width: "80%", height: 14, background: "rgba(255,255,255,0.85)", borderRadius: 3 }} />
              <div style={{ width: "60%", height: 10, background: "rgba(255,255,255,0.35)", borderRadius: 3 }} />
              <div style={{ width: 78, height: 28, background: "#B8973E", borderRadius: 8, marginTop: 4 }} />
            </div>
            <div style={{ padding: 12, background: "#fafafa", display: "flex", flexDirection: "column", gap: 10 }}>
              {[88, 70, 78].map((w, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 10, padding: "10px 12px", display: "flex", gap: 10, alignItems: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                  <div style={{ width: 28, height: 28, borderRadius: 7, background: i === 0 ? "#B8973E22" : "#0B0B0B0D", flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ width: `${w}%`, height: 7, background: "#1A1A1A22", borderRadius: 2, marginBottom: 5 }} />
                    <div style={{ width: "50%", height: 6, background: "#1A1A1A11", borderRadius: 2 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            filter: `blur(${rBlur}px)`,
            transform: `perspective(1600px) rotateY(${rRotY}deg) translateX(${rTX}px) translateY(${rFloat}px) scale(${rSc})`,
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 560,
              borderRadius: 14,
              overflow: "hidden",
              boxShadow: "0 50px 120px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.08)",
            }}
          >
            <div style={{ background: "#1E1E1E", height: 40, display: "flex", alignItems: "center", paddingLeft: 14, gap: 6 }}>
              {["#FF5F56", "#FFBD2E", "#27C93F"].map((c, i) => (
                <div key={i} style={{ width: 10, height: 10, borderRadius: 5, background: c }} />
              ))}
              <div style={{ flex: 1, margin: "0 14px", background: "#2A2A2A", borderRadius: 6, height: 22, display: "flex", alignItems: "center", paddingLeft: 10 }}>
                <div style={{ width: 90, height: 6, background: "#3C3C3C", borderRadius: 2 }} />
              </div>
            </div>
            <div style={{ background: "#0B0B0B", height: 360, padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ width: 80, height: 12, background: "#B8973E", borderRadius: 3 }} />
                <div style={{ display: "flex", gap: 18 }}>
                  {[40, 34, 46, 38].map((w, i) => (
                    <div key={i} style={{ width: w, height: 8, background: "rgba(255,255,255,0.25)", borderRadius: 2 }} />
                  ))}
                </div>
              </div>
              <div>
                <div style={{ width: 320, height: 22, background: "rgba(255,255,255,0.85)", borderRadius: 4, marginBottom: 10 }} />
                <div style={{ width: 260, height: 14, background: "rgba(255,255,255,0.35)", borderRadius: 3, marginBottom: 8 }} />
                <div style={{ width: 108, height: 34, background: "#B8973E", borderRadius: 8, marginTop: 14 }} />
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                {[1, 2, 3].map((i) => (
                  <div key={i} style={{ flex: 1, height: 80, background: "#161616", borderRadius: 10, border: "1px solid rgba(255,255,255,0.05)", padding: 12 }}>
                    <div style={{ width: 24, height: 24, background: i === 1 ? "#B8973E22" : "#fff08", borderRadius: 6, marginBottom: 8 }} />
                    <div style={{ width: "70%", height: 6, background: "rgba(255,255,255,0.35)", borderRadius: 2 }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <p
        style={{
          fontFamily: "'InterVar', system-ui",
          fontWeight: 400,
          fontSize: 28,
          color: INK,
          opacity: labelOp,
          letterSpacing: "0.06em",
          marginTop: 56,
          textAlign: "center",
        }}
      >
        Diseño · Desarrollo · Conversión
      </p>
    </AbsoluteFill>
  );
};

// ── Scene 6: Stats (120f) — counter animation ─────────────────
const SceneStats: React.FC = () => {
  const f = useCurrentFrame();
  const count = Math.round(fi(f, 0, 50, 0, 12));
  const numOp = fi(f, 0, 20, 0, 1);
  const l1Op = fi(f, 22, 42, 0, 1);
  const divOp = fi(f, 40, 60, 0, 0.2);
  const l2Op = fi(f, 55, 75, 0, 0.7);
  const glowOp = glowPulse(f, fi(f, 0, 40, 0, 0.5), 0.08, 70);

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
          width: 560,
          height: 560,
          background: "radial-gradient(circle, rgba(184,151,62,0.2) 0%, transparent 70%)",
          opacity: glowOp,
          filter: "blur(80px)",
        }}
      />
      <p
        style={{
          fontFamily: "'InterVar', system-ui",
          fontWeight: 800,
          fontSize: 240,
          color: GOLD,
          margin: 0,
          lineHeight: 1,
          opacity: numOp,
          letterSpacing: "-0.02em",
        }}
      >
        {count}
      </p>
      <p
        style={{
          fontFamily: "'InterVar', system-ui",
          fontWeight: 400,
          fontSize: 46,
          color: INK,
          margin: 0,
          letterSpacing: "0.01em",
          opacity: l1Op,
          marginTop: -6,
        }}
      >
        proyectos entregados
      </p>
      <div style={{ width: 60, height: 1, background: INK, opacity: divOp, margin: "24px 0" }} />
      <p
        style={{
          fontFamily: "'InterVar', system-ui",
          fontWeight: 400,
          fontSize: 36,
          color: INK,
          margin: 0,
          opacity: l2Op,
          letterSpacing: "0.03em",
        }}
      >
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
    <AbsoluteFill
      style={{
        background: BG,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 500,
          background: "radial-gradient(ellipse, rgba(184,151,62,0.18) 0%, transparent 65%)",
          opacity: glowOp,
          filter: "blur(70px)",
        }}
      />
      <p
        style={{
          fontFamily: "'InterVar', system-ui",
          fontWeight: 700,
          fontSize: 96,
          color: INK,
          margin: 0,
          letterSpacing: "-0.02em",
          zIndex: 1,
          ...blurReveal(f, 0, 28),
        }}
      >
        AugustoCS
      </p>
      <p
        style={{
          fontFamily: "'InterVar', system-ui",
          fontWeight: 400,
          fontSize: 40,
          color: GOLD,
          margin: 0,
          letterSpacing: "0.04em",
          zIndex: 1,
          ...blurReveal(f, 20, 26),
        }}
      >
        @AugustoCS.studio
      </p>
      <p
        style={{
          fontFamily: "'InterVar', system-ui",
          fontWeight: 400,
          fontSize: 28,
          color: INK,
          margin: "16px 0 0",
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          zIndex: 1,
          ...blurReveal(f, 44, 24),
          opacity: (blurReveal(f, 44, 24).opacity as number) * 0.5,
        }}
      >
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
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={90}>
        <SceneIntro />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition timing={t} presentation={fade()} />

      <TransitionSeries.Sequence durationInFrames={180}>
        <SceneHook />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition timing={t} presentation={fade()} />

      <TransitionSeries.Sequence durationInFrames={270}>
        <ScenePhone />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition timing={t} presentation={fade()} />

      <TransitionSeries.Sequence durationInFrames={210}>
        <SceneBrowser />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition timing={t} presentation={fade()} />

      <TransitionSeries.Sequence durationInFrames={180}>
        <SceneDouble />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition timing={t} presentation={fade()} />

      <TransitionSeries.Sequence durationInFrames={120}>
        <SceneStats />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition timing={t} presentation={fade()} />

      <TransitionSeries.Sequence durationInFrames={90}>
        <SceneCTA />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
