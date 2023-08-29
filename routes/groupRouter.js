const express = require("express");
const router = express.Router();
const groupController = require("../controllers/groupController");
const userAuthentication = require('../middleware/auth')

router.post("/createGroup", userAuthentication.authentication, groupController.createGroup);

router.post("/addToGroup", userAuthentication.authentication, groupController.addToGroup);

router.get("/getGroups", userAuthentication.authentication, groupController.getGroups);

module.exports = router;