/**
 * @jest-environment jsdom
 */

import {
  makeArrayOfObjects,
  buildOptionsObj
} from '../src/components/helper/processLogHelper.js';
import {describe, beforeEach,afterEach, expect, test} from '@jest/globals';

describe('makeArrayOfObjects', () => {
  test('returns an array', () => {
    const string = `HelloZ from Docker!

    This message shows that your installation appears to be working correctly.
    
    `;
    const result = makeArrayOfObjects(string);
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toEqual(2);
    expect(result.containerName).toBe(undefined);
    expect(result[0].logMsg).toEqual('HelloZ from Docker!');
    expect(result[0].timeStamp).toBeUndefined();
  });
  
  // Can be addressed through TS
  test('each element in returned array is of type object', () => {
    const processLog = 'this is the timestamp\nthis is the log message\nthis is the second timestamp\nthis is the second log message';
    const result = makeArrayOfObjects(processLog);
    let output = false;

    if(result.every((element) => typeof element === 'object')){
      output = true;
    }

    expect(output).toEqual(true);
  });
});
  
describe('buildOptionsObj', () => {

  let sinceButton;
  let tailButton;
  let sinceInput;
  let tailInput;

  beforeEach(() => {
    sinceButton = document.createElement('input');
    sinceButton.setAttribute('type', 'radio');
    sinceButton.setAttribute('id', 'sinceInput');
    document.body.appendChild(sinceButton);

    tailButton = document.createElement('input');
    tailButton.setAttribute('id', 'tailInput');
    tailButton.setAttribute('type', 'radio');
    document.body.appendChild(tailButton);

    sinceInput = document.createElement('input');
    sinceInput.setAttribute('id', 'sinceText');
    sinceInput.setAttribute('value', '72h10m3s');
    document.body.appendChild(sinceInput);

    tailInput = document.createElement('input');
    tailInput.setAttribute('id', 'tailText');
    tailInput.setAttribute('value', '1');
    document.body.appendChild(tailInput);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('when tail button is checked, tail value is added to optionsObj', () => {
    tailButton.checked = true;
    const result = buildOptionsObj('containerID');
    expect(result.tail).toEqual('1');
  });

  test('when since button is checked, since value is added to since key on optionsObj', () => {
    sinceButton.checked = true;
    const result = buildOptionsObj('containerID');
    expect(result.since).toEqual('72h10m3s');
  });
});

