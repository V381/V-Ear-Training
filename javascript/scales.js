
function playNoteByKey(note) {
    const audio = new Audio(`assets/${note}.mp3`);
    audio.play();
}

function setButtonState(disabled) {
    const playButton = queryItems('playButtonScale', true);
    const scaleButtons = queryItems('scaleButtons', false);
    playButton.disabled = disabled;
    scaleButtons.forEach(button => button.disabled = disabled);
}

function scheduleNextNote(noteIndex, scaleNotes) {
    if (noteIndex < scaleNotes.length) {
        playNoteByKey(scaleNotes[noteIndex]);
        setTimeout(() => {
            scheduleNextNote(noteIndex + 1, scaleNotes);
        }, 500);
    } else {
        setButtonState(false);
        state.isPlaying = false;
    }
}

function playScale(scaleNotes) {
    setButtonState(true);
    scheduleNextNote(0, scaleNotes);
}
function startPlayingScale() {
    state.isPlaying = true;
    const scaleButtons = queryItems('scaleButtons', false);
    const scaleKeys = Object.keys(state.scales);
    const randomScaleKey = scaleKeys[Math.floor(Math.random() * scaleKeys.length)];
    state.currentScale = randomScaleKey;
    playScale(state.scales[randomScaleKey]);
    forEach(button => button.disabled = false, scaleButtons);
}

function checkUserGuess(guess) {
    const correctScoreDisplay = queryItems('correctScore', true);
    const incorrectScoreDisplay = queryItems('incorrectScore', true);

    if (guess === state.currentScale) {
        state.correctScore++;
        correctScoreDisplay.innerHTML = state.correctScore;
    } else {
        state.incorrectScore--;
        incorrectScoreDisplay.innerHTML = state.incorrectScore;
        
    };
    state.isPlaying = false;
}

document.addEventListener('DOMContentLoaded', () => {
    const playButton = queryItems('playButtonScale', true);
    const scaleButtons = queryItems('scaleButtons', false);
    playButton.addEventListener('click', startPlayingScale);
    forEach((button) => {
        button.addEventListener('click', () => {
            const userGuess = button.textContent.trim();
            console.log("User guessed: ", userGuess);
            checkUserGuess(userGuess);
            scaleButtons.forEach(button => button.disabled = true);
        });
    }, scaleButtons);
});
