import React from 'react';
import { configure, shallow } from 'enzyme'; // enzyme
import Adapter from 'enzyme-adapter-react-16'; // enzyme

import Stopped from '../src/components/tabs/Stopped';


configure({ adapter: new Adapter() }); // enzyme

// runningList: [{ block: "1B/2B", cid: "6f49565a501c", cpu: "20.00%", mp: "0.00%", mul: "5B/6B", name: "checkpoint_nginx_1", net: "3B/4B", pids: "0" }],
//Name: zealous_pare ID: c902ec744095 Img: 84c5f6e03bf0 Created: 2 days ago name: zealous_pare
function shallowSetup() {
  const props = {
    runningList: [{ Name: 'zealous', ID: 'c902ec744095', Img: '84c5f6e03bf0', Created: '2 days ago', name: 'zealous_pare'}]
  }
  const enzymeWrapper = shallow(<Stopped {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

describe('Stopped containers are being rendered', () => {
  // Setup wrapper and assign props.
  const { enzymeWrapper, props } = shallowSetup();
  it('Should render <div> tag in Stopped', () => {
    expect(enzymeWrapper.type()).toEqual('div');
  })
  
  });  