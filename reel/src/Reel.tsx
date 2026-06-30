import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
  Img,
  staticFile,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { loadFont } from "@remotion/fonts";
import { noise2D } from "@remotion/noise";

loadFont({
  family: "InterVar",
  url: staticFile("fonts/Inter-variable.woff2"),
  weight: "100 900",
  style: "normal",
});

// ── Tokens ────────────────────────────────────────────────────────────────────
const BG = "#080808";
const CREAM = "#F0EFEB";
const RUST = "#C96A3A";
const ra = (a: number) => `rgba(201,106,58,${a})`;
const ca = (a: number) => `rgba(240,239,235,${a})`;

// ── Easing ────────────────────────────────────────────────────────────────────
const ease = Easing.bezier(0.16, 1, 0.3, 1);

function fi(f: number, from: number, to: number, a: number, b: number): number {
  return interpolate(f, [from, to], [a, b], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
}

// ── Logo SVG (inline — no network dep) ────────────────────────────────────────
const LogoMark: React.FC<{ size?: number; style?: React.CSSProperties }> = ({
  size = 100,
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    style={style}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Left side — cream */}
    <polygon points="12,90 48,8 56,8 29,90" fill="#E9E4DC" />
    {/* Right side — dark charcoal */}
    <polygon points="36,90 53,8 62,8 80,90" fill="#2C2928" />
    {/* Crossbar */}
    <polygon points="24,63 76,63 79,74 21,74" fill="#2C2928" />
    {/* Orange dot */}
    <circle cx="77" cy="19" r="9.5" fill="#C96A3A" />
  </svg>
);

// ── Global overlays ───────────────────────────────────────────────────────────
const GrainOverlay: React.FC = () => {
  const f = useCurrentFrame();
  const seed = f % 600;
  return (
    <AbsoluteFill
      style={{
        zIndex: 300,
        pointerEvents: "none",
        mixBlendMode: "overlay",
        opacity: 0.042,
      }}
    >
      <svg width="1080" height="1920" style={{ position: "absolute" }}>
        <defs>
          <filter id={`g${seed}`} x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.71 0.74"
              numOctaves="4"
              seed={seed}
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <rect
          x="0"
          y="0"
          width="1080"
          height="1920"
          filter={`url(#g${seed})`}
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
        "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.65) 100%)",
    }}
  />
);

// ── Ambient glow helper ───────────────────────────────────────────────────────
const AmbientGlow: React.FC<{
  intensity: number;
  color?: string;
  size?: number;
  top?: string;
  left?: string;
}> = ({
  intensity,
  color = ra(0.18),
  size = 700,
  top = "50%",
  left = "50%",
}) => (
  <div
    style={{
      position: "absolute",
      width: size,
      height: size,
      borderRadius: "50%",
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      filter: "blur(80px)",
      top,
      left,
      transform: "translate(-50%, -50%)",
      opacity: intensity,
      pointerEvents: "none",
    }}
  />
);

