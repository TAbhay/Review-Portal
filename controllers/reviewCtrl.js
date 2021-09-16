const Users = require('../models/userModel')
const Projects = require('../models/projectModel')
const Reviews = require('../models/reviewModel')



const reviewCtrl = {

    getReviews: async (req,res) =>{
       try{
           console.log(req.user.id)
           const allReviews = await Reviews.find({review_by:req.user.id});
           console.log(allReviews)
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
             const { question , comment , status } = req.body;
             console.log(req.body);
            
             const reviewUpdate = {
                 question:question,
                 comment:comment,
                 status:status,
             }
             const result = await Reviews.findOneAndUpdate({review_by:req.user.id,_id:req.params.reviewId},reviewUpdate,{new:true});
             res.status(200).json(result); 
       }
       catch(err){
           console.log(err);
           console.log("ere")
           return res.status(500).json({message:err});
       }   
            
    },
}

module.exports = reviewCtrl;