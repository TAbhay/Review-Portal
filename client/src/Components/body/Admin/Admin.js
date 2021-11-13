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
  const renderReviews = (reviews)=>{
        reviews.map((review) =>{
          return(
             <div>

             </div>
          )
        });
  }
  const renderProjects = result.map((item)=>{  
    console.log(item.projects[0].reviews[0].answer)
    return(
        <div className="item-container">
           <div className="item-header">
             <div className="item-title">{item._id.name}</div>
             <div className="item-no">{item.projects.length}</div>
           </div>
           <div className="item-project">
             <div className="item-project-card">
               <div className="item-project-title">{item.projects[0]._id.project_name}</div>
               <div className="item-review">R1</div>
               <div>
                 <ul>
                   <li>fdsf</li>
                   <li>fd</li>
                   <li>fd</li>
                   <li>df</li>
                   <li>fds</li>
                   <li>fsd</li>
                   <li>fsd</li>
                   <li>fd</li>
                   <li>fsd</li>
                   <li>fs</li>
                 </ul>
               </div>
             </div>
           </div>
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
