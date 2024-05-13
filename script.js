const questions = [
      {
        question: "What is the capital of France?",
        choices: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris",
      },
      {
        question: "What is the highest mountain in the world?",
        choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
        answer: "Everest",
      },
      {
        question: "What is the largest country by area?",
        choices: ["Russia", "China", "Canada", "United States"],
        answer: "Russia",
      },
      {
        question: "Which is the largest planet in our solar system?",
        choices: ["Earth", "Jupiter", "Mars"],
        answer: "Jupiter",
      },
      {
        question: "What is the capital of Canada?",
        choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
        answer: "Ottawa",
      },
    ];

    const questionsContainer = document.getElementById('questions');
    const submitButton = document.getElementById('submit');
    const scoreDisplay = document.getElementById('score');

    function renderQuestion(question, index) {
      const questionElement = document.createElement("div");
      const questionText = document.createTextNode(question.question);
      questionElement.appendChild(questionText);

      question.choices.forEach((choice, choiceIndex) => {
        const choiceElement = document.createElement("input");
        choiceElement.setAttribute("type", "radio");
        choiceElement.setAttribute("name", `question-${index}`);
        choiceElement.setAttribute("value", choice);

        if (sessionStorage.getItem(`progress${index}`) === choice) {
          choiceElement.checked = true;
        }

        const choiceText = document.createTextNode(choice);
        questionElement.appendChild(choiceElement);
        questionElement.appendChild(choiceText);
      });

      questionsContainer.appendChild(questionElement);
    }

    function renderQuestions() {
      questions.forEach((question, index) => {
        renderQuestion(question, index);
      });
    }

    renderQuestions();

    function saveProgress() {
      const options = document.querySelectorAll('input[type="radio"]:checked');
      options.forEach((option, index) => {
        const questionIndex = option.name.split('-')[1];
        sessionStorage.setItem(`progress${questionIndex}`, option.value);
      });
    }

    function calculateScore() {
      let score = 0;
      questions.forEach((question, index) => {
        if (sessionStorage.getItem(`progress${index}`) === question.answer) {
          score++;
        }
      });
      return score;
    }

    function displayScore(score) {
      scoreDisplay.textContent = `Your score is ${score} out of ${questions.length}`;
    }

    submitButton.addEventListener('click', () => {
      const allOptions = document.querySelectorAll('input[type="radio"]');
      const checkedOptions = document.querySelectorAll('input[type="radio"]:checked');

      if (allOptions.length !== checkedOptions.length) {
        alert('Please answer all the questions before submitting the quiz.');
        return;
      }

      saveProgress();
      const score = calculateScore();
      displayScore(score);
      localStorage.setItem('score', score);
    });