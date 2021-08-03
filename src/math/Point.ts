import { Coordinate } from '../types/models';
import { isCoordinate } from '../utils/typeCheckHelpers';
import Vector from './Vector';

class Point {
  static isEqual(a: Point, b: Point): boolean {
    return a.x === b.x && a.y === b.y;
  }
  public x: number;
  public y: number;

  constructor(value: Coordinate);
  constructor(x: number, y: number);
  constructor(xOrValue: Coordinate | number, y?: number) {
    if (isCoordinate(xOrValue)) {
      this.x = xOrValue.x;
      this.y = xOrValue.y;
    } else {
      this.x = xOrValue;
      this.y = y as number;
    }
  }

  public get length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public round(threshold: number): Point {
    return new Point(
      Math.round(this.x / threshold) * threshold,
      Math.round(this.y / threshold) * threshold
    );
  }

  public floor(threshold: number): Point {
    return new Point(
      Math.floor(this.x / threshold) * threshold,
      Math.floor(this.y / threshold) * threshold
    );
  }

  public ceil(threshold: number): Point {
    return new Point(
      Math.ceil(this.x / threshold) * threshold,
      Math.ceil(this.y / threshold) * threshold
    );
  }

  set(v: Point): Point;
  set(x: number, y: number): Point;
  set(vOrX: Point | number, y?: number): Point {
    if (vOrX instanceof Point) {
      this.x = vOrX.x;
      this.y = vOrX.y;

      return this;
    }

    y = y as number;

    this.x = vOrX;
    this.y = y;

    return this;
  }

  add(v: Vector | Point): Point;
  add(x: number, y: number): Point;
  add(vOrX: Vector | Point | number, y?: number): Point {
    if (vOrX instanceof Vector || vOrX instanceof Point) {
      this.x += vOrX.x;
      this.y += vOrX.y;

      return this;
    }

    y = y as number;

    this.x += vOrX;
    this.y += y;

    return this;
  }

  subtract(v: Vector | Point): Point;
  subtract(x: number, y: number): Point;
  subtract(vOrX: Vector | Point | number, y?: number): Point {
    if (vOrX instanceof Vector || vOrX instanceof Point) {
      this.x -= vOrX.x;
      this.y -= vOrX.y;

      return this;
    }

    y = y as number;

    this.x -= vOrX;
    this.y -= y;

    return this;
  }

  multiply(v: Vector): Point;
  multiply(x: number): Point;
  multiply(vOrX: Vector | number): Point {
    if (vOrX instanceof Vector) {
      this.x *= vOrX.x;
      this.y *= vOrX.y;

      return this;
    }

    this.x *= vOrX;
    this.y *= vOrX;

    return this;
  }

  copy(v: Point): Point {
    this.x = v.x;
    this.y = v.y;

    return this;
  }

  public clone(): Point {
    return new Point(this.x, this.y);
  }

  public isEqual(pos: Point): boolean {
    return this.x === pos.x && this.y === pos.y;
  }

  public isWithin(posTuple: [Point, Point], isIncluded: boolean): boolean;
  public isWithin(start: Point, end: Point, isIncluded: boolean): boolean;
  public isWithin(
    first: [Point, Point] | Point,
    second: boolean | Point,
    third?: boolean
  ): boolean {
    if (Array.isArray(first)) {
      second = second as boolean;

      if (second) {
        return (
          this.x >= first[0].x &&
          this.x <= first[1].x &&
          this.y >= first[0].y &&
          this.y <= first[1].y
        );
      }

      return (
        this.x > first[0].x &&
        this.x < first[1].x &&
        this.y > first[0].y &&
        this.y < first[1].y
      );
    }

    second = second as Point;

    if (third) {
      return (
        this.x >= first.x &&
        this.x <= second.x &&
        this.y >= first.y &&
        this.y <= second.y
      );
    }

    return (
      this.x > first.x &&
      this.x < second.x &&
      this.y > first.y &&
      this.y < second.y
    );
  }

  public clampX(min: number, max: number): Point {
    this.x = Math.max(min, Math.min(this.x, max));

    return this;
  }

  public clampY(min: number, max: number): Point {
    this.y = Math.max(min, Math.min(this.y, max));

    return this;
  }

  public clamp(min: number, max: number): Point {
    this.x = Math.max(min, Math.min(this.x, max));
    this.y = Math.max(min, Math.min(this.y, max));

    return this;
  }
}

export default Point;
