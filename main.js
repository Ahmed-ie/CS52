// DOM fully loads
document.addEventListener("DOMContentLoaded", () => {

  // DOM elements

  const submitButton = document.getElementById("submitQuiz");

  const quizContainer = document.getElementById("quizContainer");
  const quizSelector = document.getElementById("quizSelector");
  const resultModal = document.getElementById("resultModal");
  const modalImage = document.getElementById("modalImage");
  const modalText = document.getElementById("modalText");

  const closeModalButton = document.getElementById("closeModal");
  

  let currentQuiz = null; // To store the current quiz data

  //preload images
  // Citation: Preloading images technique adapted from [https://webdesign.tutsplus.com/best-ways-to-preload-images-using-javascript-css-and-html--cms-41329t].

  function preloadImages(imageURLs) {
      for (const url of imageURLs) {
          const img = new Image();
          img.src = url;
      }
  }


  // Function to load the quiz data
  async function loadQuiz(quizName) {
      try {
          const response = await fetch(`${quizName}.json`);
          const data = await response.json();

          // Collect image URLs and preload them
          const imageURLs = [];
          for (const question of data.questions) {
              for (const answer of question.answers) {
                  if (!imageURLs.includes(answer.img)) {
                      imageURLs.push(answer.img);
                  }
              }
          }
          preloadImages(imageURLs);

          // Store quiz data

          currentQuiz = data;
          renderQuiz(data.questions);
          
      } catch (error) {
          console.error("Error loading quiz:", error);
          alert("Failed to load the quiz. Please try again later.");
      }
  }

  // Function to render the quiz dynamically
  // citation: DOM manipulation inspired by tutorials, also on creating elements dynamically https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/DOM_scripting
  function renderQuiz(questions) {
      quizContainer.innerHTML = ""; // Clear any previous content
      for (const [index, question] of questions.entries()) {
          const questionElement = document.createElement("div");
          questionElement.classList.add("question");


          const questionTitle = document.createElement("h2");
          questionTitle.textContent = question.question_name;

          
          const answersContainer = document.createElement("div");
          answersContainer.classList.add("answers");

         
          for (const answer of question.answers) {

              const label = document.createElement("label");

              const img = document.createElement("img");
              img.src = answer.img;
              img.alt = answer.text;


              const input = document.createElement("input");
              input.type = "radio";
              input.name = `q${index}`;

              input.value = answer.outcome;

              const span = document.createElement("span");
              span.textContent = answer.text;

              label.appendChild(img);
              label.appendChild(input);
              
              label.appendChild(span);

              answersContainer.appendChild(label);

          }

          questionElement.appendChild(questionTitle);
          questionElement.appendChild(answersContainer);

          quizContainer.appendChild(questionElement);
      }
  }

  // Function to handle quiz selection
  quizSelector.addEventListener("click", (event) => {
      const selectedQuiz = event.target.dataset.quiz;
      if (selectedQuiz) {
          loadQuiz(selectedQuiz);

          quizSelector.style.display = "none";
          quizContainer.style.display = "block";

          submitButton.style.display = "block";
      }
  });

  // Function to handle the "Find My Car!" button
  submitButton.addEventListener("click", () => {
      const selectedAnswers = getSelectedAnswers();
      if (!selectedAnswers) {

          alert("Please answer all the questions before submitting!");
          return;

      }
      const result = calculateResult(selectedAnswers);

      displayResult(result);
  });

  // Function to get selected answers
  function getSelectedAnswers() {
      const questions = document.querySelectorAll(".question");
      const answers = [];

      for (const question of questions) {
          const selectedOption = question.querySelector("input[type='radio']:checked");
          if (!selectedOption) {
              return null; // If any quest is unanswered
          }
          answers.push(selectedOption.value);
      }

      return answers;
  }

  // Function to calulate the result
  function calculateResult(answers) {
      const counts = {};
      for (const outcome of currentQuiz.outcomes) {
          counts[outcome.id] = 0;
      }

      for (const answer of answers) {
          counts[answer] += 1;
      }

      // Find the outcoe with the highst count
      let maxOutcome = null;
      let maxCount = 0;

      for (const [outcome, count] of Object.entries(counts)) {
          if (count > maxCount) {
              maxOutcome = outcome;
              maxCount = count;
          }
      }

      return maxOutcome;
  }

  // Function to display the result using a modal
  function displayResult(result) {
      const resultData = currentQuiz.outcomes.find((outcome) => outcome.id === result);
      if (resultData) {
          modalImage.src = resultData.img; // Set the resimage
          modalText.textContent = resultData.text; // Set the result text
          resultModal.style.display = "flex"; // Show  modal
      } else {
          alert("Could not calculate the result. Please try again.");
      }
  }

  // Close modal 
  closeModalButton.addEventListener("click", () => {
      resultModal.style.display = "none";
  });

  // Close modal when clicking 
  resultModal.addEventListener("click", (e) => {
      if (e.target.id === "resultModal") {
          resultModal.style.display = "none";
      }
  });
});
