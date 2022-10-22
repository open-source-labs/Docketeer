import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { createRoot } from 'react-dom/client'

// Redux
import { Provider } from 'react-redux';
import store from './store';

import '../components/css/styles.css';
import '../components/css/metric.css';
import '../components/css/running.css';
import '../components/css/static.css';
import { App2 } from './App2.js';


const rootNode = document.getElementById('root')!;
const root = createRoot(rootNode)
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<App2 />} />
        </Routes>
      </BrowserRouter>
    {/* </React.StrictMode> */}
  </Provider>
);

