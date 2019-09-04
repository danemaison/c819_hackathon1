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
    return domElement;
  }

  clickHandler(){
    console.log(this);
    debugger;
    if(this.type === 'head'){
      // console.log(this)
      this.deck.parent.addMonster(new Monster(this, this.deck.parent));
      this.deck.parent.renderMonster();
    }
    if(!this.deck.parent.currentCard){
      this.deck.parent.currentCard = this;
    }
  }
}
