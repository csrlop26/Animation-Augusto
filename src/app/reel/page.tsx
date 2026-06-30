"use client";

import { Player } from "@remotion/player";
import { Reel } from "../../remotion/Reel";

export default function ReelPage() {
  return (
    <div
      style={{
        minHeight: "100svh",
        background: "#0B0B0B",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        gap: "16px",
      }}
    >
      <p
        style={{
          fontFamily: "system-ui, sans-serif",
          fontSize: "11px",
          letterSpacing: "0.15em",
          color: "#B8973E",
          textTransform: "uppercase",
          margin: 0,
        }}
      >
        AugustoCS · Reel Preview
      </p>

      <div
        style={{
          width: "100%",
          maxWidth: "390px",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 0 60px #B8973E18",
        }}
      >
        <Player
          component={Reel}
          durationInFrames={1050}
          fps={30}
          compositionWidth={1080}
          compositionHeight={1920}
          style={{ width: "100%", aspectRatio: "9/16" }}
          controls
          autoPlay
          loop
          initialFrame={40}
          acknowledgeRemotionLicense
        />
      </div>
    </div>
  );
}
