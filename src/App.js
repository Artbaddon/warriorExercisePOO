function deleteFromArrayOfObjects(array, item, idField) {
  if (!Array.isArray(array)) {
    throw new Error("First argument must be an array");
  }
  if (typeof idField !== "string") {
    throw new Error("idField must be a string");
  }
  return array.filter((ele) => ele[idField] !== item);
}

function findId(obj, id, idField) {
  if (!Array.isArray(obj)) {
    throw new Error("First argument must be an array");
  }
  if (typeof idField !== "string") {
    throw new Error("idField must be a string");
  }
  return obj.findIndex((item) => item[idField] === id);
}

class Warrior {
  static warriors = [];

  constructor(id, name, health, energy, warriorType, breed) {
    // Validate inputs
    if (typeof id !== "number") {
      throw new Error("ID must be a number");
    }
    if (typeof name !== "string" || name.trim() === "") {
      throw new Error("Name must be a non-empty string");
    }
    if (typeof health !== "number" || health < 0) {
      throw new Error("Health must be a non-negative number");
    }
    if (typeof energy !== "number" || energy < 0) {
      throw new Error("Energy must be a non-negative number");
    }
    if (!(warriorType instanceof WarriorType)) {
      throw new Error(
        "Invalid Warrior Type: must be an instance of WarriorType"
      );
    }
    if (!(breed instanceof Breed)) {
      throw new Error("Invalid Breed: must be an instance of Breed");
    }

    // Check for duplicate ID
    if (Warrior.warriors.some((w) => w.warriorId === id)) {
      throw new Error(`Warrior with ID ${id} already exists`);
    }

    this.warriorId = id;
    this.warriorName = name.trim();
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
        breed: this.breed.viewBreedInfo(),
        warriorType: this.warriorType.viewWarriorTypeInfo(),
      },
      powers:
        this.powers.length > 0
          ? this.powers.map((power) => power.viewPowerInfo())
          : "warrior doesn't have powers",
    };
  }

  static viewAllWarriors() {
    return this.warriors;
  }

  updateWarrior(valueToEdit, newValue) {
    const validProperties = ["name", "health", "energy"];
    if (!validProperties.includes(valueToEdit)) {
      throw new Error(`Invalid property to update: ${valueToEdit}`);
    }

    const id = findId(Warrior.warriors, this.warriorId, "warriorId");
    if (id === -1) {
      throw new Error("Warrior not found");
    }

    if (valueToEdit === "name") {
      if (typeof newValue !== "string" || newValue.trim() === "") {
        throw new Error("Name must be a non-empty string");
      }
      Warrior.warriors[id].warriorName = newValue.trim();
    } else if (valueToEdit === "health") {
      if (typeof newValue !== "number" || newValue < 0) {
        throw new Error("Health must be a non-negative number");
      }
      Warrior.warriors[id].warriorHealth = newValue;
    } else if (valueToEdit === "energy") {
      if (typeof newValue !== "number" || newValue < 0) {
        throw new Error("Energy must be a non-negative number");
      }
      Warrior.warriors[id].warriorEnergy = newValue;
    }
    return Warrior.warriors[id];
  }

  deleteWarrior() {
    const initialLength = Warrior.warriors.length;
    Warrior.warriors = deleteFromArrayOfObjects(
      Warrior.warriors,
      this.warriorId,
      "warriorId"
    );
    if (Warrior.warriors.length === initialLength) {
      throw new Error("Warrior not found or could not be deleted");
    }
  }

  addPower(power) {
    if (!(power instanceof Power)) {
      throw new Error("Invalid Power: must be an instance of Power");
    }
    // Check if power already exists
    if (this.powers.some((p) => p.powerId === power.powerId)) {
      throw new Error(
        `Power with ID ${power.powerId} already exists for this warrior`
      );
    }
    this.powers.push(power);
  }

  setBreed(breed) {
    if (!(breed instanceof Breed)) {
      throw new Error("Invalid Breed: must be an instance of Breed");
    }
    this.breed = breed;
  }

  setWarriorType(warriorType) {
    if (!(warriorType instanceof WarriorType)) {
      throw new Error(
        "Invalid Warrior Type: must be an instance of WarriorType"
      );
    }
    this.warriorType = warriorType;
  }
}

class WarriorType {
  static wTypes = [];

