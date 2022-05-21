import React, { useState, useEffect } from "react";
import "./LogsPage.css";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import DisplayLogs from "../../components/DisplayLogs/DisplayLogs";
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
  }
  return (
    <div>
      <DisplayLogs logs={logs} />
    </div>
  );
};

export default LogsPage;
