import React, { useState } from 'react'
import { Link } from "react-router-dom"
import "./auth.css"
import axios from "axios"
import { toast } from 'react-toastify';
import { isEmpty, isEmail, isLength, isMatch } from "../../utils/validation/Validation"
import bg5 from "../../../Images/bg5.jpg"
const initialState = { name: "", role: "", email: "", password: "", cf_password: "", err: "", success: "", }

export default function Register() {

    const [user, setUser] = useState(initialState)
    const { name, role, email, password, cf_password, err, success } = user
    const handleChangeInput = e => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value, err: "", success: "" })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        console.log(typeof (role))
        console.log(role === "1")
        if (!(role === "1" || role === "2")) {
            toast.error('Select Role !', { theme: "colored" });
            setUser({ ...user, err: "Please fill in all fields", success: "" })
            return
        }
        if (isEmpty(name) || isEmpty(password)) {
            toast.error('All fields should be filled !', { theme: "colored" });
            setUser({ ...user, err: "Please fill in all fields", success: "" })
            return
        }
        if (!isEmail(email)) {
            toast.error('Invalid emails', { theme: "colored" });
            setUser({ ...user, err: "Please fill in all fields", success: "" })
            return
        }
        if (isLength(password)) {
            toast.error('Password should be 6 characters length', { theme: "colored" });
            setUser({ ...user, err: "Please fill in all fields", success: "" })
            return
        }
        if (!isMatch(password, cf_password)) {
            toast.error('Password doest match', { theme: "colored" });
            setUser({ ...user, err: "Please fill in all fields", success: "" })
            return
        }
        try {
            const res = await axios.post('/user/register', {
                name, role, email, password
            })
            toast.success('Success', { theme: "colored" });
            setUser({ ...user, err: "", success: res.data.msg })   
        } catch (err) {
            toast.error(`${err.response.data.msg}`, { theme: "colored" });
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
                    <div style={{ marginBottom: '7px' }}>
                        <label className="form-label">Role</label>
                        <select className="form-select" value={role} name="role" onChange={handleChangeInput} aria-label="Default select example" >
                            <option selected>Select Role</option>
                            <option value="1">Student</option>
                            <option value="2">Reviewer</option>
                        </select>
                    </div>
                    <div>
                        <label className="form-label">Name</label>
                        <input type="text" placeholder="Enter name" id="name" value={name} name="name" className="label-input form-control"
                            onChange={handleChangeInput}
                        />
                    </div>
                    <div>
                        <label className="form-label">Email</label>
                        <input type="email" placeholder="Enter email" id="email" value={email} name="email" className="label-input form-control"
                            onChange={handleChangeInput}
                        />
                    </div>
                    <div>
                        <label className="form-label">Password</label>
                        <input type="password" placeholder="Enter password" id="password" value={password} name="password" className="label-input form-control"
                            onChange={handleChangeInput}
                        />
                    </div>
                    <div>
                        <label className="form-label">Confirm password</label>
                        <input type="password" placeholder="Confirm password" id="cf_password" value={cf_password} name="cf_password" className="label-input form-control"
                            onChange={handleChangeInput}
                        />
                    </div>
                    <div className="row">
                        <button className="btn btn-success"  type="submit">Register</button>
                    </div>
                </form>
                <p>You have an Account ? <Link to="/login">Login</Link></p>
            </div>
        </div >
    )
}
