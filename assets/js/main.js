$(document).ready(initializeApp)

function initializeApp(){
  var cardArray = [];
  for (var i = 0; i < 20; i++){
    var tempBaby = new Card("baby", Math.floor(Math.random() * 3), "baby", "http://placecorgi.com/200/500");
    var tempHead = new Card("head", 2, "head", "http://placecorgi.com/200/500");
    var tempLeg = new Card("legs", Math.floor(Math.random() * 2) + 1, "legs", "http://placecorgi.com/200/500");
    var tempRight = new Card("rightArm", 1, "rightArm", "http://placecorgi.com/200/500");
    var tempLeft = new Card("leftArm", 1, "leftArm", "http://placecorgi.com/200/500");
    var tempBody = new Card("body", 1, "body", "http://placecorgi.com/200/500");
    cardArray.push(tempBaby, tempHead, tempLeg, tempRight, tempLeft, tempBody);
  }
  console.log(cardArray);
}
