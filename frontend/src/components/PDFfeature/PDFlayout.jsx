import React from "react";
import CompletionChart from "../Charts/CompletionChart";
import "./PDF.css";
import PrintDisplay from "./PrintDisplay";
class PDFlayout extends React.Component {
  render() {
    return (
      <div className="PDF">
          <h2 style={{ color: "#6187C2", fontFamily: "inherit" }}>
            PROJECT COMPLETION STATUS
          </h2>
          <div className="chart-grid-container">
            {this.props.projects.map((project) => {
              return (
                <div key={project.id.toString()}>
                  <CompletionChart
                    projectId={project.id}
                    projectTitle={project.title}
                    tasks={this.props.tasks}
                  />
                </div>
              );
            })}
            </div>
            <PrintDisplay projects={this.props.projects}/>
        </div>
    );
  }
}

export default PDFlayout;
