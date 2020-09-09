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
    <div className="allCharts">
      <div className="section">
        <div className="chart-container2">
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

        <div className="chart-container2">
          <Doughnut
            data={memory}
            options={{
              title: { display: true, text: "MEMORY", fontSize: 23 },
              legend: { display: true, position: "right" },
            }}
          />
        </div>
      </div>
      <div className="section">
        <div className="chart-container">
          <Bar
            data={netIO}
            options={{
              title: { display: true, text: "Network I/O", fontSize: 23 },
              legend: { display: true, position: "right" },
            }}
          />
        </div>

        <div className="chart-container">
          <Bar
            data={blockIO}
            options={{
              title: { display: true, text: "Block I/O", fontSize: 23 },
              legend: { display: true, position: "right" },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Metrics;
