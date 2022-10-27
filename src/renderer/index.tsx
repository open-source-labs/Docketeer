import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client'

// Redux
import { Provider } from 'react-redux';
import store from './store';

import '../assets/css/styles.css';
import '../assets/css/metric.css';
import '../assets/css/running.css';
import '../assets/css/static.css';
import { App } from './App.js';


const rootNode = document.getElementById('root')!;
const root = createRoot(rootNode)
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </BrowserRouter>
    {/* </React.StrictMode> */}
  </Provider>
);

