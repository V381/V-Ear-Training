const $ = document;

const play = $.querySelector(".play-button__play");
const intervals = $.querySelectorAll(".intervals button");
const repeatButton = document.querySelector(".play-button__repeat");
let lastPlayedNotes = null;
const audioFiles = {};

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

function addActionToIntervalButton(button) {
    button.addEventListener("click", (e) => {
        console.log(e.target.innerHTML);
    });
}

function addActionToPlayButton() {
    let isPlaying = false;
    let notesToPlay = null;

    function getRandomNote() {
        const notes = Object.values(keyToNote);
        const randomIndex1 = Math.floor(Math.random() * notes.length);
        let randomIndex2 = Math.floor(Math.random() * notes.length);

        while (randomIndex2 === randomIndex1) {
            randomIndex2 = Math.floor(Math.random() * notes.length);
        }

        return [notes[randomIndex1], notes[randomIndex2]];
    }

    function playRandomNotes() {
        const [note1, note2] = getRandomNote();
        playNoteByKey(note1);
        setTimeout(() => playNoteByKey(note2), 1000); 
        lastPlayedNotes = [note1, note2]; 
    }
    
    function addActionToRepeatButton() {
        repeatButton.addEventListener("click", () => {
            if (lastPlayedNotes) {
                playNoteByKey(lastPlayedNotes[0]);
                setTimeout(() => playNoteByKey(lastPlayedNotes[1]), 1000);
            }
        });
    }
    
    addActionToRepeatButton();

    function checkGuess(button) {
        if (isPlaying) {
            isPlaying = false; 
            const guessedInterval = button.innerHTML;
            console.log(`Guessed: ${guessedInterval}`);
        }
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

    intervals.forEach((button) => {
        button.addEventListener("click", () => {
            checkGuess(button);
            notesToPlay = null; 
        });
    });
}

intervals.forEach(addActionToIntervalButton);
play.addEventListener("click", addActionToPlayButton);

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
