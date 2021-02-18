import React, { useReducer, createContext, useRef } from "react";
import { State } from "../types/context";
import Client from "../controllers/Client";
import { Renderer } from "pixi.js";

export const StoreContext = createContext<any>({});

export const createStoreProvider = (
    reducers: (state: any, action: {
        type: string;
        payload: any;
    }) => any,
    initialState: State
) => ({children}: {children: React.ReactNode}) => {
    const clientRef = useRef(new Client());
    const rendererRef = useRef(new Renderer());
    const [state, dispatch] = useReducer(reducers, initialState);
    const values = {
        clientRef,
        rendererRef,
        ...state, dispatch,
    };

    return (
        <StoreContext.Provider value={values}>
            {React.Children.only(children)}
        </StoreContext.Provider>
    );
};
