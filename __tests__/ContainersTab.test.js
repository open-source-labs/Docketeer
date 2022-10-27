import React, { Component } from 'react';
import Containers from '../src/components/tabs/Containers';

// Started to migrate to React-Testing-Library...
import { create } from 'react-test-renderer';
import { fireEvent, render, screen } from '@testing-library/react';
import * as actions from '@testing-library/jest-dom';

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
      Img: '84c5f6e03bf0',
      Created: '2 days ago',
      name: 'zealous_pare'
    }
  ]
};
/**     Docketeer 7.0
 * This was the previous groups code, we left commented just incase it became useful down the road.
 */

// Debug test
// describe('Containers', () => {
//   test('Renders the Container Component', () => {
//     render(<Containers {...props} />);
//     // Screening the component
//     screen.debug();
//   });
// });

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

//! NEED TO FIGURE OUT HOW TO ADD ONCLICK TEST
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
//!   test('Should render <div> tag in Stopped', () => {
//!    expect(reactWrapper.type()).toEqual('div');
//!   });

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
