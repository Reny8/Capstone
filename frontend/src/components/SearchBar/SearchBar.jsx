import './SearchBar.css';
import React, { useEffect, useState } from 'react';
const SearchBar = (props) => {
  const [search, setSearch] = useState('');

  useEffect(()=>{
    if (search === '') {
      props.getAllTasks();
    }
  },[search])
  function handleClick() {
    let response = props.tasks.filter((task) => {
      if (task.status.toLowerCase() === search.toLowerCase()) {
        return true;
      } else if (
        task.description.toLowerCase().includes(search.toLowerCase())
      ) {
        return true;
      } else if (
        task.assigned.first_name.toLowerCase() +
          ' ' +
          task.assigned.last_name.toLowerCase() ===
        search.toLowerCase()
      ) {
        return true;
      } else if (
        task.project.title.toLowerCase().includes(search.toLowerCase())
      ) {
        return true;
      }
      return response;
    });
    props.setTasks(response);
  }
    return (
      <div className='search-bar'>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search Tasks...'
        />
        <button onClick={() => handleClick()} className='button'>
          SEARCH
        </button>
      </div>
    );
  }

export default SearchBar;
