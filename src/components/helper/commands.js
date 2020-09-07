import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../actions/actions";
import { exec, spawn } from "child_process";

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
	console.log("runningList", runningList);
	console.log("I am here5")
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
		console.log(convertedValue);
		const newList = []
		for (let i = 0; i < convertedValue.length; i++) {
			let isInTheList = false
			for (let container of runningList) {
				if (container.cid === convertedValue[i].cid) {
					isInTheList = true
				}
			}
			if (!isInTheList) {
				newList.push(convertedValue[i])
			}
		}
		console.log(newList.length)
		if (newList.length > 0) {

			console.log("I am in callback")
			callback(newList)
			console.log("I am after callback")
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

			let stoppingString = 'Exited';
			let findIndex = value[i].findIndex(ele => ele === stoppingString)
			let slicedString = value[i].slice(3, findIndex).join(" ");
			innerArray.push(slicedString);
			
			result.push(innerArray);
		}
		let objArray = ['cid', 'img', 'created'];
		let convertedValue = parseContainerFormat.convertArrToObj(result, objArray);

		console.log(convertedValue);

		const newList = []
		for (let i = 0; i < convertedValue.length; i++) {
			let isInTheList = false
			for (let container of stoppedList) {
				if (container.cid === convertedValue[i].cid) {
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
				if (container.cid === convertedValue[i].cid) {
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

export const refreshRunning = (runningList, callback) => {
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
		console.log(convertedValue);
		callback(convertedValue)
	});
};

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
		callback(id);
	});
};

export const runIm = (id, runningList, callback_1, callback_2) => {
	console.log("I am here1");
	console.log("id", id);
	console.log("runningList:", runningList);

	exec(`docker run ${id}`, (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		//callback_1(id)
		console.log("I am here2");
		callback_1(runningList, callback_2);
	})

}

export const removeIm = (id, callback) => {
	const message = {}
	exec(`docker rmi -f ${id}`, (error, stdout, stderr) => {
		if (error) {
			message['error'] = error.message;
			console.log('Error:', error.message)

		}
		if (stderr) {
			message['stderr'] = stderr
			console.log('stderr:', stderr);

		}
		console.log('stdout', stdout)
		console.log(stdout.length)
		if(stdout.length) {
			callback(id);
		} else {
			//Show modal;
			
		}
	})
}

// export const showGeneralMetrics = () => {
// 	// docker stats --no-stream
	
// 	let convertedValue = parseContainerFormat.convertArrToObj(value, objArray);

// 	return parseContainerFormat(convertedValue)

	

// }