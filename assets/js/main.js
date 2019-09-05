$(document).ready(initializeApp)

function initializeApp(){
  var gameBoard = new Board();
  var colors = ['red', 'green', 'blue'];
  for (var i = 0; i < 20; i++){
    // babies and heads are given colors
    var tempBaby = new Card(gameBoard.drawDeck, "baby", Math.floor(Math.random() * 3), "baby", "http://placecorgi.com/200/500", colors[Math.floor(Math.random() * 3)]);
    var tempHead = new Card(gameBoard.drawDeck, "head", 2, "head", "http://placecorgi.com/200/500", colors[Math.floor(Math.random() * 3)]);
    var tempLeg = new Card(gameBoard.drawDeck, "legs", Math.floor(Math.random() * 2) + 1, "legs", "http://placecorgi.com/200/500", "");
    var tempRight = new Card(gameBoard.drawDeck, "rightArm", 1, "rightArm", "http://placecorgi.com/200/500", "");
    var tempLeft = new Card(gameBoard.drawDeck, "leftArm", 1, "leftArm", "http://placecorgi.com/200/500", "");
    var tempBody = new Card(gameBoard.drawDeck, "body", 1, "body", "http://placecorgi.com/200/500", "")
    var tempProvoke = new Card(gameBoard.drawDeck, "provoke", 0, "provoke", "http://placecorgi.com/200/500", "");
    gameBoard.drawDeck.placeInDeck(tempBaby);
    gameBoard.drawDeck.placeInDeck(tempHead);
    gameBoard.drawDeck.placeInDeck(tempLeg);
    gameBoard.drawDeck.placeInDeck(tempRight);
    gameBoard.drawDeck.placeInDeck(tempLeft);
    gameBoard.drawDeck.placeInDeck(tempBody);
    gameBoard.drawDeck.placeInDeck(tempProvoke);
  }
  // randomize deck
  // gameBoard.drawDeck.shuffle();
  gameBoard.drawDeck.shuffle()

  // for each player in the game, pass five cards out.
  for (var player of gameBoard.players){
    for (var i = 0; i < 5; i++){
      var handout = gameBoard.drawDeck.draw()
      player.deck.placeInDeck(handout);
    }
  }

  // gameBoard.startGame(); // go to player one, set actions remaining to 3
  gameBoard.generateDom();
  gameBoard.players[0].render();
  // while(!gameBoard.gameOver()){
  //   gameBoard.takeTurn();
  // }
  // begin the game...board ne
  // console.log(player)
  // player.render();
}
