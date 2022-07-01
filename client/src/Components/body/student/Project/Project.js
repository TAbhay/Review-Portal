import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { dispatchUpdateProject } from '../../../../redux/actions/projectAction';
import { ReactDialogBox } from 'react-js-dialog-box'
import 'react-js-dialog-box/dist/index.css'
import axios from "axios";
import { showErrMsg, showSuccessMsg } from "../../../utils/notifications/Notification";
import { isEmpty } from "../../../utils/validation/Validation";
import "./project.css";

const Project = () => {
  const projects = useSelector((state) => state.projectReducer.projects);
  const [project, setProject] = useState({ name: "", description: "", id: "" });
  const [dialog, setDialog] = useState(false);
  const [data, setData] = useState({ err: "", success: "" });
  const { err, success } = data;
  const token = useSelector(state => state.token)
  const dispatch = useDispatch();

  const handleClick = (pname, des, id) => {
    setProject({ name: pname, description: des, id: id });
    setDialog(!dialog)
    console.log(pname, id)
  }
  const closeBox = () => {
    setProject({ name: "", description: "", id: "" });
    setDialog(false)
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, err: "", success: "" });
    if (isEmpty(project.name && project.description && project.id)) {
      return setData({ ...data, err: "Please Fill All the fields 1", success: "", });
    }
    try {
      var res = await axios.put(`/api/project/${project.id}`, { name: project.name, description: project.description },
        {
          headers: { Authorization: token },
        }
      );
      console.log(res.data)
      dispatch(dispatchUpdateProject(res))
      setData({ err: "", success: "Updated successfully" });
      closeBox()
    } catch (err) {
      err &&
        setData({ err: "Error occurred", success: "" });
    }
  }
 
  const renderProjects = projects?.map((item) => {
    const projectName = item.name;
    const id = item._id;
    const status = item.is_deadline;
    const tech_one = item.tag_one
    const tech_two = item.tag_two
    var tech = {Node:"lightgreen",Mongodb:"#F7CA18",Python:"#26C281",React:"#19B5FE",Angular:"#F22613",SQL:"orange",C:"#003171",Express:"#BF55EC"};
    return (
      // <div className="singleProject">
      //   <div className="single_card_istem">
      //      <h4>{projectName}</h4>
      //   </div>
      //   <div className="single_card_item card_icons">
      //     <div className="edit_icon" onClick={() => handleClick(projectName,item.description,id)}>
      //         <i className="fas fa-edit"></i>
      //     </div>
      //     <div className="card-status">
      //       {status ? (
      //         <i className="fas fa-dot-circle" style={{ color: "green" }}></i>
      //       ) : (
      //       <i className="fas fa-dot-circle" style={{ color: "green" }}></i>
      //       )}
      //     </div> 
      //   </div>
      // </div>

      <div className="grid-item">
        <div className="grid_card">
          <div className="card_header"  style={{ display:'flex',justifyContent:'space-between',padding: "8px",textAlign:'left'}}>
            <h5>{projectName}</h5>
            <div className="edit_icon" style={{marginRight: "30px"}}>
              <i class="material-icons"  style={{fontSize:'30px',color:'#0d6efd'}}>assignment</i>
            </div>
          </div>
          <div className="">
            <h6 style={{marginTop:'-15px',padding: "8px",textAlign:'left'}}>Description</h6>
            <p style ={{ marginTop:'-15px', textOverflow: 'ellipsis',overflow: 'hidden', width:'90%', height: '50px',whiteSpace:'nowrap',padding: "8px",textAlign:'left'}}>{item.description}</p>
          </div>
          <div style={{ height: '50px', display: 'flex', justifyContent: 'space-between', borderTop: '2px solid black', padding: '10px' }}>
          <div className="edit_icon tech_box">
              <div className = "tech_stack" style={{backgroundColor:tech[tech_one]}}>{tech_one}</div>
              <div className = "tech_stack" style={{backgroundColor:tech[tech_two]}}>{tech_two}</div>
              
            </div>
            <div style={{display:'flex'}}>
            <div className="edit_icon" onClick={() => handleClick(projectName, item.description, id)} style={{marginRight: "30px"}}>
              <i className="fas fa-edit fa-lg" style={{ color: "#0d6efd"}}></i>
            </div>
            <div className="card-status" style={{marginRight: "30px"}}>
              {status ? (
                <i className="fas fa-dot-circle fa-lg" style={{ color: "green"}}></i>
              ) : (
                <i className="fas fa-dot-circle fa-lg" style={{ color: "red" }}></i>
              )}
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
            headerBackgroundColor=' #0d9460'
            headerTextColor='white'
            headerHeight='65'
            closeButtonColor='white'
            bodyBackgroundColor='white'
            bodyTextColor='black'
            bodyHeight='400px'
            headerText='Edit Project'
          >
            <div style={{ height: '100%', display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
              <div>
                <label className="label" style={{ marginBottom: '20px' }}>
                  Project Name
                </label>
                <input
                  className="label-input form-control"
                  type="text"
                  id="input"
                  name="name"
                  cols={20}
                  rows={1}
                  Value={project.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="label" style={{ marginBottom: '20px' }}>
                  Project Description
                </label>
                <input
                  className="label-input form-control"
                  type="text"
                  id="input"
                  name="description"
                  cols={40}
                  rows={3}
                  Value={project.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
              </div>
              <button className="add_button" onClick={handleSubmit}>
                Update
              </button>
            </div>
          </ReactDialogBox>
        </>
      }
    </div>
  </>);
};
export default Project;
