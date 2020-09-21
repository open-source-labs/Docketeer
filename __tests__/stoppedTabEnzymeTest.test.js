import React from 'react';
import { configure, shallow } from 'enzyme'; // enzyme
import Adapter from 'enzyme-adapter-react-16'; // enzyme

import Stopped from '../src/components/tabs/Stopped';


configure({ adapter: new Adapter() }); // enzyme


describe('React unit tests', () => {

    describe('Stopped', () => {
        let wrapper = (<Stopped/>)
        let tester = (<renderStoppedList/>)

    beforeAll(() => {
        let wrapper = (<Stopped/>)
        let tester = (<renderStoppedList/>)
        //need to insert props
        // wrapper = shallow(<renderStoppedList/>);
    })

    it('renders Stopped containers', () => {
        wrapper
      })

    it('Renders a <div> tag', () => {
        // expect(wrapper.find('div')).toHaveLength(1)
        console.log(wrapper.type())
        console.log(tester)
        });
    })
})


