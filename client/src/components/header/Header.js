import React from "react";

import { Link } from "react-router-dom";
import "./Header.css";
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
          </li>
        </ul>
      </li>
    );
  };

  const transForm = {
    transform: isLogged ? "translateY(-5px)" : 0,
  };
  return (
    <header>
      <div className="logo">
        <h1>
          <Link to="/">Full Auth</Link>
        </h1>
      </div>

      <ul style={transForm}>
        <li>
          <Link to="/projects">
            View Projects
          </Link>
        </li>
        {isLogged ? (
          userLink()
        ) : (
          <li>
            <Link to="/login">
              <i className="fas fa-user"></i> Sign in
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
}
