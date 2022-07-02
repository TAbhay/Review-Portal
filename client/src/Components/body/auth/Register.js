import React, { useState } from 'react'
import { Link } from "react-router-dom"
import "./auth.css"
import axios from "axios"
import { toast } from 'react-toastify';
import { isEmpty, isEmail, isLength, isMatch } from "../../utils/validation/Validation"
import bg5 from "../../../Images/bg5.jpg"
const initialState = {
    name: "",
    email: "",
    password: "",
    cf_password: "",
    err: "",
    success: "",


}



export default function Register() {

    const [user, setUser] = useState(initialState)
    const { name, email, password, cf_password, err, success } = user
    const handleChangeInput = e => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value, err: "", success: "" })
    }

    const handleSubmit = async e => {
        e.preventDefault()

        if (isEmpty(name) || isEmpty(password)){
            toast.error('All fields should be filled !',{theme: "colored"});
            setUser({ ...user, err: "Please fill in all fields", success: "" })
            return
        }

        if (!isEmail(email)){
            toast.error('Invalid emails',{theme: "colored"});
            setUser({ ...user, err: "Please fill in all fields", success: "" })
            return
        }
           

        if (isLength(password)){
            toast.error('Password should be 6 characters length',{theme: "colored"});
            setUser({ ...user, err: "Please fill in all fields", success: "" })
            return
        }
           

        if (!isMatch(password, cf_password)){
            toast.error('Password doest match',{theme: "colored"});
            setUser({ ...user, err: "Please fill in all fields", success: "" })
            return
        }
          


        try {

            const res = await axios.post('/user/register', {
                name, email, password
            })

            setUser({ ...user, err: "", success: res.data.msg })


        } catch (err) {

            err.response.data.msg && setUser({ ...user, err: err.response.data.msg, success: "" })
        }
    }

    return (
        <div className="login_container">
            <div className="login_image">
                    <img src={bg5} />
            </div>
            <div className="login_page">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>

                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" placeholder="Enter name" id="name" value={name} name="name"
                            onChange={handleChangeInput}
                        />
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Enter email" id="email" value={email} name="email"
                            onChange={handleChangeInput}
                        />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Enter password" id="password" value={password} name="password"
                            onChange={handleChangeInput}
                        />
                    </div>

                    <div>
                        <label htmlFor="cf_password">Confirm password</label>
                        <input type="password" placeholder="Confirm password" id="cf_password" value={cf_password} name="cf_password"
                            onChange={handleChangeInput}
                        />
                    </div>

                    <div className="row">

                        <button type="submit">Register</button>


                    </div>
                </form>

                <p>You have an Account ? <Link to="/login">Login</Link></p>
            </div>

        </div >
    )
}
