/**
 * Rutas para las operaciones de las cuentas:
 *  - Actualizar su informacion
 *  - Borrar su perfil (?)
 *  - Obtener sus productos
 *  - Obtener su lista de deseos
 */

const { authJwt } = require("../middleware");
const controller = require("../controllers/account.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/account/:username", 
    controller.getUserByUserName
  );

  app.put(
    "/account/:username",
    [authJwt.verifyToken],
    controller.updateUser
  )

  app.delete(
    "/account/:username",
    [authJwt.verifyToken],
    controller.deleteUser
  )

  app.get(
    "/account/:username/products/all",
    [authJwt.verifyToken],
    controller.getUserProducts
  )

  app.get(
    "/account/:username/products/wish",
    [authJwt.verifyToken],
    controller.getUserProducts
  )

};