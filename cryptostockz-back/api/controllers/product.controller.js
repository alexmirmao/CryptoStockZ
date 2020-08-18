const db = require("../models");
const config = require("../../config/auth.config");
const { session } = require("../middleware");

const Product = db.product;

/**
 * Ejemplo de creacion de un producto 
 */
exports.createProduct = (req, res) => {
    Product.create({
        owner_address: req.body.owner,
        level: 0
    })
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