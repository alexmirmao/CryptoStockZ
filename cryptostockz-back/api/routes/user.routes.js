const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/user/:username", 
    controller.getUserByUserName
  );

  app.put(
    "/user/:username",
    [authJwt.verifyToken],
    controller.updateUser
  )

  app.delete(
    "/user/:username",
    [authJwt.verifyToken],
    controller.deleteUser
  )

  app.get(
    "/user/:username/products/all",
    [authJwt.verifyToken],
    controller.getUserProducts
  )

  app.get(
    "/user/:username/products/wish",
    [authJwt.verifyToken],
    controller.getUserProducts
  )

};