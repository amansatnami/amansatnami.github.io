const nameText = "AMAN SATNAMI";
const skillText = "CLOUD  •  DATA  •  LINUX  •  SQL";

let i = 0;
let j = 0;

function typeName() {
  if (i < nameText.length) {
    document.getElementById("typingName").textContent += nameText[i];
    i++;
    playClick();
    setTimeout(typeName, 120);
  } else {
    setTimeout(typeSkills, 500);
  }
}

function typeSkills() {
  if (j < skillText.length) {
    document.getElementById("typingSkills").textContent += skillText[j];
    j++;
    setTimeout(typeSkills, 60);
  }
}

window.onload = typeName;

const toggle = document.getElementById("themeToggle");
const body = document.body;

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  toggle.textContent = "☀️ Light Mode";
}

toggle.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    toggle.textContent = "☀️ Light Mode";
  } else {
    localStorage.setItem("theme", "light");
    toggle.textContent = "🌙 Dark Mode";
  }
});


let soundEnabled = true;
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playClick() {
  if (!soundEnabled) return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "square";        // arcade feel
  osc.frequency.setValueAtTime(800, audioCtx.currentTime);

  gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    audioCtx.currentTime + 0.08
  );

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.08);
}

document.getElementById("soundToggle").addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  document.getElementById("soundToggle").textContent =
    soundEnabled ? "🔊" : "🔇";
});



document.addEventListener("keydown", playClick);

