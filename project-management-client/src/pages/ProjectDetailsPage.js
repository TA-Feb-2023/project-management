
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AddTask from "../components/AddTask";
import TaskCard from "../components/TaskCard";


function ProjectDetailsPage (props) {
  const [project, setProject] = useState(null);
  const { projectId } = useParams();
  const API_URL = "http://localhost:5005"

  const storedToken = localStorage.getItem("authToken");

  // Helper function that makes a GET request to the API
  // and retrieves the project by id
  const getProject = () => {
    axios
      .get(`${API_URL}/api/projects/${projectId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        const oneProject = response.data;
        setProject(oneProject);
      })
      .catch((error) => console.log(error));
  };
  
  
  useEffect(()=> { 
    getProject();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );

  
  return (
    <div className="ProjectDetails">
      {project && (
        <>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </>
      )}
      <AddTask refreshProject={getProject} projectId={projectId} /> 

      { project && project.tasks.map((task) => (
        <TaskCard key={task._id} {...task} /> 
      ))} 

      <Link to="/projects">
        <button>Back to projects</button>
      </Link>
      <Link to={`/projects/edit/${projectId}`}>
        <button>Edit Project</button>
      </Link>
    </div>
  );
}

export default ProjectDetailsPage;
