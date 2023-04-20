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

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

Food.hasMany(Comment, {
  foreignKey: "food_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Food, {
  foreignKey: "food_id",
});

module.exports = { User, Food, Comment };
