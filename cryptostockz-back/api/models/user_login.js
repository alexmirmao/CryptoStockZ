'use strict'; 

var bcrypt = require('bcrypt');

module.exports = (sequelize, type) => {

    // 1: The model schema.
    var modelDefinition = {
        username: {
            type: type.STRING,
            unique: true,
            allowNull: false
        },

        password: {
            type: type.STRING,
            allowNull: false
        }
    };

    // 2: The model options.
    var modelOptions = {
        instanceMethods: {
            comparePasswords: comparePasswords
        },
        hooks: {
            beforeValidate: hashPassword
        }
    };

    // 3: Define the User model.
    return sequelize.define('user', modelDefinition, modelOptions);

} 


// Compares two passwords.
function comparePasswords(password, callback) {
    bcrypt.compare(password, this.password, function(error, isMatch) {
        if(error) {
            return callback(error);
        }

        return callback(null, isMatch);
    });
}

// Hashes the password for a user object.
function hashPassword(user) {
    if(user.changed('password')) {
        return bcrypt.hash(user.password, 10).then(function(password) {
            user.password = password;
        });
    }
}