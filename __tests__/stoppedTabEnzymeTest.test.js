import React from 'react';
import { configure, shallow } from 'enzyme'; // enzyme
import Adapter from 'enzyme-adapter-react-16'; // enzyme

import Stopped from '../src/components/tabs/Stopped';


configure({ adapter: new Adapter() }); // enzyme

function shallowSetup() {
  const props = {
    stoppedList: [{ Name: 'zealous', ID: 'c902ec744095', Img: '84c5f6e03bf0', Created: '2 days ago', name: 'zealous_pare'}]
  }
  const enzymeWrapper = shallow(<Stopped {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('Stopped containers are being rendered', () => {
  // Setup wrapper and assign props.
  const { enzymeWrapper, props} = shallowSetup();
  it('Should render <div> tag in Stopped', () => {
    expect(enzymeWrapper.type()).toEqual('div');
  })
  
    it('Should have className run-btn in Stopped component', () => {
        expect(enzymeWrapper.find('.stopped-button').props().children[0].props.className).toEqual('run-btn')
    })
    
    it('ClassName run-btn in Stopped component have onClick function', () => {
        expect(enzymeWrapper.find('.stopped-button').props().children[0].props.onClick).toBeDefined()
    })

    it('Should have className stop-btn in Stopped component', () => {
        expect(enzymeWrapper.find('.stopped-button').props().children[1].props.className).toEqual('stop-btn')
    })
    
    it('ClassName stop-btn in Stopped component have onClick function', () => {
        expect(enzymeWrapper.find('.stopped-button').props().children[1].props.onClick).toBeDefined()
    })
});  

