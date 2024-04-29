function disableButtons(selector, flag = true) {
  const buttons = queryItems(selector, false);  
  forEach(button => {
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


function addEventsToElements() {
  const links = queryItems("links");
  const buttons = queryItems("singleNotes");
  const playButton = queryItems("playButtonInterval", true);

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
  const correctScoreDisplay = queryItems("correctScore", true);
  const incorrectScoreDisplay = queryItems("incorrectScore", true)
  if (isCorrect) {
    state.correctScore++;
    correctScoreDisplay.innerHTML = state.correctScore;
    disableButtons(true);
  } else {
    state.incorrectScore--;
    incorrectScoreDisplay.innerHTML = state.incorrectScore;
    disableButtons(true);
  }
}
function getRandomNote(notes) {
  return notes[Math.floor(Math.random() * notes.length)];
}

document.addEventListener('DOMContentLoaded', () => {
  disableButtons();
  addEventsToElements(); 
});