import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const HomePage = (props) => {
  const [user, token] = useAuth();
  const [project, setProjects] = useState([]);

  async function getAllProjects() {
    let response = await axios.get("http://127.0.0.1:8000/api/projects/", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log(response.data);
  }
  useEffect(() => {
    getAllProjects();
  }, [token]);

  return (
    <div className="container">
      <h1> Welcome {user.username}!</h1>
    </div>
  );
};

export default HomePage;
