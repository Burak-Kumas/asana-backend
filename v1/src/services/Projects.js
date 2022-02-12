const Project = require("../models/Projects");

const insert = (data) => {
  const project = new Project(data);
  return project.save();
};
const list = (where) => {
  return Project.find(where || {}).populate({
    path: "user_id",
    select: "full_name email profile_image",
  });
};

const modify = (id, data) => {
  return Project.findByIdAndUpdate(id, data, { new: true });
};
const remove = (id) => {
  return Project.findByIdAndDelete(id);
};

module.exports = {
  insert,
  list,
  modify,
  remove
};
