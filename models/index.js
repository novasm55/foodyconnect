const Users = require("./Users");
const FoodPost = require("./FoodPost");
const Comment = require("./Comment");

Users.hasMany(FoodPost, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

FoodPost.belongsTo(Users, {
  foreignKey: "user_id",
});

Comment.belongsTo(Users, {
  foreignKey: "user_id",
});

FoodPost.hasMany(Comment, {
  foreignKey: "food_id",
  onDelete: "CASCADE",
});

module.exports = { Users, FoodPost, Comment };
