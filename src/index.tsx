import React from 'react';
import { render } from 'react-dom';
import Entry from './containers/Entry';
import reportWebVitals from './reportWebVitals';
import { createIntlProvider } from './context/intl';
import { createStoreProvider } from './context/store';
import reducer from './reducers';
import storeState from './config/storeState';
import langs from './translations';
import './index.css';

const IntlProvider = createIntlProvider(langs.en);
const StoreProvider = createStoreProvider(reducer, storeState);
const MOUNT_NODE = document.getElementById('dr') as HTMLDivElement;

render(
    <StoreProvider>
        <IntlProvider>
            <Entry />
        </IntlProvider>
    </StoreProvider>,
    MOUNT_NODE
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
