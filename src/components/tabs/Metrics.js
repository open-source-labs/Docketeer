import React from "react";
import { useSelector } from "react-redux";
import * as actions from "../../actions/actions";
import { convertToMetricsArr } from "../helper/parseContainerFormat";
import { Pie, Doughnut, Bar } from "react-chartjs-2";

const Metrics = (props) => {
  const runningList = useSelector((state) => state.lists.runningList);
  let result = convertToMetricsArr(runningList);
  let differnce = 100 - result[0];
  let differnce2 = 100 - result[1];
  let differnce3 = result[2][0];
  let differnce4 = result[3][0];
  const cpu = {
    labels: ["Free", "Usage"],
    datasets: [
      {
        label: "CPU",
        backgroundColor: ["#B21F00", "#C9DE00"],
        hoverBackgroundColor: ["#501800", "#4B5000"],
        data: [result[0], differnce],
      },
    ],
  };

  const memory = {
    labels: ["Free", "Usuage"],
    datasets: [
      {
        label: "Memory",
        backgroundColor: ["#B21F00", "#C9DE00"],
        hoverBackgroundColor: ["#501800", "#4B5000"],
        data: [result[1], differnce2],
      },
    ],
  };

  const netIO = {
    labels: ["Bytes"],
    datasets: [
      {
        label: "Net I/O",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1",
        borderWidth: 2,
        data: [differnce3],
      },
    ],
  };

  const blockIO = {
    labels: ["Bytes"],
    datasets: [
      {
        label: "Block IO",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1",
        borderWidth: 2,
        data: [differnce4],
      },
    ],
  };

  return (
    <div className="renderContainers">
      <div className="header">
        <h1>Metrics</h1>
      </div>
      <div className="allCharts">
        <div className="section">
          <div className="dougnutChart">
            <Doughnut
              data={cpu}
              options={{
                title: {
                  display: true,
                  text: "CPU",
                  fontSize: 23,
                },
                legend: { display: true, position: "right" },
                // responsive: true,
                // maintainAspectRatio: false,
              }}
            />
          </div>

          <div className="dougnutChart">
            <Doughnut
              data={memory}
              options={{
                title: { display: true, text: "MEMORY", fontSize: 23 },
                legend: { display: true, position: "right" },
                plugins: {
                  datalabels: {
                    formatter: (value, ctx) => {
                      let datasets = ctx.chart.data.datasets;

                      if (
                        datasets.indexOf(ctx.dataset) ===
                        datasets.length - 1
                      ) {
                        let sum = datasets[0].data.reduce((a, b) => a + b, 0);
                        let percentage = Math.round((value / sum) * 100) + "%";
                        return percentage;
                      } else {
                        return percentage;
                      }
                    },
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="section">
          <div className="chart-container">
            <h1 className="chart-title">NET IO:</h1>
            <p>
              {result[2][0]}kB / {result[2][1]}B
            </p>
          </div>
          <div className="chart-container">
            <h1 className="chart-title">BLOCK IO:</h1>
            <p>
              {result[3][0]}B / {result[3][1]}B
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
