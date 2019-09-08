class Board{
  constructor(){
    this.draw = this.draw.bind(this);
    this.provoke = this.provoke.bind(this);
    this.takeTurn = this.takeTurn.bind(this);

    this.drawDeck = new Deck(this);
    this.discardDeck = new Deck(this);
    this.babiesDeck = new Deck(this);

    this.players = [new Player('player1', this.takeTurn), new Player('player2', this.takeTurn)];
    this.currentPlayer = 0;
    this.maxActions = 4;
    this.actionsLeft = this.maxActions;

    this.cardQueue = null;

    this.domElements = {
      errorIndicator: $("#errorIndicator"),
      indicator: $("#indicator"),
    }

  }
  generateDom(){
    var drawDOM = $('<div>').addClass('draw').css("height", "100%");
    drawDOM.click(this.draw);
    var discardDOM = $("<div>").addClass("discard");
    $('#drawPile').append(drawDOM);
    $("#discardPile").append(discardDOM);
    $("#provoke").on('click', this.provoke);
    $("#actionsRemaining").text("Actions Remaining: " + this.actionsLeft);
  }
  takeTurn(actions = 1){ // if no arguments are passed, 1 action is removed from actions left
    // decrements actions left and renders the current player
    this.actionsLeft -= actions;
    if (this.actionsLeft <= 0) {
      this.actionsLeft = this.maxActions;
      if (!this.players[this.currentPlayer + 1]) {
        this.currentPlayer = 0;
      }
      else {
        this.currentPlayer++;
      }
    }
    $("#actionsRemaining").text("Actions Remaining: " + this.actionsLeft);
    this.players[this.currentPlayer].render();
    //add in highlight?
    for(var player of this.players){
      player.renderMonsters();
    }
  }
  draw(){
    if(this.drawDeck.cardsArray.length < 2){
      this.checkWin();
      return;
    }
    var provokeGenerate = Math.floor(Math.random()*12);
    if (!provokeGenerate){
      $(".baby.hidden").removeClass("hidden")
      setTimeout(this.resetGif, 900);
      this.errorIndicator('WILD PROVOKE!');
      setTimeout(this.provoke, 900);
      this.players[this.currentPlayer].render();
      return;
    }
    var cardDrawn = this.drawDeck.draw();

    this.players[this.currentPlayer].deck.placeInDeck(cardDrawn);
    this.takeTurn();
  }

  checkWin(){
    var winner = this.players[0];
    var winnerIndex = 0;
    for(var numberOfPlayers = 1; numberOfPlayers < this.players.length; numberOfPlayers++){
      if (this.players[numberOfPlayers].points > winner.points){
        winner = this.players[numberOfPlayers];
        winnerIndex = numberOfPlayers;
      }
//fix reload
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
        $(".baby.hidden").removeClass("hidden")
        setTimeout(this.resetGif, 900);
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
      armyCount += players.monsterArmy.length;
    }
    if (!armyCount){
      this.errorIndicator("The babies found no one to fight");
      $(".baby.hidden").removeClass("hidden")
      setTimeout(this.resetGif, 900);
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
      player.monsterArmy = [];
      $("#currentPlayerScore").text("Current Score: " + this.players[this.currentPlayer].points);
    }

    if (winners.length){
      var tempDomRef = this.domElements.indicator;
      tempDomRef.removeClass("hidden").text("Players " + winners.join(" and ") + " won the battle");
      setTimeout(function () { tempDomRef.addClass("hidden"); }, 1800);
    }
    else {
      var tempDomRef = this.domElements.indicator;
      tempDomRef.removeClass("hidden").text("Players " + losers.join(" and ") + " lost the battle");
      setTimeout(function () { tempDomRef.addClass("hidden"); }, 1800);
    }

    this.babiesDeck.cardsArray = []
    $("#babyCount").text(this.babiesDeck.cardsArray.length)

    this.takeTurn(this.maxActions);

    for(var i = 1; i <= this.players.length; i++){
      $('.player' + i).empty();
    }
    this.players[this.currentPlayer].render();
  }

  errorIndicator(text){
    var tempDomRef = this.domElements.errorIndicator;
    tempDomRef.removeClass("hidden").text(text);
    setTimeout(function () { tempDomRef.addClass("hidden"); }, 900);
  }

  resetGif() {
    $(".babyGif").addClass("hidden");
  }

  loadCards(images) {
    for (var i = 0; i < images.length; i++) {
      var card = null;
      var path = 'assets/images/' + images[i];
      if (images[i].includes('body')) {
        card = new Card(this.drawDeck, 'body', 1, path, null);
      }
      else if (images[i].includes('head')) {
        card = new Card(this.drawDeck, 'head', 2, path, null);
      }
      else if (images[i].includes('leftArm')) {
        card = new Card(this.drawDeck, 'leftArm', 1, path, null);
      }
      else if (images[i].includes('rightArm')) {
        card = new Card(this.drawDeck, 'rightArm', 1, path, null);
      }
      else if (images[i].includes('legs')) {
        card = new Card(this.drawDeck, 'legs', 2, path, null);
      }
      else if (images[i].includes('baby')) {
        card = new Card(this.drawDeck, 'baby', Math.floor(Math.random() * 3));
      }
      this.drawDeck.placeInDeck(card);
    }
  }

  initializePlayerDecks() {
    // for each player in the game, pass five cards out.
    for (var player of this.players) {
      for (var i = 0; i < 5; i++) {
        var handout = this.drawDeck.draw()
        player.deck.placeInDeck(handout);
      }
    }
  }
}
