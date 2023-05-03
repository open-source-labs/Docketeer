import containerReducer from '../src/reducers/containerReducer';
import imageReducer from '../src/reducers/imageReducer';
import { describe, beforeEach, expect, test } from '@jest/globals';

describe('Dockeeter reducer', () => {
  let state;

  beforeEach(() => {
    state = {
      imagesList: [],
      runningList: [],
      stoppedList: [],
      hostStats: {},
    }
  })

  describe('Action Types', () => {
    test('Should return initial state if type is invalid', () => {
      expect(containerReducer(state, { type: 'FakeActionType' })).toBe(
        state,
      );
    });
  });
  // REFRESH_HOST_DATA
  describe('REFRESH_HOST_DATA', () => {
    test('Should refresh host data', () => {
      expect(state.hostStats).toEqual({});
      let action = {
        type: 'REFRESH_HOST_DATA',
        payload: { cpuPerc: 24.45, memPerc: 95.08 },
      }
    });
  });
    
  describe('REFRESH_RUNNING_CONTAINERS', () => {
    test('Should return a different state with each reducer invocation', () => {
      expect(state.runningList.length).toEqual(0);
      let action = {
        type: 'REFRESH_RUNNING_CONTAINERS',
        payload: [{ cid: '123' }, { cid: '456' }],
      }
      let newState = containerReducer(state, action);
      expect(newState.runningList.length).toEqual(2);

      action = {
        type: 'REFRESH_RUNNING_CONTAINERS',
        payload: [{ cid: '789' }],
      }
      newState = containerReducer(state, action);
      expect(newState.runningList.length).toEqual(1);
      expect(newState.runningList[0].cid).toEqual('789');
    });
  });

  describe('REFRESH_STOPPED_CONTAINERS', () => {
    test('should overwrite the stoppedList array in the state to update it', () => {
      expect(state.stoppedList.length).toEqual(0);
      let action = {
        type: 'REFRESH_STOPPED_CONTAINERS',
        payload: [{ cid: '123' }, { cid: '456' }],
      }
      let newState = containerReducer(state, action)
      expect(newState.stoppedList.length).toEqual(2);

      action = {
        type: 'REFRESH_STOPPED_CONTAINERS',
        payload: [{ cid: '789' }],
      }
      newState = containerReducer(state, action)
      expect(newState.stoppedList.length).toEqual(1);
      expect(newState.stoppedList[0].cid).toEqual('789');
    });
  });
    
  xdescribe('REFRESH_IMAGES', () => {
    test('should overwrite the imagesList array in the state to update it', () => {
      expect(state.imagesList.length).toEqual(0);
      let action = {
        type: 'REFRESH_IMAGES',
        payload: [{ imgid: '123' }, { imgid: '456' }],
      }
      expect(imageReducer(state, action).imagesList.length).toEqual(2);
      action = { type: 'REFRESH_IMAGES', payload: [{ imgid: '789' }] }
      expect(imageReducer(state, action).imagesList.length).toEqual(1);
      expect(imageReducer(state, action).imagesList[0].imgid).toEqual('789');
    });
  });

  xdescribe('REMOVE_CONTAINER', () => {
    test('should remove the specified container from the stoppedList array in the state', () => {
      const newState = {
        stoppedList: [{ ID: '123' }, { ID: '456' }],
      }
      const action = { type: 'REMOVE_CONTAINER', payload: '123' }
      const storedValue = containerReducer(newState, action);
      expect(storedValue.stoppedList[0].ID).toEqual('456');
    });
  });
    
  xdescribe('STOP_RUNNING_CONTAINER', () => {
    test('should remove a specified container from the runningList and add it to the stoppedList', () => {
      let newState = {
        runningList: [{ ID: '123' }, { ID: '456' }],
        stoppedList: [],
      }
      const action = { type: 'STOP_RUNNING_CONTAINER', payload: '123' }
      newState = containerReducer(newState, action);
      expect(newState.runningList[0].ID).toEqual('456');
    });
  });

  xdescribe('RUN_STOPPED_CONTAINER', () => {
    test('should remove a specified container from the stoppedList', () => {
      const newState = {
        runningList: [],
        stoppedList: [{ ID: '123' }, { ID: '456' }],
      }
      const action = { type: 'RUN_STOPPED_CONTAINER', payload: '123' }
      expect(containerReducer(newState, action).stoppedList[0].ID).toEqual(
        '456',
      );
    });
  });

  xdescribe('REMOVE_IMAGE', () => {
    test('should remove a specified image from the imagesList', () => {
      const newState = {
        imagesList: [{ id: '123' }, { id: '456' }],
      }
      const action = { type: 'REMOVE_IMAGE', payload: '123' }
      expect(imageReducer(newState, action).imagesList[0].id).toEqual('456');
    });
  });
});
