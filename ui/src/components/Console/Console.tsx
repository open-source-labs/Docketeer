import React, { useState, useEffect } from 'react';
import useHelper from '../../helpers/commands';
import { Terminal } from 'xterm';
import {useRef} from 'react'

const Console = (): JSX.Element => {
  const terminalRef = useRef(null);
  const term: any = useRef(null);

  // useEffect(() => {
  //   term.current = new Terminal();
  //   term.current.open(terminalRef.current);
  //   term.current.write('Hello');

  //   return () => {
  //     term.current.dispose();
  //   };
  // }, []);

  return (
    // <div ref={terminalRef} style={{ width: "500px", height: "300px" }}></div>
    <div>hello!</div>
  );
};









export default Console