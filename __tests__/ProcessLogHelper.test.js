import {
  makeArrayOfObjects,
  buildOptionsObj,
} from '../src/module/utils/helper/processLogHelper.js';

describe('makeArrayOfObjects', () => {
  it('returns an array', () => {
    const string = `Hello from Docker!

    This message shows that your installation appears to be working correctly.
    
    `;
    const result = makeArrayOfObjects(string);
    expect(result).toBeInstanceOf(Array);
  });

  it('each element in returned array is of type object', () => {
    const processLog =
      'this is the timestamp\nthis is the log message\nthis is the second timestamp\nthis is the second log message';
    const result = makeArrayOfObjects(processLog);

    let output = false;

    if (result.every((element) => typeof element === 'object')) {
      output = true;
    }

    expect(output).toEqual(true);
  }); 
  //We edited the makeArrayOfObjects function and now this fails, not sure why as there still is a key of logMsg and timeStamp
  it('each object in returned array has timeStamp and logMsg properties', () => {
    const processLog =
      'this_is_the_first_timestampZ this is the first log message\nthere is no second time stamp but there is a second log message';
    const result = makeArrayOfObjects(processLog);

    let output = false;

    if(result.every((element) => 
      element.timeStamp && element.logMsg && element.containerName
    )){
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

  it('when tail button is checked, tail value is added to optionsObj', () => {
    tailButton.checked = true;

    const result = buildOptionsObj('containerID');

    expect(result.tail).toEqual('1');
  });

  it('when since button is checked, since value is added to since key on optionsObj', () => {
    sinceButton.checked = true;

    const result = buildOptionsObj('containerID');

    expect(result.since).toEqual('72h10m3s');
  });
});
