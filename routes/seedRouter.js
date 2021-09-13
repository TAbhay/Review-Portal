const router = require('express').Router()
const seedingCtrl = require("../controllers/seedingCtrl")
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.get('/userseeder',seedingCtrl.userSeeder );
router.get('/reviewerseeder',seedingCtrl.reviewerSeeder);
router.get('/projectseeder',seedingCtrl.projectSeeder);
router.get('/reviewseeder',seedingCtrl.reviewSeeder );


module.exports = router;