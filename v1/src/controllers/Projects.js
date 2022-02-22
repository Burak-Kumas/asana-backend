const httpStatus = require("http-status");
const ProjectService = require("../services/Projects");

class Project {
  index(req, res) {
    ProjectService.list()
      .then((response) => {
        res.status(httpStatus.OK).send(response);
      })
      .catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
      });
  }

  create(req, res) {
    req.body.user_id = req.user;
    ProjectService.create(req.body)
      .then((response) => {
        res.status(httpStatus.CREATED).send(response);
      })
      .catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
      });
  }

  update(req, res) {
    if (!req.params?.id) {
      return res.status(httpStatus.BAD_REQUEST).send({
        message: "User ID is incorrect",
      });
    }
    ProjectService.update(req.params?.id, req.body)
      .then((updatedProject) => {
        res.status(httpStatus.OK).send(updatedProject);
      })
      .catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Modify Error" });
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
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Modify Error" });
      });
  }
}

module.exports = new Project();
