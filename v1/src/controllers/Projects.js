const httpStatus = require("http-status");
const ProjectService = require("../services/Projects");
const ApiError = require("../errors/errors");
class Project {
  index(req, res) {
    ProjectService.list()
      .then((response) => {
        res.status(httpStatus.OK).send(response);
      })
      .catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
      });
  }

  create(req, res) {
    req.body.user_id = req.user;
    ProjectService.create(req.body)
      .then((response) => {
        res.status(httpStatus.CREATED).send(response);
      })
      .catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
      });
  }

  update(req, res, next) {
    if (!req.params?.id) {
      return res.status(httpStatus.BAD_REQUEST).send({
        message: "User ID is incorrect",
      });
    }
    ProjectService.update(req.params?.id, req.body)
      .then((updatedProject) => {
        if (!updatedProject) return next(new ApiError("Böyle Bir kayıt bulunmamaktadır.", 404));
        res.status(httpStatus.OK).send(updatedProject);
      })
      .catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
      });
  }

  deleteProject(req, res) {
    if (!req.params?.id) {
      return res.status(httpStatus.BAD_REQUEST).send({
        message: "User ID is incorrect",
      });
    }
    ProjectService.delete(req.params?.id, req.body)
      .then((deletedProject) => {
        if (!deletedProject) {
          return res.status(httpStatus.NOT_FOUND).send({
            message: "Kullanıcı Bulunamadı",
          });
        }
        res.status(httpStatus.OK).send(deletedProject);
      })
      .catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
      });
  }
}

module.exports = new Project();
