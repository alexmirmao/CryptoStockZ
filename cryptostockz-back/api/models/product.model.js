// Base producto

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
      uniqueId: {
        type: Sequelize.STRING
      }
    });
  
    return Product;
  };

  

