import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import App from "../src/App";
import Login from "../src/components/Login/Login";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/renderer/store";
import { describe, beforeEach, expect, test, jest } from "@jest/globals";
import fetchMock from "jest-fetch-mock";
import { act } from "react-test-renderer";
import Docketeer from "../assets/docketeer-title.png";

fetchMock.enableMocks();

describe("Login Page Renders", () => {
  beforeEach(async () => {
    const app = await render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  beforeEach(async () => {
    fetch.resetMocks();
    await act(() => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/login"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
    });
    // screen.debug();
  });

  test("Username accepts input", async () => {
    const username = document.querySelector("#username");
    await fireEvent.change(username, { target: { value: "sysadmin" } });
    expect(username.value).toBe("sysadmin");
  });

  test("Password accepts input", async () => {
    const password = document.querySelector("#password");
    await fireEvent.change(password, { target: { value: "belugas" } });
    expect(password.value).toBe("belugas");
  });

  test("Login button is clicked, throwing error", async () => {
    const spy = jest.spyOn(console, "log");

    const username = document.querySelector("#username");
    await fireEvent.change(username, { target: { value: "" } });

    const password = document.querySelector("#password");
    await fireEvent.change(password, { target: { value: "" } });

    // select login button
    const loginButton2 = screen.getByRole("login");
    // fire event to click login button
    await act(() => {
      fireEvent.click(loginButton2);
    });

    // assert the console logs for errors were throw
    expect(spy).toHaveBeenCalled();
  });

  test("Login button is clicked, logging in", async () => {
    // test to submit a valid login, and redirect to a new page

    fireEvent.change(document.querySelector("#username"), {
      target: { value: "test2" },
    });

    fireEvent.change(document.querySelector("#password"), {
      target: { value: "codesmith123" },
    });

    const loginButton = screen.getByRole("login");
    await act(() => {
      fireEvent.click(screen.getByRole("login"));
    });

    expect(loginButton).toBeCalled;

    // Needs Completion Docketeam 10.0
  });

  test("Register Button navigates to Sign Up Page", async () => {
    // select the register button
    const registerButton = screen.getByRole("register");
    // fire event to click the button, navigating to new page
    await act(() => {
      fireEvent.click(registerButton);
    });
    // assert that the event happened
    expect(registerButton).toBeCalled;

    // on new page, select the title h1 element -> 'Sign Up'
    const title = document.querySelector("h1");

    // assert that the title element has the SIgn Up text
    expect(title.textContent).toBe("Sign Up");
  });

  test("Docketeer Image", async () => {
    const image = await screen.findByRole("img");
    expect(image).toHaveProperty("width");
  });
});
