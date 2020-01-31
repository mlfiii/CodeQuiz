//Declare and set variables and objects
var initialsInput = document.querySelector("#initials-text");
var initialsForm = document.querySelector("#initials-form");
var highScoreList = document.querySelector("#high-score-list");
var highScoreArea = document.querySelector("#high-scores");
var nextButton = document.querySelector("#next-button");
var startQuizButton = document.querySelector("#start-quiz");
var startAgainButton = document.querySelector("#start-again");
var quizContainer = document.querySelector("#quizContainer");
var viewHighScores = false;
var totalSeconds = 100;
var secondsLeft = totalSeconds;
var secondsElapsed = 0;
var interval;
var highscore = [];

//Hide some of the objects on the web page
highScoreArea.setAttribute("hidden", "true");
quizContainer.setAttribute("hidden", "true")
nextButton.setAttribute("hidden", "true");

//Set the viwable items on page.
$("#seconds").text(secondsLeft);

//Used when the view text is clicked.

$("#view-scores-text").on("click", function () {
  //If the scores are not currently visible, show them.
  if (viewHighScores === false) {
    highScoreArea.removeAttribute("hidden");
    viewHighScores = true;
    //If the scores are currently visible, hide them.
  } else if (viewHighScores === true) {
    highScoreArea.setAttribute("hidden", "false");
    viewHighScores = false;
  }
});

//Used to start quiz
$("#start-quiz").on("click", function () {
  if (initialsInput.value.trim() === "") {
    //If the query is started but the initials weren't typed in, then stop whole proce3ss and alert.
    alert("Please enter your initials first!")
    return;
  }
  //Unhide the quiz container so user can see questions
  quizContainer.removeAttribute("hidden")

  //Display the questions.
  displayCurrentQuestion();

  //Start the timer.
  startTimer();

  //Show the next button.
  nextButton.removeAttribute("hidden");

  //Hide the start quiz button.
  startQuizButton.setAttribute("hidden", "true");

});

//Used to start the quiz again after it was taken.
$("#start-again").on("click", function () {

  //Reset the varioous items needed to start the quiz again.
  totalSeconds = 100;
  secondsLeft = totalSeconds;
  secondsElapsed = 0;
  currentQuestion = 0;
  correctAnswers = 0;
  quizOver = false;
  clearScore();
  displayCurrentQuestion();
  startTimer();
  nextButton.removeAttribute("hidden");
  startAgainButton.setAttribute("hidden", "true");


});

//Used to start the timer.
function startTimer() {
  // Set the inerval

  interval = setInterval(function () {
    secondsElapsed++;
    renderTime();
  }, 1000);
}

//Used to format the time and stop it once time has expired.
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

//Used to stop the timer.
function stopTimer() {
  //Reset the timer once it has reached zero
  secondsElapsed = 0;
  setTime();
  renderTime();
}


//Used to set the time interval.
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

$("#next-button").on("click", function () {
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
    nextButton.setAttribute("hidden", "true");
    startAgainButton.removeAttribute("hidden");
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
  highScoreArea.removeAttribute("hidden");
}
function clearScore() {
  $(document)
    .find("#quizContainer > .result")
    .text("");
  $(document)
    .find("#quizContainer > .result")
    .hidden;
  setTime();
  highScoreArea.setAttribute("hidden", "true");
  viewHighScores = false;


}

init();

function renderHighScore() {
  // Clear todoList element and update todoCountSpan
  highScoreList.innerHTML = "";
  //   todoCountSpan.textContent = todos.length;
  //   data.Addresses.sort(function(a, b) {
  //     return a.address.localeCompare(b.address);
  // });
  //   debugger;
  highScoreList.removeAttribute("hidden");
  //   initialsForm.removeAttribute("hidden");
  // Render a new li for each todo
  for (var i = 0; i < highscore.length; i++) {
    var todo = highscore[i].initials + ":" + highscore[i].score;

    // allPlayers.sort(function(a, b){
    //     return b.score - a.score
    //   });

    var li = document.createElement("li");
    li.textContent = todo;
    li.setAttribute("data-index", i);

    // var button = document.createElement("button");
    // button.textContent = "Complete";

    // li.appendChild(button);
    highScoreList.appendChild(li);
    // console.log(todo[i].initials);
  }
}

function init() {
  // Get stored todos from localStorage
  // Parsing the JSON string to an object
  var storedHighScore = JSON.parse(localStorage.getItem("highscore"));

  // If todos were retrieved from localStorage, update the todos array to it
  if (storedHighScore !== null) {
    highscore = storedHighScore;
  }

  // Render todos to the DOM
  renderHighScore();
  viewHighScores = true;
}

function storeHighScore() {
  // Stringify and set "todos" key in localStorage to todos array
  localStorage.setItem("highscore", JSON.stringify(highscore));
}

initialsForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (quizOver === false) {
    alert("Please start and finish the quiz first!");
    return;
  }
  //   debugger;
  //   highScoreList.setAttribute("hidden", "true");

  highScoreList.removeAttribute("hidden");

  // initialsInput.setAttribute("hidden", "true");
  //   correctAnswers = 0;
  var initialsText = {
    initials: initialsInput.value.trim(),
    score: correctAnswers
  };

  // Return from function early if submitted todoText is blank
  if (initialsText === "") {
    return;
  }
  //   console.log("{initials:" + initialsText + ", score: " + correctAnswers + "}");
  // Add new todoText to todos array, clear the input
  highscore.push(initialsText);
  initialsInput.value = "";

  highscore.hidden = "";
  // Store updated todos in localStorage, re-render the list
  storeHighScore();
  renderHighScore();
});
