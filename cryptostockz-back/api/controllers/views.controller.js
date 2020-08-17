const { session } = require("../middleware")

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