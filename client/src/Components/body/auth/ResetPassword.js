import React, { useState } from 'react'
import axios from "axios"
import { useParams } from "react-router-dom"
import { isLength, isMatch } from "../../utils/validation/Validation"
import { toast } from 'react-toastify';
const initialState = { password: "", cf_password: "" }

export default function ResetPassword() {

    const [data, setData] = useState(initialState)
    const { token } = useParams()
    const { password, cf_password } = data

    const handleChangeInput = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const handleResetPassword = async () => {

        if (isLength(password)) {
            toast.error('Password should be at least 6 characters', { theme: "colored" });
            setData({ ...data })
            return
        }
        if (!isMatch(password, cf_password)) {
            toast.error('Passwords do not match', { theme: "colored" });
            setData({ ...data })
            return
        }
        try {

            const res = await axios.post("/api/user/reset", { password }, {
                headers: { Authorization: token }
            })
            toast.success(`${res.data.msg}`, { theme: "colored" });
            setData({ ...data })
            return
        } catch (err) {
            err.response.data.msg && setData({ ...data })
            err.response.data.msg && toast.success(`${err.response.data.msg}`, { theme: "colored" });
        }
    }

    return (
        <div>
            <div className="fg_pass">
                <h2>Reset Your Password ?</h2>
                <div className="row">
                    <label htmlFor="password">Enter password</label>
                    <input type="password" name="password" id="password" value={password}
                        onChange={handleChangeInput} />
                    <label htmlFor="cf_password">Confirm password</label>
                    <input type="password" name="cf_password" id="cf_password" value={cf_password}
                        onChange={handleChangeInput} />
                    <button className="btn btn-success"  onClick={handleResetPassword}>Reset password</button>
                </div>
            </div>
        </div>
    )
}
