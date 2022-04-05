// MAGIC STRINGS
const CN_separator = " "
const CN_emoji = "emoji"
const CN_found = "found"
const CN_recto = "recto"
const CN_verso = "verso"

// QUERY SELECTORS
const QS_guessed_pairs = document.querySelector("#msg-guessed-pairs")
const QS_guesses = document.querySelector("#msg-guesses")
const QS_main = document.querySelector("#game")

// FUNCTIONS
function HideCardsNonFound() {
  const cards = document.querySelectorAll(`.${CN_emoji}`);
  [].forEach.call(cards, function (card) {
    if (!foundCards.includes(card.id)) {
      card.className = [`${CN_emoji} ${CN_recto}`];
      card.innerHTML = "";
    }
  });
}

function displayFoundPairsMessage(foundPairs) {
  QS_guessed_pairs.innerHTML = `${foundPairs}/${
    MAX_GRID_SIZE / 2
  }`;
}

function displayGuessesMessage(guesses) {
    QS_guesses.innerHTML = guesses;
}

function updateGuessedCard(id) {
  const cards = document.querySelectorAll(`.${CN_emoji}`);
  [].forEach.call(cards, function (card) {
    if (card.id == id) {
      card.className += CN_separator+CN_found;
    }
  });
}

const displayCard = (index) => {
  const isFirstSelection = selectedCards.length == 0;
  const isSecondSelection = selectedCards.length == 1;
  if (isFirstSelection) {
    HideCardsNonFound();
    index.className = [`${CN_emoji}${CN_separator}${CN_verso}`];
    index.innerHTML = shuffledCards[index.id];
    selectedCards.push(index);
  }
  if (isSecondSelection) {
    index.className = [`${CN_emoji}${CN_separator}${CN_verso}`];
    index.innerHTML = shuffledCards[index.id];
    selectedCards.push(index);
    if (isPaire()) {
      foundCards.push(selectedCards[0].id);
      updateGuessedCard(selectedCards[0].id);
      foundCards.push(selectedCards[1].id);
      updateGuessedCard(selectedCards[1].id);
      updateFoundPairs();
    }
    updateGuesses();
    selectedCards = [];
    // setTimeout(HideCardsNonFound, 1000);
  }
};

const addCardToGrid = (index) => {
  const child = document.createElement("div");
  child.className = [`${CN_emoji}${CN_separator}${CN_recto}`];
  child.id = index;
  child.addEventListener("click", function () {
    if (this.classList.contains(CN_found)) return;
    displayCard(this);
  });
  QS_main.appendChild(child);
};

document.querySelector("#btn-reset").addEventListener("click", function () {
  populateMemojy();
});

const addCardsToGrid = () => {
  for (let i = 0; i < MAX_GRID_SIZE; i++) {
    addCardToGrid(i);
  }
};
