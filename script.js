// [] - list

const quizData = [
    {
        question: "9+9-4.5+13.5-9",
        Options: ["9", "13.5", "18", "4.5"],
        answer: "18"
    },

    {
        question: "5+4-9+18-9",
        Options: ["9", "13.5", "18", "4.5"],
        answer: "9"
    },

    {
        question: "6+6-6+6",
        Options: ["3", "12", "18", "6"],
        answer: "18"
    },

    {
        question: "12 times 12",
        Options: ["49", "69", "129", "144"],
        answer: "144"
    },

    {
        question: "22/7",
        Options: ["3.14", "6", "3", "8"],
        answer: "3.14"
    },
];

const startButton = document.getElementById('start-btn');
const questionElement = document.getElementById('question');
const timerElement = document.getElementById('timer');
const timerText = document.getElementById('countdown');
const progressBar = document.getElementById('progress-bar');
const progressBarcontainer = document.getElementById('progress-bar-container');
const optionsElement = document.getElementById('options-container');
const resultElement = document.getElementById('result');

progressBar.style.width = '0%';

let currentQuestion = 0;
let score = 0;

startButton.addEventListener('click',startQuiz)

function startQuiz()
{
    startButton.style.display = 'none';
    loadQuestion();
}

function loadQuestion()
{   
    clearInterval(timer);
    if(currentQuestion < quizData.length)
    {
        progressBar.style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;
        // create a variable for the current question
        const currentQuizData = quizData[currentQuestion];
        questionElement.textContent = currentQuizData.question;
        timerText.textContent = 15;

        optionsElement.innerHTML = '';

        currentQuizData.Options.forEach((option) => {
            const button = document.createElement('button');
            button.textContent = option 
            button.classList.add('option-btn');
            optionsElement.appendChild(button);

            button.addEventListener('click', () => {
                checkAnswer(option);
            })
        });

        timer = setInterval(() => {
            timerText.textContent = parseInt(timerText.textContent) - 1;
            if(parseInt(timerText.textContent) === 0)
            {
                clearInterval(timer);
                currentQuestion++;
                loadQuestion();
            }
        }, 1000);
    } else 
    {
        endQuiz();
    }
}

function endQuiz()
{
    progressBarcontainer.style.display = 'none';
    questionElement.textContent = "Quiz has ended! Horray!";
    optionsElement.style.display = 'none';
    timerElement.style.display = 'none';
}

function checkAnswer(option)
{
    const currentQuizData = quizData[currentQuestion];
    if(option === currentQuizData.answer)
    {
        score = score + 1;
    }      

    resultElement.textContent = `You scored ${score} points`;
    currentQuestion++;
    loadQuestion();
}