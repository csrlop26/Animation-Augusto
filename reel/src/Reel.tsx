import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  staticFile,
} from "remotion";
import { loadFont } from "@remotion/fonts";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

loadFont({
  family: "InstrumentSerif",
  url: staticFile("fonts/InstrumentSerif-Italic.woff2"),
  weight: "400",
  style: "italic",
});
loadFont({
  family: "InterVar",
  url: staticFile("fonts/Inter-variable.woff2"),
  weight: "100 900",
  style: "normal",
});

const serifFamily = "InstrumentSerif";
const sansFamily = "InterVar";

// ─── Design tokens ───────────────────────────────────────────────
const INK = "#0B0B0B";
const TEXT = "#EFEFEF";
const GOLD = "#B8973E";
const CANVAS = "#F5F4F0";

const ease = Easing.bezier(0.16, 1, 0.3, 1);

// ─── Helpers ─────────────────────────────────────────────────────
function fi(frame: number, from: number, to: number, a: number, b: number) {
  return interpolate(frame, [from, to], [a, b], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
}

function fadeInOut(
  frame: number,
  from: number,
  to: number,
  fadeInDur = 18,
  fadeOutDur = 12
) {
  return interpolate(
    frame,
    [from, from + fadeInDur, to - fadeOutDur, to],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
}

// Word-by-word blur reveal (Remotion-safe — no CSS animations)
function WordReveal({
  text,
  frame,
  from,
  stagger = 7,
  duration = 20,
  fontSize,
  fontFamily,
  fontStyle = "normal",
  fontWeight = "400",
  color = TEXT,
  textAlign = "center" as React.CSSProperties["textAlign"],
  lineHeight = 1.1,
}: {
  text: string;
  frame: number;
  from: number;
  stagger?: number;
  duration?: number;
  fontSize: number;
  fontFamily: string;
  fontStyle?: string;
  fontWeight?: string;
  color?: string;
  textAlign?: React.CSSProperties["textAlign"];
  lineHeight?: number;
}) {
  const words = text.split(" ");
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: textAlign === "left" ? "flex-start" : "center",
        alignItems: "baseline",
      }}
    >
      {words.map((word, i) => {
        const start = from + i * stagger;
        const opacity = fi(frame, start, start + duration, 0, 1);
        const blur = fi(frame, start, start + duration, 8, 0);
        const y = fi(frame, start, start + duration, 24, 0);
        return (
          <span
            key={i}
            style={{
              opacity,
              filter: `blur(${blur}px)`,
              transform: `translateY(${y}px)`,
              display: "inline-block",
              fontSize,
              fontFamily,
              fontStyle,
              fontWeight,
              color,
              lineHeight,
              marginRight: "0.3em",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
}

// Thin horizontal gold line
function GoldLine({
  frame,
  from,
  width = 60,
}: {
  frame: number;
  from: number;
  width?: number;
}) {
  const scaleX = fi(frame, from, from + 30, 0, 1);
  const opacity = fi(frame, from, from + 10, 0, 1);
  return (
    <div
      style={{
        width,
        height: 1,
        background: GOLD,
        opacity,
        transform: `scaleX(${scaleX})`,
        transformOrigin: "left center",
      }}
    />
  );
}

// Phone mockup placeholder
function PhoneMockup({
  frame,
  from,
  label,
}: {
  frame: number;
  from: number;
  label: string;
}) {
  const opacity = fi(frame, from, from + 25, 0, 1);
  const scale = fi(frame, from, from + 25, 0.92, 1);
  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        width: 220,
        borderRadius: 28,
        overflow: "hidden",
        border: `1px solid ${GOLD}33`,
        background: "#111",
      }}
    >
      {/* Notch */}
      <div
        style={{
          height: 26,
          background: "#0a0a0a",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 60,
            height: 10,
            borderRadius: 10,
            background: "#1a1a1a",
          }}
        />
      </div>
      {/* Screen */}
      <div
        style={{
          aspectRatio: "9 / 17",
          background: `linear-gradient(135deg, ${GOLD}08 0%, ${GOLD}14 50%, ${GOLD}08 100%)`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            fontFamily: sansFamily,
            fontSize: 13,
            color: `${GOLD}88`,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </div>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: `1px solid ${GOLD}44`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: sansFamily,
            fontSize: 20,
            color: `${GOLD}66`,
          }}
        >
          +
        </div>
      </div>
    </div>
  );
}

// ─── SCENE 1: Opening ────────────────────────────────────────────
// Duration: 150 frames (5s)
function SceneOpening() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: INK }}>
      {/* Subtle radial gold glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 600px 600px at 50% 45%, ${GOLD}0C 0%, transparent 70%)`,
          opacity: fi(frame, 10, 40, 0, 1),
        }}
      />

      {/* Content column */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: 80,
          paddingRight: 80,
          gap: 32,
        }}
      >
        {/* Gold label */}
        <div
          style={{
            opacity: fi(frame, 5, 25, 0, 1),
            transform: `translateY(${fi(frame, 5, 25, 12, 0)}px)`,
            fontFamily: sansFamily,
            fontWeight: "500",
            fontSize: 22,
            letterSpacing: "0.25em",
            color: GOLD,
            textTransform: "uppercase",
          }}
        >
          Design Studio
        </div>

        {/* Main title */}
        <div style={{ textAlign: "center" }}>
          <WordReveal
            text="AugustoCS"
            frame={frame}
            from={15}
            stagger={12}
            duration={25}
            fontSize={148}
            fontFamily={serifFamily}
            fontStyle="italic"
            color={TEXT}
            lineHeight={0.9}
          />
        </div>

        {/* Gold line */}
        <GoldLine frame={frame} from={55} width={80} />

        {/* Tagline */}
        <div
          style={{
            opacity: fi(frame, 65, 90, 0, 1),
            transform: `translateY(${fi(frame, 65, 90, 10, 0)}px)`,
            fontFamily: sansFamily,
            fontWeight: "300",
            fontSize: 26,
            letterSpacing: "0.18em",
            color: `${TEXT}88`,
            textTransform: "uppercase",
          }}
        >
          Web · UI · Conversión
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ─── SCENE 2: Hook ───────────────────────────────────────────────
// Duration: 180 frames (6s)
function SceneHook() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: INK }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 700px 500px at 50% 50%, ${GOLD}09 0%, transparent 65%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: 72,
          paddingRight: 72,
          gap: 40,
        }}
      >
        {/* Small label */}
        <div
          style={{
            opacity: fi(frame, 0, 20, 0, 1),
            fontFamily: sansFamily,
            fontWeight: "400",
            fontSize: 20,
            letterSpacing: "0.2em",
            color: GOLD,
            textTransform: "uppercase",
          }}
        >
          La realidad
        </div>

        {/* Big cinematic statement */}
        <div style={{ textAlign: "center" }}>
          <WordReveal
            text="Tu web puede hacer más."
            frame={frame}
            from={12}
            stagger={9}
            duration={22}
            fontSize={96}
            fontFamily={serifFamily}
            fontStyle="italic"
            color={TEXT}
            lineHeight={1.05}
          />
        </div>

        <GoldLine frame={frame} from={80} width={60} />

        {/* Sub line */}
        <div style={{ textAlign: "center" }}>
          <WordReveal
            text="Pero necesita diseño intencional."
            frame={frame}
            from={90}
            stagger={7}
            duration={18}
            fontSize={38}
            fontFamily={sansFamily}
            fontWeight="300"
            color={`${TEXT}88`}
            lineHeight={1.4}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ─── SCENE 3: Services ───────────────────────────────────────────
