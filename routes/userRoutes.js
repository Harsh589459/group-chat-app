const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')


router.use(express.static("public"))

router.get('/',userController.getSignupPage);
router.post('/signup',userController.postSignUp)

module.exports=router;