const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/cryptostockz.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/product",
        [authJwt.verifyToken, authJwt.isManufacturer],
        controller.createProduct
    );

    app.put(
        "/product/:productId",
        [authJwt.verifyToken, authJwt.isManufacturer],
        controller.updateProductWithForm
    )
};