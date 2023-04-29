describe('dummy test', () => {
  test('dummy test', () => {
    expect(2 + 2).toBe(4);
  });
});  

//Testing for Process logs needs to be implemented

// /**
//  * @jest-environment jsdom
//  */

// import {
//   makeArrayOfObjects,
//   buildOptionsObj
// } from '../src/components/processLogHelper.js';
// import {describe, beforeEach,afterEach, expect, test} from '@jest/globals';

// describe('makeArrayOfObjects', () => {
//   test('returns a result array with appropriately constructed object elements', () => {
//     const string2 = `2022-12-22T19:36:44.564948926Z 2022/12/22 19:36:44 [notice] 1#1: start worker process 22\n2022-12-22T20:12:01.081323805Z 2022/12/22 20:12:01 [notice] 22#22: gracefully shutting down
//     `;

//     const result = makeArrayOfObjects(string2);
//     console.log(result);
//     expect(result).toBeInstanceOf(Array);
//     expect(result.length).toEqual(2);
//     expect(result.containerName).toBe(undefined);
//     expect(result[0].logMsg).toEqual('1#1: start worker process 22');
//     expect(result[0].timeStamp).toBe('12/22/2022, 1:36:44 PM');
//     expect(result[1].logMsg).toEqual('22#22: gracefully shutting down');
//     expect(result[1].timeStamp).toBe('12/22/2022, 2:12:01 PM');
//   });
  
//   // Can be addressed through TS
//   test('each element in returned array is of type object', () => {
//     const processLog = 'this is the timestamp\nthis is the log message\nthis is the second timestamp\nthis is the second log message';
//     const result = makeArrayOfObjects(processLog);
//     let output = false;

//     if(result.every((element) => typeof element === 'object')){
//       output = true;
//     }

//     expect(output).toEqual(true);
//   });
// });
  
// xdescribe('buildOptionsObj', () => {

//   let sinceButton;
//   let tailButton;
//   let sinceInput;
//   let tailInput;

//   beforeEach(() => {
//     sinceButton = document.createElement('input');
//     sinceButton.setAttribute('type', 'radio');
//     sinceButton.setAttribute('id', 'sinceInput');
//     document.body.appendChild(sinceButton);

//     tailButton = document.createElement('input');
//     tailButton.setAttribute('id', 'tailInput');
//     tailButton.setAttribute('type', 'radio');
//     document.body.appendChild(tailButton);

//     sinceInput = document.createElement('input');
//     sinceInput.setAttribute('id', 'sinceText');
//     sinceInput.setAttribute('value', '72h10m3s');
//     document.body.appendChild(sinceInput);

//     tailInput = document.createElement('input');
//     tailInput.setAttribute('id', 'tailText');
//     tailInput.setAttribute('value', '1');
//     document.body.appendChild(tailInput);
//   });

//   afterEach(() => {
//     document.body.innerHTML = '';
//   });

//   test('when tail button is checked, tail value is added to optionsObj', () => {
//     tailButton.checked = true;
//     const result = buildOptionsObj('containerID');
//     expect(result.tail).toEqual('1');
//   });

//   test('when since button is checked, since value is added to since key on optionsObj', () => {
//     sinceButton.checked = true;
//     const result = buildOptionsObj('containerID');
//     expect(result.since).toEqual('72h10m3s');
//   });
// });

