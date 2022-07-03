import React, {useState,useEffect} from 'react'
import {useParams} from "react-router-dom"
import { toast } from 'react-toastify';
import axios from 'axios'
export default function ActivationMail() {

    const {activation_token} = useParams()
    useEffect(()=>{
        if(activation_token){
            const activationEmail = async () => {
               try{
                const res = await axios.post('/api/user/activation', {activation_token} )
                toast.success(`${res.data.msg}`, {theme: "colored"});
               }catch(err){
                   err.response.data.msg  &&  toast.error(`${err.response.data.msg}`, {theme: "colored"});
               }
            }
            activationEmail()
        }
    },[activation_token])
    return (
        <div className="active_page">
         <h1> {activation_token }</h1>  
        </div>
    )
}
