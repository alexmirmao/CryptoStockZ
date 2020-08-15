// Base producto

module.exports = (sequelize, Sequelize) => {
    const BaseProduct = sequelize.define("base_product", {
      name: {
        type: Sequelize.STRING
      },
      ean: {
        type: Sequelize.STRING
      },
      sku: {
        type: Sequelize.FLOAT
      },
      original: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return BaseProduct;
  };

  

