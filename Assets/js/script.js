 // temp hold for taker score
var score;
// timer
var countdown = 75;


var quizContainer = document.getElementById("quiz-container");
var timer = document.getElementById("timer");
var highScoresContainer = document.getElementById("high-scores");


function updateLocalStorage(userArray) {
  localStorage.setItem("scores", JSON.stringify(userArray));
}

// Landing page
function LandingPage() {
  // Quiz container is empty
  quizContainer.innerHTML = "";

  
  quizContainer.setAttribute("id", "quiz-container");

  
  var div = document.createElement("div");
  div.setAttribute("id", "landing-page");

  
  var header1 = document.createElement("h1");
  header1.textContent = "Coding Assessment";
  div.appendChild(header1);

  
  var header2 = document.createElement("h2");
  header2.textContent = "Practice for yourself!";
  div.appendChild(header2);

  
  var header3 = document.createElement("h3");
  header3.textContent = "Answer as many of the following code-related questions within the time limit. Incorrect answers will penalize your available time by 10 seconds!";
  div.appendChild(header3);

  
  var quizBtn = document.createElement("button");
  quizBtn.setAttribute("id", "start-btn");
  quizBtn.textContent = "Start Quiz";
  
  quizBtn.addEventListener("click", startQuiz);
  div.appendChild(quizBtn);

  
  quizContainer.append(div);

  
  if (localStorage.getItem("scores") !== null && userArray.length === 0) {
      var localData = JSON.parse(localStorage.getItem("scores"));
      localData.forEach(user => {
          userArray.push({ userScore: user["userScore"], userInitials: user["userInitials"] });
      })
  }
}


function getScoresFromLocalStorage(quizContainer) {
  
  if (localStorage.getItem("scores") !== null) {
     
      var arr = JSON.parse(localStorage.getItem("scores"));

      var scoreArr = arr.map(userObj => userObj.userScore);
      scoreArr.sort((a, b) => b - a);
      
      for (var i = 0; i < scoreArr.length; i++) {
          var j = 0;
          while (j < arr.length) {
              if (scoreArr[i] === arr[j].userScore) {
                  var result = document.createElement("p");
                  result.setAttribute("class", "score-text");
                  result.textContent = (i + 1) + ". " + arr[j].userInitials + "   -   " + arr[j].userScore;
                  quizContainer.appendChild(result);
              }
              j++;
          }
      } 
  } else {
    
      var result = document.createElement("p");
      result.setAttribute("class", "score-text");
      result.textContent = "No scores have been registered yet.";
      quizContainer.appendChild(result);
  }
}


function renderHighScores() {
  
  quizContainer.innerHTML = "";
  
  highScoresContainer.style.visibility = "visible";
  
  countdown = 75;

  
  quizContainer.setAttribute("id", "high-scores-pg");

  var title = document.createElement("h1");
  title.textContent = "High Scores";
  quizContainer.appendChild(title);

  getScoresFromLocalStorage(quizContainer);

  var div = document.createElement("div");
  div.setAttribute("class", "btn-container");
  quizContainer.appendChild(div);

  var backBtn = document.createElement("button");
  backBtn.setAttribute("class", "high-scores-btn");
  backBtn.textContent = "Take quiz";
  div.appendChild(backBtn);

  backBtn.addEventListener("click", () => {
      countdown = 75;
      startQuiz();
  });

  var clearScoresBtn = document.createElement("button");
  clearScoresBtn.setAttribute("class", "high-scores-btn");
  clearScoresBtn.textContent = "Clear high scores";
  div.appendChild(clearScoresBtn);

  clearScoresBtn.addEventListener("click" , () => {
      localStorage.clear();
      userArray = [];
      renderHighScores();
  })

  var mainBtn = document.createElement("button");
  mainBtn.setAttribute("class", "high-scores-btn");
  mainBtn.textContent = "Go back to landing page";
  div.appendChild(mainBtn);

  mainBtn.addEventListener("click", LandingPage);
}

highScoresContainer.addEventListener("click", renderHighScores);

function postQuiz() {
  quizContainer.innerHTML = "";
  timer.innerHTML = "Timer: 0";

  quizContainer.setAttribute("id", "post-quiz");
  
  var div = document.createElement("div");
  div.setAttribute("class", "initials-container")

  var finalMessage = document.createElement("h1");
  finalMessage.textContent = "Good work!";

  var scoreMessage = document.createElement("h2");
  scoreMessage.textContent = "Your final score is " + score + " out of 15.";

  var nameLabel = document.createElement("label");
  nameLabel.textContent = "Your initials: ";
  nameLabel.setAttribute("for", "initials")

  var nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("id", "initials");

  var submitBtn = document.createElement("button");
  submitBtn.setAttribute("id", "input-submit");
  submitBtn.textContent = "Submit";

  quizContainer.appendChild(finalMessage);
  quizContainer.appendChild(scoreMessage);
  quizContainer.appendChild(div);
  div.appendChild(nameLabel);
  div.appendChild(nameInput);
  quizContainer.appendChild(submitBtn);

  submitBtn.addEventListener("click", () => {
      if (nameInput.value == "") {
          alert("Please write your initials");
      } else {
          userArray.push({ userScore: score, userInitials: nameInput.value });
          updateLocalStorage(userArray);
          renderHighScores();
      }
  })
}

