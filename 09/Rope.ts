import { Coordinate } from "./coordinate";
import { Knot } from "./knot";

export class Rope {
    private _head: Knot;
    private _tailHistory: Array<Coordinate>;

    constructor(numKnots: number) {
        this._head = this.buildRope(numKnots);
        this._tailHistory = new Array<Coordinate>(this._head.position.copy());
    }

    public moveNorth(): void {
        var newTailCoordinate = this._head.moveUp();
        console.log("U " + this.toString());
        console.log(this.draw());
        if (newTailCoordinate != null) {
            this._tailHistory.push(newTailCoordinate.copy());
        }
    }

    public moveEast(): void {
        var newTailCoordinate = this._head.moveRight();
        console.log("R " + this.toString());
        console.log(this.draw());
        if (newTailCoordinate != null) {
            this._tailHistory.push(newTailCoordinate.copy());
        }
    }

    public moveSouth(): void {
        var newTailCoordinate = this._head.moveDown();
        console.log("D " + this.toString());
        console.log(this.draw());
        if (newTailCoordinate != null) {
            this._tailHistory.push(newTailCoordinate.copy());
        }
    }

    public moveWest(): void {
        var newTailCoordinate = this._head.moveLeft();
        console.log("L " + this.toString());
        console.log(this.draw());
        if (newTailCoordinate != null) {
            this._tailHistory.push(newTailCoordinate.copy());
        }
    }

    public getUniqueTailPositionCount() {
        console.log(this._tailHistory)
        return this._tailHistory.unique(Coordinate.compare).length;
    }

    public getCoordinates(knot = this._head): Array<Coordinate> {
        return knot.tail != null
            ? new Array<Coordinate>(knot.position.copy(), ...this.getCoordinates(knot.tail))
            : new Array<Coordinate>(knot.position.copy());
    }

    public toString(knot = this._head): string {
        var str = '';
        this.getCoordinates().forEach(c => {
            str = str.concat(`${c.x},${c.y} `);
        });

        return str;
    }

    public draw(): string {
        var grid = new Array<Array<string>>();
        var offset = this.maxAbsoluteCoordinate();
        var coordinates = this.getCoordinates();

        for (var j = offset.y * 2; j >= 0; j--) {
                grid[j] = new Array<string>();
                for (var i = offset.x * 2; i >= 0; i--) {
                grid[j][i] = '.';
            };
        };

        var coordinates = this.getCoordinates(); 
        for (var n = 0; n < coordinates.length; n++) {
            var c = coordinates[n];
            grid[c.y + offset.y][c.x + offset.x] = n.toString();
        };

        var rows = new Array<string>;
        for(j = grid.length - 1; j >= 0; j--) {
            rows.push(grid[j].toString().replaceAll(',', ''))
        };

        return rows.join('\r\n');
    }

    private maxAbsoluteCoordinate(knot = this._head, xMax = 0, yMax = 0): Coordinate {
        if (knot.tail != null) {
            var xAbs = Math.abs(knot.position.x);
            var yAbs = Math.abs(knot.position.y);
            xMax = xMax > xAbs ? xMax : xAbs;
            yMax = yMax > yAbs ? yMax : yAbs;
            return this.maxAbsoluteCoordinate(knot.tail, xMax, yMax);
        } else {
            return new Coordinate(xMax, yMax);
        }
    }

    private buildRope(numKnots: number): Knot {
        return this.buildKnots(numKnots, new Knot())
    }

    private buildKnots(depth: number, currKnot: Knot): Knot {
        console.log(`build knot ${depth}`)
        if (depth > 1) {
            var nextKnot = new Knot(currKnot);
            return this.buildKnots(depth - 1, nextKnot);
        }

        return currKnot;
    }
}