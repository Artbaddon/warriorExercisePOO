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
