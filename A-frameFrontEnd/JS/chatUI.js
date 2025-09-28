export class ChatUI {
  constructor(chatLog, statusEl) {
    this.chatLog = chatLog;
    this.statusEl = statusEl;
  }

  addMessage(sender, text) {
    this.chatLog.innerHTML += `<div><b>${sender}:</b> ${text}</div>`;
    this.chatLog.scrollTop = this.chatLog.scrollHeight;
  }

  simulateTTS(text) {
    this.addMessage("Bot", text);
    this.statusEl.textContent = 'Status: Receiving (simulated audio)';
    const utter = new SpeechSynthesisUtterance(text);
    utter.onstart = () => this.statusEl.textContent = 'Status: Playing audio';
    utter.onend = () => this.statusEl.textContent = 'Status: Idle';
    speechSynthesis.speak(utter);
  }
}
