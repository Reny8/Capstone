import React from "react";
import { Chart } from "react-google-charts";
const TaskChart = (props) => {
  const date = new Date().toLocaleDateString();
  let options = {
    title: "TASK MONITORING PER DAY",
    backgroundColor: "transparent",
    titleTextStyle: {
      color: "white",
    },
    legend: {
      textStyle: {
        color: "white",
      },
    },
    vAxis: {
      textStyle: {
        color: "white",
      },
    },
    hAxis: {
      textStyle: {
        color: "white",
      },
    },
  };
  function chartTaskData() {
    let logCompleted = props.logs.filter((log) => {
      if (log.status === "Complete" && log.log_date === date) {
        return true;
      }
      return logCompleted;
    });
    let data = [
      ["Date", "Tasks Completed"],
      [date, logCompleted.length],
    ];
    return data;
  }

  return (
    <div>
      <Chart
        chartType="ColumnChart"
        data={chartTaskData()}
        width="99%"
        options={options}
        legendToggle
      />
    </div>
  );
};

export default TaskChart;
