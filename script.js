let timer;
let seconds = 0;
const display = document.getElementById('display');
const fieldSelect = document.getElementById('fieldSelect');
const savedTimesDiv = document.getElementById('savedTimes');
const newTopicInput = document.getElementById('newTopic');

let savedTimes = JSON.parse(localStorage.getItem('studyTimes')) || {};

function updateSelect() {
  fieldSelect.innerHTML = '';
  for (const topic in savedTimes) {
    const option = document.createElement('option');
    option.value = topic;
    option.textContent = topic;
    fieldSelect.appendChild(option);
  }
}

function formatTime(sec) {
  const h = Math.floor(sec/3600).toString().padStart(2,'0');
  const m = Math.floor((sec%3600)/60).toString().padStart(2,'0');
  const s = (sec%60).toString().padStart(2,'0');
  return `${h}:${m}:${s}`;
}

function updateSavedTimes() {
  let html = '<h2>Progress</h2>';
  for (const field in savedTimes) {
    html += `<p>${field}: ${formatTime(savedTimes[field])}</p>`;
  }
  savedTimesDiv.innerHTML = html;
}

updateSelect();
updateSavedTimes();

document.getElementById('addTopicBtn').addEventListener('click', () => {
  const topic = newTopicInput.value.trim();
  if (topic && !savedTimes[topic]) {
    savedTimes[topic] = 0;
    localStorage.setItem('studyTimes', JSON.stringify(savedTimes));
    updateSelect();
    updateSavedTimes();
    newTopicInput.value = '';
  }
});

document.getElementById('removeTopicBtn').addEventListener('click', () => {
  const topic = fieldSelect.value;
  if (topic) {
    delete savedTimes[topic];
    localStorage.setItem('studyTimes', JSON.stringify(savedTimes));
    updateSelect();
    updateSavedTimes();
  }
});

document.getElementById('startBtn').addEventListener('click', () => {
  if (!timer) {
    timer = setInterval(() => {
      seconds++;
      display.textContent = formatTime(seconds);
    }, 1000);
  }
});

document.getElementById('stopBtn').addEventListener('click', () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
    const field = fieldSelect.value;
    if (field) {
      savedTimes[field] += seconds;
      localStorage.setItem('studyTimes', JSON.stringify(savedTimes));
      updateSavedTimes();
    }
    seconds = 0;
    display.textContent = "00:00:00";
  }
});

document.getElementById('resetBtn').addEventListener('click', () => {
  const field = fieldSelect.value;
  if (field) {
    savedTimes[field] = 0;
    localStorage.setItem('studyTimes', JSON.stringify(savedTimes));
    updateSavedTimes();
  }
});
