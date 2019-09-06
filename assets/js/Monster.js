
class Monster {
  constructor(headCard, player) {
    this.head = headCard;
    this.body = null;
    this.leftArm = null;
    this.rightArm = null;
    this.legs = null;
    this.player = player;
    this.headElement = $('<div>').addClass('monster-head').css('background-image', "url(" + headCard.image + ")");
    this.bodyElement = null;
    this.leftArmElement = null;
    this.rightArmElement = null;
    this.legsElement = null;
    this.points = headCard.points;
    this.deck = new Deck(this);
    this.color = headCard.color;
  }
  addToMonster(card) {
    // This will add a DOM element to the Monster object for
    // each card type passed into it.
    switch (card.type) {
      case 'body':
        if (this.body === null) {
          this.body = card;
          this.bodyElement = $('<div>').addClass('monster-body').css('background-image', "url(" + card.image + ")");
          this.points += card.points;
          this.deck.placeInDeck(card);
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
          this.deck.placeInDeck(card);
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
          this.deck.placeInDeck(card);
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
          this.deck.placeInDeck(card);
          return true;
        }
    }
  }
}
