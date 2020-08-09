
var bcrypt = require('bcrypt');


module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      instagram_account: {
        type: Sequelize.STRING
      }
    });
  
    return User;
  };

  

