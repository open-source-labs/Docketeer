const convert = (stdout) => {

    let newArray = stdout.split('\n');
    let result = [];
    for(let i = 1; i < newArray.length-1; i++) {
        let removedSpace = newArray[i].replace(/\s+/g, " ");
        removedSpace = removedSpace.replace(/\s[/]\s/g, '/');
        let splittedArray = removedSpace.split(' ');
        result.push(splittedArray);  
    }
      return result;
  }
  
const convertArrToObj = (array, objArray) => {

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
