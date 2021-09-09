import React , {useState, useEffect} from 'react'
import {useParams , useHistory } from "react-router-dom"
import {useSelector} from  "react-redux"
import axios from "axios"
import {showSuccessMsg,showErrMsg} from "../../utils/notifications/Notification"

export default function EditUser() {
    const {id} = useParams()
    const history = useHistory()
    const [editUser,setEditUser] = useState([])

    const users = useSelector(state => state.users)
    const token = useSelector(state => state.token)

    const [checkAdmin , setCheckAdmin] = useState(false)
    const [err, setErr] = useState(false)
    const [success,setSuccess] = useState(false)
    const [num, setNum] = useState(0)

    return (
        <div>
            Edit User
        </div>
    )
}

