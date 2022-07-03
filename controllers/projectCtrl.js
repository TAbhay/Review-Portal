const Users = require('../models/userModel')
const Projects = require('../models/projectModel')

const projectCtrl = {

    addProject: async (req, res) => {
        try {
            //   console.log(req.user.id);
            const { name, description ,tag_one , tag_two } = req.body;
            const project = new Projects({
                name: name,
                description: description,
                project_by: req.user.id,
                tag_one:tag_one,
                tag_two:tag_two,
            });
            const result = await project.save();
            res.status(200).json({ result: result });
        }
        catch (err) {
            res.status(500).send({ message: err.message });
        }

    },
    getAllProjects: async (req, res) => {
        try {
            const id = req.user.id;
            const result = await Projects.find({ project_by: id });
            res.status(200).json({ result: result });
        }
        catch (err) {
            res.status(500).send({ message: err.message });
        }
    },

    getProject: async (req, res) => {
        try {
            const projectId = req.params.projectId;
            const result = await Projects.find({ project_by: req.user.id, _id: projectId });
            res.status(200).json(result);
        }
        catch (err) {
            res.status(500).send({ message: err.message });
        }
    },
    editproject: async (req, res) => {
        try {
            const { name, description , tag_one , tag_two} = req.body;
            console.log(tag_one,tag_two)
            const result = await Projects.findOneAndUpdate({ project_by: req.user.id, _id: req.params.projectId }, { name: name, description: description , tag_one: tag_one, tag_two: tag_two}, { new: true });
            console.log(result)
            res.status(200).json({ result: result });
        }
        catch (err) {
            res.status(500).send({ message: err.message });
        }
    },
    submitproject: async (req, res) => {
        try {
            console.log("sub pro")
            const projectStatus = await Projects.find({ project_by: req.user.id, _id: projectId });
            if(projectStatus.submitted === 1){
                console.log("hre")
                res.json({result:"Already submitted for review"})
                return
            }
            const result = await Projects.findOneAndUpdate({ project_by: req.user.id, _id: req.params.projectId }, { submitted:1}, { new: true });
            console.log(result)
            const reviewers = await Users.find({role:2});
            const jsons = []
            const temp =  reviewers.sort(() => Math.random() - 0.5);  
            for(var i=0;i<2;i++){
                    let  rev = {}
                    rev.project_by = project.project_by;
                    rev.review_by  = temp[i]._id;
                    rev.project    = project._id;
                    jsons.push(rev)
               }
            const submitReview = await Reviews.insertMany(jsons);
            cosole.log(submitReview)
            res.status(200).json({ result: "Submitted for review" });
        }
        catch (err) {
            res.status(500).send({ message: err.message });
        }
    },
    deleteproject: async (req, res) => {

        try {

            await Projects.findByIdAndDelete({ project_by: req.user.id, _id: req.params.projectId })

            res.json({ msg: { _id: req.params.projectId } })

        } catch (err) {

            return res.status(500).json({ msg: err.message })
        }
    },


}

module.exports = projectCtrl;