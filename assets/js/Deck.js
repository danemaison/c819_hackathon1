class Deck{
  constructor(parent, cardClickCallback){
    // The parent of the deck will either be a player or a board object
    this.cardsArray = [];
    this.cardClickCallback = cardClickCallback;
    this.parent = parent;
  }
  getLength(){
    return this.cardsArray.length;
  }
  empty(){
    this.cardsArray = [];
  }
  placeInDeck(cardObj){
    cardObj.setClickCallback(this.cardClickCallback);
    this.cardsArray.push(cardObj);
  }
  draw(){
    // Removes the last element from the deck's card array
    var lastCard = this.cardsArray.pop();
    // If the element removed is of type baby, let the user know,
    // increase the babies deck power,
    // and call draw again (until a baby is not drawn)
    $("#cardsRemaining").text("Cards Remaining: " + this.numCards());
    if (lastCard.type === "baby"){
      $("#indicator").removeClass("hidden").text("Baby Army Size + 1");
      setTimeout(function () {$("#indicator").addClass("hidden");}, 900);
      this.parent.babiesDeck.placeInDeck(lastCard);
      // in this deck find the number of cards in the cardsArray have type baby
      var babiesLeft = this.countInDeck("baby");
      $("#babiesRemaining").text("Babies Remaining: " + babiesLeft);
      $("#babyCount").text(this.parent.babiesDeck.cardsArray.length);
      return this.draw();
    }
    lastCard.deck = this.parent.players[this.parent.currentPlayer].deck;
    return lastCard;
  }
  remove(cardObj){
    for(var i = 0; i < this.numCards(); i++){
      if(this.cardsArray[i] === cardObj){
        console.log('card found')
        this.cardsArray.splice(i, 1);
        break;
      }
    }
  }
  shuffle() {
    var newArray = [];
    while (this.numCards() > 0) {
      var index = Math.floor(Math.random() * this.numCards());
      newArray.push(this.cardsArray.splice(index, 1)[0]);
    }
    this.cardsArray = newArray;
}
  calcPoints(){
    var pointTotal = 0;
    for (var i of this.cardsArray){
      pointTotal += i.points
    }
    return pointTotal;
  }

  countInDeck(type){
    var amountOfType = this.cardsArray.filter(function(card){
      return card.type === type;
    }).length;
    return amountOfType;
  }

  numCards(){
    return this.cardsArray.length;
  }
}
