import React from "react";
import axios from "axios";
const DisplayTasks = (props) => {
  function handleDeleteClick(id, task) {
    try {
         let finalAnswer = prompt(
      `You have selected:\nTask: ${task}\nAre you sure you would like to delete this task?`
    ).toLowerCase();
    if (finalAnswer === "yes") {
      deleteTask(id);
    }
    }
    catch (error) {
      console.log("Delete has been cancelled")
    }
  }

  function handleUpdateClick(task) {
    let currentTask = {
      due_date: task.due_date,
      assigned_id: task.assigned.id,
      description: task.description,
      status: task.status,
      project_id: task.project.id,
    };
    try {
     let answer = prompt(
      `You have selected:\nTask: ${currentTask.description}\nWhat would you like to edit?\nType date, project, assigned or description`
    ).toLowerCase();
    if (answer === null) {
      console.log("Update has been cancelled")
    }
    else if (answer === "date") {
      let newValue = prompt(`Enter the new ${answer} value`);
      currentTask.due_date = newValue;
    } else if (answer === "project") {
      let newValue = prompt(`Enter the new ${answer} value`);
      let newProject = props.projects.filter((project) => {
        if (project.title.toLowerCase() === newValue) {
          return true;
        }
      });
      if (newProject.length > 0) {
        let finalResult = newProject.map((project) => {
          return project.id;
        });
        currentTask.project_id = finalResult[0];
      } else {
        alert("No project in the system was found");
      }
    } else if (answer === "assigned") {
      let firstName = prompt("Enter their first name");
      let lastName = prompt("Enter their last name");
      let developersFound = props.developers.filter((developer) => {
        if (
          developer.first_name.toLowerCase() === firstName &&
          developer.last_name.toLowerCase() === lastName
        ) {
          return true;
        }
      });
      if (developersFound.length > 0) {
        let finalResult = developersFound.map((developer) => {
          return developer.id;
        });
        currentTask.assigned_id = finalResult[0];
        
      } else {
        alert("Invalid Entry\n${firstName} $lastName} is not in the system");
      }
    } else if (answer === "description") {
      let newValue = prompt(`Enter the new ${answer} value`);
      currentTask.description = newValue;
    }
    submitUpdate(task.id, currentTask); 
    }
    catch (error) {
      console.log("Update has been cancelled")
    }
  }

  async function submitUpdate(id, update) {
    try {
      await axios.put(`http://127.0.0.1:8000/api/tasks/${id}/`, update, {
        headers: {
          Authorization: "Bearer " + props.token,
        },
      });
      props.getAllTasks();
    } catch (error) {
      console.log(error.message);
    }
  }
  async function deleteTask(id) {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/tasks/${id}/`,
        {
          headers: {
            Authorization: "Bearer " + props.token,
          },
        }
      );
      props.getAllTasks();
      alert("Task have been successfully deleted!");
    } catch (error) {
      console.log(error.message);
    }
  }
  if (props.tasks.length > 0 && props.user.role === "Project Manager") {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Due Date</th>
              <th>Related Project</th>
              <th>Assigned</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {props.tasks.map((task) => {
              return (
                <tr key={task.id}>
                  <td>{task.due_date}</td>
                  <td>{task.project.title}</td>
                  <td>
                    {task.assigned.first_name} {task.assigned.last_name}
                  </td>
                  <td>{task.description}</td>
                  <td>{task.status}</td>
                  <td>
                    <button
                      onClick={() => handleUpdateClick(task)}
                      className="button"
                    >
                      UPDATE
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        handleDeleteClick(task.id, task.description)
                      }
                      className="button"
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } else if (
    props.tasks.length > 0 &&
    props.user.role === "Software Developer"
  ) {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Due Date</th>
            <th>Related Project</th>
            <th>Assigned</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {props.tasks.map((task) => {
            return (
              <tr key={task.id}>
                <td>{task.due_date}</td>
                <td>{task.project.title}</td>
                <td>
                  {task.assigned.first_name} {task.assigned.last_name}
                </td>
                <td>{task.description}</td>
                <td>{task.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  } else
    return (
      <div className="projects-container">
        <div className="border-box">
          <h2>NO CURRENT TASKS</h2>
        </div>
      </div>
    );
};

export default DisplayTasks;
