import React, { useState } from "react";
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
//   const [projectIdAndTitle, setProjectsIdAndTitle] = useState([]);
  function handleData() {
    // let projectIdsAndTitles = props.projects.map((project) => {
    //   return {
    //     id: project.id,
    //     title: project.title,
    //   };
    // });
    // console.log(projectIds);
    const data = [
      ["Tasks", "How Many Completed"],
      ["Task Not Done", 11],
      ["Task Completed", 2],
    ];
    return data;
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
