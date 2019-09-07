class Deck{
  constructor(parent, cardClickCallback){
    // The parent of the deck will either be a player or a board object
    this.cardsArray = [];
    this.cardClickCallback = cardClickCallback;
    this.parent = parent;
  }
  placeInDeck(cardObj){
    if(!this.parent.test){
      debugger;
    }

    cardObj.setClickCallback(this.cardClickCallback);
    this.cardsArray.push(cardObj);
  }
  draw(){
    // Removes the last element from the deck's card array
    var lastCard = this.cardsArray.pop();
    // If the element removed is of type baby, let the user know,
    // increase the babies deck power,
    // and call draw again (until a baby is not drawn)
    if (lastCard.type === "baby"){
      $("#indicator").removeClass("hidden").text("Baby Army Size + 1");
      setTimeout(function () {$("#indicator").addClass("hidden");}, 300);
      this.parent.babiesDeck.placeInDeck(lastCard);
      $("#babyCount").text(this.parent.babiesDeck.cardsArray.length)
      return this.draw();
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
  }
  calcPoints(){
    var pointTotal = 0;
    for (var i of this.cardsArray){
      pointTotal += i.points
    }
    return pointTotal;
  }


}
