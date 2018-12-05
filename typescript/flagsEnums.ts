enum Animal {
	None = 0,
	PossesClaw = 1 << 0,
	Files = 1 << 1,
}
function printAnimalAbilities(animal) {
	var animFlags = animal.flags;
	if(animFlags & animFlags.PossesClaw) {
		console.log('The animal has claws');
	}
	if(animFlags & animFlags.Files) {
		console.log('The animal can fly');
	}
	if(animFlags === animFlags.None) {
		console.log('nothing');
	}
}
var animal = {flags: Animal.None};
printAnimalAbilities(animal);
animal.flags |= Animal.PossesClaw;
printAnimalAbilities(animal);
animal.flags &= ~Animal.PossesClaw;
printAnimalAbilities(animal);
animal.flags |= Animal.PossesClaw | Animal.Files;
printAnimalAbilities(animal);
