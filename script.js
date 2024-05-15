const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: "Paris"
  },
  {
    question: "What is the largest mammal?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["William Shakespeare", "Jane Austen", "Charles Dickens", "Leo Tolstoy"],
    correctAnswer: "William Shakespeare"
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["H2O", "CO2", "NaCl", "O2"],
    correctAnswer: "H2O"
  }
];

const quizForm = document.getElementById('quizForm');
const questionsList = document.getElementById('questionsList');
const scoreDisplay = document.getElementById('score');

document.addEventListener('DOMContentLoaded', () => {
  const savedProgress = sessionStorage.getItem('progress');
  if (savedProgress) {
    const progress = JSON.parse(savedProgress);
    progress.forEach((answer, index) => {
      const input = document.querySelector(`input[name="question${index}"][value="${answer}"]`);
      if (input) {
        input.checked = true;
      }
    });
  }
});

questions.forEach((q, index) => {
  const questionItem = document.createElement('li');
  questionItem.innerHTML = `
    <h3>${q.question}</h3>
    <div>
      ${q.options.map((opt, i) => `
        <input type="radio" id="q${index}option${i}" name="question${index}" value="${opt}">
        <label for="q${index}option${i}">${opt}</label>
      `).join('')}
    </div>
  `;
  questionsList.appendChild(questionItem);
});

quizForm.addEventListener('change', () => {
  const answers = Array.from(quizForm.elements).reduce((acc, element) => {
    if (element.type === 'radio' && element.checked) {
      const questionIndex = parseInt(element.name.replace('question', ''));
      acc[questionIndex] = element.value;
    }
    return acc;
  }, {});
  sessionStorage.setItem('progress', JSON.stringify(Object.values(answers)));
});

quizForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const userAnswers = Array.from(quizForm.elements).reduce((acc, element) => {
    if (element.type === 'radio' && element.checked) {
      acc[element.name] = element.value;
    }
    return acc;
  }, {});

  let score = 0;
  questions.forEach((q, index) => {
    const userAnswer = userAnswers[`question${index}`];
    if (userAnswer === q.correctAnswer) {
      score++;
    }
  });

  scoreDisplay.textContent = `Your score is ${score} out of 5.`;

  localStorage.setItem('score', score);
});
