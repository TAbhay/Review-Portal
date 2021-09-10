const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({  
    name:{
        type:String,
        required:[true,"Please enter project name"],
        trim :true

    },
    project_by:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'Users',
    },
    description:{
        type:String,
        trim:true,
    },
    is_deadline:{
        type:Number,
        default:0
    }
},{

    timestamps: true
})

module.exports = mongoose.model("Projects", projectSchema)