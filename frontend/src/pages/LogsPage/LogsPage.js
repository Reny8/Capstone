import React, { useState, useEffect } from "react";
import "./LogsPage.css";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import DisplayLogs from "../../components/DisplayLogs/DisplayLogs";
import LogForm from "../../components/LogForm/LogForm";
const LogsPage = (props) => {
  const [user, token] = useAuth();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    getAllLogs();
  }, [token]);

  async function getAllLogs() {
    let response = await axios.get("http://127.0.0.1:8000/api/logs/", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setLogs(response.data);
    console.log(user);
  }
  return (
    <div className="box">
      <h2>Logs</h2>
      <DisplayLogs user={user} logs={logs} />
      <div>
        {logs.map((log) => {
          if (log.assigned.id === user.id) {
            return (
              <LogForm
                tasks={props.tasks}
                projects={props.projects}
                getAllLogs={getAllLogs}
                logs={logs}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default LogsPage;
