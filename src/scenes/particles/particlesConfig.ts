const particlesConfig = {
  parameters: {
    alpha: {
      start: 1,
      end: 0,
    },
    scale: {
      start: 0.5,
      end: 1,
    },
    color: {
      start: "ffffff",
      end: "9ff3ff",
    },
    speed: {
      start: 1000,
      end: 200,
    },
    startRotation: {
      min: 225,
      max: 320,
    },
    rotationSpeed: {
      min: 0,
      max: 20,
    },
    lifetime: {
      min: 0.05,
      max: 0.1,
    },
    blendMode: "normal",
    frequency: 0.03,
    emitterLifetime: 0.05,
    particlesPerWave: 200,
    maxParticles: 1000,
    pos: {
      x: 640,
      y: 360,
    },
    addAtBack: false,
    spawnType: "circle",
    spawnCircle: {
      x: 0,
      y: 0,
      r: 300,
    },
  },
};

export { particlesConfig };
