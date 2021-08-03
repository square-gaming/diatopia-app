import { video } from "../config/video";
import Raycaster from "../core/Raycaster";
import Point from "../math/Point";
import Segment from "../math/Segment";
import Vector from "../math/Vector";
import { Layer } from "../types";
import Image from "../models/Image";
import NewCamera from "./Camera";

class Light {
    bound: Vector;
    obstructors: Segment[];
    segments: number;
    lightImages: Image[];

    constructor(
        camera: NewCamera,
        bound: Vector,
        lightsLayer: Layer,
        structuresLayer: Layer,
        segments: number
    ) {
        this.obstructors = structuresLayer.images.filter(image => image.target.frames)
            .map(image => image.target.frames as Segment).flat()
            .map(seg => camera.transformToScreen(seg));
        this.bound = bound;
        this.segments = segments;
        this.lightImages = lightsLayer.images;
    }

    public get areas() {
        return this.lightImages.map(lightImage => {
            const angles = [];

            for (let i = 0; i < this.segments; i++) {
                angles.push(-Math.PI + (i * 2 * Math.PI / this.segments));
            }

            const vertices = angles.reduce((vertices, angle) => {
                const dx = Math.cos(angle);
                const dy = Math.sin(angle);
                const rayCaster = new Raycaster(
                    lightImage.position.clone().add(new Vector(video.gridSize / 2, video.gridSize / 2)),
                    new Vector(dx, dy),
                    64
                );

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
                    vertices.push({
                        distance: 64,
                        point: new Point(0, 0).add(rayCaster.ray.at(64)),
                        param: Math.tan(angle),
                        angle
                    });
                    return vertices;
                } else {
                    vertices.push({ ...closestIntersect, angle});
                    return vertices;
                }
            }, [] as {
                distance: number;
                point: Point;
                param: number;
                angle: number;
            }[]);

            vertices.sort((a, b) => a.angle - b.angle);

            return {
                lightLevel: lightImage.target.lightLevel,
                vertices
            };
        });
    }
}

export default Light;