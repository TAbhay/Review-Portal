
import {Switch ,Route} from "react-router-dom"
import Login from './auth/Login'
import Register from './auth/Register'
import ActivationMail from "./auth/ActivationMail"
import {useSelector} from "react-redux"
import NotFound from "../utils/notFound/NotFound"
import ForgotPassword from "../body/auth/ForgotPassword"
import ResetPassword from "../body/auth/ResetPassword"
import Profile from "../body/profile/Profile"
import EditUser from "../body/profile/EditUser"

export default function Body() {

    const auth = useSelector(state => state.auth)
    const {isLogged, isAdmin} = auth
    return (
       <section>
           
           <Switch>
               <Route path="/login" component={isLogged ? NotFound : Login} exact />
               <Route path="/register" component={isLogged ? NotFound : Register} exact />
               <Route path="/profile" component={isLogged ? Profile : NotFound} exact />
               <Route path="/forgot_password" component={isLogged ? NotFound : ForgotPassword} exact />
               <Route path="/user/reset/:token" component={isLogged ? NotFound : ResetPassword} exact />
               <Route path="/user/activate/:activation_token" component={ActivationMail} exact />
               <Route path= "/edit_user/:id" comonent={isAdmin ? EditUser : NotFound} exact />

           </Switch>


       </section>
    )
}
