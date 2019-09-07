class Player{
  constructor(name, decrementActionsLeft){
    this.handleCardInHandClick = this.handleCardInHandClick.bind(this);
    this.name = name;
    this.deck = new Deck(this, this.handleCardInHandClick);
    this.monsterArmy = [];
    this.points = 0;
    this.decrementActionsLeft = decrementActionsLeft; //callback passed from board

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
  getPlayerData(){
    return {
      id: this.id,
      points: this.points,
      cards: this.deck.cardsArray
    };
  }
  handleCardInHandClick(cardObj){
    // TODO:
    // remove card from deck
    // change parent of the card  🙃
    console.log('card clicked', cardObj);
    if(cardObj.type === 'head'){
      // add Monster to players monsters
      this.addMonster(new Monster(cardObj, this));
    }
    else{
      for(var monster of this.monsterArmy){
        console.log(monster);
      }
    }
    this.render();
    this.renderMonster();
    this.decrementActionsLeft();


    /* LOGIC FROM BEFORE REFACTOR */
    /*
    // If the card clicked was a head, create a new monster
    if (this.type === 'head') {
      this.deck.parent.parent.actionsLeft--;
      var tempMonster = new Monster(this, currentPlayer);
      tempMonster.deck.placeInDeck(this); // puts selected card element into monsters deck property
      currentPlayer.addMonster(tempMonster); // this puts the mosnter into the players army array
      for (var i = 0; i < currentPlayer.deck.cardsArray.length; i++) {
        if (this === currentPlayer.deck.cardsArray[i]) {
          currentPlayer.deck.cardsArray.splice(i, 1);
          break;
        }
      }
    }
    // If it's not a head, append it to an available monster and remove from
    // player's hand
    else {
      for (var monster of currentPlayer.army) {
        if (monster.addToMonster(this)) {
          // remove from player hand
          for (var i = 0; i < currentPlayer.deck.cardsArray.length; i++) {
            if (this === currentPlayer.deck.cardsArray[i]) {
              currentPlayer.deck.cardsArray.splice(i, 1);
              this.deck.parent.parent.actionsLeft--;
            }
          }
          break;
        }
      }
    }
    currentPlayer.render();
    currentPlayer.renderMonster();
    if (this.deck.parent.parent.actionsLeft <= 1) {
      if (!this.deck.parent.parent.players[this.deck.parent.parent.currentPlayer + 1]) {
        this.deck.parent.parent.currentPlayer = 0;
      }
      else {
        this.deck.parent.parent.currentPlayer++;
      }
      this.deck.parent.parent.actionsLeft = 4;
    }
    this.deck.parent.parent.players[this.deck.parent.parent.currentPlayer].render();
    this.deck.parent.parent.players[this.deck.parent.parent.currentPlayer].renderMonster(); */
  }

  render(){
    console.log('render');
    console.log(this.domElements.turn);
    debugger;
    // Renders the player's hand and score on the DOM
    this.domElements.turn.text(this.name + '\'s turn');
    this.domElements.score.text('Current Score: ' + this.points);
    this.domElements.hand.empty();
    for(var i = 0; i < this.deck.cardsArray.length; i++){
      this.domElements.hand.append(this.deck.cardsArray[i].createDomElement());
    }
  }
  renderMonster(){
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
