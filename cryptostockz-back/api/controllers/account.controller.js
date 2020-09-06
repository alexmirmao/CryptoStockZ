const db = require("../models");
const User = db.user;
const Role = db.role;
const Product = db.product;
const Permissions = db.permissions;

const cryptostockzService = require("../services/cryptostockz.service");

// Operaciones para la gestion de los usuarios
exports.getUserProfile = (req, res) => {
  User.findOne({
    where: {
      id: req.userId,
      username: req.params.username
    },
    include: Permissions
  }).then(user => {
    if (!user) {
      return res.status(404).send({ message: "User Not Found." });
    }

    return res.status(200).send({
      "user": {
        "userId": user.id,
        "name": user.name,
        "email": user.email,
        "username": user.username,
        "metamaskAccount": user.metamaskAccount,
        "level": user.level,
        "purchases": user.purchases,
        "sales": user.sales,
        "permissions": user.permissions[0].name
      }
    });
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};


exports.findUser = (req, res) => {
  User.findOne({
    where: {
      username: req.params.username
    },
    include: Permissions
  }).then(user => {
    if (!user) {
      return res.status(404).send({ message: "User Not Found." });
    }

    if (user.permissions[0].name === "public" || req.userId === user.id) {
      return res.status(200).send({
        "user": {
          "userId": user.id,
          "name": user.name,
          "email": user.email,
          "username": user.username,
          "metamaskAccount": user.metamaskAccount,
          "level": user.level,
          "purchases": user.purchases,
          "sales": user.sales,
          "permissions": user.permissions[0].name
        }
      });
    }

    return res.status(200).send({ message: "User account is private." });
  }).catch(err => {
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
      id: req.userId,
      username: req.params.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not Found." });
      }

      var newUser = req.body;

      if (newUser.permission) {
        Permissions.findOne({
          where: {
            name: newUser.permission
          }
        }).then(permission => {
          if (!permission) {
            return res.status(404).send({ message: "Invalid Permission." });
          }

          user.update(newUser);
          user.setPermissions([permission.id]);

          return res.status(200).send({ message: "User Succesfully Updated." });
        });
      } else {
        user.update(newUser);
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
      id: req.userId
    }
  }).then(user => {
    if (!user) {
      return res.status(404).send({ message: "User Not Found." });
    }

    user.getProducts().then(products => {
      return res.status(200).send({ products: products });
    });
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};


// exports.getUserWishList = (req, res) => {
//   User.findOne({
//     where: {
//       id: req.userId
//     }
//   })
//     .then(user => {
//       if (!user) {
//         return res.status(404).send({ message: "User Not Found." });
//       }

//       return res.status(200).send({ message: "User wish list" });
//     })
//     .catch(err => {
//       res.status(500).send({ message: err.message });
//     });
// };

/**
 * Recibe productId y username del receiver.
 * 
 * Requiere comprobar que quien hace la peticion de transferencia es el dueño 
 * del producto y que el producto exista, y que el receiver exista.
 */
exports.transferProduct = (req, res) => {
  User.findOne({
    where: {
      id: req.userId
    }
  }).then(sender => {
    if (!sender) {
      return res.status(404).send({ message: "User Not Found." });
    }

    sender.getProducts({
      where: {
        id: req.params.productId
      }
    }).then(product => {
      if (!product[0]) {
        return res.status(404).send({ message: "Product Not Found." });
      }

      User.findOne({
        where: {
          username: req.body.receiver
        }
      }).then(receiver => {
        if (!receiver) {
          return res.status(404).send({ message: "Receiver Not Found." });
        }

        cryptostockzService.transferProduct(
          sender.metamaskAccount,
          receiver.metamaskAccount,
          product[0].address
        ).then(result => {
          receiver.addProducts(product[0]);
          return res.status(200).send({ message: result });
        }).catch(error => {
          console.log(error);
        });
      });
    });
  }).catch(err => {
    return res.status(500).send({ message: err.message });
  });
}

exports.getManufacturers = (req, res) => {
  User.findAll({
    include: {
      model: Role,
      where: {
        id: 3
      }
    },
  }).then(user => {
    return res.status(200).send({ users: user });
  }).catch(err => {
      res.status(500).send({ message: err.message });
  });
}