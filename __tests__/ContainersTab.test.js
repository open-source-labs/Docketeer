import React from 'react';
import { Provider } from 'react-redux';
import Containers from '../ui/src/components/Containers/Containers';
import ContainersCard from '../ui/src/components/ContainersCard/ContainersCard';
import { describe, beforeEach, expect, test, jest } from '@jest/globals';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import store from '../ui/src/store';
import preview from 'jest-preview';

window.scrollTo = jest.fn();

const props = {
  runningList: [
    {
      block: '0B/0B',
      ID: 'a802306eeac3',
      CPUPerc: '0.17%',
      MemPerc: '0.11%',
      MemUsage: '2.195MiB/1.944GiB',
      Names: 'blissful_matsumoto',
      NetIO: '796B/0B',
      PIDs: '5',
    },
  ],
  stoppedList: [
    {
      Names: 'zealous',
      ID: 'c902ec744095',
      Image: '84c5f6e03bf0',
      RunningFor: '2 days ago',
    },
  ],
  container: { MemUsage: 1 },
  stop: jest.fn(),
  remove: jest.fn(),
  runStopped: jest.fn(),
  status: 'running',
};

describe('Containers', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('Containers component should render', () => {
    render(
      <Provider store={store}>
        <Containers />
      </Provider>
    );
  });

  describe('Running List containers', () => {
    beforeEach(() => {
      // render(
      //   <Provider store={store}>
      //     <Containers {...props} />
      //   </Provider>
      // );
      render(
        <Provider store={store}>
          <ContainersCard
            containerList={props.runningList}
            stopContainer={props.stop}
            runContainer={props.runStopped}
            removeContainer={props.remove}
            status={props.status}
          />
        </Provider>
      );
    });

    test('Should have render correct amount of running containers', () => {
      expect(screen.getByText(/1/i)).toBeInTheDocument();
    });

    test('Name of container should properly display', () => {
      const h2 = document.querySelectorAll('h2');
      const name = h2[0].innerHTML;
      expect(name).toEqual('blissful_matsumoto');
    });

    test('Stop button is called', async () => {
      const stopButton = screen.getAllByRole('button');
      await fireEvent.click(stopButton[0]);
      expect(props.stop).toBeCalled;
    });
  });

  describe('Stopped List Containers', () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <ContainersCard
            containerList={props.stoppedList}
            stopContainer={props.stop}
            runContainer={props.runStopped}
            removeContainer={props.remove}
            status="stopped"
          />
        </Provider>
      );
    });
    test('Should have render correct amount of containers', () => {
      // preview.debug();
      expect(screen.getByText(/1/i)).toBeInTheDocument();
    });

    test('Name of container should properly display', () => {
      const name = screen.getAllByText('zealous');
      expect(name).toHaveLength(1);
    });

    test('Run and remove button should fire', async () => {
      const buttons = screen.getAllByRole('button');
      const runButton = buttons[0];
      const removeButton = buttons[1];
      await fireEvent.click(runButton);
      await fireEvent.click(removeButton);
      expect(props.runStopped).toBeCalled;
      expect(props.remove).toBeCalled;
    });
  });
});

describe('ContainersCard', () => {
  test('ContainersCard component should render', () => {
    render(
      <Provider store={store}>
        <ContainersCard
          containerList={props.runningList}
          stopContainer={props.stop}
          runContainer={props.runStopped}
          removeContainer={props.remove}
          status={props.status}
        />
      </Provider>
    );
  });
});
