const db = require("../models");
const User = db.user;

// Operaciones para la gestion de los usuarios
exports.getUserByUserName = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }

        // GENERATE COOKIE
        session.sendUserIdCookie(user.id, res) 
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateUser = (req, res) => {

};

exports.deleteUser = (req, res) => {

};

exports.getUserProducts = (req, res) => {

};