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
         "Q1":Number,
        },
        {
        "Q2":Number,
        },
        {
        "Q3":Number,
        },
        {
        "Q4":Number,
        },
        {
        "Q5":Number,
        },
        {
        "Q6":Number,
        },
        {
        "Q7":Number,
        },
    ],

},{

    timestamps: true
})

module.exports = mongoose.model("Reviews", reviewSchema)