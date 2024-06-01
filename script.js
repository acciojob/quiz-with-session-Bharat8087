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
console.log("Number of selected options:", document.querySelectorAll('input[type="radio"]:checked').length);
    console.log("Number of list items before rendering:", questionsList.children.length);

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

    console.log("Number of list items after rendering:", questionsList.children.length);
  }

  function loadSavedAnswers() {
    const savedProgress = sessionStorage.getItem('progress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
console.log("Saved options in sessionStorage:", sessionStorage.getItem('progress'));
      for (let index in progress) {
        const answer = progress[index];
        const input = document.querySelector(`input[name="question${index}"][value="${answer}"]`);
        console.log("Input found:", input);
        if (input) {
          input.checked = true;
        }
      }
    }
  }

  function saveAnswer(questionIndex, selectedOption) {
    const answers = JSON.parse(sessionStorage.getItem('progress')) || {};
    answers[questionIndex] = selectedOption;
    sessionStorage.setItem('progress', JSON.stringify(answers));
  }

  function calculateScore() {
    const userAnswers = Array.from(document.querySelectorAll('input[type="radio"]:checked')).reduce((acc, input) => {
      acc[input.name] = input.value;
      return acc;
    }, {});

    console.log("User answers:", userAnswers);

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
	  console.log("Saved score in localStorage:", localStorage.getItem('score'));

  });
});

