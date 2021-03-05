const express = require('express');
const router = express.Router()
const userRouter = require('./userRouter');
const googleSignInController = require('../controllers/googleController')
const authenticate = require('../middlewares/auth');
const { route } = require('./userRouter');
const News = require('../controllers/api-controller');

router.post('/googleLogin', googleSignInController.handleGoogleLogin)
router.use('/user', userRouter)
router.use(authenticate)
router.get('/standings/pR', News.standingsPr)
router.get('/standings/sA', News.standingsSa)
router.get('/standings/lL', News.standingsLl)

module.exports = router