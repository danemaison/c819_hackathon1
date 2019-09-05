class Card{
  constructor(deck, type, points, text, image){
    this.deck = deck; // deck parent...constructor?
    this.type = type;
    this.points = points;
    this.text = text;
    this.image = image;
    // this.element = red/blue/green;
    this.clickHandler = this.clickHandler.bind(this);
    this.domElement = this.createDomElement();
  }

  // creates card html element for rendering
  createDomElement() {
    var domElement = $("<div>")
    .addClass("card")
    .text(this.text)
    .css("background-image", "url(" + this.image + ")")
    .click(this.clickHandler);
    this.domElement = domElement;
    return domElement;
  }

  clickHandler(){
    // If the card clicked was a head, create a new monster
    if(this.type === 'head'){
      this.deck.parent.addMonster(new Monster(this, this.deck.parent));
      for(var i = 0; i < this.deck.cardsArray.length; i++){
        if(this === this.deck.cardsArray[i]){
          this.deck.cardsArray.splice(i, 1);
          break;
        }
      }
    }
    // If it's not a head, append it to an available monster and remove from
    // player's hand
    else{
      for(var monster of this.deck.parent.army){
        if (monster.addToMonster(this)){
          // remove from player hand
          for (var i = 0; i < this.deck.cardsArray.length; i++) {
            if (this === this.deck.cardsArray[i]) {
              this.deck.cardsArray.splice(i, 1);
            }
          }
        }
      }
    }

    this.deck.parent.parent.actionsLeft--;
    console.log('actions left: ', this.deck.parent.parent.actionsLeft);
    if (!this.deck.parent.parent.actionsLeft) {
      if (!this.deck.parent.parent.players[this.deck.parent.parent.currentPlayer + 1]) {
        this.deck.parent.parent.currentPlayer = 0;
      }
      else {
        this.deck.parent.parent.currentPlayer++;
      }
      this.deck.parent.parent.actionsLeft = 4;
    }

    console.log('currentPlayer: ', this.deck.parent.parent.currentPlayer);
    this.deck.parent.render();
    this.deck.parent.renderMonster();
  }
}
