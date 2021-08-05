import { video } from "../config/video";
import Raycaster from "../core/Raycaster";
import Point from "../math/Point";
import Segment from "../math/Segment";
import Vector from "../math/Vector";
import { Layer } from "../types";
import Camera from "./Camera";

class Sight {
    camera: Camera;
    observer: Point;
    obstructors: Segment[];
    bound: Vector;
    offset: number;

    constructor(
        camera: Camera,
        bound: Vector,
        offset: number = 0.00001
    ) {
        this.camera = camera;
        this.observer = new Point(0, 0);
        this.obstructors = [new Segment(new Point(0, 0), new Point(0, 0))];
        this.bound = bound;
        this.offset = offset;
    }

    public get area() {
        const points = this.obstructors
            .map(barrier => [
                new Point(barrier.start.x, barrier.start.y),
                new Point(barrier.end.x, barrier.end.y)
            ])
            .flat();

        const uniquePoints = points.reduce((result, point) => {
            if (result.set.has(`${point.x},${point.y}`)) {
                return result;
            } else {
                result.set.add(`${point.x},${point.y}`)
                result.filtered.push(point);
                return result;
            }
        }, {
            filtered: [] as Point[],
            set: new Set<string>()
        }).filtered;

        const uniqueAngles = uniquePoints.map(uniquePoint => {
            const angle = Math.atan2(
                uniquePoint.y - this.observer.y,
                uniquePoint.x - this.observer.x
            );
            return [angle - this.offset, angle, angle + this.offset];
        }).flat();
        
        const intersects = uniqueAngles.reduce((intersects, angle) => {
            const dx = Math.cos(angle);
            const dy = Math.sin(angle);
            const rayCaster = new Raycaster(this.observer, new Vector(dx, dy));

            const closestIntersect = this.obstructors.reduce((result, barrier) => {
                const intersect = rayCaster.intersect(barrier);

                if (!intersect) return result;
                if (!result || intersect.param < result.param) {
                    return intersect;
                }
                return result;
            }, null as ({
                distance: number;
                point: Point;
                param: number;
                angle: number;
            } | null));

            if (!closestIntersect) {
                return intersects;
            } else {
                intersects.push({ ...closestIntersect, angle});
                return intersects;
            }
        }, [] as {
            distance: number;
            point: Point;
            param: number;
            angle: number;
        }[]);

        intersects.sort((a, b) => a.angle - b.angle);

        return intersects;
    }

    public update(observer: Point, structuresLayer: Layer) {
        this.observer = this.camera.transformToScreen(observer)
            .add(new Vector(video.gridSize / 2, video.gridSize / 2));
        this.obstructors = structuresLayer.images
            .filter(image => image.target.frames)
            .map(image => image.target.frames as Segment).flat()
            .map(seg => this.camera.transformToScreen(seg))
            .concat([
                new Segment(new Point(0, 0), new Point(this.bound.x, 0)),
                new Segment(new Point(this.bound.x, 0), new Point(this.bound.x, this.bound.y)),
                new Segment(new Point(this.bound.x, this.bound.y), new Point(0, this.bound.y)),
                new Segment(new Point(0, this.bound.y), new Point(0, 0))
            ]);
    }
}

export default Sight;