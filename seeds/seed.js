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

  const food = await Food.bulkCreate(foodData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
