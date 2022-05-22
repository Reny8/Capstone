import "./LogForm.css";
import React, { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const LogForm = (props) => {
  const [user, token] = useAuth();
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");
  const [taskId, setTaskId] = useState("");
  const [projectId, setProjectId] = useState("");
  const [assignedId, setAssignedId] = useState("");
  const [status, setStatus] = useState("");

  function createLog(event) {
    event.preventDefault();
    let newLog = {
      log_date: date,
      comment: comment,
      assigned_id: parseInt(assignedId),
      project_id: parseInt(projectId),
      task_id: parseInt(taskId),
      status: status,
    };
    addLog(newLog);
    console.log(newLog);
    if (status === "Completed") {
      let newStatus = {
        status: status
      };
      addStatus(newStatus, parseInt(taskId));
    }
  }
  async function addStatus(update, id) {
    try {
      await axios.put(`http://127.0.0.1:8000/api/tasks/status/${id}/`, update, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  async function addLog(createdLog) {
    try {
      await axios.post("http://127.0.0.1:8000/api/logs/", createdLog, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      props.getAllLogs();
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div>
      <form onSubmit={createLog} className="logs-container">
        <div className="border-box">
          <h2>Fill Out Log</h2>
          <div className="grid-box">
            <label>
              DATE:
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
          </div>
          <div className="grid-box">
            <label>
              PROJECT RELATED:
              <select onChange={(e) => setProjectId(e.target.value)}>
                <option value="default">Choose Here</option>
                {props.projects.map((project, index) => {
                  return (
                    <option key={index * 2} value={project.id}>
                      {project.title}
                    </option>
                  );
                })}
              </select>{" "}
            </label>
          </div>
          <div className="grid-box">
            <label>
              RELATED TASK:
              <select onChange={(e) => setTaskId(e.target.value)}>
                <option value="default">Choose Here</option>
                {props.tasks.map((task, index) => {
                  return (
                    <option key={index * 3} value={task.id}>
                      {task.description}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>
          <div className="grid-box">
            <label>
              ASSIGNED:
              <select onChange={(e) => setAssignedId(e.target.value)}>
                <option value="default">Choose Here</option>
                {props.logs.map((log) => {
                  return (
                    <option key={log.id} value={log.assigned.id}>
                      {log.assigned.first_name} {log.assigned.last_name}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>
          <div className="grid-box">
            <label>
              COMMENT:
              <input
                type="message"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </label>
          </div>
          <div className="grid-box">
            <label>
              STATUS:
              <select onChange={(e) => setStatus(e.target.value)}>
                <option value="default">Choose Here</option>
                <option value="Incomplete">Incomplete</option>
                <option value="Completed">Completed</option>
              </select>
            </label>
          </div>
          <div className="grid-box">
            <button className="button">SUBMIT</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LogForm;
