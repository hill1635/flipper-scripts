let math = require("math");
let choices = ["Heads", "Tails"];
const COIN_POSITIONS = ["--", "\\", "|", "/"];

function getRandomInt(min, max) {
    return math.floor(math.random() * (max - min)) + min;
}

function pickRandomChoice() {
    const randomIndex = math.floor(math.random() * choices.length);
    print(" ");
    print("It's...");
    delay(500);
    print(choices[randomIndex] + "!");
}

function flipCoin() {
    var numberOfFlips = getRandomInt(2, 6);
    while (numberOfFlips > 0) {
        for (let i = 0; i < COIN_POSITIONS.length; i++) {
            print(" ");
            print(COIN_POSITIONS[i]);
            delay(500);
        }
        numberOfFlips--;
    }
    print(" ");
    print("--");
    delay(500);
    print(" ");
    pickRandomChoice();
}

flipCoin();