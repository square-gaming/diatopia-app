import { video } from '../config/video';
import GLOBAL from '../constants/global';
import Image from '../models/Image';
import Point from '../math/Point';
import Segment from '../math/Segment';
import Vector from '../math/Vector';
import { Layer } from '../types';
import { alignPoint } from '../utils';

class Camera {
  layers: { [layerName: string]: Layer };
  fov: number;
  aspect: number;
  near: number;
  far: number;
  position: Point;

  constructor(
    fov: number = video.gridSize * GLOBAL.RENDER_ROWS,
    aspect: number = video.aspect,
    near: number = video.gridSize,
    far: number = GLOBAL.UNIT_LENGTH,
    position: Point = new Point(0, 0)
  ) {
    this.layers = {};
    this.fov = fov;
    this.aspect = aspect;
    this.near = near;
    this.far = far;
    this.position = position;
  }

  private get mag(): number {
    return this.near / this.far;
  }
  /**
   * Returns an offset to camera position with center grid position.
   */
  public get offset(): Point {
    const { x, y } = this.position.clone().multiply(this.mag);
    /**
     * Prevent decimal carring from abnormal scene displacement.
     */
    const cameraPosProjection = new Point(
      this.position.x % GLOBAL.UNIT_LENGTH === GLOBAL.UNIT_LENGTH / 2 - 1
        ? Math.floor(x)
        : Math.round(x),
      this.position.y % GLOBAL.UNIT_LENGTH === GLOBAL.UNIT_LENGTH / 2 - 1
        ? Math.floor(y)
        : Math.round(y)
    );

    return new Point(
      (-(GLOBAL.RENDER_COLUMNS - GLOBAL.VIEWPORT_COLUMNS) / 2) *
        video.gridSize -
        (cameraPosProjection.x % video.gridSize < video.gridSize / 2
          ? cameraPosProjection.x % video.gridSize
          : (cameraPosProjection.x % video.gridSize) - video.gridSize),
      (-(GLOBAL.RENDER_ROWS - GLOBAL.VIEWPORT_ROWS) / 2) * video.gridSize -
        (cameraPosProjection.y % video.gridSize < video.gridSize / 2
          ? cameraPosProjection.y % video.gridSize
          : (cameraPosProjection.y % video.gridSize) - video.gridSize)
    );
  }

  private get farPlaneBound(): [Point, Point] {
    const start = new Point(0, 0);
    const end = new Point(0, 0);
    const halfHeight =
      (((this.fov / video.gridSize - 1) / 2) * video.gridSize) / this.mag;
    const halfWidth =
      ((((this.fov * this.aspect) / video.gridSize - 1) / 2) * video.gridSize) /
      this.mag;
    const center = alignPoint(this.position);

    start.set(center.clone().subtract(new Vector(halfWidth, halfHeight)));
    end.set(
      center
        .clone()
        .add(new Vector(GLOBAL.UNIT_LENGTH, GLOBAL.UNIT_LENGTH))
        .add(new Vector(halfWidth, halfHeight))
    );

    return [start, end];
  }

  private get nearPlaneBound(): [Point, Point] {
    return this.farPlaneBound.map((point) => point.multiply(this.mag)) as [
      Point,
      Point
    ];
  }
  /**
   * Returns a point from world coordinate system to viewport coordinate system.
   */
  public transform<Point>(pos: Point): Point;
  public transform<Segment>(seg: Segment): Segment;
  public transform(val: Point | Segment) {
    if (val instanceof Point) {
      return val
        .clone()
        .subtract(this.farPlaneBound[0])
        .multiply(this.mag)
        .round(1);
    } else if (val instanceof Segment) {
      return new Segment(
        val.start.clone().subtract(this.farPlaneBound[0]).multiply(this.mag),
        val.end.clone().subtract(this.farPlaneBound[0]).multiply(this.mag)
      );
    }
  }

  public capture(sources: { [type: string]: any[] }) {
    const farPlaneBound = this.farPlaneBound;
    const layers: { [type: string]: any } = {};
    let i = 0;

    for (const key in sources) {
      if (Object.prototype.hasOwnProperty.call(sources, key)) {
        const elements = sources[key];
        
        layers[key] = {
          visibilty: true,
          images: elements
            .filter(element => element.pos.isWithin(farPlaneBound, true))
            .map(element => new Image(element, this.transform(element.pos), element.layer))
            .sort((a, b) => a.layer - b.layer),
          order: i++
        };
      }
    }

    this.layers = layers;
    return layers;
  }
}

export default Camera;
