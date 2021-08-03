import GLOBAL from "../constants/global";
import Block from "../core/Block";
import Point from "../math/Point";
import Segment from "../math/Segment";
import Image from '../models/Image';
import Vector from "../math/Vector";
import { Coordinate } from "../types/models";
import { Layer } from "../types";

class Camera {
  x: number;
  y: number;
  width: number;
  height: number;
  maxPos: Point;
  tileSize: number;
  following: Block | null;

  constructor(
    width: number,
    height: number,
    border: Coordinate,
    tileSize: number
  ) {
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.tileSize = tileSize;
    this.maxPos = new Point(
      ((border.x / GLOBAL.UNIT_LENGTH) + 1) * tileSize - width,
      ((border.y / GLOBAL.UNIT_LENGTH) + 1) * tileSize - height
    );
    this.following = null;
  }

  private locate(pos: Point): Point {
    const cameraPos = pos.subtract(
      new Vector(
        (this.width - this.tileSize) / 2,
        (this.height - this.tileSize) / 2
      )
    );
    
    cameraPos.clampX(0, this.maxPos.x);
    cameraPos.clampY(0, this.maxPos.y);

    return cameraPos;
  }

  public get pos(): Point {
    if (this.following) {
      return this.locate(this.transform(this.following.pos));
    } else {
      return new Point(this.x, this.y);
    }
  }

  /**
   * Returns a point from world coordinate system to viewport coordinate system.
   */
  public transform<Point>(pos: Point): Point;
  public transform<Segment>(seg: Segment): Segment;
  public transform(arg: Point | Segment) {
    if (arg instanceof Point) {
      return arg
        .clone()
        .multiply(this.tileSize / GLOBAL.UNIT_LENGTH)
        .round(1);
    } else if (arg instanceof Segment) {
      return new Segment(
        arg.start.clone().multiply(this.tileSize / GLOBAL.UNIT_LENGTH).round(1),
        arg.end.clone().multiply(this.tileSize / GLOBAL.UNIT_LENGTH).round(1)
      );
    }
  }

  public transformToScreen<Point>(pos: Point): Point;
  public transformToScreen<Segment>(seg: Segment): Segment;
  public transformToScreen(arg: Point | Segment) {
    if (arg instanceof Point) {
      return this.transform(arg).subtract(this.pos);
    } else if (arg instanceof Segment) {
      return new Segment(
        this.transform(arg.start).subtract(this.pos),
        this.transform(arg.end).subtract(this.pos)
      );
    }
  }

  public follow(block: Block) {
    this.following = block;
  }

  // public update() {
  //   // assume followed sprite should be placed at the center of the screen
  //   // whenever possible
  //   this.following.screenX = this.width / 2;
  //   this.following.screenY = this.height / 2;

  //   // make the camera follow the sprite
  //   this.x = this.following.x - this.width / 2;
  //   this.y = this.following.y - this.height / 2;
  //   // clamp values
  //   this.x = Math.max(0, Math.min(this.x, this.maxX));
  //   this.y = Math.max(0, Math.min(this.y, this.maxY));

  //   // in map corners, the sprite cannot be placed in the center of the screen
  //   // and we have to change its screen coordinates

  //   // left and right sides
  //   if (this.following.x < this.width / 2 ||
  //     this.following.x > this.maxX + this.width / 2) {
  //     this.following.screenX = this.following.x - this.x;
  //   }
  //   // top and bottom sides
  //   if (this.following.y < this.height / 2 ||
  //     this.following.y > this.maxY + this.height / 2) {
  //     this.following.screenY = this.following.y - this.y;
  //   }
  // }

  public capture(sources: { [type: string]: any[] }): {
    [type: string]: Layer
  } {
    const layers: { [type: string]: any } = {};
    let i = 0;

    for (const key in sources) {
      if (Object.prototype.hasOwnProperty.call(sources, key)) {
        const elements = sources[key] as Block[];
        
        layers[key] = {
          visibilty: true,
          images: elements
            .filter(element => {
              const bound: [Point, Point] = [
                this.pos.clone().floor(this.tileSize),
                this.pos.clone().add(new Vector(this.width, this.height))
              ]
              return this.transform(element.pos).isWithin(bound, true)
            })
            .map(element => new Image(
              element,
              this.transformToScreen(element.pos),
              element.layer
            ))
            .sort((a, b) => a.layer - b.layer),
          order: i++
        };
      }
    }

    return layers;
  }
}

export default Camera;
