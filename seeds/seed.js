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

  const foods = [];
  for (const food of foodData) {
    const createdFood = await Food.create({
      ...food,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    foods.push(createdFood);
  }

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      food_id: foods[Math.floor(Math.random() * foods.length)].id,
    });
  }
  process.exit(0);
};

seedDatabase();
