// lotteries.controller.js

const cryptostockzService = require('../services/cryptostockz.service');




function getTest(req, res) {
  cryptostockzService.getTest().then((result) => {
    return res.status(200).json(result);
  }).catch((err) => {
    console.log(err);
    return res.status(401).json(err.toString());
  });
}


module.exports = {
  getTest,
};
