$(document).ready(initializeApp)

var images = [
  'body1.png',
  'body2.jpg',
  'body3.jpg',
  'body4.jpg',
  'body5.jpg',
  'body6.jpg',
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
  'baby',
  'baby',
  'baby',
  'baby',
  'baby',
  'baby',
  'baby',
  'baby',
  'baby',
  'baby',
  'baby',
  'baby',
  'baby',
  'baby',
  'baby',
  'baby',
  'baby',
  'baby',
]

var gameBoard = new Board();

function loadCards(){
  for(var i = 0; i < images.length; i++){
    var card = null;
    var path = 'assets/images/' + images[i];
    if(images[i].includes('body')){
      card = new Card(gameBoard.drawDeck, 'body', 1, path, null);
    }
    else if(images[i].includes('head')){
      card = new Card(gameBoard.drawDeck, 'head', 2, path, null);
    }
    else if (images[i].includes('leftArm')) {
      card = new Card(gameBoard.drawDeck, 'leftArm', 1, path, null);
    }
    else if (images[i].includes('rightArm')) {
      card = new Card(gameBoard.drawDeck, 'rightArm', 1, path, null);
    }
    else if (images[i].includes('legs')) {
      card = new Card(gameBoard.drawDeck, 'legs', 2, path, null);
    }
    else if (images[i].includes('baby')) {
      card = new Card(gameBoard.drawDeck, 'baby', Math.floor(Math.random() * 3));
    }
    gameBoard.drawDeck.placeInDeck(card);
  }
}

function initializePlayerDecks(){
  // for each player in the game, pass five cards out.
  for (var player of gameBoard.players) {
    for (var i = 0; i < 5; i++) {
      var handout = gameBoard.drawDeck.draw()
      player.deck.placeInDeck(handout);
    }
  }
}

function initializeApp(){
  loadCards();
  gameBoard.drawDeck.shuffle()
  initializePlayerDecks();
  gameBoard.generateDom();
  gameBoard.players[0].render();
}
