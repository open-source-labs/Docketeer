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
//const request = require('request-promise')
/**
 * Electron's path configuration is done invoking fixPath
 * Will not run without this logic
 */
const request = require('request')

// let webhook = 'https://hooks.slack.com/services/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'

// const payload={"text":"FUCK!!!!"}

// const headers = {"Content-type": "application/json"}

// const fuck = request.post({url: webhook, payload: payload, headers: headers}, function(err, res){
//     if(err){console.log(err)}
//     if(res){console.log(res.body)}
// })
// const testing = async function(){
//   try {
//     console.log('here')
//     const payload = {"text": "Testing Message belugas"}
//     console.log('here2')
//     (await request({
//       url: 'https://hooks.slack.com/services/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',
//       method: 'POST',
//       body: payload,
//       json: true
//     }))
//   } catch(e){
//     console.log('this is our error', e)
//   }
// }
// testing();

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
