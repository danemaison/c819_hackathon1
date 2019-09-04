class Monster {
  constructor(head, element, player) {
    this.head = null;
    this.body = null;
    this.arms = {
      this.leftArm: null;
      this.rightArm: null;
    }
    this.legs = null;
    this.element = 'red', 'blue', 'green';
    this.player = ;
  }
}

//points from head
//add parts method for each part
//render();

function createMonster(monster) {
  var  = $("<div>").addClass('monster');
  var  = $("<div>").addClass('');
  var  = $("<div>").addClass();

  card.append(monster);
  $("#gameBoard").append(card);
}

function handleCardClick(event) {
  console.log(event);
  $(this).addClass('hidden');
  clickedCard();
}
