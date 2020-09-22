import React from 'react';
import { configure, shallow } from 'enzyme'; // enzyme
import Adapter from 'enzyme-adapter-react-16'; // enzyme

import Running from '../src/components/tabs/Running';


configure({ adapter: new Adapter() }); // enzyme

function shallowSetup() {
	const props = {
		runningList: [{
			block: "0B/0B",
			cid: "a802306eeac3",
			cpu: "0.17%",
			mp: "0.11%",
			mul: "2.195MiB/1.944GiB",
			name: "blissful_matsumoto",
			net: "796B/0B",
			pids: "5"
		}]
	}
	const enzymeWrapper = shallow(<Running {...props} />);

	return {
		props,
		enzymeWrapper,
	};
}

describe('Running containers are being rendered', () => {
	// Setup wrapper and assign props.
	const { enzymeWrapper, props } = shallowSetup();
	it('Should render <div> tag that has class renderContainers in Running', () => {
		expect(enzymeWrapper.type()).toEqual('div');
		expect(enzymeWrapper.hasClass('renderContainers')).toEqual(true);
	})

	it('Should render the correct number of containers', () => {
		expect(enzymeWrapper.find('.containers').children().length).toEqual(1);
	});

	// it('Should render the correct number of containers when a container is stopped', () => {
	// 	expect(enzymeWrapper.find('.stop-btn').simulate('click'));
	// 	expect(enzymeWrapper.find('.containers').children().length).toEqual(0);
	// });

	it('Should render a button with className run-btn with the text "Run"', () => {
		expect(enzymeWrapper.find('.run-btn').text()).toEqual('Run');
	})

	it('Should render a button with className run-btn that has a defined onClick Prop', () => {
		expect(enzymeWrapper.find('.run-btn').prop('onClick')).toBeDefined();
	})

});

