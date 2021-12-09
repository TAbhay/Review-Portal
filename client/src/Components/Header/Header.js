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
  const userLink = () => {
    return (
      <li className="drop-nav">
        <Link to="#" className="avatar">
          {user.name}

          <i className="fas fa-arrow-down"></i>
        </Link>

        <ul className="dropdown">
          <li>
            <Link to="/profile">Profile</Link>
          </li>

          <li>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>

            <ul className="dropdown">

                <li>
                 <Link to="/profile">
                 Profile
                </Link>
                </li>

                <li>
                 <Link to="/" onClick={handleLogout}>
                 Logout
                </Link>
                </li>
            </ul>
        </li>
        </ul>
        </li>
    )}


    const transForm = {
        transform: isLogged ? "translateY(-5px)" : 0 
    }
    return (
        <header>
            <div className = "logo">

                <h1><Link to="/" style={{textDecoration:"none",color:"white"}}>Review</Link></h1>
            </div>

            <ul  style={transForm} >
                
                {
                    isLogged
                    ? <li><Link to="/" style={{textDecoration:"none",color:"white"}}>Projects</Link></li>
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
            </ul>
        </header>
    )
}
