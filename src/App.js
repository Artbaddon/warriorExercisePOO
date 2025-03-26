function deleteFromArrayOfObjects(array, item, idField) {
  return array.filter((ele) => ele[idField] !== item);
}

function findId(obj, id, idField) {
  return obj.findIndex((item) => item[idField] == id);
}

class Warrior {
  static warriors = [];

  constructor(id, name, health, energy) {
    this.warriorId = id;
    this.warriorName = name;
    this.warriorHealth = health;
    this.warriorEnergy = energy;
    this.warriorType = null;
    this.breed = null;
    this.powers = [];
  }
  static createWarrior(id, name, health, energy) {
    const warrior = new Warrior(id, name, health, energy);
    Warrior.warriors.push(warrior);
    return warrior;
  }

  viewWarriorInfo() {
    return {
      warrior: {
        id: this.warriorId,
        name: this.warriorName,
        health: this.warriorHealth,
        energy: this.warriorEnergy,
      },
      type: this.warriorType ? this.warriorType.viewWarriorTypeInfo() : null,
      breed: this.breed ? this.breed.viewBreedInfo() : null,
      powers: this.powers.map((power) => power.viewPowerInfo()),
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
  }

  static createWarriorType(id, name, description) {
    const warriorType = new WarriorType(id, name, description);
    WarriorType.wTypes.push(warriorType);
    return warriorType;
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
    return [
      this.warriorTypeId,
      this.warriorTypeName,
      this.warriorTypeDescription,
    ];
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
  }

  static createBreed(id, name, description) {
    const breed = new Breed(id, name, description);
    Breed.breeds.push(breed);
    return breed;
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
    return [this.breedId, this.breedName, this.breedDescription];
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
  }

  static createPower(id, name, dmg, effect, description) {
    const power = new Power(id, name, dmg, effect, description);
    Power.powers.push(power);
    return power;
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
    return [
      this.powerId,
      this.powerName,
      this.powerDmg,
      this.powerEffect,
      this.powerDescription,
    ];
  }

  static viewAllPowers() {
    return this.powers;
  }
}

// First, let's create some breeds (races)
const races = [
  Breed.createBreed(1, "Yordle", "Small magical creatures from Bandle City"),
  Breed.createBreed(2, "Human", "Regular humans from Runeterra"),
  Breed.createBreed(3, "Vastaya", "Chimeric creatures of Ionia"),
  Breed.createBreed(4, "Void", "Creatures from the Void"),
  Breed.createBreed(5, "Celestial", "Cosmic beings from Mount Targon")
];

// Create warrior types
const types = [
  WarriorType.createWarriorType(1, "Assassin", "High burst damage, low health"),
  WarriorType.createWarriorType(2, "Tank", "High health, high resistance"),
  WarriorType.createWarriorType(3, "Mage", "High magic damage, low health"),
  WarriorType.createWarriorType(4, "Marksman", "High sustained damage, low health"),
  WarriorType.createWarriorType(5, "Support", "High utility, medium health")
];

// Create powers
const powers = [
  Power.createPower(1, "Blinding Dart", 70, "Blind", "Blinds and damages the target"),
  Power.createPower(2, "Move Quick", 0, "Speed", "Increases movement speed"),
  Power.createPower(3, "Toxic Shot", 40, "Poison", "Poisons the target"),
  Power.createPower(4, "Noxious Trap", 60, "Trap", "Places a poisonous trap"),
  Power.createPower(5, "Mystic Shot", 80, "Physical", "Fires an energy bolt"),
  Power.createPower(6, "Infinite Duress", 100, "Suppress", "Suppresses and damages target"),
  Power.createPower(7, "Death Mark", 120, "Execute", "Marks target for death"),
  Power.createPower(8, "Final Spark", 200, "Magic", "Fires a powerful laser beam"),
  Power.createPower(9, "Crowstorm", 150, "AoE", "Area damage and fear"),
  Power.createPower(10, "Demacian Justice", 180, "Execute", "Powerful executing strike")
];

// Create 10 warriors with LoL characters
function createWarriors() {
  const warriors = [
    // Yordle Warriors
    {id: 1, name: "Teemo", health: 80, energy: 100, breed: races[0], type: types[0]},
    {id: 2, name: "Veigar", health: 70, energy: 120, breed: races[0], type: types[2]},
    
    // Human Warriors
    {id: 3, name: "Garen", health: 150, energy: 100, breed: races[1], type: types[1]},
    {id: 4, name: "Lux", health: 80, energy: 110, breed: races[1], type: types[2]},
    
    // Vastaya Warriors
    {id: 5, name: "Ahri", health: 90, energy: 100, breed: races[2], type: types[2]},
    {id: 6, name: "Xayah", health: 85, energy: 100, breed: races[2], type: types[3]},
    
    // Void Warriors
    {id: 7, name: "Khazix", health: 95, energy: 100, breed: races[3], type: types[0]},
    {id: 8, name: "Velkoz", health: 85, energy: 110, breed: races[3], type: types[2]},
    
    // Celestial Warriors
    {id: 9, name: "Soraka", health: 75, energy: 120, breed: races[4], type: types[4]},
    {id: 10, name: "Pantheon", health: 100, energy: 100, breed: races[4], type: types[1]}
  ];

  return warriors.map(w => {
    const warrior = Warrior.createWarrior(w.id, w.name, w.health, w.energy);
    warrior.setBreed(w.breed);
    warrior.setWarriorType(w.type);
    
    // Assign 5 random powers to each warrior
    const shuffledPowers = [...powers].sort(() => Math.random() - 0.5);
    for (let i = 0; i < 5; i++) {
      warrior.addPower(shuffledPowers[i]);
    }
    
    return warrior;
  });
}

// Test cases
function runTests() {
  console.log("Running tests...");

  // 1. Create 10 warriors
  const warriors = createWarriors();
  console.log("\n1. Created warriors:", warriors.length === 10 ? "✅" : "❌");

  // 2. Check if all warriors have breeds assigned
  const allHaveBreeds = warriors.every(w => w.breed !== null);
  console.log("\n2. All warriors have breeds:", allHaveBreeds ? "✅" : "❌");

  // 3. Check if all warriors have types assigned
  const allHaveTypes = warriors.every(w => w.warriorType !== null);
  console.log("\n3. All warriors have types:", allHaveTypes ? "✅" : "❌");

  // 4. Check if all warriors have 5 powers
  const allHavePowers = warriors.every(w => w.powers.length === 5);
  console.log("\n4. All warriors have 5 powers:", allHavePowers ? "✅" : "❌");

  // 5. View all warriors
  console.log("\n5. All warriors:");
  console.log(Warrior.viewAllWarriors());

  // 6. View specific warrior (Teemo)
  const teemo = warriors.find(w => w.warriorName === "Teemo");
  console.log("\n6. Specific warrior (Teemo):");
  console.log(teemo);

  // 7. View warrior with all attributes
  console.log("\n7. Warrior with all attributes (Teemo):");
  console.log(teemo.viewWarriorInfo());
}

// Run the tests
runTests();

// Example of updating a warrior
const teemo = Warrior.warriors.find(w => w.warriorName === "Teemo");
teemo.updateWarrior("health", 90);
console.log("\nUpdated Teemo's health:");
console.log(teemo.viewWarriorInfo());