// Duration: 270 frames (9s)
const SERVICES = [
  { num: "01", tag: "Diseño", title: "Webs que convierten", from: 0 },
  { num: "02", tag: "Interfaz", title: "UI que impresiona", from: 55 },
  { num: "03", tag: "Animación", title: "Motion que vende", from: 110 },
];

function SceneServices() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: INK }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 800px 600px at 50% 40%, ${GOLD}07 0%, transparent 60%)`,
        }}
      />

      {/* Section label */}
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: fi(frame, 0, 20, 0, 1),
        }}
      >
        <span
          style={{
            fontFamily: sansFamily,
            fontWeight: "500",
            fontSize: 20,
            letterSpacing: "0.22em",
            color: GOLD,
            textTransform: "uppercase",
          }}
        >
          Servicios
        </span>
      </div>

      {/* Services list */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          paddingLeft: 80,
          paddingRight: 80,
          paddingTop: 280,
          gap: 52,
        }}
      >
        {SERVICES.map(({ num, tag, title, from }) => {
          const opacity = fi(frame, from, from + 30, 0, 1);
          const x = fi(frame, from, from + 30, 40, 0);
          return (
            <div
              key={num}
              style={{
                opacity,
                transform: `translateX(${x}px)`,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <span
                  style={{
                    fontFamily: sansFamily,
                    fontWeight: "400",
                    fontSize: 18,
                    color: GOLD,
                    letterSpacing: "0.12em",
                  }}
                >
                  {num}
                </span>
                <div
                  style={{
                    width: 32,
                    height: 1,
                    background: GOLD,
                    opacity: 0.5,
                  }}
                />
                <span
                  style={{
                    fontFamily: sansFamily,
                    fontWeight: "400",
                    fontSize: 18,
                    color: `${TEXT}55`,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {tag}
                </span>
              </div>
              <div
                style={{
                  fontFamily: serifFamily,
                  fontStyle: "italic",
                  fontSize: 64,
                  color: TEXT,
                  lineHeight: 1,
                }}
              >
                {title}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

// ─── SCENE 4: Work mockups ────────────────────────────────────────
// Duration: 210 frames (7s)
function SceneWork() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#0D0D0D" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 700px 500px at 50% 50%, ${GOLD}0A 0%, transparent 65%)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 60,
          paddingLeft: 80,
          paddingRight: 80,
        }}
      >
        {/* Label */}
        <div
          style={{
            opacity: fi(frame, 0, 20, 0, 1),
            fontFamily: sansFamily,
            fontWeight: "500",
            fontSize: 20,
            letterSpacing: "0.22em",
            color: GOLD,
            textTransform: "uppercase",
          }}
        >
          Proyectos
        </div>

        {/* Big statement */}
        <div style={{ textAlign: "center" }}>
          <WordReveal
            text="Cada pixel cuenta."
            frame={frame}
            from={15}
            stagger={10}
            duration={22}
            fontSize={112}
            fontFamily={serifFamily}
            fontStyle="italic"
            color={TEXT}
            lineHeight={0.95}
          />
        </div>

        {/* Phone mockups row */}
        <div
          style={{
            display: "flex",
            gap: 24,
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <PhoneMockup frame={frame} from={70} label="web 01" />
          <PhoneMockup frame={frame} from={90} label="web 02" />
          <PhoneMockup frame={frame} from={110} label="web 03" />
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ─── SCENE 5: Stats ──────────────────────────────────────────────
// Duration: 180 frames (6s)
const STATS = [
  { value: "10+", label: "webs lanzadas", from: 10 },
  { value: "2×", label: "conversión media", from: 55 },
  { value: "100%", label: "clientes satisfechos", from: 100 },
];

function SceneStats() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{ background: CANVAS }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 600px 400px at 50% 50%, #C8A04E14 0%, transparent 60%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: 80,
          paddingRight: 80,
          gap: 70,
        }}
      >
        {/* Label */}
        <div
          style={{
            opacity: fi(frame, 0, 20, 0, 1),
            fontFamily: sansFamily,
            fontWeight: "500",
            fontSize: 20,
            letterSpacing: "0.22em",
            color: "#8A6F2E",
            textTransform: "uppercase",
          }}
        >
          En números
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 44,
            width: "100%",
          }}
        >
          {STATS.map(({ value, label, from }) => {
            const opacity = fi(frame, from, from + 25, 0, 1);
            const y = fi(frame, from, from + 25, 30, 0);
            return (
              <div
                key={value}
                style={{
                  opacity,
                  transform: `translateY(${y}px)`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    fontFamily: serifFamily,
                    fontStyle: "italic",
                    fontSize: 120,
                    color: "#0B0B0B",
                    lineHeight: 0.9,
                  }}
                >
                  {value}
                </div>
                <div
                  style={{
                    fontFamily: sansFamily,
                    fontWeight: "400",
                    fontSize: 28,
                    letterSpacing: "0.1em",
                    color: "#0B0B0B88",
                    textTransform: "uppercase",
                  }}
                >
                  {label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ─── SCENE 6: CTA ────────────────────────────────────────────────
// Duration: 180 frames (6s)
function SceneCTA() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: INK }}>
      {/* Gold vignette glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 700px 700px at 50% 50%, ${GOLD}12 0%, transparent 65%)`,
          opacity: fi(frame, 10, 50, 0, 1),
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: 80,
          paddingRight: 80,
          gap: 44,
        }}
      >
        {/* Pre-label */}
        <div
          style={{
            opacity: fi(frame, 5, 25, 0, 1),
            fontFamily: sansFamily,
            fontWeight: "400",
            fontSize: 22,
            letterSpacing: "0.2em",
            color: `${TEXT}66`,
            textTransform: "uppercase",
          }}
        >
          ¿Listo para empezar?
        </div>

        {/* Handle */}
        <div style={{ textAlign: "center" }}>
          <WordReveal
            text="@AugustoCS.studio"
            frame={frame}
            from={20}
            stagger={8}
            duration={22}
            fontSize={84}
            fontFamily={serifFamily}
            fontStyle="italic"
            color={GOLD}
            lineHeight={1.0}
          />
        </div>

        <GoldLine frame={frame} from={90} width={80} />

        {/* CTA line */}
        <div
          style={{
            opacity: fi(frame, 100, 120, 0, 1),
            transform: `translateY(${fi(frame, 100, 120, 12, 0)}px)`,
            fontFamily: sansFamily,
            fontWeight: "300",
            fontSize: 30,
            letterSpacing: "0.14em",
            color: `${TEXT}77`,
            textTransform: "uppercase",
          }}
        >
          DM para empezar
        </div>

        {/* Website */}
        <div
          style={{
            opacity: fi(frame, 115, 135, 0, 1),
            fontFamily: sansFamily,
            fontWeight: "400",
            fontSize: 22,
            color: `${GOLD}99`,
            letterSpacing: "0.1em",
          }}
        >
          AugustoCS.com
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ─── SCENE 7: End Card ───────────────────────────────────────────
// Duration: 120 frames (4s)
function SceneEndCard() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: INK }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 500px 500px at 50% 48%, ${GOLD}10 0%, transparent 60%)`,
          opacity: fi(frame, 0, 30, 0, 1),
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 28,
        }}
      >
        {/* Monogram */}
        <div
          style={{
            opacity: fi(frame, 5, 30, 0, 1),
            transform: `scale(${fi(frame, 5, 30, 0.85, 1)})`,
            width: 100,
            height: 100,
            borderRadius: "50%",
            border: `1px solid ${GOLD}55`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: serifFamily,
            fontStyle: "italic",
            fontSize: 52,
            color: GOLD,
          }}
        >
          A
        </div>

        <div
          style={{
            opacity: fi(frame, 30, 55, 0, 1),
            fontFamily: serifFamily,
            fontStyle: "italic",
            fontSize: 64,
            color: TEXT,
            lineHeight: 1,
          }}
        >
          AugustoCS
        </div>

        <div
          style={{
            opacity: fi(frame, 45, 65, 0, 1),
            fontFamily: sansFamily,
            fontWeight: "300",
            fontSize: 22,
            letterSpacing: "0.2em",
            color: `${TEXT}66`,
            textTransform: "uppercase",
          }}
        >
          studio
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ─── ROOT COMPOSITION ────────────────────────────────────────────
// Total: ~900 frames @ 30fps = 30s
// Scenes: 150 + 180 + 270 + 210 + 180 + 180 + 120 = 1290, minus 6×15 transitions = 1200 > 900
// Tighten: 120 + 150 + 200 + 170 + 150 + 150 + 90 = 1030, minus 6×15 = 940 ≈ 900
const FADE_DUR = 15;

export const Reel: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={130}>
        <SceneOpening />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: FADE_DUR })}
      />

      <TransitionSeries.Sequence durationInFrames={160}>
        <SceneHook />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: FADE_DUR })}
      />

      <TransitionSeries.Sequence durationInFrames={210}>
        <SceneServices />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: FADE_DUR })}
      />

      <TransitionSeries.Sequence durationInFrames={175}>
        <SceneWork />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: FADE_DUR })}
      />

      <TransitionSeries.Sequence durationInFrames={155}>
        <SceneStats />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: FADE_DUR })}
      />

      <TransitionSeries.Sequence durationInFrames={155}>
        <SceneCTA />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: FADE_DUR })}
      />

      <TransitionSeries.Sequence durationInFrames={90}>
        <SceneEndCard />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
