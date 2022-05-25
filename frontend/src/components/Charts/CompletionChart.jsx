import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
const CompletionChart = (props) => {
  const [completed, setCompleted] = useState([]);
  const [notDone, setNotDone] = useState([]);
  const options = {
    title: `${props.projectTitle} Completion`,
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

  useEffect(() => {
    let taskCompleted = props.tasks.filter(
      (task) =>
        task.status === "Complete" && task.project.id === props.projectId
    );
    setCompleted(taskCompleted.length);
    let taskNotDone = props.tasks.filter(
      (task) =>
        task.status === "Incomplete" && task.project.id === props.projectId
    );
    setNotDone(taskNotDone.length);
  }, []);
  function handleData() {
    const data = [
      ["Tasks", "How Many Completed"],
      ["Task Not Done", notDone],
      ["Task Completed", completed],
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
      />
    </div>
  );
};

export default CompletionChart;
