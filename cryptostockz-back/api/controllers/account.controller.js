const db = require("../models");
const User = db.user;
const Product = db.product;
const Permissions = db.permissions;

const cryptostockzService = require("../services/cryptostockz.service");

// Operaciones para la gestion de los usuarios
exports.getUserByUserName = (req, res) => {
  User.findOne({
    where: {
      username: req.params.username
    },
    include: Permissions
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not Found." });
      }


      return res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        permission: user.permissions[0].name
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// Que informacion es actualizable por un usuario?
// - nombre
// - password
// - permisos
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

      if (req.body.permission) {
        Permissions.findOne({
          where: {
            name: req.body.permission
          }
        })
          .then(permission => {
            if (!permission) {
              return res.status(404).send({ message: "Invalid Permission." });
            }

            user.update({ name: req.body.name });
            user.setPermissions([permission.id]);

            return res.status(200).send({ message: "User Succesfully Updated." });
          });
      } else {
        user.update({ name: req.body.name });
        return res.status(200).send({ message: "User Succesfully Updated." });
      }
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

      /*var products = [];
      user.getUserProducts().then(products => {
        for (let i = 0; i < products.length; i++) {
          products.push(products[i].uniqueId);
        }
      });*/
      return res.status(200).send({ products: "User products" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.getUserWishList = (req, res) => {
  User.findOne({
    where: {
      id: req.userId
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not Found." });
      }

      return res.status(200).send({ message: "User wish list" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

/**
 * Necesita el address del usuario receptor y el address del producto
 */
exports.transferProduct = (req, res) => {
  User.findOne({
    where: {
      id: req.userId
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not Found." });
      }
      cryptostockzService.transferProduct("receiver","address")
        .then(result => {
          return res.status(200).send({ message: result });
        });
    })
    .catch(err => {
      return res.status(500).send({ message: err.message });
    });
}