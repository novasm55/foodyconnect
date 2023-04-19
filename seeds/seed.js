const sequelize = require("../config/connection");
const { User, Comment, Food } = require("../models");

const userData = require("./userData.json");
const foodData = require("./foodData.json");
const commentData = require("./commentData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const comments = await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

  const food = await Comment.bulkCreate(foodData, {
    individualHooks: true,
    returning: true,
  });

  //   for (const project of projectData) {
  //     await Project.create({
  //       ...project,
  //       user_id: users[Math.floor(Math.random() * users.length)].id,
  //     });
  //   }

  process.exit(0);
};

seedDatabase();
