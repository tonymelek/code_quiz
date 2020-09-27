//Read Questions from CSV file
$.get('test.csv', function (data) {
    const new_data = [...data] //Covert string to array
    let new_array = []
    // let index = 0
    for (let i = 0; i < data.length; i++) { //Loop through the array and convert Enter and empty sting charcters to *
        new_data[i].charCodeAt() === 10 || new_data[i].charCodeAt() === 13 ? new_data[i] = '*' : new_data
    }
    const temp = new_data.join('').split('*') //convert arrayto string and remove *
    for (let i = 0; i < temp.length - 1; i++) {
        new_array[i] = ([...temp[i]].join('').split(',')) //create a two dimensional array

    }
    //Conert the two dimensional array into Object
    const questions = [];
    new_array = new_array.slice(1)
    for (let i = 1; i < new_array.length; i += 2) {
        questions.push({
            question: new_array[i][0],
            options: new_array[i].slice(1, 5),
            answer: new_array[i][5]
        })
    }

    console.log(questions)

    //Initiating variables and calling HTML DOM Elements
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
    const double_1 = document.querySelector("#double-1")
    const double_2 = document.querySelector("#double-2")
    const fame_name = document.querySelector("#fame-name")
    const fame_score = document.querySelector("#fame-score")
    const player_name = document.querySelector("#your_name")
    const instructions = document.querySelector("#instructions")
    const bullet_1 = document.querySelector("#bullet_1")
    const fame = []

    let iterator = 0
    let score = 0
    let weighted_score = 0
    let count = questions.length * 30
    var shuffeled_questions;

    //Questions to be used in the Quiz are composed of an array of objects, Questions are shuffled every 
    // new Quiz run and answers are shuffled everytime a new question is displayed on screen



    //Initiate Introductory Screen
    title.textContent = "Code Quiz"
    message.textContent = "Instructions"
    instructions.textContent = `You have ${questions.length / 2} minutes to finish a quiz of ${questions.length} questions` + instructions.textContent
    bullet_1.textContent = `If you got more than ${Math.ceil(questions.length / 2)} questions correct, you will be granted a weighted
    bonus.`
    single_but.style.display = "block"
    single.addEventListener('click', start_quiz)

    double_1.addEventListener('click', fame_adder)
    double_2.addEventListener('click', start_quiz)

    //Start Quiz
    function start_quiz() {
        iterator = 0
        score = 0
        count = questions.length * 30
        shuffeled_questions = questions.sort(() => { return .5 - Math.random() })
        document.querySelector(".image-holder").style.display = "block"
        image.style.display = "block"
        single_but.style.display = "none"
        double_but.style.display = "none"
        image.src = "./images/ready.png"
        document.querySelector(".hall-of-fame").style.display = "none"
        generateQuestion(iterator)
        start_count()
        setTimeout(() => document.addEventListener('click', displayer), 1) //Delay Event Listener 1msec so as not to confuse with eventlistener from the previous screen

    }
    //Counter at top right during the quiz
    function start_count() {

        const counter = document.querySelector("#counter")
        timer = setInterval(() => {
            var minutes, sec
            if (count <= 0) {
                count = 0
                endQuiz()
                clearInterval(timer)
                timer = null
            } else {
                count--
                (count % 60 < 10) ? sec = "0" + count % 60 : sec = "" + count % 60
                Math.floor(count / 60) < 10 ? minutes = "0" + Math.floor(count / 60) : minutes = Math.floor(count / 60)
                counter.textContent = "Time Remaining " + minutes + ":" + sec
            }
        }, 1000)
    }


    //Generate a new Question
    function generateQuestion(iterator) {
        double_but_2.style.display = "block"
        title.textContent = "Question " + (iterator + 1)
        message.textContent = shuffeled_questions[iterator].question
        let shuffled_options = shuffeled_questions[iterator].options.sort(() => { return .5 - Math.random() })
        four_1.textContent = shuffled_options[0]
        four_2.textContent = shuffled_options[1]
        four_3.textContent = shuffled_options[2]
        four_4.textContent = shuffled_options[3]
    }
    //Check user's answer and generate a new question or end the Quiz
    function displayer(e) {
        if (e.target.matches(".but-1")) { //Check if answer is correct
            if (shuffeled_questions[iterator].answer === e.target.textContent) {
                answerVerifier("correct")
                score++
            } else {
                answerVerifier("wrong")
                count = count - 30
            }
            if (iterator + 1 < shuffeled_questions.length) {//Display a new Question if there are more yet to be answered

                generateQuestion(++iterator)
            }
            else {
                endQuiz()//End Quiz if the user reached last Questions before time is over
            }
        }
    }
    // Display a tick or cross depending on user's answer
    function answerVerifier(answerStatus) {
        setTimeout(() => image.src = "./images/ready.png", 1500)
        image.src = "./images/" + answerStatus + ".png"
    }


    //End of Quiz
    function endQuiz() {
        title.textContent = "End of Quiz"
        //Generate a wheighted score bonus if the user solved 7+ questions correctly
        weighted_score = (score > questions.length / 2 ? score + (count > 0 ? (count / 30) : 0) : score).toFixed(2)
        message.textContent = "Your score is : " + weighted_score
        double_but_2.style.display = "none"
        image.src = ""//Stop displaying any image as "Hall of Fame will take place instead"
        after_quiz()
        document.removeEventListener('click', displayer) // that's to avoid errors when clicking any buttons other than the multiple chice during the quiz
        clearInterval(timer) //Stop thr timer.
        timer = null

    }

    //After Quiz
    function after_quiz() {
        document.querySelector(".image-holder").style.display = "none"
        document.querySelector(".hall-of-fame").style.display = "block"
        double_but.style.display = "block"
        double_1.style.display = "inline-block"
        double_1.setAttribute("style", "display:inline-block; margin-right:20px; width:40%")
        double_2.setAttribute("style", "display:inline-block;width:40%")

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
        double_1.style.display = "none" // User is allowed to add their names only once everytime they run the quiz
    }
})