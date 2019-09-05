
class Monster {
  constructor(headCard, player) {
    this.head = headCard;
    this.body = null;
    this.leftArm = null;
    this.rightArm = null;
    this.legs = null;
    this.player = player;
    this.domElement = null;
    this.headElement = $('<div>').addClass('monster-head').css('background-image', "url(" + headCard.image + ")");
    this.bodyElement = null;
    this.leftArmElement = null;
    this.rightArmElement = null;
    this.legsElement = null;

    console.log('headcard points:', headCard.points)
    this.points = headCard.points;
    this.deck = new Deck(this);
    this.color = headCard.color;
  }
  addToMonster(card) {
    console.log(card);
    switch (card.type) {
      case 'body':
        if (this.body === null) {
          this.body = card;
          this.bodyElement = $('<div>').addClass('monster-body').css('background-image', "url(" + card.image + ")");
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
          this.leftArmElement = $('<div>').addClass('monster-left-arm').css('background-image', "url(" + card.image + ")");
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
          this.rightArmElement = $('<div>').addClass('monster-right-arm').css('background-image', "url(" + card.image +")");
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
          this.legsElement = $('<div>').addClass('monster-legs').css('background-image', "url(" + card.image + ")");
          this.points += card.points;
          return true;
        }
    }
  }
  render() {
    $('#playersDisplay').append(this.domElement);
  }
}
