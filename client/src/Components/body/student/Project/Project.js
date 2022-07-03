import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { dispatchUpdateProject, dispatchDeleteProject } from '../../../../redux/actions/projectAction';
import { ReactDialogBox } from 'react-js-dialog-box'
import 'react-js-dialog-box/dist/index.css'
import axios from "axios";
import { isEmpty } from "../../../utils/validation/Validation";
import { toast } from 'react-toastify';
import "./project.css";

const Project = () => {
  const projects = useSelector((state) => state.projectReducer.projects);
  const [project, setProject] = useState({ name: "", description: "", id: "", tag_one: "", tag_two: "", submitted: "" });
  const [dialog, setDialog] = useState(false);
  const [subpop, setSubpop] = useState(false);
  const token = useSelector(state => state.token)
  const dispatch = useDispatch();

  const handleClick = (pname, des, id, tech_one, tech_two) => {
    setProject({ name: pname, description: des, id: id, tag_one: tech_one, tag_two: tech_two });
    setDialog(!dialog)
  }
  const closeBox = () => {
    setProject({ name: "", description: "", id: "" });
    setDialog(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };
  const closeSubpop = () => {
    setSubpop(false)
  }
  const handleSubpop = (id) => {
    setProject({ ...project,id: id });
    setSubpop(true)
  }
  const handleSubmit = async (e) => {
    console.log(token)
    e.preventDefault();
    if (isEmpty(project.name && project.description && project.id && project.tag_one && project.tag_two)) {
      toast.error('All fields should be filled !', { theme: "colored" });
      return;
    }
    try {
      var res = await axios.put(`/api/project/${project.id}`, { name: project.name, description: project.description, tag_one: project.tag_one, tag_two: project.tag_two, submitted: project.submitted },
        {
          headers: { Authorization: token },
        }
      );
      dispatch(dispatchUpdateProject(res))
      toast.success('Project edited succesfully !', { theme: "colored" });
      closeBox()
    } catch (err) {
      toast.error('Error !', { theme: "colored" });
    }
  }
  const handleDelete = async () => {
    try {
      var res = await axios.post(`/api/project/${project.id}`,{},
      {
        headers: { Authorization: token },
      }
      );
      dispatch(dispatchDeleteProject(res))
      toast.success('Deleted successfully !', { theme: "colored" });
      closeBox()
    } catch (err) {
      toast.error('Error !', { theme: "colored" });
    }
  }

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    console.log(token)
    try {
      var res = await axios.post(`/api/project/submit/${project.id}`,{},
      {
        headers: { Authorization: token },
      }
      );
      // dispatch(dispatchDeleteProject(res))
      console.log(res.data)
      toast.success('Submitted for review !', { theme: "colored" });
      closeBox()
    } catch (err) {
      toast.error('Error', { theme: "colored" });
    }
  }


  const renderProjects = projects?.map((item) => {
    const projectName = item.name;
    const id = item._id;
    const status = item.submitted || 0;
    const tech_one = item.tag_one
    const tech_two = item.tag_two
    var tech = { Node: "lightgreen", Mongodb: "#F7CA18", Python: "#26C281", React: "#19B5FE", Angular: "#F22613", SQL: "orange", C: "#003171", Express: "#BF55EC", Other: "black" };
    return (
      <div className="grid-item shadow">
        <div className="grid_card">
          <div className="card_header" style={{ display: 'flex', justifyContent: 'space-between', padding: "8px", textAlign: 'left' }}>
            <h5>{projectName}</h5>
            <div className="edit_icon" style={{ marginRight: "30px" }}>
              <i class="material-icons" style={{ fontSize: '30px', color: '#0d6efd' }}>assignment</i>
            </div>
          </div>
          <div className="">
            <h6 style={{ marginTop: '-15px', padding: "8px", textAlign: 'left' }}>Description</h6>
            <p style={{ marginTop: '-15px', textOverflow: 'ellipsis', overflow: 'hidden', width: '90%', height: '50px', whiteSpace: 'nowrap', padding: "8px", textAlign: 'left' }}>{item.description}</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn btn-warning btn-sm mb-2" onClick = {() => handleSubpop(id)} >Submit for Review</button>
          </div>
          <div style={{ height: '50px', display: 'flex', justifyContent: 'space-between', borderTop: '2px solid black', padding: '10px' }}>
            <div className="edit_icon tech_box card_icon">
              <div className="tech_stack" style={{ backgroundColor: tech[tech_one] }}>{tech_one}</div>
              <div className="tech_stack" style={{ backgroundColor: tech[tech_two] }}>{tech_two}</div>

            </div>
            <div style={{ display: 'flex' }}>
              <div className="edit_icon" onClick={() => handleClick(projectName, item.description, id, tech_one, tech_two)} style={{ marginRight: "20px" }}>
                <i className="fas fa-edit fa-lg" style={{ color: "#0d6efd" }}></i>
              </div>
              <div className="card-status" style={{ marginRight: "20px" }}>
                {status ? (
                  <i className="fas fa-dot-circle fa-lg" style={{ color: "green" }}></i>
                ) : (
                  <i className="fas fa-dot-circle fa-lg" style={{ color: "red" }}></i>
                )}
              </div>
              <div className="edit_icon" onClick={() => handleDelete(id)} >
                <i class="fa fa-trash fa-lg" aria-hidden="true" style={{ color: "#0d6efd" }}></i>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  });

  return (<>
    <div className="section_card">
      <div className="container_card">
        <div className="grid-row">
          {renderProjects}
        </div>
      </div>
    </div>
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
            bodyHeight='400px'
            headerText='Edit Project'
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
              <button className="btn btn-success add_button" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </ReactDialogBox>

        </>
      }
      {
        subpop &&
        <>
         <ReactDialogBox
              closeBox={closeSubpop}
              modalWidth='80%'
              headerBackgroundColor='#0d9460'
              headerTextColor='white'
              headerHeight='65'
              closeButtonColor='white'
              bodyBackgroundColor='white'
              bodyTextColor='black'
              bodyHeight='300px'
              headerText='Submit for Review '
            >
              <h4>Are you ready for final evaluation ?</h4>
              <button type="button" class="btn btn-danger btn-lg p-2" style={{width:'100px',marginRight:'10px'}} onClick={handleFinalSubmit}>Yes</button>
              <button type="button" class="btn btn-primary btn-lg p-2" style={{width:'100px'}} onClick = {closeSubpop}>No</button>
            </ReactDialogBox>
        </>
      }
    </div>
  </>
  );
};
export default Project;
