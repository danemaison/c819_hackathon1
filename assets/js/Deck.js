class Deck{
  constructor(player){
    this.cardsArray = [];
    this.parent = player;
    // this.visible = false;
  }
  placeInDeck(cardObj){
    this.cardsArray.push(cardObj);
  }
  draw(){
    var lastCard = this.cardsArray.pop();
    return lastCard;
  }
  shuffle(){
    for(var currentIndex = this.cardsArray.length - 1; currentIndex > 0; currentIndex--){
      var randomIndex = Math.floor(Math.random() * currentIndex);
      var temp = this.cardsArray[currentIndex];
      this.cardsArray[currentIndex] = this.cardsArray[randomIndex];
      this.cardsArray[randomIndex] = temp;
    }
  }
}
