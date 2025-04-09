function deleteFromArrayOfObjects(array, item, idField) {
  return array.filter((ele) => ele[idField] !== item);
}

function findId(obj, id, idField) {
  return obj.findIndex((item) => item[idField] === id);
}

class Warrior {
  static warriors = [];

  constructor(id, name, health, energy, warriorType, breed) {
    this.warriorId = id;
    this.warriorName = name;
    this.warriorHealth = health;
    this.warriorEnergy = energy;
    this.setWarriorType(warriorType);
    this.setBreed(breed);
    this.powers = [];
    Warrior.warriors.push(this);
    return this;
  }
  viewWarriorInfo() {
    return {
      warrior: {
        id: this.warriorId,
        name: this.warriorName,
        health: this.warriorHealth,
        energy: this.warriorEnergy,
        breed: this.breed,
      },
      powers: this.powers !== null ? this.powers.map((power) => power.viewPowerInfo()) : "warrior doesn't have powers",
    };
  }
  static viewAllWarriors() {
    return this.warriors;
  }

  updateWarrior(valueToEdit, newValue) {
    const id = findId(Warrior.warriors, this.warriorId, "warriorId");

    if (valueToEdit === "name") {
      Warrior.warriors[id].warriorName = newValue;
    } else if (valueToEdit === "health") {
      Warrior.warriors[id].warriorHealth = newValue;
    } else if (valueToEdit === "energy") {
      Warrior.warriors[id].warriorEnergy = newValue;
    }
    return Warrior.warriors[id];
  }

  // Also add delete method for consistency
  deleteWarrior() {
    Warrior.warriors = deleteFromArrayOfObjects(
      Warrior.warriors,
      this.warriorId,
      "warriorId"
    );
  }

  addPower(power) {
    if (power instanceof Power) {
      this.powers.push(power);
    } else {
      throw new Error("Invalid Power");
    }
  }
  setBreed(breed) {
    if (breed instanceof Breed) {
      this.breed = breed;
    } else {
      throw new Error("Invalid Breed");
    }
  }
  setWarriorType(warriorType) {
    if (warriorType instanceof WarriorType) {
      this.warriorType = warriorType;
    } else {
      throw new Error("Invalid Warrior Type");
    }
  }


}

class WarriorType {
  static wTypes = [];

  constructor(id, name, description) {
    this.warriorTypeId = id;
    this.warriorTypeName = name;
    this.warriorTypeDescription = description;
    WarriorType.wTypes.push(this);
  }
  updateWarriorType(valueToEdit, newValue) {
    const id = findId(WarriorType.wTypes, this.warriorTypeId, "warriorTypeId");

    if (valueToEdit === "name") {
      WarriorType.wTypes[id].warriorTypeName = newValue;
    } else if (valueToEdit === "description") {
      WarriorType.wTypes[id].warriorTypeDescription = newValue;
    }
    return WarriorType.wTypes[id];
  }

  deleteWarriorType() {
    WarriorType.wTypes = deleteFromArrayOfObjects(
      WarriorType.wTypes,
      this.warriorTypeId,
      "warriorTypeId"
    );
  }

  viewWarriorTypeInfo() {
    return {
      warriorTypeId: this.warriorTypeId,
      warriorTypeName: this.warriorTypeName,
      warriorTypeDescription: this.warriorTypeDescription
    };
  }

  static viewAllWarriorTypes() {
    return this.wTypes;
  }
}

class Breed {
  static breeds = [];

  constructor(id, name, description) {
    this.breedId = id;
    this.breedName = name;
    this.breedDescription = description;
    Breed.breeds.push(this);
  }
  updateBreed(valueToEdit, newValue) {
    const id = findId(Breed.breeds, this.breedId, "breedId");

    if (valueToEdit === "name") {
      Breed.breeds[id].breedName = newValue;
    } else if (valueToEdit === "description") {
      Breed.breeds[id].breedDescription = newValue;
    }
    return Breed.breeds[id];
  }

  deleteBreed() {
    Breed.breeds = deleteFromArrayOfObjects(
      Breed.breeds,
      this.breedId,
      "breedId"
    );
  }

  viewBreedInfo() {
    return { breedId: this.breedId, breedName: this.breedName, breedDescription: this.breedDescription };
  }

