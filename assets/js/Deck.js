class Deck{
//add the cardClickCallback from the Players
//and then reassign it

  constructor(parent){
    // The parent of the deck will either be a player or a board object
    this.cardsArray = [];
    this.parent = parent;
  }
//put it in the player so the player can add it to their own deck
//card.Obj.setClickCallBack(this.cardClickCallback);
  placeInDeck(cardObj){
    this.cardsArray.push(cardObj);
  }

  draw(){
    // Removes the last element from the deck's card array
    var lastCard = this.cardsArray.pop();
//last.card.gettype?
    // If the element removed is of type baby, let the user know,
    // increase the babies deck power,
    // and call draw again (until a baby is not drawn)
    if (lastCard.type === "baby"){
//indicator should have been a fucntion instead of putting it everywhere
      $("#indicator").removeClass("hidden").text("Baby Army Size + 1");
//timeout is also everywhere and should put it in a global function - in the display too for the viwer or add it into an object
//put the set time in a que
//function that add in event handlers instead of changing the Parent
      setTimeout(function () {$("#indicator").addClass("hidden");}, 300);
      this.parent.babiesDeck.placeInDeck(lastCard);
      $("#babyCount").text(this.parent.babiesDeck.cardsArray.length)
      return this.draw();
    }
//pass in a function instead of just "placeinDeck"?
//need to check if the deck emptying? HK says it's in Board.js
    lastCard.deck = this.parent.players[this.parent.currentPlayer].deck;
    return lastCard;
  }
  shuffle() {
    var newArray = [];
    while (this.cardsArray.length > 0) {
      var index = Math.floor(Math.random() * this.cardsArray.length);
      newArray.push(this.cardsArray.splice(index, 1));
    }
//get to root cause instead of using Flat()
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
