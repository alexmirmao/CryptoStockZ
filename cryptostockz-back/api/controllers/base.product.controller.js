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
 * la originalidad del producto (original = false). Sin embargo, si se sabe que
 * se trata del dueño del producto y él conoce la empresa fabricante
 * (limitar posibilidades en el front: solo manufacturers registrados).
 * Cuando el manufacturer responsable de verificar el producto lo haga, se
 * cambiará original a true.
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
                    manufacturer: user.id
                }).then(() => {
                    return res.status(200).send("Original base product created.");
                });
            } else {
                // Si quien hace la peticion tiene otro rol
                // el producto queda pendiente de verificacion
                /// SE DEBERIA CREAR UN MECANISMO QUE AVISE AL MANUFACTURER
                /// DE QUE TIENE UN PRODUCTO PENDIENTE DE VERIFICAR
                BaseProduct.create({
                    name: req.body.name,
                    ean: req.body.ean,
                    sku: req.body.sku,
                    original: false,
                    owner: user.id,
                    manufacturer: req.body.manufacturer
                }).then(() => {
                    return res.status(200).send("Base product created. Needs confirmation from manufacrurer.");
                });
            }
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.getPendingBaseProducts = (req, res) => {

}

exports.verifyBaseProduct = (req, res) => {
    BaseProduct.findOne({
        where: {
            manufacturer: req.path.manufacturer_id,
            id: req.path.product_id
        }
    }).then( baseproduct => {
        baseproduct.update({
            original: true
        }).then( () => {
            return res.status(200).send("Product " + req.path.product_id + " verified.")
        })
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.getBaseProducts = (req, res) => {

};