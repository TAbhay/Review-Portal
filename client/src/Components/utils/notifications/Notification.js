import React from 'react'
import "./notification.css"

export const showErrMsg = (msg) =>{
    console.log("msg",msg)
    return <div className="errMsg">{msg}</div>
}


export const showSuccessMsg = (msg) =>{
    return <div className="successMsg">{msg}</div>
}
