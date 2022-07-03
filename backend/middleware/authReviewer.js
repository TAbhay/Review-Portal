const Users =  require('../models/userModel')

const authReviewer = async(req,res,next) => {

    try{

        const user = await Users.findOne({_id:req.user.id})

        if(user.role !== 2)

         return res.status(500).json({msg:"Reviewer resource, access denied"})

         next()

    } catch (err) {

        return res.status(500).json({msg:err.message})

    }
}

module.exports =  authReviewer