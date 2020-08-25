// cryptostockz.controller.js

const cryptostockzService = require('../services/cryptostockz.service');
const db = require("../models");

const Product = db.product;
const User = db.user;
const BaseProduct = db.base_product;


function getTest(req, res) {
  cryptostockzService.getTest().then((result) => {
    return res.status(200).json(result);
  }).catch((err) => {
    console.log(err);
    return res.status(401).json(err.toString());
  });
}

function createProduct(req, res) {
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
          // Comprobamos que sea manufacturer la persona que añade a la base de datos un producto digital
          if (authorities.includes("manufacturer")) {
              var digitalProduct = req.body;
              // console.log(req.userId);
              console.log(digitalProduct);
              // Buscamos que exista el producto base en nuestra base de datos
              BaseProduct.findOne({
                where: {
                  id: digitalProduct.baseProductId
                }
              }).then(base_product => {
                // Comprueba que existe el producto base en nuestra base de datos
                if(!base_product) {
                  return res.status(200).send({ message: "Base Product does not exist." });
                }else{
                  // Buscamos que el owner_address sea igual al valor de la cuenta de metamask guardada.
                  User.findOne({
                    where: {
                      metamaskAccount: digitalProduct.owner_address
                    }
                  }).then(metamask_account => {
                    // Comprueba que existe la cuenta en nuestra base de datos
                    if(!metamask_account){
                      return res.status(200).send({ message: "Metamask account not match." });
                    }else{
                      Product.create({
                        address: digitalProduct.address,
                        owner_address: digitalProduct.owner_address,
                        level: digitalProduct.level,
                        baseProductId: digitalProduct.baseProductId,
                        userId: metamask_account.dataValues.id
                      })
                      return res.status(200).send({ message: "Digital product created." });
                    }
                  })
                }
              })
          } else {
            return res.status(404).send({ message: "Need permissions." });
          }
      });
  }).catch(err => {
      res.status(500).send({ message: err.message });
  });
}


module.exports = {
  getTest,
  createProduct
};
