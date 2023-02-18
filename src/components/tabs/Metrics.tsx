/* eslint-disable no-tabs */
/* eslint-disable react/prop-types */
import React from "react";
import { Chart } from "react-chartjs-2";
import LineChartDisplay from "../display/LineChartDisplay";
import { useAppSelector } from "../../redux/reducers/hooks";

/**
 * Display general metrics
 */
const Metrics = () => {
  const fullRunningList = useAppSelector(
    (state) => state.containers.runningList
  );

  const { mem_threshold, cpu_threshold } = useAppSelector(
    (state) => state.sessions
  );

  const threshold = [mem_threshold, cpu_threshold];

  const hostStats = useAppSelector((state) => state.containers.hostStats);
  const cpuData = 100 - hostStats.cpuPerc;
  const memoryData = 100 - hostStats.memPerc;
  const cpuThreshold = parseFloat(threshold[1]);
  const memThreshold = parseFloat(threshold[0]);

  let cpuFails = 0;
  let memFails = 0;

  // Used to monitor threshold & fail counts
  for (const each of fullRunningList) {
    const cpu = parseFloat(each["CPUPerc"].replace(/([%])+/g, ""));
    const memory = parseFloat(each["MemPerc"].replace(/([%])+/g, ""));
    if (cpu >= cpuThreshold) cpuFails++;
    if (memory >= memThreshold) memFails++;
  }

  const cpu = {
    labels: [`Available: ${cpuData}%`, `Usage: ${hostStats.cpuPerc}%`],
    datasets: [
      {
        label: "CPU",
        backgroundColor: ["#4594ce", "#67f267"],
        data: [cpuData, hostStats.cpuPerc],
      },
    ],
  };

  const memory = {
    labels: [`Available: ${memoryData}%`, `Usage: ${hostStats.memPerc}%`],
    datasets: [
      {
        label: "Memory",
        backgroundColor: ["#4594ce", "#67f267"],
        data: [memoryData, hostStats.memPerc],
      },
    ],
  };

  const memOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: { display: true, text: "MEMORY", font: { size: 20 } },
      tooltips: { enabled: true, mode: "index" },
      legend: { display: false },
      datalabels: {
        formatter: (value: number, ctx: any) => {
          let sum = 0;
          const dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map((data: any) => {
            sum += data;
          });
          const percentage = (value * 100) / sum + "%";
          return percentage;
        },
        color: "#fff",
      },
    },
  };

  const cpuOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: { display: true, text: "CPU", font: { size: 20 } },
      tooltips: { enabled: false },
      legend: { display: false },
      datalabels: {
        formatter: (value: number, ctx: any) => {
          let sum = 0;
          const dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map((data: any) => {
            sum += data;
          });
          const percentage = (value * 100) / sum + "%";
          return percentage;
        },
        color: "#fff",
      },
    },
  };

  return (
    <div className="renderContainers">
      <div className="header">
        <h1 className="tabTitle">Metrics</h1>
      </div>
      <div className="metric-section-title">
        <h3 className="container-heading">Host Metrics</h3>
      </div>
      <div className="aggregate-conatiner">
        <div className="pieChart">
          <Chart
            key="pie-cpu"
            type="pie"
            data={cpu}
            options={cpuOptions}
            width={2000}
            height={1300}
          />
          <div className="legend-container">
            <div className="legend-section">
              <div className="avaliable-box"></div>
              <p className="legend-text"> Available {Math.round(cpuData)}%</p>
            </div>
            <div className="legend-section">
              <div className="usage-box"></div>
              <p className="legend-text">
                {" "}
                Usage {Math.round(hostStats.cpuPerc)}%
              </p>
            </div>
          </div>
        </div>

        <div className="pieChart">
          <Chart
            key="pie-memory"
            type="pie"
            data={memory}
            options={memOptions}
            width={2000}
            height={1300}
          />
          <div className="legend-container">
            <div className="legend-section">
              <div className="avaliable-box"></div>
              <p className="legend-text">
                {" "}
                Available {Math.round(memoryData)}%
              </p>
            </div>
            <div className="legend-section">
              <div className="usage-box"></div>
              <p className="legend-text">
                {" "}
                Usage {Math.round(hostStats.memPerc)}%
              </p>
            </div>
          </div>
        </div>

        <div className="">
          <div className="chart-container">
            <h1 className="chart-title"># of Running Containers:</h1>
            <p className="chart-number">{fullRunningList.length}</p>
          </div>
          <div className="chart-container">
            <h1 className="chart-title">CPU Fail Counts:</h1>
            <h4 className="threshold">Threshold: {cpuThreshold}%</h4>
            <p className="chart-number">{cpuFails}</p>
          </div>
          <div className="chart-container">
            <h1 className="chart-title">Memory Fail Counts:</h1>
            <h4 className="threshold">Threshold: {memThreshold}%</h4>
            <p className="chart-number">{memFails}</p>
          </div>
        </div>
      </div>
      <LineChartDisplay />
      {/* <p>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://docs.docker.com/engine/reference/commandline/stats/#examples"
        >
          Click here
        </a>{' '}
        for more information on these metrics
      </p> */}
    </div>
  );
};

export default Metrics;
