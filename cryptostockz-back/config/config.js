// config.js

/* eslint-disable max-len */

// TODO: Make your own configuration
module.exports = {
  env: {
    WEBAPP_PORT: '10010',
    db: {
        development: {
            username: "cryptostockz", // your sql username
            password: "cryptostockz", // your sql password (may be null)
            database: "cryptostockz", // db name
            host: "127.0.0.1", // local host
            port: "5434",
            dialect: "postgres",
            pool: {
              max: 10,
              min: 0,
              acquire: 30000,
              idle: 10000
            }
            
          },
        production: {
            username: "UNDEFINED", // your sql username
            password: "UNDEFINED", // your sql password (may be null)
            database: "UNDEFINED", // db name
            host: "127.0.0.1", // local host
            port: "5434", // local host
            dialect: "postgres"
          }
      // DB_DATABASE: 'cryptostockz',
      // DB_USERNAME: 'cryptostockz',
      // DB_PASSWORD: 'cryptostockz',
      // DB_HOST: 'localhost',
      // DB_PORT: '5434',
    }
  },
  eth: {
    nodeUrl: 'localhost',
    nodePort: '8545',
    transactionOptions: {
      gas: 1160000,
      gasPrice: 0,
    },
  },
  contracts: {
    LotteryService: {
      contractName: 'LotteryService',
      contractAddress: '0xCfEB869F69431e42cdB54A4F4f105C19C080A601',
      contractAbi: '[ { "constant": true, "inputs": [], "name": "getOwner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "_loteryId", "type": "address" } ], "name": "HasFinished", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "_lotteryLogic", "type": "address" } ], "name": "setLotteryLogic", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "_lotteryStorageAddr", "type": "address" } ], "name": "setLotteryStorage", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getLotteryStorage", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "uint256", "name": "_max_participants", "type": "uint256" }, { "internalType": "uint256", "name": "_participant_cost", "type": "uint256" }, { "internalType": "uint256", "name": "_prize", "type": "uint256" }, { "internalType": "uint256", "name": "_pot", "type": "uint256" } ], "name": "createLottery", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "_lotteryId", "type": "address" } ], "name": "addParticipant", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "_lotteryId", "type": "address" } ], "name": "rafflePrize", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "_lotteryId", "type": "address" } ], "name": "withdrawParticipation", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "getLotteries", "outputs": [ { "internalType": "contract Lottery[]", "name": "", "type": "address[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "address", "name": "_lotteryId", "type": "address" } ], "name": "getLottery", "outputs": [ { "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address[]", "name": "", "type": "address[]" }, { "internalType": "string", "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "address", "name": "_lotteryId", "type": "address" } ], "name": "getLotteryPrize", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "address", "name": "_lotteryId", "type": "address" } ], "name": "getLotteryParticipants", "outputs": [ { "internalType": "address[]", "name": "", "type": "address[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "address", "name": "_lotteryId", "type": "address" } ], "name": "getLotteryBalance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "address", "name": "_lotteryId", "type": "address" } ], "name": "getPot", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "address", "name": "_lotteryId", "type": "address" } ], "name": "getWinner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "address", "name": "_lotteryId", "type": "address" } ], "name": "getLotteryStage", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "address", "name": "_lotteryId", "type": "address" } ], "name": "getTicketCost", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" } ]'
    },
  },
};


