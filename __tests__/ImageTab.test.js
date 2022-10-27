/**        Docketeer 7.0
 * These tests do not work as enzyme is highly depricated and does not communicate with React 18
 */

import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Images from "../src/components/tabs/Images";

configure({ adapter: new Adapter() });
function shallowSetup() {
  const props = {
    imagesList: [
      {
        resp: 'node-php-something',
        tag: 'latest',
        imgid: 'fc266a46f885',
        created: 'toady',
        size: '234mb',
      },
    ],
  };
  const enzymeWrapper = shallow(<Images {...props} />);
  return {
    props,
    enzymeWrapper,
  };
}
describe('Shallow all of the properties of the Images', () => {
  const { enzymeWrapper } = shallowSetup();
  it('Should render <div> tag in Images', () => {
    expect(enzymeWrapper.type()).toEqual('div');
    expect(
      enzymeWrapper.find('div.renderContainers').find('div').length
    ).toEqual(8);
  });
  it('Should render <h1> tag in Images with a title Images', () => {
    expect(enzymeWrapper.containsMatchingElement(<h1>Images</h1>)).toBe(true);
    expect(enzymeWrapper.find('.tabTitle').text()).toEqual('Images');
  });
  it('Should render a div tag called runByImage and display all of the properties', () => {
    expect(enzymeWrapper.find('div.runByButton').find('button').length).toEqual(
      1
    );
    expect(enzymeWrapper.find('div.runByButton').find('label').length).toEqual(
      1
    );
    expect(enzymeWrapper.find('div.runByButton').find('span').length).toEqual(
      1
    );
    expect(enzymeWrapper.find('div.runByButton').find('input').length).toEqual(
      1
    );
  });
  it('render a div with a class name "containers" and all of it properties', () => {
    expect(enzymeWrapper.find('div.containers'));
    expect(enzymeWrapper.find('div.box').find('div').length).toEqual(4);
    expect(enzymeWrapper.find('div.box-label').find('h3').length).toEqual(1);
    expect(enzymeWrapper.find('div.box-label').find('p').length).toEqual(1);
    expect(enzymeWrapper.find('div.stopped-info').find('li').length).toEqual(2);
    expect(
      enzymeWrapper.find('div.stopped-button').find('button').length
    ).toEqual(2);
  });
});
