import { exec } from 'child_process';

// const echoHelloTina = (callback) => {
//   exec('echo hello Tina', (error, stdout, stderr) => {
//     if (error) {
//       alert(`${error.message}`);
//       return;
//     }
//     if (stderr) {
//       console.log(`refreshImages stderr: ${stderr}`);
//       return;
//     }
//     console.log('stdout: ', stdout);
//   })
// }


/* 
logs command syntax:

docker logs [options] containerid
*/

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
    details: false,
    timestamps: true,
    since: '420000m',
    tail: '6'
};


function buildLogsCommand (obj){
    let commandString = 'docker logs ';
    if(obj.details){
      console.log(obj.details)
        commandString += '--details ';
    }
    if(obj.timestamps){
      console.log(obj.timestamps)
        commandString += '--timestamps '
    }
    if (obj.since){
      console.log(obj.since)
        commandString += `--since ${obj.since} `
    }
    if (obj.tail){
        console.log(`${obj.tail}`)
        commandString += `--tail ${obj.tail} `
    }
  return commandString += `${obj.containerId}`
}

const inputCommandString = buildLogsCommand(testOptionsObject)
// console.log(inputCommandString)

exec(inputCommandString, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  //   console.log(typeof stdout)
  console.log(stdout.trim().split('\n'))
  const output = stdout
  console.log('output ', )
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});

//container ID: 1cb7e06fb524
// 1) grab all container IDs and put each container's log into an array of log objects 
// containers = [{containerID: xx, stream: stdout or stderr, log: xx, timestamp: xx, details: xx }, {...}, {...}]
// 2) 

// how far back do we want to grab logs when a container fails
// do we want to add -follow logs?

// docker stats --no-stream --format "{{json .}},"
// docker stats: Returns live data stream for running containers
  // --no-stream: Disable streaming stats and only pull the first result
  // --format "{{json .}},": 	Pretty-print images using a Go template

// docker ps -f "status=exited" --format "{{json .}},"


// docker images
  // show all top level images, their repository and tags, and their size
// docker stop ${id}`
  // stop one or more running containers
// docker start ${id}
  // start one or more stopped containers
// docker run ${id}
  // creates a writeable container layer over the specified image, and then starts it using the specified command
// docker rmi -f ${id}
  // removes (and un-tags) one or more images from the host node.
  // -f: Force removal of the image
  
// docker pull ${repo}
// docker network ls --format "{{json .}},"
// docker inspect ${containerId}
// cd ${fileLocation} && docker-compose up -d
// docker network ls --filter "label=com.docker.compose.network" --format "{{json .}}
// docker network ls --filter "label=com.docker.compose.network" --format "{{json .}}," 
// cd ${filePath} && docker-compose down 
// docker volume ls --format "{{json .}},"
// docker ps -a --filter volume=${volumeName} --format "{{json .}},"