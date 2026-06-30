import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

// Inject fonts for Next.js Player context (no staticFile available)
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

const SceneIntro: React.FC = () => {
  const f = useCurrentFrame();
  const op = fi(f, 0, 35, 0, 1);
  const ls = fi(f, 10, 80, 0.3, 0.52);
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
          fontFamily: "'InterVar', system-ui, sans-serif",
          fontWeight: 500,
          fontSize: 30,
          letterSpacing: `${ls}em`,
          color: INK,
          textTransform: "uppercase",
          opacity: op,
          margin: 0,
        }}
      >
        AugustoCS
      </p>
    </AbsoluteFill>
  );
};

const SceneHook: React.FC = () => {
  const f = useCurrentFrame();
  const glowOp = fi(f, 0, 70, 0, 1);
  const l1Op = fi(f, 0, 28, 0, 1);
  const l1Y = fi(f, 0, 28, 36, 0);
  const l2Op = fi(f, 28, 56, 0, 1);
  const l2Y = fi(f, 28, 56, 36, 0);
  const subOp = fi(f, 75, 105, 0, 0.55);
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
          width: 900,
          height: 600,
          background:
            "radial-gradient(ellipse, rgba(184,151,62,0.22) 0%, transparent 65%)",
          opacity: glowOp,
          filter: "blur(70px)",
          top: "38%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          zIndex: 1,
          paddingLeft: 60,
          paddingRight: 60,
        }}
      >
        <p
          style={{
            fontFamily: "'InterVar', system-ui",
            fontWeight: 800,
            fontSize: 136,
            color: INK,
            margin: 0,
            lineHeight: 1.0,
            opacity: l1Op,
            transform: `translateY(${l1Y}px)`,
            textAlign: "center",
          }}
        >
          Diseño web
        </p>
        <p
          style={{
            fontFamily: "'InterVar', system-ui",
            fontWeight: 800,
            fontSize: 136,
            color: GOLD,
            margin: 0,
            lineHeight: 1.0,
            opacity: l2Op,
            transform: `translateY(${l2Y}px)`,
            textAlign: "center",
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
          opacity: subOp,
          marginTop: 52,
          letterSpacing: "0.02em",
          zIndex: 1,
          textAlign: "center",
          paddingLeft: 80,
          paddingRight: 80,
        }}
      >
        Webs a medida que generan resultados.
      </p>
    </AbsoluteFill>
  );
};

