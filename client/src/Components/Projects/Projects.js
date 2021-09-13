import React from "react";
import "./Projects.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Project from "../Project/Project";

function Projects(props) {
  var url = "/projects/";
  return (
    <div>
      {props.all_project.map((person) => {
        return (
          <>
            <Link to="/projects/project">
              <div className="container">
                <div className="project_small_container">
                  {/* <Project data={person} /> */}
                  <h1 className="project_heading">{person.name}</h1>
                  <i class="far fa-edit edit_icon"></i>
                </div>
                <p className="project_discription">{person.discription}</p>
              </div>
              {/* {url}+{person.name} */}
              {/* <Route exact path=`/projects/${person.name}`, component={person}>
              <Project data = {person}/>
            </Route> */}
            </Link>
          </>
        );
      })}
    </div>
  );
}

export default Projects;
