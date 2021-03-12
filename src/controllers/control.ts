import controlConfig from '../config/control';
import Action from '../constants/action';
import { DIRECTION } from '../constants/direction';
import { World } from '../types/reducers';
import Client from './Client';

class Controller {
    private keysPressed: { [keyName: string]: boolean }
    
    constructor() {
        this.keysPressed = {};
    }

    public setUp(client: Client, world: World) {
        document.body.addEventListener('keydown', this.keydownHandler.bind(this, client, world));
        document.body.addEventListener('keyup', this.keyupHandler.bind(this, client, world));
    }

    private keydownHandler(this: Controller, client: Client, world: World, evt: KeyboardEvent) {
        if (!this.keysPressed[evt.key]) {
            this.keysPressed[evt.key] = true;
            this.moveControl(client, world, evt.key);
        }
    }

    private keyupHandler(this: Controller, client: Client, world: World,  evt: KeyboardEvent) {
        delete this.keysPressed[evt.key]
        this.interactControl(client, evt.key);
        this.moveControl(client, world, evt.key);
    }

    private interactControl(client: Client, key: string) {
        if (key === 'e' || key === 'E') {
            client.send(Action.interact());
        }
    }

    private moveControl(client: Client, world: World, key: string) {
        const isMotion = Object.keys(this.keysPressed).length !== 0;

        if ((this.keysPressed['ArrowUp'] || this.keysPressed[controlConfig.UP_KEY]) &&
            (this.keysPressed['ArrowRight'] || this.keysPressed[controlConfig.RIGHT_KEY])
        ) {
            client.send(Action.move(DIRECTION.NORTH_EAST, isMotion))
        } else if ((this.keysPressed['ArrowDown'] || this.keysPressed[controlConfig.DOWN_KEY]) &&
            (this.keysPressed['ArrowRight'] || this.keysPressed[controlConfig.RIGHT_KEY])
        ) {
            client.send(Action.move(DIRECTION.SOUTH_EAST, isMotion))
        } else if ((this.keysPressed['ArrowDown'] || this.keysPressed[controlConfig.DOWN_KEY]) &&
            (this.keysPressed['ArrowLeft'] || this.keysPressed[controlConfig.LEFT_KEY])
        ) {
            client.send(Action.move(DIRECTION.SOUTH_WEST, isMotion))
        } else if ((this.keysPressed['ArrowUp'] || this.keysPressed[controlConfig.UP_KEY]) &&
            (this.keysPressed['ArrowLeft'] || this.keysPressed[controlConfig.LEFT_KEY])
        ) {
            client.send(Action.move(DIRECTION.NORTH_WEST, isMotion))
        } else if (this.keysPressed['ArrowUp'] || this.keysPressed[controlConfig.UP_KEY]) {
            client.send(Action.move(DIRECTION.NORTH, isMotion))
        } else if (this.keysPressed['ArrowRight'] || this.keysPressed[controlConfig.RIGHT_KEY]) {
            client.send(Action.move(DIRECTION.EAST, isMotion))
        } else if (this.keysPressed['ArrowDown'] || this.keysPressed[controlConfig.DOWN_KEY]) {
            client.send(Action.move(DIRECTION.SOUTH, isMotion))
        } else if (this.keysPressed['ArrowLeft'] || this.keysPressed[controlConfig.LEFT_KEY]) {
            client.send(Action.move(DIRECTION.WEST, isMotion))
        } else {
            switch (key) {
                case 'ArrowUp':
                case controlConfig.UP_KEY:
                    client.send(Action.move(DIRECTION.NORTH, isMotion));
                    break;
                case 'ArrowDown':
                case controlConfig.DOWN_KEY:
                    client.send(Action.move(DIRECTION.SOUTH, isMotion));
                    break;
                case 'ArrowLeft':
                case controlConfig.LEFT_KEY:
                    client.send(Action.move(DIRECTION.WEST, isMotion));
                    break;
                case 'ArrowRight':
                case controlConfig.RIGHT_KEY:
                    client.send(Action.move(DIRECTION.EAST, isMotion));
                    break;
                default:
                    break;
            }
        }
    }
}

export default Controller;