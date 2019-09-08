class Monster {
  constructor(headCard, player) {
    this.head = headCard;
    this.body = null;
    this.leftArm = null;
    this.rightArm = null;
    this.legs = null;
    this.player = player;
    this.monsterContainer = null;
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
          // this[card.type] = card;
          this.body = card;
          // this[card.type + 'Element']
          this.bodyElement = $('<div>').addClass('monster-body').css('background-image', "url(" + card.image + ")");
          this.points += card.points;
          this.deck.placeInDeck(card);
          return true;
        }
        else {
          return false;
        }
      case 'leftArm':
        if (this.body === null) {
          break;
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
      case 'rightArm':
        if (this.body === null) {
          break;
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
      case 'legs':
        if (this.body === null) {
          break;
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

  createMonsterDom(){
    var monsterContainer = $('<div>').addClass('monster-container');
    var monsterPoints = $('<div>').addClass("monster-score").text("Monster Power: " + this.deck.calcPoints());
    monsterContainer.append(this.headElement);
    monsterContainer.append(this.bodyElement);
    monsterContainer.append(this.leftArmElement);
    monsterContainer.append(this.rightArmElement);
    monsterContainer.append(this.legsElement);
    monsterContainer.append(monsterPoints);
    this.monsterContainer = monsterContainer;
    return monsterContainer;
  }
}
