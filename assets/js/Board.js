class Board{
  constructor(){
    this.draw = this.draw.bind(this);
    this.provoke = this.provoke.bind(this);
    this.decrementActions = this.decrementActions.bind(this);
    this.test = true;
    this.drawDeck = new Deck(this);
    this.discardDeck = new Deck(this);
    this.babiesDeck = new Deck(this);
    this.currentPlayer = 0;
    this.actionsLeft = 4;
    this.players = [new Player('player1', this.decrementActionsLeft), new Player('player2', this.decrementActionsLeft)];
    this.cardQueue = null;

  }
  generateDom(){
    var drawDOM = $('<div>').addClass('draw').css("height", "100%");
    drawDOM.click(this.draw);
    var discardDOM = $("<div>").addClass("discard");
    $('#drawPile').append(drawDOM);
    $("#discardPile").append(discardDOM);
    $("#provoke").on('click', this.provoke);
  }
  decrementActionsLeft(){
    this.actionsLeft--;
  }
  draw(){
    if(this.drawDeck.cardsArray.length < 2){
      this.winCondition();
      return;
    }
    var provokeGenerate = Math.floor(Math.random()*5);
    if (!provokeGenerate){
      this.errorIndicator('WILD PROVOKE!');
      setTimeout(this.provoke, 750);
      this.players[this.currentPlayer].render();
      return;
    }
    var cardDrawn = this.drawDeck.draw();
    cardDrawn.parent = this.players[this.currentPlayer];
    this.players[this.currentPlayer].deck.placeInDeck(cardDrawn);
    this.decrementActionsLeft();
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

      $(".modalShadow.modal.hidden").removeClass("hidden");
      $(".modalClose").on("click", function () {
        window.location.reload();
      });

      $('#winner').text('Player ' + winner.name + ' won!');
      $('.modalShadow.modal.hidden').removeClass('hidden');

      return [winner, winnerIndex];
    }
  }

  provoke(event){
    if (event){
      if (this.actionsLeft != 4){
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
      return false;
    }
    var winners = [];
    var losers = [];
    for (var player of this.players){
      if(player.calcArmyPoints() > babyArmyPoints){
        player.points += babyArmyPoints;
        winners.push(player.name);
      }
      else{
        losers.push(player.name)
      }
      player.army = [];
      $("#currentPlayerScore").text("Current Score: " + this.players[this.currentPlayer].points);
    }

    if (winners.length){
      $("#indicator").removeClass("hidden").text("Players " + winners.join(" and ") + " won the battle");
      setTimeout(function () { $("#indicator").addClass("hidden"); }, 1500);
    }
    else {

      $("#indicator").removeClass("hidden").text("Players " + losers.join(" and ") + " lost the battle");
      setTimeout(function () { $("#indicator").addClass("hidden"); }, 1500);
    }

    this.babiesDeck.cardsArray = []
    $("#babyCount").text(this.babiesDeck.cardsArray.length)
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
    this.players[this.currentPlayer].render();
  }

  errorIndicator(text){
    $("#errorIndicator").removeClass("hidden").text(text);
    setTimeout(function () { $("#errorIndicator").addClass("hidden"); }, 750);
  }
}
