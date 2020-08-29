const StockZStorage = artifacts.require("StockZStorage");
const CryptoStockZ = artifacts.require("CryptoStockZ");

module.exports = function (deployer) {
  deployer.deploy(StockZStorage, '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1');
  deployer.deploy(CryptoStockZ);
};
