import React from "react";
import { Provider } from "react-redux";
import Containers from "../src/components/Containers/Containers";
import ContainersCard from "../src/components/ContainersCard/ContainersCard";
import { describe, beforeEach, expect, test, jest } from "@jest/globals";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import store from "../src/store";

const props = {
  runningList: [
    {
      block: "0B/0B",
      ID: "a802306eeac3",
      CPUPerc: "0.17%",
      MemPerc: "0.11%",
      MemUsage: "2.195MiB/1.944GiB",
      Name: "blissful_matsumoto",
      NetIO: "796B/0B",
      PIDs: "5",
    },
  ],
  stoppedList: [
    {
      Names: "zealous",
      ID: "c902ec744095",
      Image: "84c5f6e03bf0",
      RunningFor: "2 days ago",
    },
  ],
  container: { MemUsage: 1 },
  stop: jest.fn(),
  remove: jest.fn(),
  runStopped: jest.fn(),
  status: "running",
};

describe("Containers", () => {
  test("Containers component should render", () => {
    render(
      <Provider store={store}>
        <Containers />
      </Provider>
    );
  });

  describe("Running List containers", () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <Containers {...props} />
        </Provider>
      );
      render(
        <ContainersCard
          containerList={props.runningList}
          stopContainer={props.stop}
          runContainer={props.runStopped}
          removeContainer={props.remove}
          status={props.status}
        />
      );
    });

    test("Should have render correct amount of running containers", () => {
      expect(screen.getByText(/1/i)).toBeInTheDocument();
    });

    xtest("Name of container should properly display", () => {
      const h3 = div.querySelectorAll(h3);
      const name = h3[0].innerHTML;
      expect(name).toEqual("blissful_matsumoto");
    });

    xtest("Stop button is called", async () => {
      const stopButton = document.querySelector(".stop-btn");
      await fireEvent.click(stopButton);
      expect(stop).toBeCalled;
    });
  });

  describe("Stopped List Containers", () => {
    xtest("Should have render correct amount of containers", () => {
      expect(div.querySelectorAll("p")[1].textContent).toBe("Count: 1");
    });

    xtest("Name of container should properly display", () => {
      const name = screen.getAllByText("zealous");
      expect(name).toHaveLength(1);
    });

    xtest("Run and remove button should fire", async () => {
      const buttons = screen.getAllByRole("button");
      const runButton = buttons[2];
      const removeButton = buttons[3];
      await fireEvent.click(runButton);
      await fireEvent.click(removeButton);
      expect(runStopped).toBeCalled;
      expect(remove).toBeCalled;
    });
  });
});

describe("ContainersCard", () => {
  test("ContainersCard component should render", () => {
    render(
      <ContainersCard
        containerList={props.runningList}
        stopContainer={props.stop}
        runContainer={props.runStopped}
        removeContainer={props.remove}
        status={props.status}
      />
    );
  });
});
