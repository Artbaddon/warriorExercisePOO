function deleteFromArrayOfObjects(array, item) {
  return array.filter((ele) => ele.breedId !== item);
}

class Warrior {
  constructor(id, name, health, energy) {
    (this.warriorId = id),
      (this.warriorName = name),
      (this.warriorHealth = health),
      (this.warriorEnergy = energy),
      (this.breed = null),
      (this.powers = []);
  }
}
class WarriorType {
  constructor(id, name, description) {
    (this.warriorTypeId = id),
      (this.warriorTypeName = name),
      (this.warriorTypeDescription = description);
  }
}

class Breed {
  static breeds = [];

  // Create a constructor
  constructor(id, name, description) {
    (this.breedId = id),
      (this.breedName = name),
      (this.breedDescription = description);
  }

  //createBreed is a static method because you can use it before instancing the actual Breed Class.
  static createBreed(id, name, description) {
    //Create a breed and push it to the breeds array
    const breed = new Breed(id, name, description);
    Breed.breeds.push(breed);
    return breed;
  }

  deleteBreed() {
    (this.breedName = null), (this.breedDescription = null);
    // Find the item, delete it from the array
    Breed.breeds = deleteFromArrayOfObjects(Breed.breeds, this.breedId);
  }

  viewBreedInfo() {
    return [this.breedId, this.breedName, this.breedDescription];
  }

  static viewAllBreeds() {
    return this.breeds;
  }
  updateBreed() {}
}

const breed = Breed.createBreed(1, "PEPE", "Pela Gente");

console.log("Initial breed:", breed);
console.log("All breeds before delete:", Breed.viewAllBreeds());
breed.deleteBreed();
console.log("All breeds after delete:", Breed.viewAllBreeds());
