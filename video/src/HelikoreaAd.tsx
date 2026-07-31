import { AbsoluteFill, Sequence } from "remotion";
import { Intro } from "./scenes/Intro";
import { TipScene } from "./scenes/TipScene";
import { Outro } from "./scenes/Outro";
import { tips } from "./data/tips";

export const INTRO_DURATION = 90;
export const TIP_DURATION = 120;
export const OUTRO_DURATION = 90;
export const TOTAL_DURATION =
  INTRO_DURATION + tips.length * TIP_DURATION + OUTRO_DURATION;

export const HelikoreaAd: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#08080C" }}>
      <Sequence durationInFrames={INTRO_DURATION}>
        <Intro />
      </Sequence>
      {tips.map((tip, i) => (
        <Sequence
          key={tip.number}
          from={INTRO_DURATION + i * TIP_DURATION}
          durationInFrames={TIP_DURATION}
        >
          <TipScene tip={tip} index={i} total={tips.length} />
        </Sequence>
      ))}
      <Sequence
        from={INTRO_DURATION + tips.length * TIP_DURATION}
        durationInFrames={OUTRO_DURATION}
      >
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
