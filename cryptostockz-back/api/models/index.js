var env = process.env.NODE_ENV || 'development';
const config = require('../../config/db.config').db[env];
const Sequelize = require("sequelize");


if (config.use_env_variable) {
    var sequelize = new Sequelize(
      process.env.db[config.use_env_variable], config
    );
  } else {
    
    // otherwise we use the config object to initialize our sequelize
    // instance
    var sequelize = new Sequelize(
      config.database, config.username, config.password, config
    );
  }

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "seller", "manufacturer", "admin"];

module.exports = db;


// const Sequelize = require('sequelize')
// const TestModel = require('./models/test')
// const UserModel = require('./models/user.model')
// // const config = require('../config/config');


// var env = process.env.NODE_ENV || 'development';

// const config = require('../config/config').env.db[env];



// if (config.use_env_variable) {
//   var sequelize = new Sequelize(
//     process.env.db[config.use_env_variable], config
//   );
// } else {
  
//   // otherwise we use the config object to initialize our sequelize
//   // instance
//   var sequelize = new Sequelize(
//     config.database, config.username, config.password, config
//   );
// }

// const Test = TestModel(sequelize, Sequelize)
// const User = UserModel(sequelize, Sequelize)
// // BlogTag will be our way of tracking relationship between Blog and Tag models
// // each Blog can have multiple tags and each Tag can have multiple blogs
// // const BlogTag = sequelize.define('blog_tag', {})
// // const Blog = BlogModel(sequelize, Sequelize)
// // const Tag = TagModel(sequelize, Sequelize)

// // Blog.belongsToMany(Tag, { through: BlogTag, unique: false })
// // Tag.belongsToMany(Blog, { through: BlogTag, unique: false })
// // Blog.belongsTo(User);

// sequelize.sync({ force: true })
//   .then(() => {
//     console.log(`Database sync!`)
//   })

// module.exports = {
//     Test,
//     User
// }