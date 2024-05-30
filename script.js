document.addEventListener('DOMContentLoaded', () => {
  // Define your questions here
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

  // Function to display questions
  function displayQuestions() {
    const questionsList = document.getElementById('questionsList');
    questionsList.innerHTML = '';
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
  }

  // Function to save progress
  function saveProgress() {
    const answers = Array.from(document.querySelectorAll('input[type="radio"]:checked')).reduce((acc, input) => {
      const questionIndex = parseInt(input.name.replace('question', ''));
      acc[questionIndex] = input.value;
      return acc;
    }, {});
    sessionStorage.setItem('progress', JSON.stringify(answers));
  }

  // Function to calculate score
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

    document.getElementById('score').textContent = `Your score is ${score} out of 5.`;
    localStorage.setItem('score', score);
  }

  // Event listener for form submission
  document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault();
    calculateScore();
  });

  // Event listener for radio button change
  document.getElementById('quizForm').addEventListener('change', saveProgress);

  // Call function to display questions
  displayQuestions();

  // Load progress if any
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
});
