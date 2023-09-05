const Sequelize = require("sequelize");
const sequelize = require('../util/database');

const Group = sequelize.define("groups",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    admin:{
        type:Sequelize.STRING,
        allowNull:false
    }
})
module.exports=Group;