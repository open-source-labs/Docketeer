import React from "react";
import { useSelector } from "react-redux";
import * as actions from "../../actions/actions";
import { convertToMetricsArr } from "../helper/parseContainerFormat";
import { Pie, Doughnut, Bar } from "react-chartjs-2";
import { plugins } from "chart.js";
import { render } from "react-dom";
import "../../css/metric.css";

const Metrics = (props) => {
  //const runningList = useSelector((state) => state.lists.runningList);
  let result = convertToMetricsArr(props.runningList);
  let cpuData = (100 - result[0]).toFixed(2);
  let memoryData = (100 - result[1]).toFixed(2);
  // let differnce3 = result[2][0];
  // let differnce4 = result[3][0];
  const cpu = {
    labels: [`Available: ${cpuData}%`, `Usage: ${result[0].toFixed(2)}%`],
    datasets: [
      {
        label: "CPU",
        backgroundColor: ["rgba(44, 130, 201, 1)", "rgba(19, 221, 29, 1)"],
        // hoverBackgroundColor: ["#4B5000", "#501800"],
        data: [cpuData, result[0]],
      },
    ],
  };

	const memory = {
		labels: [`Available: ${memoryData}%`, `Usage: ${result[1].toFixed(2)}%`],
		datasets: [
			{
				label: "Memory",
				backgroundColor: ["rgba(44, 130, 201, 1)", "rgba(19, 221, 29, 1)"],
				// hoverBackgroundColor: ["#4B5000", "#501800"],
				data: [memoryData, result[1]],
			},
		],
	};

	let options = {
		tooltips: {
			enabled: false,
		},
		title: {
			display: true,
			text: "MEMORY",
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

	return (
		<div className="renderContainers">
			<div className="header">
				<span className="tabTitle">Metrics</span>
			</div>
			<div className="allCharts">
				<div className="section">
					<div className="pieChart">
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
					</div>

					<div className="pieChart">
						<Pie data={memory} options={options} width={2000} height={1300} />
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
				<div className="section">
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
