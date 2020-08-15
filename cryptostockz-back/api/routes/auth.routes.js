const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const uploadController = require("../controllers/image.controller");
const upload = require("../middleware/images");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/signin", controller.signin);

  app.post("/upload", upload.single("file"), uploadController.uploadFiles);
};