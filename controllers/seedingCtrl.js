const Users = require('../models/userModel')
const Projects = require('../models/projectModel')
const Reviews = require('../models/reviewModel')
const bcrypt = require("bcrypt")


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
       email:"emailtest@gmail.com",
       password:bcrypt.hashSync('123456',12),
    },
    {
        name:"user1",
        email:"emailtest21@gmail.com",
        password:bcrypt.hashSync('123456',12),
    }
]
const seedingCtrl = {
    userSeeder: async(req,res)=>{
        try{
            const createdUsers = await Users.insertMany(users);
            res.json({message:"Inserted"})
        }   
        catch(err){
            res.status(500).json("Something Bad has happened")
        }    
    },
    reviewerSeeder : async(req,res)=>{
        try{
            const createdUsers = await Users.insertMany(reviewers);
            res.json({message:"Inserted"})
        }
        catch(err){
            res.status(500).json("Something Bad has happened")
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
            res.status(500).json("Something Bad has happened")
        }
    },
    reviewSeeder : async(req,res)=>{
        try{
            res.json({message:"true"});
        }
        catch(err){
            res.status(500).json("Something Bad has happened")
        }
    },

}

module.exports = seedingCtrl;