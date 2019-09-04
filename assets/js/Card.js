class Card{
  constructor(type, points, text, image){
    this.deck = null; // deck parent...constructor?
    this.type = type;
    this.points = null;
    this.text = cardText;
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
    return this;
  }
}
