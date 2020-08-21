const db = require("../models");
const Product = db.product;

const cryptostockzService = require("../services/cryptostockz.service");


/**
 * Ejemplo de creacion de un producto
 * 
 * En la practica, esto llama a createProduct de sercives.
 */
exports.createProduct = (req, res) => {
    var products = req.body;
    Product.bulkCreate({
        products
    })
    .then(() => {
        /*cryptostockzService.createProduct().then(result => {
            
        })*/
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