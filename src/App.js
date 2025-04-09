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

const races = [
  new Breed(1, "Human", "Regular humans from various islands"),
  new Breed(2, "Fishman", "Humanoid fish-people from the sea"),
  new Breed(3, "Giant", "Enormous humanoids from Elbaf"),
  new Breed(4, "Mink", "Animal-human hybrids from Zou"),
  new Breed(5, "Cyborg", "Partially mechanical humans"),
];

const types = [
  new WarriorType(1, "Swordsman", "Masters of blade combat"),
  new WarriorType(2, "Brawler", "Close-quarters combat specialists"),
  new WarriorType(3, "Sniper", "Long-range fighters"),
  new WarriorType(4, "Navigator", "Skilled in weather manipulation"),
  new WarriorType(5, "Captain", "Strong leaders with versatile skills"),
];

const powers = [
  new Power(1, "Gomu Gomu no Mi", 80, "Rubber", "Turns body into rubber"),
  new Power(
    2,
    "Haki",
    70,
    "Willpower",
    "Armament, Observation, or Conqueror's Haki"
  ),
  new Power(3, "Soru", 50, "Speed", "High-speed movement technique"),
  new Power(4, "Santoryu", 90, "Swords", "Three-sword style techniques"),
  new Power(5, "Diable Jambe", 85, "Fire", "Legs ignite with flames"),
  new Power(6, "Usopp Hammer", 60, "Impact", "Powerful hammer attacks"),
  new Power(7, "Tact", 40, "Weather", "Weather manipulation"),
  new Power(8, "Chopper Medicine", 30, "Heal", "Medical knowledge and skills"),
  new Power(9, "Franky Radical Beam", 100, "Laser", "Powerful laser attack"),
  new Power(10, "Brook's Music", 55, "Soul", "Soul-powered music attacks"),
];

// Create warriors id, name, health, energy, warriorType, breed
const warriors = [
  // Human Warriors
  new Warrior(1, "Monkey D. Luffy", 200, 150, types[4], races[0]),
  new Warrior(2, "Roronoa Zoro", 180, 130, types[0], races[0]),
  // Fishman Warriors
  new Warrior(3, "Jinbe", 190, 120, types[2], races[1]),
  // Giant Warriors
  new Warrior(4, "Hajrudin", 250, 100, types[1], races[2]),
  // Mink Warriors
  new Warrior(5, "Nekomamushi", 170, 140, types[1], races[3]),
  new Warrior(6, "Inuarashi", 170, 140, types[1], races[3]),
  // Cyborg Warriors
  new Warrior(7, "Franky", 160, 120, types[1], races[4]),
  // Other Humans
  new Warrior(8, "Sanji", 150, 150, types[1], races[0]),
  new Warrior(9, "Nami", 100, 110, types[3], races[0]),
  new Warrior(10, "Usopp", 110, 100, types[2], races[0]),
];

// Assign 5 random powers to warriors
for (let i = 0; i < warriors.length; i++) {
  for (let j = 0; j < 5; j++) {
    const randomIndex = Math.floor(Math.random() * powers.length);
    try {
      warriors[i].addPower(powers[randomIndex]);
    } catch (e) {
      // Skip if power already exists for this warrior
      j--;
    }
  }
}
