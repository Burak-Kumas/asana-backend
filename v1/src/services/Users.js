const User = require("../models/Users");

const insert = (data) => {
  const user = new User(data);
  return user.save();
};
const list = () => {
  return User.find({});
};

const loginUser = (loginData) => {
  return User.findOne(loginData);
};
module.exports = {
  insert,
  list,
  loginUser,
};
