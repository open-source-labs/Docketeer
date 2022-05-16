import {makeArrayOfObjects, buildOptionsObj} from '../src/components/helper/processLogHelper.js';
import React from 'react';

describe('makeArrayOfObjects', () => {
  it('returns an array', () => {
    const string = `Hello from Docker!

    This message shows that your installation appears to be working correctly.
    
    `;
    const result = makeArrayOfObjects(string);
    expect(result).toBeInstanceOf(Array);
  });
    
  it('each element in returned array is of type object', () => {
    const processLog = 'this is the timestamp\nthis is the log message\nthis is the second timestamp\nthis is the second log message';
    const result = makeArrayOfObjects(processLog);

    let output = false;

    if(result.every((element) => typeof element === 'object')){
      output = true;
    }

    expect(output).toEqual(true);
  }); 
  
  it('each object in returned array has timeStamp and logMsg properties', () => {
    const processLog = 'this_is_the_first_timestampZ this is the first log message\nthere is no second time stamp but there is a second log message';
    const result = makeArrayOfObjects(processLog);

    let output = false;

    if(result.every((element) => 
      element.timeStamp && element.logMsg
    )){
      output = true;
    }

    expect(output).toEqual(true);
  });

  it('log lines without timestamp will have "----" as value of timestamp property, otherwise the value will be timestamp', () => {
    const processLog = 'this_is_the_first_timestampZ this is the first log message\nthere is no second time stamp but there is a second log message\n  \n ';
    const result = makeArrayOfObjects(processLog);
      
    expect(result[0].timeStamp).toEqual('this_is_the_first_timestampZ');
    expect(result[0].logMsg).toEqual('this is the first log message');
    expect(result[1].timeStamp).toEqual('----');
    expect(result[1].logMsg).toEqual('there is no second time stamp but there is a second log message');
  });

  it('when passed empty string, should return {timeStamp: \'\', logMsg: \'\'}', () => {
       
    const result = makeArrayOfObjects('');

    expect(result[0].timeStamp).toEqual('');
    expect(result[0].logMsg).toEqual('');
  });
});