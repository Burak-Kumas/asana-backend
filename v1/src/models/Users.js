const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    name: String,
    password: String,
    email: String,
    profile_image: String,
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
