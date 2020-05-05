import { LoadScene } from "../scenes/loader.scene";
import { uiScene } from "../scenes/ui/UI";
import { Reelset as ReelsetScene } from "../scenes/reelset/Reelset";
import { ParticleScene } from "../scenes/particles/Particles";

export class Settings {
  static BgColor: number = 0x232323;
  static RoundPixels: boolean = false;
  static Scenes = {
    LoadScene,
    uiScene,
    ReelsetScene,
    ParticleScene,
  };
}

export const ScreenSize = { width: 1280, height: 720 };
