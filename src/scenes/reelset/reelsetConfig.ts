const reelsetConfig = {
  reelsCount: 1,
  // try to comment previous and uncomment next line ;-)
  // reelsCount: 5, 
  reelsIndent: 10,
  reelsStartDelay: 200,
  reelsetType: "Circular", // should be enum in real project
  position: { x: 640, y: 360 }, // ofc we can use screenSize / 2 if we know for sure that it needs to be just in the center of the screen
  anchor: { x: 0.5, y: 0.5 },
};

const reelConfig = { 
  rowsCount: 3,
   // try to comment previous and uncomment next line ;-)
  // rowsCount: 6,
  spinningDuration: 3000,
  spinnedSymbolsCount: 10,
  rowHeight: 130,
  rowWitdh: 160,
  rowIndent: 10,
};

export { reelsetConfig, reelConfig };
