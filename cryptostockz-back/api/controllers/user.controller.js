const db = require("../models");
const User = db.user;
const Product = db.product;

// Operaciones para la gestion de los usuarios
exports.getUserByUserName = (req, res) => {
  User.findOne({
    where: {
      username: req.params.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not Found." });
      }

      return res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateUser = (req, res) => {
  User.findOne({
    where: {
      username: req.params.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not Found." });
      }

      return res.status(200).send({ message: "User Succesfully Updated." });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.deleteUser = (req, res) => {
  User.destroy({
    where: {
      username: req.params.username
    }
  })
    .then(rowDeleted => { // rowDeleted will return number of rows deleted
      if (rowDeleted !== 1) {
        return res.status(404).send({ message: "User Not Found." });
      }

      return res.status(200).send({ message: "User Succesfully Deleted." });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.getUserProducts = (req, res) => {
  User.findOne({
    where: {
      username: req.params.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not Found." });
      }

      var products = [];
      user.getUserProducts().then(products => {
        for (let i = 0; i < products.length; i++) {
          products.push(products[i].uniqueId);
        }
      });
      return res.status(200).send({products: products});
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};