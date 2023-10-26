import React from 'react';
import store from '../ui/src/store';
import { Provider } from 'react-redux';
import { describe, expect, test, jest } from '@jest/globals';
import VolumeHistory from '../ui/src/components/VolumeHistory/VolumeHistory';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import preview from 'jest-preview';
import SingleVolume from 'ui/src/components/VolumeHistory/SingleVolume';

// configure({ adapter: new Adapter() })




describe('Volume Tab Tests', () => {
  const props = {
    volumeContainersList: [
      {
        vol_name: 'volumetest1',
        containers: [
          { Names: 'container1', State: 'Running', Status: '40 minutes ago' },
        ],
      },
      {
        vol_name: 'volumetest2',
        containers: [
          { Names: 'container2', State: 'Running', Status: '25 minutes ago' },
          { Names: 'container3', State: '', Status: '' },
        ],
      },
    ],
  };
  beforeEach(() => {
    render(
      <Provider store={store}>
        <VolumeHistory {...props} />
      </Provider>
    );
  })
  
 test('renders the search volumes', async () => {
   // You can add more specific assertions here to verify the component's output
   // For example, you can check if certain elements are present using screen queries.
   const element = await screen.findByText('SEARCH VOLUMES')
   expect(element).toBeInTheDocument();
   
   // ... add more assertions as needed
 });
  
  test('renders the FIND button', async () => {
    const findButton = screen.getByRole('button', { name: 'FIND' });
    expect(findButton).toBeInTheDocument()
  })
  test('renders the SHOWALL button', async () => {
    const showAllButton = screen.getByRole('button', { name: 'SHOW ALL' });
    expect(showAllButton).toBeInTheDocument();
  });
  test('renders the VOLUMES', async () => {
    const volumesElement = await screen.findByText('VOLUMES');
    expect(volumesElement).toBeInTheDocument();
  });
  test('renders the SearchBar', async () => {
    const searchBar = await screen.getByDisplayValue('');
    expect(searchBar).toBeInTheDocument();
  });

  test('Rendering of containers', async () => {

    render(<SingleVolume containers={props.volumeContainersList[0].containers} volName={props.volumeContainersList[0].vol_name}/>)
    const containerName = await screen.findByText((content, element) => {
      return content.includes('volumetest1') 
    });
  });
  
});
