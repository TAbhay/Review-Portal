import React , {useState,useEffect }from "react";
import { Link , useParams} from "react-router-dom";
import axios from "axios"
import {useSelector, useDispatch} from "react-redux"
import "./Admin.css"

const Admin = () => {

  const auth =useSelector(state =>state.auth)
  const token= useSelector(state =>state.token)
  const users = useSelector(state => state.users)
  const [result,setResult] = useState([])
  const [open,setOpen]  = useState(0)
  const fetchResult = async() =>{
     try{
       const response  = await axios.get(`/admin/result`,{
        headers: {Authorization : token}
       }) 
       setResult([...response.data])
        console.log(response)
        console.log("hre",result)
     }
     catch(err){
       console.log(err)
     }
  }
  useEffect(()=>{
      fetchResult();
  },[])
  const renderReviews = (projects)=>{
        projects.map((project) =>{
          console.log("hrer running")
          return(
             <div>
             <h1>Hello</h1>
             </div>
          )
        });
  }
  const handlehelloclick = () => {
    console.log("here clicked the bttn")
    return (
      <div className="hellodiv">Hello world</div>
    )
  }
  const renderProjects = result.map((item)=>{  
    console.log("answer",item.projects[0].reviews[0].answer)
    return(

        <div className="item-container">
           <div className="item-header">
             <div className="item-title">{item._id.name}</div>
             <div className="item-no">{item.projects.length}</div>
           </div>
           <div onClick={handlehelloclick}>Hello</div>
           {
             item.projects.map((project) => {
               console.log("inner map",project);
               return(
                 <div>
                <div className="item-project"> 
                    <div>{project._id.project_name}</div> 
                    <div onClick={(e)=>{setOpen(!open)}}>Reviews &nbsp;&nbsp;&nbsp;&nbsp; <i class="fa fa-eye" aria-hidden="true"></i></div>       
                 </div>
                {/* <div className="dropdown">
                { open==1?(
                          <div className="personCard">
                            <p> Namee </p>
                            <p> Age</p>
                            <p> Address: </p>
                          </div>
                  ):<div></div> }
                <p>Lorem </p>
                </div> */}
                </div>
               )
             })
           }
           
        </div>
        );
  });
  return (
    <div className="single-project-container">
       <div>
         <h1 style={{textAlign:"center"}}>Results</h1>
       </div>
       {renderProjects}

     </div>
  );
};

export default Admin;
