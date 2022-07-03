const Users = require('../models/userModel')
const Projects = require('../models/projectModel')
const Reviews = require('../models/reviewModel')

const adminCtrl = {
     getResult : async (req,res) =>{
        console.log("here")
         const result = await Reviews.aggregate([
            {
                $lookup:{
                    from: "users",      
                    localField: "project_by",   
                    foreignField: "_id",
                    as: "user_info"         
                }
            },
            {   $unwind:"$user_info" },
            {
                $lookup:{
                    from: "users",    
                    localField: "review_by",   
                    foreignField: "_id", 
                    as: "reviewer_info"         
                }
            },
            {   $unwind:'$reviewer_info' },
              {
                $lookup:{
                    from: "projects",       
                    localField: "project",   
                    foreignField: "_id", 
                    as: "project_info"        
                }
            },
            {   $unwind:"$project_info" },
              { 
                    $group:{
                        
                            _id:{project_by:'$project_by',project:'$project',name:'$user_info.name',project_name:'$project_info.name'},
                            
                            reviews:{$push:{reviewer_id:'$review_by',reviewer_name:'$reviewer_info.email',answer:'$question',comment:'$comment',status:'$status'}}
                        
                    },
                    
                },
                {
                $group:{
                      _id:{user:"$_id.project_by",name:'$_id.name'},
                      
                      projects:{$push:'$$ROOT'}
                      }
                   },
                  
                {"$sort": {"_id": 1}}
            ]);
         console.log(result)
         res.json(result);
     }

}

module.exports = adminCtrl;