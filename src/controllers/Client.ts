import { EventEmitter } from "events";
import ACTION_TYPE from "../constants/actionType";
import { PayloadAction } from "@reduxjs/toolkit";
class Client extends EventEmitter {
    private user: Object | undefined;
    private ws: WebSocket | undefined;
    private buffer: PayloadAction<any>[];
    private callback: ((...args: any[]) => void) | undefined;

    constructor() {
        super();
        this.buffer = [];
    }

    public get readyState(): number {
        if (this.ws) {
            return this.ws.readyState;
        }
        return WebSocket.CLOSED;
    }

    public onAction(listener: (actions: PayloadAction<any>[]) => void) {
        this.on('action', listener);
    }

    public connect(user: Object, url: string, callback?: (...args: any[]) => void, protocols?: string | string[] | undefined) {
        this.ws = new WebSocket(url, protocols);
        this.user = user;
        this.callback = callback;
        this.setUp();
    }

    public release(): Promise<PayloadAction<any>[]> {
        return new Promise((resolve: (value: PayloadAction<any>[]) => void) => {
            resolve(this.buffer.splice(0, this.buffer.length));
        });
    }

    public send(action: PayloadAction<any>) {
        if (this.ws) {
            this.ws.send(JSON.stringify(action));
        } else {
            throw Error('Server is not connected.')
        }
    }

    private setUp() {
        if (this.ws) {
            this.ws.onclose = function (e) {
                console.log('Connection is closed', e);
            };
            this.ws.onerror = function (e) {
                console.error('WebSocket got error', e);
            };
            this.ws.onmessage = function (this: Client, e: MessageEvent) {
                const actions: PayloadAction<any>[] = JSON.parse(e.data);

                this.buffer = this.buffer.concat(actions);
                this.emit('action', this.buffer);
            }.bind(this);
            this.ws.onopen = function (this: Client, e: Event) {
                console.log('WebSocket is connecting', e);
                if (this.callback) {
                    this.callback();
                }
                this.ws?.send(JSON.stringify({
                    type: ACTION_TYPE.PLAYER.JOIN,
                    payload: this.user
                }));
            }.bind(this);
        } else {
            throw Error('Server is not connected.')
        }
    }
}

export default Client;