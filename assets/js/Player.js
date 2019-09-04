class Player{
  constructor(){
    this.deck = new Deck(this);
    this.army = [];
    this.points = 0;
  }
  addMonster(monsterObj){
    this.army.push(monsterObj);
  }
  render(){
    for(var i = 0; i < this.deck.cardsArray.length; i++){
      $('#playerHand').append(this.deck.cardsArray[i].domElement);
    }
  }
}
