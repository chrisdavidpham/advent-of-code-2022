import { Coordinate } from "./coordinate";
import { XDirection, YDirection } from "./enums";

export class Knot {
    private readonly _position: Coordinate;
    private readonly _tailKnot: Knot | null;
    private _tailXDirection: XDirection;
    private _tailYDirection: YDirection;

    constructor(tailKnot: Knot | null = null) {
        this._tailKnot = tailKnot;
        this._position = new Coordinate(0, 0);
        this._tailXDirection = XDirection.None;
        this._tailYDirection = YDirection.None;
    }

    public get tail(): Knot | null {
        return this._tailKnot;
    }

    public get position(): Coordinate {
        return this._position;
    }

    public moveUp(): Coordinate | null {
        this._position.up();

        if (this._tailKnot != null) {
            switch (this._tailYDirection) {
                case YDirection.Up:
                    this._tailYDirection = YDirection.None;
                    return null;
                case YDirection.Down:
                    switch (this._tailXDirection) {
                        case XDirection.Left: {
                            this._tailXDirection = XDirection.None;
                            return this._tailKnot.moveUpRight();
                        }
                        case XDirection.Right: {
                            this._tailXDirection = XDirection.None;
                            return this._tailKnot.moveUpLeft();
                        }
                        case XDirection.None: {
                            return this._tailKnot.moveUp();
                        }
                    }
                case YDirection.None:
                    this._tailYDirection = YDirection.Down;
                    return null;
            }
        }
        else {
            return this._position.copy();
        }
    }

    public moveRight(): Coordinate | null {
        this._position.right();

        if (this._tailKnot != null) {
            switch (this._tailXDirection) {
                case XDirection.Right:
                    this._tailXDirection = XDirection.None;
                    return null;
                case XDirection.Left:
                    switch (this._tailYDirection) {
                        case YDirection.Up: {
                            this._tailYDirection = YDirection.None;
                            return this._tailKnot.moveDownRight();
                        }
                        case YDirection.Down: {
                            this._tailYDirection = YDirection.None;
                            return this._tailKnot.moveUpRight();
                        }
                        case YDirection.None: {
                            return this._tailKnot.moveRight();
                        }
                    }
                case XDirection.None:
                    this._tailXDirection = XDirection.Left;
                    return null;
            }
        }
        else {
            return this._position.copy();
        }
    }

    public moveDown(): Coordinate | null {
        this._position.down();

        if (this._tailKnot != null) {
            switch (this._tailYDirection) {
                case YDirection.Up:
                    switch (this._tailXDirection) {
                        case XDirection.Left: {
                            this._tailXDirection = XDirection.None;
                            return this._tailKnot.moveDownRight();
                        }
                        case XDirection.Right: {
                            this._tailXDirection = XDirection.None;
                            return this._tailKnot.moveDownLeft();
                        }
                        case XDirection.None: {
                            return this._tailKnot.moveDown();
                        }
                    }
                case YDirection.Down:
                    this._tailYDirection = YDirection.None;
                    return null;
                case YDirection.None:
                    this._tailYDirection = YDirection.Up;
                    return null;
            }
        }
        else {
            return this._position.copy();
        }
    }

    public moveLeft(): Coordinate | null {
        this._position.left();

        if (this._tailKnot != null) {
            switch (this._tailXDirection) {
                case XDirection.Right:
                    switch (this._tailYDirection) {
                        case YDirection.Up: {
                            this._tailYDirection = YDirection.None;
                            return this._tailKnot.moveDownLeft();
                        }
                        case YDirection.Down: {
                            this._tailYDirection = YDirection.None;
                            return this._tailKnot.moveUpLeft();
                        }
                        case YDirection.None: {
                            return this._tailKnot.moveLeft();
                        }
                    }
                case XDirection.Left:
                    this._tailXDirection = XDirection.None;
                    return null;
                case XDirection.None:
                    this._tailXDirection = XDirection.Right;
                    return null;
            }
        }
        else {
            return this._position.copy();
        }
    }

    public moveUpRight(): Coordinate | null {
        var lastTailChangedCoordinate = this.moveUp();
        return this.moveRight() ?? lastTailChangedCoordinate;
    }

    public moveDownRight(): Coordinate | null {
        var lastTailChangedCoordinate = this.moveDown();
        return this.moveRight() ?? lastTailChangedCoordinate;
    }

    public moveDownLeft(): Coordinate | null {
        var lastTailChangedCoordinate = this.moveDown();
        return this.moveLeft() ?? lastTailChangedCoordinate;
    }

    public moveUpLeft(): Coordinate | null {
        var lastTailChangedCoordinate = this.moveUp();
        return this.moveLeft() ?? lastTailChangedCoordinate;
    }
}