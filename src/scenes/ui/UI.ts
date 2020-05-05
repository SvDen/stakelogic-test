import { SceneLayer } from "../../controllers/SceneController";
import { loadedFiles, imagesRes } from "../../config/resources";
import { Scene } from "../../scene";
import { eventEmitter } from "../../core/EventEmitter";
import { Button } from "../../core/Button";
import { uiConfig } from "./uiConfig";
import { events } from "../../config/events";

export class uiScene extends Scene {
  private spinBtn: Button;

  constructor(layer: SceneLayer) {
    super(layer);

    this.create();
  }

  protected create(): void {
    this.spinBtn = new Button(loadedFiles[imagesRes.spinBtn].texture);

    this.spinBtn.position = new PIXI.Point(
      uiConfig.position.x,
      uiConfig.position.y
    );
    this.spinBtn.anchor.x = uiConfig.anchor.x;
    this.spinBtn.anchor.y = uiConfig.anchor.y;

    this.spinBtn.onClick = () =>
      eventEmitter.emit(events.UI_SPIN_BUTTON_WAS_PRESSED);

    this.sceneContainer.addChild(this.spinBtn);
  }

  public update(delta: number): void {}
}
