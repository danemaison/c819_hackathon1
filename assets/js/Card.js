class Card{
  constructor(deck, type, points, image, color){
//property added this.clickCallBack = null;
//make a method that sets it, and pass it a parameter = to it

    this.deck = deck;
    this.type = type;
    this.points = points;
    this.image = image;
    this.color = color;
    this.clickHandler = this.clickHandler.bind(this);
    this.domElement = this.createDomElement();
  }

  // creates card html element for rendering
//indent at leats 1 more to make it seem like it is a part of it
  createDomElement() {
    var domElement = $("<div>")
    .addClass("card")
    .css("background-image", "url(" + this.image + ")")
    .click(this.clickHandler);
//this.domeElement = createDOMElement()
    this.domElement = domElement;
    return domElement;
  }

  clickHandler(){
//ADD : this.clickCallBAck(this)
//callback instead bc it doesn't need to know
//card would belong to where it belongs to
//when you are clicked, call this function and do the stuff
//this logic shouldn't be left to the card but the Board.js
//how to change current player? you wouldn't you would pass a callback that would hanlde all this logi
//checking if it is the head and subtracting actions inside the card = so instead
//
    var currentPlayer = this.deck.parent.parent.players[this.deck.parent.parent.currentPlayer];
    // If the card clicked was a head, create a new monster
    if(this.type === 'head')
      this.deck.parent.parent.actionsLeft--;
      var tempMonster = new Monster(this, currentPlayer);
      tempMonster.deck.placeInDeck(this); // puts selected card element into monsters deck property
      currentPlayer.addMonster(tempMonster); // this puts the mosnter into the players army array
      for(var i = 0; i < currentPlayer.deck.cardsArray.length; i++){
        if(this === currentPlayer.deck.cardsArray[i]){
          currentPlayer.deck.cardsArray.splice(i, 1);
          break;
        }
      }
    }
    // If it's not a head, append it to an available monster and remove from
    // player's hand
    else{
      for(var monster of currentPlayer.army){
        if (monster.addToMonster(this)){
          // remove from player hand
          for (var i = 0; i < currentPlayer.deck.cardsArray.length; i++) {
            if (this === currentPlayer.deck.cardsArray[i]) {
              currentPlayer.deck.cardsArray.splice(i, 1);
              this.deck.parent.parent.actionsLeft--;
            }
          }
          break;
        }
      }
    }
    currentPlayer.render();
    currentPlayer.renderMonster();
    if (this.deck.parent.parent.actionsLeft <= 1) {
//update - say next player and then go through the player
      if (!this.deck.parent.parent.players[this.deck.parent.parent.currentPlayer + 1]) {
        this.deck.parent.parent.currentPlayer = 0;
      }
      else {
        this.deck.parent.parent.currentPlayer++;
      }
//update this action to 4
      this.deck.parent.parent.actionsLeft = 4;
    }
//and we are changing it again? need to update
//
    this.deck.parent.parent.players[this.deck.parent.parent.currentPlayer].render();
    this.deck.parent.parent.players[this.deck.parent.parent.currentPlayer].renderMonster();
  }
}
