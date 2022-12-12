import containerListReducer from '../src/redux/reducers/containerListReducer'; // import containerList reducer
import imageListReducer from '../src/redux/reducers/imageListReducer'; // import imageListReducer reducer
import {describe, beforeEach, expect, test} from '@jest/globals';

describe('Dockeeter reducer', () => {
  let state;

  beforeEach(() => {
    state = {
      imagesList: [],
      runningList: [],
      stoppedList: []
    };
  });

  describe('Action Types', () => {
    test('Should return initial state if type is invalid', () => {
      expect(containerListReducer(state, { type: 'FakeActionType' })).toBe(state);
    });
  });

  describe('REFRESH_RUNNING_CONTAINERS', () => {
    test('Should return a different state with each reducer invocation', () => {
      expect(state.runningList.length).toEqual(0);
      let action = {
        type: 'REFRESH_RUNNING_CONTAINERS',
        payload: [{ cid: '123' }, { cid: '456' }]
      };
      let newState = containerListReducer(state, action);
      expect(newState.runningList.length).toEqual(2);

      action = {
        type: 'REFRESH_RUNNING_CONTAINERS',
        payload: [{ cid: '789' }]
      };
      newState = containerListReducer(state, action);
      expect(newState.runningList.length).toEqual(1);
      expect(newState.runningList[0].cid).toEqual(
        '789'
      );
    });
  });

  describe('REFRESH_STOPPED_CONTAINERS', () => {
    test('should overwrite the stoppedList array in the state to update it', () => {
      expect(state.stoppedList.length).toEqual(0);
      let action = {
        type: 'REFRESH_STOPPED_CONTAINERS',
        payload: [{ cid: '123' }, { cid: '456' }]
      };
      let newState = containerListReducer(state, action);
      expect(newState.stoppedList.length).toEqual(2);

      action = {
        type: 'REFRESH_STOPPED_CONTAINERS',
        payload: [{ cid: '789' }]
      };
      newState = containerListReducer(state, action);
      expect(newState.stoppedList.length).toEqual(1);
      expect(newState.stoppedList[0].cid).toEqual(
        '789'
      );
    });
  });

  describe('REFRESH_IMAGES', () => {
    test('should overwrite the imagesList array in the state to update it', () => {
      expect(state.imagesList.length).toEqual(0);
      let action = {
        type: 'REFRESH_IMAGES',
        payload: [{ imgid: '123' }, { imgid: '456' }]
      };
      expect(imageListReducer(state, action).imagesList.length).toEqual(2);
      action = { type: 'REFRESH_IMAGES', payload: [{ imgid: '789' }] };
      expect(imageListReducer(state, action).imagesList.length).toEqual(1);
      expect(imageListReducer(state, action).imagesList[0].imgid).toEqual('789');
    });
  });

  describe('REMOVE_CONTAINER', () => {
    test('should remove the specified container from the stoppedList array in the state', () => {
      const newState = {
        stoppedList: [{ ID: '123' }, { ID: '456' }]
      };
      const action = { type: 'REMOVE_CONTAINER', payload: '123' };
      const storedValue = containerListReducer(newState,action);
      expect(storedValue.stoppedList[0].ID).toEqual(
        '456'
      );
    });
  });

  describe('STOP_RUNNING_CONTAINER', () => {
    test('should remove a specified container from the runningList and add it to the stoppedList', () => {
      let newState = {
        runningList: [{ ID: '123' }, { ID: '456' }],
        stoppedList: []
      };
      const action = { type: 'STOP_RUNNING_CONTAINER', payload: '123' };
      newState = containerListReducer(newState, action);
      expect(newState.runningList[0].ID).toEqual('456');
    });
  });

  describe('RUN_STOPPED_CONTAINER', () => {
    test('should remove a specified container from the stoppedList', () => {
      const newState = {
        runningList: [],
        stoppedList: [{ ID: '123' }, { ID: '456' }]
      };
      const action = { type: 'RUN_STOPPED_CONTAINER', payload: '123' };
      expect(containerListReducer(newState, action).stoppedList[0].ID).toEqual(
        '456'
      );
    });
  });

  describe('REMOVE_IMAGE', () => {
    test('should remove a specified image from the imagesList', () => {
      const newState = {
        imagesList: [{ id: '123' }, { id: '456' }]
      };
      const action = { type: 'REMOVE_IMAGE', payload: '123' };
      expect(imageListReducer(newState, action).imagesList[0].id).toEqual('456');
    });
  });
});