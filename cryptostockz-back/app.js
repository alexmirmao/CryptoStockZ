// app.js

const swaggerExpressBootstrap = require('./api/bootstraps/swagger.bootstrap');

const appRoot = __dirname;

const config = require('./config/db.config');

if (config.RESTORE_DB) {
  require('./api/bootstraps/db.bootstrap');
}



(async () => {
  // Run swagger-express service
  await swaggerExpressBootstrap.run(appRoot, process.env.PORT);

  // End
  console.log('Application started successfully.');
})();
