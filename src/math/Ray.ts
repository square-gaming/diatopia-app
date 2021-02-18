import Point from "./Point";
import Vector from "./Vector";

class Ray {
  origin: Point;
  direction: Vector;

  constructor(origin = new Point(0, 0), direction = new Vector(1, 0)) {
    this.origin = origin;
    this.direction = direction;
  }

  set(origin: Point, direction: Vector) {
    this.origin.copy(origin);
    this.direction.copy(direction);

    return this;
  }

  at(t: number, target: Vector = new Vector(0, 0)) {
    return target
      .copy(this.direction)
      .multiply(t)
      .add(this.origin.x, this.origin.y);
  }

  clone() {
    return new Ray(
      new Point(this.origin.x, this.origin.y),
      new Vector(this.direction.x, this.direction.y)
    );
  }

  copy(ray: Ray) {
    this.origin.copy(ray.origin);
    this.direction.copy(ray.direction);

    return this;
  }
}

export default Ray;