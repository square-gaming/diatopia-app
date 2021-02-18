import Point from "../math/Point";
import Ray from "../math/Ray";
import Segment from "../math/Segment";
import Vector from "../math/Vector";

class Raycaster {
    ray: Ray;
    near: number;
    far: number;
    
    constructor(
        origin = new Point(0, 0),
        direction = new Vector(1, 0),
        far = Infinity,
        near = 0
    ) {
        this.ray = new Ray(origin, direction);
        this.far = far;
        this.near = near;
    }

    set(origin: Point, direction: Vector) {
        this.ray.set(origin, direction);
    }

    intersect(seg: Segment) {
        const rpx = this.ray.origin.x;
        const rpy = this.ray.origin.y;
        const rdx = this.ray.direction.x;
        const rdy = this.ray.direction.y;

        const spx = seg.start.x;
        const spy = seg.start.y;
        const sdx = seg.end.x - seg.start.x;
        const sdy = seg.end.y - seg.start.y;

        if (rdx * sdy === rdy * sdx) {
            return null;
        }

        const T2 = (rdx * (spy - rpy) + rdy * (rpx - spx)) / (sdx * rdy - sdy * rdx);
        const T1 = (sdx * (rpy - spy) + sdy * (spx - rpx)) / (rdx * sdy - rdy * sdx);

        if (T1 < 0) return null;
        if (T2 < 0 || T2 > 1) return null;

        const distance = new Vector(rpx + rdx * T1 - this.ray.origin.x, rpy + rdy * T1 - this.ray.origin.y).length;

        if (distance > this.near && distance < this.far) {
            return {
                distance,
                point: new Point(rpx + rdx * T1, rpy + rdy * T1),
                param: T1,
                angle: Math.atan(T1)
            };
        } else {
            return null;
        }
    }
}

export default Raycaster;