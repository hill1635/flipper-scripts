// import modules
// caution: `eventLoop` HAS to be imported before `gui`, and `gui` HAS to be
// imported before any `gui` submodules.
import * as eventLoop from "@flipperdevices/fz-sdk/event_loop";
import * as gui from "@flipperdevices/fz-sdk/gui";
import * as dialog from "@flipperdevices/fz-sdk/gui/dialog";
import * as math from "@flipperdevices/fz-sdk/math";

// create an array of fortunes for a fortune cookie
const FORTUNES = [
    "A beautiful, smart, and loving person will enter your life... probably asking for money.",
    "A dubious friend may be an enemy in camouflage. Or just really bad at disguises.",
    "A faithful friend is a strong defense—especially if they have a lawyer's number on speed dial.",
    "A feather in the hand is better than a bird in the air... unless you really needed dinner.",
    "A fresh start will put you on your way. Unfortunately, the road is under construction.",
    "A friend asks only for your time, not your money. The IRS, however, is less friendly.",
    "A friend is a present you give yourself—assuming you can afford the maintenance costs.",
    "A funny coincidence will make your day. Or make you question reality entirely.",
    "A gambler not only loses what he has but also what he doesn’t have. Welcome to credit card debt!",
    "A golden egg of opportunity falls into your lap this month. Hopefully, it doesn't crack first.",
    "A good friendship is often more valuable than a passionate romance. Less paperwork, too.",
    "A good time to finish old tasks. Or at least move them to the bottom of your to-do list again.",
    "A hunch is creativity trying to tell you something. Usually, it’s 'this is a bad idea.'",
    "A lifetime friend shall soon be made. If you manage not to scare them off first.",
    "A lifetime of happiness lies ahead of you. Probably buried under a pile of emails.",
    "A light heart carries you through hard times. A full wallet helps, too.",
    "A new outlook brightens your image and brings new friends. So does a makeover.",
    "A new perspective will come with the new year. So will more bills.",
    "A person of words and not deeds is like a garden full of weeds. Looks busy but accomplishes nothing.",
    "A pleasant surprise is waiting for you. Unless you’re a pessimist, then it’s just 'a surprise.'",
    "A short pencil is usually better than a long memory. Unless you forget where you put the pencil.",
    "A small donation is called for. It’s the right thing to do. Especially if you like tax deductions.",
    "A smile is your personal welcome mat. Just hope people wipe their feet first.",
    "A soft voice may be awfully persuasive. So can an airhorn, depending on the situation.",
    "A truly rich life contains love and art in abundance. But also, ideally, a stable income.",
    "Accept something that you cannot change, and you will feel better. Like the fact that your coffee is already cold.",
    "Adventure can be real happiness. So can a properly working air conditioner.",
    "Advice is like kissing. It costs nothing and is often unwanted when unsolicited.",
    "Advice, when most needed, is least heeded. Like 'don't check your ex's social media.'",
    "All the effort you are making will ultimately pay off. Hopefully, before retirement.",
    "All your hard work will soon pay off. In experience points, if nothing else.",
    "Allow compassion to guide your decisions. But keep a GPS handy just in case.",
    "An acquaintance of the past will affect you in the near future. Maybe that library book you never returned?",
    "An important person will offer you support. If not, a sturdy chair will do.",
    "An inch of time is an inch of gold. Unfortunately, both disappear quickly.",
    "Any day above ground is a good day. Unless you're a mole.",
    "Any decision you have to make tomorrow is a good decision. Especially if it involves coffee.",
    "At the touch of love, everyone becomes a poet. Some are just worse poets than others.",
    "Be careful or you could fall for some tricks today. Especially if you’re on a stage with a magician.",
    "Beauty in its various forms appeals to you. So does free food.",
    "Because you demand more from yourself, others respect you deeply. Or fear you slightly.",
    "Believe in yourself and others will too. If not, at least fake it convincingly.",
    "Believe it can be done. Or just wait for someone else to do it first.",
    "Better ask twice than lose yourself once. But if you still get lost, try Google Maps.",
    "Bide your time, for success is near. Or at least within WiFi range.",
    "Carve your name on your heart, not on marble. Also, not on your desk at work.",
    "Chance favors those in motion. So does public transportation.",
    "Change is happening in your life, so go with the flow! Just hope it’s not a flood.",
    "Competence like yours is underrated. Mostly by your boss.",
    "Congratulations! You are on your way. To where? That’s for you to figure out.",
    "Could I get some directions to your heart? Hopefully, it’s not a one-way street.",
    "Courtesy begins in the home. But apparently, it often forgets to leave the house.",
    "Curiosity kills boredom. Nothing kills curiosity. Except maybe a really bad reality TV show.",
    "Dedicate yourself with a calm mind to the task at hand. Or frantically panic—whatever works for you.",
    "Depart not from the path which fate has assigned you. Unless there’s a shortcut.",
    "Determination is what you need now. That and possibly a snack.",
    "Diligence and modesty can raise your social status. So can winning the lottery.",
    "Disbelief destroys the magic. Also, knowing how the magic trick actually works.",
    "Distance yourself from the vain. Unless they have a really good skincare routine to share.",
    "Do not be intimidated by the eloquence of others. Just talk faster and use bigger words.",
    "Do not let ambitions overshadow small success. Even if the small success is just finding both socks.",
    "Do not make extra work for yourself. Life already does that for you." 
  ];
  
  const pickFortune = () => {
    return (FORTUNES[math.floor(math.random() * FORTUNES.length)]);
  };
  
// a common pattern is to declare all the views that your app uses on one object
const views = {
    dialog: dialog.makeWith({
        header: "Fortune Cookie",
        text: "Crack one open to see what awaits you...",
        center: "Open",
    }),
    fortuneDialog: dialog.make(),
    loadingDialog: dialog.makeWith({
        header: "Opening...",
        text: "Please wait...",
    }),
};

const setText = (view, location, text) => {
    views[view].set(location, text);
};

const switchView = (view) => {
    gui.viewDispatcher.switchTo(views[view]);
};

const getRandomInt = (min, max) => {
    return math.floor(math.random() * (max - min)) + min;
};

const getFortune = () => {
    let fortune = pickFortune();
    let delayTime = getRandomInt(500, 2000);
    switchView("fortuneDialog");
    delay(delayTime);
    setText("fortuneDialog", "text", fortune);
    delay(500);
    setText("fortuneDialog", "center", "New fortune");
};

eventLoop.subscribe(views.dialog.input, (_sub, button) => {
    if (button === "center")
        var delayTime = getRandomInt(500, 2000);
        switchView("loadingDialog");
        delay(delayTime);
        getFortune();
});

eventLoop.subscribe(views.fortuneDialog.input, (_sub, button) => {
    if (button === "center")
        setText("fortuneDialog", "text", "");
        setText("fortuneDialog", "center", "");
        switchView("loadingDialog");
        delay(500);
        getFortune();
});

eventLoop.subscribe(gui.viewDispatcher.navigation, (_sub, _item, eventLoop) => {
    eventLoop.stop();
}, eventLoop);

// run app
switchView("dialog");
eventLoop.run();