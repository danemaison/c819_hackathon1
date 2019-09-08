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
      // mosterContainer: $('.' + this.name.match(/[a-zA-Z]+|[0-9]+/g)[0] + "-" + this.name.match(/[a-zA-Z]+|[0-9]+/g)[1]),
      outcome: $('.outcome'),
      monsters: $('.' + this.name),
    }

  }
  addMonster(monsterObj){
    this.monsterArmy.push(monsterObj);
  }
  handleCardInHandClick(cardObj){
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
          break;
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
  }

  calcArmyPoints(){
    var tempPoints = 0;
    for (var monster of this.monsterArmy){
      tempPoints += monster.deck.calcPoints();
    }
    return tempPoints;
  }
}
