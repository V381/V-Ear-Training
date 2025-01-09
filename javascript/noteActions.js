function playNoteByKey(note) {
    const audio = new Audio(`assets/${note}.mp3`);
    audio.play();
}

function enableKeys(keys) {
    forEach(key => {
        key.addEventListener("click", () => playNoteByKey(key.getAttribute('data-note')));
    }, keys);
}

function addActionToPlayButton(playButton) {
    if (!state.isPlaying) {
        state.isPlaying = true;
        playRandomNotes();
        playButton.disabled = true;
    }
}

function getRandomInterval() {
    const intervals = [
        "Minor 2nd",
        "Major 2nd",
        "Minor 3rd",
        "Major 3rd",
        "Perfect 4",
        "Tritone",
        "Perfect 5",
        "Minor 6",
        "Major 6",
        "Minor 7",
        "Major 7"
    ];
    const randomIndex = Math.floor(Math.random() * intervals.length);
    return intervals[randomIndex];
}
function addActionToPlayButton() {
    if (!state.isPlaying) {
        state.isPlaying = true;
        playRandomNotes();
        playButton.disabled = true;
    }
}

const intervalButtons = queryItems("intervalButtons");
intervalButtons.forEach(button => {
    button.addEventListener("click", function() {
      checkGuess(this);
    });
  });

function checkGuess(button) {
    const correctScoreDisplay = queryItems("correctScore", true);
    const incorrectScoreDisplay = queryItems("incorrectScore", true);
    const arr = [];
    if (state.isPlaying) {
      state.isPlaying = false; 
      const guessedInterval = button.textContent.trim(); 
      arr.push(guessedInterval);
      if (state.correctInterval === guessedInterval) {
        state.correctScore++;
        correctScoreDisplay.innerHTML = state.correctScore; 
      } else {
        state.incorrectScore--;
        incorrectScoreDisplay.innerHTML = state.incorrectScore; 
      }
      state.correctInterval = null;
      playButton.disabled = false;
    }
  }
  
function playRandomNotes() {
    state.correctInterval = getRandomInterval();
    const notes = getRandomNotesForInterval(state.correctInterval);
    if (!Array.isArray(notes) || notes.length !== 2) {
        throw new Error('getRandomNotesForInterval must return an array with two elements');
    }
    const [note1, note2] = notes;
    playNoteByKey(note1);
    setTimeout(() => {
        playNoteByKey(note2);
    }, 1000);
}

function getRandomNotesForInterval(interval) {
    const intervalsToNotes = {
        "Minor 2nd": ["C", "Csharp"],
        "Major 2nd": ["C", "D"],
        "Minor 3rd": ["C", "Dsharp"],
        "Major 3rd": ["C", "E"],
        "Perfect 4": ["C", "F"],
        "Tritone": ["C", "Fsharp"],
        "Perfect 5": ["C", "G"],
        "Minor 6": ["C", "Gsharp"],
        "Major 6": ["C", "A"],
        "Minor 7": ["C", "Asharp"],
        "Major 7": ["C", "B"]
    };
    return intervalsToNotes[interval];
}

function addGlobalKeyListener() {
    document.addEventListener('keydown', event => {
        const actions = playNoteKeyDown(event);
        if (actions) actions.keyDown();
    });
    document.addEventListener('keyup', event => {
        const actions = playNoteKeyDown(event);
        if (actions) actions.keyUp();
    });
}

function playNoteKeyDown(event) {
    const note = state.keyToNote[event.key];
    if (note) {
        return {
            keyDown: function() {
                event.preventDefault();
                playNoteByKey(note);
                darkenKey(queryItems(`[data-note="${note}"]`, true));
            },
            keyUp: function() {
                resetKeyColor(queryItems(`[data-note="${note}"]`, true));
            }
        }
    }
}

function darkenKey(key) {
    key.style.backgroundColor = '#999';
}

function resetKeyColor(key) {
    key.style.backgroundColor = '';
}
