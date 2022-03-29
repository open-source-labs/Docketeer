import { exec } from 'child_process';

/*
This file expects an options object to be passed to it.

options obj template:
{
    containerId: string,
    since: string,
    tail: string
}

The options object is passed to buildLogsCommand. buildLogsCommand creates a Docker command, of the form docker logs [options] containerid.

This command is then passed to exec. Exec generates an array objects, where each object is of the form:

{
    timestamp: string,
    logMsg: string
}

Each object represents a single docker log line.

If there are messages piped to *both* stdout and stderr, exec returns an array of arrays, where the first array is the array of stdout log objects and the second array is the array of stderr log objects
*/


const testOptionsObject = {
    containerId: '1cb7e06fb524',
    since: '',
    tail: ''
};

function buildLogsCommand(obj) {
    let commandString = 'docker logs --timestamps ';
    if (obj.since) {
        console.log(obj.since);
        commandString += `--since ${obj.since} `;
    }
    obj.tail ? commandString += `--tail ${obj.tail} ` : commandString += `--tail 50 `
    return commandString += `${obj.containerId}`;
}

//makeArrayOfObjects transforms input string (where string is a batch of logs) to an array of objects: [{logmsg:..., timestamp:...}, {logmsg:..., timestamp:...}, ...]

function makeArrayOfObjects(string) {
    const arrayOfObjects = string.trim().split('\n').map((element) => {
        let obj = {};
        const timeStampLogArray = element.split(' ');
        if (timeStampLogArray[0].endsWith('Z')) {
            const timeStamp = timeStampLogArray.shift();
            const logMsg = timeStampLogArray.join(' ');
            obj.timeStamp = timeStamp;
            obj.logMsg = logMsg.trim();
        }
        else {
            obj.logMsg = timeStampLogArray.join(' ').trim();
            obj.timeStamp = '----';
        }
        return obj;
    });
    return arrayOfObjects;
};

const inputCommandString = buildLogsCommand(testOptionsObject);

exec(inputCommandString, (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }

    if (!stderr && !stdout) {
        return 'No logs to display';
    }
    else if (stdout && !stderr) {
        return makeArrayOfObjects(stdout);
    }
    else if (stderr && !stdout) {
        return makeArrayOfObjects(stderr);
    }
    else {
        return [makeArrayOfObjects(stdout), makeArrayOfObjects(stderr)]
    };
});



