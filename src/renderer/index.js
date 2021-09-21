import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import { Provider } from 'react-redux';
import App from '../components/App';
import '../components/css/styles.css';
import '../components/css/metric.css';
import '../components/css/running.css';
import '../components/css/static.css';
import Login from '../components/login/login';
import { HashRouter as Router } from 'react-router-dom';
import memoryNotification from '../main/slack/memoryNotification.js'
import cpuNotification  from '../main/slack/cpuNotification.js'
//const request = require('request-promise')
/**
 * Electron's path configuration is done invoking fixPath
 * Will not run without this logic
 */
const request = require('request')


//import dotenv

//cpuNotification()

const dotenv = require('dotenv');
dotenv.config();

// const URL = process.env.URL

// const cpuNotification = async function(){
//   try {
//     console.log('here')
//     const payload = {"text": "The CPU threshold has been met or exceeded"}
//     console.log('here2')
//     (await request({
//       url: URL,
//       method: 'POST',
//       body: payload,
//       json: true
//     }))
//   } catch(e){
//     console.log('this is our error', e)
//   }
// }
memoryNotification();
cpuNotification();

const fixPath = require('fix-path');
fixPath();

ReactDOM.render(
  <Provider store={store}>
    <Router >
      <Login />
    </Router>
  </Provider>,
  document.getElementById('app')

);
