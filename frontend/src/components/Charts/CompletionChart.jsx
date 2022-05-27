import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
const CompletionChart = (props) => {
  const [completed, setCompleted] = useState([]);
  const [notDone, setNotDone] = useState([]);
  const options = {
    title: `${props.projectTitle} Completion`,
    backgroundColor: "transparent",
    titleTextStyle: {
      color: "#6187C2",
    },
    legend: "none",
    is3D: true,
    slices: {
      0: { color: "darkgreen" },
      1: { color: "darkred" },
    },
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
    if (completed !== [] || notDone !== []) {
      const data = [
        ["Tasks", "How Many Completed"],
        ["Task Completed", completed],
        ["Task Not Done", notDone],
      ];
      return data;
    }
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
