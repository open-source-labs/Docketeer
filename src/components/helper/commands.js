import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../actions/actions";
import { exec } from "child_process";

import parseContainerFormat from './parseContainerFormat';


// const dispatch = useDispatch();
// const addRunningContainers = (data) => dispatch(actions.addRunningContainers(data));
// const removeContainer = (id) => dispatch(actions.removeContainer(id));
// const stopRunningContainer = (id) => dispatch(actions.stopRunningContainer(id));
// const addStoppedContainers = (data) => dispatch(actions.addStoppedContainers(data));
// const runStoppedContainer = (id) => dispatch(actions.runStoppedContainer(id));
// const addExistingImages = (data) => dispatch(actions.getImages(data))


// on app start-up, get the containers that are already running by calling addRunning
export const addRunning = (runningList, callback) => {
	exec("docker stats --no-stream", (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		let value = parseContainerFormat.convert(stdout);
		let objArray = ['cid', 'name', 'cpu', 'mul', 'mp', 'net', 'block', 'pids'];
		let convertedValue = parseContainerFormat.convertArrToObj(value, objArray);
		const newList = []
		for (let i = 0; i < convertedValue.length; i++) {
			let isInTheList = false
			for (let container of runningList) {
				if (container.id === convertedValue[i].id) {
					isInTheList = true
				}
			}
			if (!isInTheList) {
				newList.push(convertedValue[i])
			}
		}
		if (newList.length > 0) {
			callback(newList)
		}
	});
};

export const addStopped = (stoppedList, callback) => {
	exec('docker ps -f "status=exited"', (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		let value = parseContainerFormat.convert(stdout);
		//value => array
		const result = [];
		//tempoary we will have it as manual number
		for (let i = 0; i < value.length; i++) {
			let innerArray = [];
			innerArray.push(value[i][0]); // id
			innerArray.push(value[i][1]); // image
			if (!isNaN(parseInt(value[i][3]))) {
				innerArray.push(value[i][3] + ' days ago'); // created 
			} else {
				innerArray.push(value[i][6] + ' days ago');
			}
			result.push(innerArray);
		}
		let objArray = ['cid', 'img', 'created'];
		let convertedValue = parseContainerFormat.convertArrToObj(result, objArray);

		const newList = []
		for (let i = 0; i < convertedValue.length; i++) {
			let isInTheList = false
			for (let container of stoppedList) {
				if (container.id === convertedValue[i].id) {
					isInTheList = true
				}
			}
			if (!isInTheList) {
				newList.push(convertedValue[i])
			}
		}
		if (newList.length > 0) {
			callback(newList)
			// addStoppedContainers(newList)
		}
	});
};

export const addImages = (imagesList, callback) => {
	exec(`docker images`, (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		let value = parseContainerFormat.convert(stdout);
		let objArray = ['reps', 'tag', 'imgid', 'size']
		const resultImages = [];
		for (let i = 0; i < value.length; i++) {
			let innerArray = [];
			if (value[i][0] !== '<none>') {
				innerArray.push(value[i][0])
				innerArray.push(value[i][1])
				innerArray.push(value[i][2])
				innerArray.push(value[i][6])
				resultImages.push(innerArray)
			}
		}
		let convertedValue = parseContainerFormat.convertArrToObj(resultImages, objArray);
		const newList = []
		for (let i = 0; i < convertedValue.length; i++) {
			let isInTheList = false
			for (let container of imagesList) {
				if (container.id === convertedValue[i].id) {
					isInTheList = true
				}
			}
			if (!isInTheList) {
				newList.push(convertedValue[i])
			}
		}
		if (newList.length > 0) {
			callback(newList)
			// addExistingImages(newList)
		}
	});
}

export const remove = (id, callback) => {
	exec(`docker rm --force ${id}`, (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		callback(id)
		// removeContainer(id);
	});
};

export const stop = (id, callback) => {
	exec(`docker stop ${id}`, (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		callback(id)
		// stopRunningContainer(id);
	});
};

export const runStopped = (id, callback) => {
	exec(`docker start ${id}`, (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		console.log(stdout)
		callback(id)
		// runStoppedContainer(id);
	});
};

export const runIm = (id, callback) => {
	exec(`docker run ${id}`, (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		callback(id)
	});
}

export const removeIm = (id, callback) => {
	exec(`docker rmi -f ${id}`, (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		callback(id)
	});
}
