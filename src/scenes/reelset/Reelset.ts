import { SceneLayer } from "../../controllers/SceneController";
import { Scene } from "../../scene";
import { reelsetConfig } from "./reelsetConfig";
import { eventEmitter } from "../../core/EventEmitter";
import { events } from "../../config/events";

import { Reel } from "./Reels/Reel";
import { ReelCircular } from "./Reels/ReelCircular";

export class Reelset extends Scene {
  protected reels: Reel[] = [];
  protected mainContainer: PIXI.Container = new PIXI.Container();

  constructor(layer: SceneLayer) {
    super(layer);

    const { position } = reelsetConfig;
    this.mainContainer.position = new PIXI.Point(position.x, position.y);
    this.sceneContainer.addChild(this.mainContainer);

    this.create();

    // of course we have to use mediator pattern and FSM, so spin could only be started from certain states. Using EventEmitter here is for keeping this example simple
    eventEmitter.on(
      events.UI_SPIN_BUTTON_WAS_PRESSED,
      this.startSpin.bind(this)
    );
  }

  protected create(): void {
    const { reelsCount, reelsetType, anchor } = reelsetConfig;

    for (let reelNumber = 0; reelNumber < reelsCount; reelNumber++) {
      const reel = this.createReel(reelsetType, reelNumber);

      reel.x = reelNumber * (reel.width + reelsetConfig.reelsIndent);
      this.reels.push(reel);
      this.mainContainer.addChild(reel);
    }

    this.mainContainer.pivot = new PIXI.Point(
      this.mainContainer.width * anchor.x,
      this.mainContainer.height * anchor.y
    );
  }

  protected createReel(reelType: string, reelNumber: number): Reel {
    // factory method, should be extended later
    if (reelType === "Circular") {
      return new ReelCircular(reelNumber);
    }
  }

  public startSpin(): void {
    // we need FSM controlling or at least inner flag (but it would be bad) here to prevent starting before finishing previous spin
    this.reels.forEach((reel, index) =>
      setTimeout(
        reel.startSpin.bind(reel),
        index * reelsetConfig.reelsStartDelay
      )
    );

    eventEmitter.emit(events.REELSET_SPIN_WAS_STARTED);

    // we can use callbacks, Promises or any other stuff here
    // but for this simple example I decided to look at the movement of last reel
    eventEmitter.on(events.REEL_SPIN_WAS_STOPPED, ({ reelId }) => {
      if (reelId === this.reels.length - 1) {
        eventEmitter.emit(events.REELSET_SPIN_WAS_STOPPED);
      }
    });
  }

  public update(delta: number): void {}
}
