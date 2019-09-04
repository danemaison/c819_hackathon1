class Player{
  constructor(){
    this.deck = new Deck();
    this.army = [];
    this.points = 0;
  }
  addMonster(monsterObj){
    this.army.push(monsterObj);
  }
  render(){
    for(var i = 0; i < this.deck.length; i++){
      ('#playerHand').append(this.deck[i].domElement);
    }
  }
}
