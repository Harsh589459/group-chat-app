const path = require("path");
const User = require("../models/userModels");
const Group = require("../models/groupModel")
const UserGroup = require("../models/userGroup");
const { Op } = require("sequelize");

exports.createGroup = async (req, res, next) => {
  try {
    const groupName = req.body.groupName;
    const admin = req.user.name;
    const members = req.body.members;

    // Create the group and await its creation
    const group = await Group.create({ name: groupName, admin: admin });

    const invitedMembers = await User.findAll({
      where: {
        email: {
          [Op.or]: members,
        },
      },
    });

    await Promise.all(
      invitedMembers.map(async (user) => {
        await UserGroup.create({
          isadmin: false,
          userId: user.dataValues.id,
          groupId: group.dataValues.id,
        });
      })
    );

    // Create a user group for the admin
    
    const rs=await UserGroup.create({
      isAdmin: true,
      userId: req.user.id,
      groupId: group.dataValues.id,
    });
    console.log("res>>>>>>>>>>>>>>>",rs);

    res.status(201).json({ group: group.dataValues.name, members: members });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "An error occurred" });
  }
};


exports.addToGroup = async (req, res, next) => {
  try {
    const groupName = req.body.groupName;
    const members = req.body.members;
    console.log(req.body.groupName)

    const group = await Group.findOne({ where: { name: groupName } });
    console.log(">>>>>>>>>>>>>',",group)
    if (group) {
      const admin = await UserGroup.findOne({
        where: {
          [Op.and]: [{ isadmin: 1 }, { groupId: group.id }],
        },
      });
      if (admin.userId == req.user.id) {
        const invitedMembers = await User.findAll({
          where: {
            email: {
              [Op.or]: members,
            },
          },
        });

        await Promise.all(
          invitedMembers.map(async (user) => {
            const response = await UserGroup.create({
              isadmin: false,
              userId: user.dataValues.id,
              groupId: group.dataValues.id,
            });
          })
        );
        res.status(201).json({ message: "Members Added Successfully!" });
      } else {
        res.status(201).json({ message: "Only Admins Can Add New Members" });
      }
    } else {
      res.status(201).json({ message: "Group doesn't exists!" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getGroups = async (req, res, next) => {
  try {
    const groups = await Group.findAll({
      attributes: ["name", "admin"],
      include: [
        {
          model: UserGroup,
          where: { userId: req.user.id },
        },
      ],
    });
    res.status(200).json({ groups: groups });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteFromGroup = async (req, res, next) => {
  try {
    const groupName = req.body.groupName;
    const members = req.body.members;

    const group = await Group.findOne({ where: { name: groupName } });
    if (group) {
      const admin = await UserGroup.findOne({
        where: {
          [Op.and]: [{ isadmin: 1 }, { groupId: group.id }],
        },
      });
      if (admin.userId == req.user.id) {
        const invitedMembers = await User.findAll({
          where: {
            email: {
              [Op.or]: members,
            },
          },
        });

        await Promise.all(
          invitedMembers.map(async (user) => {
            const response = await UserGroup.destroy({
              where: {
                [Op.and]: [
                  {
                    isadmin: false,
                    userId: user.dataValues.id,
                    groupId: group.dataValues.id,
                  },
                ],
              },
            });
          })
        );
        res.status(201).json({ message: "Members Deleted Successfully!" });
      } else {
        res.status(201).json({ message: "Only Admins Can Delete Members" });
      }
    } else {
      res.status(201).json({ message: "Group doesn't exists!" });
    }
  } catch (error) {
    console.log(error);
  }
};


exports.groupMembers = async (req, res, next) => {
  try {
    const groupName = req.params.groupName;
    const group = await Group.findOne({ where: { name: groupName } });
    const userGroup = await UserGroup.findAll({
      where: { groupId: group.dataValues.id },
    });

    const users = [];

    await Promise.all(
      userGroup.map(async (user) => {
        const res = await User.findOne({
          where: { id: user.dataValues.userId },
        });
        users.push(res);
      })
    );
    res.status(200).json({ users: users });
  } catch (error) {
    console.log(error);
  }
};