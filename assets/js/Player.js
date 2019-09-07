class Player{
  constructor(parent, name){
    this.deck = new Deck(this);
    this.army = [];
    this.points = 0;
    this.parent = parent;
    this.name = name;
  }
  addMonster(monsterObj){
    this.army.push(monsterObj);
  }
  render(){
    // Renders the player's hand and score on the DOM
    $('#currentPlayer').text('Player ' + (this.parent.currentPlayer + 1) + '\'s turn');
    $('#currentPlayerScore').text('Current Score: ' + this.points);
    $('#playerHand').empty();
    for(var i = 0; i < this.deck.cardsArray.length; i++){
      $('#playerHand').append(this.deck.cardsArray[i].createDomElement());
    }
  }
  renderMonster(){
    // Renders each of the player's monsters on the DOM
    $('.player' + (this.parent.currentPlayer + 1)).empty();
    for(var i = 0; i < this.army.length; i++){
      var monsterContainer = this.army[i].createMonsterDom();
      $('.player' + (this.parent.currentPlayer+1) ).append(monsterContainer);
    }
    $(".row.player-titles > h3:nth-child(1)").text("Player One's Army: " + this.parent.players[0].calcArmyPoints());
    $(".row.player-titles > h3:nth-child(2)").text("Player Two's Army: " + this.parent.players[1].calcArmyPoints());
  }
  calcArmyPoints(){
    var tempPoints = 0;
    for (var monster of this.army){
      tempPoints += monster.deck.calcPoints();
    }
    return tempPoints;
  }
}
