// swagger.bootstrap.js

const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();
require('dotenv').config();


const DEFAULT_PORT = process.env.WEBAPP_PORT;


function run(appRoot, port) {
  return new Promise((resolve, reject) => {

    try {
      const config = { appRoot };

      SwaggerExpress.create(config, (err, swaggerExpress) => {
        if (err) { throw err; }
        // install middleware
        swaggerExpress.register(app);
        const appPort = port || DEFAULT_PORT;
        app.listen(appPort);

        console.log(`Server listening on port ${appPort}...`);
        return resolve();
      });
    } catch (error) {
      return reject(error);
    }
  });
}


module.exports = {
  run,
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "mysql"
},
"test": {
    "username": "root",
    "password": "test",
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
},
};
