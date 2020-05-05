import { Settings, ScreenSize } from "./config/settings";
import * as PIXI from "pixi.js";
import { SceneController, SceneLayer } from "./controllers/SceneController";

import screenfull = require("screenfull");

export class App extends PIXI.Application {
  private static instance: App;
  private static _sceneController: SceneController;
  private canvasElement: HTMLCanvasElement;

  constructor(width: number, height: number, resolution: number) {
    const canvasElement = <HTMLCanvasElement>document.getElementById("canvas");
    super({
      view: canvasElement,
      antialias: false,
      backgroundColor: Settings.BgColor,
      roundPixels: Settings.RoundPixels,
      width: ScreenSize.width,
      height: ScreenSize.height,
    });

    this.canvasElement = canvasElement;

    document.body.appendChild(this.view);
  }

  //Create singlenton instance
  public static get application(): App {
    if (!this.instance) {
      this.instance = new App(
        window.innerWidth,
        window.innerHeight,
        window.devicePixelRatio
      );
      this.startControllers();
      this.instance.addListeners();
      this.instance.init();
      this.instance.initFullscreen();
    }
    
    return this.instance;
  }

  private init(): void {
    App.sceneController.loadScene(Settings.Scenes.LoadScene, SceneLayer.UI);
  }

  private static startControllers(): void {
    this._sceneController = new SceneController();
  }

  static get sceneController(): SceneController {
    return this._sceneController;
  }
  
  private addListeners(): void {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  private initFullscreen(): void {
    document.addEventListener("touchend", () => {
      if (screenfull.isEnabled) {
        // this won't work in mobile safari, we need to fix this with more tricky way (showing/hiding overlay)
        screenfull.request();
      }
    });
  }

  private resize(): void {
    const ALIGN_X = 0.5;
    const ALIGN_Y = 0.5;

    const { clientWidth, clientHeight } = document.documentElement;
    const width = clientWidth * window.devicePixelRatio;
    const height = clientHeight * window.devicePixelRatio;
    const scaleCoefficient = Math.min(
      width / ScreenSize.width,
      height / ScreenSize.height
    );

    this.canvasElement.style.width = `${clientWidth}px`;
    this.canvasElement.style.height = `${clientHeight}px`;

    this.stage.x = (width - ScreenSize.width * scaleCoefficient) * ALIGN_X;
    this.stage.y = (height - ScreenSize.height * scaleCoefficient) * ALIGN_Y;
    this.stage.scale.set(scaleCoefficient);

    this.renderer.resize(width, height);

    // node: unfortunately I do not have an iOs device to check resize
  }
}
