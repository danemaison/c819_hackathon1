
class Monster {
  constructor(headCard, player) {
    this.head = headCard;
    this.body = null;
    this.leftArm = null;
    this.rightArm = null;
    this.legs = null;
    this.player = player;
    this.domElement = null;
    console.log('headcard points:', headCard.points)
    this.points = headCard.points;
    this.deck = new Deck(this);
    this.color = headCard.color;
  }
  // createMonster() {
  //   this.domElement = $('<div>').text(this.points + " head");
  //   this.render();
  // }
  addToMonster(card) {
    switch (card.type) {
      case 'body':
        if (this.body === null) {
          this.body = card;
          this.points += card.points;
          return true;
        }
        else {
          return false;
        }
        break;
      case 'leftArm':
        if (this.body === null) {
          break;
          return;
        }
        if (this.leftArm === null) {
          this.leftArm = card;
          this.points += card.points;
          return true;
        }
        else {
          return false;
        }
        break;
      case 'rightArm':
        if (this.body === null) {
          break;
          return;
        }
        if (this.rightArm === null) {
          this.rightArm = card;
          this.points += card.points;
          return true;
        }
        else {
          return false;
        }
        break;
      case 'legs':
        if (this.body === null) {
          break;
          return;
        }
        if (this.legs === null) {
          this.legs = card;
          this.points += card.points;
          return true;
        }
        else{
          return false;
        }
        break;
    }
  }
  render() {
    $('#playersDisplay').append(this.domElement);
  }
}
