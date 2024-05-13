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
          choiceElement.setAttribute("checked", "");
        }

        choiceElement.addEventListener('change', () => {
          sessionStorage.setItem(`progress${index}`, choice);
        });

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

    function calculateScore() {
      let score = 0;
      questions.forEach((question, index) => {
        if (sessionStorage.getItem(`progress${index}`) === question.answer) {
          score++;
        }
      });
      return score;
    }

    function displayScore() {
      const storedScore = localStorage.getItem('score');
      if (storedScore !== null) {
        scoreDisplay.textContent = `Your score is ${storedScore} out of ${questions.length}`;
      }
    }

    displayScore();

    submitButton.addEventListener('click', () => {
      let allQuestionsAnswered = true;
      questions.forEach((question, index) => {
        if (sessionStorage.getItem(`progress${index}`) === null) {
          allQuestionsAnswered = false;
        }
      });

      if (!allQuestionsAnswered) {
        alert('Please answer all the questions before submitting the quiz.');
        return;
      }

      const score = calculateScore();
      scoreDisplay.textContent = `Your score is ${score} out of ${questions.length}`;
      localStorage.setItem('score', score);
    });