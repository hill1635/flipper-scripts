// import modules
// caution: `eventLoop` HAS to be imported before `gui`, and `gui` HAS to be
// imported before any `gui` submodules.
import * as eventLoop from "@flipperdevices/fz-sdk/event_loop";
import * as gui from "@flipperdevices/fz-sdk/gui";
import * as math from "@flipperdevices/fz-sdk/math";
import * as dialog from "@flipperdevices/fz-sdk/gui/dialog";

let choices = ["Heads", "Tails"];
const COIN_POSITIONS = ["--", "\\", "|", "/"];

let views = {
    startDialog: dialog.makeWith({
        header: "Coin Flipper",
        text: "Flip a coin",
        center: "Flip",
    }),
    flipDialog: dialog.makeWith({
        header: "Flipping...",
    }),
    resultDialog: dialog.make(),
};

function getRandomInt(min, max) {
    return math.floor(math.random() * (max - min)) + min;
}

function getResult() {
    const RANDOM_INDEX = math.floor(math.random() * choices.length);
    const DELAY_TIME = getRandomInt(500, 2000);
    gui.viewDispatcher.switchTo(views.resultDialog);
    views.resultDialog.set("header", "It's...");
    delay(DELAY_TIME);
    views.resultDialog.set("text", choices[RANDOM_INDEX] + "!");
    delay(500);
    views.resultDialog.set("center", "Flip again");
}

function flipCoin() {
    var numberOfFlips = getRandomInt(4, 12);
    gui.viewDispatcher.switchTo(views.flipDialog);
    while (numberOfFlips > 0) {
        for (let i = 0; i < COIN_POSITIONS.length; i++) {
            views.flipDialog.set("text", COIN_POSITIONS[i]);
            delay(125);
        }
        numberOfFlips--;
    }
    views.flipDialog.set("text", COIN_POSITIONS[0]);
    delay(125);
}

function run() {
    flipCoin();
    getResult();
}

eventLoop.subscribe(views.startDialog.input, function (_sub, button, gui, views) {
    if (button === "center") {
        run();
    }
}
, gui, views);

eventLoop.subscribe(views.resultDialog.input, function (_sub, button, gui, views) {
    views.resultDialog.set("text", "");
    views.resultDialog.set("center", "");
    if (button === "center") {
        run();
    }
}
, gui, views);

gui.viewDispatcher.switchTo(views.startDialog);
eventLoop.run();