// var playerInfo.name = 'Clank McKrank';

// You can also log multiple values at once like this

var randomNumber = function (min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);
  return value;
};

var getPlayerName = function () {
  var name = "";
  while (name === "" || name === null) {
    name = window.prompt("What is your robots name?");
  }
  console.log("Your robot's name is " + name + ".");
  return name;
};
var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function () {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function () {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 coins.");
      this.health += 20;
      this.money -= 7;
    } else {
      window.alert("You do not have enough coins champ.");
    }
  },
  upgradeAttack: function () {
    if (playerInfo.money >= 7) {
      window.alert("Upgrading your attack for 7 coins.");
      this.attack += 6;
      this.money -= 7;
    } else {
      window.alert("You dont have enough coins champ.");
    }
  },
};
var startGame = function () {
  playerInfo.reset();
  for (var i = 0; i < enemyInfo.length; i++) {
    if (playerInfo.health > 0) {
      window.alert("Welcome to Robot Gladiators! ROUND " + (i + 1) + " FIGHT");
      var pickedEnemyObj = (pickedEnemyObj = enemyInfo[i]);
      pickedEnemyObj.health = randomNumber(40, 60);
      fight(pickedEnemyObj);
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        var storeConfirm = window.confirm(
          "The fight is over, visit the store before going back to battle?"
        );
        if (storeConfirm) {
          shop();
        }
      }
    } else {
      window.alert("You have lost your robot in battle :/. Game Over...");
      break;
    }
  }
  endGame();
};
var fightOrSkip = function () {
  // ask player if they'd like to fight or skip using fightOrSkip function
  var promptFight = window.prompt(
    'Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.'
  );

  // Enter the conditional recursive function call here!
  if (promptFight === "" || promptFight === null) {
    window.alert("Nah man add something to the prompt.");
    return fightOrSkip();
  }
  promptFight = promptFight.toLowerCase();
  if (promptFight === "skip") {
    // if player picks "skip" confirm and then stop the loop
    // confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(
        playerInfo.name + " has decided to skip this fight. Goodbye!"
      );
      // subtract money from playerMoney for skipping
      playerInfo.money = playerInfo.money - 10;
      return true;
    }
    shop();
  }
  return false;
};
// fight function
var fight = function (enemy) {
  // keep track of who goes first
  var isPlayerTurn = true;

  // randomly change turn order
  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  }

  while (playerInfo.health > 0 && enemy.health > 0) {
    if (isPlayerTurn) {
      // ask player if they'd like to fight or skip using fightOrSkip function
      if (fightOrSkip()) {
        // if true, leave fight by breaking loop
        break;
      }

      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

      // remove enemy's health by subtracting the amount we set in the damage variable
      enemy.health = Math.max(0, enemy.health - damage);
      console.log(
        playerInfo.name +
          " attacked " +
          enemy.name +
          ". " +
          enemy.name +
          " now has " +
          enemy.health +
          " health remaining."
      );

      // check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + " has died!");

        // award player money for winning
        playerInfo.money = playerInfo.money + 20;

        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert(
          enemy.name + " still has " + enemy.health + " health left."
        );
      }
      // player gets attacked first
    } else {
      var damage = randomNumber(enemy.attack - 3, enemy.attack);

      // remove player's health by subtracting the amount we set in the damage variable
      playerInfo.health = Math.max(0, playerInfo.health - damage);
      console.log(
        enemy.name +
          " attacked " +
          playerInfo.name +
          ". " +
          playerInfo.name +
          " now has " +
          playerInfo.health +
          " health remaining."
      );

      // check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has died!");
        // leave while() loop if player is dead
        break;
      } else {
        window.alert(
          playerInfo.name + " still has " + playerInfo.health + " health left."
        );
      }
    }
    // switch turn order for next round
    isPlayerTurn = !isPlayerTurn;
  }
};

var enemyInfo = [
  {
    name: "Megatron",
    attack: randomNumber(10, 14),
  },
  {
    name: "Jazz",
    attack: randomNumber(10, 14),
  },
  {
    name: "Optimus Prime",
    attack: randomNumber(10, 14),
  },
];

var shop = function () {
  var shopOptionPrompt = window.prompt(
    "Would you like to 1.REFILL your health, 2.UPGRADE your attack, or 3.LEAVE the store? Enter the number that corresponds to your choice."
  );
  shopOptionPrompt = parseInt(shopOptionPrompt);
  switch (shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();
      break;
    case 2:
      playerInfo.upgradeAttack();
      break;
    case 3:
      window.alert("Leaving store...");
      break;
    default:
      window.alert("You did not pick a valid option. Try again.");
      shop();
      break;
  }
};
var endGame = function () {
  if (playerInfo.health > 0) {
    window.alert(
      "Great job, you've survived the game! you now have a score of " +
        playerInfo.money +
        "."
    );
  } else {
    window.alert("You've lost your robot in battle.");
  }
  var playAgainConfirm = window.confirm("Would you like to play again?");
  if (playAgainConfirm) {
    startGame();
  } else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};
startGame();
