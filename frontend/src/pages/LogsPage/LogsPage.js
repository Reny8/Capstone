import React from "react";
import "./LogsPage.css";
import useAuth from "../../hooks/useAuth";
import DisplayLogs from "../../components/DisplayLogs/DisplayLogs";
import LogForm from "../../components/LogForm/LogForm";
const LogsPage = (props) => {
  const [user, token] = useAuth();
  
  if (user.role === "Software Developer") {
    return (
      <div className="box">
        <h2>Logs</h2>
        <DisplayLogs user={user} logs={props.logs} />
        <div>
          <LogForm
          getAllTasks = {props.getAllTasks}
            tasks={props.tasks}
            projects={props.projects}
            getAllLogs={props.getAllLogs}
            logs={props.logs}
          />
        </div>
      </div>
    );
  } else if (user.role === "Project Manager") {
    return (
      <div className="box">
        <h2>Logs</h2>
        <div className="project-manager-table">
        <DisplayLogs user={user} logs={props.logs} /></div>
      </div>
    );
  }
};

export default LogsPage;
