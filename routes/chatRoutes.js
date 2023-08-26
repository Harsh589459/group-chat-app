const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController')


router.use(express.static("public"))

router.get('/',chatController.getChatPage);


module.exports=router;