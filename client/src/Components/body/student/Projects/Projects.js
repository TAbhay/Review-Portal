import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { Link } from 'react-router-dom';
import Project from '../Project/Project';
import './Projects.css';
import { fetchAllProjects, dispatchAllProjects } from '../../../../redux/actions/projectAction';
import { dispatchAddProject } from '../../../../redux/actions/projectAction';
import { ReactDialogBox } from 'react-js-dialog-box'
import 'react-js-dialog-box/dist/index.css'
import { useParams } from "react-router-dom";
import axios from "axios";
import {showErrMsg,showSuccessMsg} from "../../../utils/notifications/Notification";
import { isEmpty } from "../../../utils/validation/Validation";

const Projects = () => {
  const [project, setProject] = useState({name:"",description:""});
  const [dialog, setDialog] = useState(false);
  const [data, setData] = useState({ err: "", success: ""});
  const { err, success } = data;
  const token = useSelector(state => state.token)
  const dispatch = useDispatch();

  const fetchProjects = async () => {
    const res = await fetchAllProjects(token);
    dispatch(dispatchAllProjects(res));
  };

  useEffect(() => {
    fetchProjects();
  }, []);
  const closeBox = () => {
    setDialog(false)
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({...data, err: "", success: ""});
    if (isEmpty(project.name && project.description ) ) {
      return setData({ ...data, err: "Please Fill All the fields 1", success: "", });
    }
    try {
      var res = await axios.post( `/api/project/add`, {name: project.name, description: project.description},
        {
          headers: { Authorization: token },
        }
      );
      dispatch(dispatchAddProject(res))
      setData({ err: "", success: "Updated successfully" });
      closeBox()
    } catch (err) {
      err &&
        setData({err: "Error occurred", success: "" });
    }
  }
 
  return (

    <div className="project-container-lg">
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <h1 style={{ textAlign: "center" }}>Projects</h1>
        <button className="add_button" onClick={() => setDialog(!dialog)}>
          Add Project
        </button>
        </div >
        <div className="dialog_box">
        {
          dialog &&
          <>
            <ReactDialogBox
              closeBox={closeBox}
              modalWidth='80%'
              headerBackgroundColor='#212529'
              headerTextColor='white'
              headerHeight='65'
              closeButtonColor='white'
              bodyBackgroundColor='white'
              bodyTextColor='black'
              bodyHeight='400px'
              headerText='Add Project'
            >
              <div style={{ height: '100%',display: "flex",flexDirection: "column" ,justifyContent: "space-evenly" }}>
                <div>
                <label className="label" style={{ marginBottom:'20px' }}>
                  Project Name
                </label>
                <input
                  className="label-input form-control"
                  type="text"
                  id="input"
                  name="name"
                  cols={20}
                  rows={1}
                  defaultValue={"des"}
                  onChange={handleInputChange}
                  required
                />
                </div>
                <div>
                <label className="label" style={{ marginBottom:'20px' }}>
                 Project Description
                </label>
                <input
                  className="label-input form-control"
                  type="text"
                  id="input"
                  name="description"
                  cols={40}
                  rows={3}
                  defaultValue={"des"}
                  onChange={handleInputChange}
                  required
                />
                </div>
                <div>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
          </div>
                <button className="add_button" onClick={handleSubmit}>
                   Create
                </button>
              </div>
            </ReactDialogBox>
          </>
        }
        </div>

        <Project />   
      </div>

      );
}

      export default Projects;