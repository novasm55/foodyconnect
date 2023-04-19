const User = require("./Users");
const Food = require("./FoodPost");
const Comment = require("./Comment");

User.hasMany(Food, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Food.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

Food.hasMany(Comment, {
  foreignKey: "food_id",
  onDelete: "CASCADE",
});

module.exports = { User, Food, Comment };
