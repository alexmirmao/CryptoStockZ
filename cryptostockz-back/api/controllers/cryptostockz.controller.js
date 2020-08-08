// lotteries.controller.js

const cryptostockzService = require('../services/cryptostockz.service');




function getTest(req, res) {
  cryptostockzService.getTest().then((result) => {
    return res.status(200).json(result);
  }).catch((err) => {
    console.log(err);
    return res.status(400).json(err.toString());
  });
}

function createUser(req, res) {
  const userData = {
    userName: req.body.userName,
    userPass: req.body.userPass,
  };
  cryptostockzService.createUser(userData).then((result) => {
    return res.status(200).json(result);
  }).catch((err) => {
    console.log(err);
    return res.status(400).json(err.toString());
  });
}

function getUserId(req, res) {
  const userData = {
    userName: req.body.userName,
    userPass: req.body.userPass,
  };
  cryptostockzService.getUserId(userData).then((result) => {
    return res.status(200).json(result);
  }).catch((err) => {
    console.log(err);
    return res.status(400).json(err.toString());
  });
}


module.exports = {
  getTest,
  createUser,
  getUserId,
};
