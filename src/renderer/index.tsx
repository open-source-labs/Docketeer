import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'

// console.log('I HOPE THIS WORKS')
import '../components/css/styles.css';
// import '../components/css/metric.css';
// import '../components/css/running.css';
// import '../components/css/static.css';
import { App2 } from './App2.js';
import { Example } from './Example';
import Login from '../components/login/login';

const rootNode = document.getElementById('root')!;
const root = createRoot(rootNode)
root.render(<Login />);



// ReactDOM.render(<h2>Abigail is a gale-ing force</h2>, rootNode)

// import fixPath from 'fix-path'; // Required for Electron's path configuration
// fixPath();
// ReactDOM.createPortal(<App2 />, rootNode)

