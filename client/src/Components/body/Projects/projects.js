import React , {useEffect , useState} from 'react';
import axios from "axios"
import {useSelector, useDispatch} from "react-redux"
import Project from '../Project/Project';
//import './Projects.css';
const Projects = () => {

  const auth =useSelector(state =>state.auth)
  const token= useSelector(state =>state.token)
  const users = useSelector(state => state.users)


    const {user, isAdmin} = auth
     const [projects,setProject] = useState([])
    
    const fetchProject  = async () =>{
        
             const response = await axios
                    .get('/api/review',{
                       headers:{Authorization:token}
                    })
              .catch((err) =>{
                   console.log(err)
                })
                console.log("here getting some hoo")
                console.log(response.data)
              setProject([projects,...response.data])
          
    }
    useEffect(() =>{
      fetchProject();
      console.log("prpje",projects)
    },[]);
    const renderProjects = projects.map((project)=>{  
    return(
        <Project project = {project} ></Project>
    );

   });
    return(
       
          <div className="project-container">
            {renderProjects}
          </div>

    );
}

export default Projects;