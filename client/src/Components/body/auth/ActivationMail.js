import React, {useState,useEffect} from 'react'
import {useParams} from "react-router-dom"
import {showErrMsg, showSuccessMsg} from "../../utils/notifications/Notification"
import axios from 'axios'
export default function ActivationMail() {

    const {activation_token} = useParams()
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')
    console.log(activation_token);
    useEffect(()=>{
        if(activation_token){
            const activationEmail = async () => {
               try{
                   console.log(activation_token)
                const res = await axios.post('/user/activation', {activation_token} )
                setSuccess(res.data.msg)
               }catch(err){
                   err.response.data.msg  &&  setErr(err.response.data.msg)
               }
            }

            activationEmail()
        }
    },[activation_token])
    return (
        <div className="active_page">
         <h1> {activation_token }</h1>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            
        </div>
    )
}
