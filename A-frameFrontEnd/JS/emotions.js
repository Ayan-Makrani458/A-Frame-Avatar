export function resetAll(dict, infl) {
  if (!dict || !infl) return;
  for (let key in dict) infl[dict[key]] = 0;
}

export function setEmotion(state, dict, infl, statusEl) {
  if (!dict || !infl) return;
  resetAll(dict, infl);

  switch(state) {
    case 'neutral':
      statusEl.textContent = "Status: Emotion → Neutral";
      break;
    case 'friendly':
      if (dict.mouthSmileLeft) infl[dict.mouthSmileLeft] = 0.5;
      if (dict.mouthSmileRight) infl[dict.mouthSmileRight] = 0.5;
      if (dict.eyeSquintLeft) infl[dict.eyeSquintLeft] = 0.3;
      if (dict.eyeSquintRight) infl[dict.eyeSquintRight] = 0.3;
      statusEl.textContent = "Status: Emotion → Friendly 😀";
      break;
    case 'thoughtful':
      if (dict.browInnerUp) infl[dict.browInnerUp] = 0.5;
      if (dict.mouthFrownLeft) infl[dict.mouthFrownLeft] = 0.5;
      if (dict.mouthFrownRight) infl[dict.mouthFrownRight] = 0.5;
      statusEl.textContent = "Status: Emotion → Thoughtful 🤔";
      break;
    case 'surprised':
      if (dict.jawOpen) infl[dict.jawOpen] = 0.5;
      if (dict.eyeWideLeft) infl[dict.eyeWideLeft] = 0.5;
      if (dict.eyeWideRight) infl[dict.eyeWideRight] = 0.5;
      statusEl.textContent = "Status: Emotion → Surprised 😲";
      break;
  }
}

// Test expressions
export function testBlink(dict, infl) {
  if (!dict || !infl) return;
  if (dict.eyeBlinkLeft && dict.eyeBlinkRight) {
    infl[dict.eyeBlinkLeft] = 1;
    infl[dict.eyeBlinkRight] = 1;
    setTimeout(() => { infl[dict.eyeBlinkLeft] = 0; infl[dict.eyeBlinkRight] = 0; }, 200);
  }
}
export function testSmile(dict, infl) {
  if (!dict || !infl) return;
  if (dict.mouthSmileLeft && dict.mouthSmileRight) {
    infl[dict.mouthSmileLeft] = 0.5;
    infl[dict.mouthSmileRight] = 0.5;
    setTimeout(() => { infl[dict.mouthSmileLeft] = 0; infl[dict.mouthSmileRight] = 0; }, 2000);
  }
}
export function testFrown(dict, infl) {
  if (!dict || !infl) return;
  if (dict.mouthFrownLeft && dict.mouthFrownRight) {
    infl[dict.mouthFrownLeft] = 1;
    infl[dict.mouthFrownRight] = 1;
    setTimeout(() => { infl[dict.mouthFrownLeft] = 0; infl[dict.mouthFrownRight] = 0; }, 1000);
  }
}
