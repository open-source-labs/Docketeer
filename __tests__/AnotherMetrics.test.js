import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import toJson from 'enzyme-to-json';
import * as Redux from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Metrics from '../src/components/tabs/Metrics';

// Newer Enzyme versions require an adapter to a particular version of React
configure({ adapter: new Adapter() });

const mockSelectors = (storeValues) => {
    const mockStore = configureMockStore()({
        mobile: {
            // runningList: [{ block: "1B/2B", cid: "6f49565a501c", cpu: "20.00%", mp: "0.00%", mul: "5B/6B", name: "checkpoint_nginx_1", net: "3B/4B", pids: "0" }],
            ...storeValues
        },
    });
    
    jest.spyOn(Redux, 'useSelector')
    .mockImplementation((state) => mockStore.getState());
};

describe('Metrics Test', () => {
    let component;
    beforeEach(() => {
        ////////////////////////////////////////
        //I honestly don't know why this part is needed, but without it, it doesn't work
        mockSelectors({
            mobile: {
                runningList: [{ block: "1B/2B", cid: "6f49565a501c", cpu: "20.00%", mp: "0.00%", mul: "5B/6B", name: "checkpoint_nginx_1", net: "3B/4B", pids: "0" }],
            },
        });
        //////////////////////////////////////
        component = shallow(<Metrics />);
    });

    it('Metrics Test Render Properly', () => {
        expect(component).toBeDefined();
    })

    it('Renders <p> tag of chart information properly', () => {
        expect(component.find('p.legend-text')).toHaveLength(4);
    })

    it('Renders Pie chart data properly', () => {

        component.find('p.legend-text').forEach((value) => {
            expect(value.text()).toContain('0')
        })
    });

    it('Renders NET I/O and BLOCK I/O data properly', () => {
        //console.log(component.debug())
        component.find('p.chart-number').forEach((value) => {
            //console.log(value.debug())
            expect(value.text()).toContain('0');
        })
    })
});
