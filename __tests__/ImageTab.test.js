import React from 'react';
import store from '../ui/src/store';
import { Provider } from 'react-redux';
import { describe, beforeEach, expect, test, jest } from '@jest/globals';
import Images from '../ui/src/components/Images/Images';
import "@testing-library/jest-dom";
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

  /* ----- fake data  ------ */
const props = {
  imagesList: [
    {
      ID: "2718634043dc",
      Size: "111 MB",
      Repository: "Redis",
      Tag: "16.4",
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
        <Images imagesListTest={props.imagesList} />
      </Provider>
    );
  });

  it("renders an image", () => {
    const imageElement = screen.getByText(/Image ID: 2718634043dc/i);

    // Assert that the image element exists
    expect(imageElement).toBeInTheDocument();
  });

  /* ----- heading ------ */
  describe("Text renders on page", () => {
    test("Image repository is present on screen", async () => {
      const text = screen.getByText("AVAILABLE IMAGES");
      expect(screen.getByText("AVAILABLE IMAGES")).toBeInTheDocument();
    });
  });

  /* ----- search bar ----- 
  // commented out because there's no search bar under image tab
  // in the desktop version
  describe('Seach bar testing', () => {
    test('Search accepts input', async () => {
      const search = screen.getByRole('textbox');
      await fireEvent.change(search, { target: { value: 'search' } });
      expect(search.value).toBe('search');
    });
  });
  */

  /* ----- pull button click  ------ 
  // commented out because there's no pull button under image tab
  // in the desktop version
  describe("pull button on click", () => {
    test("fires pull button functionality", () => {
      const pullButton = screen.getByRole("button", { name: "PULL" });
      fireEvent.click(pullButton);
      expect(pullButton).toBeCalled;
      expect(Images.handleClick).toBeCalled;
    });
  });
  */

  /* -----  image cards render  ------ */
  describe("Images Card Testing", () => {
    test("Run images button clicks", () => {
      const runButton = screen.getByRole("button",{name:"RUN"});
      expect(runButton).toBeInTheDocument();
      // fireEvent.click(runButton);
      // expect(props.runIm).toBeCalledTimes(1);
    });
    test("Remove image button clicks", () => {
      const removeButton = screen.getByRole("button", { name: "REMOVE" });
      expect(removeButton).toBeInTheDocument();
      // fireEvent.click(removeButton);
      //expect(props.removeIm).toBeCalledTimes(1);

    });
    test("Renders an image if one is found", () => {
      const redisImage = screen.getByText("Redis");
      const imageId = screen.getByText("Image ID: 2718634043dc");
      const imageSize = screen.getByText("Image Size: 111 MB");
      const imageTag = screen.getByText("16.4");

      expect(redisImage).toBeInTheDocument();
      expect(imageId).toBeInTheDocument();
      expect(imageSize).toBeInTheDocument();
      expect(imageTag).toBeInTheDocument();
    });
  });
});
