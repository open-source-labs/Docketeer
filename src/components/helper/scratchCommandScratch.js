import { exec } from 'child_process';

/*
options obj template:
{
    containerId: string,
    details: boolean,
    timestamps: boolean,
    since: string,
    tail: string
}
*/

const testOptionsObject = {
    containerId: '1cb7e06fb524',
    since: '',
    tail: '100'
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
    // console.log(`stdout: ${stdout}`);
    //error handling
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }

    //   console.log(makeArrayOfObjects(stdout))


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



