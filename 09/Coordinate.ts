export class Coordinate {
    private _x: number;
    private _y: number;

    public constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

    public Up(): void {
        this._y++;
    }

    public Right(): void {
        this._x++;
    }

    public Down(): void {
        this._y--;
    }

    public Left(): void {
        this._x--;
    }

    public static compare(c1: Coordinate, c2: Coordinate): boolean {
        return c1.x == c2.x && c1.y == c2.y;
    }
}