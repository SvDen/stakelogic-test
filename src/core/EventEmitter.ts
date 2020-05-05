class EE extends PIXI.utils.EventEmitter {
  // we can do smth useful here in real project
}

// for this short example singleton would be a good choice
const eventEmitter = new EE();
export { eventEmitter };
