
import {Switch ,Route} from "react-router-dom"
import Login from './auth/Login'
import Register from './auth/Register'
import ActivationMail from "./auth/ActivationMail"
import {useSelector} from "react-redux"
import NotFound from "../utils/notFound/NotFound"
import ForgotPassword from "../body/auth/ForgotPassword"
import ResetPassword from "../body/auth/ResetPassword"
import Profile from "../body/profile/Profile"
import Projects from "../body/Projects/projects"
import Admin from "../body/Admin/Admin"
//import EditUser from "../body/profile/EditUser"
import SingleProject  from "../body/singleProject/singleproject"
export default function Body() {

    const auth = useSelector(state => state.auth)
    const {isLogged, isAdmin} = auth
    return (
       <section>
           
           <Switch>
               <Route path="/" component={isLogged ? Projects : Login} exact />
               <Route path="/login" component={isLogged ? NotFound : Login} exact />
               <Route path="/register" component={isLogged ? NotFound : Register} exact />
               <Route path="/profile" component={isLogged ? Profile : NotFound} exact />
               <Route path="/forgot_password" component={isLogged ? NotFound : ForgotPassword} exact />
               <Route path="/user/reset/:token" component={isLogged ? NotFound : ResetPassword} exact />
               <Route path="/user/activate/:activation_token" component={ActivationMail} exact />
               <Route path="/review" component={Projects} exact />
               <Route path="/review/:id" component={SingleProject} exact />
               <Route path="/admin" component={Admin} exact />
             {/* //  <Route path= "/edit_user/:id" comonent={isAdmin ? EditUser : NotFound} exact /> */}

           </Switch>


       </section>
    )
}
