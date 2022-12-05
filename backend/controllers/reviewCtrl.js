const Users = require('../models/userModel')
const Projects = require('../models/projectModel')
const Reviews = require('../models/reviewModel')



const reviewCtrl = {

    getReviews: async (req,res) =>{
       try{
        //    console.log(req.user.id)
           const allReviews = await Reviews.find({review_by:req.user.id}).populate('project',{'name':1,'description':1,'tag_one':1,'tag_two':1}).populate('project_by').select(['-password','-email','-avatar']).select(['-comment','-question','-review_by']);
           for(var i = 0 ; i < allReviews.length ; i++){
                    allReviews[i].project_by.password = null;
                    allReviews[i].project_by.email = null;
           }
           res.status(200).json(allReviews);
       }
       catch(err){
      
           return res.status(500).json({message:"Some error occured  !! 3 "});
       }   
         
    },
    getReview: async (req,res) =>{
       try{
        const review = await Reviews.find({review_by:req.user.id,_id:req.params.reviewId}).populate('project').populate('project_by').select(['-password','-email','-avatar']);
       
        review[0].project_by.password = null;
        review[0].project_by.email = null;
        res.status(200).json(review);
       }
       catch(err){
            // console.log(err)
           return res.status(500).json({message:"Some error occured !! 2"});
       }
       
    },
    editReview: async (req,res) =>{
       try{
             const { question , comment , status } = req.body;
             const reviewUpdate = {
                 question:question,
                 comment:comment,
                 status:status || 0,
             }
             const result = await Reviews.findOneAndUpdate({review_by:req.user.id,_id:req.params.reviewId},reviewUpdate,{new:true}).populate('project').populate('project_by').select(['-password','-email','-avatar']);;
             for(var i = 0 ; i < result.length ; i++){
                result[i].project_by.password = null;
                result[i].project_by.email = null;
             }
             res.status(200).json(result); 
       }
       catch(err){
           return res.status(500).json({message:err});
       }   
            
    },
}

module.exports = reviewCtrl;