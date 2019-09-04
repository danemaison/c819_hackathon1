
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
  }
  createMonster() {
    this.domElement = $('<div>').text(this.points + " head");
    this.player.parent.actionsLeft--;
    this.render();
  }
  addToMonster(card) {
    switch (card.type) {
      case 'body':
        if (this.body === null) {
          this.body = card;
          this.points += card.points;
        }
        break;
      case 'leftArm':
        if (this.leftArm === null) {
          this.leftArm = card;
          this.points += card.points;
        }
        break;
      case 'rightArm':
        if (this.rightArm === null) {
          this.rightArm = card;
          this.points += card.points;
        }
        break;
      case 'legs':
        if (this.legs === null) {
          this.legs = card;
          this.points += card.points;
        }
    }
  }
  render() {
    $('#playersDisplay').append(this.domElement);
  }
}
