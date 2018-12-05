//enumerate 枚举
enum Card {
	clubs,
	spades,
	diamonds,
	hearts
}
var card = Card.clubs;

enum Color {
	red,
	green,
	blue
}
enum Color {
	lightred = 3,
	darkgreen,
	lightblue
}

enum Animal {
	none = 0,
	possesclaws = 1 << 0,
	flying = 1 << 1,
	consumesfish = 1 << 2,
	endangered = 1 << 3
}