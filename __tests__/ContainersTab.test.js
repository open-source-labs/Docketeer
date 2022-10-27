import React, { Component } from 'react';
import Containers from '../src/components/tabs/Containers';

// import { configure, shallow } from 'enzyme'; // enzyme
// import Adapter from 'enzyme-adapter-react-16'; // enzyme
// configure({ adapter: new Adapter() }); // enzyme

// Migrating to React-Testing-Library
import { create } from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

describe('Containers', () => {
  test('Renders the Container Component', () => {
    render(<Component />);

    // Screening the component
    screen.debug();
  });
});

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
//   const { reactWrapper } = shallowSetup();
//   test('Should render <div> tag that has class renderContainers in Running', () => {
//     expect(reactWrapper.type()).toEqual('div');
//     // On line 184 of Containers.js. Testing if the main container is rederContainers
//     expect(reactWrapper.hasClass('renderContainers')).toEqual(true);
//   });

//   test('Should render the correct number of containers', () => {
//     expect(reactWrapper.find('.containers').children().length).toEqual(1);
//     expect(reactWrapper.find('.stopped-containers').children().length).toEqual(
//       1
//     );
//   });
// });

// describe('It should render the exited containers', () => {
//   const { reactWrapper } = shallowSetup();
//   test('Should render <div> tag in Stopped', () => {
//     expect(reactWrapper.type()).toEqual('div');
//   });

//   test('Should have className run-btn in Stopped component', () => {
//     expect(
//       reactWrapper.find('.stopped-button').props().children[0].props.className
//     ).toEqual('run-btn');
//   });

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
