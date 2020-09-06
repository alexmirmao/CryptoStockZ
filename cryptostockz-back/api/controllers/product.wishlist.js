var _lodash = require('lodash');

const db = require("../models");
const { product } = require("../models");

const Product = db.product;
const User = db.user;

const config = require('../../config/config');

const path = require('path');
const fs = require("fs");




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

            // TODO: Llamar a función con productos más imagen
            return res.status(200).send({ message: products });
        });
  
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
  };