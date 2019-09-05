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
    $('#playerHand').empty();
    console.log(this.deck.cardsArray);
    // console.log(this)
    for(var i = 0; i < this.deck.cardsArray.length; i++){
      $('#playerHand').append(this.deck.cardsArray[i].createDomElement());
    }
    // console.log(this.deck);
  }
  renderMonster(){
    $('.player' + (this.parent.currentPlayer + 1)).empty();
    for(var i = 0; i < this.army.length; i++){
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
