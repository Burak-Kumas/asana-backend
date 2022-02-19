const { insert, modify, list, remove, findOne } = require("../services/Tasks");
const httpStatus = require("http-status");
//const mongoose = require("mongoose");

const index = (req, res) => {
  if (!req?.params?.project_id)
    return res.status(httpStatus.BAD_REQUEST).send({ error: "Task getirilirken hata çıktı" });
  list({ project_id: req.params.project_id })
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch(() => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "hata buraya düştü" });
    });
};

const create = (req, res) => {
  req.body.user_id = req.user;
  insert(req.body)
    .then((response) => {
      res.status(httpStatus.CREATED).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
};

const update = (req, res) => {
  if (!req.params?.id) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: "User ID is incorrect",
    });
  }
  modify(req.params?.id, req.body)
    .then((updatedDoc) => {
      res.status(httpStatus.OK).send(updatedDoc);
    })
    .catch(() => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Task Modify Error" });
    });
};

const deleteTask = (req, res) => {
  if (!req.params?.id) return res.status(httpStatus.BAD_REQUEST).send({ message: "User ID is incorrect" });
  remove(req.params?.id, req.body)
    .then((deletedTask) => {
      if (!deletedTask) {
        return res.status(httpStatus.NOT_FOUND).send({
          message: "Kullanıcı Bulunamadı",
        });
      }
      res.status(httpStatus.OK).send(deletedTask);
    })
    .catch(() => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Delete Task Error" });
    });
};

const makeComment = (req, res) => {
  findOne({ _id: req.params.id })
    .then((mainTask) => {
      if (!mainTask) return res.status(httpStatus.NOT_FOUND).send({ error: "Kayıt Bulunamadı" });
      const comment = {
        ...req.body,
        commented_ad: new Date(),
        user_id: req.user,
      };
      mainTask.comments.push(comment);
      mainTask
        .save()
        .then((updatedDoc) => {
          res.status(httpStatus.OK).send(updatedDoc);
        })
        .catch(() => {
          res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Comment Save Error" });
        });
    })
    .catch(() => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Comment Create Error" });
    });
};

const deleteComment = (req, res) => {
  findOne({ _id: req.params.id })
    .then((mainTask) => {
      if (!mainTask) return res.status(httpStatus.NOT_FOUND).send({ error: "Kayıt Bulunamadı" });

      mainTask.comments = mainTask.comments.filter((c) => c._id?.toString() !== req.params.commentId);
      mainTask
        .save()
        .then((updatedDoc) => {
          res.status(httpStatus.OK).send(updatedDoc);
        })
        .catch(() => {
          res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Comment Save Error" });
        });
    })
    .catch(() => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Comment Create Error" });
    });
};

const addSubTask = (req, res) => {
  if (!req.params.id)
    return res.status(httpStatus.BAD_REQUEST).send({
      message: "User ID is incorrect",
    });
  findOne({ _id: req.params.id })
    .then((mainTask) => {
      if (!mainTask) return res.status(httpStatus.NOT_FOUND).send({ error: "Not Found" });
      insert({ ...req.body, user_id: req.user })
        .then((subTask) => {
          mainTask.sub_tasks.push(subTask);
          mainTask
            .save()
            .then((updatedDoc) => {
              res.status(httpStatus.OK).send(updatedDoc);
            })
            .catch(() => {
              res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Sub Task Save Error" });
            });
        })
        .catch((err) => {
          res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
        });
    })
    .catch(() => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Sub Task Create Error" });
    });
};
const showTask = (req, res) => {
  if (!req.params.id) return res.status(httpStatus.BAD_REQUEST).send({ error: "User ID is incorrect" });
  findOne({ _id: req.params.id }, true)
    .then((task) => {
      if (!task) return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Task Not Found" });
      res.status(httpStatus.OK).send(task);
    })
    .catch(() => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Show Task Not Found" });
    });
};
module.exports = {
  create,
  index,
  update,
  deleteTask,
  makeComment,
  deleteComment,
  addSubTask,
  showTask,
};
