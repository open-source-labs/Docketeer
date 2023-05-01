import React, { Component } from 'react';
import Metrics from '../src/components/Metrics/Metrics';
import { describe, expect, test, beforeEach } from '@jest/globals';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../src/store';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('Testing Metrics Tab', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Metrics />
      </Provider>
    );
  });

  test('Metrics dashboard renders', async () => {
    const iframe = document.querySelector('iframe');

    // Wait for the iframe to load
    await waitFor(() => {
      expect(iframe.contentDocument).toBeTruthy(); 
    });
  });

  describe('Testing buttons within metrics tab', () => {
    test('Toggle button switches between Containers and Kubernetes Cluster', () => {
      const toggleButton = screen.getByRole('checkbox');
      expect(screen.getByText('Containers')).toBeInTheDocument();

      fireEvent.click(toggleButton);
      expect(screen.getByText('Kubernetes Cluster')).toBeInTheDocument();

      fireEvent.click(toggleButton);
      expect(screen.getByText('Containers')).toBeInTheDocument();
    });

    test('Dashboard changes for K8 metrics', () => {
      const toggleButton = screen.getByRole('checkbox');
      fireEvent.click(toggleButton);

      const nodeButton = screen.getByRole('button', { name: 'Node' });
      const kubeButton = screen.getByRole('button', { name: 'Kubelet' });

      fireEvent.click(nodeButton);
      expect(Metrics.changePage).toBeCalled;
      
      fireEvent.click(kubeButton);
      expect(Metrics.changePage).toBeCalled;
    });
  });
});
