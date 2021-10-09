import React  from 'react';
import {Link } from 'react-router-dom';
import './Project.css';
const Project = (props) =>  {
    const project = props.project;
    
    const id   = project._id;
    const status = project.status;
    
    return(
   
       <div className ="card">
         <div className="card-item card-title">
           <h2></h2>
         </div>
         <div className="card-item card-body">
           <div className="card-body-item card-author"><h4>author</h4></div>
           <Link to={`/review/{${id}}`}> <div className="card-body-item card-edit"><i class="fas fa-edit"></i></div> </Link>
           <div className="card-body-item card-status">
             {
               status?(<i class="fas fa-dot-circle" style={{color:"green"}}></i>):(<i class="fas fa-dot-circle" style={{color:"red"}}></i>)
             }
           </div>

         </div>
       </div>
    
);
}

export default Project;