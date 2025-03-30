// import modules
// caution: `eventLoop` HAS to be imported before `gui`, and `gui` HAS to be
// imported before any `gui` submodules.
import * as eventLoop from "@flipperdevices/fz-sdk/event_loop";
import * as gui from "@flipperdevices/fz-sdk/gui";
import * as math from "@flipperdevices/fz-sdk/math";
import * as dialog from "@flipperdevices/fz-sdk/gui/dialog";

const CHOICES = ["Heads", "Tails"];
const COIN_POSITIONS = ["--", "\\", "|", "/"];

var views = {
    startDialog: dialog.makeWith({
        header: "Coin Flipper",
        text: "Flip a coin",
        center: "Flip",
        left: "Quit",
    }),
    flipDialog: dialog.makeWith({
        header: "Flipping...",
    }),
    resultDialog: dialog.make(),
};

function setText(view, location, text) {
    views[view].set(location, text);
}

function getRandomInt(min, max) {
    return math.floor(math.random() * (max - min)) + min;
}

function getResult() {
    let randomIndex = math.floor(math.random() * CHOICES.length);
    let delayTime = getRandomInt(500, 2000);
    gui.viewDispatcher.switchTo(views.resultDialog);
    setText("resultDialog", "header", "It's...");
    delay(delayTime);
    setText("resultDialog", "text", CHOICES[randomIndex] + "!");
    delay(500);
    setText("resultDialog", "center", "Flip again");
    setText("resultDialog", "left", "Quit");
}

function flipCoin() {
    let numberOfFlips = getRandomInt(4, 12);
    gui.viewDispatcher.switchTo(views.flipDialog);
    while (numberOfFlips > 0) {
        for (let i = 0; i < COIN_POSITIONS.length; i++) {
            setText("flipDialog", "text", COIN_POSITIONS[i]);
            delay(125);
        }
        numberOfFlips--;
    }
    setText("flipDialog", "text", COIN_POSITIONS[0]);
    delay(125);
}

function run() {
    flipCoin();
    getResult();
}

eventLoop.subscribe(views.startDialog.input, function (_sub, button, gui, views) {
    if (button === "center") {
        run();
    } else if (button === "left") {
        eventLoop.stop();
    }
}
, gui, views);

eventLoop.subscribe(views.resultDialog.input, function (_sub, button, gui, views) {
    setText("resultDialog", "text", "");
    setText("resultDialog", "center", "");
    setText("resultDialog", "left", "");
    if (button === "center") {
        run();
    } else if (button === "left") {
        eventLoop.stop();
    }
}
, gui, views);

gui.viewDispatcher.switchTo(views.startDialog);
eventLoop.run();