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
  let cpuData = (100 - result[0]).toFixed(2);
	let memoryData = (100 - result[1]).toFixed(2);
	const [activeContainer, setActiveContainer] = useState('');
	const [graphData, setGraphData] = useState([1,2,3,4]);




	// el.target.value
	const getData = (containerName) => {
		console.log('ContainerName: ', containerName)
		console.log('current running containers: ', props.runningList)
		// db.query(select * from containerStats where containerName = $1) 

		let data = [];
		if (containerName === 'compassionate_goldberg') {
			// data = [	{ 
			// 					time: "1",
			// 					block: "0B/0B",
			// 					cid: "db06b75e6db7",
			// 					cpu: "4.00%",
			// 					mp: "0.18%",
			// 					mul: "2.523MiB/1.945GiB",
			// 					name: "compassionate_goldberg",
			// 					net: "50B/0B",
			// 					pids: "3"
			// 					}, 
			// 					{ 
			// 					time: "2"
			// 					block: "0B/0B",
			// 					cid: "d22324b06b75e6db7",
			// 					cpu: "1.00%",
			// 					mp: "0.13%",
			// 					mul: "2.523MiB/1.945GiB",
			// 					name: "compassionate_goldberg",
			// 					net: "936B/0B",
			// 					pids: "3"},
			// 				]
		} else if (containerName === 'silly_poincare') {
			// data = [	{time: '1',
			// 					block: "0B/0B",
			// 					cid: "db06b75e6db7",
			// 					cpu: "4.00%",
			// 					mp: "0.18%",
			// 					mul: "2.523MiB/1.945GiB",
			// 					name: "silly_poincare",
			// 					net: "50B/0B",
			// 					pids: "3"}, 
			// 					{time: '2',
			// 					block: "0B/0B",
			// 					cid: "d22324b06b75e6db7",
			// 					cpu: "1.00%",
			// 					mp: "0.13%",
			// 					mul: "2.523MiB/1.945GiB",
			// 					name: "silly_poincare",
			// 					net: "936B/0B",
			// 					pids: "3"},
			// 					{time: '3',
			// 					block: "0B/0B",
			// 					cid: "d22ewe24b06b75e6db7",
			// 					cpu: "4.00%",
			// 					mp: "0.63%",
			// 					mul: "2.823MiB/1.945GiB",
			// 					name: "silly_poincare",
			// 					net: "936B/0B",
			// 					pids: "3"},
			// 				]
		}
		setGraphData(data);
		return 'data';
	} 

	let currentList;
	const selectList = () => {
		const result = [];
		props.runningList.forEach(container => {
			result.push(<option value={container.name}>{container.name}</option>)
		})

		props.stoppedList.forEach(container => {
			result.push(<option value={container.name}>{container.name + ' - (Stopped)'}</option>)
		})
		currentList = result; 
	}


	const memory = {
		labels: [`Available: ${memoryData}%`, `Usage: ${result[1].toFixed(2)}%`, 3, 4],
		datasets: [
			{
				label: 'Memory1',
				 data: graphData, 
				 fill: false
			},
		],
	};

	let options = {
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
		plugins: {
			datalabels: {
				formatter: (value, ctx) => {
					let sum = 0;
					let dataArr = ctx.chart.data.datasets[0].data;
					dataArr.map((data) => {
						sum += data;
					});
					let percentage = ((value * 100) / sum).toFixed(2) + "%";
					return percentage;
				},
				color: "#fff",
			},
		},
	};

	let options2 = {
		tooltips: {
			enabled: false,
		},
		title: {
			display: true,
			text: "CPU",
			fontSize: 23,
		},
		legend: { display: false, position: "bottom" },
		responsive: true,
		maintainAspectRatio: true,
		plugins: {
			datalabels: {
				formatter: (value, ctx) => {
					let sum = 0;
					let dataArr = ctx.chart.data.datasets[0].data;
					dataArr.map((data) => {
						sum += data;
					});
					let percentage = ((value * 100) / sum).toFixed(2) + "%";
					return percentage;
				},
				color: "#fff",
			},
		},
	};
	
	
	selectList();
	useEffect(() => {
		getData(activeContainer);
	}, [activeContainer])

	return (
		<div className="renderContainers">
			<div className="header">
				<span className="tabTitle">Metrics</span>
			</div>
			<div style={{marginTop: "150px"}}> 
				<label htmlFor="containerSelector">Choose a container:</label>
				<select name="containerSelector" id="containerSelector" onChange={(e) => setActiveContainer(e.target.value)}>
					{currentList}
				</select>
			</div>


			<div className="allCharts">
				<div className="section">
					<div className="lineChart">
						<Line data={memory} options={options} width={4000} height={2600} />
						<div className="legend-container">
							<div className="legend-section">
								<div className="avaliable-box"></div>
								<p className="legend-text">Available {memoryData}%</p>
							</div>
							<div className="legend-section">
								<div className="usage-box"></div>
								<p className="legend-text">Usage {result[1].toFixed(2)}%</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Metrics;
//   {
//   tooltips: {
//     enabled: false,
//   },
//   title: {
//     display: true,
//     text: "CPU",
//     fontSize: 23,
//   },
//   legend: { display: true, position: "bottom" },
//   responsive: false,
//   maintainAspectRatio: true,
//   plugins: {
//     labels: {
//       render: "percentage",
//       precision: 2,
//     },
//   },
// }
