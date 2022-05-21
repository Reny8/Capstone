import React from "react";
const DisplayLogs = (props) => {
  return (
      <div>
          <table className="table">
        <thead>
            <tr>
                <th>Log Date</th>
                <th>Project Related</th>
                <th>Related Task</th>
                <th>Comment</th>
                <th>Submited By</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {props.logs.map((log)=>{
                return (
                    <tr key={log.id}>
                        <td>{log.log_date}</td>
                        <td>{log.project.title}</td>
                        <td>{log.task.description}</td>
                        <td>{log.comment}</td>
                        <td>{log.assigned.first_name} {log.assigned.last_name}</td>
                        <td>{log.task.status}</td>
                    </tr>
                )
            })}
        </tbody>
          </table>
      </div>
  )
};

export default DisplayLogs;
