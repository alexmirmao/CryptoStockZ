const { verifySignUp } = require("../middleware");
const controller = require("../controllers/product.controller");

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
        "/product",
        [
            
        ],
        controller.createProduct
    );

    /**
     * Actualizacion de un producto existente.
     * Requiere comprobacion de rol y permisos.
     * Implica escritura en la blockchain (cryptostockz.service.js).
     */
    app.put(
        "/product",
        [],
        controller.updateProduct
    )
};