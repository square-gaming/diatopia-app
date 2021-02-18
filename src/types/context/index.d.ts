import React from 'react';
import { WorldState } from '../reducers';
import Client from '../../controllers/Client';
import { Renderer } from 'pixi.js';

export interface State {
    world: WorldState;
}
export interface StoreState {
    clientRef: React.MutableRefObject<Client>;
    rendererRef: React.MutableRefObject<Renderer>;
    world: WorldState;
    dispatch: React.Dispatch<{type: string; payload?: any;}>;
}