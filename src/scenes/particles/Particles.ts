import particles = require("pixi-particles");

import { SceneLayer } from "../../controllers/SceneController";
import { Scene } from "../../scene";
import { eventEmitter } from "../../core/EventEmitter";
import { particlesConfig } from "./particlesConfig";
import { events } from "../../config/events";

export class ParticleScene extends Scene {
  private emitter: particles.Emitter;

  constructor(layer: SceneLayer) {
    super(layer);

    this.create();
  }

  protected create(): void {
    eventEmitter.on(events.REELSET_SPIN_WAS_STOPPED, this.emitParticles.bind(this));
  }

  protected emitParticles(): void {
    if (this.emitter) {
      this.emitter.destroy();
    }

    this.emitter = new particles.Emitter(
      this.sceneContainer,
      [PIXI.Texture.fromImage("spark")],
      particlesConfig.parameters
    );
    this.emitter.emit = true;
  }

  public update(delta: number): void {
    if (this.emitter) {
      this.emitter.update(delta * 0.001);
    }
  }
}
