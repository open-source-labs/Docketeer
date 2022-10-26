/**        Docketeer 7.0
 * These tests do not work as enzyme is highly depricated and does not communicate with React 18
 */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Metrics from '../src/components/tabs/Metrics';

// Newer Enzyme versions require an adapter to a particular version of React
configure({ adapter: new Adapter() });

function shallowSetup() {

  const props = {
    runningList: [{ BlockIO: "1B/2B", ID: "6f49565a501c", CPUPerc: "20.00%", MemPerc: "0.00%", MemUsage: "5B/6B", Name: "checkpoint_nginx_1", NetIO: "3B/4B", PIDs: "0" }, { BlockIO: "3B/4B", ID: "6f49565a501c", CPUPerc: "30.00%", MemPerc: "20.00%", MemUsage: "5B/6B", Name: "checkpoint_nginx_2", NetIO: "5B/6B", PIDs: "0" }]
  }

  const enzymeWrapper = shallow(<Metrics {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('Shallow rendered Metrics for chart', () => {
  // Setup wrapper and assign props.

  const { enzymeWrapper, props } = shallowSetup();

  it('Should render <div> tag in Metrics', () => {
    expect(enzymeWrapper.type()).toEqual('div');
  })

  it('Should render Pie chart data properly', () => {

    // enzymeWrapper.find(selector) : Find every node in the render tree that matches the provided selector.
    expect(enzymeWrapper.find('p.legend-text')).toHaveLength(4);
    enzymeWrapper.find('p.legend-text').forEach((element) => {

      let value = element.text().split(' ')
      let percentage = parseInt(value[1].substr(0, value[1].length-4));
      expect(percentage).toBeGreaterThanOrEqual(0);
    });

  });

  it('should have valid number of Net I/O and Block I/O of <p>', () => {
    expect(enzymeWrapper.find('p.chart-number')).toHaveLength(2);
  })

  it('should render Net I/O data properly', () => {
    
    enzymeWrapper.find('p.chart-number').forEach((element, i) => {
      if(i === 0){
        let value = element.text().split('/')
        let IOFront = parseInt(value[0].substr(0, value[0].length-2));
        let IOBack = parseInt(value[1].substr(0, value[1].length-2));
        
        expect(IOFront).toBeGreaterThanOrEqual(0);
        expect(IOBack).toBeGreaterThanOrEqual(0);
      }      
    });
  });  

  it('should render Block I/O data properly', () => {
    
    enzymeWrapper.find('p.chart-number').forEach((element, i) => {
      if(i === 1){
        let value = element.text().split('/')
        let IOFront = parseInt(value[0].substr(0, value[0].length-1));
        let IOBack = parseInt(value[1].substr(0, value[1].length-1));
        
        expect(IOFront).toBeGreaterThanOrEqual(0);
        expect(IOBack).toBeGreaterThanOrEqual(0);
      }      
    });
  });  
});

