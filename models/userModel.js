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
        default:"https://bibliosud.omekas.mind-and-go.net/files/large/17ea8760c7dc81909f032ce92d94e4f340b1585a.jpg"
    },

},{

    timestamps: true
})

module.exports = mongoose.model("Users", userSchema)