class Card{
  constructor(deck, type, points, image, color){
    this.clickCallback = null;
    this.deck = deck;
    this.type = type;
    this.points = points;
    this.image = image;
    this.color = color;
    this.clickHandler = this.clickHandler.bind(this);
    this.domElement = this.createDomElement();
  }

  // creates card html element for rendering
  createDomElement() {
    var domElement = $("<div>")
      .addClass("card")
      .css("background-image", "url(" + this.image + ")")
      .click(this.clickHandler);

    this.domElement = domElement;
    return domElement;
  }
  setClickCallback(callback){
    this.clickCallback = callback;
  }

  clickHandler(){
    debugger;
    this.clickCallback(this);
    var currentPlayer = this.deck.parent.parent.players[this.deck.parent.parent.currentPlayer];
    // If the card clicked was a head, create a new monster
    if(this.type === 'head'){
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
      if (!this.deck.parent.parent.players[this.deck.parent.parent.currentPlayer + 1]) {
        this.deck.parent.parent.currentPlayer = 0;
      }
      else {
        this.deck.parent.parent.currentPlayer++;
      }
      this.deck.parent.parent.actionsLeft = 4;
    }
    this.deck.parent.parent.players[this.deck.parent.parent.currentPlayer].render();
    this.deck.parent.parent.players[this.deck.parent.parent.currentPlayer].renderMonster();
  }
}
