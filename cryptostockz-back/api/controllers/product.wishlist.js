var _lodash = require('lodash');

const db = require("../models");
const { product } = require("../models");

const Product = db.product;
const User = db.user;

const config = require('../../config/config');

const path = require('path');
const fs = require("fs");


getImages = (adn,level,productId) => {
    if(adn === "0"){
        adn = "0000";
    }

    let imagesPath = config.env.PRODUCT_IMAGES;


    let fondo = fs.readFileSync(path.resolve(imagesPath + '/fondos/'+ level +'.png'),{ encoding: "base64" });
    let emoji = fs.readFileSync(path.resolve(imagesPath + '/emojis/'+ adn.charAt(0) +'.png'),{ encoding: "base64" });
    let producto = fs.readFileSync(path.resolve(imagesPath + '/productos/' + productId + '/'+ (parseInt(adn.charAt(1)) % 5)+'.png'),{ encoding: "base64" });
    let accesorio = fs.readFileSync(path.resolve(imagesPath + '/accesorios/'+ (parseInt(adn.charAt(2)+''+ adn.charAt(3))%20)+'.png'),{ encoding: "base64" });
    
    return [fondo,producto,accesorio,emoji];
}

/**
 * Insercion de un nuevo producto en la lista de deseos de un usuario
 * 
 * Implementadas añadir, borrar y ver todos los productos deseados
 * 
 */

exports.addProductToWishtlist = (req, res) => {
    User.findOne({
        where: {
            id: req.userId
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({ message: "User Not Found." });
        }

        var productId = req.params.productId

        const product = await Product.findOne({where: {id: productId}});
        console.log(product.level);
        product.level++;
        product.save();

        console.log(product.level);

        user.addProducts([productId]).then(() => {
            return res.status(200).send({ message: "Product added to wishlist." });
        });

    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.delProductToWishtlist = (req, res) => {
    User.findOne({
        where: {
            id: req.userId
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({ message: "User Not Found." });
        }
        var productId = req.params.productId;

        const product = await Product.findOne({where: {id: productId}});
        console.log(product.level);
        product.level--;
        product.save();

        console.log(product.level);

        user.removeProducts([productId]).then(() => {
            return res.status(200).send({ message: "Product deleted from wishlist." });
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};


exports.getUserWishList = (req, res) => {

    User.findOne({
        where: {
            username: req.params.username
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({ message: "User Not Found." });
        }
        user.getProducts().then((products) => {

            products.forEach((product) => {
                let productId =  product.base_productId;
                let adn = product.dna.toString();
                let level = product.level;

                product.dataValues.images = getImages(adn, level, productId);
            });
            return res.status(200).send({ products: products });
        });

    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.checkProductInWish = (req,res) => {
    User.findOne({
        where: {
            id: req.userId
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({ message: "User Not Found." });
        }
        user.getProducts({
            where: {
                id: req.params.productId
            }
        }).then((product) => {
            return res.status(200).send({ products: product });
        });

    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};