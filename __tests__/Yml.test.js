import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Yml from '../src/components/tabs/Yml';
import "babel-polyfill";

// Newer Enzyme versions require an adapter to a particular version of React
configure({ adapter: new Adapter() });

function shallowSetup() {

    const props = {
        networkList:     [{
            "a": [
                {"cid": "1", "name": "conatiner1"},
                {"cid": "2", "name": "container2"}
                ]
        },
        {
            "b": [
                {"cid": "3", "name": "container3"},
                {"cid": "4", "name": "container4"}
                ]
        }],
    }

  const enzymeWrapper = shallow(<Yml {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('Shallow rendered for Docker Compose Up', () => {
    let wrapper;     

    beforeEach(() => {
        // const mockUseEffect = jest.fn();
        // React.useEffect = mockUseEffect;
        wrapper = shallowSetup();
      });
    
//     afterEach(() => {
//         jest.clearAllMocks();
//     });

    it('should render the Docker Compose Up button properly', () => {

      expect(enzymeWrapper.containsMatchingElement(<button>Docker Compose Up</button>)).toBe(true);
      
      expect(enzymeWrapper.find('button').props().className).toEqual('btn');

      //expect(await enzymeWrapper.find('button').props().onClick()).toBeDefined();
      // console.log(enzymeWrapper.debug())

      // await enzymeWrapper.find('button').simulate('click');
      // await tick();
      expect(enzymeWrapper.find('.containers').text()).toEqual('<NetworkDisplay />')

    });

    it('should render the NetworkDisplay properly', () => {
      expect(enzymeWrapper.find('.containers').text()).toEqual('<NetworkDisplay />')
      // const enzymeWrapperNetwork = shallow(<NetworkDisplay {...props} />);
      // console.log(enzymeWrapperNetwork.debug())
    })

    function tick() {
      return new Promise(resolve => {
        setTimeout(resolve, 0);
      })
    }

  });
