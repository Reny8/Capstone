import React from 'react';
import './DisplayProjects.css';
import axios from 'axios';
const DisplayProjects = (props) => {
  async function handleDelete(id) {
    try {
      let answer = prompt(
        'Are you sure you would like to delete the selected project\nEnter y for yes or n for no'
      ).toLowerCase();
      if (answer === 'y') {
        await axios.delete(`http://127.0.0.1:8000/api/projects/${id}/`, {
          headers: {
            Authorization: 'Bearer ' + props.token,
          },
        });
        props.getAllProjects();
        window.location.reload()
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  function handleUpdate(object) {
    let update = {
      title: object.title,
      due_date: object.due_date,
      owner_id: props.user.id,
    };
    try {
      let updateRequest = prompt(
        `You have selected ${object.title}.\nWhat would you like to change?\nEnter title or date`
      ).toLowerCase();
      let change = prompt('Enter the new value');
      if (updateRequest === 'title') {
        update.title = change;
      } else if (updateRequest === 'date') {
        update.due_date = change;
      }
      updateProject(object.id, update);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function updateProject(id, object) {
    await axios.put(`http://127.0.0.1:8000/api/projects/${id}/`, object, {
      headers: {
        Authorization: 'Bearer ' + props.token,
      },
    });
    props.getAllProjects();
  }

  if (props.projects && props.projects.length > 0) {
    return (
      <div className='project-display'>
        <table className='table'>
          <thead>
            <tr>
              <th>Due Date</th>
              <th>Project Title</th>
              {props.user.role === 'Project Manager' ? (
                <>
                  <th></th>
                  <th></th>
                </>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {props.projects.map((project) => {
              return (
                <tr key={project.id}>
                  <td>{project.due_date}</td>
                  <td>{project.title}</td>
                  {props.user.role === 'Project Manager' ? (
                    <>
                      {' '}
                      <td style={{ width: 0 }}>
                        <button
                          onClick={() => handleUpdate(project)}
                          className='button'
                        >
                          UPDATE
                        </button>
                      </td>
                      <td style={{ width: 0 }}>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className='button'
                        >
                          DELETE
                        </button>
                      </td>
                    </>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } else
    return (
      <div className='projects-container'>
        <div className='border-box'>
          <h1>NO CURRENT PROJECTS</h1>
        </div>
      </div>
    );
};

export default DisplayProjects;
