// MAGIC STRINGS
const CLASSNAME_emoji = "emoji";
const CLASSNAME_found = "found";
const CLASSNAME_recto = "recto";
const CLASSNAME_verso = "verso";
const DISABLED = "disabled";
const ENTER_SELECTION = "Enter";

// QUERY SELECTORS
const QS_guessed_pairs = document.querySelector("#msg-guessed-pairs");
const QS_guesses = document.querySelector("#msg-guesses");
const QS_main = document.querySelector("#game");

// FUNCTIONS
function disableAllCards() {
  document.querySelectorAll(`.${CLASSNAME_emoji}`).forEach(function (card) {
    if (!game.isFoundCard(card.id)) {
      card.classList.add(DISABLED);
    }
  });
}

function hideCardsNonFound() {
  document.querySelectorAll(`.${CLASSNAME_emoji}`).forEach(function (card) {
    if (!game.isFoundCard(card.id)) {
      card.className = [`${CLASSNAME_emoji} ${CLASSNAME_recto}`];
      card.innerHTML = "";
    }
  });
}

function displayFoundPairsMessage() {
  QS_guessed_pairs.innerHTML = game.getScorePairs();
}

function displayGuessesMessage() {
  QS_guesses.innerHTML = game.getScoreGuesses();
}

function updateGuessedCard(id) {
  const cards = document.querySelectorAll(`.${CLASSNAME_emoji}`);
  [].forEach.call(cards, function (card) {
    if (card.id == id) {
      card.className += " " + CLASSNAME_found;
      game.addFoundCard(card.id);
    }
  });
}
// @TODO: display should not trigger verification
// it should be //
const displayCard = async (card) => {
  if (game.isSelectingFirstCard()) {
    hideCardsNonFound();
    card.className = [`${CLASSNAME_emoji} ${CLASSNAME_verso}`];
    card.innerHTML = board.getcardById(card.id);
    game.makeGuess(card.id);
  } else {
    if (game.isSelectingSecondCard()) {
      if (game.selectedCards[0].id !== card.id) {
        card.className = [`${CLASSNAME_emoji} ${CLASSNAME_verso}`];
        card.innerHTML = board.getcardById(card.id);
        game.makeGuess(card.id);

        if (board.isAPair(game.selectedCards[0], game.selectedCards[1])) {
          updateGuessedCard(game.selectedCards[0]);
          updateGuessedCard(game.selectedCards[1]);
          game.incrementFoundPairs();

          displayFoundPairsMessage(game.getScorePairs());
        }

        game.endGuess();

        displayGuessesMessage(game.getScoreGuesses());
        disableAllCards();
        await setTimeout(hideCardsNonFound, 500);
      }
    }
  }
};

const emptyGrid = () => (QS_main.innerHTML = "");

const addCardToGrid = (index) => {
  const child = document.createElement("button");
  child.className = [`${CLASSNAME_emoji} ${CLASSNAME_recto}`];
  child.id = index;
  child.tabIndex = 0;
  child.addEventListener("click", function () {
    if (
      this.classList.contains(CLASSNAME_found) ||
      this.classList.contains(DISABLED)
    )
      return;
    displayCard(this);
  });
  child.addEventListener("keydown", function (e) {
    if (ENTER_SELECTION === e.key) {
      if (
        this.classList.contains(CLASSNAME_found) ||
        this.classList.contains(DISABLED)
      )
        return;
      displayCard(this);
    }
  });
  QS_main.appendChild(child);
};

document.querySelector("#btn-reset").addEventListener("click", function () {
  startNewGame();
  displayBoard();
});

document.querySelector("#btn-reset").addEventListener("keydown", function (e) {
  if (ENTER_SELECTION === e.key) {
    startNewGame();
    displayBoard();
  }
});

const addCardsToGrid = () => {
  for (let i = 0; i < board.gridSize; i++) {
    addCardToGrid(i);
  }
};

const displayBoard = () => {
  emptyGrid();

  displayFoundPairsMessage(0);
  displayGuessesMessage(0);

  addCardsToGrid();
};
