const { app } = require('../bootstraps/swagger.bootstrap')

// routes
require('../routes/auth.routes')(app);
require('../routes/user.routes')(app);
require('../routes/cryptostockz.routes')(app);
