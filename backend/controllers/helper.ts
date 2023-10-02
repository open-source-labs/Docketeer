import { ContainerPS, LogObject, NetworkContainerType, NetworkInspect, NetworkType } from "types";


// interface controllerHelpersType {
//   execAsync: typeof execAsync;
//   toUTC: (dateString: string, offset: number) => string;
//   convertDates: (utcString: string, offset: number) => string;
//   parseLogString: (stringToMatch: string, container: string, offset: number) => LogObject[];
// }

// const controllerHelpers: controllerHelpersType = {} as controllerHelpersType;

/**
 * @abstract Spawns an execution terminal but does so asynchronously.
 *           Therefore, we can await response. 
 *           *** This is preferred over using regular exec***
 *           Please read the docs below
 * @link https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback
 * @returns {Promise}
 */
import util from 'util';
import { exec } from 'child_process';
export const execAsync = util.promisify(exec);



/**
 * @method
 * @abstract Take a date string in local time format and converts it to
 *           UTC based on the offset. The offset is the time zone offset
 *           * 60 given by Date. Ex. EST-4 -> 240
 * @param dateString Date as a string in timezone
 * @param offset The integer offset for your timezone (from frontend)
 * @returns {string} Represents date in YYYY-MM-DDTHH:MM:SSZ ie. UTC time
 */

export const toUTC = (dateString: string, offset: number): string => {
  if (!offset) offset = 0;
  const date = new Date(dateString);
  const utc = date.getTime() + offset * 60 * 1000;
  const utcDate = new Date(utc);

  function padZero(value: number) {
    return value < 10 ? '0' + value : value;
  }

  const year = utcDate.getFullYear();
  const month = padZero(utcDate.getMonth() + 1);  // Months are 0-indexed
  const day = padZero(utcDate.getDate());
  const hours = padZero(utcDate.getHours());
  const minutes = padZero(utcDate.getMinutes());
  const seconds = padZero(utcDate.getSeconds());

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;

}

/**
 * @method
 * @abstract Take a date string in UTC format and converts it to
 *           your time zone based on the offset. The offset is the time zone offset
 *           * 60 given by Date. Ex. EST-4 -> 240
 * @param utcString Date as a string in UTC
 * @param offset The integer offset for your timezone (from frontend)
 * @returns {string} Represents date in YYYY-MM-DD HH:MM:SS for your timezone
 */
export const convertDates = (utcString: string, offset: number): string => {
  if (!offset) offset = 0;
  const utcDate = new Date(utcString);
  const localDate = utcDate.getTime() - offset * 60 * 1000;
  const localDateObj = new Date(localDate);

  function padZero(value: number) {
    return value < 10 ? '0' + value : value;
  }

  const year = localDateObj.getFullYear();
  const month = padZero(localDateObj.getMonth() + 1);  // Months are 0-indexed
  const day = padZero(localDateObj.getDate());
  const hours = padZero(localDateObj.getHours());
  const minutes = padZero(localDateObj.getMinutes());
  const seconds = padZero(localDateObj.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

}

/**
 * @method
 * @abstract Performs regex matching on the 'stringToMatch' for a date of style
 *           'YYYY-MM-DDTHH:MM:SS.SSSSSSSSSZ' (9 trailing numbers for precision)
 *           It will on one loop update the timeStamp and on the next loop update the
 *           previous timeStamps message. The timeStamp converts from UTC to local time
 * @param stringToMatch The output string of docker logs
 * @param container Docker container that was queried with docker logs
 * @param offset Time zone off set from UTC for a users timezone ie. EST-4 = 240
 * @returns An array of log Objects
 */
export const parseLogString = (stringToMatch: string, container: string, offset: number): LogObject[]=>{
  const regex = /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{9}Z)/g
  // Match regex and get the start and stop positions with timestamp
  // Let index = 0;
  if (!stringToMatch || stringToMatch.length === 0) {
    return [];
  }
  const infoArr: LogObject[] = [];
  let index: number = 0;
  let timeStampEndIndex: number = 0;
  // let timeStampEnd
  // while we get regex, push timestamp into array like [{timestamp: timestamp}]
  let myMatch: RegExpExecArray | null;
  while ((myMatch = regex.exec(stringToMatch)) !== null) {
    if (index !== 0) {
      // get the message up to newest match and add to index-1 msg
      infoArr[index - 1].logMsg = stringToMatch.slice(timeStampEndIndex + 1, myMatch.index);
    }

    // 
    infoArr.push({ timeStamp: convertDates(myMatch[0], offset), logMsg: '', containerName: container });
    timeStampEndIndex = regex.lastIndex;
    index++
  }
  // update last string
  if (infoArr.length === 0) return [];
  infoArr[infoArr.length - 1].logMsg = stringToMatch.slice(timeStampEndIndex + 1);
  return infoArr;
}


export const getContainersOnNetwork = async (networkId: string): Promise<NetworkContainerType[]> => {
  try {
    const { stdout, stderr } = await execAsync(`docker network inspect ${networkId} --format json`);
    if (stderr.length) throw new Error(stderr);
    const data: NetworkInspect[] = JSON.parse(stdout);
    const containers: NetworkContainerType[] = [];
    const ContainersObj = data[0].Containers;
    for (let key in ContainersObj) {
      const container: NetworkContainerType = {
        ID: key,
        Name: ContainersObj[key].Name,
        EndpointID: ContainersObj[key].EndpointID,
        IPv4Address: ContainersObj[key].IPv4Address,
        IPv6Address: ContainersObj[key].IPv6Address,
        MacAddress: ContainersObj[key].MacAddress
      };
      containers.push(container);
    }
    return containers;
  } catch (error) {
    console.error(`Error Extracting Containers from network ${networkId} with Error: `, error);
  }
}
