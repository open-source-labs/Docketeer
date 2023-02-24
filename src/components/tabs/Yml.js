import React, { useEffect, useState } from 'react';
import useHelper from '../helper/commands';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useAppSelector } from '../../redux/reducers/hooks';

/**
 * Displays all running docker-compose container networks; drag and drop or upload functionality
 **/

const Yml = () => {
  const composeStack = useAppSelector((state) => state.composes.composeStack);

  const [filePath, setFilePath] = useState('');
  const [ymlFile, setYmlFile] = useState('');
  const [ymlFileName, setYmlFileName] = useState('');

  const { dockerComposeStacks, dockerComposeUp, dockerComposeDown } =
    useHelper();

  // const getContainerStacks = (data) =>
  //   dispatch(actions.getContainerStacks(data));
  // const composeDown = (data) => dispatch(actions.composeDown(data));

  useEffect(() => {
    // Upon page render, get list of currently running container networks
    dockerComposeStacks();

    const holder = document.getElementById('drag-file');
    const uploadHolder = document.getElementById('uploadFile');

    holder.ondragover = () => {
      holder.style = 'background-color: #EDEDED';
      return false;
    };
    holder.ondragleave = () => {
      holder.style = 'background-color: white';
      return false;
    };
    holder.ondragend = () => {
      return false;
    };

    uploadHolder.onchange = (e) => {
      e.preventDefault();
      if (
        e.target.files.length &&
        e.target.files[0].type === 'application/x-yaml'
      ) {
        const ymlFile = e.target.files[0];
        const filePath = e.target.files[0].path;

        const reader = new FileReader();
        reader.readAsText(ymlFile);
        reader.onload = function (e) {
          setYmlFile(e.target.result);
        };

        // get yml file name from the filepath for composing up a new container network
        const ymlRegex = /\/docker-compose.*.yml/;
        const ymlFileName = filePath.match(ymlRegex)[0].replace('/', '');

        const directoryPath = filePath.replace(ymlRegex, '');
        setFilePath(directoryPath);
        setYmlFileName(ymlFileName);
      }
    };
  }, []);

  // creates table of running container networks
  const TableData = () => {
    return composeStack.map((container, index) => {
      return (
        // <tbody key={i}>
        //   <tr>
        //     <td>{user._id}</td>
        //     <td>{user.username}</td>
        //     <td>{user.role}</td>
        //     <td>{user.email}</td>
        //     <td>{user.phone}</td>
        //     <td>{user.contact_pref}</td>
        //     <td>{user.mem_threshold}</td>
        //     <td>{user.cpu_threshold}</td>
        //   </tr>
        // </tbody>

        <TableRow key={index}>
          <TableCell>
            <span className='container-name'>{container.Name}</span>
          </TableCell>
          <TableCell>
            <span className='container-id'>{container.ID}</span>
          </TableCell>
          <TableCell>
            <span className='container-drive'>{container.Driver}</span>
          </TableCell>
          <TableCell>
            <span className='container-scope'>{container.Scope}</span>
          </TableCell>
          <TableCell>
            <span className='container-createdAt'>{container.CreatedAt}</span>
          </TableCell>
          {container.FilePath && container.YmlFileName && (
            // container network will only have a filepath and ymlfilename property if it was composed-up through the application itself
            // only the containers composed up from the application will have a compose down button
            <TableCell className='btn-compose-up'>
              <button
                className='btn'
                onClick={() => {
                  dockerComposeDown(container.FilePath, container.YmlFileName);
                  setYmlFile('');
                  setFilePath('');
                  setYmlFileName('');
                }}
              >
                Docker Compose Down
              </button>
            </TableCell>
          )}
        </TableRow>
      );
    });
  };

  return (
    // <>
    //   <div className='h-3'></div>
    //   <div className='usersFlex flex flex-wrap gap-3'>
    //     <div className='card bg-neutral text-neutral-content rounded-lg flex-1'>
    //       <div className='card-body space-y-2'>
    //         <h2 className='card-title text-sm'>DOCKER COMPOSE</h2>
    //         <p className='text-xs font-bold'>This area provides an interface to upload docker compose files to compose up and subsequently compose down.</p>
    //         <div className='divider py-8'></div>
    //         <div className='items-center'>
    //           <div className='overflow-x-auto'>
    //             <table className='table w-full'>
    //               <thead>
    //                 <tr>
    //                   <th className='text-xs'>ID</th>
    //                   <th className='text-xs'>USER</th>
    //                   <th className='text-xs'>ROLE</th>
    //                   <th className='text-xs'>EMAIL</th>
    //                   <th className='text-xs'>PHONE</th>
    //                   <th className='text-xs'>CONTACT PREF.</th>
    //                   <th className='text-xs'>MEMORY</th>
    //                   <th className='text-xs'>CPU</th>
    //                 </tr>
    //               </thead>
    //               {renderUsers}
    //             </table>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <NewUserDisplay />
    //   </div>
    // </>

    <div className='renderContainers'>
      <div className='header'>
        <h1 className='tabTitle'>Docker Compose</h1>
      </div>
      <div className='settings-container'>
        <div id='drag-file'>
          <div className='btn-compose-up'>
            Upload your Docker Compose file here to compose
            <div>
              <button className='etc-btn' id='upload-btn'>
                <input id='uploadFile' type='file' accept='.yml'></input>
                UPLOAD FILE
              </button>
              <button
                className='etc-btn'
                onClick={() => {
                  dockerComposeUp(filePath, ymlFileName);
                  setYmlFile('');
                  setFilePath('');
                  setYmlFileName('');
                }}
              >
                DOCKER COMPOSE UP
              </button>
            </div>
          </div>
          {ymlFile && (
            <pre style={{ margin: '1rem 0rem' }}>
              <code>{ymlFile}</code>
            </pre>
          )}
          <br />
        </div>
      </div>
      <div className='settings-container'>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Container ID</TableCell>
                <TableCell>Driver</TableCell>
                <TableCell>Scope</TableCell>
                <TableCell>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableData />
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Yml;
