/* eslint-disable react/prop-types */
import React, {useState, useEffect} from "react";
import { convertToMetricsArr } from "../helper/parseContainerFormat";
import { Pie, Line } from "react-chartjs-2";


/**
 * 
 * @param {*} props 
 * Display general metrics
 */
const Metrics = (props) => {
	const [activeContainers, setActiveContainers] = useState({});
	const [axis, setAxis] = useState([]);
	const [memory, setMemory] = useState([]);
	const [cpu, setCpu] = useState([]);

	const bothLabels = []
	const memoryObj = {
		labels: bothLabels,
		datasets: memory,
	}
	const cpuObj = {
		labels: bothLabels,
		datasets: cpu,
	}

	const formatData = () => {
		//if active containers is empty render the empty graphs
		if (!Object.keys(activeContainers).length) {
			setMemory([]);
			setCpu([]);
				return;
		}
		// DB QUERY LIKELY GOING HERE
		const data = [	{time:'1', name: 'amazing_morse', block: "0B/0B", cid: "db06b75e6db7", cpu: "4.00%", mp: "0.18%", mul: "2.523MiB/1.945GiB", net: "50B/0B", pids: "3"}, {name: 'amazing_morse', time: "2", block: "0B/0B", cid: "db06b75e6db7", cpu: "4.00%", mp: "2%", mul: "2.523MiB/1.945GiB", net: "50B/0B", pids: "3"}, {name: 'amazing_morse', time: "3", block: "0B/0B", cid: "db06b75e6db7", cpu: "4.00%", mp: "5.18%", mul: "2.523MiB/1.945GiB", net: "50B/0B", pids: "3"}]
		// reset datasets to empty array
		setMemory([]);
		setCpu([]);

		// build two fundtion that will return formated object for each container to in datapoins
		const cpuBuilder = (containerName) => {
      const obj = {
        label: containerName,
        data: [],
        fill: false,
      };
      return obj;
		};
		
    const memoryBuilder = (containerName) => {
      const obj = {
        label: containerName,
        data: [],
        fill: false,
      };
      return obj;
		};

		const auxObj = {}

		// build the auxilary object to hold active container data
		 
		Object.keys(activeContainers).forEach(container => {
			auxObj[container] = {
				memory: memoryBuilder(container), 
				cpu: cpuBuilder(container)
			}
		});
		
		// iterate through each row from query and buld Memory and CPU objects [{ }, {} ]
		data.forEach((dataPoint) => {
			const currentContainer = dataPoint.name;
			auxObj[currentContainer].cpu.data.push(dataPoint.cpu.replace('%', ''))
			auxObj[currentContainer].memory.data.push(dataPoint.mp.replace('%', ''))

			bothLabels.push(Number(dataPoint.time));
			console.log('bothLabels: ', bothLabels)
			// add x data points to 	
			// const axisCopy = JSON.parse(JSON.stringify(axis));
			// axisCopy.push(dataPoint.time);
			// console.log('axisCopy: ',axisCopy)
			// console.log('datapoint: ',dataPoint)
			// setAxis(axisCopy);
			// console.log('here is axis: ', axis)
		});


		
		Object.keys(auxObj).forEach(containerName => {
			const memoryCopy = JSON.parse(JSON.stringify(memory))
			memoryCopy.push(auxObj[containerName].memory);
			setMemory(memoryCopy);
			
			const cpuCopy = JSON.parse(JSON.stringify(cpu))
			cpuCopy.push(auxObj[containerName].cpu);
			setCpu(cpuCopy);
		});	
	}

	

	// Internal Note: maybe want to fix currentList and make a state variable??
	let currentList;
	const selectList = () => {
		const result = [];
		props.runningList.forEach(container => {
			// result.push(<option value={container.name}>{container.name}</option>)
			result.push(<div><label htmlFor={container.name}>{container.name}</label><input name={container.name} type="checkbox" value={container.name}></input></div>)
		})
		// <input name="container-1" type="checkbox" value="Container-1"></input>
		// <label htmlFor="container-1">Container 1</label>
		props.stoppedList.forEach(container => {
			result.push(<div><label htmlFor={container.name}>{container.name}</label><input name={container.name} type="checkbox" value={container.name}></input></div>)
		})
		currentList = result; 
	}


	const handleChange = (e) => {
		const containerName = e.target.name;
		// deep copy the state object - shallow copy didn't work
		const copyObj = JSON.parse(JSON.stringify(activeContainers));
		if (activeContainers[containerName])  {
			delete copyObj[containerName];
		} else {
			copyObj[containerName] = true;
		} 
		setActiveContainers(copyObj);
	}

	let cpuOptions = {
		tooltips: {
			enabled: true,
			mode: 'index',
		},
		title: {
			display: true,
			text: "CPU",
			fontSize: 23,
		},
		legend: { display: true, position: "bottom" },
		responsive: true,
		maintainAspectRatio: true,

	};

	let memoryOptions = {
		tooltips: {
			enabled: true,
			mode: 'index',
		},
		title: {
			display: true,
			text: "MEMORY",
			fontSize: 23,
		},
		legend: { display: true, position: "bottom" },
		responsive: true,
		maintainAspectRatio: true,
	};
	
	selectList();
	useEffect(() => {
		console.log('both labels before formatData is: ', bothLabels)
		formatData();
	}, [activeContainers])

	return (
		<div className="renderContainers">
			<div className="header">
				<span className="tabTitle">Metrics</span>
			</div>
			<div style={{marginTop: "150px"}}> 
				<form onChange={(e) => {handleChange(e)}}>
					{currentList}
				</form>
			</div>

			<div className="allCharts">
				
				<div className="line-section">
					<div className="lineChart">
						<Line data={memoryObj} options={memoryOptions} width={4000} height={2600} />
					</div>
				</div>

				<div className="line-section">
					<div className="lineChart">
						<Line data={cpuObj} options={cpuOptions} width={4000} height={2600} />
					</div>
				</div>

			</div>
		</div>
	);
};

export default Metrics;

// block: "0B/0B", 
// cid: "db06b75e6db7", 
// cpu: "4.00%", CPU PERCENTAGE
// mp: "0.18%", MEMORY PERCENTAGE
// mul: "2.523MiB/1.945GiB", 
// name: "compassionate_goldberg", 
// net: "50B/0B", TRANSMITTED / RECEIVED  
// pids: "3" MAYBE

// write a handleChange function 
// build state with selected containers --> ['container-1', 'container-2']
// query db for information based on current selections (for now this will be dummy data)
// create a object to be pushed into the dataset prop for the respective graph
// push the object into the graph
	// component should rerender when update


	// const cpu = {
	// 	labels: dataLabels,
	// 	datasets: [
	// 		{
	// 			label: activeContainers,
	// 			 data: cpuData, 
	// 			 fill: false
	// 		},
	// 	],
	// };