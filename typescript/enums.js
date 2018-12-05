//enumerate 枚举
var Card;
(function (Card) {
    Card[Card["clubs"] = 0] = "clubs";
    Card[Card["spades"] = 1] = "spades";
    Card[Card["diamonds"] = 2] = "diamonds";
    Card[Card["hearts"] = 3] = "hearts";
})(Card || (Card = {}));
var card = Card.clubs;
var Color;
(function (Color) {
    Color[Color["red"] = 0] = "red";
    Color[Color["green"] = 1] = "green";
    Color[Color["blue"] = 2] = "blue";
})(Color || (Color = {}));
(function (Color) {
    Color[Color["lightred"] = 3] = "lightred";
    Color[Color["darkgreen"] = 4] = "darkgreen";
    Color[Color["lightblue"] = 5] = "lightblue";
})(Color || (Color = {}));
var Animal;
(function (Animal) {
    Animal[Animal["none"] = 0] = "none";
    Animal[Animal["possesclaws"] = 1] = "possesclaws";
    Animal[Animal["flying"] = 2] = "flying";
    Animal[Animal["consumesfish"] = 4] = "consumesfish";
    Animal[Animal["endangered"] = 8] = "endangered";
})(Animal || (Animal = {}));
