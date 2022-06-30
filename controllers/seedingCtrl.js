const Users = require('../models/userModel')
const Projects = require('../models/projectModel')
const Reviews = require('../models/reviewModel')
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const Fakerator = require("fakerator");
const fakerator = Fakerator();

const reviewers = [
    {   name:"test",  
       email:"email9@gmail.com", 
       password: bcrypt.hashSync('123456',12),
       role:2,
    },
    {  name:"test",
        email:"email10@gmail.com",
        password: bcrypt.hashSync('123456',12),
        role:2,
     },
     {  name:"test",
        email:"email11@gmail.com",
        password: bcrypt.hashSync('123456',12),
        role:2,
     },
     {  name:"test",
        email:"email12@gmail.com",
        password: bcrypt.hashSync('123456',12),
        role:2,
     },
     {   name:"test",  
       email:"email13@gmail.com", 
       password: bcrypt.hashSync('123456',12),
       role:2,
    },
    {  name:"test",
        email:"email6@gmail.com",
        password: bcrypt.hashSync('123456',12),
        role:2,
     },
     {  name:"test",
        email:"email7@gmail.com",
        password: bcrypt.hashSync('123456',12),
        role:2,
     },
     {  name:"test",
        email:"email8@gmail.com",
        password: bcrypt.hashSync('123456',12),
        role:2,
     },
] 
const users = [
    {
       name:"user1",
       email:"emailtsddsdfddsssdedst@gmail.com",
       password: bcrypt.hashSync('123456',10),
    },
    {
        name:"user1",
        email:"emailtfddsdsesdsdssdst21@gmail.com",
        password:  bcrypt.hashSync('123456',10),
    }
]
const getUsers = (size) => {
    
}
const seedingCtrl = {
    userSeeder: async(req,res)=>{
        try{
            const usersList = getUsers(5)
            const createdUsers = await Users.insertMany(users);
            res.json({message:"Inserted"})
        }   
        catch(err){
            
            res.status(500).json("Something Bad has happened1")
        }    
    },
    reviewerSeeder : async(req,res)=>{
        try{
            const createdUsers = await Users.insertMany(reviewers);
            res.json({message:"Inserted"})
        }
        catch(err){
            res.status(500).json("Something Bad has happened2")
        }
    },
    projectSeeder : async(req,res)=>{
        try{
            const users = await Users.find({role:0});
            const json = []
            users.map((user) =>{
                const project = {
                    name:user.name+"project"+Math.floor(Math.random()*100),
                    description:"this is a project",
                    project_by:user._id,
                }
                json.push(project)
            })
            const result = await Projects.insertMany(json);
            console.log("inserted")
            res.json({result})
        }
        catch(err){
            res.status(500).json("Something Bad has happened3")
        }
    },
    reviewSeeder : async(req,res)=>{
        try{
            const projects = await Projects.find({});
            const reviewers = await Users.find({role:2});
            console.log("here")
            const jsons = []
            projects.map((project) =>{
               const temp =  reviewers.sort(() => Math.random() - 0.5);
               
               for(var i=0;i<5;i++){
                    let  rev = {}
                    rev.project_by = project.project_by;
                    rev.review_by  = temp[i]._id;
                    rev.project    = project._id;
                    jsons.push(rev)
               }
            })
            const result = await Reviews.insertMany(jsons);
            res.json(result)
        }
        catch(err){
            console.log(err)
            res.status(500).json("Something Bad has happened")
        }
    },

}


module.exports = seedingCtrl;