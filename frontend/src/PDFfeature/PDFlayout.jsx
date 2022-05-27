import React from "react";
import CompletionChart from "../components/Charts/CompletionChart";
import DisplayProjects from "../components/DisplayProjects/DisplayProjects";
import "./PDF.css";
class PDFlayout extends React.Component {
  render() {
    return (
      <div className="PDF">
        <div>
          <h2 style={{ color: "#6187C2", fontFamily: "inherit" }}>
            PROJECT COMPLETION STATUS
          </h2>
          <div className="chart-grid-container">
            {this.props.projects.map((project) => {
              return (
                <div>
                  <CompletionChart
                    projectId={project.id}
                    projectTitle={project.title}
                    tasks={this.props.tasks}
                  />
                </div>
              );
            })}
          </div>
            <div>
              <DisplayProjects projects={this.props.projects} />
            </div>
        </div>
      </div>
    );
  }
}

export default PDFlayout;
