import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Components/Header/Header";
import Body from "./Components/body/Body";
import axios from "axios";
import Projects from "./Components/Projects/Projects";
import Project from "./Components/Project/Project";

import {
  dispatchLogin,
  fetchUser,
  dispatchGetUser,
} from "./redux/actions/authAction";

const  App = () => {

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const refreshToken = async () => {
        const res = await axios.get("/user/refresh_token");
        dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
        return fetchUser(token).then((res) => {
          dispatch(dispatchGetUser(res));
        });
      };

      refreshToken();
    }
  }, [auth.isLogged, dispatch]);

  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin());
      };
      getUser();
    }
  }, [token, dispatch]);

  var all_projects = [
    {
      name: "Project1",
      discription: "This is the 1st project",
    },
    {
      name: "Project2",
      discription: "This is the 2st project",
    },
    {
      name: "Project3",
      discription: "This is the 3st project",
    },
    {
      name: "Project4",
      discription: "This is the 4st project",
    },
    {
      name: "Project5",
      discription: "This is the 5st project",
    },
    {
      name: "Project6",
      discription: "This is the 6st project",
    },
  ];

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Header />
          </Route>
          <Route exact path="/projects">
            <Projects all_project={all_projects} />
          </Route>
          <Route exact path="/projects/project">
            <Project />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
