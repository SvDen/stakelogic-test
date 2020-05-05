import { reelConfig } from "../reelsetConfig";

export abstract class Reel extends PIXI.Container {
  protected symbolsContainer: PIXI.Container = new PIXI.Container();
  protected elements: PIXI.Sprite[] = [];
  protected isMoving: boolean = false;

  constructor(protected reelId: number) {
    super();

    this.addChild(this.symbolsContainer);

    this.initialize();
  }

  get config() {
    return reelConfig;
  }

  protected abstract initialize(): void;
  public abstract startSpin(): void;
}
