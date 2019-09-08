class Player{
  constructor(name, takeTurn){
    this.handleCardInHandClick = this.handleCardInHandClick.bind(this);
    this.name = name;
    this.deck = new Deck(this, this.handleCardInHandClick);
    this.monsterArmy = [];
    this.points = 0;
    this.takeTurn = takeTurn; //callback passed from board

    this.domElements = {
      turn: $('#currentPlayer'),
      score: $('#currentPlayerScore'),
      hand: $('#playerHand'),
      monsters: $('.' + this.name),
    }

  }
  addMonster(monsterObj){
    this.monsterArmy.push(monsterObj);
  }
  handleCardInHandClick(cardObj){
    // TODO:
    // remove card from deck
    // change parent of the card  🙃
    console.log('card clicked', cardObj);
    if(cardObj.type === 'head'){
      // add Monster to players monsters
      this.addMonster(new Monster(cardObj, this));
      this.deck.remove(cardObj);
      this.takeTurn();
    }
    else {
      for(var monster of this.monsterArmy){
        if(monster.addToMonster(cardObj)){
          this.deck.remove(cardObj);
          this.takeTurn();
        }
      }
      // Board.js handles calling the player render methods
    }
  }

  render(){
    // Renders the player's hand and score on the DOM
    this.domElements.turn.text(this.name + '\'s turn');
    this.domElements.score.text('Current Score: ' + this.points);
    this.domElements.hand.empty();
    for(var i = 0; i < this.deck.cardsArray.length; i++){
      this.domElements.hand.append(this.deck.cardsArray[i].createDomElement());
    }
  }
  renderMonsters(){
    // Renders each of the player's monsters on the DOM
    this.domElements.monsters.empty();
    for(var i = 0; i < this.monsterArmy.length; i++){
      var monsterContainer = this.monsterArmy[i].createMonsterDom();
      this.domElements.monsters.append(monsterContainer);
    }
    // $(".row.player-titles > h3:nth-child(1)").text("Player One's Army: " + this.parent.players[0].calcArmyPoints());
    // $(".row.player-titles > h3:nth-child(2)").text("Player Two's Army: " + this.parent.players[1].calcArmyPoints());
  }
  calcArmyPoints(){
    var tempPoints = 0;
    for (var monster of this.monsterArmy){
      tempPoints += monster.deck.calcPoints();
    }
    return tempPoints;
  }
}
