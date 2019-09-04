class Board{
  constructor(){
    this.drawDeck = new Deck(this);
    this.discardDeck = new Deck(this);
    this.babiesDeck = new Deck(this);
    this.currentPlayer = 0;
    this.actionsLeft = 4;
    this.players = [new Player(), new Player()];
    this.cardQueue = null;
  }
  generateDom(){
    // var discardDOM = $('<div>').class('cardBack');
    // discardDOM.click(this.discard);
    // $('#discardPile').append(discardDOM);

    var drawDOM = $('<div>').class('cardBack');
    drawDOM.click(this.draw);
    $('#drawPile').append(drawDOM);
  }
  discard(){
//
  }
  draw(){
    var cardDrawn = this.drawDeck.draw();
    this.players[this.currentPlayer].deck.placeInDeck(cardDrawn);
    this.actionsLeft--;
    this.players[this.currentPlayer].render();
  }

  takeTurn(){
      this.player[this.currentPlayer].render();
      if(this.actionsLeft){
        this.player[this.currentPlayer].takeTurn();
      }
      else{
        if(this.player[this.currentPlayer + 1] === undefined){
          this.currentPlayer = 0;
        }
        else{
          this.currentPlayer++;
        }
        this.actionsLeft = 4;
      }
  }
  gameOver(){
    if(this.drawDeck.cardsArray.length){
      return false;
    }
    else{
      return true;
    }
  }

}
