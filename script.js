//Declare variables

var totalSeconds = 10;
var secondsElapsed = 0;
var status = "Working";
var secondsLeft = 10;
var interval;
// debugger;
//Start quiz click event
$("#start-quiz").on("click", function() {
  //start timer and quiz
  startTimer();
});

function startTimer() {
  // Set the inerval
  interval = setInterval(function() {
    secondsElapsed++;
    renderTime();
  }, 1000);
}

function renderTime() {
  //Set the text of the seconds area text
  $("#seconds").text(getFormattedSeconds());
  //If the time has run out, then stop the countdown
  if (secondsElapsed >= totalSeconds) {
    stopTimer();
  }
}

function getFormattedSeconds() {
  //Set the seconds left
  var secondsLeft = totalSeconds - secondsElapsed;
  return secondsLeft;
}

function stopTimer() {
  //Reset the timer once it has reached zero
  secondsElapsed = 0;
  setTime();
  renderTime();
}

function setTime() {
  clearInterval(interval);
}
