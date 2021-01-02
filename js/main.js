const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What is an electrical circuit?',
        choice1: 'An loop with a power source, load and conductive path',
        choice2: 'A circuit that has leds, potentiometers, positive and negative volts.',
        choice3: 'An arduino board',
        choice4: 'A Raspberry Pi board',
        answer: 1,
    },
    {
        question:"What is a LED?",
        choice1: "a light",
        choice2: "a part of a circuit",
        choice3: "a light emitting diode",
        choice4: "a monopole",
        answer: 3,
    },
    {
        question: "Why is a resistor important?",
        choice1: "It isn't important",
        choice2: "It increases the power of a circuit",
        choice3: "It controls the flow of electricity by lessening it to a certain amount",
        choice4: "It destoys the components",
        answer: 3,
    },
    {
        question: "A resistor with color bands: orange, orange, brown, gold is how many ohms?",
        choice1: "500",
        choice2: "330",
        choice3: "1000",
        choice4: "750",
        answer: 2,
    },

    {
        question: "An output is something that happens when a circuit is in use.  An example of an output is:",
        choice1: "Light flashing",
        choice2: "Temperature being given",
        choice3: "Buzzer sounding",
        choice4: "All of the answers are correct",
        answer: 4,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end_game.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()

function print_score() {
    document.getElementById("finalScore").innerHTML = score;
  }
