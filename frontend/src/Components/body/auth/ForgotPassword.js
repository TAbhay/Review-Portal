import axios from 'axios'
import React, { useState } from 'react'
import { isEmail } from '../../utils/validation/Validation'
import { toast } from 'react-toastify';

const initialState = {
    email: "",
}

function ForgotPassword() {

    const [data, setData] = useState(initialState)

    const { email } = data

    const handleChangeInput = e => {

        const { name, value } = e.target

        setData({ ...data, [name]: value })
    }

    const forgotPassword = async () => {

        if (!isEmail(email)) {
            toast.error('Invalid email', { theme: "colored" });
            setData({ ...data })
            return
        }
        try {

            const res = await axios.post('/api/user/forgot', { email })
            toast.success(`${res.data.msg}`, { theme: "colored" });
            setData({ ...data })
            return

        } catch (err) {

            err.response.data.msg && setData({ ...data })
            err.response.data.msg && toast.success(`${err.response.data.msg}`, { theme: "colored" });
        }
    }

    return (
        <div className="fg_pass">
            <h2>Forgot Your Password ?</h2>

            <div className="row">
                <label htmlFor="email">Enter email</label>
                <input type="email" name="email" id="email" value={email}
                    onChange={handleChangeInput} />

                <button className="btn btn-success"  onClick={forgotPassword}>Check your email</button>


            </div>
        </div>
    )
}

export default ForgotPassword
