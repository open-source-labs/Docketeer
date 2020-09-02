// const { exec } = require('child_process');




// const addContainers = () => {
//   exec('docker ps', (error, stdout, stderr) => {
//     //docker stats --no-stream
//         if (error) {
//           console.log(`error: ${error.message}`);
//           return;
//         }
//         if (stderr) {
//           console.log(`stderr: ${stderr}`);
//           return;
//         }
//         //console.log('stdout: ', stdout)
//         let newArray = stdout.split('\n');

//         //console.log('newArray: ', newArray);
//         // let newSplittedString = newArray[0].replace(/\s+/g, ", ");
//         // console.log(newSplittedString)
//         // let newSplittedString1 = newArray[1].replace(/\s+/g, " ");
//         // const dispatch = useDispatch();
//         // const addContainer = (data) => dispatch(actions.addContainer(data));

//         // console.log(newSplittedString1.split(' '))

//         return newArray[1];
//   });

// };

// module.exports = {
//   addContainers
// }