// ── Scene 1: INTRO ────────────────────────────────────────────────────────────
const SceneIntro: React.FC = () => {
  const f = useCurrentFrame();
  const glowIn = fi(f, 0, 60, 0, 1);
  const logoIn = fi(f, 15, 55, 0, 1);
  const logoScale = fi(f, 15, 55, 0.88, 1);
  const subIn = fi(f, 40, 68, 0, 1);

  return (
    <AbsoluteFill
      style={{ background: BG, alignItems: "center", justifyContent: "center" }}
    >
      <AmbientGlow intensity={glowIn * 0.9} size={700} />
      {/* Secondary warmer glow */}
      <div
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${ra(0.25 * glowIn)} 0%, transparent 70%)`,
          filter: "blur(40px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
          opacity: logoIn,
          transform: `scale(${logoScale})`,
        }}
      >
        <LogoMark size={148} />
        <div
          style={{
            fontFamily: "'InterVar', Inter, sans-serif",
            fontSize: 18,
            fontWeight: 300,
            color: ca(0.55),
            letterSpacing: "0.5em",
            textTransform: "uppercase",
          }}
        >
          AugustoCS
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 170,
          opacity: subIn,
          fontFamily: "'InterVar', Inter, sans-serif",
          fontSize: 13,
          fontWeight: 300,
          color: ca(0.28),
          letterSpacing: "0.25em",
          textTransform: "uppercase",
        }}
      >
        Estudio de Diseño Web · Castellón
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 2: HOOK ─────────────────────────────────────────────────────────────
const SceneHook: React.FC = () => {
  const f = useCurrentFrame();

  const line1Op = fi(f, 0, 24, 0, 1);
  const line1Y = fi(f, 0, 24, 48, 0);
  const line1Blur = fi(f, 0, 24, 10, 0);

  const line2Op = fi(f, 18, 42, 0, 1);
  const line2Y = fi(f, 18, 42, 48, 0);
  const line2Blur = fi(f, 18, 42, 10, 0);

  const tagOp = fi(f, 55, 80, 0, 1);

  return (
    <AbsoluteFill
      style={{ background: BG, justifyContent: "center", paddingLeft: 68 }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 90% 60% at 0% 60%, ${ra(0.1)} 0%, transparent 65%)`,
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div
          style={{
            opacity: line1Op,
            transform: `translateY(${line1Y}px)`,
            filter: `blur(${line1Blur}px)`,
            fontFamily: "'InterVar', Inter, sans-serif",
            fontSize: 112,
            fontWeight: 800,
            color: CREAM,
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
          }}
        >
          Diseño web
        </div>
        <div
          style={{
            opacity: line2Op,
            transform: `translateY(${line2Y}px)`,
            filter: `blur(${line2Blur}px)`,
            fontFamily: "'InterVar', Inter, sans-serif",
            fontSize: 112,
            fontWeight: 800,
            color: RUST,
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
          }}
        >
          que vende.
        </div>
        <div
          style={{
            opacity: tagOp,
            marginTop: 36,
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div style={{ width: 30, height: 1, background: ra(0.5) }} />
          <div
            style={{
              fontFamily: "'InterVar', Inter, sans-serif",
              fontSize: 13,
              fontWeight: 300,
              color: ca(0.45),
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            Premium · Conversión · Resultados
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Phone Mockup ──────────────────────────────────────────────────────────────
interface MockupProps {
  imgSrc: string;
  clientName: string;
  projectType: string;
  totalFrames: number;
}

const ScenePhone: React.FC<MockupProps> = ({
  imgSrc,
  clientName,
  projectType,
  totalFrames,
}) => {
  const f = useCurrentFrame();

  const entryP = fi(f, 0, 75, 0, 1);
  const glow = fi(f, 30, 90, 0, 1);
  const glowPulse = 0.75 + Math.sin((f / 45) * Math.PI * 2) * 0.14;

  // Float
  const floatY = noise2D("phoneY" + imgSrc, f / 80, 0) * 12 * fi(f, 75, 95, 0, 1);
  const floatX = noise2D("phoneX" + imgSrc, f / 95, 0) * 6 * fi(f, 75, 95, 0, 1);

  // 3D entry tilt
  const rotY = fi(f, 0, 75, -22, -7);
  const rotX = fi(f, 0, 75, 6, 2);
  const entryY = fi(f, 0, 60, 200, 0);
  const deviceOp = fi(f, 0, 45, 0, 1);

  // Slow image pan
  const scrollPos = fi(f, 60, totalFrames, 0, 28);

  const labelOp = fi(f, 80, 100, 0, 1);
  const labelY = fi(f, 80, 100, 18, 0);

  const W = 390;
  const H = 840;
  const R = 52;

  return (
    <AbsoluteFill
      style={{ background: BG, alignItems: "center", justifyContent: "center" }}
    >
      <AmbientGlow
        intensity={glow * glowPulse * 0.85}
        size={750}
        color={ra(0.2)}
      />

      {/* Phone */}
      <div
        style={{
          opacity: deviceOp,
          transform: `translateY(${entryY + floatY}px) translateX(${floatX}px) perspective(1400px) rotateY(${rotY}deg) rotateX(${rotX}deg)`,
          transformOrigin: "center center",
          marginBottom: 120,
          width: W,
          height: H,
          borderRadius: R,
          background: "#0C0C0C",
          border: "1.5px solid rgba(255,255,255,0.07)",
          boxShadow: `
            0 0 0 1px ${ra(0.45 * glow * glowPulse)},
            0 0 25px 6px ${ra(0.28 * glow * glowPulse)},
            0 0 70px 20px ${ra(0.14 * glow * glowPulse)},
            0 0 140px 50px ${ra(0.06 * glow * glowPulse)},
            0 50px 120px 30px rgba(0,0,0,0.95)
          `,
          overflow: "hidden",
          position: "relative",
          flexShrink: 0,
        }}
      >
        {/* Dynamic Island */}
        <div
          style={{
            position: "absolute",
            top: 14,
            left: "50%",
            transform: "translateX(-50%)",
            width: 116,
            height: 34,
            background: "#050505",
            borderRadius: 17,
            zIndex: 10,
          }}
        />
        {/* Screenshot */}
        <Img
          src={staticFile(imgSrc)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: `center ${scrollPos}%`,
            display: "block",
          }}
        />
        {/* Glass shine */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 20,
            pointerEvents: "none",
            borderRadius: R,
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 25%, transparent 50%)",
          }}
        />
        {/* Inner amber rim */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 19,
            pointerEvents: "none",
            borderRadius: R,
            boxShadow: `inset 0 0 24px 4px ${ra(0.18 * glow)}`,
          }}
        />
      </div>

      {/* Label */}
      <div
        style={{
          position: "absolute",
          bottom: 140,
          left: 72,
          opacity: labelOp,
          transform: `translateY(${labelY}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 10,
          }}
        >
          <div style={{ width: 28, height: 1, background: RUST }} />
          <div
            style={{
              fontFamily: "'InterVar', Inter, sans-serif",
              fontSize: 11,
              fontWeight: 500,
              color: RUST,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            {projectType}
          </div>
        </div>
        <div
          style={{
            fontFamily: "'InterVar', Inter, sans-serif",
            fontSize: 38,
            fontWeight: 700,
            color: CREAM,
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
          }}
        >
          {clientName}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Laptop Mockup ─────────────────────────────────────────────────────────────
const SceneLaptop: React.FC<MockupProps> = ({
  imgSrc,
  clientName,
  projectType,
  totalFrames,
}) => {
  const f = useCurrentFrame();

  const entryP = fi(f, 0, 75, 0, 1);
  const glow = fi(f, 30, 90, 0, 1);
  const glowPulse = 0.78 + Math.sin((f / 50) * Math.PI * 2) * 0.13;

  const floatY = noise2D("lapY" + imgSrc, f / 85, 0) * 10 * fi(f, 75, 95, 0, 1);

  const rotX = fi(f, 0, 75, 8, 2);
  const rotY = fi(f, 0, 75, 12, 4);
  const entryY = fi(f, 0, 60, -180, 0);
  const deviceOp = fi(f, 0, 45, 0, 1);

  const scrollPos = fi(f, 60, totalFrames, 0, 22);

  const labelOp = fi(f, 80, 100, 0, 1);
  const labelY = fi(f, 80, 100, 18, 0);

  const W = 860;
  const H = 530;
  const R = 14;

  return (
    <AbsoluteFill
      style={{ background: BG, alignItems: "center", justifyContent: "center" }}
    >
      <AmbientGlow
        intensity={glow * glowPulse * 0.8}
        size={900}
        color={ra(0.18)}
        top="45%"
      />

      {/* Laptop screen */}
      <div
        style={{
          opacity: deviceOp,
          transform: `translateY(${entryY + floatY}px) perspective(1600px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          transformOrigin: "center center",
          marginBottom: 180,
          width: W,
          height: H,
          borderRadius: R,
          background: "#0A0A0A",
          border: "1.5px solid rgba(255,255,255,0.06)",
          boxShadow: `
            0 0 0 1px ${ra(0.4 * glow * glowPulse)},
            0 0 28px 7px ${ra(0.25 * glow * glowPulse)},
            0 0 80px 25px ${ra(0.12 * glow * glowPulse)},
            0 0 160px 60px ${ra(0.05 * glow * glowPulse)},
            0 60px 140px 40px rgba(0,0,0,0.95)
          `,
          overflow: "hidden",
          position: "relative",
          flexShrink: 0,
        }}
      >
        {/* Camera notch */}
        <div
          style={{
            position: "absolute",
            top: 6,
            left: "50%",
            transform: "translateX(-50%)",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#1a1a1a",
            zIndex: 10,
          }}
        />
        {/* Screenshot */}
        <Img
          src={staticFile(imgSrc)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: `center ${scrollPos}%`,
            display: "block",
          }}
        />
        {/* Glass shine */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 20,
            pointerEvents: "none",
            borderRadius: R,
            background:
              "linear-gradient(140deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 20%, transparent 45%)",
          }}
        />
        {/* Inner amber rim */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 19,
            pointerEvents: "none",
            borderRadius: R,
            boxShadow: `inset 0 0 30px 6px ${ra(0.16 * glow)}`,
          }}
        />
      </div>

      {/* Label */}
      <div
        style={{
          position: "absolute",
          bottom: 130,
          left: 72,
          opacity: labelOp,
          transform: `translateY(${labelY}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 10,
          }}
        >
          <div style={{ width: 28, height: 1, background: RUST }} />
          <div
            style={{
              fontFamily: "'InterVar', Inter, sans-serif",
              fontSize: 11,
              fontWeight: 500,
              color: RUST,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            {projectType}
          </div>
        </div>
        <div
          style={{
            fontFamily: "'InterVar', Inter, sans-serif",
            fontSize: 38,
            fontWeight: 700,
            color: CREAM,
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
          }}
        >
          {clientName}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 6: Stats + Ticker ───────────────────────────────────────────────────
const SceneTicker: React.FC = () => {
  const f = useCurrentFrame();

  const count = Math.round(fi(f, 0, 55, 0, 7));
  const countOp = fi(f, 0, 25, 0, 1);
  const countBlur = fi(f, 0, 25, 12, 0);

  const lineOp = fi(f, 40, 60, 0, 1);

  const tickerX = fi(f, 0, 90, 120, -2400);

  const TICKER =
    "Robot Energy · Madre Superiora · La Trattoria · AutoTietz · Nova · Odentrics · La Piccoleta · B2Tech · Robot Energy · Madre Superiora · La Trattoria · AutoTietz · ";

  return (
    <AbsoluteFill
      style={{ background: BG, justifyContent: "center", overflow: "hidden" }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 80% 50% at 50% 45%, ${ra(0.1)} 0%, transparent 65%)`,
        }}
      />

      {/* Number */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
          opacity: countOp,
          filter: `blur(${countBlur}px)`,
        }}
      >
        <div
          style={{
            fontFamily: "'InterVar', Inter, sans-serif",
            fontSize: 220,
            fontWeight: 800,
            color: CREAM,
            lineHeight: 1,
            letterSpacing: "-0.06em",
          }}
        >
          {count}+
        </div>
        <div
          style={{
            fontFamily: "'InterVar', Inter, sans-serif",
            fontSize: 18,
            fontWeight: 300,
            color: ca(0.4),
            letterSpacing: "0.35em",
            textTransform: "uppercase",
          }}
        >
          Proyectos entregados
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          position: "absolute",
          bottom: 210,
          left: 0,
          right: 0,
          height: 1,
          opacity: lineOp,
          background: `linear-gradient(to right, transparent 0%, ${ra(0.35)} 30%, ${ra(0.35)} 70%, transparent 100%)`,
        }}
      />

      {/* Ticker */}
      <div
        style={{
          position: "absolute",
          bottom: 140,
          left: 0,
          right: 0,
          overflow: "hidden",
          opacity: lineOp,
        }}
      >
        <div
          style={{
            display: "inline-block",
            whiteSpace: "nowrap",
            transform: `translateX(${tickerX}px)`,
            fontFamily: "'InterVar', Inter, sans-serif",
            fontSize: 13,
            fontWeight: 300,
            color: ca(0.28),
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          {TICKER}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 7: CTA ──────────────────────────────────────────────────────────────
const SceneCTA: React.FC = () => {
  const f = useCurrentFrame();

  const logoOp = fi(f, 0, 28, 0, 1);
  const logoScale = fi(f, 0, 28, 0.88, 1);
  const nameOp = fi(f, 22, 48, 0, 1);
  const nameY = fi(f, 22, 48, 20, 0);
  const subOp = fi(f, 34, 58, 0, 1);
  const pillOp = fi(f, 50, 72, 0, 1);
  const glowP = fi(f, 0, 60, 0, 1);
  const glowPulse = 0.82 + Math.sin((f / 38) * Math.PI * 2) * 0.13;

  return (
    <AbsoluteFill
      style={{ background: BG, alignItems: "center", justifyContent: "center" }}
    >
      <AmbientGlow
        intensity={glowP * glowPulse * 0.95}
        size={600}
        color={ra(0.22)}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
        }}
      >
        {/* Logo */}
        <div
          style={{
            opacity: logoOp,
            transform: `scale(${logoScale})`,
          }}
        >
          <LogoMark size={130} />
        </div>

        {/* Name */}
        <div
          style={{
            opacity: nameOp,
            transform: `translateY(${nameY}px)`,
            fontFamily: "'InterVar', Inter, sans-serif",
            fontSize: 32,
            fontWeight: 700,
            color: CREAM,
            letterSpacing: "-0.01em",
          }}
        >
          AugustoCS.com
        </div>

        {/* Handle */}
        <div
          style={{
            opacity: subOp,
            fontFamily: "'InterVar', Inter, sans-serif",
            fontSize: 17,
            fontWeight: 300,
            color: RUST,
            letterSpacing: "0.06em",
            marginTop: -12,
          }}
        >
          @AugustoCS.studio
        </div>

        {/* Pill */}
        <div
          style={{
            opacity: pillOp,
            marginTop: 8,
            padding: "13px 36px",
            border: `1px solid ${ra(0.45)}`,
            borderRadius: 100,
            fontFamily: "'InterVar', Inter, sans-serif",
            fontSize: 12,
            fontWeight: 400,
            color: RUST,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          Diseño Web · Shopify · Framer
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Root composition ──────────────────────────────────────────────────────────
export const Reel: React.FC = () => {
  const FADE = 15;
  const t = linearTiming({ durationInFrames: FADE });

  return (
    <AbsoluteFill>
      <TransitionSeries>
        {/* 1 — Intro: 75f */}
        <TransitionSeries.Sequence durationInFrames={75}>
          <SceneIntro />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition timing={t} presentation={fade()} />

        {/* 2 — Hook: 105f */}
        <TransitionSeries.Sequence durationInFrames={105}>
          <SceneHook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition timing={t} presentation={fade()} />

        {/* 3 — Robot Energy (phone): 180f */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <ScenePhone
            imgSrc="projects/robotenergy.webp"
            clientName="Robot Energy"
            projectType="E-commerce Shopify"
            totalFrames={180}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition timing={t} presentation={fade()} />

        {/* 4 — Madre Superiora (laptop): 165f */}
        <TransitionSeries.Sequence durationInFrames={165}>
          <SceneLaptop
            imgSrc="projects/madresuperiora.webp"
            clientName="Madre Superiora"
            projectType="Café de especialidad"
            totalFrames={165}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition timing={t} presentation={fade()} />

        {/* 5 — La Trattoria (phone): 150f */}
        <TransitionSeries.Sequence durationInFrames={150}>
          <ScenePhone
            imgSrc="projects/latrattoria.webp"
            clientName="La Trattoria"
            projectType="Restaurante Italiano"
            totalFrames={150}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition timing={t} presentation={fade()} />

        {/* 6 — Stats + Ticker: 90f */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <SceneTicker />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition timing={t} presentation={fade()} />

        {/* 7 — CTA: 90f */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <SceneCTA />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <Vignette />
      <GrainOverlay />
    </AbsoluteFill>
  );
};
