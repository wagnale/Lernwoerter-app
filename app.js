let words = JSON.parse(localStorage.getItem("words")) || [];
let remainingWords = [...words];

function saveWords() {
  localStorage.setItem("words", JSON.stringify(words));
  renderList();
}

function renderList() {
  const list = document.getElementById("wordList");
  list.innerHTML = "";
  words.forEach(word => {
    const li = document.createElement("li");
    li.textContent = word;
    list.appendChild(li);
  });
}

function addWord() {
  const input = document.getElementById("wordInput");
  const word = input.value.trim();
  if (word && !words.includes(word)) {
    words.push(word);
    remainingWords = [...words];
    saveWords();
    input.value = "";
  }
}

function speakRandomWord() {
  if (remainingWords.length === 0) {
    alert("Alle Wörter wurden vorgelesen.");
    return;
  }
  const index = Math.floor(Math.random() * remainingWords.length);
  const word = remainingWords.splice(index, 1)[0];
  document.getElementById("lastWord").textContent = word;

  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "de-DE";
  speechSynthesis.speak(utterance);
}

function resetSession() {
  remainingWords = [...words];
}

function importCSV() {
  const file = document.getElementById("csvFile").files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    const lines = e.target.result.split(/\r?\n/);
    lines.forEach(line => {
      const word = line.split(",")[0]?.trim();
      if (word && !words.includes(word)) {
        words.push(word);
      }
    });
    remainingWords = [...words];
    saveWords();
  };
  reader.readAsText(file);
}

renderList();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}