import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./project.css";
const Project = () => {
  const projects = useSelector((state) => state.projectReducer.projects);
  
  const renderProjects = projects?.map((item) => {
    const projectName = item.name;
    const id = item._id;
    const status = item.is_deadline;
    return (
      <div className="singleProject">
        <div className="single_card_istem">
           <h4>{projectName}</h4>
        </div>
        <div className="single_card_item card_icons">
          <div className="edit_icon">
            <Link to={`/project/${id}`}>
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
  });

  return <>
  {renderProjects}
  </>;
};
export default Project;
