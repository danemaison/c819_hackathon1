class Monster {
  constructor(headCard, player) {
    this.head = headCard;
    this.body = null;
    this.leftArm = null;
    this.rightArm = null;
    this.legs = null;
    this.player = player;
    this.domElement = null;
    this.points = null;
  }
  createMonster(){
    this.domElement = $('<div>').text(this.points)
  }
  addToMonster(card){
    switch(card.type){
      case 'body':
        if(this.body === null){
          this.body = card;
        }
        break;
      case 'leftArm':
        if (this.leftArm === null){
        this.leftArm = card;
        }
        break;
      case 'rightArm':
        if (this.rightArm === null){
        this.rightArm = card;
        }
        break;
      case 'legs':
        if (this.legs === null){
        this.legs = card;
        }
    }
  }
  addMonstertoGameBoard(){
    $('#playersDisplay').append(this.domElement);
  }
}
