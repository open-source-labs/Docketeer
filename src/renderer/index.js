import React from 'react';
import ReactDOM from 'react-dom';
import store from "./store";
import { Provider } from "react-redux";
import App from '../components/App';
import '../components/css/styles.css';
import '../components/css/metric.css';
import '../components/css/running.css';
import '../components/css/static.css';

/**
 * Electron's path configuration is done invoking fixPath
 * Will not run without this logic
 */
const fixPath = require('fix-path');

fixPath();
ReactDOM.render( 
<Provider store={store}>
    <App />
</Provider>,
 document.getElementById('app')
);


    