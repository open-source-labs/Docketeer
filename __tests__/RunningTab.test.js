import React from 'react';
import { configure, shallow } from 'enzyme'; // enzyme
import Adapter from 'enzyme-adapter-react-16'; // enzyme

import Running from '../src/components/tabs/Running';


configure({ adapter: new Adapter() }); // enzyme

function shallowSetup() {
	const props = {
		runningList: [{
			block: "0B/0B",
			ID: "a802306eeac3",
			CPUPerc: "0.17%",
			MemPerc: "0.11%",
			MemUsage: "2.195MiB/1.944GiB",
			Name: "blissful_matsumoto",
			NetIO: "796B/0B",
			PIDs: "5"
		}]
	}
	const enzymeWrapper = shallow(<Running {...props} />);

	return {
		props,
		enzymeWrapper,
	};
}

describe('Running containers are being rendered', () => {
	const { enzymeWrapper, props } = shallowSetup();
	it('Should render <div> tag that has class renderContainers in Running', () => {
		expect(enzymeWrapper.type()).toEqual('div');
		expect(enzymeWrapper.hasClass('renderContainers')).toEqual(true);
	})

	it('Should render the correct number of containers', () => {
		expect(enzymeWrapper.find('.containers').children().length).toEqual(1);
	});

});

