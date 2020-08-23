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
        if (!user) {
            return res.status(404).send({ message: "User Not Found." });
        }

        var authorities = [];
        user.getRoles().then(roles => {
            roles.forEach(element => {
                authorities.push(element.name);
            });

            // Si quien hace la peticion es manufacturer
            // el producto base se da de alta marcado como original
            // además, tiene la posibilidad de dar de alta varios productos
            // de una sola vez.
            if (authorities.includes("manufacturer")) {
                var baseproducts = req.body;
                console.log(req.userId);
                baseproducts.forEach(baseproduct => {
                    BaseProduct.create({
                        name: baseproduct.name,
                        ean: baseproduct.ean,
                        sku: baseproduct.sku,
                        original: true,
                        owner: req.userId
                    }).then(baseproduct => {
                        baseproduct.setManufacturer(user);
                        user.setBaseProducts(baseproduct);
                    });
                });

                return res.status(200).send({ message: "Original base product created." });
            } else {
                // Si quien hace la peticion tiene otro rol
                // el producto queda pendiente de verificacion
                /// SE DEBERIA CREAR UN MECANISMO QUE AVISE AL MANUFACTURER
                /// DE QUE TIENE UN PRODUCTO PENDIENTE DE VERIFICAR

                User.findOne({
                    where: {
                        username: req.body.manufacturer
                    }
                }).then(manufacturer => {
                    if (!manufacturer) {
                        return res.status(404).send({ message: "Manufacturer Not Found." });
                    }

                    BaseProduct.create({
                        name: req.body.name,
                        ean: req.body.ean,
                        sku: req.body.sku,
                        original: false
                    }).then(baseproduct => {
                        user.setBaseProducts(baseproduct);
                        baseproduct.setManufacturer(manufacturer);
                        return res.status(200).send({ message: "Base product created. Needs confirmation from manufacrurer." });
                    });
                });
            }
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

/**
 * Debe cambiar el campo "original" del producto a true
 */
exports.verifyBaseProduct = (req, res) => {
    BaseProduct.findOne({
        where: {
            manufacturer: req.path.manufacturer_id,
            id: req.path.product_id
        }
    }).then(baseproduct => {
        baseproduct.update({
            original: true
        }).then(() => {
            return res.status(200).send("Product " + req.path.product_id + " verified.")
        })
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

/**
 * Debe devolver los productos de un manufacturer que tienen
 * campo original a falso 
 */
exports.getPendingBaseProducts = (req, res) => {
    User.findOne({
        where: {
            id: req.userId
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not Found." });
            }

            return res.status(200).send({ message: "Manufacturer pending products" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

/**
 * Debe devolver todos los productos base de un usuario
 */
exports.getBaseProducts = (req, res) => {
    User.findOne({
        where: {
            id: req.userId
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not Found." });
            }

            return res.status(200).send({ message: "User base products" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.test = (req, res) => {
    BaseProduct.findAll({
        where: {
            fk_manufacturer: req.userId
        }
    }).then(baseproduct => {
        console.log(req.userId);
        return res.status(200).send({message: baseproduct});
    });/*
    User.findOne({
        where: {
            id: req.userId
        }
    }).then(user => {
        var bps = [];
        user.getBaseProducts().then(baseproducts => {
            
            baseproducts.forEach(baseproduct => {
                console.log(baseproduct);
                bps.push(baseproduct);
            });
            return res.status(200).send({ message: baseproducts });
        });
    });*/
}