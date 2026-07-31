import { AbsoluteFill, Sequence } from "remotion";
import { ClosingScene } from "./scenes/ClosingScene";
import { FeatureGridScene } from "./scenes/FeatureGridScene";
import { HeroSpecScene } from "./scenes/HeroSpecScene";
import { OpeningScene } from "./scenes/OpeningScene";
import { ProblemScene } from "./scenes/ProblemScene";
import { ProductRevealScene } from "./scenes/ProductRevealScene";
import { SCENES, palette } from "./theme";
import type { HeliPromoProps } from "./content";

export const HeliLithiumForkliftPromo: React.FC<HeliPromoProps> = (props) => {
  return (
    <AbsoluteFill style={{ backgroundColor: palette.black }}>
      <Sequence from={SCENES.opening.from} durationInFrames={SCENES.opening.duration}>
        <OpeningScene brandName={props.brandName} brandSub={props.brandSub} headline={props.headline} />
      </Sequence>
      <Sequence from={SCENES.problem.from} durationInFrames={SCENES.problem.duration}>
        <ProblemScene problems={props.problems} />
      </Sequence>
      <Sequence from={SCENES.product.from} durationInFrames={SCENES.product.duration}>
        <ProductRevealScene productName={props.productName} />
      </Sequence>
      <Sequence from={SCENES.heroSpecs.from} durationInFrames={SCENES.heroSpecs.duration}>
        <HeroSpecScene specs={props.heroSpecs} />
      </Sequence>
      <Sequence from={SCENES.featureSpecs.from} durationInFrames={SCENES.featureSpecs.duration}>
        <FeatureGridScene features={props.featureSpecs} />
      </Sequence>
      <Sequence from={SCENES.closing.from} durationInFrames={SCENES.closing.duration}>
        <ClosingScene
          brandName={props.brandName}
          brandSub={props.brandSub}
          ctaText={props.ctaText}
          contact={props.contact}
          durationInFrames={SCENES.closing.duration}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

export { defaultHeliPromoProps } from "./content";
export type { HeliPromoProps } from "./content";
