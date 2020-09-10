import React from "react";
import { useSelector } from "react-redux";
import * as actions from "../../actions/actions";
import { convertToMetricsArr } from "../helper/parseContainerFormat";
import { Pie, Doughnut, Bar } from "react-chartjs-2";

const Metrics = (props) => {
  const runningList = useSelector((state) => state.lists.runningList);
  console.log("runningList", runningList);
  let result = convertToMetricsArr(runningList);
  let differnce = 100 - result[0];
  let differnce2 = 100 - result[1];
  // let differnce3 = result[2][0];
  // let differnce4 = result[3][0];
  const cpu = {
    labels: ["Available", "Usage"],
    datasets: [
      {
        label: "CPU",
        backgroundColor: ["#C9DE00", "#B21F00"],
        hoverBackgroundColor: ["#4B5000", "#501800"],
        data: [differnce, result[0]],
      },
    ],
  };

  const memory = {
    labels: ["Available", "Usuage"],
    datasets: [
      {
        label: "Memory",
        backgroundColor: ["#C9DE00", "#B21F00"],
        hoverBackgroundColor: ["#4B5000", "#501800"],
        data: [differnce2, result[1]],
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
                responsive: true,
                maintainAspectRatio: false,  
              }}
            />
          </div>

          <div className="dougnutChart">
            <Doughnut
              data={memory}
              options={{
                responsive: true,
                maintainAspectRatio: false, 
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
