// import React from 'react';
// import { configure, shallow, mount } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// // import toJson from 'enzyme-to-json';
// import * as Redux from 'react-redux';
// import configureMockStore from 'redux-mock-store';
// import Yml from '../src/components/tabs/Yml';

// // Newer Enzyme versions require an adapter to a particular version of React
// configure({ adapter: new Adapter() });

// function shallowSetup() {

//     const props = {
//         networkList:     [{
//             "a": [
//                 {"cid": "1", "name": "conatiner1"},
//                 {"cid": "2", "name": "container2"}
//                 ]
//         },
//         {
//             "b": [
//                 {"cid": "3", "name": "container3"},
//                 {"cid": "4", "name": "container4"}
//                 ]
//         }],
//         fileList: 'hello'
//     }

//   const enzymeWrapper = mount(<Yml {...props} composeymlFiles={jest.fn()}  setFilepath={jest.fn()} filepath={'Hello'} fileList={'hi'} setfileList={jest.fn()} />);

//   return {
//     props,
//     enzymeWrapper
//   };
// }

// describe('Shallow rendered for Docker Compose Up', () => {
//     let wrapper;     

//     beforeEach(() => {
//         const mockUseEffect = jest.fn();
//         React.useEffect = mockUseEffect;
//         wrapper = shallowSetup();
//       });
    
//     afterEach(() => {
//         jest.clearAllMocks();
//     });

//     it('should render ', () => {
//         // wrapper = wrapper.enzymeWrapper;
        
//         // expect(wrapper.containsMatchingElement(<button>Docker Compose Up</button>)).toBe(true);
//         // // expect(props.fetchAuthors).toHaveBeenCalled();
//         // console.log(wrapper.find('.fileList').text())
//     });
//   });
