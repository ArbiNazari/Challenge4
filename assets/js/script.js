var questions = [

    {

        title: "Commonly used data types DO NOT include:",

        choices: ["strings", "booleans", "alerts", "numbers"],

        answer: "alerts"

    },

    {

        title: "The condition in an if / else statement is enclosed within ____.",

        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],

        answer: "parentheses"

    },

    {

        title: "Arrays in JavaScript can be used to store ________?",

        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],

        answer: "all of the above"

    },

    {

        title: "String values must be enclosed within _______ when being assigned to varibles?",

        choices: ["commas", "curly brackets", "quotes", "Parentthesis"],

        answer: "quotes"

    },

    {

        title: "A very useful tool used during development and debugging for printing content to the debugger is:",

        choices: ["Javascript", "terminal/bash", "for loops", "console.log"],

        answer: "console.log"

    },
];

 

var welcomeEl = document.querySelector("#welcome");

var startQuizBtnEl = document.querySelector("#startQuiz");

 

var quizTimeEl = document.querySelector("#quizTime");

var questionEl = document.querySelector("#question");

var answersEl = document.querySelector("#answers");

 

var scoreInputEl = document.querySelector("#scoreInput");

var initialsEl = document.querySelector("#initials");

var submitInitialsBtnEl = document.querySelector("#submitInitials");

var userScoreEl = document.querySelector("#score");

 

var highScoresEl = document.querySelector("#highScores");

var scoresEl = document.querySelector("#scores");

var goBackBtnEl = document.querySelector("#goBack");

var clearScoresBtnEl = document.querySelector("#clearScores");

 

var viewScoresBtnEl = document.querySelector("#viewScores");

var timerEl = document.querySelector("#timer");

var score = 0;

var currentQ = 0;

var highScores = [];

var interval;

var timeGiven = 100;

var secondsElapsed = 0;

 

function startTimer() {

    timerEl.textContent = timeGiven;

    interval = setInterval(function () {

        secondsElapsed++;

        timerEl.textContent = timeGiven - secondsElapsed;

        if (secondsElapsed >= timeGiven) {

            currentQ = questions.length;

            nextQuestion();

        }

    }, 1000);

}

 

function stopTimer() {

    clearInterval(interval);

}

 

function nextQuestion() {

    currentQ++;

    if (currentQ < questions.length) {

        renderQuestion();

    } else {

        stopTimer();

        if ((timeGiven - secondsElapsed) > 0)

            score += (timeGiven - secondsElapsed);

        userScoreEl.textContent = score;

        hide(quizTimeEl);

        show(scoreInputEl);

        timerEl.textContent = 0;

    }

}

 

function checkAnswer(answer) {

    if (questions[currentQ].answer == questions[currentQ].choices[answer.id]) {

        score += 5;

        displayMessage("Your Are Correct!");

    }

    else {

        secondsElapsed += 15;

        displayMessage("Wrong!");

    }

}

 

function displayMessage(m) {

    let messageHr = document.createElement("hr");

    let messageEl = document.createElement("div");

    messageEl.textContent = m;

    document.querySelector(".prompt").appendChild(messageHr);

    document.querySelector(".prompt").appendChild(messageEl);

    setTimeout(function () {

        messageHr.remove();

        messageEl.remove();

    }, 2000);

 

}

 

function hide(element) {

    element.style.display = "none";

}

 

function show(element) {

    element.style.display = "block";

}

 

function reset() {

    score = 0;

    currentQ = 0;

    secondsElapsed = 0;

    timerEl.textContent = 0;

}

 

function renderQuestion() {

    questionEl.textContent = questions[currentQ].title;

    for (i = 0; i < answersEl.children.length; i++) {

        answersEl.children[i].children[0].textContent = `${(i + 1)}: ${questions[currentQ].choices[i]}`;

    }

}

 

function renderHighScores() {

 

    scoresEl.innerHTML = "";

    show(highScoresEl);

    highScores = JSON.parse(localStorage.getItem("scores"));

    for (let i = 0; i < highScores.length; i++) {

        let scoreItem = document.createElement("div");

        scoreItem.className += "row";

        console.log(scoreItem)

        scoreItem.setAttribute("style", "background-color:white;");

        scoreItem.textContent = `${(i + 1)}. ${highScores[i].username} - ${highScores[i].userScore}`;

        scoresEl.appendChild(scoreItem);

    }

}

 

viewScoresBtnEl.addEventListener("click", function () {

    hide(welcomeEl);

    hide(quizTimeEl);

    hide(scoreInputEl);

    renderHighScores();

    stopTimer();

    reset();

});

 

startQuizBtnEl.addEventListener("click", function () {

    hide(welcomeEl);

    startTimer();

    renderQuestion();

    show(quizTimeEl);

});

 

answersEl.addEventListener("click", function (e) {

    if (e.target.matches("button")) {

        checkAnswer(e.target);

        nextQuestion();

    }

});

 

submitInitialsBtnEl.addEventListener("click", function () {

    let initValue = initialsEl.value.trim();

    if (initValue) {

        let userScore = { username: initValue, userScore: score };

        initialsEl.value = '';

        highScores = JSON.parse(localStorage.getItem("scores")) || [];

        highScores.push(userScore)

        localStorage.setItem("scores", JSON.stringify(highScores));

        hide(scoreInputEl);

        renderHighScores();

        reset();

    }

});

 

goBackBtnEl.addEventListener("click", function () {

    hide(highScoresEl);

    show(welcomeEl);

});

 

clearScoresBtnEl.addEventListener("click", function () {

    highScores = [];

    localStorage.setItem("scores", JSON.stringify(highScores));

    renderHighScores();

});