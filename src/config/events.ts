// it would be much better to use separate events for different components in real project
enum events {
  UI_SPIN_BUTTON_WAS_PRESSED = "UI_SPIN_BUTTON_WAS_PRESSED",

  REELSET_SPIN_WAS_STARTED = "REELSET_SPIN_WAS_STARTED",
  REELSET_SPIN_WAS_STOPPED = "REELSET_SPIN_WAS_STOPPED",

  REEL_SPIN_WAS_STOPPED = "REEL_SPIN_WAS_STOPPED",
}

export { events };
