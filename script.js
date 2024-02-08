let app = document.querySelector(".app");
let payout = 0;
let playerMoney = 1000;
let totalMoneyEarned = 0;
let displayMoney = 0;
let clicksPerSecond = 0;

//Sounds
let frodeClickerAudio = new Audio("sounds/frodeclicker.wav");
let woah = new Audio("sounds/woah.wav");
let grandiosaAudio = new Audio("sounds/grandiosa.wav");
let snusAudio = new Audio("sounds/snus.wav");
let fireballAudio = new Audio("sounds/fireball.wav");




const upgrades = [
    {
        name: "AutoClicker",
        price: "10",
        strength: 1,
        fps: 0.2,
        basefps: 0.2,
        image: "autoclicker.webp",
        audio: woah,
        amount: 0,
        class: "upgrade1",
        unlockMoney: 0,
        upgradePrice: 250,
        upgradeClass: "powerUp1",
        unlocked: false,

    },
    {
        name: "G3Volt",
        price: "200",
        strength: 1,
        fps: 1.0,
        basefps: 1.0,
        image: "G3Volt.png",
        audio: snusAudio,
        amount: 0,
        class: "upgrade2",
        unlockMoney: 10,
        upgradePrice: 2000,
        upgradeClass: "powerUp2",
        unlocked: false,
    },
    {
        name: "Grandiosa",
        price: "1500",
        strength: 1,
        fps: 4.0,
        basefps: 4.0,
        image: "Grandiosa.png",
        audio: grandiosaAudio,
        amount: 0,
        class: "upgrade3",
        unlockMoney: 100,
        upgradePrice: 10000,
        upgradeClass: "powerUp3",
        unlocked: false,
    },
    {
        name: "Fireball",
        price: "5000",
        strength: 1,
        fps: 8.0,
        basefps: 8.0,
        image: "fireball.png",
        audio: fireballAudio,
        amount: 0,
        class: "upgrade4",
        unlockMoney: 300,
        upgradePrice: 30000,
        upgradeClass: "powerUp4",
        unlocked: false,
    },
    {
        name: "Frode",
        upgradePrice: 100,
        unlockMoney: 50,
        image: "Frode.png",
        upgradeClass: "powerUp5",
        strength: 1,
        audio: woah,
        unlocked: false,
        amount: 10,
        class: "",
        fps: 0,
        basefps: 0,
        
    },


]


frodeClickerAudio.play();

function game() {

    displayMoney = Math.round(playerMoney);

    app.innerHTML = /*HTML*/`
    <div class="overskrift">
        <h1>Frode Clicker</h1>
    </div>
    <div class="underskrift">
        <h3 class="mindre-tekst">Beta Versjon 0.2</h3>
    </div>
    <div class="stats"> 
    <h1>${displayMoney} Froder</h1>
    <h1>${clicksPerSecond} Froder per sekund</h1>
    
    </div>
    <div class="clicker">
        <img onclick="userClick()" src="Frode.png">
            
                <div class="upgradeRow">
                    <div onclick="buyUpgrade(0)" class="upgrade1">
                        
                        <img class="upgradeBilde" src=${upgrades[0].image}>
                        <h3 class="upgradeTekst"> ${upgrades[0].name} </h3>
                        <h3 class="upgradeTekst"> Price: ${upgrades[0].price}</h3>
                        <h3 class="upgradeTekst"> ${upgrades[0].fps}FPS</h3>
                    </div>
                    <div onclick="buyUpgrade(1)" class="upgrade2">
                        <img class="upgradeBilde" src=${upgrades[1].image}>
                        <h3 class="upgradeTekst"> ${upgrades[1].name} </h3>
                        <h3 class="upgradeTekst"> Price: ${upgrades[1].price}</h3>
                        <h3 class="upgradeTekst"> ${upgrades[1].fps}FPS</h3>
                    </div>
                    <div onclick="buyUpgrade(2)" class="upgrade3">
                        <img class="upgradeBilde" src=${upgrades[2].image}>
                        <h3 class="upgradeTekst"> ${upgrades[2].name} </h3>
                        <h3 class="upgradeTekst"> Price: ${upgrades[2].price}</h3>
                        <h3 class="upgradeTekst"> ${upgrades[2].fps}FPS</h3>
                    </div>
                    <div onclick="buyUpgrade(3)" class="upgrade4">
                        <img class="upgradeBilde" src=${upgrades[3].image}>
                        <h3 class="upgradeTekst"> ${upgrades[3].name} </h3>
                        <h3 class="upgradeTekst"> Price: ${upgrades[3].price}</h3>
                        <h3 class="upgradeTekst"> ${upgrades[3].fps}FPS</h3>
                    </div>
                </div>
    </div>

    <div class="powerups">
        
    </div>
    `
    checkUnlocks();
    gameUpgrades();
    checkIfCanBuyAll();

}

