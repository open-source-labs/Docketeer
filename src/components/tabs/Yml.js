import React, { useEffect, useState } from 'react';
import useHelper from '../helper/commands';

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
        <tbody key={index}>
          <tr>
            <td>
              <span className='container-name'>{container.Name}</span>
            </td>
            <td>
              <span className='container-id'>{container.ID}</span>
            </td>
            <td>
              <span className='container-drive'>{container.Driver}</span>
            </td>
            <td>
              <span className='container-scope'>{container.Scope}</span>
            </td>
            <td>
              <span className='container-createdAt'>{container.CreatedAt}</span>
            </td>
            <td className='min-w-1/4'>
              {container.FilePath && container.YmlFileName && (
                <button
                  className='btn btn-primary'
                  onClick={() => {
                    dockerComposeDown(
                      container.FilePath,
                      container.YmlFileName
                    );
                    setYmlFile('');
                    setFilePath('');
                    setYmlFileName('');
                  }}
                >
                  DOCKER COMPOSE DOWN
                </button>
              )}
            </td>
          </tr>
        </tbody>
      );
    });
  };

  return (
    <>
      <div className='h-3'></div>
      <div className='usersFlex flex flex-wrap gap-3'>
        <div className='card bg-neutral text-neutral-content rounded-lg flex-1'>
          <div className='card-body space-y-2'>
            <h2 className='card-title text-sm'>DOCKER COMPOSE</h2>
            <p className='text-xs font-bold'>
              This area provides an interface to upload docker compose files to
              compose up and subsequently compose down.
            </p>
            <div className='divider py-4'></div>
            <div id='drag-file' className='usersFlex flex flex-wrap gap-3'>
              <input
                type='file'
                id='uploadFile'
                accept='.yml'
                className='file-input file-input-bordered file-input-primary w-full'
              />
              <div className='py-1'></div>
              <button className='btn btn-primary' id='upload-btn'>
                UPLOAD
              </button>
            </div>
            <div className='divider py-4'></div>
            <div>
              <button
                className='btn btn-primary'
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
            {ymlFile && (
              <pre style={{ margin: '1rem 0rem' }}>
                <code>{ymlFile}</code>
              </pre>
            )}
          </div>
        </div>
        <div className='card bg-neutral text-neutral-content rounded-lg flex-1'>
          <div className='card-body space-y-2'>
            <h2 className='card-title text-sm'>DOCKER COMPOSE</h2>
            <div className='divider py-8'></div>
            <div className='items-center'>
              <div className='overflow-x-auto'>
                <table className='table w-full'>
                  <thead>
                    <tr>
                      <th className='text-xs'>NAME</th>
                      <th className='text-xs'>CONTAINER ID</th>
                      <th className='text-xs'>DRIVER</th>
                      <th className='text-xs'>SCOPE</th>
                      <th className='text-xs'>CREATED AT</th>
                      <th className='text-xs'>COMPOSE ACTION</th>
                    </tr>
                  </thead>
                  <TableData />
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Yml;
