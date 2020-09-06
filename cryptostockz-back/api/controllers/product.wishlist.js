var _lodash = require('lodash');

const db = require("../models");
const { product } = require("../models");

const Product = db.product;
const User = db.user;

const config = require('../../config/config');

const path = require('path');
const fs = require("fs");


getImages = (adn,productName) => {
    if(adn === "0"){
        adn = "0000";
    }

    let imagesPath = config.env.PRODUCT_IMAGES;

    let fondo = fs.readFileSync(path.resolve(imagesPath + '/fondos/'+ adn.charAt(0)+'.png'),{ encoding: "base64" });
    let producto = fs.readFileSync(path.resolve(imagesPath + '/productos/' + productName + '/'+ (parseInt(adn.charAt(1)) % 5)+'.png'),{ encoding: "base64" });
    let accesorio = fs.readFileSync(path.resolve(imagesPath + '/accesorios/'+ adn.charAt(2)+'.png'),{ encoding: "base64" });
    
    return [fondo,producto,accesorio];
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
        var digitalProduct = req.body;
        user.addProducts([parseInt(digitalProduct.productId)]).then(() => {
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
        var digitalProduct = req.body;
        user.removeProducts([parseInt(digitalProduct.productId)]).then(() => {
            return res.status(200).send({ message: "Product deleted to wishlist." });
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
                let productName = 'airmax';
                let adn = product.dna.toString();
    
                product.dataValues.images = getImages(adn,productName);
            });

            // TODO: Llamar a función con productos más imagen
            return res.status(200).send({ products: products });
        });
  
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
  };