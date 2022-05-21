import React from "react";
const DisplayTasks = (props) => {
  return (
    <table className="table table-striped">
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
          if (props.tasks !== []) {
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
          }
          else return (
            <p>No Current Tasks</p>
          )
        })}
      </tbody>
    </table>
  );
};

export default DisplayTasks;
