const router = require('express').Router()
const reviewCtrl = require("../controllers/reviewCtrl")
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.get('/review',auth, reviewCtrl.getReviews );
router.get('/review/:reviewId',auth, reviewCtrl.getReview)
router.post('/review/:reviewId',auth, reviewCtrl.editReview );
router.put('/review/:reviewId',auth, reviewCtrl.editReview );

module.exports = router;
