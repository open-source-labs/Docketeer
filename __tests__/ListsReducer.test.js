import subject from '../src/reducers/ListsReducer.js';

describe('Dockeeter reducer', () => {
  let state;

  beforeEach(() => {
    state = {
      imagesList: [],
      runningList: [],
      stoppedList: [],
      networkList: [],
      phoneNumber: '',
      memoryNotificationList: new Set(),
      cpuNotificationList: new Set(),
      stoppedNotificationList: new Set(),
      graphAxis: [],
      graphMemory: [
        {
          label: '',
          data: [],
          fill: ''
        },
      ],
      graphCpu: [
        {
          label: '',
          data: [],
          fill: ''
        },
      ]	

    };
  });

  describe('default state', () => {
    it('should return a default state when given an undefined input', () => {
      expect(subject(undefined, { type: undefined })).toEqual(state);
    });
  });

  describe('unrecognized action types', () => {
    it('should return the original without any duplication', () => {
      expect(subject(state, { type: 'qqqq' })).toBe(state);
    });
  });

  describe('REFRESH_RUNNING_CONTAINERS', () => {
    it('should overwrite the runningList array in the state to update it', () => {
      expect(state.runningList.length).toEqual(0);
      let action = { type: 'REFRESH_RUNNING_CONTAINERS', payload: [{ cid: '123' }, { cid: '456' }] };
      expect(subject(state, action).runningList.length).toEqual(2);
      action = { type: 'REFRESH_RUNNING_CONTAINERS', payload: [{ cid: '789' }] };
      expect(subject(state, action).runningList.length).toEqual(1);
      expect(subject(state, action).runningList[0].cid).toEqual('789');
    });
  });

  describe('REFRESH_STOPPED_CONTAINERS', () => {
    it('should overwrite the stoppedList array in the state to update it', () => {
      expect(state.stoppedList.length).toEqual(0);
      let action = { type: 'REFRESH_STOPPED_CONTAINERS', payload: [{ cid: '123' }, { cid: '456' }] };
      expect(subject(state, action).stoppedList.length).toEqual(2);
      action = { type: 'REFRESH_STOPPED_CONTAINERS', payload: [{ cid: '789' }] };
      expect(subject(state, action).stoppedList.length).toEqual(1);
      expect(subject(state, action).stoppedList[0].cid).toEqual('789');
    });
  });

  describe('REFRESH_IMAGES', () => {
    it('should overwrite the imagesList array in the state to update it', () => {
      expect(state.imagesList.length).toEqual(0);
      let action = { type: 'REFRESH_IMAGES', payload: [{ imgid: '123' }, { imgid: '456' }] };
      expect(subject(state, action).imagesList.length).toEqual(2);
      action = { type: 'REFRESH_IMAGES', payload: [{ imgid: '789' }] };
      expect(subject(state, action).imagesList.length).toEqual(1);
      expect(subject(state, action).imagesList[0].imgid).toEqual('789');
    });
  });

  describe('REMOVE_CONTAINER', () => {
    it('should remove the specified container from the stoppedList array in the state', () => {
      const newState = {
        stoppedList: [{ cid: '123' }, { cid: '456' }]
      }
      const action = { type: 'REMOVE_CONTAINER', payload: '123' }
      expect(subject(newState, action).stoppedList[0].cid).toEqual('456');
    });
  });

  describe('STOP_RUNNING_CONTAINER', () => {
    it('should remove a specified container from the runningList and add it to the stoppedList', () => {
      let newState = {
        runningList: [{ cid: '123' }, { cid: '456' }],
        stoppedList: []
      }
      const action = { type: 'STOP_RUNNING_CONTAINER', payload: '123' };
      newState = subject(newState, action);
      expect(newState.runningList[0].cid).toEqual('456');

    });
  });

  describe('RUN_STOPPED_CONTAINER', () => {
    it('should remove a specified container from the stoppedList', () => {
      const newState = {
        runningList: [],
        stoppedList: [{ cid: '123' }, { cid: '456' }]
      }
      const action = { type: 'RUN_STOPPED_CONTAINER', payload: '123' };
      expect(subject(newState, action).stoppedList[0].cid).toEqual('456');
    });
  });

  describe('REMOVE_IMAGE', () => {
    it('should remove a specified image from the imagesList', () => {
      const newState = {
        imagesList: [{ imgid: '123' }, { imgid: '456' }]
      }
      const action = { type: 'REMOVE_IMAGE', payload: '123' }
    });
  });

})
