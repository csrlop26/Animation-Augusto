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
const expo = Easing.bezier(0.16, 1, 0.3, 1);
const sharp = Easing.bezier(0.4, 0, 0.6, 1);

function fi(
  f: number,
  from: number,
  to: number,
  a: number,
  b: number,
  easing = expo
): number {
  return interpolate(f, [from, to], [a, b], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });
}

// ── Character-by-character reveal ────────────────────────────────────────────
function CharReveal({
  text,
  f,
  start,
  stagger = 2.5,
  dur = 16,
  style,
}: {
  text: string;
  f: number;
  start: number;
  stagger?: number;
  dur?: number;
  style?: React.CSSProperties;
}) {
  return (
    <span style={{ display: "inline-block", ...style }}>
      {text.split("").map((ch, i) => {
        const s = start + i * stagger;
        const op = fi(f, s, s + dur, 0, 1);
        const y = fi(f, s, s + dur, 28, 0);
        const blur = fi(f, s, s + dur, 6, 0);
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: op,
              transform: `translateY(${y}px)`,
              filter: `blur(${blur}px)`,
              whiteSpace: "pre",
            }}
          >
            {ch}
          </span>
        );
      })}
    </span>
  );
}

// ── Growing line ──────────────────────────────────────────────────────────────
function Line({
  f,
  start,
  dur = 28,
  maxW = 936,
  color = ra(0.4),
  style,
}: {
  f: number;
  start: number;
  dur?: number;
  maxW?: number;
  color?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        width: fi(f, start, start + dur, 0, maxW),
        height: 1,
        background: color,
        ...style,
      }}
    />
  );
}

// ── Logo SVG ──────────────────────────────────────────────────────────────────
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
    {/* Left stroke — cream, drawn first (below) */}
    <polygon points="8,92 37,92 51,9 45,9" fill="#E8E3D8" />
    {/* Right stroke — dark charcoal, drawn on top */}
    <polygon points="52,92 84,92 61,9 54,9" fill="#2A2727" />
    {/* Crossbar — dark, sits over both strokes */}
    <polygon points="22,60 76,60 78,71 20,71" fill="#2A2727" />
    {/* Orange dot */}
    <circle cx="79" cy="21" r="9" fill="#C96A3A" />
  </svg>
);

// ── Corner bracket (construction marker) ─────────────────────────────────────
function CornerBracket({
  size = 18,
  flipX = false,
  flipY = false,
  color = RUST,
  style,
}: {
  size?: number;
  flipX?: boolean;
  flipY?: boolean;
  color?: string;
  style?: React.CSSProperties;
}) {
  const path = !flipX && !flipY
    ? `M0,${size} L0,0 L${size},0`
    : flipX && !flipY
    ? `M${size},${size} L${size},0 L0,0`
    : !flipX && flipY
    ? `M0,0 L0,${size} L${size},${size}`
    : `M${size},0 L${size},${size} L0,${size}`;
  return (
    <svg
      width={size}
      height={size}
      style={{ position: "absolute", ...style }}
    >
      <path d={path} stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  );
}

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
        opacity: 0.04,
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
        "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 28%, rgba(0,0,0,0.68) 100%)",
    }}
  />
);

