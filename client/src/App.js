import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Components/Header/Header";
import Body from "./Components/body/Body";
import Footer from "./Components/Footer/Footer"
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify';
import Loader from "./Components/utils/Loader";
import { dispatchLogin, fetchUser, dispatchGetUser } from "./redux/actions/authAction";


const App = () => {

  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const token = useSelector((state) => state.token)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if (firstLogin) {
      setLoading(true)
      const getToken = async () => {
        try {
          const res = await axios.post('/user/refresh_token', null)
          dispatch({ type: 'GET_TOKEN', payload: res.data.access_token })
        }
        catch (err) {
          setLoading(false)
          toast.error('Error', { theme: "colored" })
        }
      }
      getToken()
      setLoading(false)

    }
  }, [auth.isLogged, dispatch])

  useEffect(() => {
    if (token) {
      setLoading(true)
      const getUser = () => {
        try {
          dispatch(dispatchLogin())
          return fetchUser(token).then((res) => {
            dispatch(dispatchGetUser(res))
          })
        }
        catch (err) {
          setLoading(false)
          toast.error('Error', { theme: "colored" })
        }

      }
      getUser()
      setLoading(false)

    }
  }, [token, dispatch])




  return (
    <Router>
      <div className="App">
        <ToastContainer
          position="bottom-left"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Header />
        {
          loading ? <><Loader /></> : <>  <Body /> </>
        }
        <Footer />
      </div>
    </Router>
  );
};

export default App;
