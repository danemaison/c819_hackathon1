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
      $("#indicator").toggle("hidden").text("Baby Army Size + 1");
      setTimeout(function () {$("#indicator").toggle("hidden");}, 500);
      this.parent.babiesDeck.placeInDeck(lastCard);
      return this.draw();
    }
    else if (lastCard.type === "provoke") {
      $("#indicator").toggle("hidden").text("WILD PROVOKE!");
      setTimeout(function () { $("#indicator").toggle("hidden"); }, 500);
      this.parent.discardDeck.placeInDeck(lastCard);
      this.parent.actionsLeft--;
      if (this.parent.actionsLeft <= 1) {
        if (!this.parent.players[this.parent.currentPlayer + 1]) {
          this.parent.currentPlayer = 0;
        }
        else {
          this.parent.currentPlayer++;
        }
        this.parent.actionsLeft = 4;
      }
      this.players[this.currentPlayer].render();
      this.players[this.currentPlayer].renderMonster();
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
    console.log(this.cardsArray);
}
  calcPoints(){
    var pointTotal = 0;
    for (var i of this.cardsArray){
      pointTotal += i.points
    }
    return pointTotal;
  }


}
