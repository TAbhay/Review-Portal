import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Components/Header/Header";
import Body from "./Components/body/Body";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  dispatchLogin,
  fetchUser,
  dispatchGetUser,
} from "./redux/actions/authAction";

const App = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const refreshToken = async () => {
        const res = await axios.get("/user/refresh_token");
        dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
        console.log("commiing here ")
        return fetchUser(res.data.access_token).then((res) => {
          dispatch(dispatchGetUser(res));
        });
      };

      refreshToken();
    }
  }, [auth.isLogged, dispatch,window.location]);
  
  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin());
      };
      getUser();
    }
  }, [token, dispatch]);

  return (
    <Router>
      <div className="App">
        <Header />
        <Body />
      </div>
    </Router>
  );
};

export default App;
