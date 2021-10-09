import React, {useEffect} from "react"
import {BrowserRouter as Router} from "react-router-dom"
import { useDispatch,useSelector } from "react-redux"
import Header from "./components/header/Header"
import Body from "./components/body/Body"
import axios from "axios"
import {dispatchLogin,fetchUser,dispatchGetUser} from "./redux/actions/authAction"

const  App = () => {

const dispatch = useDispatch()
const token = useSelector(state => state.token)
const auth = useSelector(state => state.auth)

useEffect(()=>{

  const firstLogin = localStorage.getItem("firstLogin")
  if(firstLogin){

      const refreshToken = async () => {

          const res = await axios.get("/user/refresh_token")
          dispatch({type:"GET_TOKEN", payload:res.data.access_token})
          return fetchUser(token).then(res => {
            dispatch(dispatchGetUser(res))
          })
        
      }
         
      refreshToken()

  }
    
  
},[auth.isLogged,dispatch])





useEffect(()=> {
  if(token){

     const getUser = () =>  {

      dispatch(dispatchLogin())

     }
      getUser()
    }
},[token,dispatch])

  return (
    <Router>
    <div className="App">

       <Header/>
       <Body/>
    </div>
    </Router>
  );
}

export default App;
