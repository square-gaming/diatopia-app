import { EventEmitter } from "events";
import { setInterval } from "timers";
import { video } from "../config/video";
import EVENT from "../constants/event";

abstract class Element extends EventEmitter {
  protected lastTime: number;

  constructor() {
    super();
    this.lastTime = 0;
    this.timer = setInterval(this.update.bind(this), 1000 / video.fps);
  }

  public set timer(timer: NodeJS.Timeout) {}

  public onDestroy(listener: (...arg: any[]) => void) {
    this.on(EVENT.ELEMENT.DESTORY, listener);
  }

  public destroy() {
    clearInterval(this.timer);
    this.emit(EVENT.ELEMENT.DESTORY);
  }

  public onCreate(listener: (...arg: any[]) => void) {
    this.on(EVENT.ELEMENT.CREATE, listener);
  }

  public onUpdate(listener: (...arg: any[]) => void) {
    this.on(EVENT.ELEMENT.UPDATE, listener);
  }

  protected create() {
    this.emit(EVENT.ELEMENT.CREATE);
  }

  protected update() {
    if (this.lastTime === 0) {
      this.create();
    } else {
      this.emit(EVENT.ELEMENT.UPDATE);
    }
    this.lastTime += 1;
  }
}

export default Element;
