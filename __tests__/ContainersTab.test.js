import React, { Component } from 'react';
import Containers from '../src/components/tabs/Containers';
import {describe, expect, test, jest} from '@jest/globals';
import '@testing-library/react';
import '@testing-library/jest-dom';
import { Chart } from 'react-chartjs-2'; 
import ToggleDisplay from '../src/components/display/ToggleDisplay';
// Started to migrate to React-Testing-Library...
import { create } from 'react-test-renderer';
import { fireEvent, render, screen } from '@testing-library/react';


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
      ID: 'c902ec744095', // only this property was correctly referenced!
      Image: '84c5f6e03bf0', 
      RunningFor: '2 days ago',
      Img: '84c5f6e03bf0', // this property is not used...
      Created: '2 days ago', // this property is not used
      name: 'zealous_pare' // this property is also not used anywhere
    }
  ],
  stop: jest.fn(),
  remove: jest.fn(),
  runStopped: jest.fn()
};


/**     Docketeer 7.0
 * This was the previous groups code, we left commented just incase it became useful down the road.
 */

// Debug test
describe('Containers', () => {
  beforeEach(()=>{
    render(<Containers {...props} />);
  });

  describe('Running List containers', () => {

    test('Should have render correct amount of containers', () => {
      const runningContainers = screen.getByText('Running Containers', {exact:false});
      const text = runningContainers.innerHTML;
      // console.log(text)
      // screen.debug(runningContainers)
      expect(text).toEqual(`Running Containers: ${props.runningList.length}`);
    });

    test('Name of container should properly display', ()=>{
      const h3 = screen.getAllByRole('heading', { level: 3 });
      const name = h3[0].innerHTML;
      expect(name).toEqual('blissful_matsumoto');
      console.log(name);
    });
    
    test('Show details button works', async () => {

      // const mockButton = jest.fn(ToggleDisplay);
      // screen.debug(mockButton)
      // mockButton();
      // expect(mockButton).toBeCalled; 

      // this test is very basic...
      // i don't think we can fully check functionality without using chart.js
      const buttons = screen.getAllByRole('button');
      const showDetails = buttons[0];
      await fireEvent.click(showDetails);
      expect(showDetails).toBeCalled
      screen.debug()
    });

    test('Stop button is called', async () => {   
      const stopButton = document.querySelector('.stop-btn');
      await fireEvent.click(stopButton);
      screen.debug();
      expect(stopButton).toBeCalled;
    });
    
    test('Wanted to test toggle display',() => {
      render(<ToggleDisplay/>);
      screen.debug();
      expect(1).toBe(1);
    });

  });

  describe('Stopped List Containers', () => {

    xtest('Should have render correct amount of containers', () => {
      const exitedContainers = screen.getByText('Exited Containers', {exact:false});
      const text = exitedContainers.innerHTML;
      expect(text).toEqual(`Exited Containers: ${props.stoppedList.length}`);
    });

    test('Name of container should properly display', () => {
      const name = screen.getAllByText('zealous');
      expect(name).toHaveLength(2);
    });

    test('Run and remove button should fire', async () => {
      const buttons = screen.getAllByRole('button');
      const runButton = buttons[2];
      const removeButton = buttons[3];
      await fireEvent.click(runButton);
      await fireEvent.click(removeButton);
      expect(runButton).toBeCalled;
    });
    
  });
}); 

// check if chart autorefreshes?



// function shallowSetup() {
//   const props = {
//     runningList: [
//       {
//         block: '0B/0B',
//         ID: 'a802306eeac3',
//         CPUPerc: '0.17%',
//         MemPerc: '0.11%',
//         MemUsage: '2.195MiB/1.944GiB',
//         Name: 'blissful_matsumoto',
//         NetIO: '796B/0B',
//         PIDs: '5'
//       }
//     ],
//     stoppedList: [
//       {
//         Name: 'zealous',
//         ID: 'c902ec744095',
//         Img: '84c5f6e03bf0',
//         Created: '2 days ago',
//         name: 'zealous_pare'
//       }
//     ]
//   };
//   const reactWrapper = create(<Containers {...props} />);

//   return {
//     props,
//     reactWrapper
//   };
// }

// describe('Running containers are being rendered', () => {
//   test('Should render <div> tag that has title renderContainers in Running', () => {
//     // Testing for if there is a container with the title of renderContainer
//     render(<Containers {...props} />);

//     const renderContainer = screen.getByTitle('renderContainers');
//     expect(renderContainer).toHaveClass('renderContainers');
//   });

//   test('Should render the correct number of containers', () => {
//     const { container } = render(<Containers {...props} />);
//     const containers = container.getElementsByClassName('containers');
//     expect(containers.length).toBe(1);
//   });
// });

// describe('It should render the exited containers', () => {
//   test('Should have a className run-btn in Stopped component', () => {
//     render(<Containers {...props} />);

//     const runBtnRender = screen.getByTestId('run-btn');

//     expect(runBtnRender).toHaveClass('run-btn');
//   });

/**      Docketeer 7.0
 * These are all preliminary tests that were not veted out. Could be useful as a starting point.
 */

// ! NEED TO FIGURE OUT HOW TO ADD ONCLICK TEST
// test('ClassName run-btn in stopped component have onClick function', () => {
//   const handleOnClick = jest.fn();

//   render(<Containers {...props} runStopped={handleOnClick} />);

//   const runBtnRender = screen.queryByText('RUN');
//   // screen.queryByText('RUN');

//   fireEvent.click(runBtnRender);

//   expect(runBtnRender).toHaveBeenCalledTimes(1);
// });
// });

// describe('It should render the exited containers', () => {
//   const { reactWrapper } = shallowSetup();
// !   test('Should render <div> tag in Stopped', () => {
// !    expect(reactWrapper.type()).toEqual('div');
// !   });

//*   test('Should have className run-btn in Stopped component', () => {
//*     expect(
//*       reactWrapper.find('.stopped-button').props().children[0].props.className
//*     ).toEqual('run-btn');
//*   });

//   test('ClassName run-btn in Stopped component have onClick function', () => {
//     expect(
//       reactWrapper.find('.stopped-button').props().children[0].props.onClick
//     ).toBeDefined();
//   });

//   test('Should have className stop-btn in Stopped component', () => {
//     expect(
//       reactWrapper.find('.stopped-button').props().children[1].props.className
//     ).toEqual('stop-btn');
//   });

//   test('ClassName stop-btn in Stopped component have onClick function', () => {
//     expect(
//       reactWrapper.find('.stopped-button').props().children[1].props.onClick
//     ).toBeDefined();
//   });
// });

//* Dummy Test
describe('dummy test', () => {
  test('dummy test', () => {
    expect(2 + 2).toBe(4);
  });
});