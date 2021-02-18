import Point from "../math/Point";
import Sprite from '../components';
import { video } from "../config/video";

class Image {
    target: any;
    position: Point;
    layer: number;
    
    constructor(target: any, position: Point, layer: number) {
        this.target = target;
        this.position = position;
        this.layer = layer;
    }

    public get toSprite() {
        return Sprite[this.target.constructor.name](this.target, video.gridSize, this.position.x, this.position.y);
    }
}

export default Image;