class Deck{
  constructor(parent){
    this.cardsArray = [];
    this.parent = parent;
    // this.visible = false;
  }
  placeInDeck(cardObj){
    this.cardsArray.push(cardObj);
  }
  draw(){
    var lastCard = this.cardsArray.pop();
    if (lastCard.type === "baby"){
      this.parent.babiesDeck.placeInDeck(lastCard);
      return;
    }
    lastCard.deck = this.parent.players[this.parent.currentPlayer].deck;
    return lastCard;
  }
  shuffle() {
    var newArray = [];
    while (this.cardsArray.length > 0) {
      var index = Math.floor(Math.random() * this.cardsArray.length);
      newArray.push(this.cardsArray.splice(index, 1));
    }
    this.cardsArray = newArray.flat();
    console.log(this.cardsArray);
}


}