var quizQuestions = [
  { 
      question: "What is the correct HTML for creating a hyperlink?",
      answerOps: ["<a>http://www.w3schools.com</a>", "<a url=\"http://www.w3schools.com\">W3Schools.com</a>", "<a name=\"http://www.w3schools.com\">W3Schools.com</a>", "<a href=\"http://www.w3schools.com\">W3Schools</a>"],
      correctAnswer: 3
  },
  { 
      question: "Which of these statements are all <table> elements?",
      answerOps: ["<table><tr><tt>", "<thead><body><tr>", "<table><tr><td>", "<table><head><tfoot>"],
      correctAnswer: 2
  },
  { 
      question: "Inline elements are normally displayed without starting a new line.",
      answerOps: ["True", "False"],
      correctAnswer: 0
  },
  { 
      question: "What is the correct HTML for making a checkbox?",
      answerOps: ["<input type=\"checkbox\">", "<input type=\"check\">", "<check>", "<checkbox>"],
      correctAnswer: 0
  },
  {
      question: "The HTML global attribute, \"contenteditable\" is used to:",
      answerOps: ["Return the position of the first found occurrence of content inside a string", "Update content from the server", "Specify whether the content of an element should be editable or not", "Specifies a context menu for an element. The menu appears when a user right-clicks on the element"],
      correctAnswer: 2
  },
  { 
      question: "What is the correct CSS syntax for making all the <p> elements bold?",
      answerOps: ["p {text-size:bold;}", "p {font-weight:bold;}", "<p style=\"text-size:bold;\">", "<p style=\"font-size:bold;\">"],
      correctAnswer: 1
  },
  {
      question: "How do you make each word in a text start with a capital letter?",
      answerOps: ["You can't do that with CSS", "text-style:capitalize", "text-transform:capitalize", "transform:capitalize"],
      correctAnswer: 2
  },
  { 
      question: "How do you display a border like this:\n\nThe top border = 10 pixels\nThe bottom border = 5 pixels\nThe left border = 20 pixels\nThe right border = 1pixel?",
      answerOps: ["border-width:10px 1px 5px 20px;", "border-width:10px 5px 20px 1px;", "border-width:10px 20px 5px 1px;", "border-width:5px 20px 10px 1px;"],
      correctAnswer: 0
  },
  { 
      question: "Which property is used to change the left margin of an element?",
      answerOps: ["padding-left", "margin-left", "indent"],
      correctAnswer: 1
  },
  { 
      question: "How do you select an element with id 'demo'?",
      answerOps: ["*demo", "#demo", ".demo", "demo"],
      correctAnswer: 1
  },
  { 
      question: "What is the correct JavaScript syntax to change the content of the HTML element below?\n<p id=\"demo\">This is a demonstration.</p>",
      answerOps: ["#demo.innerHTML = \"Hello World!\";", "document.getElementByName(\"p\").innerHTML = \"Hello World!\";", "document.getElement(\"p\").innerHTML = \"Hello World!\";", "document.getElementById(\"demo\").innerHTML = \"Hello World!\";"],
      correctAnswer: 3
  },
  { 
      question: "How do you create a function in JavaScript?",
      answerOps: ["function myFunction()", "function:myFunction()", "function = myFunction()"],
      correctAnswer: 0
  },
  { 
      question: "How to write an IF statement for executing some code if \"i\" is NOT equal to 5?",
      answerOps: ["if (i!== 5)", "if (i <> 5)", "if i !=5 then", "if i <> 5"],
      correctAnswer: 0
  },
  {
      question: "What is the correct way to write a JavaScript array?",
      answerOps: ["var colors = (1:\"red\", 2:\"green\", 3:\"blue\")", "var colors = 1 = (\"red\"), 2 = (\"green\"), 3 = (\"blue\")", "var colors = \"red\", \"green\", \"blue\"", "var colors = [\"red\", \"green\", \"blue\"]"],
      correctAnswer: 3
  },
  {
      question: "Which event occurs when the user clicks on an HTML element?",
      answerOps: ["onmouseover", "onchange", "onclick", "onmouseclick"],
      correctAnswer: 2
  },
]

function checkAnswer(questionObj, answer) {
  if (questionObj.correctAnswer === questionObj.answerOps.indexOf(answer)) {
      score++;
  } else {
      countdown -= 10;
  }
}

var i = 0;

var endQuiz = false;
function displayQuiz(i) {
  
  if (i === 15) {
      endQuiz = true;
      return;
  }

  quizContainer.innerHTML = "";
  quizContainer.setAttribute("id", "quiz-screen");
  highScoresContainer.style.visibility = "hidden";

  var quizQuestion = document.createElement("h1");
  quizQuestion.setAttribute("class", "title");
  quizQuestion.textContent = quizQuestions[i].question;
  quizContainer.appendChild(quizQuestion);

  
  var div = document.createElement("div");
  div.setAttribute("class", "choice-container")
  quizContainer.appendChild(div);

  quizQuestions[i].answerOps.forEach(answer => {
      var answerBtn = document.createElement("button");
      answerBtn.setAttribute("class", "choice-btn")
      answerBtn.textContent = answer;
      div.appendChild(answerBtn);

      answerBtn.addEventListener("click", () => {
          checkAnswer(quizQuestions[i], answer);
          i++;
          displayQuiz(i);
      })
  })
}

function startQuiz() {
  displayQuiz(i);
  score = 0;

  var quizTimer = setInterval(function () {
      countdown--;
      timer.innerHTML = "Timer: " + countdown;

      if (endQuiz || countdown <= 0) {
          clearInterval(quizTimer);
          postQuiz();
      }
  }, 1000)
}

var userArray = [];
LandingPage();