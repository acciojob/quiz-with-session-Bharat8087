//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
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

    const questionsElement = document.getElementById('questions');
    const submitButton = document.getElementById('submit');
    const scoreDisplay = document.getElementById('score');

    function renderQuestions() {
      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const questionElement = document.createElement("div");
        const questionText = document.createTextNode(question.question);
        questionElement.appendChild(questionText);
        for (let j = 0; j < question.choices.length; j++) {
          const choice = question.choices[j];
          const choiceElement = document.createElement("input");
          choiceElement.setAttribute("type", "radio");
          choiceElement.setAttribute("name", `question-${i}`);
          choiceElement.setAttribute("value", choice);
          if (sessionStorage.getItem(`progress${i}`) === choice) {
            choiceElement.checked = true;
          }
          const choiceText = document.createTextNode(choice);
          questionElement.appendChild(choiceElement);
          questionElement.appendChild(choiceText);
        }
        questionsElement.appendChild(questionElement);
      }
    }
    renderQuestions();

    function saveProgress() {
      const options = document.querySelectorAll('input[type="radio"]:[checked="true"]');
      options.forEach((option, index) => {
        sessionStorage.setItem(`progress${index}`, option.value);
      });
    }

    submitButton.addEventListener('click', () => {
      saveProgress();
      let score = 0;
      for (let i = 0; i < questions.length; i++) {
        if (sessionStorage.getItem(`progress${i}`) === questions[i].answer) {
          score++;
        }
      }
      scoreDisplay.textContent = `Your score is ${score} out of ${questions.length}`;
      localStorage.setItem('score', score);
    });