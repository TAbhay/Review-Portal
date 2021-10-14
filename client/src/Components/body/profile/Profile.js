import React , {useState, useEffect} from 'react'
import axios from "axios"
import {useSelector, useDispatch} from "react-redux"
import {Link} from "react-router-dom"
import {isLength, isMatch} from "../../utils/validation/Validation"
import {showSuccessMsg,showErrMsg} from "../../utils/notifications/Notification"
import "./profile.css"
import {fetchAllUsers , dispatchGetAllUsers} from "../../../redux/actions/usersAction"



const initialState ={

    name:"",
    password:"",
    cf_password:"",
    err:'',
    success:"",
}

function Profile() {

    const auth =useSelector(state =>state.auth)
    const token= useSelector(state =>state.token)
    const users = useSelector(state => state.users)

    console.log(users)

    const {user, isAdmin} = auth
    const [data, setData] = useState(initialState)
    const [avatar, setAvatar] = useState(false)
    const [loading,setLoading] = useState(false)
    const [callback, setCallback] = useState(false)


    const {name,email,password,cf_password,err,success} = data
    const dispatch = useDispatch()
    useEffect(()=>{
        if(isAdmin){
            return fetchAllUsers(token).then(res =>{
                dispatch(dispatchGetAllUsers(res))

            })
        }

    },[token, isAdmin, dispatch,callback])

    const changeAvatar = async(e) => {

        e.preventDefault()

        try{

            const file = e.target.files[0]

            if(!file) return setData({...data, err:"No file uploaded", success:""})

            if(file.size > 1024*1024) return setData({...data, err:"file is too large", success:""})

            if(file.type !== "image/jpeg" && file.type !=="image/png") return setData({...data, err:"invalid format" , success:""})

            let formData = new FormData()

            formData.append("file",file)

            setLoading(true)
            const res = await axios.post('/api/upload_avatar',formData,{
                headers: {"content-type":"multipart/form-data", Authorization:token}
            })

            setLoading(false)
            setAvatar(res.data.url)

        }catch(err){

            setData({...data, err:err.response.data.msg, success:""})



        }
    }



    const handleChange = e =>{

        const {name, value} = e.target
        setData({...data, [name]:value, err:'', success:''})


    }



    const updatePassword = () => {

        if(isLength(password))
            return setData({...data,err:'Password must be at least 6 characters length', success:''})
        

        if(!isMatch(password,cf_password))
            return setData({...data,err:"Password does not match", success:""})


        try{

           axios.post('/user/reset',{
              password
           },{
               headers: {Authorization : token}
           })

           setData({...data, err:"", success:'Updated successfully'})
       
       
        } catch(err){

            setData({...data, err: err.response.data.msg, success:""})
        }


    }



    const updateInfor = () => {

        try{

           axios.patch('/user/update',{
               name: name ? name : user.name,
               avatar: avatar ? avatar : user.avatar,

           },{
               headers: {Authorization : token}
           })

           setData({...data, err:"", success:'Updated successfully'})
       
       
        } catch(err){

            setData({...data, err: err.response.data.msg, success:""})
        }


    }




    const handleUpdate = () => {

        if(name || avatar) updateInfor()
        if(password) updatePassword()

    }




    return (
        <>
        <div>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            {loading && <h3>Loading...</h3>}

        </div>

        <div className="profile_page">
            <div className="col-left">
                  <h2>{isAdmin ? "Admin Profile" : "UserProfile"}  </h2>

                  <div className="avatar">




                       <img src= {avatar ? avatar : user.avatar} alt="" />

                       <span>
                       <i className="fas fa-camera"></i>
                       <p>Change</p>
                       <input type="file" name="file" id="file_up" onChange={changeAvatar}/>
                       </span>

                  </div>
            

                  <div className="form_group">
                     <label htmlFor="name">Name</label>
                     <input type="text" name="name" 
                     placeholder="Enter name" value={name} defaultValue={user.name} onChange={handleChange}/>

                  </div>


                  <div className="form_group">
                     <label htmlFor="email">Email</label>
                     <input type="email" name="email" 
                     placeholder="Enter email" value={email} defaultValue={user.email} disabled/>

                  </div>


                  <div className="form_group">
                     <label htmlFor="password">new Password</label>
                     <input type="password" name="password" 
                     placeholder="Enter Password" value={password} onChange={handleChange} />

                </div>

                  <div className="form_group">
                     <label htmlFor="cf_password">Confirm Password</label>
                     <input type="password" name="cf_password" 
                     placeholder="Confirm Password" value={cf_password} onChange={handleChange} />

                  </div>

                  <div>
                      <em>
                          *if you update your password here you will not able to login with google or facebook.
                      </em>
                  </div>

                  <button disabled={loading} onClick={handleUpdate}>Update</button>
            </div>
            <div className="col-right">

                <h2>{isAdmin ? "Users" : "MyOrders"} </h2>

                    <div  style={{overFlowX:"auto"}}>
                        <table className="customers">
                            <thead>
                               <tr>
                                   <th>ID</th>
                                   <th>Name</th>
                                   <th>Email</th>
                                   <th>Admin</th>
                                   <th>Action</th>

                               </tr>



                            </thead>

                            <tbody>
                                {
                                   users.map(user => {

                                        <tr key={user._id}>

                                             <td>{user._id}</td>
                                 
                                             <td>{user.name}</td>
                                            
                                             <td>{user.email}</td>
                                             
                                             <td>{
                                                 
                                                 user.role === 1
                                                 ? <i className="fas fa-check" title="Admin"></i>
                                                 : <i className='fas fa-times' title="User"></i>
                                                 
                                                 }
                                                 
                                            </td>

                                            <td>

                                                  <Link to={"/edit_user/"+ user._id}>
                                                      <i className="fas fa-edit" title="Edit"></i>
                                                  </Link>
                                                  <i className="fas fa-trash-alt" title="Remove"></i>
                                            </td>
                                             
                                             <td>Action</td>

                                        </tr>

                                   })

                                }

                                   


                            </tbody>

                        </table>


                    </div>


            </div>
        </div>
        
    </>
    )
}


export default Profile
