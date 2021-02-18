import React, { createContext } from "react";

export const IntlContext = createContext<Map<string, string>>(new Map());

export const createIntlProvider = (language: Map<string, string>) => ({children}: {children: React.ReactNode}) => {
    return (
        <IntlContext.Provider value={language}>
            {React.Children.only(children)}
        </IntlContext.Provider>
    );
};