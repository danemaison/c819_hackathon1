$(document).ready(initializeApp)

function initializeApp(){
  var gameBoard = new Board();
  gameBoard.drawDeck.shuffle()
  gameBoard.loadCards(cardImages);
  gameBoard.initializePlayerDecks();
  gameBoard.generateDom();
  gameBoard.players[0].render();
}
