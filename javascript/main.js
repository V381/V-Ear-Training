const 
    $ = document;



const 
    play = $.querySelector(".play-button__play"),
    lowE = $.querySelectorAll(".low-e ul li"),
    intervals = $.querySelectorAll(".intervals button"),
    notes = $.querySelector('.notes').children;

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


