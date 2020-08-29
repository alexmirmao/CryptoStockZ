const { session } = require("../middleware")
const cryptostockzService = require("../services/cryptostockz.service");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
  
exports.userBoard = (req, res) => {
  res.status(200).send("User Content." + session.getUserId(req, res));
};
  
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
  
exports.manufacturerBoard = (req, res) => {
  res.status(200).send("Manufacturer Content.");
};

exports.sellerBoard = (req, res) => {
  res.status(200).send("Seller Content.");
};

exports.setStorage = (req, res) => {
  cryptostockzService.setStorage(req.body.storageAddress, req.body.cryptostockzAddress).then( result => {
    return res.status(200).send(result);
  })
};

exports.createProduct = (req, res) => {
  cryptostockzService.createProduct(
    req.body.ean,
    req.body.sku,
    req.body.name).then( result => {
    return res.status(200).send(result);
  })
};

exports.getProducts = (req, res) => {
  cryptostockzService.getProducts().then( result => {
    return res.status(200).send(result);
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};