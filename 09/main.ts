import './extensions/arrayExtensions'

class RopeGrid {
    width: number;
    height: number;
    head: Coordinate;
    tail: Coordinate;

    constructor(width: number, height: number, head: Coordinate, tail: Coordinate, start: Coordinate) {
        this.width = width;
        this.height = height;
        this.head = head;
        this.tail = tail;
    }
}

class Coordinate {
    public readonly x: number;
    public readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public static compare(c1: Coordinate, c2: Coordinate): boolean {
        return c1.x == c2.x && c1.y == c2.y;
    }
}

var tailHistory = new Array<Coordinate>();

var c1 = new Coordinate(1,2);
tailHistory.push(c1);
tailHistory.push(c1);
console.log(tailHistory.length);

var uniqueTailCoordinates = tailHistory.unique(Coordinate.compare);
console.log(uniqueTailCoordinates.length);