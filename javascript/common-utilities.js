const playButton = queryItems("playButton", true);

function queryItems(item, single = false) {
    const items = {
        "links": `a[id$="Link"]`,
        "playButtonInterval": ".play-button__play-single-note",
        "playButton": ".play-button__play",
        "repeatButton": ".play-button__repeat",
        "intervalButtons": ".intervals button",
        "singleNotes": ".single-notes-buttons > button",
        "slider": ".slider",
        "slides": ".slide",
        "prevButton": ".prev-button",
        "nextButton": ".next-button",
        "correctScore": ".score__correct",
        "incorrectScore": ".score__incorrect",
        "keys": ".white-key, .black-key",
        "singlenotesView": `#${item}`,
        "intervalsView": `#${item}` 
    };
    return single ? document.querySelector(items[item]) : document.querySelectorAll(items[item]);
}


  function forEach(f, collection) {
    Array.from(collection).forEach(item => f(item));
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
    } else if (el.classList.contains('intervals')) {
      checkGuess(el);
    }
  }
  