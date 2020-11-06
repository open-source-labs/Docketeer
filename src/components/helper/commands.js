import { exec, spawn } from 'child_process';
import query from './psqlQuery';
import { INSERT_NETWORK, DELETE_NETWORK } from '../../constants/queryTypes';
import parseContainerFormat from './parseContainerFormat';
import store from '../../renderer/store';
/**
 *
 * @param {*} runningList
 * @param {*} callback
 * on app start-up, get the containers that are already running by calling addRunning
 */
export const addRunning = (runningList, callback) => {
  exec(
    'docker stats --no-stream --format \'{"block": "{{.BlockIO}}", "cid": "{{.ID}}", "cpu": "{{.CPUPerc}}", "mp": "{{.MemPerc}}", "mul": "{{.MemUsage}}", "name": "{{.Name}}", "net": "{{.NetIO}}", "pids": "{{.PIDs}}"},\'',
    (error, stdout, stderr) => {
      if (error) {
        alert(`${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      // trim whitespace at end out stdout,slice to remove trailing comma and remove spaces
      const dockerOutput = stdout.trim().slice(0, -1).replaceAll(' ', '');
      const output = `[${dockerOutput}]`;
      const convertedValue = JSON.parse(output);
      const newList = [];

      for (let i = 0; i < convertedValue.length; i++) {
        let isInTheList = false;
        for (const container of runningList) {
          if (container.cid === convertedValue[i].cid) {
            isInTheList = true;
            break;
          }
        }
        isInTheList ? '' : newList.push(convertedValue[i]);
      }
      newList.length ? callback(newList) : '';
    },
  );
};

/**
 *
 * @param {*} callback
 * @param {*} runningList
 * Running containers will be refreshed every time
 */
export const refreshRunning = (refreshRunningContainers) => {
  exec(
    'docker stats --no-stream --format \'{"block": "{{.BlockIO}}", "cid": "{{.ID}}", "cpu": "{{.CPUPerc}}", "mp": "{{.MemPerc}}", "mul": "{{.MemUsage}}", "name": "{{.Name}}", "net": "{{.NetIO}}", "pids": "{{.PIDs}}"},\'',
    (error, stdout, stderr) => {
      if (error) {
        alert(`${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      // trim whitespace at end out stdout,slice to remove trailing comma and remove spaces
      const dockerOutput = stdout.trim().slice(0, -1).replaceAll(' ', '');
      const output = `[${dockerOutput}]`;
      const convertedValue = JSON.parse(output);

      refreshRunningContainers(convertedValue);
    },
  );
};

/**
 *
 * @param {*} callback
 * Stopped containers will refresh every time
 */
export const refreshStopped = (refreshStoppedContainers) => {
  exec(
    'docker ps -f "status=exited" --format \'{"cid": "{{.ID}}", "img": "{{.Image}}", "created": "{{.RunningFor}}", "name": "{{.Names}}"},\'',
    (error, stdout, stderr) => {
      if (error) {
        alert(`${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      // trim whitespace at end out stdout and slice to remove trailing comma
      const dockerOutput = stdout.trim().slice(0, -1);
      let output = `[${dockerOutput}]`;
      output = JSON.parse(output);
      refreshStoppedContainers(output);
    },
  );
};

/**
 *
 * @param {*} callback
 * Images will be refreshed every time
 */
export const refreshImages = (callback) => {
  exec(`docker images`, (error, stdout, stderr) => {
    if (error) {
      alert(`${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    let value = parseContainerFormat.convert(stdout);
    let objArray = ['reps', 'tag', 'imgid', 'size'];
    const resultImages = [];
    for (let i = 0; i < value.length; i++) {
      let innerArray = [];
      if (value[i][0] !== '<none>') {
        innerArray.push(value[i][0]);
        innerArray.push(value[i][1]);
        innerArray.push(value[i][2]);
        innerArray.push(value[i][6]);
        resultImages.push(innerArray);
      }
    }
    let convertedValue = parseContainerFormat.convertArrToObj(
      resultImages,
      objArray,
    );

    callback(convertedValue);
  });
};

/**
 *
 * @param {*} id
 * @param {*} callback
 * Images will be removed
 */
export const remove = (id, callback) => {
  exec(`docker rm --force ${id}`, (error, stdout, stderr) => {
    if (error) {
      alert(`${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    callback(id);
  });
};

/**
 *
 * @param {*} id
 * @param {*} callback
 * Stop a container on what user selects
 */
export const stop = (id, callback) => {
  exec(`docker stop ${id}`, (error, stdout, stderr) => {
    if (error) {
      alert(`${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    callback(id);
  });
};

/**
 *
 * @param {*} id
 * @param {*} callback
 * Start the container
 */
export const runStopped = (id, callback) => {
  exec(`docker start ${id}`, (error, stdout, stderr) => {
    if (error) {
      alert(`${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    let state = store.getState();
    callback(id);
  });
};

/**
 *
 * @param {*} id
 * @param {*} runningList
 * @param {*} callback_1
 * @param {*} callback_2
 * Run Image
 *
 */

export const runIm = (id, runningList, callback_1, callback_2) => {
  // props.runIm(ele['imgid'], props.runningList, helper.addRunning, props.addRunningContainers)
  exec(`docker run ${id}`, (error, stdout, stderr) => {
    if (error) {
      alert(`${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
  });
  callback_1(runningList, callback_2);
};

/**
 *
 * @param {*} id
 * @param {*} imagesList
 * @param {*} callback_1
 * @param {*} callback_2
 * Remove Image
 */
export const removeIm = (id, imagesList, callback_1, callback_2) => {
  exec(`docker rmi -f ${id}`, (error, stdout, stderr) => {
    if (error) {
      alert(
        `${error.message}` +
          '\nPlease stop running container first then remove.',
      );
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    callback_1(callback_2);
  });
};

/**
 *
 * @param {*} e
 * Handling System Prune
 */
export const handlePruneClick = (e) => {
  e.preventDefault();
  exec('docker system prune --force', (error, stdout, stderr) => {
    if (error) {
      alert(`${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
  });
};

/**
 *
 * @param {*} repo
 * Pull image based on the repo you select
 */
export const pullImage = (repo) => {
  exec(`docker pull ${repo}`, (error, stdout, stderr) => {
    if (error) {
      alert(`${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
  });
};

/**
 *
 * @param {*} filepath
 * @param {*} callback
 * @param {*} callback_2
 * @param {*} callback_3
 * Docker compose command functionality
 */
export const connectContainers = (
  filepath,
  callback,
  callback_2,
  callback_3,
) => {
  let child = spawn(
    `cd ${filepath} && docker-compose up -d && docker network ls`,
    {
      shell: true,
    },
  );
  let newNetwork = '';
  child.stderr.on('data', function (data) {
    let output = data.toString(); // change buffer to string
    let temp = output.match(/(["])(?:(?=(\\?))\2.)*?\1/g); // find only letter in quotation
    if (temp) newNetwork = temp;
  });

  child.on('exit', function (exitCode) {
    if (exitCode !== 0) {
      console.log('There was an error while executing docker-compose');
      callback_2(true);
      callback_3('There was an error while executing docker-compose');
    } else {
      if (!newNetwork) {
        console.log('Your docker-compose is already defined');
        callback_2(true);
        callback_3('Your docker-compose is already defined');
      } else {
        // Inspect to get the network information
        exec(
          `docker network inspect ${newNetwork}`,
          (error, stdout, stderr) => {
            if (error) {
              alert(`${error.message}`);
              return;
            }
            if (stderr) {
              console.log(`stderr: ${stderr}`);
              return;
            }

            // parse string to Object
            let parsed = JSON.parse(stdout);
            let containerIds = Object.keys(parsed[0]['Containers']);
            console.log('containerIds: ', containerIds);

            let resultString = '';
            for (let i = 0; i < containerIds.length; i++) {
              resultString += containerIds[i] + ' ';
            }

            // Get stats for each container and display it
            exec(
              `docker stats --no-stream ${resultString}`,
              (error, stdout, stderr) => {
                if (error) {
                  alert(`${error.message}`);
                  return;
                }
                if (stderr) {
                  console.log(`stderr: ${stderr}`);
                  return;
                }
                let value = parseContainerFormat.convert(stdout);
                let objArray = ['cid', 'name'];
                let composeValue = parseContainerFormat.convertArrToObj(
                  value,
                  objArray,
                ); // [{cid: xxxx, name: container1}, {cid:xxxx, name: container2}];
                let savedArr = [];
                let networks = {};
                networks[newNetwork] = [];
                networks[newNetwork].push(composeValue);
                networks.filepath = filepath;
                // example format: [{parentName: [{cid: 21312, name: sdfew},{cid: 21312, name: sdfew},{cid: 21312, name: sdfew}]}]

                savedArr.push(networks);
                callback(savedArr);
              },
            );
          },
        );
      }
    }
  });
};

/**
 *
 * @param {*} callback
 * Display all container network based on docker-compose when the application starts
 */
export const displayNetwork = (callback) => {
  exec('docker network ls', (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    let networkValue = parseContainerFormat.convert(stdout);

    const temp = [];
    for (let i = 0; i < networkValue.length; i++) {
      let name = networkValue[i][1];
      if (name === 'bridge' || name === 'host' || name === 'none') {
      } else {
        temp.push(networkValue[i][0]);
      }
    }
    let networkStringLists = temp.join(' ');

    exec(
      `docker network inspect ${networkStringLists}`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        let parsedArr = JSON.parse(stdout);

        let obj = {};
        const final = [];
        for (let i = 0; i < parsedArr.length; i++) {
          let network = parsedArr[i];
          obj[network['Name']] = [network['Containers']];
        }
        let keys = Object.keys(obj);

        let listnetworks = {};
        for (let i = 0; i < keys.length; i++) {
          let parent = keys[i];
          let containerKeys = Object.keys(parsedArr[i].Containers);
          let networkarrrrs = [];

          for (let j = 0; j < containerKeys.length; j++) {
            let containerId = containerKeys[j];
            let innerObj = {
              cid: containerId,
              name: obj[parent][0][containerId]['Name'],
            };
            networkarrrrs.push(innerObj);
          }
          listnetworks[parent] = [];
          listnetworks[parent].push(networkarrrrs);
        }
        callback(listnetworks);
      },
    );
  });
};

export const addNetworkToDb = (networkName, filePath) => {
  const values = [networkName, filePath];
  return query(INSERT_NETWORK, values);
};

export const deleteNetworkFromDb = (networkName) => {
  const value = [networkName.replaceAll('"', '')]; // <--- need to figure out why its coming in with ""
  return query(DELETE_NETWORK, value);
};

export const dockerComposeDown = (filePath, networkName) => {
  exec(`cd ${filePath} && docker-compose down`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(stdout);
  });
  deleteNetworkFromDb(networkName);
};

export const writeToDb = () => {
  const interval = 300000;
  setInterval(() => {
    let state = store.getState();
    let runningContainers = state.lists.runningList;
    if (!runningContainers.length) return;
    let dbQuery = `insert into metrics (container_id, container_name, cpu_pct, memory_pct, memory_usage, net_io, block_io, pid, created_at) values `;
    runningContainers.forEach((container, idx) => {
      // no need to worry about sql injections as it would be self sabotaging!
      let string = `('${container.cid}', '${container.name}', '${container.cpu}', '${container.mp}', '${container.mul}', '${container.net}', '${container.block}', '${container.pids}', current_timestamp)`;
      if (idx === runningContainers.length - 1) dbQuery += string;
      else dbQuery += string + ', ';
    });
    query(dbQuery);
  }, interval);
};

export const getContainerGitUrl = (container) => {
  return query(`Select github_url from containers where name = '${container}'`);
};
