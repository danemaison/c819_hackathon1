class Player{
  constructor(parent, name){
//bind the handleCardinClick
    this.deck = new Deck(this, this.handleCardHandClicked);
    this.army = [];
    this.points = 0;
    this.parent = parent;
//call back from the parent?
//pass in callbacks for the callbacks we want to call and NOT Parent
//pass the callback in the function so we can go back to it
    this.name = name;

  }
  addMonster(monsterObj){
    this.army.push(monsterObj);
  }

//handleCardinHandClick(cardObj){
//console.log('card clicked', cardObj)
}
//should already know what the DOM elements we are making and should be stored on top
//the render should be only include the function moved into the BOARD and then call the player to give the data (the id, number, player)
//pass them into the constructor the players numbers - so they player knows what they are

//move the render stuff to the game
//add a method (ie get player data) to get the data from the player
//so the board will render the data out
//so it would return an object with all the info needed is points, id, cards
//make another method "getall cards in DOM elements"

  render(){
    // Renders the player's hand and score on the DOM
    $('#currentPlayer').text('Player ' + (this.parent.currentPlayer + 1) + '\'s turn');
    $('#currentPlayerScore').text('Current Score: ' + this.points);
    $('#playerHand').empty();
    for(var i = 0; i < this.deck.cardsArray.length; i++){
      $('#playerHand').append(this.deck.cardsArray[i].createDomElement());
    }
  }
  renderMonster(){
    // Renders each of the player's monsters on the DOM
//when the player does it's actual render so it should add it onto the player
    $('.player' + (this.parent.currentPlayer + 1)).empty();
    for(var i = 0; i < this.army.length; i++){
      var monsterContainer = $('<div>').addClass('monster-container');
      var monsterPoints = $('<div>').addClass("monster-score").text("Monster Power: " + this.army[i].deck.calcPoints());
//move the monster stuff into the Monster.js
//storing in the object itself and simply updating it
      monsterContainer.append(this.army[i].headElement);
      monsterContainer.append(this.army[i].bodyElement);
      monsterContainer.append(this.army[i].leftArmElement);
      monsterContainer.append(this.army[i].rightArmElement);
      monsterContainer.append(this.army[i].legsElement);
      monsterContainer.append(monsterPoints);
      $('.player' + (this.parent.currentPlayer+1) ).append(monsterContainer);
    }
    $(".row.player-titles > h3:nth-child(1)").text("Player One's Army: " + this.parent.players[0].calcArmyPoints());
    $(".row.player-titles > h3:nth-child(2)").text("Player Two's Army: " + this.parent.players[1].calcArmyPoints());
  }
  calcArmyPoints(){
    var tempPoints = 0;
    for (var monster of this.army){
      tempPoints += monster.deck.calcPoints();
    }
    return tempPoints;
  }
}
