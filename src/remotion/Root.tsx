import { Composition } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { HeliLithiumForkliftPromo, defaultHeliPromoProps } from "./compositions/heli-lithium-forklift-promo";
import { FPS, TOTAL_DURATION } from "./compositions/heli-lithium-forklift-promo/theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          titleText: "Helikorea",
        }}
      />
      <Composition
        id="HeliLithiumForkliftPromo"
        component={HeliLithiumForkliftPromo}
        durationInFrames={TOTAL_DURATION}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={defaultHeliPromoProps}
      />
    </>
  );
};
