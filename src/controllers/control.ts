import React from 'react';
import controlConfig from '../config/control';
import Action from '../constants/action';
import { DIRECTION } from '../constants/direction';
import Client from './Client';

class Controller {
    private keysPressed: { [keyName: string]: boolean }
    private dispatch: React.Dispatch<{ type: string; payload?: any; }>
    
    constructor(dispatch: React.Dispatch<{ type: string; payload?: any; }>) {
        this.keysPressed = {};
        this.dispatch = dispatch;
    }

    public setUp(client: Client) {
        document.body.addEventListener('keydown', this.keydownHandler.bind(this, client));
        document.body.addEventListener('keyup', this.keyupHandler.bind(this, client));
    }

    private keydownHandler(this: Controller,client: Client, evt: KeyboardEvent) {
        if (!this.keysPressed[evt.key]) {
            this.keysPressed[evt.key] = true;
            this.moveControl(client, evt.key, true);
        }
    }

    private keyupHandler(this: Controller, client: Client, evt: KeyboardEvent) {
        this.moveControl(client, evt.key, false);
        this.interactControl(client);
        delete this.keysPressed[evt.key]
    }

    private interactControl(client: Client) {
        if (this.keysPressed['e'] || this.keysPressed['E']) {
            client.send(Action.interact());
        }
    }

    private moveControl(client: Client, key: string, motion: boolean) {
        switch (key) {
            case 'ArrowUp':
            case controlConfig.UP_KEY:
                client.send(Action.move(DIRECTION.NORTH, motion));
                break;
            case 'ArrowDown':
            case controlConfig.DOWN_KEY:
                client.send(Action.move(DIRECTION.SOUTH, motion));
                break;
            case 'ArrowLeft':
            case controlConfig.LEFT_KEY:
                client.send(Action.move(DIRECTION.WEST, motion));
                break;
            case 'ArrowRight':
            case controlConfig.RIGHT_KEY:
                client.send(Action.move(DIRECTION.EAST, motion));
                break;
            default:
                break;
        }
    }
}

export default Controller;