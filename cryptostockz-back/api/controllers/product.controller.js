const db = require("../models");
const { product } = require("../models");

const Product = db.product;
const BaseProduct = db.base_product;
const User = db.user;


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
<<<<<<< HEAD
                name: digitalProduct.baseProductName
=======
                metamaskAccount: digitalProduct.owner_address
>>>>>>> 46a29bc5acd94ff6e3a1d911a5853b2214ee8fac
            }
        }).then(owner => {
            // Comprueba que existe la cuenta en nuestra base de datos
            if (!owner) {
                return res.status(200).send({ message: "Metamask account not match." });
            }
<<<<<<< HEAD
            // Buscamos que el owner_address sea igual al valor de la cuenta de metamask guardada.
            User.findOne({
                where: {
                    metamaskAccount: digitalProduct.owner_address
                }
            }).then(metamask_account => {
                // Comprueba que existe la cuenta en nuestra base de datos
                if (!metamask_account) {
                    return res.status(200).send({ message: "Metamask account not match." });
                }
                Product.create({
                    address: digitalProduct.address,
                    owner_address: digitalProduct.owner_address,
                    level: digitalProduct.level,
                    baseProductId: base_product.dataValues.id,
                    userId: metamask_account.dataValues.id
                }).then(product => {
                    //product.setOwner(metamask_account);
                    return res.status(200).send({ message: "Digital product created." });
                });
=======

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
>>>>>>> 46a29bc5acd94ff6e3a1d911a5853b2214ee8fac
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


exports.searchProduct = (req, res) => {
    // Buscamos todos los productos que tiene el manufacturer
    User.findAll({
        include: {
            model: BaseProduct,
            as: "BaseProducts"
        },
        where: {
            name: req.params.manufacturerName,
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
                    name: req.params.productName
                }
            }).then(product => {
                if (!product) {
                    return res.status(404).send({ message: "This product does not belong to this manufacturer" });
                }
                return res.status(200).send({ message: product });
            });
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}
