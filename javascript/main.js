document.addEventListener('DOMContentLoaded', () => {
    const intervalButtons = queryItems("intervalButtons");
    const keys = queryItems("keys");

    playButton.addEventListener("click", () => addActionToPlayButton(playButton));
    forEach(button => button.addEventListener("click", triggerEvent), intervalButtons);
    enableKeys(keys);
    showSlide(currentSlide);
    setupNavigationButtons();
    addGlobalKeyListener(); 
});