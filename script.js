document.addEventListener("DOMContentLoaded", function() {
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

  renderQuestions();
  loadSavedAnswers();

  function renderQuestions() {
    const questionsList = document.getElementById('questionsList');

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

    document.querySelectorAll('input[type="radio"]').forEach(input => {
      input.addEventListener('change', function() {
        const questionIndex = parseInt(this.name.replace('question', ''));
        saveAnswer(questionIndex, this.value);
      });
    });
  }

  function saveAnswer(questionIndex, selectedOption) {
    const answers = JSON.parse(sessionStorage.getItem('progress')) || {};
    answers[questionIndex] = selectedOption;
    sessionStorage.setItem('progress', JSON.stringify(answers));
  }

  function loadSavedAnswers() {
    const savedProgress = sessionStorage.getItem('progress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      for (let index in progress) {
        const answer = progress[index];
        const input = document.querySelector(`input[name="question${index}"][value="${answer}"]`);
        if (input) {
          input.checked = true;
        }
      }
    }
  }

  function calculateScore() {
    const userAnswers = Array.from(document.querySelectorAll('input[type="radio"]:checked')).reduce((acc, input) => {
      acc[input.name] = input.value;
      return acc;
    }, {});

    let score = 0;
    questions.forEach((q, index) => {
      const userAnswer = userAnswers[`question${index}`];
      if (userAnswer === q.correctAnswer) {
        score++;
      }
    });

    return score;
  }

  document.getElementById("submitBtn").addEventListener("click", function(event) {
    event.preventDefault();

    const score = calculateScore();
    document.getElementById('score').textContent = `Your score is ${score} out of ${questions.length}.`;
    localStorage.setItem('score', score);
  });
});
