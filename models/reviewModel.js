const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({

    project_by:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'Users',
    },
    project:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'Projects',
    },
    review_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
    },
    question:[
        {
          Q1:String,
          Q2:String,
          Q3:Boolean,
          Q4:Boolean,
          Q5:Boolean,
          Q6:Number,
          Q7:Number,
        }],
    comment:{
        type:String,
        default:"",
        trim:true,
    },
    status:{
        type:Number,
        default:0,
    }  

},{

    timestamps: true
})

module.exports = mongoose.model("Reviews", reviewSchema)