/*  event createProductEvent(
      address _owner, 
      string _name, 
      string _ean, 
      string _sku, 
      uint256 _numberTransactions,
      uint256 dna, 
      uint8 _level);
*/
module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    address: {
      type: Sequelize.STRING
    },
    owner_address: {
      type: Sequelize.STRING
    },
    level: {
      type: Sequelize.BIGINT
    },
    dna: {
      type: Sequelize.BIGINT
    },
    uniqueIdentificator: {
      type: Sequelize.STRING
    }
  });

  return Product;
};



