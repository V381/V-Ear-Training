
const state = {
  currentNote: null
}

function queryItems(item, single = false) {
  const items = {
    "links": `a[id$="Link"]`,
    "playButton": ".play-button__play-single-note",
    "singleNotes": ".single-notes-buttons > button",
    "singlenotesView": `#${item}`,
    "intervalsView": `#${item}` 
  };
  return single ? document.querySelector(items[item]) : document.querySelectorAll(items[item]);
}

function forEach(f, collection) {
  Array.from(collection).forEach(item => f(item));
}

function toggleView(viewId) {
  const targetId = viewId + 'View';  
  const selectedView = queryItems(targetId, true);  
  if (selectedView) {
      selectedView.classList.add('active'); 
      forEach(view => {
          if (view !== selectedView && view.classList.contains('view')) {
              view.classList.remove('active');
          }
      }, document.querySelectorAll('.view')); 
  } else {
      console.error("No element found with ID:", targetId);
  }
}
function disableButtons(flag = true) {
  const buttons = queryItems("singleNotes");
  return forEach(button => {
    button.disabled = flag;
  }, buttons);
}

function updateActiveLink(activeElement) {
  const links = queryItems("links");
  forEach(link => {
    link.classList.remove('active'); 
  }, links);
  activeElement.classList.add('active');
}

function triggerEvent(event) {
  event.preventDefault();
  const el = event.currentTarget;

  if (el.dataset.view) {
    const viewId = el.dataset.view; 
    toggleView(viewId);
    updateActiveLink(el);
  } else if (el.classList.contains('note-button')) {
    const userGuess = el.textContent;
    guessNote(userGuess, state.currentNote, updateScores);
  } else if (el.classList.contains('play-button')) {
    playGame();
  }
}



function addEventsToElements() {
  const links = queryItems("links");
  const buttons = queryItems("singleNotes");
  const playButton = queryItems("playButton", true);

  forEach(link => {
    link.addEventListener("click", triggerEvent);
  }, links);

  forEach(button => {
    button.classList.add('note-button');
    button.addEventListener("click", triggerEvent);
  }, buttons);

  if (playButton) {
    playButton.classList.add('play-button');
    playButton.addEventListener("click", triggerEvent);
  }
}

function playGame() {
  const notes = ['C', 'Csharp', 'D', 'Dsharp', 'E', 'F', 'Fsharp', 'G', 'Gsharp', 'A', 'Asharp', 'B'];
  disableButtons(false);
  state.currentNote = getRandomNote(notes);
  playNoteByKey(state.currentNote);
}

function guessNote(userGuess, currentNote, updateScores) {
  if (userGuess === state.currentNote) {
    updateScores(true);
  } else {
    updateScores(false);
  }
}

function updateScores(isCorrect) {
  if (isCorrect) {
    correctScore++;
    correct.innerHTML = correctScore;
    disableButtons(true);
  } else {
    incorrectScore--;
    scoreIncorrect.innerHTML = incorrectScore;
    disableButtons(false);
  }
}
function getRandomNote(notes) {
  return notes[Math.floor(Math.random() * notes.length)];
}
function playNoteByKey(note) {
  const audio = new Audio(`assets/${note}.mp3`);
  audio.play();
}

document.addEventListener('DOMContentLoaded', () => {
  disableButtons();
  addEventsToElements(); 
});