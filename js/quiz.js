const quizData = [
    {
        question: "What is the name of Ross and Monica's dog when they were kids?",
        options: ["Fluffy", "Chi-Chi", "Sandy"],
        correct: 1
    },
    {
        question: "What is the name of Joey's stuffed penguin?",
        options: ["Hugsy", "Mr. Waddles", "Puddles"],
        correct: 0
    },
    {
        question: "What fruit is Ross allergic to?",
        options: ["Peaches", "Kiwi", "Strawberries"],
        correct: 1
    },
    {
        question: "What was the name of the woman Ross said 'Rachel' instead of at the altar?",
        options: ["Susan", "Emily", "Carol"],
        correct: 1
    },
    {
        question: "What was the name of the soap opera Joey starred in as Dr. Drake Ramoray?",
        options: ["General Hospital", "Days of Our Lives", "As the World Turns"],
        correct: 1
    },
    {
        question: "What was Monica's biggest pet peeve?",
        options: ["People not using coasters", "Animals dressed as humans", "Unorganized bookshelves"],
        correct: 1
    },
    {
        question: "What was Chandler's job for most of the series?",
        options: ["Statistical Analyst", "IT Manager", "Transponster"],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;
let answers = new Array(quizData.length).fill(null);
let timer;
let timeLeft;

document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.querySelector('.start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', startQuiz);
    }
});

function startTimer() {
    clearInterval(timer);
    timeLeft = 7;
    updateTimer();
    
    timer = setInterval(() => {
        timeLeft--;
        updateTimer();
        
        if (timeLeft === 0) {
            clearInterval(timer);
            const correct = quizData[currentQuestion].correct;
            const options = document.querySelectorAll('.option');
            options[correct].classList.add('correct');
            
            setTimeout(() => {
                if (currentQuestion < quizData.length - 1) {
                    currentQuestion++;
                    loadQuestion(currentQuestion);
                } else {
                    showResults();
                }
            }, 2000);
        }
    }, 1000);
}

function updateTimer() {
    document.getElementById('countdown').textContent = timeLeft;
}

function startQuiz() {
    document.getElementById('quizIntro').style.display = 'none';
    document.getElementById('questionContainer').style.display = 'block';
    loadQuestion(0);
    startTimer();
}

function loadQuestion(index) {
    currentQuestion = index;
    
    document.getElementById('questionCounter').textContent = `Question ${index + 1}/${quizData.length}`;
    document.getElementById('countdown').textContent = '7';
    
    const question = quizData[currentQuestion];
    document.getElementById('question').textContent = question.question;
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, i) => {
        const button = document.createElement('div');
        button.className = 'option';
        button.textContent = option;
        button.onclick = () => selectOption(i);
        optionsContainer.appendChild(button);
    });
}

function selectOption(index) {
    if (answers[currentQuestion] !== null) return;
    
    clearInterval(timer);
    
    const options = document.querySelectorAll('.option');
    const correct = quizData[currentQuestion].correct;
    
    options.forEach(option => option.classList.remove('selected'));
    options[index].classList.add('selected');
    answers[currentQuestion] = index;

    if (index === correct) {
        options[index].classList.add('correct');
        createMultipleFireworks();
        score++;
    } else {
        options[index].classList.add('incorrect');
        options[correct].classList.add('correct');
    }

    setTimeout(() => {
        if (currentQuestion < quizData.length - 1) {
            currentQuestion++;
            loadQuestion(currentQuestion);
            startTimer();
        } else {
            showResults();
        }
    }, 2000);
}

function showResults() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('resultPopup').style.display = 'block';
    
    const totalQuestions = quizData.length;
    const correctAnswers = score;
    
    document.getElementById('finalScore').innerHTML = `
        <h3>Your Score: ${correctAnswers}/${totalQuestions}</h3>
        <p>Correct Answers: ${correctAnswers}</p>
        <p>Incorrect Answers: ${totalQuestions - correctAnswers}</p>
    `;
    
    let feedback;
    const percentage = (correctAnswers / totalQuestions) * 100;
    
    if (percentage === 100) {
        feedback = "Perfect score! You're a true Friends expert! 🏆";
    } else if (percentage >= 70) {
        feedback = "Great job! You really know your Friends! 🌟";
    } else if (percentage >= 40) {
        feedback = "Not bad! You're getting there! 👍";
    } else {
        feedback = "Time to rewatch some episodes! 📺";
    }
    
    document.getElementById('finalFeedback').textContent = feedback;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    timeLeft = 7;
    answers = new Array(quizData.length).fill(null);
    
    clearInterval(timer);
    
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('resultPopup').style.display = 'none';
    document.getElementById('countdown').textContent = '7';
    
    const fireworks = document.querySelectorAll('.firework');
    fireworks.forEach(firework => firework.remove());
    
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.remove('selected', 'correct', 'incorrect');
    });
    
    startQuiz();
}

function createMultipleFireworks() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = Math.random() * 100 + '%';
            firework.style.top = Math.random() * 100 + '%';
            document.body.appendChild(firework);
            
            setTimeout(() => {
                firework.remove();
            }, 2000);
        }, i * 200);
    }
} 