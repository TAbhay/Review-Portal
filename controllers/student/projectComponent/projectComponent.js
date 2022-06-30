import React , {useState,useEffect} from "react";
import { Link , useParams} from "react-router-dom";
import axios from "axios"
import {useSelector, useDispatch} from "react-redux"
import {showErrMsg, showSuccessMsg} from "../../../client/src/Components/utils/notifications/Notification"
import {isEmpty} from "../../../client/src/Components/utils/validation/Validation"
import "./singleproject.css";
import { compareSync } from "bcryptjs";

const SubmitProject = (props) => {

 
  const id  = useParams()
  // const auth =useSelector(state =>state.auth)
  const token= useSelector(state =>state.token)
  // const users = useSelector(state => state.users)
    
    const initialState = {
        name:"",
        description:"",
    }

    const [project, setProject] = useState(initialState);
    // const [details , setDetails]  = useState({title:"",description:""})
    const [data, setData] = useState( {
      err:"",
      success:"",
      })
    const { err , success} = data 
    const getInfor = async() =>{
      try{ 
          
           var response = await axios.get(`/api/project/${id.id}`,{
            headers: {Authorization : token}
        }) 
        var answer = response.data[0]
      
        console.log(answer)
        setProject({
          name:answer.name,
          description:answer.description 
       })
      // setDetails({
      //   title:response.data[0].project.name,description:response.data[0].project.description
      // })
       
        
      } catch(err){
        return setData({...data,err:"some error occurred",success:''})
      }
    }
    useEffect(()=>{
         getInfor();
    },[id])
    
    const handleInputChange = e => {
      const { name, value } = e.target;
     
      setQuestion({ ...question, [name]: value });
     
    };
    const handleInputChangeBox = e => {
      const { name, value } = e.target;
      setQuestion({ ...question, [name]: e.target.checked ?1:0 });
     
    };
   
    const handleSubmit = async(e) => {
      e.preventDefault();
      if(isEmpty(project.name&&project.description)){
          return setData({...data,err:"Please Fill All the fields", success:""});
          
      }
      try{
        
        var result = await axios.put(`/api/review/${id.id}`,{
           name:project.name,
           description:project.description
         },{
             headers: {Authorization : token}
         })
        
         setData({...data , err:"", success:"Updated successfully"})
         var answer = result.data[0]
         setProject({
          name:answer.name,
          description:answer.description 
       })
        
          
      }catch(err){
          
          err.response.data.msg &&  setData({...data , err:"err.response.data.msg", success:""})

      }
      

  }
  useEffect(()=>{
  },[data])
  
  return (
    <div>
    <form>
    <div className="single-project-container">
      <div className="project-body">
      
        <div className="project-title">
          <h3>Add Project</h3>
        </div>
        <div className="question-body">
          <h4>Project</h4>
          <div className="question">
            <label className="label">
              Name
            </label>
            <input
              className="label-input form-control"
              type="text"
              id="input"
              name="Q1"
              cols={40} 
              rows={3}
              value={project.name}
              onChange={handleInputChange}
              required                      
            />
          </div>
          <div className="question">
            <label className="label">description</label>
            <textarea
              className="label-input form-control"
              type="text"
              id="input"
              name="comment"
              cols={40} rows={2}
              onChange={handleInputChange} 
              value={project.description}
              required
            />
          </div>
        </div>
      </div>
      <div>{err && showErrMsg(err)}
          {success && showSuccessMsg(success)}</div>
      <div className="quiz-answer submit_button_div">
        <button className="submit_button" onClick = {handleSubmit} >
          Submit
        </button>
      </div>  
    </div>
    </form>
    </div>
  );
};

export default SubmitProject;

