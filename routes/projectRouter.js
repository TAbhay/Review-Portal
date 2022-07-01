const router = require('express').Router()
const projectCtrl = require("../controllers/projectCtrl")
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.get('/project',auth, projectCtrl.getAllProjects );
router.post('/project/add',auth, projectCtrl.addProject );
router.get('/project/:projectId',auth, projectCtrl.getProject);
router.put('/project/:projectId',auth, projectCtrl.editproject );

module.exports = router;