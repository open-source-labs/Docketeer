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

  const cpu = {
    labels: [`Available: ${cpuData}%`, `Usage: ${result[0].toFixed(2)}%`],
    datasets: [
      {
        label: "CPU",
        backgroundColor: ["rgba(44, 130, 201, 1)", "rgba(19, 221, 29, 1)"],
        data: [cpuData, result[0]],
      },
    ],
	};


	// el.target.value
	const getData = (containerName) => {
		console.log('ContainerName: ', containerName)
		let data = [];
		if (containerName === 'Container-a') {
			data = [10, 80, 30, 40]
		} else if (containerName === 'Container-b') {
			data = [110, 180, 130, 140];
		}
		return data;
	} 

	const memory = {
		labels: [`Available: ${memoryData}%`, `Usage: ${result[1].toFixed(2)}%`, 3, 4],
		datasets: [
			{
				label: 'Memory1',
				 data: [10, 80, 30, 40],
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

	useEffect(() => {
		getData(activeContainer);
	})

	return (
		<div className="renderContainers">
			<div className="header">
				<span className="tabTitle">Metrics</span>
			</div>
			<div style={{marginTop: "150px"}}> 
				<label htmlFor="containerSelector">Choose a container:</label>
				<select name="containerSelector" id="containerSelector" onChange={(e) => setActiveContainer(e.target.value)}>
					<option value="Container-a">Container A</option>
					<option value="Container-b">Container B</option>
				</select>
			</div>


			<div className="allCharts">
				<div className="section">


					{/* <div className="pieChart">
						<Pie data={cpu} options={options2} width={2000} height={1300} />
						<div className="legend-container">
							<div className="legend-section">
								<div className="avaliable-box"></div>
								<p className="legend-text">Available {cpuData}%</p>
							</div>
							<div className="legend-section">
								<div className="usage-box"></div>
								<p className="legend-text">Usage {result[0].toFixed(2)}%</p>
							</div>
						</div>
					</div> */}

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
				{/* <div className="section">
					<div className="chart-container">
						<h1 className="chart-title">NET IO:</h1>
						<p className="chart-number">
							{result[2][0]}kB / {result[2][1]}kB
            </p>
					</div>
					<div className="chart-container">
						<h1 className="chart-title">BLOCK IO:</h1>
						<p className="chart-number">
							{result[3][0]}B / {result[3][1]}B
            </p>
					</div>
				</div> */}
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
