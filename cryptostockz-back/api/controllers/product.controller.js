var _lodash = require('lodash');

const db = require("../models");
const { product } = require("../models");

const Product = db.product;
const BaseProduct = db.base_product;
const User = db.user;

const config = require('../../config/config');

const path = require('path');
const fs = require("fs");


/**
 * Insercion de un nuevo producto digital en la BD
 * 
 * En la practica, esta funcion es llamada desde el front cuando
 * se recibe el evento de que se ha creado el producto en la
 * Blockchain.
 * 
 * 
 * AÑADIR PRODUCT_BASE ID EN LA BLOCKCHAIN ?¿?¿
 */
exports.createProduct = (req, res) => {
    var digitalProduct = req.body;
    // Buscamos que exista el producto base en nuestra base de datos
    BaseProduct.findOne({
        where: {
            ean: digitalProduct.ean
        }
    }).then(base_product => {
        // Comprueba que existe el producto base en nuestra base de datos
        if (!base_product) {
            return res.status(200).send({ message: "Base Product does not exist." });
        }
        // Buscamos que el owner_address sea igual al valor de la cuenta de metamask guardada.
        User.findOne({
            where: {
                metamaskAccount: digitalProduct.owner_address
            }
        }).then(owner => {
            // Comprueba que existe la cuenta en nuestra base de datos
            if (!owner) {
                return res.status(200).send({ message: "Metamask account not match." });
            }

            Product.create({
                address: digitalProduct.address,
                owner_address: digitalProduct.owner_address,
                name: digitalProduct.name,
                ean: digitalProduct.ean,
                sku: digitalProduct.sku,
                numberOfTransactions: digitalProduct.numberTransactions,
                dna: digitalProduct.dna,
                level: digitalProduct.level
            }).then(product => {
                product.setBaseProductId(base_product);
                owner.addProducts(product);
                return res.status(200).send({ message: "Digital product " + product.address + " created." });
            });
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

/**
 * Ejemplo de actualizacion de un producto (revisar)
 */
exports.updateProductWithForm = (req, res) => {
    User.findOne({
        where: {
            id: req.userId
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({ message: "User Not Found." });
        }
        var digitalProduct = req.body;

        Product.update(digitalProduct, {
            where: {
                id: digitalProduct.productId
            }
        }).then(() => {
            return res.status(200).send({ message: "Digital product updated." });
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.getAllProducts = (req, res) => {
    Product.findAll().then(products => {
        return res.status(200).send({ products: products });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.getAllBaseProducts = (res) => {
    BaseProduct.findAll().then(products => {
        return res.status(200).send({ products: products })
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

exports.getProduct = (req, res) => {
    Product.findOne({
        where: {
            id: req.params.productId
        }
    }).then(product => {
        if (!product) {
            return res.status(404).send({ message: "Product Not Found" });
        }

        let productName = 'airmax';
        let adn = product.dna.toString();

        let imagesPath = config.env.PRODUCT_IMAGES;

        let fondo = fs.readFileSync(path.resolve(imagesPath + '/fondos/'+ adn.charAt(0)+'.png'),{ encoding: "base64" });
        let producto = fs.readFileSync(path.resolve(imagesPath + '/productos/' + productName + '/'+ (parseInt(adn.charAt(1)) % 5)+'.png'),{ encoding: "base64" });
        let accesorio = fs.readFileSync(path.resolve(imagesPath + '/accesorios/'+ adn.charAt(2)+'.png'),{ encoding: "base64" });

        return res.status(200).send({ 
            product: product, 
            images: [fondo,producto,accesorio]
        });

    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.searchProduct = (req, res) => {
    // Si no envían ningún parámetro devolvemos todos los productos base
    if (_lodash.isEmpty(req.body)) {
        this.getAllProducts(req, res);
    } else {
        if (!_lodash.isEmpty(req.body.manufacturerName) && !_lodash.isEmpty(req.body.productName)) {
            User.findAll({
                include: {
                    model: BaseProduct,
                    as: "BaseProducts"
                },
                where: {
                    name: req.body.manufacturerName,
                }
            }).then(users => {
                if (!users) {
                    return res.status(404).send({ message: "Manufacturer not found" });
                }
                // Recorremos el array de usuarios buscando el producto específico
                users.forEach(user => {
                    BaseProduct.findOne({
                        where: {
                            fk_userId: user.dataValues.id,
                            name: req.body.productName
                        }
                    }).then(product => {
                        if (!product) {
                            return res.status(404).send({ message: "This product does not belong to this manufacturer" });
                        }
                        return res.status(200).send({ message: product });
                    });
                });
            }).catch(err => {
                return res.status(500).send({ message: err.message });
            });
        } else {
            if (!_lodash.isEmpty(req.body.manufacturerName) && _lodash.isEmpty(req.body.productName)) {
                User.findAll({
                    include: {
                        model: BaseProduct,
                        as: "BaseProducts"
                    },
                    where: {
                        name: req.body.manufacturerName,
                    }
                }).then(users => {
                    if (!users) {
                        return res.status(404).send({ message: "Manufacturer not found" });
                    }
                    // Buscamos todos los productos de un manufacturer
                    users.forEach(user => {
                        BaseProduct.findAll({
                            where: {
                                fk_userId: user.dataValues.id
                            }
                        }).then(products => {
                            return res.status(200).send({ BaseProduct: products });
                        });
                    });
                }).catch(err => {
                    return res.status(500).send({ message: err.message });
                });
            } else if (_lodash.isEmpty(req.body.manufacturerName) && !_lodash.isEmpty(req.body.productName)) {
                BaseProduct.findOne({
                    where: {
                        name: req.body.productName
                    }
                }).then(product => {
                    return res.status(200).send({ BaseProduct: product });
                })
            } else {
                return res.status(500).send({ message: "Something was wrong, review your parameters." });
            }
        }
    }
}
