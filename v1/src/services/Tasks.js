const BaseService = require("./BaseService");
const BaseModel = require("../models/Tasks");
class TaskService extends BaseService {
  constructor() {
    super(BaseModel);
  }
  list(where) {
    return BaseModel.find(where || {})
      .populate({
        path: "user_id",
        select: "full_name email profile_image",
      })
      .populate({
        path: "project_id",
        select: "name",
      });
  }
  findOne(where, expand) {
    if (!expand) return BaseModel.findOne(where);
    return BaseModel.findOne(where).populate([
      {
        path: "user_id",
        select: "full_name email profile_image",
      },
      {
        path: "comments",
        populate: {
          path: "user_id",
          select: "full_name email profile_image",
        },
      },

      {
        path: "sub_tasks",
        select: "title description assigned_to isCompleted due_date sub_tasks order statuses",
      },
    ]);
  }
}
module.exports = new TaskService();
