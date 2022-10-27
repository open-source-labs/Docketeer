import React from 'react';
import ReactDOM from 'react-dom';

import '../components/css/styles.css';
import '../components/css/metric.css';
import '../components/css/running.css';
import '../components/css/static.css';


import {App2} from './App2'

// import fixPath from 'fix-path'; // Required for Electron's path configuration
// fixPath();

ReactDOM.render( 
<React.StrictMode>
  <App2 />
</React.StrictMode>, 
document.getElementById('root')
);
