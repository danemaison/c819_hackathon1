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
    // console.log(domElement);
    this.domElement = domElement;
    return domElement;
  }

  clickHandler(){
    console.log(this);
    if(this.type === 'head'){
      // console.log(this)
      this.deck.parent.addMonster(new Monster(this, this.deck.parent));
      for(var i = 0; i < this.deck.cardsArray.length; i++){
        if(this === this.deck.cardsArray[i]){
          this.deck.cardsArray.splice(i, 1);
          console.log("card found");
        }
      }
      this.deck.parent.parent.actionsLeft--;
      this.deck.parent.render();
      this.deck.parent.renderMonster();
    }
    // if(!this.deck.parent.parent.currentCard){
    //   this.deck.parent.parent.currentCard = this;
    // }
    else{
      // so if its not a head then it is a body part that they want to add
      for(var monster of this.deck.parent.army){
        if (monster.addToMonster(this)){
          for (var i = 0; i < this.deck.cardsArray.length; i++) {
            if (this === this.deck.cardsArray[i]) {
              this.deck.cardsArray.splice(i, 1);
              console.log("card found");
            }
          }
          this.deck.parent.render();
          this.deck.parent.renderMonster();
          this.deck.parent.parent.actionsLeft--;
          return true;
        }
      }
    }
  }

  // nonHeadHandler
}
