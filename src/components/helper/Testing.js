const { spawn, exec } = require('child_process');
const { convert, convertArrToObj } = require('./parseContainerFormat');

const connectContainers = () => {
    //We still need to get a file path from a user
    let child = spawn('cd /Users/minchan/Documents/Coding/DockerPractice/checkpoint && docker-compose up -d && docker network ls', {
    shell: true
    });
    const array = []
    child.stderr.on('data', function (data) {
        console.error("STDERR:", data.toString()); //showing the process but comes out as error for some reason

        let letter = data.toString(); // change buffer to string
        letter = letter.match(/(["])(?:(?=(\\?))\2.)*?\1/g) // find only letter in quotation
        if(letter) array.push(letter[0]);
    });
    child.stdout.on('data', function (data) {
        console.log("STDOUT:", data.toString()); 
    });

    child.on('exit', function (exitCode) {
        console.log("Child exited with code: " + exitCode);
        console.log(typeof exitCode)
        //console.log('Array: ', array);
        if(exitCode !== 0 ) {
            console.log('There was an error while executing docker-compose');
        } else {
            if(!array.length) {
                console.log('Your docker-compose is already defined');
            } else {
                //Inspect to get the network information
                exec(`docker network inspect ${array[0]}`, (error, stdout, stderr) => {
                    if (error) {
                        console.log(`error: ${error.message}`);
                        return;
                    }
                    if (stderr) {
                        console.log(`stderr: ${stderr}`);
                        return;
                    }
                    
                    // parse string to Object
                    let parsed = JSON.parse(stdout);
                    let containerIds = Object.keys(parsed[0]['Containers']);
        
                    let resultString = ''
                    for (let i = 0; i < containerIds.length; i++) {
                        resultString += containerIds[i] + ' '
                    }
        
                    // Get stats for each container and display it
                    exec(`docker stats --no-stream ${resultString}`, (error, stdout, stderr) => {
                        if (error) {
                            console.log(`error: ${error.message}`);
                            return;
                        }
                        if (stderr) {
                            console.log(`stderr: ${stderr}`);
                            return;
                        }
                        console.log(stdout);
                    })            
        
                })
            }
        }
    });    

};

connectContainers()

module.exports = {};

