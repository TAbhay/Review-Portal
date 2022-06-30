import React , {useState} from 'react'
import axios from "axios"
import {useSelector} from "react-redux"
import {isLength, isMatch} from "../../utils/validation/Validation"
import {showSuccessMsg,showErrMsg} from "../../utils/notifications/Notification"
import "./profile.css"




// const initialState ={

//     name:"",
//     password:"",
//     cf_password:"",
//     err:'',
//     success:"",
// }

const Profile = () => {

    // const auth =useSelector(state =>state.auth)
    // const token= useSelector(state =>state.token)
    // const users = useSelector(state => state.users)
 
    // console.log(users,token,auth,"users token auth")

    // const {user, isAdmin} = auth
    // const [data, setData] = useState(initialState)
    // const [avatar, setAvatar] = useState(false)
    // const [loading,setLoading] = useState(false)


    // const {name,email,password,cf_password,err,success} = data
  

    // const changeAvatar = async(e) => {

    //     e.preventDefault()

    //     try{

    //         const file = e.target.files[0]

    //         if(!file) return setData({...data, err:"No file uploaded", success:""})

    //         if(file.size > 1024*1024) return setData({...data, err:"file is too large", success:""})

    //         if(file.type !== "image/jpeg" && file.type !=="image/png") return setData({...data, err:"invalid format" , success:""})

    //         let formData = new FormData()

    //         formData.append("file",file)

    //         setLoading(true)
    //         const res = await axios.post('/api/upload_avatar',formData,{
    //             headers: {"content-type":"multipart/form-data", Authorization:token}
    //         })

    //         setLoading(false)
    //         setAvatar(res.data.url)

    //     }catch(err){

    //         setData({...data, err:err.response.data.msg, success:""})



    //     }
    // }



    // const handleChange = e =>{

    //     const {name, value} = e.target
    //     setData({...data, [name]:value, err:'', success:''})


    // }



    // const updatePassword = () => {

    //     if(isLength(password))
    //         return setData({...data,err:'Password must be at least 6 characters length', success:''})
        

    //     if(!isMatch(password,cf_password))
    //         return setData({...data,err:"Password does not match", success:""})


    //     try{

    //        axios.post('/user/reset',{
    //           password
    //        },{
    //            headers: {Authorization : token}
    //        })

    //        setData({...data, err:"", success:'Updated successfully'})
       
       
    //     } catch(err){

    //         setData({...data, err: err.response.data.msg, success:""})
    //     }


    // }



    // const updateInfor = () => {

    //     try{

    //        axios.patch('/user/update',{
    //            name: name ? name : user.name,
    //            avatar: avatar ? avatar : user.avatar,

    //        },{
    //            headers: {Authorization : token}
    //        })

    //        setData({...data, err:"", success:'Updated successfully'})
       
       
    //     } catch(err){

    //         setData({...data, err: err.response.data.msg, success:""})
    //     }


    // }




    // const handleUpdate = () => {

    //     if(name || avatar) updateInfor()
    //     if(password) updatePassword()

    // }




    return (
        <>
        <h1>Profile</h1>
        {/* <div>
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
                  <button style={{backgroundColor: '#39CCCC', color: 'white', fontSize: '16px', padding: '6px 40px', borderRadius: '5px', margin: '10px 0px', cursor: 'pointer'}}disabled={loading} onClick={handleUpdate}>Update</button>
            </div>
        </div> */}
        
    </>
    )
}


export default Profile