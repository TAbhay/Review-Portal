import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import Project from '../Project/Project';
import { fetchAllProjects, dispatchAllProjects } from '../../../../redux/actions/projectAction';
import { dispatchAddProject } from '../../../../redux/actions/projectAction';
import { ReactDialogBox } from 'react-js-dialog-box'
import 'react-js-dialog-box/dist/index.css'
import axios from "axios";
import { isEmpty } from "../../../utils/validation/Validation";
import { toast } from 'react-toastify';
import './Projects.css';

const Projects = () => {
  const [project, setProject] = useState({ name: "", description: "" , tag_one:"",tag_two:"",submitted:"0" });
  const [dialog, setDialog] = useState(false);
  
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
    if (isEmpty(project.name && project.description && project.tag_one && project.tag_two)) {
      toast.error('All fields should be filled !', { theme: "colored" });
      return;
    }
    try {
      var res = await axios.post(`/api/project/add`, { name: project.name, description: project.description , tag_one : project.tag_one, tag_two : project.tag_two , submitted: project.submitted},
        {
          headers: { Authorization: token },
        }
      );
      dispatch(dispatchAddProject(res))
      toast.success('Project added succesfully !', { theme: "colored" });
      closeBox()
    } catch (err) {
      toast.error('Error ! Already submitted for review', { theme: "colored" });
    }
  }

  return (

    <div className="project-container-lg">
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <h1 style={{ textAlign: "center" }}>Projects</h1>
        <button className="btn btn-success add_button" onClick={() => setDialog(!dialog)}>
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
              headerBackgroundColor='#0d9460'
              headerTextColor='white'
              headerHeight='65'
              closeButtonColor='white'
              bodyBackgroundColor='white'
              bodyTextColor='black'
              bodyHeight='500px'
              headerText='Add Project'
            >
              <div style={{ height: '100%', display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
              <div style={{ marginBottom: '10px' }}>
                  <label className="form-label" style={{ marginBottom: '5px' }}>
                    Project Name
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="input"
                    name="name"
                    cols={20}
                    rows={1}
                    value={project.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label className="form-label" style={{ marginBottom: '5px' }}>
                    Project Description
                  </label>
                  <textarea
                    className="form-control"
                    type="text"
                    id="input"
                    name="description"
                    cols={40}
                    rows={3}
                    value={project.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label className="form-label" style={{ marginBottom: '5px' }}>Technology Used</label>
                        <select className="form-select" value={project.tag_one} name="tag_one" onChange={handleInputChange} aria-label="Default select example" >
                            <option value="React">React</option>
                            <option value="Node">Node</option>
                            <option value="Express">Express</option>
                            <option value="Angular">Angular</option>
                            <option value="SQL">SQL</option>
                            <option value="C">C</option>
                            <option value="Python">Python</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                  <label className="form-label" style={{ marginBottom: '5px' }}>Technology Used</label>
                        <select className="form-select" value={project.tag_two} name="tag_two" onChange={handleInputChange} aria-label="Default select example" >
                        <option value="React">React</option>
                            <option value="Node">Node</option>
                            <option value="Express">Express</option>
                            <option value="Angular">Angular</option>
                            <option value="SQL">SQL</option>
                            <option value="C">C</option>
                            <option value="Python">Python</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                
                <button className="btn btn-success add_button"  onClick={handleSubmit}>
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