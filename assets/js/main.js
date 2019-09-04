$(document).ready(initializeApp)

function initializeApp(){
  var gameBoard = new Board();
  for (var i = 0; i < 30; i++){
    var tempBaby = new Card(gameBoard.drawDeck, "baby", Math.floor(Math.random() * 3), "baby", "http://placecorgi.com/200/500");
    var tempHead = new Card(gameBoard.drawDeck, "head", 2, "head", "http://placecorgi.com/200/500");
    var tempLeg = new Card(gameBoard.drawDeck, "legs", Math.floor(Math.random() * 2) + 1, "legs", "http://placecorgi.com/200/500");
    var tempRight = new Card(gameBoard.drawDeck, "rightArm", 1, "rightArm", "http://placecorgi.com/200/500");
    var tempLeft = new Card(gameBoard.drawDeck, "leftArm", 1, "leftArm", "http://placecorgi.com/200/500");
    var tempBody = new Card(gameBoard.drawDeck, "body", 1, "body", "http://placecorgi.com/200/500");
    gameBoard.drawDeck.placeInDeck(tempBaby);
    gameBoard.drawDeck.placeInDeck(tempHead);
    gameBoard.drawDeck.placeInDeck(tempLeg);
    gameBoard.drawDeck.placeInDeck(tempRight);
    gameBoard.drawDeck.placeInDeck(tempLeft);
    gameBoard.drawDeck.placeInDeck(tempBody);
  }
  // randomize deck
  // gameBoard.drawDeck.shuffle();
  gameBoard.drawDeck.shuffle();

  // for each player in the game, pass five cards out.
  for (var player of gameBoard.players){
    for (var i = 0; i < 5; i++){
      player.deck.placeInDeck(gameBoard.drawDeck.draw());
    }
  }

  // gameBoard.startGame(); // go to player one, set actions remaining to 3
  gameBoard.generateDom();
  gameBoard.players[0].render();
  // while(!gameBoard.gameOver()){
  //   gameBoard.takeTurn();
  // }
  // begin the game...board ne
  console.log(gameBoard);
  // console.log(player)
  // player.render();
}
