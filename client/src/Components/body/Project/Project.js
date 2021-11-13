import React  from 'react';
import {Link } from 'react-router-dom';
import './Project.css';
const Project = (props) =>  {
    const project = props.project;
    const id   = project._id;
    const status = project.status;
    return (
      <div  className="singleProject">
        <div className="single_card_item">
          <h4 >{project.project.name}
          </h4>
        </div>
        <div className="single_card_item card_icons">
           <div className="edit_icon">
             <Link to={`/review/${id}`}>
              <i className="fas fa-edit"></i>
              </Link>
            </div>
          <div className="card-status">
            {status ? (
              <i className="fas fa-dot-circle" style={{ color: "green" }}></i>
            ) : (
              <i className="fas fa-dot-circle" style={{ color: "red" }}></i>
            )}
          </div>
        </div>
      </div>
    );
}
export default Project;