import "./SearchBar.css";
import React, { useState } from "react";
const SearchBar = (props) => {
  const [search, setSearch] = useState("");

  function handleClick() {
    let response = props.tasks.filter((task) => {
      if (task.status.toLowerCase().includes(search.toLowerCase())) {
        return true;
      } else if (
        task.description.toLowerCase().includes(search.toLowerCase())
      ) {
        return true;
      } else if (
        task.assigned.first_name.toLowerCase() +
          " " +
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
    setSearch("");
    if (search === "") {
      props.getAllTasks();
    }
  }
  return (
    <div className="search-bar">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="  Search Tasks..."
      />
      <button onClick={() => handleClick()} className="button">
        SEARCH
      </button>
    </div>
  );
};

export default SearchBar;
