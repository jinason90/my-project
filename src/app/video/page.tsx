"use client";

import { Player } from "@remotion/player";
import {
  HeliLithiumForkliftPromo,
  defaultHeliPromoProps,
} from "@/remotion/compositions/heli-lithium-forklift-promo";
import { FPS, TOTAL_DURATION } from "@/remotion/compositions/heli-lithium-forklift-promo/theme";

export default function VideoPreviewPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "48px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#F0F2FF" }}>
          헬리 리튬전동지게차 홍보 영상
        </div>
        <div style={{ fontSize: 13, color: "#8B90A7", marginTop: 4 }}>
          1080x1920 · 30fps · 30초
        </div>
      </div>
      <div
        style={{
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
          border: "1px solid #2A2D3E",
        }}
      >
        <Player
          component={HeliLithiumForkliftPromo}
          inputProps={defaultHeliPromoProps}
          durationInFrames={TOTAL_DURATION}
          fps={FPS}
          compositionWidth={1080}
          compositionHeight={1920}
          style={{ width: 380, height: (380 * 1920) / 1080 }}
          controls
          loop
        />
      </div>
    </div>
  );
}
