const db = require("../models");

const BaseProduct = db.base_product;
const User = db.user;


/**
 * Creacion de un producto base (fisico) en la BD.
 * 
 * Cuando es creado por un manufacturer, se da por hecho que es original
 * y es marcado como tal (original = true). Además, se registra que es 
 * propiedad de ese usuario (user.id) y que es de la empresa x (user.username).
 * 
 * Por otro lado, cuando es creado por un usuario base, no se puede garantizar
 * la originalidad del producto (original = false). Además, si se sabe que éste
 * es el dueño del producto (user.id) pero se desconoce la empresa fabricante 
 * (no se garantiza su originalidad), por lo que manufacturer queda vacio.
 * Cuando el manufacturer responsable de verificar el producto lo haga, se rellenará
 * este campo.
 */
exports.createBaseProduct = (req, res) => {
    User.findOne({
        where: {
            id: req.userId
        }
    }).then(user => {
        var authorities = [];
        user.getRoles().then(roles => {
            roles.forEach(element => {
                authorities.push(element.name);
            });

            // Si quien hace la peticion es manufacturer
            // el producto base se da de alta marcado como original
            if (authorities.includes("manufacturer")) {
                BaseProduct.create({
                    name: req.body.name,
                    ean: req.body.ean,
                    sku: req.body.sku,
                    original: true,
                    owner: user.id,
                    manufacturer: user.username
                }).then(() => {
                    return res.status(200).send("Original base product created.");
                });
            } else {
                BaseProduct.create({
                    name: req.body.name,
                    ean: req.body.ean,
                    sku: req.body.sku,
                    original: false,
                    owner: user.id,
                    manufacturer: " - "
                }).then(() => {
                    return res.status(200).send("Base product created. Needs confirmation from manufacrurer.");
                });
            }
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.getBaseProducts = (req, res) => {

};