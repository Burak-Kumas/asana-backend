const Task = require("../models/Tasks");

const insert = (data) => {
  return new Task(data).save();
};
const list = (where) => {
  return Task.find(where || {})
    .populate({
      path: "user_id",
      select: "full_name email profile_image",
    })
    .populate({
      path: "project_id",
      select: "name",
    });
};

const modify = (id, data) => {
  return Task.findByIdAndUpdate(id, data, { new: true });
};
const remove = (id) => {
  return Task.findByIdAndDelete(id);
};

const findOne = (where) => {
  return Task.findOne(where);
};

module.exports = {
  insert,
  list,
  modify,
  remove,
  findOne
};
