import "./index.css";
import { Composition } from "remotion";
import { HelikoreaAd, TOTAL_DURATION } from "./HelikoreaAd";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="HelikoreaForkliftAd"
      component={HelikoreaAd}
      durationInFrames={TOTAL_DURATION}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
