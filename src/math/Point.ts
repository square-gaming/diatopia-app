import { Coordinate } from '../types/models';
import Vector from './Vector';

class Point {
    static isEqual(a: Point, b: Point): boolean {
        return a.x === b.x && a.y === b.y;
    };
    public x: number;
    public y: number;
    
    constructor(value: Coordinate)
    constructor(x: number, y: number)
    constructor(xOrValue: number | Coordinate, y?: number) {
        if (y === undefined) {
            if (typeof xOrValue !== 'number') {
                this.x = xOrValue.x;
                this.y = xOrValue.y;
            } else {
                throw Error('Unexpected type of argument');
            }
        } else {
            if (typeof xOrValue === 'number' && typeof y === 'number') {
                this.x = xOrValue;
                this.y = y;
            } else {
                throw Error('Unexpected type of argument');
            }
        }
    }

    public get length() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public round(threshold: number) {
        return new Point(
            Math.round(this.x / threshold) * threshold,
            Math.round(this.y / threshold) * threshold
        );
    }

    public floor(threshold: number) {
        return new Point(
            Math.floor(this.x / threshold) * threshold,
            Math.floor(this.y / threshold) * threshold
        );
    }

    public ceil(threshold: number) {
        return new Point(
            Math.ceil(this.x / threshold) * threshold,
            Math.ceil(this.y / threshold) * threshold
        );
    }

    set(v: Point): Point;
    set(x: number, y: number): Point;
    set(vOrX: Point | number, y?: number) {
        if (vOrX instanceof Point) {
            this.x = vOrX.x;
            this.y = vOrX.y;

            return this;
        } else if (typeof vOrX === 'number' && typeof y === 'number') {
            this.x = vOrX;
            this.y = y;

            return this;
        } else {
            throw Error('Unexpected argument type');
        }
    }

    add(v: Vector | Point): Point;
    add(x: number, y: number): Point;
    add(vOrX: Vector | Point | number, y?: number) {
        if (vOrX instanceof Vector || vOrX instanceof Point) {
            this.x += vOrX.x;
            this.y += vOrX.y;

            return this;
        } else if (typeof vOrX === 'number' && typeof y === 'number') {
            this.x += vOrX;
            this.y += y;

            return this;
        } else {
            throw Error('Unexpected argument type');
        }
    }

    substract(v: Vector | Point): Point;
    substract(x: number, y: number): Point;
    substract(vOrX: Vector | Point | number, y?: number) {
        if (vOrX instanceof Vector || vOrX instanceof Point) {
            this.x -= vOrX.x;
            this.y -= vOrX.y;

            return this;
        } else if (typeof vOrX === 'number' && typeof y === 'number') {
            this.x -= vOrX;
            this.y -= y;

            return this;
        } else {
            throw Error('Unexpected argument type');
        }
    }

    multiply(v: Vector): Point;
    multiply(x: number): Point;
    multiply(vOrX: Vector | number) {
		if (vOrX instanceof Vector) {
            this.x *= vOrX.x;
            this.y *= vOrX.y;

            return this;
        } else if (typeof vOrX === 'number') {
            this.x *= vOrX;
            this.y *= vOrX;

            return this;
        } else {
            throw Error('Unexpected argument type');
        }
	}

    copy(v: Point) {
        this.x = v.x;
        this.y = v.y;

        return this;
    }

    public clone() {
        return new Point(this.x, this.y);
    }

    public isEqual(pos: Point): boolean {
        return this.x === pos.x && this.y === pos.y;
    }

    public isWithin(
        posTuple: [Point, Point],
        isIncluded: boolean
    ): boolean;
    public isWithin(
        start: Point,
        end: Point,
        isIncluded: boolean
    ): boolean;
    public isWithin(
        first: [Point, Point] | Point,
        second: boolean | Point,
        third?: boolean
    ) {
        if (Array.isArray(first)) {
            if (second) {
                return (
                    this.x >= first[0].x &&
                    this.x <= first[1].x &&
                    this.y >= first[0].y &&
                    this.y <= first[1].y
                );
            } else {
                return (
                    this.x > first[0].x && this.x < first[1].x && this.y > first[0].y && this.y < first[1].y
                );
            }
        } else if (first instanceof Point && second instanceof Point) {
            if (third) {
                return (
                    this.x >= first.x &&
                    this.x <= second.x &&
                    this.y >= first.y &&
                    this.y <= second.y
                );
            } else {
                return (
                    this.x > first.x && this.x < second.x && this.y > first.y && this.y < second.y
                );
            }
        }
    }
}

export default Point;