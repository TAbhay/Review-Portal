const Users = require('../models/userModel')
const Projects = require('../models/projectModel')
const Reviews = require('../models/reviewModel')



const reviewCtrl = {

    getReviews: async (req,res) =>{
       try{
           const allReviews = await Reviews.find({review_by:req.user.id});
           res.status(200).json(allReviews);
       }
       catch(err){
           return res.status(500).json({message:"Some error occured  !! 3 "});
       }   
         
    },
    getReview: async (req,res) =>{
       try{
        const review = await Reviews.find({review_by:req.user.id,_id:req.params.reviewId});
        res.status(200).json(review);
       }
       catch(err){
           return res.status(500).json({message:"Some error occured !! 2"});
       }
       
    },
    editReview: async (req,res) =>{
       try{
             const { answer , comment , status } = req.body;
             const reviewUpdate = {
                 question:[{
                     Q1:answer.Q1,
                     Q2:answer.Q2,
                     Q3:answer.Q3,
                     Q4:answer.Q4,
                     Q5:answer.Q5,
                     Q6:answer.Q6,
                     Q7:answer.Q7,
                 }, 
                 ],
                 comment:comment,
                 status:status,
             }
             const result = Reviews.findOneAndUpdate({review_by:req.user.id,_id:req.params.reviewId},reviewUpdate);
             res.status(200).json(result); 
       }
       catch(err){
           console.log(err);
           console.log("ere")
           return res.status(500).json({message:err});
       }   
            
    },
    addReviewer: async (req, res) => {
        console.log("here")
        try{
            const reviewers = await Users.find({role:2});
            const projects  = await Projects.find({});
            res.json(reviewers.length);


        }
        catch(err){
            res.status(500).json({message:"Some error occured !! 3"});
        }
    },


}

module.exports = reviewCtrl;