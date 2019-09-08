$(document).ready(initializeApp)

function initializeApp(){
  var gameBoard = new Board();
  gameBoard.loadCards(cardImages);
  gameBoard.drawDeck.shuffle()
  gameBoard.initializePlayerDecks();
  gameBoard.generateDom();
  gameBoard.players[0].render();
}
