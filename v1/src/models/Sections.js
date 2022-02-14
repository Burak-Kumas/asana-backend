const mongoose = require("mongoose");
const logger = require("../scripts/logger/Sections");

const SectionSchema = new mongoose.Schema(
  {
    name: String,
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    project_id: {
      type: mongoose.Types.ObjectId,
      ref: "project",
    },
    order: Number,
  },

  { versionKey: false, timestamps: true }
);

SectionSchema.post("save", (doc) => {
  logger.log({
    level: "info",
    message: doc,
  });
});
module.exports = mongoose.model("section", SectionSchema);
