const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Please enter your name"],
        trim :true

    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
       
        unique:true

    },
    password:{
        type:String,
       // required:[true,"Please enter your password"],
       

    },

    role:{
        type:Number,
        default:0   // 0 user  // 1 reviewer  3 admin
    },

    avatar:{
        type:String,
        default:"https://res.cloudinary.com/abhay24/image/upload/v1656657236/images/tavy4acwnl8pt1ask2dg.jpg"
    },

},{

    timestamps: true
})

module.exports = mongoose.model("Users", userSchema)