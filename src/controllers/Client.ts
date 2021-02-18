import ACTION_TYPE from "../constants/actionType";
import { Action } from "../types";

class Client {
    private user: Object | undefined;
    private ws: WebSocket | undefined;
    private buffer: Action[];
    private callback: ((...args: any[]) => void) | undefined;

    constructor() {
        this.buffer = [];
    }

    public get readyState(): number {
        if (this.ws) {
            return this.ws.readyState;
        }
        return WebSocket.CLOSED;
    }

    public connect(user: Object, url: string, callback?: (...args: any[]) => void, protocols?: string | string[] | undefined) {
        this.ws = new WebSocket(url, protocols);
        this.user = user;
        this.callback = callback;
        this.setUp();
    }

    public release(): Promise<Action[]> {
        return new Promise((resolve: (value?: Action[]) => void) => {
            resolve(this.buffer.splice(0, this.buffer.length));
        });
    }

    public send(action: Action) {
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
                const actions: Action[] = JSON.parse(e.data);

                this.buffer = this.buffer.concat(actions);
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