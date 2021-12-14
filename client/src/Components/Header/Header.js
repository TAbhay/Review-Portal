import React from "react";

import { Link } from "react-router-dom";
import "./header.css";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Header() {
  const auth = useSelector((state) => state.auth);

  const { user, isLogged } = auth;

  console.log(user.name);
  console.log(isLogged);

  const handleLogout = async () => {
    try {
      await axios.get("/user/logout");
      localStorage.removeItem("firstLogin");
      window.location.href = "/";
    } catch (err) {}
  };
  console.log("prvess started")
 
    // const transForm = {
    //     transform: isLogged ? "translateY(-5px)" : 0 
    // }
    return (
        <header>
            <div className = "logo">

                <h1><Link to="/" style={{textDecoration:"none",color:"white"}}>Review</Link></h1>
            </div>
            <div className="list-items">
            <ul   >
            {/* <ul  style={transForm} > */}
                
                {
                    isLogged
                    ? <li><Link to="/" style={{textDecoration:"none",color:"white"}}>Projects</Link></li>
                    :<li><Link to="/login"  style={{textDecoration:"none",color:"white"}}><i className="fas fa-user"></i> Sign in</Link></li>
                } 
                 {
                    isLogged
                    ? <li><Link to="/Profile" style={{textDecoration:"none",color:"white"}}>Profile</Link></li>
                    :<li><Link to="/login"  style={{textDecoration:"none",color:"white"}}><i className="fas fa-user"></i> Sign in</Link></li>
                } 
                {
                    isLogged
                    ? <li>
                    <Link to="/" style={{textDecoration:"none",color:"white"}} onClick={handleLogout}>
                    Logout
                   </Link>
                   </li>
                    :<li></li>
                }
                <i class="fas fa-bars hamburger"></i>
            </ul>
            </div>
        </header>
    
    )
}
