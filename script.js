const story = [
  { text: "Some stories change with choices.\nSome don’t.", choices: [{ label: "Enter" }] },
  { text: "This is a story with a few choices.", choices: [{ label: "Begin" }] },
  {
    text: "You noticed me before I noticed you.",
    choices: [
      { label: "Say something", outcome: "The start of something real." },
      { label: "Wait", outcome: "A little scared of what comes next." }
    ]
  },
  {
    text: "You see my message.",
    choices: [
      { label: "Reply right away", outcome: "I smile. I send you kisses." },
      { label: "Reply later", outcome: "I understand. But I still check my phone repeatedly." }
    ]
  },
  {
    text: "Life gets busy.",
    choices: [
      { label: "Make time", outcome: "Some days are short. But we still talk." },
      { label: "Go with the flow", outcome: "Some days pass quietly. And it’s okay. You still have me. I still have you." }
    ]
  },
  {
    text: "Distance enters the story.",
    choices: [
      { label: "Fight it", outcome: "Some nights are harder. Some are worth it." },
      { label: "Accept it", outcome: "Missing becomes routine. Love doesn’t." }
    ]
  },
  {
    text: "Not everything feels secure.\nSomething feels off.",
    choices: [
      { label: "Ask", outcome: "I’ll tell you everything. The ups, the downs, the rights and lefts." },
      { label: "Assume", outcome: "I’ll still tell you ;)" }
    ]
  },
  {
    text: "You see me tired.",
    choices: [
      { label: "Just listen", outcome: "I breathe again, and my chest feels lighter." },
      { label: "Fix things", outcome: "You try. That matters more." }
    ]
  },
  {
    text: "You wonder if this will last.",
    choices: [
      { label: "Stay", outcome: "Love deepens quietly." },
      { label: "Space", outcome: "Even then… we find our way back to us." }
    ]
  }
];

const app = document.getElementById("app");
let index = 0;

/* ---------------- MUSIC (FIXED, SAFE) ---------------- */

const bgMusic = document.getElementById("bg-music");
bgMusic.volume = 0.4;

let musicStarted = false;

function startMusic() {
  if (musicStarted) return;

  bgMusic.play()
    .then(() => {
      musicStarted = true;
      console.log("🎵 Music started");
    })
    .catch(err => {
      console.log("❌ Music blocked:", err);
    });
}

// Start music on first user interaction (browser-safe)
document.addEventListener("click", startMusic, { once: true });

/* ---------------- HEARTS ---------------- */

function spawnHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "❤";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = 10 + Math.random() * 10 + "px";
  heart.style.animationDuration = 10 + Math.random() * 10 + "s";
  document.querySelector(".hearts").appendChild(heart);

  setTimeout(() => heart.remove(), 20000);
}

setInterval(spawnHeart, 900);

/* ---------------- STORY LOGIC ---------------- */

function addLayer() {
  if (index >= story.length) {
    showFinalIntro();
    return;
  }

  const layer = story[index];
  const block = document.createElement("div");
  block.className = "story-block";

  const text = document.createElement("div");
  text.className = "story-text";
  text.innerText = layer.text;

  const choicesDiv = document.createElement("div");
  choicesDiv.className = "choices";

  layer.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.innerText = choice.label;

    btn.onclick = () => {
      startMusic();

      choicesDiv.innerHTML = "";
      if (choice.outcome) {
        const outcome = document.createElement("div");
        outcome.className = "outcome";
        outcome.innerText = choice.outcome;
        block.appendChild(outcome);
      }
      index++;
      setTimeout(addLayer, 700);
    };

    choicesDiv.appendChild(btn);
  });

  block.appendChild(text);
  block.appendChild(choicesDiv);
  app.appendChild(block);
  block.scrollIntoView({ behavior: "smooth", block: "end" });
}

/* ---------------- FINAL INTRO ---------------- */

function showFinalIntro() {
  const block = document.createElement("div");
  block.className = "story-block";

  const text = document.createElement("div");
  text.className = "story-text";
  text.innerText =
    "Across all versions—\n" +
    "across timing, distance, silence, and effort—\n" +
    "one thing doesn’t change.";

  block.appendChild(text);
  app.appendChild(block);

  setTimeout(() => {
    const reveal = document.createElement("div");
    reveal.className = "reveal-option";
    reveal.innerText = "Reveal";

    reveal.onclick = () => {
      startMusic();
      reveal.remove();
      showFinalMessage(block);
    };

    block.appendChild(reveal);
  }, 2000);
}

/* ---------------- FINAL MESSAGE ---------------- */

function showFinalMessage(parent) {
  const finalText = document.createElement("div");
  finalText.className = "final-text";
  finalText.innerHTML =
    "<strong>YOU</strong><br><br>" +
    "No matter how it goes…<br>" +
    "It always ends here.<br><br>" +
    "I choose you.<br>" +
    "In every universe.<br><br>" +
    "Happy Valentine’s Day babyy 💗";

  parent.appendChild(finalText);

  setTimeout(() => {
    const whisper = document.createElement("div");
    whisper.className = "final-whisper";
    whisper.innerHTML = `
      <span>Love you jaan</span>
      <span class="final-heart">❤</span>
    `;
    parent.appendChild(whisper);
  }, 1200);

  finalText.scrollIntoView({ behavior: "smooth", block: "end" });
}

addLayer();
