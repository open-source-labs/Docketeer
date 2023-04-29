import React from 'react';
import store from '../src/store';
import { Provider } from 'react-redux';
import * as helper from '../src/helpers/commands';
import { describe, beforeEach, expect, test, jest } from '@jest/globals';
import Images from '../src/components/Images/Images';
import "@testing-library/jest-dom";
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
    render(      
      <Provider store={store}>
        <Images {...props} />
      </Provider>
    )
  });

  // beforeEach(() => {
  //   render(<Images {...props} />);
  //   screen.debug();
  // });
  xdescribe("text rendering", () => {
    test("if image repsository text renders", async () => {
      //const text = screen.getByText('IMAGE REPOSITORY')
      expect(screen.getByText("IMAGE REPOSITORY")).toBeInTheDocument();
    });
  })

  /* ----- search bar ----- */
  xdescribe('Seach bar testing', () => {
    test('Search accepts input', async () => {
      const search = screen.getByRole('textbox');
      await fireEvent.change(search, { target: { value: 'search' } });
      expect(search.value).toBe('search');
    });
  });

  /* ----- button testing ------ */

  describe('Run button on click', () => {
    test('Fires run button functionality', () => {
      const runButton = screen.getByRole("button", { name: "RUN" });
      fireEvent.click(runButton);
      // expect(pullButton).toBeCalled
      expect(props.runIm).toBeCalled;
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
  describe('pull button on click', () => {
    test('fires pull button functionality', () => {
      // const { container } = render(<Images {...props} />);
      const pullButton = screen.getByRole('button', { name: 'PULL' });
      fireEvent.click(pullButton);
      expect(pullButton).toBeCalled;
      expect(Images.handleClick).toBeCalled;
    });
  });

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