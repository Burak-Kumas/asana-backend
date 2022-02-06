const mongoose = require("mongoose");
const logger = require("../scripts/logger/Projects");
const ProjectSchema = new mongoose.Schema(
  {
    name: String,
    // user_id: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "user"
    // }
  },
  { versionKey: false, timestamps: true }
);

// ProjectSchema.pre("save", (next, doc) => {
//   console.log("öncesi", doc);
//   next();
// });
ProjectSchema.post("save", (doc) => {
  logger.log({
    level: "info",
    message: doc,
  });
});
module.exports = mongoose.model("project", ProjectSchema);
