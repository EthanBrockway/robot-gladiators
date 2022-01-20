// var playerInfo.name = 'Clank McKrank';

// You can also log multiple values at once like this

var randomNumber = function (min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);
  return value;
};

var playerInfo = {
  name: window.prompt("What is your robot's name?"),
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
    if (player.money >= 7) {
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
// fight function
var fight = function (enemy) {
  while (playerInfo.health > 0 && enemy.health > 0) {
    // ask player if they'd like to fight or run
    var promptFight = window.prompt(
      'Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.'
    );

    // if player choses to fight, fight
    if (promptFight === "fight" || promptFight === "FIGHT") {
      // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
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
        break;
      } else {
        window.alert(
          enemy.name + " still has " + enemy.health + " health left."
        );
      }

      // remove players's health by subtracting the amount set in the enemy.attack variable
      var damage = randomNumber(enemy.attack - 3, enemy.attack);
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
        break;
      } else {
        window.alert(
          playerInfo.name + " still has " + playerInfo.health + " health left."
        );
      }
      // if player choses to skip
    } else if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(
          playerInfo.name + " has decided to skip this fight. Goodbye!"
        );
        // subtract money from playerInfo.money for skipping
        playerInfo.money = Math.max(0, playerInfo.money - 10);
        console.log("playerInfo.money:", playerInfo.money);
        break;
      }
      // if no (false), ask question again by running fight() again
      else {
        fight();
      }
      // if player did not chose 1 or 2 in prompt
    } else {
      window.alert("You need to pick a valid option. Try again!");
    }
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
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
  );
  switch (shopOptionPrompt) {
    case "refill":
    case "REFILL":
      playerInfo.refillHealth();
      break;
    case "upgrade":
    case "UPGRADE":
      playerInfo.upgradeAttack();
      break;
    case "leave":
    case "LEAVE":
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
