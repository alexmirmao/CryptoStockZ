/**
 * Rutas para operaciones de los productos:
 *  - Registro de productos base
 *          usuario basico -> no original
 *          manufacturer -> origianl
 *  - Modificacion de productos base (solo manufacturers)
 *  - Validacion de productos base (solo manufacturers)
 */

const { authJwt } = require("../middleware");
const controller = require("../controllers/base.product.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    /**
     * Subida un producto nuevo al sistema.
     * Requiere comprobacion de rol y permisos.
     * Implica escritura en la blockchain (cryptostockz.service.js)
     */
    app.post(
        "/base/product",
        [authJwt.verifyToken], //Crear nueva comprobacion isUserOrManu ?¿?¿
        controller.createBaseProduct
    );

    app.get(
        "/base/product",
        [authJwt.verifyToken],
        controller.getBaseProducts
    )
};