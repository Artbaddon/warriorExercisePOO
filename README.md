# Warrior Management System

A dynamic web application for managing warriors, breeds, powers, and warrior types in a fantasy RPG-style system. Built with vanilla JavaScript and Bootstrap for a responsive and intuitive user interface.

## 🌟 Features

- **Warriors Management**: Create, view, edit, and delete warriors with unique attributes
  - Health and Energy stats
  - Breed assignment
  - Warrior Type classification
  - Multiple Power assignments

- **Breed System**: Manage different breeds including
  - Humans
  - Fishmen
  - Giants
  - Minks
  - Cyborgs

- **Warrior Types**: Handle different warrior classifications
  - Swordsman
  - Brawler
  - Sniper
  - Navigator
  - Captain

- **Power System**: Manage various powers with
  - Damage stats
  - Special effects
  - Detailed descriptions

## 🛠️ Class Structure

### Warrior Class
```javascript
class Warrior {
    constructor(id, name, health, energy, warriorType, breed)
    viewWarriorInfo()
    static viewAllWarriors()
    updateWarrior(valueToEdit, newValue)
    deleteWarrior()
    addPower(power)
    setBreed(breed)
    setWarriorType(warriorType)
}
```

### Breed Class
```javascript
class Breed {
    constructor(id, name, description)
    updateBreed(valueToEdit, newValue)
    deleteBreed()
    viewBreedInfo()
    static viewAllBreeds()
}
```

### WarriorType Class
```javascript
class WarriorType {
    constructor(id, name, description)
    updateWarriorType(valueToEdit, newValue)
    deleteWarriorType()
    viewWarriorTypeInfo()
    static viewAllWarriorTypes()
}
```

### Power Class
```javascript
class Power {
    constructor(id, name, dmg, effect, description)
    updatePower(valueToEdit, newValue)
    deletePower()
    viewPowerInfo()
    static viewAllPowers()
}
```

## 🎨 User Interface

- Responsive card-based layout
- Intuitive navigation system
- Easy-to-use CRUD operations
- Mobile-friendly design
- Interactive feedback for user actions

## 🔧 Technical Stack

- **Frontend**: 
  - HTML5
  - CSS3
  - JavaScript (ES6+)
  - Bootstrap 5.3.5
  - Font Awesome 5.15.4

- **Features**:
  - Object-Oriented Programming
  - Responsive Design
  - Event-Driven Architecture
  - Class-based State Management

## 🚀 Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/warrior-management-system.git
```

2. Open `index.html` in your browser

No additional setup or dependencies installation required!

## 💻 Usage

1. Click "Start" to begin
2. Choose a category (Warriors, Breeds, Types, or Powers)
3. Use the Create, View, Edit, and Delete functions as needed
4. Navigate between views using the Back button
5. Create new entries using the Create New button

## 🎯 Features Completed

- [x] Warrior class implementation
- [x] Power class implementation
- [x] Breed-warrior relationships
- [x] Power assignment system
- [x] Responsive user interface
- [x] CRUD operations for all entities
- [x] Data validation and error handling

## 👥 Author

- **Sebastian Sotelo** - *Initial work and implementation*

## 🙏 Acknowledgments

- Inspired by fantasy RPG games
- Built for learning and demonstration purposes
- Uses Bootstrap for responsive design
- Implements OOP principles in JavaScript

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details
