const Sequelize = require("sequelize");
const sequelize = require('../util/database');

const UserGroup = sequelize.define("UserGroup",{
    id:{
        type:Sequelize.INTEGER,
        autoincrement:true,
        // allowNull:false,
        primaryKey:true,
    },
    isAdmin:{
        type:Sequelize.BOOLEAN,
        defaultValue:false,
    }
})

module.exports=UserGroup;