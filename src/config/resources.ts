export class Resources {
  static loadResources(cbProgress: Function, cbComplete: Function): void {
    Object.keys(Resources.imageFilesPath).forEach((key) => {
      let path = Resources.imageFilesPath[key];
      PIXI.loader.add(key, path);
    });

    PIXI.loader.on("progress", () => {
      cbProgress(PIXI.loader.progress);
    });

    PIXI.loader.load(() => {
      loadedFiles = PIXI.loader.resources;
      cbComplete();
    });
  }

  static imageFilesPath = {
    spinBtn: "./src/assets/image/spinBtn.png",
    symbol: "./src/assets/image/symbol.png",
    spark: "./src/assets/image/spark.png",
  };
  static audioFilesPath = {};
}

export let imagesRes = { spinBtn: "spinBtn", symbol: "symbol", spark: "spark" };
export let audiosRes = {};
export let spriteSheetRes = {};
export let loadedFiles: PIXI.loaders.Resource | PIXI.loaders.ResourceDictionary;
