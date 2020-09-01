import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import get from "../functions"
import * as actions from "../actions/actions";
import { exec } from "child_process";

const App = (props) => {
  const dispatch = useDispatch();
  const addContainer = (data) => dispatch(actions.addContainer(data));
  const getRunningContainers = (data) => dispatch(actions.getRunningContainers(data))
	
	// useselector Allows you to extract data from the Redux store state, using a selector function.
	const data = useSelector((state) => state.containers.containerList);
  
  useEffect(() => {
		exec('docker ps', (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				return;
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
				return;
			}
			console.log(stdout)
			return addContainer(stdout.split('\n')[1]);
		});
  }, []);

	// useEffect(() => {

  // }, [data]);
  return (
    <div>
      Hello I am in react
      
      <p>{data}</p>
    </div>
  );
};

export default App;