  constructor(id, name, description) {
    if (typeof id !== "string" && typeof id !== "number") {
      throw new Error("ID must be a string or number");
    }
    if (typeof name !== "string" || name.trim() === "") {
      throw new Error("Name must be a non-empty string");
    }
    if (typeof description !== "string" || description.trim() === "") {
      throw new Error("Description must be a non-empty string");
    }

    // Check for duplicate ID
    if (WarriorType.wTypes.some((wt) => wt.warriorTypeId === id)) {
      throw new Error(`WarriorType with ID ${id} already exists`);
    }

    this.warriorTypeId = id;
    this.warriorTypeName = name.trim();
    this.warriorTypeDescription = description.trim();
    WarriorType.wTypes.push(this);
  }

  updateWarriorType(valueToEdit, newValue) {
    const validProperties = ["name", "description"];
    if (!validProperties.includes(valueToEdit)) {
      throw new Error(`Invalid property to update: ${valueToEdit}`);
    }

    const id = findId(WarriorType.wTypes, this.warriorTypeId, "warriorTypeId");
    if (id === -1) {
      throw new Error("WarriorType not found");
    }

    if (valueToEdit === "name") {
      if (typeof newValue !== "string" || newValue.trim() === "") {
        throw new Error("Name must be a non-empty string");
      }
      WarriorType.wTypes[id].warriorTypeName = newValue.trim();
    } else if (valueToEdit === "description") {
      if (typeof newValue !== "string" || newValue.trim() === "") {
        throw new Error("Description must be a non-empty string");
      }
      WarriorType.wTypes[id].warriorTypeDescription = newValue.trim();
    }
    return WarriorType.wTypes[id];
  }

  deleteWarriorType() {
    const initialLength = WarriorType.wTypes.length;
    WarriorType.wTypes = deleteFromArrayOfObjects(
      WarriorType.wTypes,
      this.warriorTypeId,
      "warriorTypeId"
    );
    if (WarriorType.wTypes.length === initialLength) {
      throw new Error("WarriorType not found or could not be deleted");
    }
  }

  viewWarriorTypeInfo() {
    return {
      warriorTypeId: this.warriorTypeId,
      warriorTypeName: this.warriorTypeName,
      warriorTypeDescription: this.warriorTypeDescription,
    };
  }

  static viewAllWarriorTypes() {
    return this.wTypes;
  }
}

class Breed {
  static breeds = [];

  constructor(id, name, description) {
    if (typeof id !== "string" && typeof id !== "number") {
      throw new Error("ID must be a string or number");
    }
    if (typeof name !== "string" || name.trim() === "") {
      throw new Error("Name must be a non-empty string");
    }
    if (typeof description !== "string" || description.trim() === "") {
      throw new Error("Description must be a non-empty string");
    }

    // Check for duplicate ID
    if (Breed.breeds.some((b) => b.breedId === id)) {
      throw new Error(`Breed with ID ${id} already exists`);
    }

    this.breedId = id;
    this.breedName = name.trim();
    this.breedDescription = description.trim();
    Breed.breeds.push(this);
  }

  updateBreed(valueToEdit, newValue) {
    const validProperties = ["name", "description"];
    if (!validProperties.includes(valueToEdit)) {
      throw new Error(`Invalid property to update: ${valueToEdit}`);
    }

    const id = findId(Breed.breeds, this.breedId, "breedId");
    if (id === -1) {
      throw new Error("Breed not found");
    }

    if (valueToEdit === "name") {
      if (typeof newValue !== "string" || newValue.trim() === "") {
        throw new Error("Name must be a non-empty string");
      }
      Breed.breeds[id].breedName = newValue.trim();
    } else if (valueToEdit === "description") {
      if (typeof newValue !== "string" || newValue.trim() === "") {
        throw new Error("Description must be a non-empty string");
      }
      Breed.breeds[id].breedDescription = newValue.trim();
    }
    return Breed.breeds[id];
  }

  deleteBreed() {
    const initialLength = Breed.breeds.length;
    Breed.breeds = deleteFromArrayOfObjects(
      Breed.breeds,
      this.breedId,
      "breedId"
    );
    if (Breed.breeds.length === initialLength) {
      throw new Error("Breed not found or could not be deleted");
    }
  }

  viewBreedInfo() {
    return {
      breedId: this.breedId,
      breedName: this.breedName,
      breedDescription: this.breedDescription,
    };
  }

  static viewAllBreeds() {
    return this.breeds;
  }
}

class Power {
  static powers = [];

