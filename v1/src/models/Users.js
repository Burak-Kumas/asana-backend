const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    name: String,
    password: String,
    email: {
      type: String,
      unique: true,
    },
    profile_image: String,
  },
  { versionKey: false, timestamps: true }
);
UserSchema.path("email").validate(async (email) => {
  const emailCount = await mongoose.models.user.countDocuments({ email });
  return !emailCount;
}, "Email already exists");

module.exports = mongoose.model("user", UserSchema);
