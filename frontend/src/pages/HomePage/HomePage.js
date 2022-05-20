import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import DisplayProjects from "../../components/DisplayProjects/DisplayProjects";

const HomePage = (props) => {
  const [user, token] = useAuth();
  const [projects, setProjects] = useState([]);

  async function getAllProjects() {
    try {
      let response = await axios.get("http://127.0.0.1:8000/api/projects/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setProjects(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    getAllProjects();
  }, [token]);

  return (
    <div className="container">
      <h1> Welcome {user.username}!</h1>
      <DisplayProjects projects = {projects}/>
    </div>
  );
};

export default HomePage;
