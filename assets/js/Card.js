class Card{
  constructor(deck, type, points, image, color){
    this.clickHandler = this.clickHandler.bind(this);
    this.clickCallback = null;
    this.deck = deck;
    this.type = type;
    this.points = points;
    this.image = image;
    this.color = color;
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
    this.clickCallback(this);
  }
}
