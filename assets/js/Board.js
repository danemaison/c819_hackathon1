class Board{
  constructor(){
    this.drawDeck = new Deck(this);
    this.discardDeck = new Deck(this);
    this.babiesDeck = new Deck(this);
    this.currentPlayer = 0;
    this.actionsLeft = 4;
    this.players = [new Player(this, 1), new Player(this, 2)];
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
    $("#provoke").on('click', this.provoke);
  }

  draw(){
    if(this.drawDeck.cardsArray.length < 2){
      this.winCondition();
      return;
    }
    //
    var provokeGenerate = Math.floor(Math.random()*15);
    if (!provokeGenerate){
      console.log("you just drew a provoke")
      this.provoke();
      this.players[this.currentPlayer].render();
      return;
    }
    var cardDrawn = this.drawDeck.draw();
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

  provoke(event){
    if (event){
      if (this.actionsLeft != 4){
        // console.log("you cannot provoke after you made a turn")
        this.errorIndicator("You must provoke on your first turn");
        return;
      }
    }
    var babyArmyPoints = this.babiesDeck.calcPoints();
    if (!this.babiesDeck.cardsArray.length){
      this.errorIndicator("There are no babies to fight...");
      return;
    }
    var armyCount = 0;
    for (var players of this.players){
      armyCount += players.army.length;
    }
    if (!armyCount){
      this.errorIndicator("The babies found no one to fight");
      this.babiesDeck.cardsArray = []
      return false;
    }

    for (var player of this.players){
      if(player.calcArmyPoints() > babyArmyPoints){
        player.points += babyArmyPoints;
        $("#indicator").removeClass("hidden").text("Player " + player.name + " gained " + babyArmyPoints + " points.");
        setTimeout(function () { $("#indicator").addClass("hidden"); }, 500);
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
  }
}
  errorIndicator(text){
    $("#errorIndicator").removeClass("hidden").text(text);
    setTimeout(function () { $("#errorIndicator").addClass("hidden"); }, 750);
  }
}
