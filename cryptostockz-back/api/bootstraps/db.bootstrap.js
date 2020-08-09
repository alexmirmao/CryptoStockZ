// db.bootstrap.js

const db = require("../models");
const Role = db.role;

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});


// CREATE FIRST ROLES

function initial() {
    Role.create({
      id: 1,
      name: "user"
    });
   
    Role.create({
      id: 2,
      name: "seller"
    });
   
    Role.create({
      id: 3,
      name: "manufacturer"
    });
   
    Role.create({
      id: 4,
      name: "admin"
    });
  }