// ── Scene 1: INTRO ────────────────────────────────────────────────────────────
const SceneIntro: React.FC = () => {
  const f = useCurrentFrame();

  // Line draws out from centre
  const lineW = fi(f, 5, 40, 0, 420);
  const lineOp = fi(f, 5, 15, 0, 1);

  // Logo builds: left stroke, right stroke, crossbar, dot — staggered
  const leftOp = fi(f, 20, 42, 0, 1);
  const leftX = fi(f, 20, 42, -24, 0);
  const rightOp = fi(f, 28, 50, 0, 1);
  const rightX = fi(f, 28, 50, 24, 0);
  const crossOp = fi(f, 36, 52, 0, 1);
  const dotOp = fi(f, 44, 60, 0, 1);
  const dotScale = fi(f, 44, 60, 0, 1);

  const nameOp = fi(f, 52, 72, 0, 1);
  const subOp = fi(f, 62, 75, 0, 1);

  // Ambient glow
  const glow = fi(f, 0, 75, 0, 1);
  const glowPulse = 0.8 + Math.sin((f / 40) * Math.PI * 2) * 0.14;

  return (
    <AbsoluteFill
      style={{ background: BG, alignItems: "center", justifyContent: "center" }}
    >
      {/* Ambient radial glow */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${ra(0.18 * glow * glowPulse)} 0%, transparent 65%)`,
          filter: "blur(90px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      {/* Horizontal rule from centre */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) translateY(-90px)",
          opacity: lineOp,
          display: "flex",
        }}
      >
        <div
          style={{
            width: lineW,
            height: 1,
            background: `linear-gradient(to right, ${ra(0.6)}, ${ra(0.15)})`,
            transform: "scaleX(-1)",
          }}
        />
        <div
          style={{
            width: lineW,
            height: 1,
            background: `linear-gradient(to right, ${ra(0.6)}, ${ra(0.15)})`,
          }}
        />
      </div>

      {/* Logo assembled piece by piece */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 26,
        }}
      >
        <div style={{ position: "relative", width: 140, height: 140 }}>
          {/* Clip left half */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: leftOp,
              transform: `translateX(${leftX}px)`,
              clipPath: "inset(0 50% 0 0)",
            }}
          >
            <LogoMark size={140} />
          </div>
          {/* Clip right half (includes dot) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: rightOp,
              transform: `translateX(${rightX}px)`,
              clipPath: "inset(0 0 0 50%)",
            }}
          >
            <LogoMark size={140} />
          </div>
          {/* Crossbar mid reveal */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: crossOp,
              clipPath: "inset(55% 0 28% 0)",
            }}
          >
            <LogoMark size={140} />
          </div>
          {/* Dot pop */}
          <div
            style={{
              position: "absolute",
              right: 6,
              top: 14,
              width: 26,
              height: 26,
              borderRadius: "50%",
              background: RUST,
              opacity: dotOp,
              transform: `scale(${dotScale})`,
              boxShadow: `0 0 20px 6px ${ra(0.5 * dotOp)}`,
            }}
          />
        </div>

        {/* AugustoCS — char by char */}
        <div
          style={{
            fontFamily: "'InterVar', Inter, sans-serif",
            fontSize: 19,
            fontWeight: 300,
            color: ca(0.55),
            letterSpacing: "0.48em",
            textTransform: "uppercase",
            opacity: nameOp,
          }}
        >
          AugustoCS
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 168,
          opacity: subOp,
          fontFamily: "'InterVar', Inter, sans-serif",
          fontSize: 12,
          fontWeight: 300,
          color: ca(0.28),
          letterSpacing: "0.28em",
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

  // Underline for "que vende."
  const underlineW = fi(f, 75, 100, 0, 468);

  return (
    <AbsoluteFill
      style={{ background: BG, justifyContent: "center", paddingLeft: 68 }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 80% 55% at 0% 55%, ${ra(0.09)} 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />

      {/* Top rule */}
      <Line f={f} start={0} dur={22} maxW={936} style={{ position: "absolute", top: 180, left: 72 }} />

      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Line 1 */}
        <div
          style={{
            fontFamily: "'InterVar', Inter, sans-serif",
            fontSize: 108,
            fontWeight: 800,
            color: CREAM,
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
            display: "block",
          }}
        >
          <CharReveal text="Diseño web" f={f} start={8} stagger={2.5} dur={18} />
        </div>

        {/* Line 2 + underline */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              fontFamily: "'InterVar', Inter, sans-serif",
              fontSize: 108,
              fontWeight: 800,
              color: RUST,
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
            }}
          >
            <CharReveal text="que vende." f={f} start={32} stagger={2.5} dur={18} />
          </div>
          {/* Underline draws */}
          <div
            style={{
              position: "absolute",
              bottom: -6,
              left: 0,
              width: underlineW,
              height: 2,
              background: RUST,
              opacity: 0.6,
            }}
          />
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 40,
            opacity: fi(f, 80, 100, 0, 1),
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div style={{ width: 28, height: 1, background: ra(0.5) }} />
          <div
            style={{
              fontFamily: "'InterVar', Inter, sans-serif",
              fontSize: 13,
              fontWeight: 300,
              color: ca(0.42),
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            Premium · Conversión · Resultados
          </div>
        </div>
      </div>

      {/* Bottom rule */}
      <Line
        f={f}
        start={60}
        dur={28}
        maxW={936}
        style={{ position: "absolute", bottom: 180, left: 72 }}
      />
    </AbsoluteFill>
  );
};

// ── Device scene shared ────────────────────────────────────────────────────────
interface DeviceProps {
  imgSrc: string;
  clientName: string;
  projectType: string;
  url: string;
  totalFrames: number;
  // Camera: where it starts, where it settles, orbit amplitude
  initRotY: number;
  settleRotY: number;
  initRotX: number;
  settleRotX: number;
  orbitY?: number;
  orbitX?: number;
  orbitPeriod?: number;
  layout: "phone" | "laptop";
  entryFrom?: "bottom" | "top" | "left" | "right";
}

const DeviceScene: React.FC<DeviceProps> = ({
  imgSrc,
  clientName,
  projectType,
  url,
  totalFrames,
  initRotY,
  settleRotY,
  initRotX,
  settleRotX,
  orbitY = 5,
  orbitX = 2,
  orbitPeriod = 140,
  layout,
  entryFrom = "bottom",
}) => {
  const f = useCurrentFrame();

  const ENTRY = 70;
  const entryP = fi(f, 0, ENTRY, 0, 1);
  const postEntry = Math.max(0, f - ENTRY);

  // Camera: entry animation then continuous gentle orbit
  const rotY =
    fi(f, 0, ENTRY, initRotY, settleRotY) +
    Math.sin((postEntry / orbitPeriod) * Math.PI * 2) * orbitY;
  const rotX =
    fi(f, 0, ENTRY, initRotX, settleRotX) +
    Math.cos((postEntry / (orbitPeriod * 1.3)) * Math.PI * 2) * orbitX;

  // Entry translation
  const ex =
    entryFrom === "left"
      ? fi(f, 0, ENTRY, -250, 0)
      : entryFrom === "right"
      ? fi(f, 0, ENTRY, 250, 0)
      : 0;
  const ey =
    entryFrom === "bottom"
      ? fi(f, 0, ENTRY, 200, 0)
      : entryFrom === "top"
      ? fi(f, 0, ENTRY, -200, 0)
      : 0;

  // Organic float (post-entry)
  const floatY = noise2D("fy" + imgSrc, f / 85, 0) * 10 * fi(f, ENTRY, ENTRY + 20, 0, 1);
  const floatX = noise2D("fx" + imgSrc, f / 100, 0) * 5 * fi(f, ENTRY, ENTRY + 20, 0, 1);

  // Glow intensity
  const glowBase = fi(f, 0, ENTRY + 20, 0, 1);
  const glowPulse = 0.78 + Math.sin((f / 55) * Math.PI * 2) * 0.14;
  const glow = glowBase * glowPulse;

  // Light sweep across device (once, during entry)
  const sweep = fi(f, 25, 90, -25, 130, sharp);

  // Image slow pan
  const scrollPos = fi(f, ENTRY, totalFrames - 10, 0, 25);

  // Label
  const labelOp = fi(f, ENTRY + 10, ENTRY + 30, 0, 1);
  const labelY = fi(f, ENTRY + 10, ENTRY + 30, 16, 0);

  // Corner brackets
  const bracketOp = fi(f, ENTRY + 5, ENTRY + 25, 0, 1);

  // Device dimensions
  const W = layout === "phone" ? 390 : 840;
  const H = layout === "phone" ? 840 : 520;
  const R = layout === "phone" ? 50 : 14;

  const deviceOp = fi(f, 0, 40, 0, 1);

  return (
    <AbsoluteFill
      style={{ background: BG, alignItems: "center", justifyContent: "center" }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${ra(0.18 * glow)} 0%, transparent 65%)`,
          filter: "blur(90px)",
          top: layout === "phone" ? "42%" : "46%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      {/* Device mockup */}
      <div
        style={{
          opacity: deviceOp,
          transform: `translate(${ex + floatX}px, ${ey + floatY}px) perspective(1500px) rotateY(${rotY}deg) rotateX(${rotX}deg)`,
          transformOrigin: "center center",
          marginBottom: layout === "phone" ? 130 : 160,
          position: "relative",
          width: W,
          height: H,
          flexShrink: 0,
        }}
      >
        {/* Corner construction brackets */}
        <CornerBracket
          style={{ top: -12, left: -12, opacity: bracketOp }}
        />
        <CornerBracket
          flipX
          style={{ top: -12, right: -12, opacity: bracketOp }}
        />
        <CornerBracket
          flipY
          style={{ bottom: -12, left: -12, opacity: bracketOp }}
        />
        <CornerBracket
          flipX
          flipY
          style={{ bottom: -12, right: -12, opacity: bracketOp }}
        />

        {/* Device frame */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: R,
            background: "#0B0B0B",
            border: "1.5px solid rgba(255,255,255,0.06)",
            boxShadow: `
              0 0 0 1px ${ra(0.5 * glow)},
              0 0 24px 5px ${ra(0.3 * glow)},
              0 0 65px 18px ${ra(0.14 * glow)},
              0 0 130px 45px ${ra(0.06 * glow)},
              0 60px 130px 40px rgba(0,0,0,0.95)
            `,
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Dynamic island / camera dot */}
          {layout === "phone" && (
            <div
              style={{
                position: "absolute",
                top: 14,
                left: "50%",
                transform: "translateX(-50%)",
                width: 120,
                height: 34,
                background: "#040404",
                borderRadius: 17,
                zIndex: 15,
              }}
            />
          )}
          {layout === "laptop" && (
            <div
              style={{
                position: "absolute",
                top: 7,
                left: "50%",
                transform: "translateX(-50%)",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#1c1c1c",
                zIndex: 15,
              }}
            />
          )}

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

          {/* Light sweep */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 22,
              pointerEvents: "none",
              borderRadius: R,
              background: `linear-gradient(
                128deg,
                transparent ${sweep - 18}%,
                rgba(255,255,255,0.05) ${sweep - 6}%,
                rgba(255,255,255,0.18) ${sweep}%,
                rgba(255,255,255,0.05) ${sweep + 6}%,
                transparent ${sweep + 18}%
              )`,
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
                "linear-gradient(148deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.025) 20%, transparent 42%)",
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
              boxShadow: `inset 0 0 28px 5px ${ra(0.2 * glowBase)}`,
            }}
          />
        </div>
      </div>

      {/* Label */}
      <div
        style={{
          position: "absolute",
          bottom: 128,
          left: 72,
          opacity: labelOp,
          transform: `translateY(${labelY}px)`,
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}
        >
          <div style={{ width: 28, height: 1, background: RUST }} />
          <div
            style={{
              fontFamily: "'InterVar', Inter, sans-serif",
              fontSize: 11,
              fontWeight: 500,
              color: RUST,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
            }}
          >
            {projectType}
          </div>
        </div>
        <div
          style={{
            fontFamily: "'InterVar', Inter, sans-serif",
            fontSize: 36,
            fontWeight: 700,
            color: CREAM,
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
          }}
        >
          {clientName}
        </div>
        <div
          style={{
            marginTop: 6,
            fontFamily: "'InterVar', Inter, sans-serif",
            fontSize: 13,
            fontWeight: 300,
            color: ca(0.32),
            letterSpacing: "0.04em",
          }}
        >
          {url}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 6: Stats + Ticker ───────────────────────────────────────────────────
const SceneTicker: React.FC = () => {
  const f = useCurrentFrame();

  const countTarget = 7;
  const count = Math.round(fi(f, 0, 55, 0, countTarget));
  const countOp = fi(f, 0, 20, 0, 1);
  const countBlur = fi(f, 0, 20, 16, 0);
  const countScale = fi(f, 0, 20, 0.85, 1);

  const lineOp = fi(f, 40, 58, 0, 1);
  const tickerOp = fi(f, 48, 65, 0, 1);

  // Ticker scrolls left
  const tickerX = fi(f, 0, 90, 100, -2800);

  const TICKER =
    "Robot Energy  ·  Madre Superiora  ·  La Trattoria  ·  AutoTietz  ·  Nova  ·  Odentrics  ·  La Piccoleta  ·  B2Tech  ·  Robot Energy  ·  Madre Superiora  ·  La Trattoria  ·  ";

  return (
    <AbsoluteFill
      style={{ background: BG, justifyContent: "center", overflow: "hidden" }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 75% 50% at 50% 42%, ${ra(0.1)} 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />

      {/* Counter */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          opacity: countOp,
          filter: `blur(${countBlur}px)`,
          transform: `scale(${countScale})`,
        }}
      >
        <div
          style={{
            fontFamily: "'InterVar', Inter, sans-serif",
            fontSize: 210,
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
            color: ca(0.38),
            letterSpacing: "0.38em",
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
          bottom: 218,
          left: 0,
          right: 0,
          height: 1,
          opacity: lineOp,
          background: `linear-gradient(to right, transparent 5%, ${ra(0.3)} 30%, ${ra(0.3)} 70%, transparent 95%)`,
        }}
      />

      {/* Ticker */}
      <div
        style={{
          position: "absolute",
          bottom: 144,
          left: 0,
          right: 0,
          overflow: "hidden",
          opacity: tickerOp,
        }}
      >
        <div
          style={{
            display: "inline-block",
            whiteSpace: "nowrap",
            transform: `translateX(${tickerX}px)`,
            fontFamily: "'InterVar', Inter, sans-serif",
            fontSize: 12,
            fontWeight: 300,
            color: ca(0.25),
            letterSpacing: "0.22em",
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

  const glow = fi(f, 0, 60, 0, 1);
  const glowPulse = 0.82 + Math.sin((f / 38) * Math.PI * 2) * 0.13;

  const logoOp = fi(f, 0, 26, 0, 1);
  const logoScale = fi(f, 0, 26, 0.85, 1);

  const nameOp = fi(f, 20, 44, 0, 1);
  const nameY = fi(f, 20, 44, 20, 0);

  const handleOp = fi(f, 32, 54, 0, 1);
  const pillOp = fi(f, 50, 70, 0, 1);

  const lineOp = fi(f, 10, 30, 0, 1);
  const lineW = fi(f, 10, 30, 0, 180);

  return (
    <AbsoluteFill
      style={{ background: BG, alignItems: "center", justifyContent: "center" }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 580,
          height: 580,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${ra(0.22 * glow * glowPulse)} 0%, transparent 65%)`,
          filter: "blur(75px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        {/* Horizontal line before logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            opacity: lineOp,
            marginBottom: 4,
          }}
        >
          <div
            style={{
              width: lineW,
              height: 1,
              background: `linear-gradient(to right, transparent, ${ra(0.5)})`,
            }}
          />
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: RUST,
              boxShadow: `0 0 10px 3px ${ra(0.6)}`,
            }}
          />
          <div
            style={{
              width: lineW,
              height: 1,
              background: `linear-gradient(to left, transparent, ${ra(0.5)})`,
            }}
          />
        </div>

        {/* Logo */}
        <div
          style={{
            opacity: logoOp,
            transform: `scale(${logoScale})`,
            filter: logoOp < 1 ? `blur(${(1 - logoOp) * 6}px)` : "none",
          }}
        >
          <LogoMark size={128} />
        </div>

        {/* Name */}
        <div
          style={{
            opacity: nameOp,
            transform: `translateY(${nameY}px)`,
            fontFamily: "'InterVar', Inter, sans-serif",
            fontSize: 30,
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
            opacity: handleOp,
            marginTop: -8,
            fontFamily: "'InterVar', Inter, sans-serif",
            fontSize: 16,
            fontWeight: 300,
            color: RUST,
            letterSpacing: "0.06em",
          }}
        >
          @AugustoCS.studio
        </div>

        {/* Pill */}
        <div
          style={{
            opacity: pillOp,
            marginTop: 10,
            padding: "12px 34px",
            border: `1px solid ${ra(0.45)}`,
            borderRadius: 100,
            fontFamily: "'InterVar', Inter, sans-serif",
            fontSize: 11,
            fontWeight: 400,
            color: ra(0.9),
            letterSpacing: "0.26em",
            textTransform: "uppercase",
          }}
        >
          Diseño Web · Shopify · Framer
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Root ──────────────────────────────────────────────────────────────────────
export const Reel: React.FC = () => {
  const FADE = 15;
  const t = linearTiming({ durationInFrames: FADE });

  return (
    <AbsoluteFill>
      <TransitionSeries>
        {/* 1 — Intro 75f */}
        <TransitionSeries.Sequence durationInFrames={75}>
          <SceneIntro />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition timing={t} presentation={fade()} />

        {/* 2 — Hook 105f */}
        <TransitionSeries.Sequence durationInFrames={105}>
          <SceneHook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition timing={t} presentation={fade()} />

        {/* 3 — Robot Energy: phone, enters from bottom-right tilt */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <DeviceScene
            imgSrc="projects/robotenergy.webp"
            clientName="Robot Energy"
            projectType="E-commerce Shopify"
            url="robotenergy.com"
            totalFrames={180}
            layout="phone"
            entryFrom="bottom"
            initRotY={-28}
            settleRotY={-8}
            initRotX={8}
            settleRotX={2}
            orbitY={5}
            orbitX={2}
            orbitPeriod={130}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition timing={t} presentation={fade()} />

        {/* 4 — Madre Superiora: laptop, enters from top-left tilt */}
        <TransitionSeries.Sequence durationInFrames={165}>
          <DeviceScene
            imgSrc="projects/madresuperiora.webp"
            clientName="Madre Superiora"
            projectType="Café de especialidad"
            url="madresuperioracoffee.com"
            totalFrames={165}
            layout="laptop"
            entryFrom="top"
            initRotY={20}
            settleRotY={6}
            initRotX={14}
            settleRotX={5}
            orbitY={4}
            orbitX={3}
            orbitPeriod={150}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition timing={t} presentation={fade()} />

        {/* 5 — La Trattoria: phone, enters from right */}
        <TransitionSeries.Sequence durationInFrames={150}>
          <DeviceScene
            imgSrc="projects/latrattoria.webp"
            clientName="La Trattoria"
            projectType="Restaurante Italiano"
            url="latrattoria.augustocs.com"
            totalFrames={150}
            layout="phone"
            entryFrom="right"
            initRotY={24}
            settleRotY={7}
            initRotX={-4}
            settleRotX={-1}
            orbitY={5}
            orbitX={2}
            orbitPeriod={110}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition timing={t} presentation={fade()} />

        {/* 6 — Stats + Ticker 90f */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <SceneTicker />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition timing={t} presentation={fade()} />

        {/* 7 — CTA 90f */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <SceneCTA />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <Vignette />
      <GrainOverlay />
    </AbsoluteFill>
  );
};
