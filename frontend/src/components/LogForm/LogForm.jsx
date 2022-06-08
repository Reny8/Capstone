import "./LogForm.css";
import React, { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const LogForm = (props) => {
  const [user, token] = useAuth();
  const [comment, setComment] = useState("");
  const [taskId, setTaskId] = useState("");
  const [projectId, setProjectId] = useState("");
  const [status, setStatus] = useState("");
  const assignedId = user.id;

  function createLog(event) {
    event.preventDefault();
    let newLog = {
      log_date: new Date().toLocaleDateString(),
      comment: comment,
      assigned_id: parseInt(assignedId),
      project_id: projectId,
      task_id: taskId,
      status: status,
    };
    addLog(newLog);
    if (status === "Complete") {
      let newStatus = {
        status: status,
      };
      addStatus(newStatus, parseInt(taskId));
      setProjectId("");
      setTaskId("");
      setComment("");
      setStatus("");
    }
  }
  async function addStatus(update, id) {
    try {
      await axios.put(`http://127.0.0.1:8000/api/tasks/status/${id}/`, update, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      props.getAllTasks();
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
              PROJECT RELATED:
              <select onClick={(e) => setProjectId(parseInt(e.target.value))}>
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
              <select onChange={(e) => setTaskId(parseInt(e.target.value))}>
                <option value="default">Choose Here</option>
                {props.tasks
                  .filter((task) => task.project.id === projectId)
                  .map((task, index) => {
                    if (task.status === "Incomplete") {
                      return (
                        <option key={index * 3} value={task.id}>
                          {task.description}
                        </option>
                      );
                    }
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
                <option value="Complete">Completed</option>
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
