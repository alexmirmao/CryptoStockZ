const db = require("../models");
const config = require("../../config/auth.config");
const { session } = require("../middleware");

const Product = db.product;

/**
 * Ejemplo de creacion de un producto
 * 
 * En la practica, esto llama a createProduct de sercives.
 */
exports.createProduct = (req, res) => {
    var products = req.boy;
    Product.bulkCreate({
        products
    })
    .then(() => {
        return res.status(200).send({ message: "Product(s) Created" });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });

};

/**
 * Ejemplo de actualizacion de un producto (revisar)
 */
exports.updateProduct = (req, res) => {
};

exports.getAllProducts = (req, res) => {
    Product.findAll()
        .then(products => {
            return res.status(200).send({ products: products });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};