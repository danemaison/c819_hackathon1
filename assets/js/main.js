$(document).ready(initializeApp)

function initializeApp(){
  var gameBoard = new Board();
  gameBoard.loadCards(cardImages);
  gameBoard.drawDeck.shuffle()
  gameBoard.initializePlayerDecks();
  gameBoard.generateDom();
  gameBoard.players[0].render();
}

function restartGame() {
  this.restartGame = this.restartGame.bind(this);
  var newgameBoard = new NewBoard();
  newgameBoard.loadCards(cardImages);
  newgameBoard.drawDeck.shuffle()
  newgameBoard.initializePlayerDecks();
  newgameBoard.generateDom();
  newgameBoard.players[0].render();
}
