class Card{
  constructor(deck, type, points, text, image){
    this.deck = deck; // deck parent...constructor?
    this.type = type;
    this.points = null;
    this.text = text;
    this.image = image;
    // this.element = red/blue/green;
    this.domElement = this.createDomElement();
    this.clickHandler = this.clickHandler.bind(this);
  }

  // creates card html element for rendering
  createDomElement() {
    var domElement = $("<div>")
    .addClass("card")
    .text(this.text)
    .css("background-image", "url(" + this.image + ")")
    .click(this.clickHandler);
    // console.log(domElement);
    return domElement;
  }

  clickHandler(){
    if(this.type === 'head'){
      this.deck.parent.addMonster(new Monster(this));
    }
    if(!this.deck.parent.currentCard){
      this.deck.parent.currentCard = this;
    }
  }
}
