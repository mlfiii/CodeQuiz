//Timer section start
//Declare variables
var totalSeconds = 3;
var secondsLeft = totalSeconds;
var secondsElapsed = 0;
var interval;

$("#seconds").text(secondsLeft);
//Start quiz click event
$("#start-quiz").on("click", function() {
  //   $("#next-button").show("true");
  //   $("#quizContainer").show();

  //   $("#quizContainer").attr("hidden", "false");

  //   $("#quizContainer").attr({
  //     hidden: "false"
  //   });
  //start timer and quiz
  displayCurrentQuestion();
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
  //reset the interval to the original
  clearInterval(interval);
}

//Timer section end
//Quiz section start

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

function displayCurrentQuestion() {
  console.log("In display current Question");
}
