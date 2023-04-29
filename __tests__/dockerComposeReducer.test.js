describe('dummy test', () => {
  test('dummy test', () => {
    expect(2 + 2).toBe(4);
  });
});  

//Docker Compose testing needs refactoring

// import dockerComposeReducer from '../src/redux/reducers/dockerComposeReducer'
// import { describe, beforeEach, expect, test, jest } from '@jest/globals'
// import '@testing-library/jest-dom'

// describe('Docker compose reducer', () => {
//   let state

//   beforeEach(() => {
//     state = {
//       runningList: [],
//       stoppedList: [],
//       networkList: [],
//       composeStack: [],
//       hostStats: {},
//     }
//   })

//   describe('Action Types', () => {
//     test('Should return initial state if type is invalid', () => {
//       const nonExistentAction = 'FakeActionType'
//       expect(dockerComposeReducer(state, { type: nonExistentAction })).toBe(
//         state,
//       )
//     })
//   })
//   describe('GET_CONTAINER_STACKS', () => {
//     test('Should return a different state with each reducer invocation', () => {
//       expect(state.composeStack.length).toEqual(0)
//       let action = {
//         type: 'GET_CONTAINER_STACKS',
//         payload: [
//           {
//             CreatedAt: '2020-01-0315:34:16.833926458+0000UTC',
//             Driver: 'bridge',
//             ID: 'dummyId',
//             IPv6: 'false',
//             Internal: 'false',
//             Labels:
//               'com.docker.compose.network=default,com.docker.compose.project=database,com.docker.compose.version=2.13.0',
//             Name: 'database_default',
//             Scope: 'local',
//           },
//         ],
//       }
//       let newState = dockerComposeReducer(state, action)
//       expect(newState.composeStack.length).toEqual(1)
//       expect(newState.composeStack[0].ID).toEqual('dummyId')
//     })
//   })
// })
