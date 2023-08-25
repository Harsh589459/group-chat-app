const Sequelize = require('sequelize');

const sequelize = new Sequelize('chat-application','root','',{
    dialect:'mysql',
    host:'localhost',
    
})

module.exports=sequelize;