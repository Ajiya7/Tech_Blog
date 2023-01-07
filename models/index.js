const user = require("./user");
const posts = require("./posts");
const comments = require("./comments");

user.hasMany(posts, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

posts.belongsTo(user, {
  foreignKey: "user_id",
});

comments.belongsTo(user, {
  foreignKey: "user_id",
});

comments.belongsTo(posts, {
  foreignKey: "post_id",
});

user.hasMany(comments, {
  foreignKey: "user_id",
});

posts.hasMany(comments, {
  foreignKey: "post_id",
});

module.exports = { user, posts, comments };
