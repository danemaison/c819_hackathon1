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
    // this.parent.actionsLeft--;
  }
  render(){
    console.log(this.parent.currentPlayer);
    $('#currentPlayer').text('Player ' + (this.parent.currentPlayer + 1) + '\'s turn');
    $('#playerHand').empty();
    for(var i = 0; i < this.deck.cardsArray.length; i++){
      $('#playerHand').append(this.deck.cardsArray[i].createDomElement());
    }
  }
  renderMonster(){
    $('.player' + (this.parent.currentPlayer + 1)).empty();
    for(var i = 0; i < this.army.length; i++){
      var monsterContainer = $('<div>').addClass('monster-container');

      monsterContainer.append(this.army[i].headElement);
      monsterContainer.append(this.army[i].bodyElement);
      monsterContainer.append(this.army[i].leftArmElement);
      monsterContainer.append(this.army[i].rightArmElement);
      monsterContainer.append(this.army[i].legsElement);

      // create a jquery div element to use as the container for the monster
      // with a class of monster-container
      // append to monster-container the monster's body parts

      var monsterDOM = this.createMonsterDomElement(this.army[i]);
      $('.player' + (this.parent.currentPlayer+1) ).append(monsterDOM)
    }
  }

  createMonsterDomElement(monsterObj){
    var monsterDOM = $('<div>').addClass('Monster').text(monsterObj.points);
    for (var i = 0; i < monsterObj.deck.cardsArray.length; i++){
      var bodyPartDOM = $("<div>").addClass(monsterObj.deck.cardsArray[i].type);
      monsterDOM.append(bodyPartDOM);
    }
    return monsterDOM;
  }

  calcArmyPoints(){
    var tempPoints = 0;
    for (var monster of this.army){
      tempPoints += monster.deck.calcPoints();
    }
    return tempPoints;
  }
}
