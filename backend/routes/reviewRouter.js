const router = require('express').Router()
const reviewCtrl = require("../controllers/reviewCtrl")
const auth = require('../middleware/auth')
const authReviewer = require('../middleware/authReviewer')


router.get('/review',auth, authReviewer,reviewCtrl.getReviews );
router.get('/review/:reviewId',auth,authReviewer,reviewCtrl.getReview)
router.post('/review/:reviewId',auth,authReviewer, reviewCtrl.editReview );
router.put('/review/:reviewId',auth,authReviewer, reviewCtrl.editReview );

module.exports = router;
