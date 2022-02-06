const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    name: String,
    // user_id: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "user"
    // }
  },
  { versionKey: false, timestamps:true}
);

module.exports = mongoose.model("project", ProjectSchema);