const PhoneScreen: React.FC = () => (
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
      }}
    >
      <div
        style={{ width: 90, height: 14, background: "#B8973E", borderRadius: 3 }}
      />
      <div style={{ display: "flex", gap: 14 }}>
        {[44, 36, 44].map((w, i) => (
          <div
            key={i}
            style={{
              width: w,
              height: 9,
              background: "rgba(255,255,255,0.3)",
              borderRadius: 3,
            }}
          />
        ))}
      </div>
    </div>
    <div
      style={{
        background: "linear-gradient(165deg, #0f0f0f 0%, #1a1230 100%)",
        height: 240,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: 26,
        gap: 12,
      }}
    >
      <div
        style={{
          width: 220,
          height: 22,
          background: "rgba(255,255,255,0.88)",
          borderRadius: 4,
        }}
      />
      <div
        style={{
          width: 170,
          height: 15,
          background: "rgba(255,255,255,0.38)",
          borderRadius: 3,
        }}
      />
      <div
        style={{
          width: 108,
          height: 38,
          background: "#B8973E",
          borderRadius: 10,
          marginTop: 6,
        }}
      />
    </div>
    <div
      style={{
        padding: 18,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        background: "#fafafa",
      }}
    >
      {[
        { accent: "#B8973E22", aw: 90 },
        { accent: "#0B0B0B0D", aw: 70 },
        { accent: "#0B0B0B0D", aw: 80 },
      ].map((card, i) => (
        <div
          key={i}
          style={{
            background: "#fff",
            borderRadius: 14,
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: card.accent,
              flexShrink: 0,
            }}
          />
          <div
            style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7 }}
          >
            <div
              style={{
                width: `${card.aw}%`,
                height: 10,
                background: "#1A1A1A28",
                borderRadius: 3,
              }}
            />
            <div
              style={{
                width: "55%",
                height: 8,
                background: "#1A1A1A14",
                borderRadius: 3,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Phone: React.FC = () => (
  <div
    style={{
      width: 370,
      height: 750,
      background: "#1C1C1E",
      borderRadius: 54,
      border: "10px solid #2C2C2E",
      overflow: "hidden",
      position: "relative",
      boxShadow:
        "0 80px 160px rgba(0,0,0,0.38), inset 0 0 0 1px rgba(255,255,255,0.06)",
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
    <PhoneScreen />
  </div>
);

const ScenePhone: React.FC = () => {
  const f = useCurrentFrame();
  const rotY = fi(f, 0, 75, -22, -5);
  const rotX = fi(f, 0, 75, 10, 2);
  const ty = fi(f, 0, 75, 320, 0);
  const blurPx = fi(f, 0, 55, 22, 0);
  const sc = fi(f, 0, 75, 0.82, 1);
  const glowOp = fi(f, 35, 100, 0, 0.85);
  const labelOp = fi(f, 80, 115, 0, 0.65);
  const floatY = f > 75 ? Math.sin(((f - 75) / 32) * Math.PI) * 11 : 0;
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
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(184,151,62,0.28) 0%, transparent 70%)",
          opacity: glowOp,
          filter: "blur(90px)",
        }}
      />
      <div
        style={{
          filter: `blur(${blurPx}px)`,
          transform: `perspective(1500px) rotateY(${rotY}deg) rotateX(${rotX}deg) translateY(${ty + floatY}px) scale(${sc})`,
        }}
      >
        <Phone />
      </div>
      <p
        style={{
          fontFamily: "'InterVar', system-ui",
          fontWeight: 400,
          fontSize: 30,
          color: INK,
          opacity: labelOp,
          letterSpacing: "0.08em",
          marginTop: 60,
          textTransform: "uppercase",
        }}
      >
        Tu web · Tu negocio
      </p>
    </AbsoluteFill>
  );
};

const SceneCaption: React.FC = () => {
  const f = useCurrentFrame();
  const l1Op = fi(f, 0, 22, 0, 1);
  const l1Y = fi(f, 0, 22, 28, 0);
  const l2Op = fi(f, 22, 44, 0, 1);
  const l2Y = fi(f, 22, 44, 28, 0);
  const subOp = fi(f, 58, 82, 0, 0.5);
  return (
    <AbsoluteFill
      style={{
        background: BG,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        paddingLeft: 60,
        paddingRight: 60,
      }}
    >
      <p
        style={{
          fontFamily: "'InterVar', system-ui",
          fontWeight: 800,
          fontSize: 128,
          color: INK,
          margin: 0,
          lineHeight: 1.0,
          opacity: l1Op,
          transform: `translateY(${l1Y}px)`,
          textAlign: "center",
        }}
      >
        Cada web,
      </p>
      <p
        style={{
          fontFamily: "'InterVar', system-ui",
          fontWeight: 800,
          fontSize: 128,
          color: INK,
          margin: 0,
          lineHeight: 1.05,
          opacity: l2Op,
          transform: `translateY(${l2Y}px)`,
          textAlign: "center",
        }}
      >
        un activo.
      </p>
      <p
        style={{
          fontFamily: "'InterVar', system-ui",
          fontWeight: 400,
          fontSize: 36,
          color: INK,
          opacity: subOp,
          marginTop: 48,
          textAlign: "center",
          letterSpacing: "0.02em",
        }}
      >
        No plantillas. Diseño a medida.
      </p>
    </AbsoluteFill>
  );
};

const Browser: React.FC = () => (
  <div
    style={{
      width: 860,
      borderRadius: 18,
      overflow: "hidden",
      boxShadow: "0 70px 150px rgba(0,0,0,0.32), 0 0 0 1px rgba(0,0,0,0.1)",
    }}
  >
    <div
      style={{
        background: "#1E1E1E",
        height: 54,
        display: "flex",
        alignItems: "center",
        paddingLeft: 18,
        gap: 8,
      }}
    >
      {["#FF5F56", "#FFBD2E", "#27C93F"].map((c, i) => (
        <div
          key={i}
          style={{ width: 14, height: 14, borderRadius: 7, background: c }}
        />
      ))}
      <div
        style={{
          flex: 1,
          margin: "0 18px",
          background: "#2C2C2C",
          borderRadius: 8,
          height: 32,
          display: "flex",
          alignItems: "center",
          paddingLeft: 14,
        }}
      >
        <div
          style={{ width: 130, height: 9, background: "#444", borderRadius: 3 }}
        />
      </div>
    </div>
    <div
      style={{
        background: "#0B0B0B",
        height: 520,
        padding: 36,
        display: "flex",
        flexDirection: "column",
        gap: 28,
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        <div
          style={{ width: 110, height: 16, background: "#B8973E", borderRadius: 4 }}
        />
        <div style={{ display: "flex", gap: 28 }}>
          {[56, 46, 62, 54].map((w, i) => (
            <div
              key={i}
              style={{
                width: w,
                height: 10,
                background: "rgba(255,255,255,0.28)",
                borderRadius: 3,
              }}
            />
          ))}
        </div>
      </div>
      <div style={{ paddingTop: 12 }}>
        <div
          style={{
            width: 440,
            height: 30,
            background: "rgba(255,255,255,0.85)",
            borderRadius: 5,
            marginBottom: 14,
          }}
        />
        <div
          style={{
            width: 360,
            height: 20,
            background: "rgba(255,255,255,0.38)",
            borderRadius: 4,
            marginBottom: 10,
          }}
        />
        <div
          style={{
            width: 290,
            height: 20,
            background: "rgba(255,255,255,0.22)",
            borderRadius: 4,
            marginBottom: 30,
          }}
        />
        <div
          style={{ width: 148, height: 46, background: "#B8973E", borderRadius: 11 }}
        />
      </div>
      <div style={{ display: "flex", gap: 18 }}>
        {[1, 2, 3].map((i) => (
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
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                background: i === 1 ? "#B8973E22" : "#ffffff09",
                borderRadius: 9,
              }}
            />
            <div
              style={{
                width: "68%",
                height: 8,
                background: "rgba(255,255,255,0.38)",
                borderRadius: 3,
              }}
            />
            <div
              style={{
                width: "48%",
                height: 7,
                background: "rgba(255,255,255,0.18)",
                borderRadius: 3,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SceneBrowser: React.FC = () => {
  const f = useCurrentFrame();
  const tx = fi(f, 0, 75, 260, 0);
  const rotY = fi(f, 0, 75, 20, 5);
  const blurPx = fi(f, 0, 55, 18, 0);
  const sc = fi(f, 0, 75, 0.86, 1);
  const glowOp = fi(f, 25, 85, 0, 0.75);
  const labelOp = fi(f, 90, 120, 0, 0.6);
  const floatY = f > 75 ? Math.sin(((f - 75) / 38) * Math.PI) * 9 : 0;
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
          width: 720,
          height: 420,
          background:
            "radial-gradient(ellipse, rgba(184,151,62,0.2) 0%, transparent 70%)",
          opacity: glowOp,
          filter: "blur(70px)",
        }}
      />
      <div
        style={{
          filter: `blur(${blurPx}px)`,
          transform: `perspective(1800px) rotateY(-${rotY}deg) translateX(${tx}px) translateY(${floatY}px) scale(${sc})`,
        }}
      >
        <Browser />
      </div>
      <p
        style={{
          fontFamily: "'InterVar', system-ui",
          fontWeight: 400,
          fontSize: 30,
          color: INK,
          opacity: labelOp,
          letterSpacing: "0.05em",
          marginTop: 52,
        }}
      >
        @AugustoCS.studio
      </p>
    </AbsoluteFill>
  );
};

const SceneStats: React.FC = () => {
  const f = useCurrentFrame();
  const numOp = fi(f, 0, 22, 0, 1);
  const numY = fi(f, 0, 22, 48, 0);
  const l1Op = fi(f, 18, 38, 0, 1);
  const divOp = fi(f, 32, 52, 0, 0.18);
  const l2Op = fi(f, 48, 68, 0, 0.68);
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
      <p
        style={{
          fontFamily: "'InterVar', system-ui",
          fontWeight: 800,
          fontSize: 230,
          color: GOLD,
          margin: 0,
          lineHeight: 1,
          opacity: numOp,
          transform: `translateY(${numY}px)`,
        }}
      >
        12
      </p>
      <p
        style={{
          fontFamily: "'InterVar', system-ui",
          fontWeight: 400,
          fontSize: 46,
          color: INK,
          margin: 0,
          letterSpacing: "0.02em",
          opacity: l1Op,
          marginTop: -8,
        }}
      >
        proyectos entregados
      </p>
      <div
        style={{
          width: 64,
          height: 1,
          background: INK,
          opacity: divOp,
          margin: "22px 0",
        }}
      />
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

const SceneCTA: React.FC = () => {
  const f = useCurrentFrame();
  const nameOp = fi(f, 0, 28, 0, 1);
  const nameY = fi(f, 0, 28, 24, 0);
  const handleOp = fi(f, 22, 48, 0, 1);
  const dmOp = fi(f, 50, 72, 0, 0.5);
  return (
    <AbsoluteFill
      style={{
        background: BG,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 18,
      }}
    >
      <p
        style={{
          fontFamily: "'InterVar', system-ui",
          fontWeight: 700,
          fontSize: 92,
          color: INK,
          margin: 0,
          letterSpacing: "-0.02em",
          opacity: nameOp,
          transform: `translateY(${nameY}px)`,
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
          opacity: handleOp,
        }}
      >
        @AugustoCS.studio
      </p>
      <p
        style={{
          fontFamily: "'InterVar', system-ui",
          fontWeight: 400,
          fontSize: 30,
          color: INK,
          margin: "14px 0 0",
          opacity: dmOp,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        DM para trabajar juntos
      </p>
    </AbsoluteFill>
  );
};

export const Reel: React.FC = () => {
  const FADE = 15;
  const t = linearTiming({ durationInFrames: FADE });

  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={120}>
        <SceneIntro />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition timing={t} presentation={fade()} />

      <TransitionSeries.Sequence durationInFrames={180}>
        <SceneHook />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition timing={t} presentation={fade()} />

      <TransitionSeries.Sequence durationInFrames={210}>
        <ScenePhone />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition timing={t} presentation={fade()} />

      <TransitionSeries.Sequence durationInFrames={120}>
        <SceneCaption />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition timing={t} presentation={fade()} />

      <TransitionSeries.Sequence durationInFrames={180}>
        <SceneBrowser />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition timing={t} presentation={fade()} />

      <TransitionSeries.Sequence durationInFrames={90}>
        <SceneStats />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition timing={t} presentation={fade()} />

      <TransitionSeries.Sequence durationInFrames={90}>
        <SceneCTA />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
