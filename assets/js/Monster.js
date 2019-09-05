
class Monster {
  constructor(headCard, player) {
    this.head = headCard;
    this.body = null;
    this.leftArm = null;
    this.rightArm = null;
    this.legs = null;
    this.player = player;
    this.domElement = null;

    this.headElement = $('<div>').addClass('monster-head');
    this.bodyElement = null;
    this.leftArmElement = null;
    this.rightArmElement = null;
    this.legsElement = null;
    // create a dom Element for each body part
    // ex. this.headElement, this.LegsElement
    // inside the switch assign the element a jquery div element
    console.log('headcard points:', headCard.points)
    this.points = headCard.points;
    this.deck = new Deck(this);
    this.color = headCard.color;
  }
  addToMonster(card) {
    switch (card.type) {
      case 'body':
        if (this.body === null) {
          this.body = card;
          this.bodyElement = $('<div>').addClass('monster-body');
          //this.bodyElement = $('<div>')
          //add respective monster-bodypart class
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
          this.leftArmElement = $('<div>').addClass('monster-left-arm');
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
          this.rightArmElement = $('<div>').addClass('monster-right-arm');
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
          this.legsElement = $('<div>').addClass('monster-legs');
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
