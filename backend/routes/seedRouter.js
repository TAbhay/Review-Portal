const router = require('express').Router()
const seedingCtrl = require("../controllers/seedingCtrl")
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.get('/dataseeder',auth,authAdmin,seedingCtrl.dataSeeder );

module.exports = router;