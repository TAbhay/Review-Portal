const Users = require('../models/userModel')
const Projects = require('../models/projectModel')

const projectCtrl = {
   
    addProject : async (req,res) =>{
         try{
              console.log(req.user.id);
              const { name , description } = req.body;
              const project  = new Projects({
                   name:name,
                   description:description,
                   project_by:req.user.id,
              });
              const result = await project.save();
              res.status(200).json({message:result});
         }   
         catch(err){
             res.status(500).send({message:err.message});
         }      

    },
    getAllProjects : async (req,res) =>{
         try{
             const id = req.user.id;
             const result = await Projects.find({project_by:id});
             res.status(200).json({result:result});
         }
         catch(err){
          res.status(500).send({message:err.message}); 
         }
    },

    getProject : async (req,res) =>{
         try{
             const projectId = req.params.projectId;
             const result = await Projects.find({project_by:req.user.id,_id:projectId});
             res.status(200).json(result);
         }
         catch(err){
          res.status(500).send({message:err.message});
         }
    },
    editproject: async (req,res) =>{
        try{
           
        //    const result  = await Projects.findOneAndUpdate({project_by:req.user.id,_id:projectId},{

        //    });
        }
        catch(err){
          res.status(500).send({message:err.message});
        }
    },

//     deleteProject : async (req,res) =>{
//          try{

//          }
//          catch(err){
//           res.status(500).send({message:err.message});
//          }
//     },
    

}

module.exports = projectCtrl;