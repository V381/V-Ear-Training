const 
    $ = document;

    
const 
    play = $.querySelector(".play-button__play"),
    lowE = $.querySelectorAll(".low-e ul li"),
    intervals = $.querySelectorAll(".intervals button");


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
    })
}
  

function addActionToPlayButton() {
    function twoRandomNotes() {
        console.log("TODO....")
    }
    twoRandomNotes();
;}

intervals.forEach(addActionToIntervalButton)
play.addEventListener("click", addActionToPlayButton);


