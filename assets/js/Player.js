class Player{
  constructor(name, decrementActionsLeft){
    this.handleCardInHandClick = this.handleCardInHandClick.bind(this);
    this.name = name;
    this.deck = new Deck(this, this.handleCardInHandClick);
    this.monsterArmy = [];
    this.points = 0;
    this.decrementActions = decrementActionsLeft;

    this.domElements = {
      playerTurn: $('#currentPlayer'),
      playerScore: $('#currentPlayerScore'),
      playerHand: $('#playerHand'),
    }

  }
  addMonster(monsterObj){
    this.army.push(monsterObj);
  }
  getPlayerData(){
    return {
      id: this.id,
      points: this.points,
      cards: this.deck.cardsArray
    };
  }
  handleCardInHandClick(cardObj){
    // TODO:
    // change parent of the card  🙃
    console.log('card clicked', cardObj);
    if(cardObj.type === 'head'){
      // add Monster to players monsters
      this.addMonster(new Monster(cardObj, this));

    }
    this.render();
    this.renderMonster();
    this.decrementActionsLeft();
  }

  render(){
    // Renders the player's hand and score on the DOM
    this.domElements.playerDisplay.text(this.name + '\'s turn');
    this.domElements.playerScore.text('Current Score: ' + this.points);
    this.domElements.playerHand.empty();
    for(var i = 0; i < this.deck.cardsArray.length; i++){
      this.domElements.playerHand.append(this.deck.cardsArray[i].createDomElement());
    }
  }
  renderMonster(){
    // Renders each of the player's monsters on the DOM
    $('.player' + (this.parent.currentPlayer + 1)).empty();
    for(var i = 0; i < this.army.length; i++){
      var monsterContainer = $('<div>').addClass('monster-container');
      var monsterPoints = $('<div>').addClass("monster-score").text("Monster Power: " + this.army[i].deck.calcPoints());
      monsterContainer.append(this.army[i].headElement);
      monsterContainer.append(this.army[i].bodyElement);
      monsterContainer.append(this.army[i].leftArmElement);
      monsterContainer.append(this.army[i].rightArmElement);
      monsterContainer.append(this.army[i].legsElement);
      monsterContainer.append(monsterPoints);
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
