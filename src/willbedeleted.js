
const convert = (stdout) => {
  console.log('I am here')
  let newArray = stdout.split('\n');
    //console.log('newArray: ', newArray);
    let result = [];
    for(let i = 1; i < newArray.length-1; i++) {
      let removedSpace = newArray[i].replace(/\s+/g, " ");
      removedSpace = removedSpace.replace(/\s[/]\s/g, '/');
      let splittedArray = removedSpace.split(' ');
      result.push(splittedArray);
    }
    return result;
}


module.exports = {
  convert
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