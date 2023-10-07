import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PromDataSource, EndpointType } from 'types';
import { ConfigurationState } from 'ui/ui-types';

const initialState: ConfigurationState = {
  prometheusDataSources: [],
  typeOfEndpoint: [],
  entryForm: {
    type_of_id: 2,
    url: '',
    endpoint: '',
    jobname: '',
    match: '',
    ssh_key: ''
  }
};

export const configurationSlice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {
    setEntryForm: (state, action: PayloadAction<PromDataSource>) => {
      state.entryForm = {...state.entryForm, ...action.payload};
    },
    setEndpointTypes: (state, action: PayloadAction<EndpointType[]>) => {
      state.typeOfEndpoint = action.payload;
    },
    setPrometheusDataSources: (state, action: PayloadAction<PromDataSource[]>) => {
      state.prometheusDataSources = action.payload;
    }
    
  },
});

export const { setEntryForm, setEndpointTypes, setPrometheusDataSources } = configurationSlice.actions;
export default configurationSlice.reducer;
