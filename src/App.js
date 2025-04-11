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

// UI Management Code
document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('startBtn');
    const startView = document.getElementById('startView');
    const cardsView = document.getElementById('cardsView');
    const listView = document.getElementById('listView');
    const backToStart = document.getElementById('backToStart');
    const entityModal = new bootstrap.Modal(document.getElementById('entityModal'));
    const viewModal = new bootstrap.Modal(document.getElementById('viewModal'));

    // Start button click handler
    startBtn.addEventListener('click', () => {
        startView.classList.add('d-none');
        cardsView.classList.remove('d-none');
    });

    // Back to start button handler
    backToStart.addEventListener('click', () => {
        cardsView.classList.add('d-none');
        startView.classList.remove('d-none');
    });

    // View All buttons click handlers
    document.querySelectorAll('.view-all').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const type = this.getAttribute('data-type');
            console.log('View All clicked for:', type);
            showListView(type);
        });
    });

    // Create New button click handlers
    document.querySelectorAll('.create-new').forEach(button => {
        button.addEventListener('click', () => {
            const type = button.dataset.type;
            showCreateModal(type);
        });
    });

    function showListView(type) {
        let items = [];
        let title = '';

        switch(type) {
            case 'warrior':
                items = Warrior.viewAllWarriors();
                title = 'Warriors';
                break;
            case 'warriorType':
                items = WarriorType.viewAllWarriorTypes();
                title = 'Warrior Types';
                break;
            case 'breed':
                items = Breed.viewAllBreeds();
                title = 'Breeds';
                break;
            case 'power':
                items = Power.viewAllPowers();
                title = 'Powers';
                break;
        }

        const listView = document.getElementById('listView');
        listView.innerHTML = `
            <div class="container-fluid py-3">
                <div class="position-fixed end-0 top-50 translate-middle-y me-3 d-flex flex-column gap-2">
                    <button class="btn btn-secondary btn-sm" id="backButton">
                        <i class="fas fa-arrow-left"></i> Back
                    </button>
                    <button class="btn btn-success btn-sm" id="createButton">
                        <i class="fas fa-plus"></i> Create
                    </button>
                </div>
                <div id="listContent" class="row g-3">
                </div>
            </div>
        `;

        const listContent = document.getElementById('listContent');
        listContent.innerHTML = '';

        items.forEach(item => {
            const col = document.createElement('div');
            col.className = 'col-lg-4 col-md-6';
            
            switch(type) {
                case 'warrior':
                    col.innerHTML = `
                        <div class="card h-100 shadow-sm">
                            <div class="card-body p-3">
                                <div class="d-flex justify-content-between align-items-center">
                                    <h5 class="fs-5 mb-0">${item.warriorName}</h5>
                                    <span class="badge bg-secondary">ID: ${item.warriorId}</span>
                                </div>
                                <div class="d-flex justify-content-between mt-2">
                                    <span class="fs-6">
                                        <i class="fas fa-heart text-danger"></i> ${item.warriorHealth}
                                    </span>
                                    <span class="fs-6">
                                        <i class="fas fa-bolt text-warning"></i> ${item.warriorEnergy}
                                    </span>
                                </div>
                                <div class="d-flex justify-content-between mt-2">
                                    <span class="fs-6">${item.breed.breedName}</span>
                                    <span class="fs-6">${item.warriorType.warriorTypeName}</span>
                                </div>
                                <div class="mt-2">
                                    <div class="d-flex flex-wrap gap-1">
                                        ${item.powers.map(power => 
                                            `<span class="badge bg-info">${power.powerName}</span>`
                                        ).join('')}
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer p-0 bg-transparent">
                                <div class="btn-group btn-group-sm w-100">
                                    <button class="btn btn-outline-info view-item" data-type="${type}" data-id="${item.warriorId}">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-outline-warning edit-item" data-type="${type}" data-id="${item.warriorId}">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-outline-danger delete-item" data-type="${type}" data-id="${item.warriorId}">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                    break;
                case 'warriorType':
                case 'breed':
                case 'power':
                    col.innerHTML = `
                        <div class="card h-100 shadow-sm">
                            <div class="card-body p-3">
                                <div class="d-flex justify-content-between align-items-center">
                                    <h5 class="fs-5 mb-0">${item[type + 'Name']}</h5>
                                    <span class="badge bg-secondary">ID: ${item[type + 'Id']}</span>
                                </div>
                                <p class="card-text small mb-0">${item[type + 'Description']}</p>
                                ${type === 'power' ? `
                                    <div class="d-flex justify-content-between mt-2">
                                        <small class="fs-6">DMG: ${item.powerDmg}</small>
                                        <small class="fs-6">Effect: ${item.powerEffect}</small>
                                    </div>
                                ` : ''}
                            </div>
                            <div class="card-footer p-0 bg-transparent">
                                <div class="btn-group btn-group-sm w-100">
                                    <button class="btn btn-outline-info view-item" data-type="${type}" data-id="${item[type + 'Id']}">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-outline-warning edit-item" data-type="${type}" data-id="${item[type + 'Id']}">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-outline-danger delete-item" data-type="${type}" data-id="${item[type + 'Id']}">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                    break;
            }
            
            listContent.appendChild(col);
        });

        // Show list view and hide cards view
        document.getElementById('cardsView').classList.add('d-none');
        listView.classList.remove('d-none');

        // Add event listeners
        document.getElementById('backButton').addEventListener('click', () => {
            listView.classList.add('d-none');
            document.getElementById('cardsView').classList.remove('d-none');
        });

        document.getElementById('createButton').addEventListener('click', () => {
            showCreateModal(type);
        });

        addItemActionListeners();
    }

    function addItemActionListeners() {
        // View button listeners
        document.querySelectorAll('.view-item').forEach(button => {
            button.addEventListener('click', () => {
                const type = button.dataset.type;
                const id = button.dataset.id;
                showViewModal(type, id);
            });
        });

        // Edit button listeners
        document.querySelectorAll('.edit-item').forEach(button => {
            button.addEventListener('click', () => {
                const type = button.dataset.type;
                const id = button.dataset.id;
                showEditModal(type, id);
            });
        });

        // Delete button listeners
        document.querySelectorAll('.delete-item').forEach(button => {
            button.addEventListener('click', () => {
                const type = button.dataset.type;
                const id = button.dataset.id;
                handleDelete(type, id);
            });
        });
    }

    function showViewModal(type, id) {
        const viewModalBody = document.getElementById('viewModalBody');
        let item;

        switch(type) {
            case 'warrior':
                item = Warrior.warriors.find(w => w.warriorId == id);
                if (item) {
                    const info = item.viewWarriorInfo();
                    viewModalBody.innerHTML = `
                        <p><strong>ID:</strong> ${info.warrior.id}</p>
                        <p><strong>Name:</strong> ${info.warrior.name}</p>
                        <p><strong>Health:</strong> ${info.warrior.health}</p>
                        <p><strong>Energy:</strong> ${info.warrior.energy}</p>
                        <p><strong>Breed:</strong> ${info.warrior.breed.breedName}</p>
                        <p><strong>Warrior Type:</strong> ${info.warrior.warriorType.warriorTypeName}</p>
                        <p><strong>Powers:</strong> ${typeof info.powers === 'string' ? info.powers : 
                            info.powers.map(p => p.powerName).join(', ')}</p>
                    `;
                }
                break;
            case 'warriorType':
                item = WarriorType.wTypes.find(wt => wt.warriorTypeId == id);
                if (item) {
                    const info = item.viewWarriorTypeInfo();
                    viewModalBody.innerHTML = `
                        <p><strong>ID:</strong> ${info.warriorTypeId}</p>
                        <p><strong>Name:</strong> ${info.warriorTypeName}</p>
                        <p><strong>Description:</strong> ${info.warriorTypeDescription}</p>
                    `;
                }
                break;
            case 'breed':
                item = Breed.breeds.find(b => b.breedId == id);
                if (item) {
                    const info = item.viewBreedInfo();
                    viewModalBody.innerHTML = `
                        <p><strong>ID:</strong> ${info.breedId}</p>
                        <p><strong>Name:</strong> ${info.breedName}</p>
                        <p><strong>Description:</strong> ${info.breedDescription}</p>
                    `;
                }
                break;
            case 'power':
                item = Power.powers.find(p => p.powerId == id);
                if (item) {
                    const info = item.viewPowerInfo();
                    viewModalBody.innerHTML = `
                        <p><strong>ID:</strong> ${info.powerId}</p>
                        <p><strong>Name:</strong> ${info.powerName}</p>
                        <p><strong>Damage:</strong> ${info.powerDmg}</p>
                        <p><strong>Effect:</strong> ${info.powerEffect}</p>
                        <p><strong>Description:</strong> ${info.powerDescription}</p>
                    `;
                }
                break;
        }

        viewModal.show();
    }

    function showCreateModal(type) {
        const modalTitle = document.querySelector('#entityModal .modal-title');
        const form = document.getElementById('entityForm');
        modalTitle.textContent = `Create New ${type.charAt(0).toUpperCase() + type.slice(1)}`;
        
        // Clear previous form
        form.innerHTML = '';

        // Create form based on type
        switch(type) {
            case 'warrior':
                form.innerHTML = `
                    <div class="mb-3">
                        <label class="form-label">ID</label>
                        <input type="number" class="form-control" name="id" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Name</label>
                        <input type="text" class="form-control" name="name" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Health</label>
                        <input type="number" class="form-control" name="health" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Energy</label>
                        <input type="number" class="form-control" name="energy" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Warrior Type</label>
                        <select class="form-control" name="warriorType" required>
                            ${WarriorType.wTypes.map(wt => 
                                `<option value="${wt.warriorTypeId}">${wt.warriorTypeName}</option>`
                            ).join('')}
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Breed</label>
                        <select class="form-control" name="breed" required>
                            ${Breed.breeds.map(b => 
                                `<option value="${b.breedId}">${b.breedName}</option>`
                            ).join('')}
                        </select>
                    </div>
                `;
                break;
            case 'warriorType':
                form.innerHTML = `
                    <div class="mb-3">
                        <label class="form-label">ID</label>
                        <input type="number" class="form-control" name="id" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Name</label>
                        <input type="text" class="form-control" name="name" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Description</label>
                        <textarea class="form-control" name="description" required></textarea>
                    </div>
                `;
                break;
            case 'breed':
                form.innerHTML = `
                    <div class="mb-3">
                        <label class="form-label">ID</label>
                        <input type="number" class="form-control" name="id" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Name</label>
                        <input type="text" class="form-control" name="name" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Description</label>
                        <textarea class="form-control" name="description" required></textarea>
                    </div>
                `;
                break;
            case 'power':
                form.innerHTML = `
                    <div class="mb-3">
                        <label class="form-label">ID</label>
                        <input type="number" class="form-control" name="id" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Name</label>
                        <input type="text" class="form-control" name="name" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Damage</label>
                        <input type="number" class="form-control" name="dmg" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Effect</label>
                        <input type="text" class="form-control" name="effect" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Description</label>
                        <textarea class="form-control" name="description" required></textarea>
                    </div>
                `;
                break;
        }

        // Set up save button handler
        const saveButton = document.getElementById('saveEntity');
        saveButton.onclick = () => handleCreate(type);

        entityModal.show();
    }

    function handleCreate(type) {
        const form = document.getElementById('entityForm');
        const formData = new FormData(form);
        
        try {
            switch(type) {
                case 'warrior':
                    const selectedWarriorType = WarriorType.wTypes.find(wt => wt.warriorTypeId == formData.get('warriorType'));
                    const selectedBreed = Breed.breeds.find(b => b.breedId == formData.get('breed'));
                    
                    new Warrior(
                        Number(formData.get('id')),
                        formData.get('name'),
                        Number(formData.get('health')),
                        Number(formData.get('energy')),
                        selectedWarriorType,
                        selectedBreed
                    );
                    break;
                case 'warriorType':
                    new WarriorType(
                        Number(formData.get('id')),
                        formData.get('name'),
                        formData.get('description')
                    );
                    break;
                case 'breed':
                    new Breed(
                        Number(formData.get('id')),
                        formData.get('name'),
                        formData.get('description')
                    );
                    break;
                case 'power':
                    new Power(
                        Number(formData.get('id')),
                        formData.get('name'),
                        Number(formData.get('dmg')),
                        formData.get('effect'),
                        formData.get('description')
                    );
                    break;
            }

            entityModal.hide();
            showListView(type); // Refresh the list
            alert('Created successfully!');
        } catch (error) {
            alert('Error: ' + error.message);
        }
    }

    function showEditModal(type, id) {
        const modalTitle = document.querySelector('#entityModal .modal-title');
        const form = document.getElementById('entityForm');
        modalTitle.textContent = `Edit ${type.charAt(0).toUpperCase() + type.slice(1)}`;
        
        let item;
        switch(type) {
            case 'warrior':
                item = Warrior.warriors.find(w => w.warriorId == id);
                if (item) {
                    form.innerHTML = `
                        <input type="hidden" name="id" value="${item.warriorId}">
                        <div class="mb-3">
                            <label class="form-label">Name</label>
                            <input type="text" class="form-control" name="name" value="${item.warriorName}" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Health</label>
                            <input type="number" class="form-control" name="health" value="${item.warriorHealth}" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Energy</label>
                            <input type="number" class="form-control" name="energy" value="${item.warriorEnergy}" required>
                        </div>
                    `;
                }
                break;
            case 'warriorType':
                item = WarriorType.wTypes.find(wt => wt.warriorTypeId == id);
                if (item) {
                    form.innerHTML = `
                        <input type="hidden" name="id" value="${item.warriorTypeId}">
                        <div class="mb-3">
                            <label class="form-label">Name</label>
                            <input type="text" class="form-control" name="name" value="${item.warriorTypeName}" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Description</label>
                            <textarea class="form-control" name="description" required>${item.warriorTypeDescription}</textarea>
                        </div>
                    `;
                }
                break;
            case 'breed':
                item = Breed.breeds.find(b => b.breedId == id);
                if (item) {
                    form.innerHTML = `
                        <input type="hidden" name="id" value="${item.breedId}">
                        <div class="mb-3">
                            <label class="form-label">Name</label>
                            <input type="text" class="form-control" name="name" value="${item.breedName}" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Description</label>
                            <textarea class="form-control" name="description" required>${item.breedDescription}</textarea>
                        </div>
                    `;
                }
                break;
            case 'power':
                item = Power.powers.find(p => p.powerId == id);
                if (item) {
                    form.innerHTML = `
                        <input type="hidden" name="id" value="${item.powerId}">
                        <div class="mb-3">
                            <label class="form-label">Name</label>
                            <input type="text" class="form-control" name="name" value="${item.powerName}" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Damage</label>
                            <input type="number" class="form-control" name="dmg" value="${item.powerDmg}" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Effect</label>
                            <input type="text" class="form-control" name="effect" value="${item.powerEffect}" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Description</label>
                            <textarea class="form-control" name="description" required>${item.powerDescription}</textarea>
                        </div>
                    `;
                }
                break;
        }

        // Set up save button handler
        const saveButton = document.getElementById('saveEntity');
        saveButton.onclick = () => handleUpdate(type, id);

        entityModal.show();
    }

    function handleUpdate(type, id) {
        const form = document.getElementById('entityForm');
        const formData = new FormData(form);
        
        try {
            let item;
            switch(type) {
                case 'warrior':
                    item = Warrior.warriors.find(w => w.warriorId == id);
                    if (item) {
                        item.updateWarrior('name', formData.get('name'));
                        item.updateWarrior('health', Number(formData.get('health')));
                        item.updateWarrior('energy', Number(formData.get('energy')));
                    }
                    break;
                case 'warriorType':
                    item = WarriorType.wTypes.find(wt => wt.warriorTypeId == id);
                    if (item) {
                        item.updateWarriorType('name', formData.get('name'));
                        item.updateWarriorType('description', formData.get('description'));
                    }
                    break;
                case 'breed':
                    item = Breed.breeds.find(b => b.breedId == id);
                    if (item) {
                        item.updateBreed('name', formData.get('name'));
                        item.updateBreed('description', formData.get('description'));
                    }
                    break;
                case 'power':
                    item = Power.powers.find(p => p.powerId == id);
                    if (item) {
                        item.updatePower('name', formData.get('name'));
                        item.updatePower('dmg', Number(formData.get('dmg')));
                        item.updatePower('effect', formData.get('effect'));
                        item.updatePower('description', formData.get('description'));
                    }
                    break;
            }

            entityModal.hide();
            showListView(type); // Refresh the list
            alert('Updated successfully!');
        } catch (error) {
            alert('Error: ' + error.message);
        }
    }

    function handleDelete(type, id) {
        if (!confirm('Are you sure you want to delete this item?')) {
            return;
        }

        try {
            let item;
            switch(type) {
                case 'warrior':
                    item = Warrior.warriors.find(w => w.warriorId == id);
                    if (item) item.deleteWarrior();
                    break;
                case 'warriorType':
                    item = WarriorType.wTypes.find(wt => wt.warriorTypeId == id);
                    if (item) item.deleteWarriorType();
                    break;
                case 'breed':
                    item = Breed.breeds.find(b => b.breedId == id);
                    if (item) item.deleteBreed();
                    break;
                case 'power':
                    item = Power.powers.find(p => p.powerId == id);
                    if (item) item.deletePower();
                    break;
            }

            showListView(type); // Refresh the list
            alert('Deleted successfully!');
        } catch (error) {
            alert('Error: ' + error.message);
        }
    }
});

