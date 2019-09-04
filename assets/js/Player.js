class Player{
  constructor(parent){
    this.deck = new Deck(this);
    this.army = [];
    this.points = 0;
    this.parent = parent;
  }
  addMonster(monsterObj){
    this.army.push(new Monster(this));
  }
  render(){
    $('#playerHand').empty();
    console.log(this.deck.cardsArray);
    // console.log(this)
    for(var i = 0; i < this.deck.cardsArray.length; i++){
      $('#playerHand').append(this.deck.cardsArray[i].domElement);
    }
    // console.log(this.deck);
  }
  renderMonster(){
    for(var i = 0; i < this.army.length; i++){
      var monsterDOM = $('<div>').addClass('monster').text(this.army[i].points);
      $(`player${this.parent.currentPlayer}`).append(monsterDOM)
    }
  }
}
