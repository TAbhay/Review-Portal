import React, { useEffect, useState } from 'react';
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import Project from '../Project/Project';
import './projects.css';
const Projects = () => {

  const auth = useSelector(state => state.auth)
  const token = useSelector(state => state.token)
  const users = useSelector(state => state.users)


  const { user, isAdmin } = auth
  const [projects, setProject] = useState([])
  const fetchProject = async () => {
    if (user)
      const response = await axioss
        .get('/api/project', {
          headers: { Authorization: token }
        })
    setProject([...projects, ...response.data])

  }
  useEffect(() => {
    fetchProject();
  }, [token]);
  const renderProjects = projects.map((project) => {
    return (
      <Project project={project} ></Project>
    );

  });
  return (

    <div className="project-container-lg">
      <h1 style={{ textAlign: "center" }}>Reviews</h1>
      {renderProjects}
    </div>

  );
}

export default Projects;