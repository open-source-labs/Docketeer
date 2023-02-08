// Import react
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import redux
import { Provider } from 'react-redux';
import store from './store';

// Import styles
import '../components/css/styles.css';
import '../components/css/metric.css';
import '../components/css/running.css';
import '../components/css/static.css';

// Import App parent component
import App from './App';

// Grab div with id of root
const container = document.getElementById('root');

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion

// Create react root
const root = ReactDOM.createRoot(container!);

// Render components
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
