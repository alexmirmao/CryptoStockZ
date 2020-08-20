// Base producto

module.exports = (sequelize, Sequelize) => {
    const BaseProduct = sequelize.define("base_product", {
      name: {
        type: Sequelize.STRING
      },
      ean: {
        type: Sequelize.BIGINT
      },
      sku: {
        type: Sequelize.STRING
      },
      original: {
        type: Sequelize.BOOLEAN
      },
      owner: {
        type: Sequelize.STRING
      },
      manufacturer: {
        type: Sequelize.STRING
      }
    });
  
    return BaseProduct;
  };

  

