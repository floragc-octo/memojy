class Logger {
  log(label, value){
    console.log(label, value)
  }
  log(label){
    console.log(label)
  }
}

class FakeLogger {
  log(label, value){
    return null
  }
  log(label){
    return null
  }
}

class Game {
  constructor(logger){
    this.selectedCards = [];
    this.foundCards = [];
    this.foundPairs = 0;
    this.guesses = 0;

    this.logger = logger
  }

  // GETTERS 
  getFoundCards() {
    return this.foundCards
  }

  getScoreGuesses() {
    return this.guesses
  }

  getScorePairs() {
    return this.foundPairs
  }

  isFoundCard(cardId) {
    return this.foundCards.includes(cardId)
  }

  isSelectingFirstCard() {
    return this.selectedCards.length == 0
  }
  isSelectingSecondCard(){
    return this.selectedCards.length == 1
  }

  // SETTERS 
  incrementFoundPairs() {
    this.logger.log('🤖 incrementing found pairs 🌟')
    this.foundPairs += 1;
  }

  incrementGuesses() {
    this.logger.log('🤖 incrementing guesses')
    this.guesses += 1;
  }

  addFoundCard(cardId){
    this.foundCards.push(cardId);
  }

  endGuess(){
    this.incrementGuesses();
    this.selectedCards = [];
  }

  makeGuess(cardId){
    this.selectedCards.push(cardId)
  }
}

class Board {
  constructor(values, gridSize, logger) {
    this.values = values;
    this.gridSize = gridSize;
    this.shuffledCards = [];

    this.logger = logger;

    this.init();
  }

  init = () => {
    this.logger.log('🤖 NEW GAME (to manage)');
    this.logger.log('🤖 ---------');
    this.logger.log('🤖 selecting cards');
    const cards = this.#randomizeValues()

    this.logger.log('🤖 shuffling cards');
    this.shuffledCards = this.shuffleCards(cards);
  };

  // GETTERS
  getcardById(id) {
    return this.shuffledCards[id]
  }

  isAPair = (firstCard, secondCard) => {
    if (firstCard !== secondCard) {
      return this.shuffledCards[firstCard] === this.shuffledCards[secondCard];
    }
  };

  // RULES
  #randomizeValues = () => {
    const cards = [];
    for (let i = 0; i < this.gridSize / 2; i++) {
      cards[i] = this.getRandomEmoji();
    }
    cards.push(...cards);
    return cards
  }

  getRandomEmoji() {
    const id = Math.floor(Math.random() * this.gridSize);
    const randomEmoji = this.values[id];
    this.values.splice(id, 1);
    return randomEmoji;
  }

  shuffleCards = (cards) => {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = cards[i];
      cards[i] = cards[j];
      cards[j] = temp;
    }
    return cards;
  };
}
