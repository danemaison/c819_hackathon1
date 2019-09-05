$(document).ready(initializeApp)

var images = [
  'body1.png',
  'body2.jpg',
  'body3.jpg',
  'body4.jpg',
  'body5.jpg',
  'body6.jpg',
  'body7.jpg',
  'body8.jpg',
  'body9.jpg',
  'head1.png',
  'head2.jpg',
  'head3.png',
  'head4.jpg',
  'head5.jpg',
  'head6.jpg',
  'head7.jpg',
  'head9.jpg',
  'head10.jpg',
  'head11.jpg',
  'head12.jpg',
  'leftArm1.jpg',
  'leftArm2.jpg',
  'leftArm3.jpg',
  'leftArm4.jpg',
  'rightArm1.jpg',
  'rightArm2.jpg',
  'rightArm3.jpg',
  'rightArm4.jpg',
  'legs1.png',
  'legs2.jpg',
  'legs3.jpg',
  'legs4.jpg',
  'legs5.jpg',
  'legs6.jpg',
  'legs7.jpg',
]

function loadCards(){
  for(var i = 0; i < images.length; i++){
  }
}

function initializeApp(){
  var gameBoard = new Board();
  var colors = ['red', 'green', 'blue'];
  for (var i = 0; i < 30; i++){
    var tempBaby = new Card(gameBoard.drawDeck, "baby", Math.floor(Math.random() * 3), "baby", "http://placecorgi.com/200/500", colors[Math.floor(Math.random() * 3)]);
    var tempHead = new Card(gameBoard.drawDeck, "head", 2, "head", "http://placecorgi.com/200/500", colors[Math.floor(Math.random() * 3)]);
    var tempLeg = new Card(gameBoard.drawDeck, "legs", Math.floor(Math.random() * 2) + 1, "legs", "http://placecorgi.com/200/500", "");
    var tempRight = new Card(gameBoard.drawDeck, "rightArm", 1, "rightArm", "http://placecorgi.com/200/500", "");
    var tempLeft = new Card(gameBoard.drawDeck, "leftArm", 1, "leftArm", "http://placecorgi.com/200/500", "");
    var tempBody = new Card(gameBoard.drawDeck, "body", 1, "body", "http://placecorgi.com/200/500", "");
    gameBoard.drawDeck.placeInDeck(tempBaby);
    gameBoard.drawDeck.placeInDeck(tempHead);
    gameBoard.drawDeck.placeInDeck(tempLeg);
    gameBoard.drawDeck.placeInDeck(tempRight);
    gameBoard.drawDeck.placeInDeck(tempLeft);
    gameBoard.drawDeck.placeInDeck(tempBody);
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