  static viewAllBreeds() {
    return this.breeds;
  }
}

class Power {
  static powers = [];

  constructor(id, name, dmg, effect, description) {
    this.powerId = id;
    this.powerName = name;
    this.powerDmg = dmg;
    this.powerEffect = effect;
    this.powerDescription = description;
    Power.powers.push(this);
  }

  updatePower(valueToEdit, newValue) {
    const id = findId(Power.powers, this.powerId, "powerId");

    if (valueToEdit === "name") {
      Power.powers[id].powerName = newValue;
    } else if (valueToEdit === "dmg") {
      Power.powers[id].powerDmg = newValue;
    } else if (valueToEdit === "effect") {
      Power.powers[id].powerEffect = newValue;
    } else if (valueToEdit === "description") {
      Power.powers[id].powerDescription = newValue;
    }
    return Power.powers[id];
  }

  deletePower() {
    Power.powers = deleteFromArrayOfObjects(
      Power.powers,
      this.powerId,
      "powerId"
    );
  }

  viewPowerInfo() {
    return {
      powerId: this.powerId,
      powerName: this.powerName,
      powerDmg: this.powerDmg,
      powerEffect: this.powerEffect,
      powerDescription: this.powerDescription
    }
  }

  static viewAllPowers() {
    return this.powers;
  }
}

// First, let's create some breeds (races)
const races = [
  new Breed(1, "Yordle", "Small magical creatures from Bandle City"),
  new Breed(2, "Human", "Regular humans from Runeterra"),
  new Breed(3, "Vastaya", "Chimeric creatures of Ionia"),
  new Breed(4, "Void", "Creatures from the Void"),
  new Breed(5, "Celestial", "Cosmic beings from Mount Targon")
];

// Create warrior types
const types = [
  new WarriorType(1, "Assassin", "High burst damage, low health"),
  new WarriorType(2, "Tank", "High health, high resistance"),
  new WarriorType(3, "Mage", "High magic damage, low health"),
  new WarriorType(4, "Marksman", "High sustained damage, low health"),
  new WarriorType(5, "Support", "High utility, medium health")
];

// Create powers
const powers = [
  new Power(1, "Blinding Dart", 70, "Blind", "Blinds and damages the target"),
  new Power(2, "Move Quick", 0, "Speed", "Increases movement speed"),
  new Power(3, "Toxic Shot", 40, "Poison", "Poisons the target"),
  new Power(4, "Noxious Trap", 60, "Trap", "Places a poisonous trap"),
  new Power(5, "Mystic Shot", 80, "Physical", "Fires an energy bolt"),
  new Power(6, "Infinite Duress", 100, "Suppress", "Suppresses and damages target"),
  new Power(7, "Death Mark", 120, "Execute", "Marks target for death"),
  new Power(8, "Final Spark", 200, "Magic", "Fires a powerful laser beam"),
  new Power(9, "Crowstorm", 150, "AoE", "Area damage and fear"),
  new Power(10, "Demacian Justice", 180, "Execute", "Powerful executing strike")
];

// Create warriors id, name, health, energy, warriorType, breed
const warriors = [
  // Yordle Warriors
  new Warrior(1, "Teemo", 80, 100, types[0], races[0]),
  new Warrior(2, "Veigar", 70, 120, types[2], races[0]),
  // Human Warriors
  new Warrior(3, "Garen", 150, 100, types[1], races[1]),
  new Warrior(4, "Lux", 80, 110, types[2], races[1]),
  // Vastaya Warriors
  new Warrior(5, "Ahri", 90, 100, types[2], races[2]),
  new Warrior(6, "Xayah", 85, 100, types[3], races[2]),
  // Void Warriors
  new Warrior(7, "Khazix", 95, 100, types[0], races[3]),
  new Warrior(8, "Velkoz", 85, 110, types[2], races[3]),
  // Celestial Warriors
  new Warrior(9, "Soraka", 75, 120, types[4], races[4],),
  new Warrior(10, "Pantheon", 100, 100, types[1], races[4])

];
//assign 5 random powers to warriors
for (let i = 0; i < warriors.length; i++) {
  for (let j = 0; j < 5; j++) {
    const randomIndex = Math.floor(Math.random() * powers.length);
    warriors[i].addPower(powers[randomIndex]);
  }
}

