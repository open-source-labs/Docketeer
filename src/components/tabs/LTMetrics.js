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
  let result = convertToMetricsArr(props.runningList);
	const [activeContainer, setActiveContainer] = useState('');
	const [dataLabels, setDataLabels] = useState('');
	const [memoryData, setMemoryData] = useState([1,2,3,4]);
	const [cpuData, setCpuData] = useState([12,22,33,44]);
	const dummyData = [	{ time: "1", block: "0B/0B", cid: "db06b75e6db7", cpu: "4.00%", mp: "0.18%", mul: "2.523MiB/1.945GiB", name: "compassionate_goldberg", net: "50B/0B", pids: "3"}, { time: "2", block: "0B/0B", cid: "d22324b06b75e6db7", cpu: "1.00%", mp: "0.13%", mul: "2.523MiB/1.945GiB", name: "compassionate_goldberg", net: "936B/0B", pids: "10"},]

	const formatData = (containerName, data) => {
		console.log('ContainerName: ', containerName)
		// DB QUERY LIKELY GOING HERE
		const memData = data.map(el => el.mp.replace('%', ''));
		const labelData = data.map(el => el.time);
		const cpData = data.map(el => el.cpu.replace('%', ''));

		console.log('cpu: before: ', cpData)
		console.log('mem: before: ', memData)

		setMemoryData(memData);
		setCpuData(cpData);
		setDataLabels(labelData);


		console.log('cpu: After:', cpuData)
		console.log('mem: After:', memoryData)

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
			result.push(<div><label htmlFor={container.name}>{container.name}</label><input name={container.name + "(- Stopped)"} type="checkbox" value={container.name}></input></div>)
		})
		currentList = result; 
	}

	const handleChange = (e) => {
		console.log('target', e.target)
	}

	const memory = {
		labels: dataLabels,
		datasets: [
			{
				label: activeContainer,
				 data: memoryData, 
				 fill: false
			},
		],
	};

	const cpu = {
		labels: dataLabels,
		datasets: [
			{
				label: activeContainer,
				 data: cpuData, 
				 fill: false
			},
		],
	};

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
		formatData(activeContainer, dummyData);
	}, [activeContainer])

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
						<Line data={memory} options={memoryOptions} width={4000} height={2600} />
					</div>
				</div>

				<div className="line-section">
					<div className="lineChart">
						<Line data={cpu} options={cpuOptions} width={4000} height={2600} />
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