(() => {
    const links = document.querySelectorAll('a[id$="Link"]');
    const playButton = document.querySelector('.play-button__play-single-note');
    const noteButtons = document.querySelectorAll('.single-notes-buttons > button');
    let currentNote;
    const 
        notesMap = {
            "A": "A",
            "Asharp": "A#",
            "B": "B",
            "C": "C",
            "Csharp": "C#",
            "D": "D",
            "Dsharp": "D#",
            "E": "E",
            "F": "F",
            "Fsharp": "F#",
            "G": "G",
            "Gsharp": "G#"
        }

    function disableOrEnableButtons(flag) {
        noteButtons.forEach(button => {
            button.disabled = flag;
        })
    }

    disableOrEnableButtons(true);

    links.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const viewId = link.dataset.view;
        toggleView(viewId);
        updateActiveLink(link);
      });
    });
  
    function toggleView(viewId) {
      const selectedView = document.getElementById(viewId + 'View');
      if (selectedView) {
        selectedView.classList.add('active');
        document.querySelectorAll('.view').forEach(view => {
          if (view !== selectedView) {
            view.classList.remove('active');
          }
        });
      }
    }

    noteButtons.forEach(button => {
        button.addEventListener('click', function() {
          const userGuess = button.textContent;
          guessNote(userGuess, currentNote);
        });
      });

    function updateActiveLink(clickedLink) {
        links.forEach(link => {
          link.classList.remove('active-link');
        });

        clickedLink.classList.add('active-link');
      }


      playButton.addEventListener('click', function() {
        disableOrEnableButtons(false);
        playGame();
      });
      
      function playGame() {
        disableOrEnableButtons(false);
        currentNote = getRandomNote();
        playNoteByKey(currentNote);
      }
      
      function guessNote(userGuess) {
        if (userGuess === currentNote) {
          currentNote = null;
          correctScore++
          correct.innerHTML = correctScore;
          disableOrEnableButtons(true);
        } else {
          disableOrEnableButtons(false);
          incorrectScore--;
          scoreIncorrect.innerHTML = incorrectScore;
        }
      }
      
      function playNoteByKey(note) {
        const audio = new Audio(`assets/${note}.mp3`);
        audio.play();
      }
      
      function getRandomNote() {
        const notes = ['C', 'Csharp', 'D', 'Dsharp', 'E', 'F', 'Fsharp', 'G', 'Gsharp', 'A', 'Asharp', 'B'];
        return notes[Math.floor(Math.random() * notes.length)];
      }
})();