const $ = document;

const play = $.querySelector(".play-button__play");
const intervalButtons = $.querySelectorAll(".intervals button");
const intervals = $.querySelectorAll(".intervals button");
const repeatButton = document.querySelector(".play-button__repeat");

let lastPlayedNotes = null;
const audioFiles = {};

let isPlaying = false;
let correctInterval = null;

const keyToNote = {
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
};

const keys = document.querySelectorAll('.white-key, .black-key');

keys.forEach(key => {
    key.addEventListener('click', () => {
        playNoteByKey(key.getAttribute('data-note'));
    });
});

document.addEventListener('keydown', (event) => {
    const note = keyToNote[event.key];
    if (note) {
        event.preventDefault();
        playNoteByKey(note);
        const key = document.querySelector(`[data-note="${note}"]`);
        darkenKey(key);
    }
});

document.addEventListener('keyup', (event) => {
    const note = keyToNote[event.key];
    if (note) {
        const key = document.querySelector(`[data-note="${note}"]`);
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
        console.log(intervals[randomIndex], "<<<<<<<<<<<");
        return intervals[randomIndex];
    }

    function playRandomNotes() {
        correctInterval = getRandomInterval(); 
        const [note1, note2] = getRandomNotesForInterval(correctInterval);
        console.log(`Interval to guess: ${correctInterval}`);
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

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

let currentSlide = 0;

function showSlide(index) {
    if (index < 0) {
        currentSlide = slides.length - 1;
    } else if (index >= slides.length) {
        currentSlide = 0;
    }

    for (let i = 0; i < slides.length; i++) {
        if (i === currentSlide) {
            slides[i].style.display = 'block';
        } else {
            slides[i].style.display = 'none';
        }
    }
}

prevButton.addEventListener('click', () => {
    currentSlide--;
    showSlide(currentSlide);
});

nextButton.addEventListener('click', () => {
    currentSlide++;
    showSlide(currentSlide);
});

showSlide(currentSlide);

let correctScore = 0;
let incorrectScore = 0;
const correct = $.querySelector(".score__correct");
const scoreIncorrect = $.querySelector(".score__incorrect");

function checkGuess(button) {
    if (isPlaying) {
        isPlaying = false; 
        const guessedInterval = button.textContent;
        console.log(`Guessed: ${guessedInterval}`);
        if (correctInterval === guessedInterval) {
            correctScore++
            correct.innerHTML = correctScore;
            console.log("Correct guess!");
        } else {
            incorrectScore--;
            scoreIncorrect.innerHTML = incorrectScore;
            console.log("WRONG!");
        }
    }
}

function addActionToIntervalButton(button) {
    button.addEventListener("click", () => {
        checkGuess(button);
    });
};