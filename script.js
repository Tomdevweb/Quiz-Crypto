const questions = [
  {
    question: "Quelle est la première cryptomonnaie créée ?",
    options: ["Bitcoin", "Ethereum", "Ripple", "Litecoin"],
    answer: 0,
  },
  {
    question: "Qu'est-ce que la blockchain ?",
    options: [
      "Un portefeuille virtuel pour stocker des cryptomonnaies",
      "Un algorithme de chiffrement utilisé dans les cryptomonnaies",
      "Un registre décentralisé et immuable",
      "Une méthode pour miner des cryptomonnaies",
    ],
    answer: 2,
  },
  {
    question: "Qu'est-ce que le minage de cryptomonnaie ?",
    options: [
      "Le processus de création de nouvelles cryptomonnaies",
      "L'achat et la vente de cryptomonnaies",
      "L'échange de cryptomonnaies contre des devises fiduciaires",
      "Le calcul de transactions et la sécurisation du réseau",
    ],
    answer: 3,
  },
  {
    question: "Quelle est la capitalisation boursière du Bitcoin en juin 2021 ?",
    options: [
      "1 milliard de dollars",
      "10 milliards de dollars",
      "100 milliards de dollars",
      "1 000 milliards de dollars",
    ],
    answer: 3,
  },
  {
    question: "Qu'est-ce qu'un portefeuille de cryptomonnaie ?",
    options: [
      "Un programme informatique pour miner des cryptomonnaies",
      "Un document physique contenant des clés d'accès aux cryptomonnaies",
      "Un service de stockage en ligne pour les cryptomonnaies",
      "Un échange pour acheter et vendre des cryptomonnaies",
    ],
    answer: 1,
  },
];

const quizContainer = document.getElementById("quiz");
const questionContainer = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const submitButton = document.getElementById("submit");
const nextButton = document.getElementById("next");

// currentQuestion initialisée a 0 pour commencer a la premiere question (index 0)
let currentQuestion = 0;
let score = 0;
// initialisée a null car pas encore d'option selectionnée
let selectedOption = null;

function loadQuestion() {
  const question = questions[currentQuestion];
  questionContainer.textContent = question.question;

  optionsContainer.innerHTML = "";

  question.options.forEach((option, index) => {
    const li = document.createElement("li");
    li.textContent = option;

    li.addEventListener("click", () => {
      selectedOption = index;
      li.classList.add("selectedOption");
      Array.from(optionsContainer.children).forEach((li) => {
        li.removeEventListener("click", () => {});
        li.classList.add("disabled");
      });
    });

    optionsContainer.appendChild(li);
  });
  selectedOption = null;
}

function checkAnswer() {
  if (selectedOption === null) {
    alert("Veuillez selectionner une réponse!");
    return;
  }

  const question = questions[currentQuestion];
  const answer = question.answer;

  const selectedLi = optionsContainer.children[selectedOption];
  // const selectedAnswer = selectedLi.textContent;

  if (selectedOption === answer) {
    score++;
    selectedLi.classList.remove("selectedOption");
    selectedLi.classList.add("correct");
  } else {
    selectedLi.classList.remove("selectedOption");

    selectedLi.classList.add("incorrect");
  }

  Array.from(optionsContainer.children).forEach((li) => {
    li.removeEventListener("click", () => {});
    li.classList.add("disabled");
  });
}

function goToNextQuestion() {
  if (selectedOption === null) {
    alert("Veuillez selectionner une réponse!");
    return;
  }
  currentQuestion++;

  if (currentQuestion === questions.length) {
    alert(`Quiz terminé ! Votre score est de ${score}/5`);
    return;
  }
  loadQuestion();
  optionsContainer.querySelectorAll("li").forEach((li) => {
    li.classList.remove("disabled");
  });
}

submitButton.addEventListener("click", checkAnswer);
nextButton.addEventListener("click", goToNextQuestion);
loadQuestion();
