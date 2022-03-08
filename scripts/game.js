let shuffledCards = [];
let selectedCards = [];
let foundCards = [];
let foundPairs = 0;
let guesses = 0;

const isPaire = () => shuffledCards[selectedCards[0].id] === shuffledCards[selectedCards[1].id]

function getRandomEmoji() {
  const id = Math.floor(Math.random() * MAX_GRID_SIZE);
  const randomEmoji = DIFFERENT_VALUES[id];
  DIFFERENT_VALUES.splice(id, 1);
  return randomEmoji;
}

const shuffleCards = (cards) => {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = cards[i];
    cards[i] = cards[j];
    cards[j] = temp;
  }
  return cards;
};

function updateFoundPairs() {
  foundPairs += 1;
  displayFoundPairsMessage(foundPairs)
}

function updateGuesses(){
  guesses +=1;
  displayGuessesMessage(guesses);
};

const populateMemojy = () => {
  QS_main.innerHTML = "";
  const cards = [];
  for (let i = 0; i < MAX_GRID_SIZE / 2; i++) {
    cards[i] = getRandomEmoji();
  }
  cards.push(...cards);
  shuffledCards = shuffleCards(cards);
  addCardsToGrid();
};

populateMemojy();

