import React from "react";
import { Chart } from "react-google-charts";

export const options = {
  title: "Project Completion",
  backgroundColor: "transparent",
  titleTextStyle: {
    color: "white",
  },
  legend: {
    textStyle: {
      color: "white",
    },
  },
  is3D: true,
};

const CompletionChart = (props) => {
    function handleData() {
        const data = [
            ["Tasks", "How Many Completed"],
            ["Task Not Done", 11],
            ["Task Completed", 2],
          ];
        return data
    }
  return (
    <div>
      <Chart
        chartType="PieChart"
        data={handleData()}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    </div>
  );
};

export default CompletionChart;
