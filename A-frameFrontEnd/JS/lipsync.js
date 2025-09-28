export function registerLipsync(micManager, dictRef, inflRef) {
  AFRAME.registerComponent('lipsync', {
    init() {
      this.dict = null;
      this.infl = null;
      this.el.addEventListener('model-loaded', (e) => {
        const obj = e.detail.model;
        obj.traverse((child) => {
          if (child.isMesh && child.morphTargetDictionary) {
            this.dict = dictRef.value = child.morphTargetDictionary;
            this.infl = inflRef.value = child.morphTargetInfluences;
            console.log("Morph targets available:", this.dict);
            scheduleBlink(this.dict, this.infl);
          }
        });
      });
      this.tick = AFRAME.utils.throttleTick(this.tick.bind(this), 50);
    },
    tick() {
      if (!micManager || !this.dict || !this.infl) return;
      const amp = micManager.getAmplitude();
      if (this.dict.jawOpen !== undefined) {
        this.infl[this.dict.jawOpen] = amp * 100;
      }
      micManager.volBar.style.width = `${Math.min(amp * 100, 100)}%`;
    }
  });
}

// Auto blink
function scheduleBlink(dict, infl) {
  const delay = 3000 + Math.random() * 3000;
  setTimeout(() => {
    if (dict?.eyeBlinkLeft !== undefined && dict?.eyeBlinkRight !== undefined) {
      infl[dict.eyeBlinkLeft] = 1;
      infl[dict.eyeBlinkRight] = 1;
      setTimeout(() => {
        infl[dict.eyeBlinkLeft] = 0;
        infl[dict.eyeBlinkRight] = 0;
      }, 150);
    }
    scheduleBlink(dict, infl);
  }, delay);
}
