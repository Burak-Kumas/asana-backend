const mongoose = require("mongoose");
const logger = require("../scripts/logger/Tasks");

const TaskSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    assigned_to: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    due_date: Date,
    statuses: [String],
    section_id: {
      type: mongoose.Types.ObjectId,
      ref: "section",
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    project_id: {
      type: mongoose.Types.ObjectId,
      ref: "project",
    },
    order: Number,
    isCompleted: Boolean,
    comments: [
      {
        comment: String,
        commented_at: Date,
       
        user_id: {
          type: mongoose.Types.ObjectId,
          ref: "user",
        },
      },
    ],
    media: [
      {
        file: String,
        user_id: {
          type: mongoose.Types.ObjectId,
          ref: "user",
        },
      },
    ],
    sub_tasks: [
      {
        type: mongoose.Types.ObjectId,
        ref: "task",
      },
    ],
  },

  { versionKey: false, timestamps: true }
);

TaskSchema.post("save", (doc) => {
  logger.log({
    level: "info",
    message: doc,
  });
});
module.exports = mongoose.model("task", TaskSchema);
