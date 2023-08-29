const express = require('express')
const app = express();
const cors = require('cors');
const fs = require('fs');

//import models
const User = require('./models/userModels')
const Chat = require('./models/chatModels')
const Group = require('./models/groupModel')
const UserGroup = require("./models/userGroup")

//routes imported
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const groupRouter = require("./routes/groupRouter");

//databse imported
const sequelize = require("./util/database");

const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(
    cors({
        origin: "*",
    })
);

User.hasMany(Chat, { onDelete: "CASCADE", hooks: true });
User.hasMany(Chat,{onDelete:"CASCADE",hooks:true})
Chat.belongsTo(User);
Chat.belongsTo(Group);

User.hasMany(UserGroup);

Group.hasMany(Chat);
Group.hasMany(UserGroup);

UserGroup.belongsTo(User);
UserGroup.belongsTo(Group);

app.use('/', userRoutes);
app.use('/user', userRoutes);
app.use("/group", groupRouter);
app.use('/chat', chatRoutes)




sequelize
    .sync()
    .then((result) => {
        app.listen(3000);
    })