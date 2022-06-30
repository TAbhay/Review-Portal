import React, { useState, useEffect } from "react"
import { Switch, Route } from "react-router-dom"
import Login from './auth/Login'
import Register from './auth/Register'
import ActivationMail from "./auth/ActivationMail"
import { useSelector } from "react-redux"
import NotFound from "../utils/notFound/NotFound"
import ForgotPassword from "../body/auth/ForgotPassword"
import ResetPassword from "../body/auth/ResetPassword"
import Profile from "../body/profile/Profile"
import Reviews from "./reviewer/Reviews/Reviews"
// import { fetchAllReviews } from "../../redux/actions/reviewAction"
import ReviewComponent from "./reviewer/reviewComponent/reviewComponent"
import Projects from "./student/Projects/Projects"
import Home from "../body/Home/Home"
export default function Body() {

    const auth = useSelector(state => state.auth)
    const { isLogged, isStudent, isReviewer } = auth;

    return (
        <div style={{minHeight:'84vh'}}>
          <Switch>
                 <Route path="/" component={isLogged ? Home : Login} exact />
                {
                    isStudent &&
                    <>
                        <Route path="/project" component={isLogged ? Projects : Login} exact />
                        {/* <Route path="/project/:id" component={Admin} exact /> */}
                    </>
                }
                {
                    isReviewer &&
                    <>
                        <Route path="/review" component={isLogged ? Reviews : Login} exact />
                        <Route path="/review/:id" component={isLogged ? ReviewComponent : Login} exact />

                    </>
                }
                {/* <Route path="/" component={isLogged ? Projects : Login} exact /> */}
                {
                    isLogged ? 
                    <>
                    <Route path="/profile" component={Profile} exact />
                    <Route path="/forgot_password" component={ForgotPassword} exact />
                    <Route path="/user/reset/:token" component={ResetPassword} exact />
                    <Route path="/login" component={NotFound} exact />
                    <Route path="/register" component={NotFound} exact />
                    </>
                    :
                    <>
                    <Route path="/login" component={Login} exact />
                    <Route path="/register" component={Register} exact />
                    <Route path="/user/activate/:activation_token" component={ActivationMail} exact />
                    </>
                }
                
                


                {/* <Route path="/admin" component={Admin} exact /> */}
                {/* //  <Route path= "/edit_user/:id" comonent={isAdmin ? EditUser : NotFound} exact /> */}

            </Switch>
            </div>
    )
}
