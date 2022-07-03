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
          Q1:{type:String,default:"fcvc"},
          Q2:{type:String,default:"bg"},
          Q3:{type:Boolean,default:0},
          Q4:{type:Boolean,default:0},
          Q5:{type:Boolean,default:0},
          Q6:{type:Number,default:0},
          Q7:{type:Number,default:0},
          Q8:{type:Number,default:0},
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