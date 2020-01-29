//Timer section start
//Declare variables
var totalSeconds = 100;
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
  var question = questions[currentQuestion].question;
  var questionClass = $(document).find("#quizContainer > .question");
  var choiceList = $(document).find("#quizContainer > .choiceList");
  var numChoices = questions[currentQuestion].choices.length;
  $(questionClass).text(question);

  // Remove all current <li> elements (if any)
  $(choiceList)
    .find("li")
    .remove();

  var choice;
  for (i = 0; i < numChoices; i++) {
    choice = questions[currentQuestion].choices[i];
    $(
      '<li><input type="radio" value=' +
        i +
        ' name="dynradio" />' +
        choice +
        "</li>"
    ).appendTo(choiceList);
  }
}

$("#next-button").on("click", function() {
  console.log($("input[type='radio']:checked").val());

  var selectedOption = parseInt($("input[type='radio']:checked").val());
  var correctOption = questions[currentQuestion].correctAnswer;
  //   debugger;
  if (selectedOption === correctOption) {
    correctAnswers++;
    secondsElapsed -= 15;
    console.log("got here correct# ", correctAnswers);
  } else {
    secondsElapsed += 15;
    console.log("not correct");
  }
  currentQuestion++;
  if (currentQuestion < questions.length) {
    displayCurrentQuestion();
  } else {
    displayScore();

    quizOver = true;
  }
  console.log("current question", currentQuestion);
});

function displayScore() {
  $(document)
    .find("#quizContainer > .result")
    .text("You scored: " + correctAnswers + " out of: " + questions.length);
  $(document)
    .find("#quizContainer > .result")
    .show();
  setTime();
}
