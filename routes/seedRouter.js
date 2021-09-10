const router = require('express').Router()
const seedingCtrl = require("../controllers/seedingCtrl")
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.get('/userseeder',auth,authAdmin,seedingCtrl.userSeeder );
router.get('/reviewerseeder',auth,authAdmin,seedingCtrl.reviewerSeeder);
router.get('/projectseeder',auth, authAdmin,seedingCtrl.projectSeeder);
router.get('/reviewseeder',auth,authAdmin,seedingCtrl.reviewSeeder );


module.exports = router;