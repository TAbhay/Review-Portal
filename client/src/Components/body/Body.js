import React from "react"
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
import ReviewComponent from "./reviewer/reviewComponent/reviewComponent"
import Projects from "./student/Projects/Projects"
import Home from "../body/Home/Home"
import Team from "../body/Team/Team"
import Admin from "../body/Admin/Admin"

export default function Body() {

    const auth = useSelector(state => state.auth)
    const { isLogged, isStudent, isReviewer , isAdmin } = auth;

    return (
        <div style={{ minHeight: '84vh' }}>
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/team" component={Team} exact />
                {
                    isStudent &&
                    <>
                        <Route path="/project" component={isLogged ? Projects : Login} exact />
                        {/* <Route path="/project/:id" component={Admin} exact /> */}
                        <Route path="/profile" component={isLogged ? Profile : Login} exact />
                    </>
                }
                {
                    isReviewer &&
                    <>
                        <Route path="/review" component={isLogged ? Reviews : Login} exact />
                        <Route path="/review/:id" component={isLogged ? ReviewComponent : Login} exact />
                        <Route path="/profile" component={isLogged ? Profile : Login} exact />

                    </>
                }
                {/* <Route path="/" component={isLogged ? Projects : Login} exact /> */}
                {
                    isAdmin &&
                    <>
                        <Route path="/admin" component={Admin} exact />
                    </>
                }
                {
                    isLogged ?
                        <>

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


                {/* //  <Route path= "/edit_user/:id" comonent={isAdmin ? EditUser : NotFound} exact /> */}

            </Switch>
        </div>
    )
}
