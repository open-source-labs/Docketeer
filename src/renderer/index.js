import React from 'react';
import ReactDOM from 'react-dom';
import store from "./store";
import { Provider } from "react-redux";
import App from '../components/App';
import '../components/css/styles.css';
import '../components/css/metric.css';
import '../components/css/running.css';
import '../components/css/static.css';
const fixPath = require('fix-path');

fixPath();
ReactDOM.render( 
<Provider store={store}>
    <App />
</Provider>,
 document.getElementById('app')
);


    