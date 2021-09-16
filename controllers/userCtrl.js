const Users = require('../models/userModel')
const bcrypt = require("bcrypt")
const jwt = require ("jsonwebtoken")
const sendMail= require("./sendMail")
//const auth = require('../middleware/auth')

const {CLIENT_URL} = process.env

const userCtrl = {

    register:async (req,res) => {
        try{
            
            const {name,email,password} = req.body

            if(!validateEmail(email))

            return res.status(400).json({msg:"Invalid email format"})

            if(!name || !email || !password)
              return res.status(400).json({msg:'Please fill in all the fields'})
          //  console.log(req.body)
           


            const user = await Users.findOne({email})

            if(user) return res.status(400).json({msg:"Email already exists"})

            if(password.length<6)  return res.status(400).json({msg:"password must be 6 characters length"})
 
            const passwordHash = await bcrypt.hash(password,12)

            const newUser ={
                name,email,password:passwordHash
            }
           console.log(newUser);
           console.log(token)
            const activation_token = createActivationToken(newUser)

            const url = `${CLIENT_URL}/user/activate/${activation_token}`

            const info = await sendMail(email, url, "REGISTER")
            console.log(info);

            res.json({msg:"Resgistration done , please activate your account"})

        }catch(err){

            return res.status(500).json({msg:err.message})

        }

    },


    activateEmail: async(req,res) =>{

        try{

           const {activation_token} = req.body
           const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)
           //console.log(user)

           const {name, email, password} = user

           const check = await Users.findOne({email})

           if(check) return res.status(400).json({msg:"This email already exists"})


           const newUser = new Users({
               name,email,password
           })

           await newUser.save()

           res.json({msg:"Account activated"})

        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },

      
    login:async(req,res) =>{

        try {

            const {email,password} = req.body

            const user =await Users.findOne({email})
            if(!user) return res.status(500).json({msg:"This email does not exist"})
            
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg:"Password is incorrect"})

            const refresh_token = createRefreshToken({id:user._id})
            console.log({refresh_token})
            res.cookie('refreshtoken', refresh_token, {
             
                // httpOnly: true,
                 path: "/user/refresh_token",
                 maxAge:7*24*60*60*1000 // 7days,
                 


            })

            console.log(req.cookies)

           console.log("doneeeeee")
    

            res.json({msg:"Login success"})

        } catch (err) {

              return res.status(500).json({msg:err.message})
        }

    },


    getAccessToken: (req,res) =>{

        try{
            
            const rf_token = req.cookies.refreshtoken

            console.log({rf_token})
            
           if(!rf_token) return res.status(400).json({msg:'Please login'})

           jwt.verify(rf_token,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
              
            
              if(err)   return res.status(400).json({msg:'Please login'})

              const access_token = createAccessToken({id: user.id})
              console.log({access_token})
              console.log("here")
               res.json({access_token})
              
           })

        }catch(err){

            return res.status(500).json({msg:err.message})
        }
    },


    forgotPassword: async(req,res) =>{
        try{
           
            const {email} = req.body

            const user = await Users.findOne({email})
            console.log(email)
            if(!user) return res.status(400).json({msg:"This email does not exist"})
            
            const access_token =createAccessToken({id:user._id})

            const url = `${CLIENT_URL}/user/reset/${access_token}`

            const info = await sendMail(email, url, "RESET_PASSWORD")

            res.json({msg:"Password reset , check your email"})

        }catch(err){
            return res.status(500).json({msg:"Something wrong"})
        }
    },


    resetPassword:async(req,res) =>{

        try{
           
            const {password} = req.body

            console.log(password)

            const passwordHash = await bcrypt.hash(password, 12)
            
            console.log(req.user)

            await Users.findOneAndUpdate({_id:req.user.id},{
                password: passwordHash
            })

            res.json({msg:"Password changed"})

        }catch(err){

            return res.status(500).json({msg:err.message})
        }
    },


    getUserInfor:async(req,res) =>{

        try{
           console.log(req.user)
            const user = await Users.findById(req.user.id).select('-password')
           
            res.json(user)
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },


    getUsersAllInfor: async(req,res) =>{

        try{
           
           const users = await Users.find().select('-password')

           res.json(users)
        } catch(err){
            return res.status(500).json({msg:err.message})
        }
    },


    logout: async(req,res) =>{

        try{

             await res.clearCookie("refreshtoken" , {path:"/user/refresh_token"})
              return res.json({msg:'Logged out successfully'})
        }catch(err){

            return res.status(500).json({msg:err.message})
        }
    },


    updateUser:async (req,res) => {

        try{
              
            const {name,avatar} = req.body
            await Users.findOneAndUpdate({_id: req.user.id},{

                name , avatar
            })

            res.json({msg:"User updated"})

        }catch(err){

            return res.status(500).json({msg:err.message})
        }
    },


    updateUsersRole: async (req,res) => {

        try{
              
            const {role} = req.body
            await Users.findOneAndUpdate({_id: req.params.id},{

                role
            })

            res.json({msg:"User updated"})

        }catch(err){

            return res.status(500).json({msg:err.message})
        }
    },


    deleteUser: async(req,res) => {

        try{
              
           
            await Users.findByIdAndDelete(req.params.id)

            res.json({msg:"User deleted"})

        }catch(err){

            return res.status(500).json({msg:err.message})
        }
    },
  

}


   

function validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
}


const createActivationToken = (payload) => {

    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET,{expiresIn:"1d"})
}


const createAccessToken = (payload) => {

    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,{expiresIn:"2d"})
}


const createRefreshToken = (payload) => {

    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET ,{expiresIn:"7d"})
}

module.exports = userCtrl