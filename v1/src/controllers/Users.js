const { passwordToHash, generateAccessToken, generateRefreshToken } = require("../scripts/utils/helper");
const httpStatus = require("http-status");
const uuid = require("uuid");
const eventEmitter = require("../scripts/events/eventEmitter");
const path = require("path");
const Service = require("../services/Users");
const UserService = new Service();
const ProjectsService = require("../services/Projects");
const ProjectService = new ProjectsService();

const index = (req, res) => {
  UserService.list()
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
};

const create = (req, res) => {
  req.body.password = passwordToHash(req.body.password);
  UserService.create(req.body)
    .then((response) => {
      res.status(httpStatus.CREATED).send(response);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
};

const login = (req, res) => {
  req.body.password = passwordToHash(req.body.password);
  UserService.findOne(req.body)
    .then((user) => {
      if (!user)
        return res.status(httpStatus.NOT_FOUND).send({
          message: "User Not Found",
        });
      user = {
        ...user.toObject(),
        tokens: {
          access_token: generateAccessToken(user),
          refresh_token: generateRefreshToken(user),
        },
      };
      delete user.password;
      res.status(httpStatus.OK).send(user);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

const projectList = (req, res) => {
  ProjectService.list({ user_id: req.user?._id })
    .then((projects) => {
      res.status(httpStatus.OK).send(projects);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: "Proje Listesi Getirilirken Hata Çıktı",
      });
    });
};

const resetPassword = (req, res) => {
  const new_password = uuid.v4()?.split("-")[0] || new Date().getTime();
  UserService.updateWhere({ email: req.body.email }, { password: passwordToHash(new_password) })
    .then((updatedUser) => {
      if (!updatedUser) return res.status(httpStatus.NOT_FOUND).send({ error: "Kullanıcı bulunamadı" });
      eventEmitter.emit("send_email", {
        to: updatedUser.email,
        subject: "Şifre Sıfırlama",
        html: `<b>Şifre Sıfırlama işlemi gerçekleşti<br> Yeni Şifreniz: ${new_password}</b>`,
      });
      res.status(httpStatus.OK).send({
        message: "Şifre sıfırlama için gerekli bilgileri mail adrsinize gönderdik",
      });
    })
    .catch(() => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Şifre Resetleme sırasında hata çıktı" });
    });
};

const update = (req, res) => {
  UserService.update({ _id: req.user?._id }, req.body)
    .then((updatedUser) => {
      res.status(httpStatus.OK).send(updatedUser);
    })
    .catch(() => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Güncelleme işlemi sırasında bir hata çıktı" });
    });
};

const changePassword = (req, res) => {
  req.body.password = passwordToHash(req.body.password);
  UserService.updateWhere({ _id: req.user?._id }, req.body)
    .then((updatedUser) => {
      res.status(httpStatus.OK).send(updatedUser);
    })
    .catch(() => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Şifre Güncelleme işlemi sırasında bir hata çıktı" });
    });
};

const deleteUser = (req, res) => {
  if (!req.params?.id) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: "User ID is incorrect",
    });
  }
  UserService.delete(req.params?.id)
    .then((deletedUser) => {
      if (!deletedUser) {
        return res.status(httpStatus.NOT_FOUND).send({
          message: "Kullanıcı Bulunamadı",
        });
      }
      res.status(httpStatus.OK).send(deletedUser);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Kayıt Silinirken Hata Çıktı" });
    });
};

const updateProfilImage = (req, res) => {
  if (!req?.files?.profile_image) return res.status(httpStatus.BAD_REQUEST).send({ error: "Görsel bulunamamaktadır." });
  const extension = path.extname(req.files.profile_image.name);
  const fileName = `${req?.user._id}${extension}`;
  const folderPath = path.join(__dirname, "../", "uploads/users", fileName);
  req.files.profile_image.mv(folderPath, function (err) {
    if (err) return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: err });
    UserService.update(req.user._id, { profile_image: fileName })
      .then((updatedUser) => {
        res.status(httpStatus.OK).send(updatedUser);
      })
      .catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
          error: "upload işlemi başarılı fakat güncelleme işleminda hata oluştu",
        });
      });
  });
};

module.exports = {
  create,
  index,
  login,
  projectList,
  resetPassword,
  update,
  deleteUser,
  changePassword,
  updateProfilImage,
};
