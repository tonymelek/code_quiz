const title = document.querySelector("#title")
const message = document.querySelector("#message")
const single = document.querySelector("#single")
const single_but = document.querySelector("#single-but")
const double_but = document.querySelector("#double-but")
const double_but_2 = document.querySelector("#double-but-2")
const four_1 = document.querySelector("#four-1")
const four_2 = document.querySelector("#four-2")
const four_3 = document.querySelector("#four-3")
const four_4 = document.querySelector("#four-4")
const image = document.querySelector("#image")
// const instructions = document.querySelector("#instructions")
const double_1 = document.querySelector("#double-1")
const double_2 = document.querySelector("#double-2")
const fame_name = document.querySelector("#fame-name")
const fame_score = document.querySelector("#fame-score")
const player_name = document.querySelector("#your_name")
const fame = []

let iterator = 0
let score = 0
let weighted_score = 0
let count = 420
var shuffeled_questions;

const questions2 = [
    {
        question: "You can use any of the following as code editor except :",
        options: ["Sublime text", "Visual studio code", "Photoshop", "Atom"],
        answer: "Photoshop"

    }, {
        question: "You can use any of the following as a web browser except :",
        options: ["Opera", "Safari", "Chrome", "Notepad"],
        answer: "Notepad"

    }, {
        question: "The following HTML tags are used in the body except :",
        options: ["title", "h1", "main", "header"],
        answer: "title"

    }, {
        question: "Latest version of HTML, wich is being used  :",
        options: ["3.1", "4.6", "5.0", "6.1"],
        answer: "5.0"

    }, {

        question: "Which web technology is used for styling elements?",
        options: ["CSS", "HTML", "Javascript", "Python"],
        answer: "CSS"
    }, {
        question: "Default display setting of a <div> is",
        options: ["block", "inline-block", "inline", "none"],
        answer: "block"
    }, {
        question: "The following are considered semantic tags except:",
        options: ["main", "nav", "aside", "div"],
        answer: "div"
    }, {
        question: "Default display setting of a <p> is",
        options: ["block", "inline-block", "inline", "none"],
        answer: "block"

    }, {
        question: "Default display setting of a <span> is",
        options: ["block", "inline-block", "inline", "none"],
        answer: "inline"

    }, {
        question: "Largest Heading tag is ",
        options: ["h1", "h5", "h6", "h4"],
        answer: "h1"

    }, {
        question: "To insert line break in HTML",
        options: ["<br>", "<span>", "<break>", "<lb>"],
        answer: "<br>"

    }, {
        question: "To make text italic use which of these tags",
        options: ["<em>", "<i>", "<italic>", "<style-italic>"],
        answer: "<em>"

    }, {
        question: "How can you open a link in a new tab/browser window?",
        options: ["target='blank'", "target='_blank'", "target='new'", "target='_new'"],
        answer: "target='_blank'"

    }, {
        question: "All of the following are table tags except",
        options: ["<th>", "<thead>", "<tbody>", "<tr>"],
        answer: "<thead>"
    }]

//First Run
title.textContent = "Code Quiz"
message.textContent = "Instructions"

single_but.style.display = "block"
single.addEventListener('click', start_quiz)

//After Quiz
function after_quiz() {
    document.querySelector(".image-holder").style.display = "none"
    document.querySelector(".hall-of-fame").style.display = "block"
    double_but.style.display = "block"
    double_1.style.display = "inline-block"
    double_1.setAttribute("style", "display:inline-block; margin-right:20px; width:40%")
    double_2.setAttribute("style", "display:inline-block;width:40%")
    double_1.addEventListener('click', fame_adder)
    double_2.addEventListener('click', start_quiz)
}
//Add names to Hall of fame
function fame_adder() {
    fame.push({ name: player_name.value, score: weighted_score });
    let li_name = document.createElement("li")
    li_name.textContent = player_name.value
    let li_score = document.createElement("li")
    li_score.textContent = weighted_score
    fame_name.appendChild(li_name)
    fame_score.appendChild(li_score)
    double_1.style.display = "none"
    setTimeout(double_1.removeEventListener('click', fame_adder), 1)
}

function answerVerifier(answerStatus) {
    setTimeout(() => image.src = "./images/ready.png", 1500)
    image.src = "./images/" + answerStatus + ".png"
}



function displayer(e) {

    if (e.target.matches(".but-1")) {
        if (shuffeled_questions[iterator].answer === e.target.textContent) {
            answerVerifier("correct")
            score++
        } else {
            answerVerifier("wrong")
            count = count - 30
        }
        if (iterator + 1 < shuffeled_questions.length) {

            generateQuestion(++iterator)
        }
        else {
            endQuiz()
        }
    }

}

function generateQuestion(iterator) {
    console.log("function " + iterator)

    double_but_2.style.display = "block"


    title.textContent = "Question " + (iterator + 1)
    message.textContent = shuffeled_questions[iterator].question
    let shuffled_options = shuffeled_questions[iterator].options.sort(() => { return .5 - Math.random() })
    four_1.textContent = shuffled_options[0]
    four_2.textContent = shuffled_options[1]
    four_3.textContent = shuffled_options[2]
    four_4.textContent = shuffled_options[3]


}

function endQuiz() {
    counter.textContent = "Time Remaining  00:00"
    title.textContent = "End of Quiz"
    console.log(score + count / 30)
    weighted_score = (score > 7 ? score + (count > 0 ? (count / 30) : 0) : score).toFixed(2)
    message.textContent = "Your score is : " + weighted_score
    double_but_2.style.display = "none"
    image.src = ""
    after_quiz()
    document.removeEventListener('click', displayer)

}





function start_count() {

    const counter = document.querySelector("#counter")
    const timer = setInterval(() => {
        var minutes, sec
        if (count <= 0) {
            endQuiz()
            clearInterval(timer)
        } else {
            (count % 60 < 10) ? sec = "0" + count % 60 : sec = "" + count % 60
            Math.floor(count / 60) < 10 ? minutes = "0" + Math.floor(count / 60) : minutes = Math.floor(count / 60)
            count--
            counter.textContent = "Time Remaining " + minutes + ":" + sec
            title.textContent === "End of Quiz" ? clearInterval(timer) : timer

        }
    }, 1000)
}
function start_quiz() {
    iterator = 0
    score = 0
    count = 420
    shuffeled_questions = questions2.sort(() => { return .5 - Math.random() })

    document.querySelector(".image-holder").style.display = "block"
    image.style.display = "block"
    single_but.style.display = "none"
    double_but.style.display = "none"
    image.src = "./images/ready.png"
    document.querySelector(".hall-of-fame").style.display = "none"
    single.removeEventListener('click', start_quiz)
    double_1.removeEventListener('click', fame_adder)
    generateQuestion(iterator)
    start_count()
    setTimeout(() => document.addEventListener('click', displayer), 1) //Delay Event Listener 1msec so as not to confuse with eventlistener from the previous screen

}