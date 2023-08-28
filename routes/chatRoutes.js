const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController')
const userAuthentication = require('../middleware/auth')


router.use(express.static("public"))

router.get('/',chatController.getChatPage);
router.post('/sendMessage',userAuthentication.authentication,chatController.sendMessage)
router.get('/getMessages/:param',chatController.getMessage)


module.exports=router;