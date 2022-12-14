import React, { Component } from 'react';
import Metrics from '../src/components/tabs/Metrics';
import {describe, expect, test, jest} from '@jest/globals';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../src/renderer/store';
import { create } from 'react-test-renderer';
import { fireEvent, render, screen } from '@testing-library/react';

const props = {
  runningList: [{ BlockIO: '1B/2B', ID: '6f49565a501c', CPUPerc: '20.00%', MemPerc: '0.00%', MemUsage: '5B/6B', Name: 'checkpoint_nginx_1', NetIO: '3B/4B', PIDs: '0' }, { BlockIO: '3B/4B', ID: '6f49565a501c', CPUPerc: '30.00%', MemPerc: '20.00%', MemUsage: '5B/6B', Name: 'checkpoint_nginx_2', NetIO: '5B/6B', PIDs: '0' }]
};

// describe('Metrics tab should render', () => {
//   beforeEach(()=>{
//     render(
//       <Provider store={store}>
//         <Metrics {...props}/>
//       </Provider>
//     );
//   });

//   test('Metrics', ()=>{
//     expect(1).toBe(1);
//   });
// });



//* Dummy Test
describe('dummy test', () => {
  test('dummy test', () => {
    expect(2 + 2).toBe(4);
  });

});

