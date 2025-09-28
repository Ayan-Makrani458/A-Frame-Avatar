import { MicManager } from './micManager.js';
import { registerLipsync } from './lipsync.js';
import { ChatUI } from './chatUI.js';
import { setEmotion, testBlink, testSmile, testFrown } from './emotions.js';

const micBtn = document.getElementById('mic-btn');
const sendBtn = document.getElementById('send-btn');
const inputMsg = document.getElementById('input-msg');
const chatLog = document.getElementById('chat-log');
const statusEl = document.getElementById('status');
const volBar = document.getElementById('volbar');
const emotionBtns = document.querySelectorAll('.emotions button');

let dictRef = { value: null };
let inflRef = { value: null };

const micManager = new MicManager(volBar, statusEl);
const chatUI = new ChatUI(chatLog, statusEl);

// Register lipsync
registerLipsync(micManager, dictRef, inflRef);

// Bind UI
micBtn.onclick = () => micManager.toggleMic(micBtn);

sendBtn.onclick = () => {
  const msg = inputMsg.value.trim();
  if (!msg) return;
  chatUI.addMessage("You", msg);
  inputMsg.value = '';
  statusEl.textContent = 'Status: (Would send to backend)';
  chatUI.simulateTTS("This is a simulated reply.");
};

// Test buttons
window.testBlink = () => testBlink(dictRef.value, inflRef.value);
window.testSmile = () => testSmile(dictRef.value, inflRef.value);
window.testFrown = () => testFrown(dictRef.value, inflRef.value);

// Emotions
emotionBtns.forEach(btn => {
  btn.onclick = () => setEmotion(btn.dataset.emotion, dictRef.value, inflRef.value, statusEl);
});
