let xp =0;
let health =100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const monster = [
  {
    name: "dog",
    level:2,
    health:15 
  },
   {
    name: "lion",
    level:8,
    health:60 
  },
   {
    name: "dinosar",
    level:20,
    health:300 
  }
]

const weapons = [
  {
    name : "stick",
    power : 3
  },
  {
    name : "axe",
    power : 5
  },
  {
    name : "knife",
    power : 7
  },
]
const locations = [
  {
    name: "town square",
    "button text" : ["Go to store","Go to Cave", "Fight dragon"],
    "button functions" : [goStore,goCave,fightDragon],
    text: "you entered the town square. you see a sign that says \"store\"."
  },
  {
    name : "store",
    "button text": ["Buy 10 Health[10 gold]","Buy weapon[30 gold]","Go to TownSquare"],
    "button functions":[buyHealth,buyWeapon,goTown],
    text :"you entered the store."
  },
  {
    name: "cave",
    "button text":["Fight Dog","Fight Lion", "go to town Square"],
    "button functions":[fightDog,fightLion,goTown],
    text:"you either fight or go to the town square"
  },
  {
    name: "fight",
    "button text":["attack","dodge","go to town square"],
    "button functions":[goAttack,dodge,goTown],
    text:"attack or die losing the game."
  },
  {
    name: "kill monster",
    "button text":["go to town square","go to town square","go to town square"],
    "button functions":[goTown,goTown,goTown],
    text:"The monster screams argh!. you gain the experience and earn gold points"
  },
  {
    name: "lose",
    "button text":["Replay","Replay","Replay"],
    "button functions":[replay,replay,replay],
    text:"you die"
  },
  {
    name: "win",
    "button text":["Replay","Replay","Replay"],
    "button functions":[replay,replay,replay],
    text:"you won the game"
  }
];
/* instead of writing everytime query selector we can assign to any variables*/
// initialize buttons

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location){

  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
  
}

function goTown(){
  update(locations[0]); 
}

function goStore() {
  update(locations[1]);
}
function goCave(){
  update(locations[2]);
  
}
function fightDragon(){
  update(locations[3]);
  
}
function buyHealth(){
  if(gold>=10){
  
  gold -=10;
  health += 10;
  healthText.innerText = health;
  goldText.innerText = gold;
  }
  else{
    text.innerText= "you dont have enough Gold";
  }
}
function buyWeapon(){
  if(currentWeapon<weapons.length - 1)
  {
  if(gold>=30)
  {
    gold-=30;
    currentWeapon++;
    goldText.innerText = gold;
    let newWeapon = weapons[currentWeapon].name;
    text.innerText = "you now have a "+ newWeapon + ".";
    inventory.push(newWeapon);
    text.innerText = "In your inventory, now you have: " + inventory;
  }
    else
    {
    text.innerText = "You don't have enough gold to buy";
  }
  }
    else {
    text.innerText = "You now have the latest weapon";
    button2.innerText = "Sell weapon for 15 gold";;
    button2.onclick = sellWeapon;
    }
}

function sellWeapon(){
  if(inventory.length >1){
  gold+=15;
  goldText.innerText = gold;
  let currentWeapon = inventory.shift();
  text.innerText = "you now sold a " + currentWeapon + ".";
  text.innerText = "In your inventory, now you have "+ inventory;
}
else
  {
  text.innerText = "Dont sell your weapon";
}
}


  
function fightDragon(){
  update(locations[2]);
}

function fightDog(){
  fighting = 0;
  goFight();
}
function fightLion(){
  fighting = 1;
  goFight();
}
function fightDinosar(){
  fighting = 2;
  goFight();
}
function goFight(){
  update(locations[3]);
  monsterHealth = monster[fighting].health;
  monsterStats.style.display = "block";
  monsterNameText.innerText = monster[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  
}
function goAttack(){
  text.innerText = "The " + monster[fighting].name + "attacks.";
  text.innerText = "you attact with your " + weapons[currentWeapon].name +" .";
  
  if(isMonsterHit()){
    health -= getMonsterAttackValue(monster[fighting].level);
  }
  else{
    text.innerText +=" you miss. ";

  }
  monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp)+1;
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if(health<=0){
    lose();
  }
  else if(monsterHealth<=0){
    if(fighting ===2){
      winGame();
    }
    else{
    defeatMonster();
    }
  }
  if(Math.random()<=.1 && inventory.length !==1){
    text.innerText += " Your " + inventory.pop() + "breaks. ";
    currentWeapon--;
  }
}
function getMonsterAttackValue(level){
  let hit = (level*5)-(Math.floor(Math.random()*xp));
  console.log(hit);
  return hit;
}
function isMonsterHit(){
  return Math.random()> .2 || health <20;
}
function dodge(){
    text.innerText = "you dodge the attack " + monster[fighting].name + " .";
}
function defeatMonster(){
  gold +=Math.floor(monsters[fighting].level *6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(location[4]);
}

function lose(){
  update(location[5]);
}

function winGame(){
  update(location[6]);
}

function replay(){
  xp = 0;
  health = 100;
  gold = 50;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}
