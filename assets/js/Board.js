class Board{
  constructor(){
    this.drawDeck = new Deck(this);
    this.discardDeck = new Deck(this);
    this.babiesDeck = new Deck(this);
    this.currentPlayer = null;
    this.players = [new Player(), new Player(), new Player(), new Player()];
  }

}
