class Deck{
  constructor(cardsArray, visible, placeCardsInDeck, draw){
    this.cardsArray = [];
    this.visible = visible;
  //deckPoints?
  //reorder?
  //playerOwner?
  }
  placeInDeck(cardObj){
    this.cardsArray.push(cardObj);
  }
  draw(targetDeck){
    var lastCard = this.cardsArray.pop();
    return lastCard;
  }
  shuffle(){

  }
}
