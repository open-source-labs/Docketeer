// callback function invoked when 'get logs' button is clicked
export const handleGetLogs = (e) => {
    // extract container id
    // e.target is the element that triggered the event, e.target.id is the ID of that element
    // ***** for the fern/eric: need to set ID each button with the container ID
    const containerId = e.target.id;

    // build out object to send to buildLogsCommand based on the radio button selected
    const optionsObj = {
        containerId: containerId,
        since: '00h00m00s',
        tail: '0'
    };

    // helper function to build options object based on the radio button selected on the process logs tab
    const buildOptionsObj = optionsObj => {
        // check if current logs options checked
        if (document.getElementById('currentLogsInput').checked) {
            // do something for current logs - maybe delete for option 3
        }
        // check if since option checked
        else if (document.getElementById('sinceInput').checked) {
            sinceValue = document.getElementById('sinceInput').value; // 00h00m00s
            optionsObj.since = sinceValue;
        }
        // check if tail option checked
        else if (document.getElementById('tailInput').checked) {
            tailValue = document.getElementById('tailInput').value;
            optionsObj.tail = tailValue;
        }
        return optionsObj;
    }

    buildOptionsObj(optionsObj);

    // invoke buildLogsCommand
    const commandString = buildLogsCommand(optionsObj)

    // invoke exec function
}

// helper function to build out process log command
export const buildLogsCommand(optionsObj) {
    let commandString = 'docker logs --timestamps ';
    if (optionsObj.since) {
        console.log(obj.since);
        commandString += `--since ${optionsObj.since} `;
    }
    if (optionsObj.tail) {
        console.log(`${obj.tail}`);
        commandString += `--tail ${optionsObj.tail} `;
    }
    return commandString += `${obj.containerId}`;
}

// function to grab 