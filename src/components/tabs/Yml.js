import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
 * Displays all docker-compose network; drag and drop or upload functionality
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

    // holder.ondrop = (e) => {
    //   e.preventDefault();
    //   let fileList = e.dataTransfer.files;
    //   if (fileList.length > 1) return;
    //   if (fileList[0].type === "application/x-yaml") {
    //     let filePath = fileList[0].path.replace(/([\s])+/g, "\\ ");
    //     const filteredArr = filePath.split("/");
    //     filteredArr.pop();
    //     let filteredPath = filteredArr.join("/");
    //     setFilepath(filteredPath);
    //     setfileList(fileList[0].name);
    //   }
    //   return false;
    // };

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

        // new code Austin and christina:
        const ymlRegex = /\/docker-compose.*.yml/;
        const ymlFileName = filePath.match(ymlRegex)[0].replace('/', '');
        console.log('ymlFileName from YML.js', ymlFileName);
        console.log('filePath from YML.js', filePath);
        
        const directoryPath = filePath.replace(ymlRegex, '');
        setFilePath(directoryPath);
        setYmlFileName(ymlFileName);

        // old code:
        // const directoryPath = filePath.replace('/docker-compose.yml', '');
        // setFilePath(directoryPath);

      }
    };
  }, []);

  const TableData = () => {
    return composeStack.map((container, index) => {
      return (
        <TableRow key={index}>
          <TableCell>
            <span className="container-name">{container.Name}</span>
          </TableCell>
          <TableCell>
            <span className="container-id">{container.ID}</span>
          </TableCell>
          <TableCell>
            <span className="container-drive">{container.Driver}</span>
          </TableCell>
          <TableCell>
            <span className="container-scope">{container.Scope}</span>
          </TableCell>
          <TableCell>
            <span className="container-scope">{container.CreatedAt}</span>
          </TableCell>
          {container.FilePath && (
            <TableCell className="btn-compose-up">
              <button
                className="btn"
                onClick={() => {
                  helper
                    .dockerComposeDown(container.FilePath)
                    .then((res) => {
                      if (res) {
                        composeDown(container.FilePath);
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
    <div className="renderContainers">
      <div className="header">
        <h1 className="tabTitle">Docker Compose</h1>
      </div>
      <div className="settings-container">
        <div id="drag-file">
          Upload your Docker Compose file here to compose
          {ymlFile && (
            <pre style={{ margin: '1rem 0rem' }}>
              <code>{ymlFile}</code>
            </pre>
          )}
          <br />
        </div>
        <div className="btn-compose-up">
          <input id="uploadFile" type="file" accept=".yml"></input>
          <button
            className="btn"
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
          </button>
        </div>
      </div>
      <div className="settings-container">
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