//1. Change View To all Classes
function changeViewToClasses() {
  clearMain();
  //1. Create Card For Each Class
  let classes = ["Warriors", "WarriorTypes", "Powers", "Races"];
  for (let i = 0; i < classes.length; i++) {
    const card = createCardForClass(classes[i]);
    mainContent.appendChild(card);
  }
}
function clearMain() {
  mainContent.innerHTML = "";
}
function createCardForClass(type) {
  const card = document.createElement("div")
  const cardBody = document.createElement("div");
  const cardTitle = document.createElement("h5");
  card.classList.add("card");
  card.classList.add("col");
  card.classList.add("m-2");
  cardBody.classList.add("card-body");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = type;
  card.appendChild(cardBody);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(createButtonForCard("Go to"));

  return card;
}

function createButtonForCard(buttonType) {
  const button = document.createElement("button");
  button.classList.add("btn", "btn-primary")
  button.textContent = buttonType;
  button.setAttribute("id", "changeViewBtn");
  button.classList.add("m-1");

  return button;

}
//1. Change view to warriors
function viewAllWarriors() {
  clearMain();
  const row = document.createElement("div");
  row.classList.add("row", "d-flex", "flex-wrap");
  for (let i = 0; i < warriors.length; i++) {
    const card = createCardForWarrior(warriors[i]);
    row.appendChild(card);
  }

  mainContent.appendChild(row);
}
function viewAllPowers() {
  clearMain();
  const row = document.createElement("div");
  row.classList.add("row", "d-flex", "flex-wrap");
  for (let i = 0; i < powers.length; i++) {
    const card = createCardForPower(powers[i]);
    row.appendChild(card);
  }
  mainContent.appendChild(row);
}
function viewAllRaces() {
  clearMain();
  const row = document.createElement("div");
  row.classList.add("row", "d-flex", "flex-wrap");
  for (let i = 0; i < races.length; i++) {
    const card = createCardForBreed(races[i]);
    row.appendChild(card);
  }
  mainContent.appendChild(row);
}
function viewAllPowers() {
  clearMain();
  const row = document.createElement("div");
  row.classList.add("row", "d-flex", "flex-wrap");
  for (let i = 0; i < powers.length; i++) {
    const card = createCardForPower(powers[i]);
    row.appendChild(card);
  }
  mainContent.appendChild(row);
}
function viewAllWarriorTypes() {
  clearMain();
  const row = document.createElement("div");
  row.classList.add("row", "d-flex", "flex-wrap");
  for (let i = 0; i < types.length; i++) {
    const card = createCardForWarriorType(types[i]);
    row.appendChild(card);
  }
  mainContent.appendChild(row);
}
function createCardForWarrior(warrior) {
  const card = document.createElement("div");
  const cardBody = document.createElement("div");
  const cardTitle = document.createElement("h5");
  const cardList = document.createElement("ul");
  const id = warrior.warriorId;
  const idHidden = document.createElement("input");

  const warriorInfo = [
    `Name: ${warrior.warriorName}`,
    `Health: ${warrior.warriorHealth}`,
    `Energy: ${warrior.warriorEnergy}`,
    `Type: ${warrior.warriorType.warriorTypeName}`,
    `Breed: ${warrior.breed.breedName}`,
    `Powers: ${warrior.powers !== null ? warrior.powers.map((power) => power.powerName).join(", ") : "No powers"}`,
  ];

  idHidden.type = "hidden";
  idHidden.value = id;
  card.appendChild(idHidden);
  // Card styling
  card.classList.add("card");

  card.classList.add("col-lg-3"); // Smaller on large screens
  card.classList.add("m-2");

  // Card body styling
  cardBody.classList.add("card-body");

  cardBody.style.maxHeight = "500px"; // Limit height

  // Title styling
  cardTitle.classList.add("card-title", "text-center", "mb-3");
  cardTitle.textContent = warrior.warriorName;

  // List styling
  cardList.classList.add("list-group", "list-group-flush", "mb-3");

  for (let i = 0; i < warriorInfo.length; i++) {
    const cardListItem = document.createElement("li");
    cardListItem.classList.add("list-group-item");
    cardListItem.style.whiteSpace = "normal"; // Allow text to wrap
    cardListItem.textContent = warriorInfo[i];
    cardList.appendChild(cardListItem);
  }

  // Button container
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("d-flex", "flex-wrap", "justify-content-center", "gap-2");

  // Create and add buttons
  buttonContainer.appendChild(createButtonForCard("View", "btn-info"));
  buttonContainer.appendChild(createButtonForCard("Delete", "btn-danger"));
  buttonContainer.appendChild(createButtonForCard("Edit", "btn-warning"));
  buttonContainer.appendChild(createButtonForCard("Add Power", "btn-success"));

  // Build card structure
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardList);
  cardBody.appendChild(buttonContainer);
  card.appendChild(cardBody);

  return card;
}
function createCardForBreed(breed) {
  const card = document.createElement("div");
  const cardBody = document.createElement("div");
  const cardTitle = document.createElement("h5");
  const cardList = document.createElement("ul");
  card.classList.add("card");
  card.classList.add("col-lg-3"); // Smaller on large screens
  card.classList.add("m-2");
  cardBody.classList.add("card-body");
  cardTitle.classList.add("card-title", "text-center", "mb-3");
  cardTitle.textContent = breed.breedName;
  cardList.classList.add("list-group", "list-group-flush", "mb-3");
  const cardListItem = document.createElement("li");
  cardListItem.classList.add("list-group-item");
  cardListItem.style.whiteSpace = "normal"; // Allow text to wrap
  cardListItem.textContent = breed.breedDescription;
  cardList.appendChild(cardListItem);
  cardBody.appendChild(cardList);
  cardBody.appendChild(cardTitle);
  card.appendChild(cardBody);
  return card;
}
function createCardForPower(power) {
  const card = document.createElement("div");
  const cardBody = document.createElement("div");
  const cardTitle = document.createElement("h5");
  const cardList = document.createElement("ul");
  card.classList.add("card");
  card.classList.add("col-lg-3"); // Smaller on large screens
  card.classList.add("m-2");
  cardBody.classList.add("card-body");
  cardTitle.classList.add("card-title", "text-center", "mb-3");
  cardTitle.textContent = power.powerName;
  cardList.classList.add("list-group", "list-group-flush", "mb-3");
  const cardListItem = document.createElement("li");
  cardListItem.classList.add("list-group-item");
  cardListItem.style.whiteSpace = "normal"; // Allow text to wrap
  cardListItem.textContent = power.powerDescription;
  cardList.appendChild(cardListItem);
  cardBody.appendChild(cardList);
  cardBody.appendChild(cardTitle);
  card.appendChild(cardBody);
  return card;
}
function createCardForWarriorType(warriorType) {
  const card = document.createElement("div");
  const cardBody = document.createElement("div");
  const cardTitle = document.createElement("h5");
  const cardList = document.createElement("ul");
  card.classList.add("card");
  card.classList.add("col-lg-3"); // Smaller on large screens
  card.classList.add("m-2");
  cardBody.classList.add("card-body");
  cardTitle.classList.add("card-title", "text-center", "mb-3");
  cardTitle.textContent = warriorType.warriorTypeName;
  cardList.classList.add("list-group", "list-group-flush", "mb-3");
  const cardListItem = document.createElement("li");
  cardListItem.classList.add("list-group-item");
  cardListItem.style.whiteSpace = "normal"; // Allow text to wrap
  cardListItem.textContent = warriorType.warriorTypeDescription;
  cardList.appendChild(cardListItem);
  cardBody.appendChild(cardList);
  cardBody.appendChild(cardTitle);
  card.appendChild(cardBody);
  return card;
}
function createButtonForCard(buttonText, buttonClass) {
  const button = document.createElement("button");
  button.classList.add("btn", buttonClass, "btn-sm");
  button.textContent = buttonText;
  button.style.whiteSpace = "nowrap";
  return button;
}
//2. Change view to powers
//3. Change view to races

// Get main content
let mainContent = document.querySelector(".main-content");
// Button for starting
const startBtn = document.querySelector("#startBtn");
startBtn.addEventListener("click", changeViewToClasses);