const Users = require('../models/userModel')
const Projects = require('../models/projectModel')
const Reviews = require('../models/reviewModel')
const bcrypt = require("bcrypt")


const users = [
    {   name:"Ramesh",  
       email:"ramesh@gmail.com", 
       password: bcrypt.hashSync('123456',12),
       role:2,
    },
    {  name:"Suresh",
        email:"suresh@gmail.com",
        password: bcrypt.hashSync('123456',12),
        role:2,
     },
     {  name:"Mahesh",
        email:"mahesh@gmail.com",
        password: bcrypt.hashSync('123456',12),
        role:2,
     },
     {  name:"Sarvesh",
        email:"sarvesh@gmail.com",
        password: bcrypt.hashSync('123456',12),
        role:2,
     },
     {   name:"Dongersh",  
       email:"dongersh@gmail.com", 
       password: bcrypt.hashSync('123456',12),
       role:2,
    },
    {  name:"Mayank",
        email:"mayank@gmail.com",
        password: bcrypt.hashSync('123456',12),
        role:2,
     },
     {  name:"Ajeet",
        email:"ajeet@gmail.com",
        password: bcrypt.hashSync('123456',12),
        role:2,
     },
     {  name:"No one",
        email:"noonw@gmail.com",
        password: bcrypt.hashSync('123456',12),
        role:2,
     },
     {
        name:"Abhay Tiwari",
        email:"tiwari@gmail.com",
        password: bcrypt.hashSync('123456',10),
     },
     {
         name:"Pushkar Maurya",
         email:"mourya@gmail.com",
         password:  bcrypt.hashSync('123456',10),
     },
     {
         name:"Hero",
         email:"hero@gmail.com",
         password: bcrypt.hashSync('123456',10),
      },
      {
          name:"You Know",
          email:"youknow@gmail.com",
          password:  bcrypt.hashSync('123456',10),
      }
] 
const randomIntFromInterval = (min,max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
const ProjectName = ["","Travel Log App","Project Management Tool","Blog App","Shopify Clone","Book keeping app","Social Media App"]
const ProjectDescription = ["","This fullstack web application will allow people to share their travel experience to a community of other travellers using this application.","This project can help you gather all your learning projects in one app. You can use MongoDB database for storing all project details like project name, details, url link, github repository etc.","Create a blog application where users can Login/Signup to the application , Create articles , View list of all the articles","Shopify Clone application will have 2 seperate interfaces.A user facing application .An admin dashboard for managing products","This is an online library mamangement app where users can rent books for a specific time, like them and can also review books.","Social media app where people can connect with other people, view local handicrafts being created in the area, share their own creatings etc..."]
const seedingCtrl = {
    dataSeeder : async(req,res)=>{
        try{
            const createdUsersSeed = await Users.insertMany(users);
            const usersSeed = await Users.find({role:0});
            const json = []
           
            usersSeed.map((user) =>{
                const rndInt = Math.floor(Math.random() * 6) + 1
                const tech = ["Node","Mongodb",,"Python","React","Angular","SQL","C","Express"];
                const shuffled = [...tech].sort(() => 0.5 - Math.random());
                const tags = shuffled.slice(0,2)
                const project1 = {
                    name:ProjectName[randomIntFromInterval(1,6)],
                    description:ProjectDescription[randomIntFromInterval(1,6)],
                    tag_one:tech[randomIntFromInterval(0,8)],
                    tag_two:tech[randomIntFromInterval(0,8)],
                    project_by:user._id,
                }
                const project2 = {
                    name:ProjectName[randomIntFromInterval(1,6)],
                    description:ProjectDescription[randomIntFromInterval(1,6)],
                    tag_one:tech[randomIntFromInterval(0,8)],
                    tag_two:tech[randomIntFromInterval(0,8)],
                    project_by:user._id,
                }
                const project3 = {
                    name:ProjectName[randomIntFromInterval(1,6)],
                    description:ProjectDescription[randomIntFromInterval(1,6)],
                    tag_one:tech[randomIntFromInterval(0,8)],
                    tag_two:tech[randomIntFromInterval(0,8)],
                    project_by:user._id,
                }
                const project4 = {
                    name:ProjectName[randomIntFromInterval(1,6)],
                    description:ProjectDescription[randomIntFromInterval(1,6)],
                    tag_one:tech[randomIntFromInterval(0,8)],
                    tag_two:tech[randomIntFromInterval(0,8)],
                    project_by:user._id,
                }
                json.push(project1)
                json.push(project2)
                json.push(project3)
                json.push(project4)
            })
            const insertedProjects = await Projects.insertMany(json);
            const projects = await Projects.find({});
            const reviewers = await Users.find({role:2});
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
            res.status(200).json("Seeded")
        }
        catch(err){
         
            res.status(500).json("Something Bad has happened")
        }
    },

}


module.exports = seedingCtrl;