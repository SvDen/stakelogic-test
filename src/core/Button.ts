export class Button extends PIXI.Sprite {
  protected onClickHandler: Function;
  constructor(texture?: PIXI.Texture) {
    super(texture);

    this.buttonMode = true;
    this.interactive = true;
    this.cursor = "pointer";

    this.on("mouseup", this.executeOnClickHandler.bind(this));
    this.on("touchend", this.executeOnClickHandler.bind(this));
  }

  set onClick(value: Function) {
    this.onClickHandler = value;
  }

  executeOnClickHandler(): void {
    if (this.onClickHandler) {
      this.onClickHandler();
    }
  }
}
