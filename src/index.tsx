import React from 'react';
import { render } from 'react-dom';
import Entry from './containers/Entry';
import reportWebVitals from './reportWebVitals';
import './index.css';

const MOUNT_NODE = document.getElementById('dr') as HTMLDivElement;

render(
    <Entry />,
    MOUNT_NODE
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
