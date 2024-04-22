
const $ = document;
const 
    play = $.querySelector(".play-button__play"),
    intervalButtons = $.querySelectorAll(".intervals button"),
    intervals = $.querySelectorAll(".intervals button"),
    repeatButton = $.querySelector(".play-button__repeat"),
    slider = $.querySelector('.slider'),
    slides = $.querySelectorAll('.slide'),
    prevButton = $.querySelector('.prev-button'),
    nextButton = $.querySelector('.next-button'),
    audioFiles = {},
    correct = $.querySelector(".score__correct"),
    scoreIncorrect = $.querySelector(".score__incorrect"),
    keyToNote = {
        'a': 'C',
        'w': 'Csharp',
        's': 'D',
        'e': 'Dsharp',
        'd': 'E',
        'f': 'F',
        't': 'Fsharp',
        'g': 'G',
        'y': 'Gsharp',
        'h': 'A',
        'u': 'Asharp',
        'j': 'B'
    },
    keys = $.querySelectorAll('.white-key, .black-key');

let 
    currentSlide = 0,
    lastPlayedNotes = null;
    isPlaying = false;
    correctInterval = null,
    correctScore = 0,
    incorrectScore = 0;

keys.forEach(key => {
    key.addEventListener('click', () => {
        playNoteByKey(key.getAttribute('data-note'));
    });
});

$.addEventListener('keydown', (event) => {
    const note = keyToNote[event.key];
    if (note) {
        event.preventDefault();
        playNoteByKey(note);
        const key = $.querySelector(`[data-note="${note}"]`);
        darkenKey(key);
    }
});

$.addEventListener('keyup', (event) => {
    const note = keyToNote[event.key];
    if (note) {
        const key = $.querySelector(`[data-note="${note}"]`);
        resetKeyColor(key);
    }
});

function playNoteByKey(note) {
    const audio = new Audio(`assets/${note}.mp3`);
    play.removeAttribute("disabled");
    audio.play();
}

function darkenKey(key) {
    key.style.backgroundColor = '#999';
}

function resetKeyColor(key) {
    key.style.backgroundColor = '';
}

function addActionToPlayButton() {
    let notesToPlay = null;

    function getRandomInterval() {
        const intervals = [
            "Minor 1st",
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

    function playRandomNotes() {
        correctInterval = getRandomInterval(); 
        const [note1, note2] = getRandomNotesForInterval(correctInterval);
        playNoteByKey(note1);
        setTimeout(() => playNoteByKey(note2), 1000);
        lastPlayedNotes = [note1, note2];
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

    if (!isPlaying) {
        isPlaying = true;
        if (!notesToPlay) {
            playRandomNotes();
        } else {
            playNoteByKey(notesToPlay[0]);
            setTimeout(() => playNoteByKey(notesToPlay[1]), 1000);
        }
    }

    intervalButtons.forEach((button) => {
        addActionToIntervalButton(button);
        button.addEventListener("click", () => {
            checkGuess(button);
            notesToPlay = null;
        });
    });
}

play.addEventListener("click", addActionToPlayButton);
intervals.forEach(addActionToIntervalButton);
function checkGuess(button) {
    if (isPlaying) {
        isPlaying = false; 
        const guessedInterval = button.textContent;
        if (correctInterval === guessedInterval) {
            correctScore++
            correct.innerHTML = correctScore;
        } else {
            incorrectScore--;
            scoreIncorrect.innerHTML = incorrectScore;
        }
    }
}

function addActionToIntervalButton(button) {
    button.addEventListener("click", () => {
        checkGuess(button);
    });
};
