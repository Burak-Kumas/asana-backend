const { insert, modify, list, remove } = require("../services/Sections");
const httpStatus = require("http-status");

const index = (req, res) => {
  if (!req?.params?.project_id)
    return res.status(httpStatus.BAD_REQUEST).send({ error: "Section getirilirken hata çıktı" });
  list({ project_id: req.params.project_id })
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
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
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Section Modify Error" });
    });
};

const deleteSection = (req, res) => {
  if (!req.params?.id) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: "User ID is incorrect",
    });
  }
  remove(req.params?.id, req.body)
    .then((deletedSection) => {
      if (!deletedSection) {
        return res.status(httpStatus.NOT_FOUND).send({
          message: "Kullanıcı Bulunamadı",
        });
      }
      res.status(httpStatus.OK).send(deletedSection);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Delete Section Error" });
    });
};

module.exports = {
  create,
  index,
  update,
  deleteSection,
};
