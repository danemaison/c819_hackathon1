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
    for(var i = 0; i < this.deck.cardsArray.length; i++){
      $('#playerHand').append(this.deck.cardsArray[i].domElement);
    }
    console.log(this.deck);
  }
}
