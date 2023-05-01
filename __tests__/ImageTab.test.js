import React from 'react';
import store from '../src/store';
import { Provider } from 'react-redux';
//import useHelper, * as helper from '../src/helpers/commands';
import {useHelper} from "../src/helpers/commands"
import { describe, beforeEach, expect, test, jest } from '@jest/globals';
import Images from '../src/components/Images/Images';
import "@testing-library/jest-dom";
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import { isJSDocSeeTag } from 'typescript';
import ReactDOM from "react-dom";

  /* ----- fake data  ------ */
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
  const div = document.createElement("div");
  beforeEach(() => {

    render(
      <Provider store={store}>
        <Images imagesList={props.imagesList[0]} />
      </Provider>
    );
  });

    /* ----- heading ------ */
  describe("Text renders on page", () => {
    test("Image repository is present on screen", async () => {
      const text = screen.getByText('IMAGE REPOSITORY')
      expect(screen.getByText("IMAGE REPOSITORY")).toBeInTheDocument();
    });
  })

  /* ----- search bar ----- */
  describe('Seach bar testing', () => {
    test('Search accepts input', async () => {
      const search = screen.getByRole('textbox');
      await fireEvent.change(search, { target: { value: 'search' } });
      expect(search.value).toBe('search');
    });
  });

  /* ----- pull button click  ------ */
  describe('pull button on click', () => {
    test('fires pull button functionality', () => {
      const pullButton = screen.getByRole('button', { name: 'PULL' });
      fireEvent.click(pullButton);
      expect(pullButton).toBeCalled;
      expect(Images.handleClick).toBeCalled;
    });
  });

  /* -----  image cards render  ------ */
  describe('Images Card Testing', () => {
    //render(<Provider store={store}><Images imagesList={props.imagesList[0]} /></Provider>);
    test("Run images button clicks", () => {
      const runButton = screen.getByRole('button', { name: 'RUN' });
      expect(runButton).toBeInTheDocument()
      fireEvent.click(runButton);
      expect(Images.runIm).toBeCalled;
    });
    test('Remove image button clicks', () => {
      const removeButton = screen.getByRole('button', { name: 'REMOVE' });
      expect(removeButton).toBeInTheDocument()
      fireEvent.click(removeButton);
      expect(Images.removeIm).toBeCalled;
    })
    test("Renders an image if one is found", () => {
      const redisImage = screen.getByText(/Redis/i);
      const imageId = screen.getByText(/Image ID: 2718634043dc/i);
      const imageSize = screen.getByText(/Image Size: 111 MB/i);
      const imageTag = screen.getByText(/16.4/i);

      expect(redisImage).toBeInTheDocument();
      expect(imageId).toBeInTheDocument();
      expect(imageSize).toBeInTheDocument();
      expect(imageTag).toBeInTheDocument();
    });
    });
  });