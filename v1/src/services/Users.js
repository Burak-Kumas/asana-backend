const User = require("../models/Users");

const insert = (data) => {
  return new User(data).save();
};
const list = () => {
  return User.find({});
};

const loginUser = (loginData) => {
  return User.findOne(loginData);
};

const modify = (where, data) => {
  return User.findOneAndUpdate(where, data, { new: true });
};

const remove = (id) => {
  return User.findByIdAndDelete(id);
};

module.exports = {
  insert,
  list,
  loginUser,
  modify,
  remove,
};
