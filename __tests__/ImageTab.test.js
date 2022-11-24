/**        Docketeer 7.0
 * These tests do not work as enzyme is highly depricated and does not communicate with React 18
 */

import React from 'react';
import { describe, expect, test, jest } from '@jest/globals';
import Images from '../src/components/tabs/Images';
import '@testing-library/react';
import '@testing-library/jest-dom';
import {
  fireEvent,
  getByLabelText,
  getByTestId,
  render,
  screen,
} from '@testing-library/react';
import { remove } from '../src/components/helper/commands';

const props = {
  imagesList: [
    {
      ID: '2718634043dc',
      Size: '111 MB',
      Name: 'redis',
    },
  ],
  // repo: ['repo'],
  run: jest.fn(),
};

// Debug testing, checks for image box to render on screen
describe('Images', () => {
  it('renders an image', () => {
    render(<Images {...props} />);
  });
});

/* ----- button testing ------ */

// currently gets stuck at window.runExec method --> reads undefined
describe('run button on click', () => {
  it('fires run button functionality', async () => {
    const { container } = render(<Images {...props} />);
    const runButton = screen.getByRole('button', { name: 'RUN' });
    await fireEvent.click(runButton);
    expect(runButton).toBeCalled;
  });
});

// currently gets stuck at window.runExec method --> reads undefined
describe('pull button on click', () => {
  it('fires pull button functionality', async () => {
    const { container } = render(<Images {...props} />);
    const pullButton = screen.getByRole('button', { name: 'Pull' });
    await fireEvent.click(pullButton);
    expect(pullButton).toBeCalled;
  });
});

// currently gets stuck at window.runExec method --> reads undefined
describe('remove button on click', () => {
  it('fires remove button functionality', async () => {
    const { container } = render(<Images {...props} />);
    const removeButton = screen.getByRole('button', { name: 'REMOVE' });
    await fireEvent.click(removeButton);
    expect(removeButton).toBeCalled;
  });
});

// need test for text in input field?

/* ------ actions/reducers ------ */

// Get Images
// Refresh Images
// Remove Images



//   describe('Rendered images', () => {
//     test('run button works', async () => {
//       const runButton = document.querySelector('.run-btn');
//       await fireEvent.click(runButton);
//       screen.debug();
//       expect(runButton).toBeCalled;
//     });
//   });
// });

// configure({ adapter: new Adapter() });
// function shallowSetup() {
//   const props = {
//     imagesList: [
//       {
//         resp: "node-php-something",
//         tag: "latest",
//         imgid: "fc266a46f885",
//         created: "toady",
//         size: "234mb",
//       },
//     ],
//   };
//   const enzymeWrapper = shallow(<Images {...props} />);
//   return {
//     props,
//     enzymeWrapper,
//   };
// }
// describe("Shallow all of the properties of the Images", () => {
//   const { enzymeWrapper, props } = shallowSetup();
//   it("Should render <div> tag in Images", () => {
//     expect(enzymeWrapper.type()).toEqual("div");
//     expect(
//       enzymeWrapper.find("div.renderContainers").find("div").length
//     ).toEqual(8);
//   });
//   it("Should render <h1> tag in Images with a title Images", () => {
//     expect(enzymeWrapper.containsMatchingElement(<h1>Images</h1>)).toBe(
//       true
//     );
//     expect(enzymeWrapper.find(".tabTitle").text()).toEqual("Images");
//   });
//   it("Should render a div tag called runByImage and display all of the properties", () => {
//     expect(enzymeWrapper.find("div.runByButton").find("button").length).toEqual(
//       1
//     );
//     expect(enzymeWrapper.find("div.runByButton").find("label").length).toEqual(
//       1
//     );
//     expect(enzymeWrapper.find("div.runByButton").find("span").length).toEqual(
//       1
//     );
//     expect(enzymeWrapper.find("div.runByButton").find("input").length).toEqual(
//       1
//     );
//   });
//   it(`render a div with a class name "containers" and all of it properties`, () => {
//     expect(enzymeWrapper.find("div.containers"));
//     expect(enzymeWrapper.find("div.box").find("div").length).toEqual(4);
//     expect(enzymeWrapper.find("div.box-label").find("h3").length).toEqual(1);
//     expect(enzymeWrapper.find("div.box-label").find("p").length).toEqual(1);
//     expect(enzymeWrapper.find("div.stopped-info").find("li").length).toEqual(2);
//     expect(
//       enzymeWrapper.find("div.stopped-button").find("button").length
//     ).toEqual(2);
//   });
// });

//* Dummy Test
describe('dummy test', () => {
  test('dummy test', () => {
    expect(2 + 2).toBe(4);
  });
});
