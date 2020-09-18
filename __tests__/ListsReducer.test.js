import subject from '../src/reducers/ListsReducer.js';

describe('Dockeeter reducer', () => {
	let state;

	beforeEach(() => {
		state = {
			imagesList: [],
			runningList: [],
			stoppedList: [],
			networkList: [],
		}
	});

	describe('default state', () => {
		it('should return a default state when given an undefined input', () => {
			expect(subject(undefined, { type: undefined })).toEqual(state);
		})
	});

	describe('unrecognized action types', () => {
		it('should return the original without any duplication', () => {
			expect(subject(state, { type: 'qqqq' })).toEqual(state);
		})
	});
})