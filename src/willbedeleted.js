
const convert = (stdout) => {

  let newArray = stdout.split('\n');
    //console.log('newArray: ', newArray);
    //console.log(newArray);
    let result = [];
    for(let i = 1; i < newArray.length-1; i++) {
        let removedSpace = newArray[i].replace(/\s+/g, " ");
        removedSpace = removedSpace.replace(/\s[/]\s/g, '/');
        let splittedArray = removedSpace.split(' ');
        result.push(splittedArray);  
    }
    return result;
}
// containerID [0]      Name   [1]              CPU    [2]   MEM 
//["f3b254350c50" [0], "checkpoint_nginx_1" [1], "0.00%", [2] "0B/0B", "0.00%", "0B/0B", "0B/0B", "0"] == result[0]
// result => [ ["f3b254350c50", "checkpoint_nginx_1", "0.00%", "0B/0B", "0.00%", "0B/0B", "0B/0B", "0"] , []]
/*
obj example

const newObj = {
  containerId: 
}
//loop the array of result
    //newObj[0] = newArray[i][0]
    //newObj[1] = newArray[i][1]
    //newObj[2] = newArray[i][2]
    ...

*/
//const metricsInContainer 
//newArray[0] ===    CONTAINER ID        NAME                           CPU %               MEM USAGE / LIMIT     MEM %               NET I/O             BLOCK I/O           PIDS

//const valueInContainer

const convertArrToObj = (array) => {
  
  let objArray = ['Container Id', 'Name', 'CPU %', 'Mem Usage / Limit', 'Mem %', 'Net I/O', 'Block I/O', 'PIDS'];
  const result = []
  for (let i = 0; i < array.length; i++) {
    let containerObj = {};
    for (let j = 0; j < array[i].length; j++) {
      containerObj[objArray[j]] = array[i][j]      
    }
    result.push(containerObj);
  }

  return result
}

module.exports = {
  convert, convertArrToObj
}
// let string = '99599cfe971e iteration-project_node-app_1 0.00% 60MiB / 1.944GiB 3.01% 42.1kB / 13.5kB 0B / 0B 22';

// string = string.replace(/\s[/]\s/g, '/');
// let newArr = string.split(' ');
// console.log(newArr);

/*
[
  '99599cfe971e',
  'iteration-project_node-app_1',
  '0.00%',
  '60MiB/1.944GiB',
  '3.01%',
  '42.1kB/13.5kB',
  '0B/0B',
  '22'
]
*/