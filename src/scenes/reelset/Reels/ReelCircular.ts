import { Reel } from "./Reel";
import { loadedFiles, imagesRes } from "../../../config/resources";
import gsap from "gsap";
import { eventEmitter } from "../../../core/EventEmitter";
import { events } from "../../../config/events";

export class ReelCircular extends Reel {
  public initialize() {
    const { rowsCount, rowHeight, rowIndent } = this.config;
    const ADDITIONAL_SYMBOLS = 2; // means extra invisible symbols up and down, one for each side

    for (let i = 0; i < rowsCount + ADDITIONAL_SYMBOLS; i++) {
      const element = new PIXI.Sprite(loadedFiles[imagesRes.symbol].texture);
      element.y = (rowHeight + rowIndent) * (i - 1);

      this.elements.push(element);
      this.symbolsContainer.addChild(element);
    }

    const mask = new PIXI.Graphics();
    mask.drawRect(0, 0, this.reelWidth, this.reelHeight);
    this.addChild(mask);
    this.mask = mask;

    const frame = new PIXI.Graphics();
    frame.lineStyle(10, 0x00ff00, 1);
    frame.drawRect(0, 0, this.reelWidth, this.reelHeight);
    this.addChild(frame);
  }

  public startSpin(): void {
    if (this.isMoving) return;
    this.isMoving = true;

    this.rotateReel();
    // setTimeout is not a really good way, it's better to use our own method based on Tween
    setTimeout(this.stopSpin.bind(this), this.config.spinningDuration);
  }

  private rotateReel(): void {
    const singleRotationDuration =
      this.config.spinningDuration / this.config.spinnedSymbolsCount;
    gsap.to(this.symbolsContainer, {
      y: this.config.rowHeight + this.config.rowIndent,
      duration: singleRotationDuration / 1000,
      repeat: 10000, // just infinite number for this case
      ease: "linear",
      onRepeat: this.repositionSymbols.bind(this),
    });
  }

  private stopSpin(): void {
    gsap.killTweensOf(this.symbolsContainer);
    gsap.to(this.symbolsContainer, {
      y: 0,
      duration: 0,
      ease: "linear",
      onComplete: this.onRotationComplete.bind(this),
    });
  }

  private repositionSymbols():void {
    const lastSymbol = this.elements.pop();
    const { rowHeight, rowIndent } = this.config;

    lastSymbol.y = -(rowHeight + rowIndent);
    this.elements.forEach((el) => (el.y += rowHeight + rowIndent));
    this.elements.unshift(lastSymbol);
  }

  private onRotationComplete(): void {
    this.isMoving = false;
    eventEmitter.emit(events.REEL_SPIN_WAS_STOPPED, { reelId: this.reelId });
  }

  private get reelWidth(): number {
    return this.config.rowWitdh;
  }

  private get reelHeight(): number {
    return (
      this.config.rowHeight * this.config.rowsCount +
      (this.config.rowIndent * this.config.rowsCount - 1)
    );
  }
}
