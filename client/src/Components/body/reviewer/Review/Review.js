import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Review.css";
const Review = () => {
  const { reviews } = useSelector((state) => state.reviews);

  const renderReviews = reviews?.map((item) => {
    const projectName = item.project.name;
    const id = item._id;
    const status = item.status;
    const author = item.project_by.name
    var tech = [["Node","lightgreen"],["Mongodb","#F7CA18"],["Python","#26C281"],["React","#19B5FE"],["Angular","#F22613"],["SQL","orange"],["C++","#003171"],["Express","#BF55EC"]];
    var randomTech_1 = tech[Math.floor(Math.random()*tech.length)];
    var randomTech_2 = tech[Math.floor(Math.random()*tech.length)];
    return (
      <div className="grid-item">
        <div className="grid_card">
          <div className="card_header"  style={{ display:'flex',justifyContent:'space-between',padding: "8px",textAlign:'left'}}>
            <h5>{projectName}</h5>
            <div className="edit_icon" style={{marginRight: "30px"}}>
              <i class="material-icons"  style={{fontSize:'30px',color:'#0d6efd'}}>assignment</i>
            </div>
          </div>
          <div className="">
            <p style={{marginTop:'-15px',padding: "8px",textAlign:'left'}}>Author : <b>{author}</b></p>
            <p style ={{ marginTop:'-15px', textOverflow: 'ellipsis',overflow: 'hidden', width:'90%', height: '50px',whiteSpace:'nowrap',padding: "8px",textAlign:'left'}}>Review this Project !!</p>
          </div>
          <div style={{ height: '50px', display: 'flex', justifyContent: 'space-between', borderTop: '2px solid black', padding: '10px' }}>
          <div className="edit_icon tech_box">
              <div className = "tech_stack" style={{backgroundColor:randomTech_1[1]}}>{randomTech_1[0]}</div>
              <div className = "tech_stack" style={{backgroundColor:randomTech_2[1]}}>{randomTech_2[0]}</div>
              
            </div>
            <div style={{display:'flex'}}>
             <div className="edit_icon"  style={{marginRight: "30px"}}>
              <Link to={`/review/${id}`}> <i className="fas fa-edit fa-lg" style={{ color: "#0d6efd"}}></i> </Link>
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

  return (
    <div className="section_card">
    <div className="container_card">
      <div className="grid-row">
        {renderReviews}
        </div>
      </div>
    </div>
  );
};
export default Review;
