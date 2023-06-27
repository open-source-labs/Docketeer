// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import './main.scss';



const root = ReactDOM.createRoot(document.getElementById('root') as Element);

root.render(
  // Import curly braces Provider from react-redux, then we want to import that store variable that we just exported
  // import store from './store' location 
  // then we make a file called hooks.ts
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
