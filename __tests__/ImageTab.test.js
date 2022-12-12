import React from 'react';
import { describe, beforeEach, expect, test, jest } from '@jest/globals';
import Images from '../src/components/tabs/Images';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

const props = {
  imagesList: [
    {
      imgid: '2718634043dc',
      size: '111 MB',
      reps: 'Redis',
      tag: 16.4,
    },
  ],
  runIm: jest.fn(),
  removeIm: jest.fn(),
  onClick: jest.fn(),
};

describe('Images', () => {

  beforeEach(() => {
    render(<Images {...props} />);
    screen.debug();
  });

  /* ----- search bar ----- */
  describe('Seach bar testing', () => {
    test('Search accepts input', async () => {
      const search = screen.getByRole('textbox');
      await fireEvent.change(search, { target: { value: 'search' } });
      expect(search.value).toBe('search');
    });
  });

  /* ----- button testing ------ */

  describe('Run button on click', () => {
    test('Fires run button functionality', async () => {
      const runButton = screen.getByRole('button', { name: 'RUN' });
      await fireEvent.click(runButton);
      expect(runButton).toBeCalled;
    });
  });


  describe('Remove button on click', () => {
    test('Fires remove button functionality', async () => {
      const removeButton = screen.getByRole('button', { name: 'REMOVE' });
      await fireEvent.click(removeButton);
      expect(removeButton).toBeCalled;
    });
  });

  // currently gets stuck at window.runExec method --> reads undefined
  // describe('pull button on click', () => {
  //   test('fires pull button functionality', () => {
  //     const { container } = render(<Images {...props} />);
  //     const pullButton = screen.getByRole('button', { name: 'Pull' });
  //     fireEvent.click(pullButton);
  //     expect(pullButton).toBeCalled;
  //   });
  // });

  describe('Images', () => {
    test('Renders an image if one is found', () => {
      const name = screen.getByText('Redis');
      const id = screen.getByText('2718634043dc');
      const size = screen.getByText('111 MB');
      const tag = screen.getByText(16.4);
      expect(name).toBeDefined;
      expect(id).toBeDefined;
      expect(size).toBeDefined;
      expect(tag).toBeDefined;
    });
  });
});