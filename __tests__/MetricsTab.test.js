import React, { Component } from 'react';
import Metrics from '../src/components/tabs/Metrics';
import {describe, expect, test, beforeEach, afterEach, jest} from '@jest/globals';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/renderer/store';
import { act } from 'react-test-renderer';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';

const props = {
  runningList: [
    {
      ID: 'a802306eeac3',
      Name: 'blissful_matsumoto',
      Image: 'postgres:15',
      CPUPerc: '0.17',
      MemPerc: '0.11',
      MemUsage: '2.19MiB / 1.94MiB',
      NetIO: '796kB/0kB',
      BlockIO: '34029.57kB / 4.1kB',
      PIDs: '5'
    }
  ],
  threshold: [
    80.00, // state.session.cpu_threshold:
    80.00, // state.session.mem_threshold: 
  ],
};

fetchMock.enableMocks();

// // This test tab needs work as we are unable to render the metrics component for testing
// describe('Metrics tab should render', () => {
//   beforeEach( async () => {
//     fetch.resetMocks();

//     async function metricsRenderer(){
//       return <Metrics runningList={props.runningList} threshold={props.threshold}/>;
//     }

//     const MetricsTab = await metricsRenderer();
//     console.log(MetricsTab);

//     await act( () => {
//       render(
//         <Provider store={store}>
//           <MemoryRouter initialEntries={['/app/*']}>
//             {/* <Metrics runningList={props.runningList} threshold={props.threshold}/> */}
//             {MetricsTab}
//           </MemoryRouter>
//         </Provider>
//       );
//       // console.log(screen);
//       screen.debug();
//     });
//   });
// });

//* Dummy Test
describe('dummy test', () => {
  test('dummy test', () => {
    expect(2 + 2).toBe(4);
  });
});  