//Kjøper upgrades
function buyUpgrade(i) {
    if (playerMoney >= upgrades[i].price) {
        upgrades[i].audio.play()
        playerMoney -= upgrades[i].price;
        upgrades[i].amount += 1;

        upgrades[i].price = upgrades[i].price / 2 * 2.718;
        upgrades[i].price = Math.round(upgrades[i].price);
    }
}


//Gir Froder når du trykker på Frode
 function userClick() {
     totalMoneyEarned += upgrades[4].strength;
     playerMoney += upgrades[4].strength;
 }


// Gir betaling for dine upgrades
function gameUpgrades() {
    for (let i = 0; i < upgrades.length; i++) {
        if (upgrades[i].amount > 0) {
            payout += upgrades[i].amount * upgrades[i].strength * upgrades[i].basefps / 4;
            if (upgrades[i].class != "") {
            document.querySelector("." + upgrades[i].class).innerHTML += /*HTML*/`
            <h3 class="upgradeAntall">${upgrades[i].amount}</h3>
        `
        }
    }
    }
    totalMoneyEarned += payout;
    playerMoney += payout;
    clicksPerSecond = Math.floor(payout * 40) / 10;
    payout = 0;
}

// oppgraderer oppgraderinger
function upgradeItem(i) {
    if (playerMoney > upgrades[i].upgradePrice) {
        upgrades[i].audio.play();
        upgrades[i].strength *= 2;
        upgrades[i].fps *= 2;
        playerMoney -= upgrades[i].upgradePrice;
        upgrades[i].upgradePrice = upgrades[i].upgradePrice * 2.718;
        upgrades[i].upgradePrice = Math.floor(upgrades[i].upgradePrice);
    }

}

//Sjekker etter unlocks
function checkUnlocks() {

    for (let i = 0; i < upgrades.length; i++) {
        if (playerMoney > upgrades[i].unlockMoney && upgrades[i].amount >= 5 || upgrades[i].unlocked) {
            upgrades[i].unlocked = true;
            document.querySelector(".powerups").innerHTML += /*HTML*/ `
             <div onclick="upgradeItem(${i})" class=${upgrades[i].upgradeClass}>
                 <img class="upgradeBilde" src=${upgrades[i].image}>
                 <h3 class="upgradeTekst"> Upgrade ${upgrades[i].name} </h3>
               <h3 class="upgradeTekst"> Price: ${upgrades[i].upgradePrice}</h3>
                 <h3 class="upgradeTekst"> Current Strength: ${upgrades[i].strength}</h3>
             </div>
         `
        }
    }

    
    }

//Gjør fargen på ting blå hvis du kan kjøpe
function checkIfCanBuy(upgradeType, UpgradeCost) {
    if (playerMoney >= UpgradeCost) {
        document.querySelector("." + upgradeType).style.backgroundColor = "blue"
    }
}

function checkIfCanBuyAll() {
    for (let i = 0; i < upgrades.length; i++) {
        if (upgrades[i].class != "") {
        checkIfCanBuy(upgrades[i].class, upgrades[i].price)
    }
        if (upgrades[i].unlocked) {
        checkIfCanBuy(upgrades[i].upgradeClass, upgrades[i].upgradePrice)
    }
    }

}


function loop() {
    myInterval = setInterval(game, 250);
}

loop();