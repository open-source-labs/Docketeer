import React, { useState } from 'react';
import * as helper from '../helper/commands';
import {string} from 'prop-types';
import console from 'console';


// this component displays a table  containing the process logs. 

/**
 * Display all running and stopped containers
 * 
 * @param {*} props
 */


const ProcessLogsTable = (props) => {

  const urlString = window.location.href;
  const containerID = urlString.split('/');
  const id = containerID[containerID.length - 1];
   

  return (
    <div className="renderContainers">
      <h1>Coming soon!</h1>
      <h1>ID: {id} </h1> 

      <form>
        
        <input type="radio" id="sinceInput" name="logOption" />
        <label htmlFor="sinceInput">Since</label>
        <input type='text' id="sinceText"/>

        
        <input type="radio" id="tailInput" name="logOption" />
        <label htmlFor="tailInput">Tail</label>
        <input type='text' id="tailText"/>

        <button type='button'>Get Logs</button>
      </form>

    </div>
  );
};

export default ProcessLogsTable;
