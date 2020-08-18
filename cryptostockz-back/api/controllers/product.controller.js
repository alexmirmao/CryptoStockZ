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
    Product.findOne({
        where: {
            uniqueIdentificator: req.body.id
        }
    })
    .then(product => {
        if (product){
            Product.update({
                level: 1
            })
            .success(() => {
                return res.status(400).send({ message: "Product Updated." });
            })
            .error((err) => {
                console.log(err);
                return res.status(404).send({ message: "Something went wrong." });
            })
        } else {
            return res.status(404).send({ message: "Product Not found." });
        }
    })
};

exports.getAllProducts = (req, res) => {
    Product.findAll()
    .then(products => {
        return res.status(200).send({products: products});
    });
};