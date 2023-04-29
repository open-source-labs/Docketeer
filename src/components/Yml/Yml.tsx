// * Currently not implemented. Is meant to upload and run docker compose files.

// /**
//  * @module | Yml.js
//  * @description | Provides ability to upload local docker compose file & subsequently run docker compose up & docker compose down via UI
//  **/

// import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
// import useHelper from '../helpers/commands';
// import { useAppDispatch, useAppSelector } from '../../reducers/hooks';
// import { createAlert, createPrompt } from '../../reducers/alertReducer';

// const Yml = (): JSX.Element => {
//   const dispatch = useAppDispatch();
//   const composeStack = useAppSelector((state) => state.composes.composeStack);

//   const [filePath, setFilePath]: [string, Dispatch<SetStateAction<string>>] =
//     useState<string>('');
//   const [ymlFile, setYmlFile]: [string, Dispatch<SetStateAction<string>>] =
//     useState<string>('');
//   const [ymlFileName, setYmlFileName]: [
//     string,
//     Dispatch<SetStateAction<string>>
//   ] = useState<string>('');

//   const { dockerComposeStacks, dockerComposeUp, dockerComposeDown } =
//     useHelper();

//   // const getContainerStacks = (data) =>
//   //   dispatch(actions.getContainerStacks(data));
//   // const composeDown = (data) => dispatch(actions.composeDown(data));

//   useEffect(() => {
//     // Upon page render, get list of currently running container networks
//     dockerComposeStacks();

//     const holder: HTMLElement | null = document.getElementById('drag-file');
//     const uploadHolder: HTMLElement | null =
//       document.getElementById('uploadFile');

//     holder.ondragover = () => {
//       // holder.style = 'background-color: #EDEDED';
//       holder.setAttribute('style', 'background-color: #EDEDED');
//       return false;
//     };
//     holder.ondragleave = () => {
//       // holder.style = 'background-color: white';
//       holder.setAttribute('style', 'background-color: white');
//       return false;
//     };
//     holder.ondragend = () => {
//       return false;
//     };

//     uploadHolder.onchange = (e) => {
//       e.preventDefault();
//       if (
//         e.target.files.length &&
//         e.target.files[0].type === 'application/x-yaml'
//       ) {
//         const ymlFile = e.target.files[0];
//         const filePath = e.target.files[0].path;
//         console.log('ymlFileName1', ymlFile)
//         console.log('path1', filePath)
        
//         const reader = new FileReader();
//         reader.readAsText(ymlFile);
//         reader.onload = function (e) {
//           setYmlFile(e.target.result as string);
//         };

//         const ymlRegex = /\/docker-compose.*.yml/;
//         const ymlFileName = filePath.match(ymlRegex)[0].replace('/', '');
//         const directoryPath = filePath.replace(ymlRegex, '');

//         console.log('ymlFileName2', ymlFileName)
//         console.log('path2', directoryPath)
        
//         setFilePath(directoryPath);
//         setYmlFileName(ymlFileName);
//       }
//     };
//   }, []);

//   // creates table of running container networks
//   const TableData = (): JSX.Element[] => {
//     return composeStack.map((container, index) => {
//       return (
//         <tbody key={index}>
//           <tr>
//             <td>
//               <span className="container-name">{container.Name}</span>
//             </td>
//             <td>
//               <span className="container-id">{container.ID}</span>
//             </td>
//             <td>
//               <span className="container-drive">{container.Driver}</span>
//             </td>
//             <td>
//               <span className="container-scope">{container.Scope}</span>
//             </td>
//             <td>
//               <span className="container-createdAt">{container.CreatedAt}</span>
//             </td>
//             <td className="min-w-1/4">
//               {container.FilePath && container.YmlFileName && (
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => {
//                     dispatch(
//                       createPrompt(
//                         `Are you sure you want to docker compose down ${container.FilePath} | ${container.YmlFileName}?`,
//                         () => {
//                           dockerComposeDown(
//                             container.FilePath,
//                             container.YmlFileName
//                           );
//                           setYmlFile('');
//                           setFilePath('');
//                           setYmlFileName('');
//                           dispatch(
//                             createAlert(
//                               'Running docker compose down...',
//                               5,
//                               'success'
//                             )
//                           );
//                         },
//                         () => {
//                           dispatch(
//                             createAlert(
//                               'The request to run docker compose down has been cancelled.',
//                               5,
//                               'warning'
//                             )
//                           );
//                         }
//                       )
//                     );
//                   }}
//                 >
//                   DOCKER COMPOSE DOWN
//                 </button>
//               )}
//             </td>
//           </tr>
//         </tbody>
//       );
//     });
//   };

//   return (
//     <>
//       <div className="h-3"></div>
//       <div className="usersFlex flex flex-wrap gap-3">
//         <div className="card bg-neutral text-neutral-content rounded-lg flex-1">
//           <div className="card-body space-y-2">
//             <h2 className="card-title text-sm">DOCKER COMPOSE</h2>
//             <p className="text-xs font-bold">
//               This area provides an interface to upload docker compose files to
//               compose up and subsequently compose down.
//             </p>
//             <div className="divider py-4"></div>
//             <div id="drag-file" className="usersFlex flex flex-wrap gap-3">
//               <input
//                 type="file"
//                 id="uploadFile"
//                 accept=".yml"
//                 className="file-input file-input-bordered file-input-primary w-full"
//               />
//               <div className="py-1"></div>
//               <button className="btn btn-primary" id="upload-btn">
//                 UPLOAD
//               </button>
//             </div>
//             <div className="divider py-4"></div>
//             <div>
//               <button
//                 className="btn btn-primary"
//                 onClick={() => {
//                   dispatch(
//                     createPrompt(
//                       'Are you sure you want to run docker compose up on this file?',
//                       () => {
//                         dockerComposeUp(filePath, ymlFileName);
//                         setYmlFile('');
//                         setFilePath('');
//                         setYmlFileName('');
//                         dispatch(
//                           createAlert(
//                             'Running docker compose up...',
//                             5,
//                             'success'
//                           )
//                         );
//                       },
//                       () => {
//                         dispatch(
//                           createAlert(
//                             'The request to run docker compose up has been cancelled.',
//                             5,
//                             'warning'
//                           )
//                         );
//                       }
//                     )
//                   );
//                 }}
//               >
//                 DOCKER COMPOSE UP
//               </button>
//             </div>
//             {ymlFile && (
//               <pre style={{ margin: '1rem 0rem' }}>
//                 <code>{ymlFile}</code>
//               </pre>
//             )}
//           </div>
//         </div>
//         <div className="card bg-neutral text-neutral-content rounded-lg flex-1">
//           <div className="card-body space-y-2">
//             <h2 className="card-title text-sm">DOCKER COMPOSE</h2>
//             <div className="divider py-8"></div>
//             <div className="items-center">
//               <div className="overflow-x-auto">
//                 <table className="table w-full">
//                   <thead>
//                     <tr>
//                       <th className="text-xs">NAME</th>
//                       <th className="text-xs">CONTAINER ID</th>
//                       <th className="text-xs">DRIVER</th>
//                       <th className="text-xs">SCOPE</th>
//                       <th className="text-xs">CREATED AT</th>
//                       <th className="text-xs">COMPOSE ACTION</th>
//                     </tr>
//                   </thead>
//                   <TableData />
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Yml;
