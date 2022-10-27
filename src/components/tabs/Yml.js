import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
<<<<<<< HEAD:src/tabs/Yml.js
import * as actions from '../../redux/actions/actions';
import * as helper from '../helper/commands';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';

/**
 * Displays all running docker-compose container networks; drag and drop or upload functionality
 *
 * @param {*} props
 */

=======
import * as actions from '../../actions/actions';
import * as helper from '../helper/commands';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

/**
 * Displays all running docker-compose container networks; drag and drop or upload functionality
 * 
 * @param {*} props
 */

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiTextField-root': {
      marginLeft: 5,
      marginBottom: 15,
      width: 220,
      verticalAlign: 'middle',
    },
  },
  button: {
    marginLeft: 5,
    width: 100,
    verticalAlign: 'top',
  },
  verifiedIcon: {
    verticalAlign: 'top',
    color: 'green',
  },
  description: {
    marginLeft: 5,
    marginBottom: 30,
  },
}));

>>>>>>> 276c4d7 (Revert "Updated linting for project. (#107)"):src/components/tabs/Yml.js
const Yml = () => {
  const classes = useStyles();
  const [filePath, setFilePath] = useState('');
  const [ymlFile, setYmlFile] = useState('');
  const [ymlFileName, setYmlFileName] = useState(''); // ymlFileName is specifically for the dockerComposeUp helper fn
  const dispatch = useDispatch();

  const composeStack = useSelector((state) => state.networkList.composeStack);

  const getContainerStacks = (data) =>
    dispatch(actions.getContainerStacks(data));
  const composeDown = (data) => dispatch(actions.composeDown(data));

  
  useEffect(() => {
    // upon page render, get list of currently running container networks
    helper.dockerComposeStacks(getContainerStacks);

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
<<<<<<< HEAD:src/tabs/Yml.js
            // only the containers composed up from the application will have a compose down button
            <TableCell className='btn-compose-up'>
=======
            // only the containers composed up from the application will have a compose down button 
            <TableCell className="btn-compose-up">
>>>>>>> 276c4d7 (Revert "Updated linting for project. (#107)"):src/components/tabs/Yml.js
              <button
                className='btn'
                onClick={() => {
                  helper
                    .dockerComposeDown(container.FilePath, container.YmlFileName)
                    .then((res) => {
                      if (res) {
                        helper.dockerComposeStacks(getContainerStacks, container.FilePath, container.YmlFileName);
                        setYmlFile('');
                        setFilePath('');
                        setYmlFileName('');
                      }
                    })
                    .catch((err) => console.log(err));
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
    <div className='renderContainers'>
      <div className='header'>
        <h1 className='tabTitle'>Docker Compose</h1>
      </div>
      <div className='settings-container'>
        <div id='drag-file'>
          Upload your Docker Compose file here to compose
          {ymlFile && (
            <pre style={{ margin: '1rem 0rem' }}>
              <code>{ymlFile}</code>
            </pre>
          )}
          <br />
        </div>
        <div className='btn-compose-up'>
          <Button
            sx={{
              ml: 1,
              width: 150
            }}
            style={{marginTop: 10}}
            component='label'
            size='medium'
            variant='contained'>
            <input hidden id='uploadFile' type='file' accept='.yml'></input>
            Upload File
          </Button>
          <Button
            sx={{
              ml: 1,
              width: 200
            }}
            size='medium'
            variant='contained'
            onClick={() => {
              helper
                .dockerComposeUp(filePath, ymlFileName) 
                .then((res) => {
                  if (res) { 
                    helper.dockerComposeStacks(getContainerStacks, filePath, ymlFileName);
                    setYmlFile('');
                    setFilePath('');
                    setYmlFileName('');
                  }
                })
                .catch((err) => console.log(err));
            }}
          >
            Docker Compose Up
          </Button>
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