  constructor(id, name, dmg, effect, description) {
    if (typeof id !== "string" && typeof id !== "number") {
      throw new Error("ID must be a string or number");
    }
    if (typeof name !== "string" || name.trim() === "") {
      throw new Error("Name must be a non-empty string");
    }
    if (typeof dmg !== "number" || dmg < 0) {
      throw new Error("Damage must be a non-negative number");
    }
    if (typeof effect !== "string" || effect.trim() === "") {
      throw new Error("Effect must be a non-empty string");
    }
    if (typeof description !== "string" || description.trim() === "") {
      throw new Error("Description must be a non-empty string");
    }

    // Check for duplicate ID
    if (Power.powers.some((p) => p.powerId === id)) {
      throw new Error(`Power with ID ${id} already exists`);
    }

    this.powerId = id;
    this.powerName = name.trim();
    this.powerDmg = dmg;
    this.powerEffect = effect.trim();
    this.powerDescription = description.trim();
    Power.powers.push(this);
  }

  updatePower(valueToEdit, newValue) {
    const validProperties = ["name", "dmg", "effect", "description"];
    if (!validProperties.includes(valueToEdit)) {
      throw new Error(`Invalid property to update: ${valueToEdit}`);
    }

    const id = findId(Power.powers, this.powerId, "powerId");
    if (id === -1) {
      throw new Error("Power not found");
    }

    if (valueToEdit === "name") {
      if (typeof newValue !== "string" || newValue.trim() === "") {
        throw new Error("Name must be a non-empty string");
      }
      Power.powers[id].powerName = newValue.trim();
    } else if (valueToEdit === "dmg") {
      if (typeof newValue !== "number" || newValue < 0) {
        throw new Error("Damage must be a non-negative number");
      }
      Power.powers[id].powerDmg = newValue;
    } else if (valueToEdit === "effect") {
      if (typeof newValue !== "string" || newValue.trim() === "") {
        throw new Error("Effect must be a non-empty string");
      }
      Power.powers[id].powerEffect = newValue.trim();
    } else if (valueToEdit === "description") {
      if (typeof newValue !== "string" || newValue.trim() === "") {
        throw new Error("Description must be a non-empty string");
      }
      Power.powers[id].powerDescription = newValue.trim();
    }
    return Power.powers[id];
  }

  deletePower() {
    const initialLength = Power.powers.length;
    Power.powers = deleteFromArrayOfObjects(
      Power.powers,
      this.powerId,
      "powerId"
    );
    if (Power.powers.length === initialLength) {
      throw new Error("Power not found or could not be deleted");
    }
  }

  viewPowerInfo() {
    return {
      powerId: this.powerId,
      powerName: this.powerName,
      powerDmg: this.powerDmg,
      powerEffect: this.powerEffect,
      powerDescription: this.powerDescription,
    };
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
  new Breed(5, "Celestial", "Cosmic beings from Mount Targon"),
];

// Create warrior types
const types = [
  new WarriorType(1, "Assassin", "High burst damage, low health"),
  new WarriorType(2, "Tank", "High health, high resistance"),
  new WarriorType(3, "Mage", "High magic damage, low health"),
  new WarriorType(4, "Marksman", "High sustained damage, low health"),
  new WarriorType(5, "Support", "High utility, medium health"),
];

// Create powers
const powers = [
  new Power(1, "Blinding Dart", 70, "Blind", "Blinds and damages the target"),
  new Power(2, "Move Quick", 0, "Speed", "Increases movement speed"),
  new Power(3, "Toxic Shot", 40, "Poison", "Poisons the target"),
  new Power(4, "Noxious Trap", 60, "Trap", "Places a poisonous trap"),
  new Power(5, "Mystic Shot", 80, "Physical", "Fires an energy bolt"),
  new Power(
    6,
    "Infinite Duress",
    100,
    "Suppress",
    "Suppresses and damages target"
  ),
  new Power(7, "Death Mark", 120, "Execute", "Marks target for death"),
  new Power(8, "Final Spark", 200, "Magic", "Fires a powerful laser beam"),
  new Power(9, "Crowstorm", 150, "AoE", "Area damage and fear"),
  new Power(
    10,
    "Demacian Justice",
    180,
    "Execute",
    "Powerful executing strike"
  ),
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
  new Warrior(9, "Soraka", 75, 120, types[4], races[4]),
  new Warrior(10, "Pantheon", 100, 100, types[1], races[4]),
];
//assign 5 random powers to warriors
for (let i = 0; i < warriors.length; i++) {
  for (let j = 0; j < 5; j++) {
    const randomIndex = Math.floor(Math.random() * powers.length);
    warriors[i].addPower(powers[randomIndex]);
  }
}
