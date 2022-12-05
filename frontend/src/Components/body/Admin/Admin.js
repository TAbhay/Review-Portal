import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { dispatchAdminData } from "../../../redux/actions/adminAction";
import "./Admin.css"

const Admin = () => {

  // const auth = useSelector(state => state.auth)
  const token = useSelector(state => state.token)
  // const users = useSelector(state => state.users)
  const [open, setOpen] = useState(0)
  const dispatch = useDispatch();
  const fetchResult = async () => {
    try {
      const response = await axios.get(`/api/admin/result`, {
        headers: { Authorization: token }
      })
      dispatch(dispatchAdminData(response))
    }
    catch (err) {

    }
  }
  useEffect(() => {
    fetchResult();
  }, [])
  const renderReviews = (projects) => {
    projects.map((project) => {
      return (
        <div>
          <h1>Hello</h1>
        </div>
      )
    });
  }
  
  
  return (
    <div className="single-project-container">
      <div>
        <h1 style={{ textAlign: "center" }}>Results</h1>
      </div>
      {renderReviews}

    </div>
  );
};

export default Admin;
