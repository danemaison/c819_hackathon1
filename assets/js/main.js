$(document).ready(initializeApp)

function initializeApp(){
  var drawPile = new Deck();
  for (var i = 0; i < 20; i++){
    var tempBaby = new Card(drawPile, "baby", Math.floor(Math.random() * 3), "baby", "http://placecorgi.com/200/500");
    var tempHead = new Card(drawPile, "head", 2, "head", "http://placecorgi.com/200/500");
    var tempLeg = new Card(drawPile, "legs", Math.floor(Math.random() * 2) + 1, "legs", "http://placecorgi.com/200/500");
    var tempRight = new Card(drawPile, "rightArm", 1, "rightArm", "http://placecorgi.com/200/500");
    var tempLeft = new Card(drawPile, "leftArm", 1, "leftArm", "http://placecorgi.com/200/500");
    var tempBody = new Card(drawPile, "body", 1, "body", "http://placecorgi.com/200/500");
    drawPile.cardArray.push(tempBaby, tempHead, tempLeg, tempRight, tempLeft, tempBody);
  }
  var gameBoard = new Board(drawPile);
  console.log(gameBoard);
}
