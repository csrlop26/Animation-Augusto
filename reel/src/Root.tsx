import "./index.css";
import { Composition } from "remotion";
import { Reel } from "./Reel";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="AugustoCSReel"
      component={Reel}
      durationInFrames={985}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
