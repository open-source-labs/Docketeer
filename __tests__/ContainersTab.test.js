import React from 'react';
import { Provider } from 'react-redux';
import Containers from '../src/components/Containers/Containers';
import {describe, beforeEach, expect, test, jest} from '@jest/globals';
import '@testing-library/jest-dom';
//import ToggleDisplay from '../src/components/display/ToggleDisplay';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../src/App';

const props = {
  runningList: [
    {
      block: '0B/0B',
      ID: 'a802306eeac3',
      CPUPerc: '0.17%',
      MemPerc: '0.11%',
      MemUsage: '2.195MiB/1.944GiB',
      Name: 'blissful_matsumoto',
      NetIO: '796B/0B',
      PIDs: '5'
    }
  ],
  stoppedList: [
    {
      Names: 'zealous',
      ID: 'c902ec744095', 
      Image: '84c5f6e03bf0', 
      RunningFor: '2 days ago',
    }
  ],
  container: {MemUsage:1},
  stop: jest.fn(),
  remove: jest.fn(),
  runStopped: jest.fn()
};


describe('Containers', () => {
  beforeEach(async () => {
    const app = await render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
  
  beforeEach(()=>{
    render(<Containers {...props} />);
  });

  describe('Running List containers', () => {

    test('Should have render correct amount of running containers', () => {
      const runningContainers = screen.getByText('Running Containers', {exact:false});
      const text = runningContainers.innerHTML;
      expect(text).toEqual(`Running Containers: ${props.runningList.length}`);
    });

    test('Name of container should properly display', ()=>{
      const h3 = screen.getAllByRole('heading', { level: 3 });
      const name = h3[0].innerHTML;
      expect(name).toEqual('blissful_matsumoto');
    });

    test('Stop button is called', async () => {   
      const stopButton = document.querySelector('.stop-btn');
      await fireEvent.click(stopButton);
    });
    
    test('Toggle Display button works', () => {
      render(<ToggleDisplay {...props}/>);
      const button = screen.getAllByRole('button');
      expect(button[0]).toHaveTextContent('Show Details');
      fireEvent.click(button[0]);
      expect(button[0]).toHaveTextContent('Hide Details');
      expect(button[1]).toHaveTextContent('STOP');
    });
  });

  describe('Stopped List Containers', () => {

    test('Should have render correct amount of containers', () => {
      const exitedContainers = screen.getByText('Exited Containers', {exact:false});
      const text = exitedContainers.innerHTML;
      expect(text).toEqual(`Exited Containers: ${props.stoppedList.length}`);
    });

    test('Name of container should properly display', () => {
      const name = screen.getAllByText('zealous');
      expect(name).toHaveLength(1);
    });

    test('Run and remove button should fire', async () => {
      const buttons = screen.getAllByRole('button');
      const runButton = buttons[2];
      const removeButton = buttons[3];
      await fireEvent.click(runButton);
      await fireEvent.click(removeButton);
      expect(runButton).toBeCalled;
      expect(removeButton).toBeCalled;
    });
  });
}); 

