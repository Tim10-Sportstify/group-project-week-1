const express = require('express');
const router = express.Router()
const userRouter = require('./userRouter');
const googleSignInController = require('../controllers/googleController')

router.post('/googleLogin', googleSignInController.handleGoogleLogin)
router.use('/user', userRouter)

module.exports = router