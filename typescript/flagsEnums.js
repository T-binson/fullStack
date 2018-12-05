var Animal;
(function (Animal) {
    Animal[Animal["None"] = 0] = "None";
    Animal[Animal["PossesClaw"] = 1] = "PossesClaw";
    Animal[Animal["Files"] = 2] = "Files";
})(Animal || (Animal = {}));

function printAnimalAbilities(animal) {
    var animFlags = animal.flags;
    if (animFlags & animFlags.PossesClaw) {
        console.log('The animal has claws');
    }
    if (animFlags & animFlags.Files) {
        console.log('The animal can fly');
    }
    if (animFlags === animFlags.None) {
        console.log('nothing');
    }
}

var animal = { flags: Animal.None };
printAnimalAbilities(animal);
animal.flags |= Animal.PossesClaw;
printAnimalAbilities(animal);
animal.flags &= ~Animal.PossesClaw;
printAnimalAbilities(animal);
animal.flags |= Animal.PossesClaw | Animal.Files;
printAnimalAbilities(animal);
