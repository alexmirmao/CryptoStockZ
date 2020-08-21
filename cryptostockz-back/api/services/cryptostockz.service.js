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


const web3 = new Web3(ethereumUrl);
const contract = new web3.eth.Contract(JSON.parse(ContractAbi), ContractAddress);

//TODO
/// Añadir las llamadas al contrato

/**
 * Creates a product in the blockchain
 */
async function createProduct(){
  return {msg: "product created"};
}

/**
 * Transfers product ownership to new address
 * @param {*} receiver 
 * @param {*} productAddress 
 */
async function transferProduct(receiver, productAddress){
  return {msg: "product "+ productAddress+ " transfered to " + receiver};
}


module.exports = {
  transferProduct,
  createProduct
}
