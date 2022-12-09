"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./extensions/arrayExtensions");
class RopeGrid {
    constructor(width, height, head, tail, start) {
        this.width = width;
        this.height = height;
        this.head = head;
        this.tail = tail;
    }
}
class Coordinate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static compare(c1, c2) {
        return c1.x == c2.x && c1.y == c2.y;
    }
}
var tailHistory = new Array();
var c1 = new Coordinate(1, 2);
tailHistory.push(c1);
tailHistory.push(c1);
console.log(tailHistory.length);
var uniqueTailCoordinates = tailHistory.unique(Coordinate.compare);
console.log(uniqueTailCoordinates.length);
