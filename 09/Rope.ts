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
        if (newTailCoordinate != null) {
            this._tailHistory.push(newTailCoordinate.copy());
        }
    }

    public moveEast(): void {
        var newTailCoordinate = this._head.moveRight();
        if (newTailCoordinate != null) {
            this._tailHistory.push(newTailCoordinate.copy());
        }
    }

    public moveSouth(): void {
        var newTailCoordinate = this._head.moveDown();
        if (newTailCoordinate != null) {
            this._tailHistory.push(newTailCoordinate.copy());
        }
    }

    public moveWest(): void {
        var newTailCoordinate = this._head.moveLeft();
        if (newTailCoordinate != null) {
            this._tailHistory.push(newTailCoordinate.copy());
        }
    }

    public getUniqueTailPositionCount() {
        return this._tailHistory.unique(Coordinate.compare).length;
    }

    public getCoordinates(knot = this._head): Array<Coordinate> {
        return knot.tail != null
            ? new Array<Coordinate>(knot.position.copy(), ...this.getCoordinates(knot.tail))
            : new Array<Coordinate>(knot.position.copy());
    }

    public toString(): string {
        var str = '';
        this.getCoordinates().forEach(c => {
            str = str.concat(`${c.x},${c.y} `);
        });

        return str;
    }

    public draw(): string {
        var grid = new Array<Array<string>>();
        var minCoordinate = this.getMinCoordinate();
        var xOffset = Math.abs(minCoordinate.x) + 1;
        var yOffset = Math.abs(minCoordinate.y) + 1;
        var graphWidth = xOffset * 2;
        var graphHeight = yOffset * 2;
        var coordinates = this.getCoordinates();

        for (var j = graphHeight; j >= 0; j--) {
                grid[j] = new Array<string>();
                for (var i = graphWidth; i >= 0; i--) {
                grid[j][i] = '.';
            };
        };

        var coordinates = this.getCoordinates(); 
        for (var n = 0; n < coordinates.length; n++) {
            var c = coordinates[n];
            var x = c.x + xOffset;
            var y = c.y + yOffset;
            grid[y][x] = n.toString();
        };

        var rows = new Array<string>;
        for(j = grid.length - 1; j >= 0; j--) {
            rows.push(grid[j].toString().replaceAll(',', ''))
        };

        return rows.join('\r\n');
    }

    private getMinCoordinate(knot = this._head, minX = this._head.position.x, minY = this._head.position.y): Coordinate {
        if (knot.tail != null) {
            minX = minX < knot.position.x ? minX : knot.position.x;
            minY = minY < knot.position.y ? minY : knot.position.y;
            return this.getMinCoordinate(knot.tail, minX, minY);
        } else {
            return new Coordinate(minX, minY);
        }
    }

    private buildRope(numKnots: number): Knot {
        return this.buildKnots(numKnots, new Knot())
    }

    private buildKnots(depth: number, currKnot: Knot): Knot {
        if (depth > 1) {
            var nextKnot = new Knot(currKnot);
            return this.buildKnots(depth - 1, nextKnot);
        }

        return currKnot;
    }
}