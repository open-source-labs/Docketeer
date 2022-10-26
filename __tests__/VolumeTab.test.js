/**        Docketeer 7.0
 * These tests do not work as enzyme is highly depricated and does not communicate with React 18
 */

import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import VolumeTab from "../src/components/tabs/VolumeHistory";

configure({ adapter: new Adapter() })

describe('Volumes Tab', () => {
  const props = {
    volumeContainersList: [
      {
        vol_name: 'volumetest1',
        containers: [
          { Names: 'container1', State: 'Running', Status: '40 minutes ago' },
        ]
      },
      {
        vol_name: 'volumetest2',
        containers: [
          { Names: 'container2', State: 'Running', Status: '25 minutes ago' },
          { Names: 'container3', State: '', Status: '' }
        ]
      }
    ]
  };

  const wrapper = shallow(<VolumeTab {...props} />);
  // console.log(wrapper.debug())
   
  it('renders a <div> element for Volume Tab', () => {
    expect(wrapper.type()).toEqual('div');
  });

  it('renders each volume in state', () => {
    expect(wrapper.find('div.containers').children().length)
      .toBe(props.volumeContainersList.length);
  });

  it('renders a <div> element for each container in volume', () => {
    wrapper.find('.volume-container-details').forEach((node) => {
      expect(node.type()).toEqual('div');
    });
  });

  it('renders the correct number of containers for each volume', () => {
    expect(wrapper.find('.box').at(0).find('.volume-container-details').length)
      .toBe(props.volumeContainersList[0].containers.length);
    expect(wrapper.find('.box').at(0).find('.volume-container-details').length)
      .toEqual(1);
    expect(wrapper.find('.box').at(0).find('.volume-container-details').length)
      .not.toBe(0);
    expect(wrapper.find('.box').at(0).find('.volume-container-details').length)
      .not.toBe(undefined);
  });

  it('each container renders correct properties from state', () => {
    expect(wrapper.find('.volume-container-details').at(0).childAt(1).text())
      .toEqual(props.volumeContainersList[0].containers[0].Names);
    expect(wrapper.find('ul').at(0).childAt(0).text())
      .toEqual(`Status: ${props.volumeContainersList[0].containers[0].State}`);
    expect(wrapper.find('ul').at(0).childAt(1).text())
      .toEqual(`Running For: ${props.volumeContainersList[0].containers[0].Status}`);
  });
});