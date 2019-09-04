class Board{
  constructor(drawDeck){
    this.drawDeck = drawDeck;
    this.discardDeck = new Deck();
    this.babiesDeck = new Deck();
    this.currentPlayer = null;
    this.players = [new Player(), new Player(), new Player(), new Player()];
  }

}
