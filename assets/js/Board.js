class Board{
  constructor(){
    this.drawDeck = new Deck(this);
    this.discardDeck = new Deck(this);
    this.babiesDeck = new Deck(this);
    this.currentPlayer = 0;
    this.actionsLeft = 4;
    this.players = [new Player(this, 1), new Player(this, 1)];
    this.cardQueue = null;
    this.draw  = this.draw.bind(this)
    this.provoke = this.provoke.bind(this)
  }
  generateDom(){
    var drawDOM = $('<div>').addClass('draw').css("height", "100%");
    drawDOM.click(this.draw);
    var discardDOM = $("<div>").addClass("discard");
    // var discardDOM =
    $('#drawPile').append(drawDOM);
    $("#discardPile").append(discardDOM);
    $('#provoke').click(this.provoke);
    }

  draw(){
    if(this.drawDeck.cardsArray.length < 2){
      this.winCondition();
      return;
    }
    var cardDrawn = this.drawDeck.draw();
    if (cardDrawn.type === "baby") {
      $("#indicator").toggle("hidden").text("Baby Army Size + 1");
      setTimeout(function () { $("#indicator").toggle("hidden"); }, 500);
      this.babiesDeck.placeInDeck(cardDrawn);
      return this.draw();
    }
    else if (cardDrawn.type === "provoke") {
      $("#indicator").toggle("hidden").text("WILD PROVOKE!");
      setTimeout(function () { $("#indicator").toggle("hidden"); }, 500);
      this.discardDeck.placeInDeck(cardDrawn);
      this.actionsLeft--;
      if (this.actionsLeft <= 1) {
        if (!this.players[this.currentPlayer + 1]) {
          this.currentPlayer = 0;
        }
        else {
          this.currentPlayer++;
        }
        this.actionsLeft = 4;
        this.players[this.currentPlayer].render();
        this.players[this.currentPlayer].renderMonster();
        return;
      }
      this.players[this.currentPlayer].render();
      this.players[this.currentPlayer].renderMonster();
      return this.draw();
    }
    cardDrawn.parent = this.players[this.currentPlayer];
    this.players[this.currentPlayer].deck.placeInDeck(cardDrawn);
    this.actionsLeft--;
    this.players[this.currentPlayer].render();
    if (this.actionsLeft <= 1) {
      if (!this.players[this.currentPlayer + 1]) {
        this.currentPlayer = 0;
      }
      else {
        this.currentPlayer++;
      }
      this.actionsLeft = 4;
    }
    this.players[this.currentPlayer].render();
    this.players[this.currentPlayer].renderMonster();
    }

  winCondition(){
    var winner = this.players[0];
    var winnerIndex = 0;
    for(var numberOfPlayers = 1; numberOfPlayers < this.players.length; numberOfPlayers++){
      if (this.players[numberOfPlayers].points > winner.points){
        winner = this.players[numberOfPlayers];
        winnerIndex = numberOfPlayers;
      }
      return [winner, winnerIndex];
    }
  }

  provoke(){
    for (player in this.players){
      if (!player.army.length){
        console.log("no army");
        return false;
      }
    }
    // so click handler added to the babiesDom element. compare baby element points with
    // player Monsters.
    var babyArmyPoints = this.babiesDeck.calcPoints();
    for (var player of this.players){
      if(player.calcArmyPoints() > babyArmyPoints){
        player.points += babyArmyPoints;

      player.army = [];
    }
    this.actionsLeft = 0;
    if (this.actionsLeft <= 1) {
      if (!this.players[this.currentPlayer + 1]) {
        this.currentPlayer = 0;
      }
      else {
        this.currentPlayer++;
      }
      this.actionsLeft = 4;
    }
    for(var i = 1; i <= this.players.length; i++){
      $('.player' + i).empty();
    }

    // this.players[this.currentPlayer].renderMonster();
    // this.players[this.currentPlayer].renderMonster();
    // console.log(this)
    // so players fought and winners get baby points
    // both players lose their monsters
  }
}
}
