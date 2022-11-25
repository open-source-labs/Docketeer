/**        Docketeer 7.0
 * These tests do not work as enzyme is highly depricated and does not communicate with React 18
 */

import React from 'react';
import { describe, expect, test, jest } from '@jest/globals';
import Images from '../src/components/tabs/Images';
// import ImageUsers from '../src/components/tabs/ImagesUser';

import mockAxios from 'axios';
import '@testing-library/react';
import '@testing-library/jest-dom';
import {
  fireEvent,
  getByLabelText,
  getByTestId,
  render,
  screen,
} from '@testing-library/react';

const props = {
  imagesList: [
    {
      ID: '2718634043dc',
      Size: '111 MB',
      Name: 'redis',
    },
  ],
  runIm: jest.fn(),
  removeIm: jest.fn(),
};

/* ----- mock functions ----- */

// jest.mock('axios');
// const mockRun = jest.fn();
// const mockRremove = jest.fn();

/* ----- button testing ------ */

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

describe('Images', () => {
  it('renders an image if one is found', () => {
    render(<Images {...props} />);
  });
  it('refreshes page if image removed', () => {
    // need to check that refreshRunning helper function is called

  });
});

//* Dummy Test
describe('dummy test', () => {
  test('dummy test', () => {
    expect(2 + 2).toBe(4);
  });
});
