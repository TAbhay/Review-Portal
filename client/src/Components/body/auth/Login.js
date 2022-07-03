
import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import "./auth.css"
import axios from "axios"
import { dispatchLogin } from "../../../redux/actions/authAction"
import { useDispatch } from "react-redux"
import bg4 from "../../../Images/bg4.jpg"
import { toast } from 'react-toastify';
import Loader from '../../utils/Loader'
const initialState = {
    email: "",
    password: "",
}



export default function Login() {

    const [user, setUser] = useState(initialState)
    const dispatch = useDispatch()
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const { email, password, err, success } = user

    const handleChangeInput = e => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }


    const handleSubmit = async e => {
        e.preventDefault()

        try {
            setLoading(true)
            const res = await axios.post('/api/user/login', { email, password })

            setUser({ ...user, err: '', success: res.data.msg })

            localStorage.setItem('firstLogin', true)
            const refresh_token = localStorage.setItem('refresh_token',res.data.refresh_token)
            console.log(`Refresh token: ${refresh_token}`)
            dispatch(dispatchLogin())
            setLoading(false)
            toast.success('Logged In succesfully !', { theme: "colored" });
            history.push('/')
        } catch (err) {
            err.response.data.msg && setUser({ ...user })
            err.response.data.msg && toast.error(`${err.response.data.msg} !`, { theme: "colored" });
            setLoading(false)
        }
    }

    return (
        <div className="login_container">
            <div className="login_image">
                <img src={bg4} />
            </div>
            <div className="login_page">
                {
                    loading ? <Loader /> : <> <h3>Login to Your Account</h3>

                        <form onSubmit={handleSubmit}>
                            <div>
                                <label className="form-label" >Email</label>
                                <input type="email" placeholder="Enter email" id="email" value={email} name="email" className="label-input form-control"
                                    onChange={handleChangeInput}
                                />
                            </div>
                            <div>
                                <label className="form-label" >Password</label>
                                <input type="password" placeholder="Enter password" id="password" value={password} name="password" className="label-input form-control"
                                    onChange={handleChangeInput}
                                />
                            </div>

                            <div className="row">

                                <button className="btn btn-success"  type="submit">Login</button>
                                <Link to="/forgot_password">Forgot your password</Link>

                            </div>
                        </form>

                        <p>New here ? <Link to="/register">Register</Link></p></>
                }


            </div>
        </div>
    )
}
