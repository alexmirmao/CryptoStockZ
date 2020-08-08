// lotteries.service.js

const config = require('../../config/config');
const Web3 = require('web3');

// Ethereum config
const ethereumUrl = `http://${config.eth.nodeUrl}:${config.eth.nodePort}`;
const gasLimit = config.eth.transactionOptions.gas;
const gasPrice = config.eth.transactionOptions.gasPrice;

// Service contract specs
const ContractName = config.contracts.LotteryService.contractName;
const ContractAddress = config.contracts.LotteryService.contractAddress;
const ContractAbi = config.contracts.LotteryService.contractAbi;


// TODO
const web3 = new Web3(ethereumUrl);
const contract = new web3.eth.Contract(JSON.parse(ContractAbi), ContractAddress);


const { Test, User } = require('../sequelize')

/**
 * Return a list of registered lotteries.
 */
async function getTest() {
  tests = Test.findAll();
  return tests;
}

async function createUser(userData) {
  
  // Lottery data
  const {
    userName,
    userPass,
  } = userData;
  res = User.create({username: userName, password: userPass});
  console.log(res);
  return res;
}


async function getUserId(userData) {
  
  // Lottery data
  const {
    userName,
    userPass,
  } = userData;
  console.log(userData);
  res = User.findOne({ where: {username: userName, password: userPass}});
  return res;
}


module.exports = {
  getTest,
  createUser,
  getUserId,
};
