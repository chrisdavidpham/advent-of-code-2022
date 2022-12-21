import { Coordinate } from "./Coordinate";
import { XDirection, YDirection } from "./enums";

export class Rope {
    private head: Coordinate;
    private tailHistory: Array<Coordinate>;
    private tailXDirection: XDirection;
    private tailYDirection: YDirection;

    constructor() {
        this.head = new Coordinate(0, 0);
        this.tailHistory = new Array<Coordinate>(new Coordinate(0, 0));
        this.tailXDirection = XDirection.None;
        this.tailYDirection = YDirection.None;
    }

    public moveNorth(): void {
        this.head.Up();

        switch (this.tailYDirection) {
            case YDirection.North:
                this.tailYDirection = YDirection.None;
                break;
            case YDirection.South:
                this.tailXDirection = XDirection.None;
                this.tailYDirection = YDirection.South;
                this.tailHistory.push(new Coordinate(this.head.x, this.head.y - 1));
                break;
            case YDirection.None:
                this.tailYDirection = YDirection.South;
                break;
        }
    }

    public moveEast(): void {
        this.head.Right();

        switch (this.tailXDirection) {
            case XDirection.East:
                this.tailXDirection = XDirection.None;
                break;
            case XDirection.West:
                this.tailYDirection = YDirection.None;
                this.tailXDirection = XDirection.West;
                this.tailHistory.push(new Coordinate(this.head.x - 1, this.head.y));
                break;
            case XDirection.None:
                this.tailXDirection = XDirection.West;
                break;
        }
    }

    public moveSouth(): void {
        this.head.Down();

        switch (this.tailYDirection) {
            case YDirection.North:
                this.tailXDirection = XDirection.None;
                this.tailYDirection = YDirection.North;
                this.tailHistory.push(new Coordinate(this.head.x, this.head.y + 1));
                break;
            case YDirection.South:
                this.tailYDirection = YDirection.None;
                break;
            case YDirection.None:
                this.tailYDirection = YDirection.North;
                break;
        }
    }

    public moveWest(): void {
        this.head.Left();

        switch (this.tailXDirection) {
            case XDirection.East:
                this.tailYDirection = YDirection.None;
                this.tailXDirection = XDirection.East;
                this.tailHistory.push(new Coordinate(this.head.x + 1, this.head.y));
                break;
            case XDirection.West:
                this.tailXDirection = XDirection.None;
                break;
            case XDirection.None:
                this.tailXDirection = XDirection.East;
                break;
        }
    }

    public getUniqueTailPositionCount() {
        console.log(this.tailHistory);
        return this.tailHistory.unique(Coordinate.compare).length;
    }
}
