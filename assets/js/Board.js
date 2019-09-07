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
//move bind on top of constructor

  }
  generateDom(){
//remove this? - var drawDOM = $('<div>').addClass('draw').css("height", "100%");
    drawDOM.click(this.draw);
    var discardDOM = $("<div>").addClass("discard");
    $('#drawPile').append(drawDOM);
    $("#discardPile").append(discardDOM);
    $("#provoke").on('click', this.provoke);
  }

  draw(){
    if(this.drawDeck.cardsArray.length < 2){
//why less than 2? Figure it out
      this.winCondition();
      return;
    }
    var provokeGenerate = Math.floor(Math.random()*5);
//less the 5 or put a % chance on top "wild provoke chance" and checking that if it is > or < than that
//delay do, then do
    if (!provokeGenerate){
      this.errorIndicator('WILD PROVOKE!');
      setTimeout(this.provoke, 750);
      this.players[this.currentPlayer].render();
      return;
    }
    var cardDrawn = this.drawDeck.draw();
    cardDrawn.parent = this.players[this.currentPlayer];
//should be players.addCard and then inside the player add the deck - give it to the player and they deal with it
//
    this.players[this.currentPlayer].deck.placeInDeck(cardDrawn);
    this.actionsLeft--;
    this.players[this.currentPlayer].render();
    if (this.actionsLeft <= 1) {
//max actions left for more than 2 players - not 0 - numbers of actions goes down with more players
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
//reload goes NEED TO REMOVE - do it the proper way

      $('#winner').text('Player ' + winner.name + ' won!');
      $('.modalShadow.modal.hidden').removeClass('hidden');

      return [winner, winnerIndex];
//return an object and NOT and OBJECT with winner,winner[key] so we can understand the what is in the key"
    }
  }

  provoke(event){
//pass in an event and see if it's a true or false, should end turn is = to true? click one should see if it's true
//wild provoke pass in false
//if it is not false, end the turn?
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
//no point in doing this? Whoever has maximum on top with the cal value then we can put the player who won in displayed
//take the ones with the most, see if they win, then the other loses
      }
      player.army = [];
      $("#currentPlayerScore").text("Current Score: " + this.players[this.currentPlayer].points);
    }
//a lot of selecting DOM elements when we should decrease it
    if (winners.length){
      $("#indicator").removeClass("hidden").text("Players " + winners.join(" and ") + " won the battle");
      setTimeout(function () { $("#indicator").addClass("hidden"); }, 1500);
    }
    else {

      $("#indicator").removeClass("hidden").text("Players " + losers.join(" and ") + " lost the battle");
      setTimeout(function () { $("#indicator").addClass("hidden"); }, 1500);
    }
//function for emptying cards array
//never be modifying objects in an array directly - function that need to be interfaced with
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
//something that the player should control
//create the function and not the DOM elements to empty it
      $('.player' + i).empty();
    }
    this.players[this.currentPlayer].render();
  }

  errorIndicator(text){
    $("#errorIndicator").removeClass("hidden").text(text);
    setTimeout(function () { $("#errorIndicator").addClass("hidden"); }, 750);
  }
}
