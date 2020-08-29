const { authJwt } = require("../middleware");
const controller = require("../controllers/views.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get(
    "/api/test/man",
    [authJwt.verifyToken, authJwt.isManufacturer],
    controller.manufacturerBoard
  );

  app.get(
    "/api/test/seller",
    [authJwt.verifyToken, authJwt.isSeller],
    controller.sellerBoard
  );

  app.post(
    "/api/setStorage",
    controller.setStorage
  );

  app.post(
    "/api/createProduct",
    controller.createProduct
  );

  app.get(
    "/api/getProduct",
    controller.getProducts
  );
};