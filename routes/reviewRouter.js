const router = require('express').Router()
const projectCtrl = require("../controllers/projectCtrl")
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.get('/review',auth, projectCtrl.getAllProjects );
router.get('/review/:reviewId',auth, projectCtrl.getProject)
router.post('/review/:reviewId',auth, projectCtrl.editproject );
router.put('/review/:reviewId',auth, projectCtrl.editproject );

module.exports = router;