import React  from 'react';
import {Link } from 'react-router-dom';
import './Project.css';
const Project = (props) =>  {
    const project = props.project;
    
    const id   = project._id;
    const status = project.status;
    
    return (
      <div className="single_project_card single_project_container">
        <div className="card-item card-title project_heading">
          <h4>author</h4>
        </div>

        <div className="card_small_conatainer">
          <Link to={`/review/{${id}}`}>
            {" "}
            <div className="edit_icon">
              <i class="fas fa-edit"></i>
            </div>{" "}
          </Link>
          <p className="card_status_word">Review Status:</p>
          <div className="card-status">
            {status ? (
              <i class="fas fa-dot-circle" style={{ color: "green" }}></i>
            ) : (
              <i class="fas fa-dot-circle" style={{ color: "red" }}></i>
            )}
          </div>
        </div>
      </div>
    );
}
export default Project;