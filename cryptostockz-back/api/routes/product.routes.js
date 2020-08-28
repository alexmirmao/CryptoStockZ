/**
 * Rutas para operaciones de los productos:
 *  - Registro de productos (solo manufacturers)
 *  - Modificacion de productos (solo manufacturers)
 *  - Busqueda de productos (solo usuarios registrados)
 *  - Marcar producto como fav/wish (solo usuarios registrados)
 */

const { authJwt } = require("../middleware");
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
        [authJwt.verifyToken, authJwt.isManufacturer],
        controller.createProduct
    );


    /**
     * Actualizacion de un producto existente.
     * Requiere comprobacion de rol y permisos.
     * Implica escritura en la blockchain (cryptostockz.service.js).
    */
    app.put(
        "/product/:productId",
        [authJwt.verifyToken, authJwt.isManufacturer],
        controller.updateProductWithForm
    )
    

    app.get("/product", controller.getAllProducts)

    app.get(
        "/product/search/:productName/:manufacturerName",
        controller.searchProduct
    )
};