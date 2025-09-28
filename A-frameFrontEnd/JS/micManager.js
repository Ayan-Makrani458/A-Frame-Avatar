export class MicManager {
  constructor(volBar, statusEl) {
    this.volBar = volBar;
    this.statusEl = statusEl;
    this.micOn = false;
    this.audioCtx = null;
    this.analyser = null;
    this.dataArray = null;
    this.micStream = null;
  }

  async toggleMic(micBtn) {
    if (!this.micOn) {
      try {
        this.micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.fftSize = 512;
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);

        const micSource = this.audioCtx.createMediaStreamSource(this.micStream);
        micSource.connect(this.analyser);

        this.micOn = true;
        micBtn.textContent = 'Mic: On';
        this.statusEl.textContent = 'Status: Mic active';
      } catch (err) {
        console.error("Mic access denied:", err);
        this.statusEl.textContent = 'Status: Mic access denied';
      }
    } else {
      this.stopMic(micBtn);
    }
  }

  stopMic(micBtn) {
    if (this.micStream) this.micStream.getTracks().forEach(track => track.stop());
    if (this.audioCtx) this.audioCtx.close();
    this.micOn = false;
    micBtn.textContent = 'Mic: Off';
    this.statusEl.textContent = 'Status: Mic stopped';
    this.volBar.style.width = "0%";
  }

  getAmplitude() {
    if (!this.analyser) return 0;
    this.analyser.getByteTimeDomainData(this.dataArray);
    let avg = this.dataArray.reduce((a, b) => a + b) / this.dataArray.length;
    return Math.abs(avg - 128) / 128;
  }
}
