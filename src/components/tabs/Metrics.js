/* eslint-disable no-tabs */
/* eslint-disable react/prop-types */
import React from 'react'
import { convertToMetricsArr } from '../helper/parseContainerFormat'
import { Chart } from 'react-chartjs-2'
import LineChartDisplay from '../display/LineChartDisplay'
import { useSelector } from 'react-redux'

/**
 * Display general metrics
 *
 * @param {*} props
 */
const Metrics = (props) => {
  const hostStats = useSelector((state) => state.containersList.hostStats)

  const fullRunningList = props.runningList
  // const result = convertToMetricsArr(props.runningList)
  const result = hostStats
  const cpuData = 100 - result.cpuPerc //.toFixed(2) // 60%
  const memoryData = 100 - result.memPerc //.toFixed(2)
  const cpuThreshold = props.threshold[0]
  const memThreshold = props.threshold[1]

  let cpuFails = 0
  let memFails = 0

  // used to monitor threshold and fail counts
  for (const each of fullRunningList) {
    const cpu = parseFloat(each['CPUPerc'].replace(/([%])+/g, ''))
    const memory = parseFloat(each['MemPerc'].replace(/([%])+/g, ''))
    if (cpu >= cpuThreshold) cpuFails++
    if (memory >= memThreshold) memFails++
  }

  const cpu = {
    labels: [`Available: ${cpuData}%`, `Usage: ${result.cpuPerc}%`],
    datasets: [
      {
        label: 'CPU',
        backgroundColor: ['rgba(44, 130, 201, 1)', 'rgba(19, 221, 29, 1)'],
        data: [cpuData, result.cpuPerc],
      },
    ],
  }

  const memory = {
    labels: [`Available: ${memoryData}%`, `Usage: ${result.memPerc}%`],
    datasets: [
      {
        label: 'Memory',
        backgroundColor: ['rgba(44, 130, 201, 1)', 'rgba(19, 221, 29, 1)'],
        data: [memoryData, result.memPerc],
      },
    ],
  }

  const memOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: { display: true, text: 'MEMORY', font: { size: 20 } },
      tooltips: { enabled: true, mode: 'index' },
      legend: { display: false },
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0
          const dataArr = ctx.chart.data.datasets[0].data
          dataArr.map((data) => {
            sum += data
          })
          const percentage = (value * 100) / sum + '%'
          return percentage
        },
        color: '#fff',
      },
    },
  }

  const cpuOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: { display: true, text: 'CPU', font: { size: 20 } },
      tooltips: { enabled: false },
      legend: { display: false },
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0
          const dataArr = ctx.chart.data.datasets[0].data
          dataArr.map((data) => {
            sum += data
          })
          const percentage = (value * 100) / sum + '%'
          return percentage
        },
        color: '#fff',
      },
    },
  }

  return (
    <div className="renderContainers">
      <div className="header">
        <h1 className="tabTitle">Metrics</h1>
      </div>
      <div className="metric-section-title">
        <h3>Host Metrics</h3>
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
              <p className="legend-text">Available {Math.round(cpuData)}%</p>
            </div>
            <div className="legend-section">
              <div className="usage-box"></div>
              <p className="legend-text">Usage {Math.round(result.cpuPerc)}%</p>
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
              <p className="legend-text">Available {Math.round(memoryData)}%</p>
            </div>
            <div className="legend-section">
              <div className="usage-box"></div>
              <p className="legend-text">Usage {Math.round(result.memPerc)}%</p>
            </div>
          </div>
        </div>

        <div className="">
          {/* <div className="chart-container">
            <h1 className="chart-title">NET IO:</h1>
            <p className="chart-number">
              {Math.floor(result[2][0])}kB / {Math.floor(result[2][1])}kB
            </p>
          </div>
          <div className="chart-container">
            <h1 className="chart-title">BLOCK IO:</h1>
            <p className="chart-number">
              {Math.floor(result[3][0])}B / {Math.floor(result[3][1])}B
            </p>
          </div> */}
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
  )
}

export default Metrics
